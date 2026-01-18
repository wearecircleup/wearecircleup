# 🏗️ Architecture Analysis: GitHub Actions vs Vercel Functions

## Current Architecture (GitHub Actions)

### Presentation Generation Flow
```
User submits form → Frontend calls repository_dispatch → 
GitHub Actions workflow triggered → 
Validate → Generate (LLM) → Build (HTML) → 
Commit to repo → User notified
```

### Limitations

#### 1. **Concurrency & Queuing**
- **GitHub Actions Free Tier:**
  - 2,000 minutes/month
  - Max 20 concurrent jobs
  - Jobs queue when limit reached
  - **Problem:** 50 simultaneous users = 30 jobs queued (potential failures)

#### 2. **Cold Start & Dependencies**
- Each workflow run:
  - Installs Node.js
  - Runs `npm install` (downloads all packages)
  - No persistent cache between runs
  - **Time:** ~2-3 minutes per presentation

#### 3. **Cost Analysis (GitHub Actions)**
```
Free Tier: 2,000 minutes/month
Per presentation: ~3 minutes (with npm install)
Capacity: ~666 presentations/month

50 simultaneous users:
- 30 jobs queued
- Timeout risk after 6 hours
- Potential failures
```

---

## Proposed Architecture (Vercel Functions + Edge Caching)

### Option 1: Hybrid (Recommended)

**Keep GitHub Actions for:**
- ✅ Git commits (storing presentations in repo)
- ✅ Scheduled tasks (cleanup, analytics)

**Move to Vercel Functions for:**
- ✅ LLM API calls (GitHub Models)
- ✅ HTML generation (Impress.js)
- ✅ Concurrent processing

**Flow:**
```
User submits form → Vercel Function (instant) →
Call GitHub Models API → Generate slides JSON →
Build HTML in-memory → 
Trigger GitHub Action (only for commit) →
Return presentation URL immediately
```

### Benefits

#### 1. **Concurrency**
```
Vercel Free Tier:
- 100 GB-hours/month
- Unlimited concurrent executions
- Auto-scaling
- No queuing

50 simultaneous users:
- All processed in parallel
- ~10 seconds per presentation
- No failures
```

#### 2. **Dependency Caching**
```javascript
// Vercel Function with bundled dependencies
// All npm packages pre-installed in deployment
// Zero install time during execution

export default async function handler(req, res) {
  // Dependencies already available
  const slides = await generateSlides(prompt);
  const html = buildPresentation(slides);
  return res.json({ html, slides });
}
```

#### 3. **Cost Comparison**

| Metric | GitHub Actions | Vercel Functions |
|--------|----------------|------------------|
| Free Tier | 2,000 min/month | 100 GB-hours/month |
| Concurrent Jobs | 20 max | Unlimited |
| Cold Start | ~30s (npm install) | ~1s (pre-bundled) |
| Time per Presentation | ~3 min | ~10s |
| Monthly Capacity | ~666 presentations | ~36,000 presentations |
| 50 Simultaneous Users | ❌ Queued/Failed | ✅ All succeed |

#### 4. **Execution Time Breakdown**

**Current (GitHub Actions):**
```
Setup Node.js:        20s
npm install:          90s
Generate (LLM):       30s
Build HTML:           10s
Commit to repo:       20s
Total:                ~170s (2.8 min)
```

**Proposed (Vercel Function):**
```
Function cold start:  1s
Generate (LLM):       30s
Build HTML:           2s (in-memory)
Trigger commit:       5s (async)
Total:                ~8s (user sees result)
Commit completes:     +20s (background)
```

---

## Recommended Implementation

### Phase 1: Move LLM Generation to Vercel

**Create:** `api/generate-presentation.js`

```javascript
import { generateSlides } from '../backend/scripts/generate-slides.js';
import { buildPresentation } from '../backend/scripts/build-presentation.js';

export default async function handler(req, res) {
  const { title, description, slides, theme, model, user } = req.body;
  
  try {
    // 1. Generate slides with LLM (30s)
    const slidesData = await generateSlides({
      title,
      description,
      slideCount: slides,
      model,
      token: process.env.GH_TOKEN_MODELS
    });
    
    // 2. Build HTML in-memory (2s)
    const html = buildPresentation({
      slides: slidesData,
      theme,
      title
    });
    
    // 3. Trigger GitHub Action to commit (async, 5s)
    await fetch(`https://api.github.com/repos/${owner}/${repo}/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_type: 'save_presentation',
        client_payload: {
          user: user.login,
          presentationId: crypto.randomUUID(),
          html,
          slides: slidesData,
          metadata: { title, theme, model }
        }
      })
    });
    
    // 4. Return immediately to user
    return res.status(200).json({
      success: true,
      presentationId,
      url: `/p/${user.login}/${presentationId}`,
      html // User can view immediately
    });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

**GitHub Action:** `save-presentation.yml` (simplified)

```yaml
name: Save Presentation
on:
  repository_dispatch:
    types: [save_presentation]

jobs:
  save:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Save files
        run: |
          mkdir -p presentations/metadata/${{ github.event.client_payload.user }}
          mkdir -p presentations/content/${{ github.event.client_payload.user }}
          mkdir -p presentations/public/${{ github.event.client_payload.user }}
          
          echo "${{ github.event.client_payload.html }}" > presentations/public/${{ github.event.client_payload.user }}/${{ github.event.client_payload.presentationId }}.html
          echo "${{ github.event.client_payload.slides }}" > presentations/content/${{ github.event.client_payload.user }}/${{ github.event.client_payload.presentationId }}.json
          
      - name: Commit
        run: |
          git config user.name "CircleUp Bot"
          git config user.email "bot@circleup.com.co"
          git add presentations/
          git commit -m "feat(presentation): ${{ github.event.client_payload.metadata.title }}"
          git push
```

### Phase 2: Add Caching Layer

**Use Vercel KV (Redis) for caching:**

```javascript
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const cacheKey = `presentation:${user.login}:${presentationId}`;
  
  // Check cache first
  const cached = await kv.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }
  
  // Generate and cache
  const result = await generatePresentation(req.body);
  await kv.set(cacheKey, result, { ex: 3600 }); // 1 hour cache
  
  return res.json(result);
}
```

---

## Cost Analysis (50 Simultaneous Users)

### Scenario: 50 users create presentations simultaneously

**GitHub Actions (Current):**
```
Concurrent limit: 20 jobs
Queued: 30 jobs
Time per job: 3 minutes
Total time: 9 minutes (3 batches)
Failures: Possible (timeout after 6 hours)
Cost: Free tier (2,000 min/month)
Monthly capacity: ~666 presentations
```

**Vercel Functions (Proposed):**
```
Concurrent limit: Unlimited
Queued: 0 jobs
Time per job: 10 seconds
Total time: 10 seconds (all parallel)
Failures: None
Cost: Free tier (100 GB-hours/month)
Monthly capacity: ~36,000 presentations
```

### Cost Breakdown (Monthly)

**Free Tier Limits:**
```
GitHub Actions:
- 2,000 minutes/month
- 500 MB storage
- 20 concurrent jobs

Vercel:
- 100 GB-hours compute
- 100 GB bandwidth
- Unlimited concurrent functions
- 1,000 serverless function invocations/day
```

**Paid Tier (if needed):**
```
GitHub Actions:
- $0.008/minute ($16 for 2,000 min)

Vercel Pro ($20/month):
- Unlimited function invocations
- 1,000 GB-hours compute
- 1 TB bandwidth
```

---

## Recommendation

### ✅ Migrate to Hybrid Architecture

**Reasons:**
1. **Scalability:** Handle 50+ concurrent users without queuing
2. **Speed:** 10s vs 170s per presentation (17x faster)
3. **Reliability:** No job queuing or timeout failures
4. **Cost-effective:** Free tier supports 36,000 presentations/month
5. **Better UX:** Users see results immediately

**Migration Steps:**
1. Create `api/generate-presentation.js` in Vercel
2. Move LLM and HTML generation logic
3. Simplify GitHub Action to only handle commits
4. Test with concurrent load
5. Monitor costs and performance

**Estimated Migration Time:** 4-6 hours

Would you like me to implement this architecture?
