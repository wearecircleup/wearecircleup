# Technical Specification: User Profile Registration & NPS Survey System

## Executive Summary

This specification outlines the implementation of a user profile registration system with CRUD operations and an NPS (Net Promoter Score) survey mechanism for the CircleUp platform. The system will leverage Vercel Blob storage with NDJSON format for data persistence, ensuring scalability, reliability, and zero-cost infrastructure alignment with the existing architecture.

## 1. System Architecture

### 1.1 Technology Stack

- **Frontend**: React + Vite (existing)
- **Backend**: Vercel Serverless Functions (Node.js 20.x)
- **Storage**: Vercel Blob (NDJSON format)
- **Authentication**: GitHub OAuth (existing)
- **Deployment**: Vercel Platform

### 1.2 Data Flow

```
User Authentication (GitHub OAuth)
    ↓
Profile Completion Check
    ↓
Profile Registration Form (if incomplete)
    ↓
Vercel Function → Vercel Blob (NDJSON append)
    ↓
Dashboard Access Granted
    ↓
Course Completion
    ↓
NPS Survey Trigger
    ↓
Vercel Function → Vercel Blob (NDJSON append)
```

### 1.3 Storage Architecture

**Vercel Blob Structure:**
```
/profiles/{userId}.ndjson          # User profile records (versioned)
/nps-responses/{userId}.ndjson     # NPS survey responses (timestamped)
```

**NDJSON Format Benefits:**
- Append-only operations (no file locking)
- Streaming support for large datasets
- Version history preservation
- Efficient line-by-line processing
- Scalable to millions of records

## 2. User Profile System

### 2.1 Profile Data Schema

```typescript
interface UserProfile {
  id: string;                    // GitHub user ID
  login: string;                 // GitHub username
  email: string;                 // User email
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
  version: number;               // Profile version for history
  
  // Profile fields
  fullName: string;              // Required
  country: string;               // Required (ISO 3166-1 alpha-2)
  city: string;                  // Required
  organization?: string;         // Optional
  role: 'volunteer' | 'business' | 'participant'; // Required
  interests: string[];           // Required (min 1, max 5)
  bio?: string;                  // Optional (max 500 chars)
  
  // Metadata
  profileComplete: boolean;      // Completion status
  githubData: {
    avatarUrl: string;
    username: string;
  };
}
```

### 2.2 API Endpoints

#### 2.2.1 Create/Update Profile

**Endpoint:** `POST /api/profile`

**Request Body:**
```json
{
  "fullName": "Maria Garcia",
  "country": "CO",
  "city": "Bogota",
  "organization": "Green Earth Foundation",
  "role": "volunteer",
  "interests": ["climate-action", "education", "community"],
  "bio": "Environmental activist passionate about climate change education"
}
```

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": "12345",
    "login": "mariagarcia",
    "profileComplete": true,
    "version": 1,
    "updatedAt": "2026-01-24T20:00:00.000Z"
  }
}
```

**Implementation:**
- Validate all required fields using Zod schema
- Fetch existing profile from Vercel Blob
- Append new version to NDJSON file
- Update localStorage cache
- Return success response

#### 2.2.2 Get Profile

**Endpoint:** `GET /api/profile?userId={userId}`

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": "12345",
    "login": "mariagarcia",
    "fullName": "Maria Garcia",
    "country": "CO",
    "city": "Bogota",
    "role": "volunteer",
    "interests": ["climate-action", "education", "community"],
    "profileComplete": true,
    "version": 2,
    "createdAt": "2026-01-20T10:00:00.000Z",
    "updatedAt": "2026-01-24T20:00:00.000Z"
  }
}
```

**Implementation:**
- Read NDJSON file from Vercel Blob
- Parse line-by-line to get latest version
- Return most recent profile record
- Cache in localStorage for offline access

#### 2.2.3 Delete Profile

**Endpoint:** `DELETE /api/profile?userId={userId}`

**Response:**
```json
{
  "success": true,
  "message": "Profile deleted successfully"
}
```

**Implementation:**
- Append deletion record to NDJSON (soft delete)
- Mark profile as deleted with timestamp
- Preserve history for audit purposes
- Clear localStorage cache

### 2.3 Profile Registration Component

**Location:** `src/components/dashboard/ProfileRegistration.jsx`

**Features:**
- Modern, responsive form design matching CircleUp UI
- Real-time validation with Zod
- Multi-step form (optional for better UX)
- Country/city autocomplete
- Interest tags selection (max 5)
- Character counter for bio field
- Save draft functionality (localStorage)
- Loading states and error handling

**Form Fields:**
1. Full Name (text input, required)
2. Country (searchable dropdown, required)
3. City (text input, required)
4. Organization (text input, optional)
5. Role (radio buttons: Volunteer, Business, Participant)
6. Interests (tag selector, 1-5 tags)
7. Bio (textarea, max 500 chars, optional)

**Validation Rules:**
- Full name: 2-100 characters
- Country: Valid ISO code
- City: 2-100 characters
- Organization: 0-200 characters
- Role: One of enum values
- Interests: 1-5 selections from predefined list
- Bio: 0-500 characters

### 2.4 Profile Completion Gate

**Implementation in DashboardHome.jsx:**

```javascript
useEffect(() => {
  const checkProfileCompletion = async () => {
    const profile = await ProfileService.getProfile(user.id);
    
    if (!profile || !profile.profileComplete) {
      setShowProfileRegistration(true);
    } else {
      setShowDashboard(true);
    }
  };
  
  checkProfileCompletion();
}, [user]);
```

**User Flow:**
1. User authenticates via GitHub OAuth
2. System checks profile completion status
3. If incomplete: Show ProfileRegistration component
4. If complete: Show DashboardHome component
5. User can update profile from settings menu

## 3. NPS Survey System

### 3.1 NPS Data Schema

```typescript
interface NPSResponse {
  id: string;                    // Response UUID
  userId: string;                // GitHub user ID
  userLogin: string;             // GitHub username
  submittedAt: string;           // ISO 8601 timestamp
  courseId?: string;             // Optional course identifier
  
  // Survey responses
  volunteerRating: number;       // 1-10 scale
  contentRating: number;         // 1-10 scale
  circleUpVolunteerRating: number; // 1-10 scale
  observations: string;          // Free text (max 1000 chars)
  
  // Metadata
  npsScore: number;              // Calculated: volunteerRating
  category: 'detractor' | 'passive' | 'promoter'; // Based on volunteerRating
}
```

### 3.2 API Endpoints

#### 3.2.1 Submit NPS Response

**Endpoint:** `POST /api/nps`

**Request Body:**
```json
{
  "userId": "12345",
  "volunteerRating": 9,
  "contentRating": 8,
  "circleUpVolunteerRating": 10,
  "observations": "Excellent course content and volunteer support. Very engaging experience.",
  "courseId": "climate-action-101"
}
```

**Response:**
```json
{
  "success": true,
  "responseId": "uuid-here",
  "npsScore": 9,
  "category": "promoter"
}
```

#### 3.2.2 Get NPS Analytics

**Endpoint:** `GET /api/nps/analytics?userId={userId}`

**Response:**
```json
{
  "success": true,
  "analytics": {
    "totalResponses": 5,
    "averageVolunteerRating": 8.4,
    "averageContentRating": 8.2,
    "averageCircleUpRating": 9.0,
    "npsBreakdown": {
      "promoters": 3,
      "passives": 1,
      "detractors": 1
    },
    "overallNPS": 40
  }
}
```

### 3.3 NPS Survey Component

**Location:** `src/components/dashboard/NPSSurvey.jsx`

**Design Inspiration:** Typeform-style modern survey

**Features:**
- One question per screen (Typeform style)
- Smooth transitions between questions
- Progress indicator
- Animated rating scales (1-10)
- Large, touch-friendly buttons
- Gradient backgrounds
- Celebration animation on completion

**Survey Questions:**

**Question 1: Volunteer Rating**
```
"How would you rate your volunteer experience?"
[1] [2] [3] [4] [5] [6] [7] [8] [9] [10]
Detractor ←                    → Promoter
```

**Question 2: Content Rating**
```
"How would you rate the course content quality?"
[1] [2] [3] [4] [5] [6] [7] [8] [9] [10]
Poor ←                         → Excellent
```

**Question 3: Circle Up Volunteer Rating**
```
"How would you rate the Circle Up volunteer who guided you?"
[1] [2] [3] [4] [5] [6] [7] [8] [9] [10]
Poor ←                         → Excellent
```

**Question 4: Observations**
```
"Any additional comments or suggestions?"
[Large textarea with character counter: 0/1000]
```

**UI/UX Specifications:**
- Full-screen modal overlay
- Backdrop blur effect
- Gradient background (CircleUp brand colors)
- Large typography (3xl-4xl headings)
- Animated progress bar (0-100%)
- Keyboard navigation support (arrow keys, enter)
- Mobile-optimized touch targets (min 44px)
- Smooth page transitions (framer-motion)
- Confetti animation on submission

### 3.4 NPS Trigger Logic

**Implementation:**

```javascript
// Trigger after course completion
const handleCourseCompletion = async (courseId) => {
  // Check if user has already submitted NPS for this course
  const hasSubmitted = await NPSService.hasSubmittedForCourse(
    user.id, 
    courseId
  );
  
  if (!hasSubmitted) {
    setShowNPSSurvey(true);
    setCurrentCourseId(courseId);
  }
};
```

**Trigger Conditions:**
- User completes a course/presentation
- User has not submitted NPS for this specific course
- Minimum 24 hours since last NPS request (prevent survey fatigue)
- User profile is complete

## 4. Vercel Blob Implementation

### 4.1 Blob Storage Service

**Location:** `src/shared/utils/blob-storage.ts`

```typescript
import { put, list } from '@vercel/blob';

export class BlobStorageService {
  static async appendToNDJSON(
    pathname: string, 
    data: object
  ): Promise<void> {
    // Read existing file
    const existing = await this.readNDJSON(pathname);
    
    // Append new record
    const newLine = JSON.stringify(data) + '\n';
    const content = existing + newLine;
    
    // Upload updated file
    await put(pathname, content, {
      access: 'public',
      contentType: 'application/x-ndjson'
    });
  }
  
  static async readNDJSON(pathname: string): Promise<string> {
    try {
      const response = await fetch(
        `https://blob.vercel-storage.com/${pathname}`
      );
      return await response.text();
    } catch {
      return '';
    }
  }
  
  static parseNDJSON<T>(content: string): T[] {
    return content
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));
  }
  
  static getLatestRecord<T>(records: T[]): T | null {
    return records.length > 0 
      ? records[records.length - 1] 
      : null;
  }
}
```

### 4.2 Vercel Function: Profile Management

**Location:** `api/profile.js`

```javascript
import { put, list } from '@vercel/blob';

export default async function handler(req, res) {
  const { method } = req;
  
  switch (method) {
    case 'GET':
      return handleGetProfile(req, res);
    case 'POST':
      return handleCreateUpdateProfile(req, res);
    case 'DELETE':
      return handleDeleteProfile(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleCreateUpdateProfile(req, res) {
  const profile = req.body;
  
  // Validate with Zod
  const validated = profileSchema.parse(profile);
  
  // Read existing profile
  const pathname = `profiles/${validated.id}.ndjson`;
  const existing = await readNDJSON(pathname);
  const records = parseNDJSON(existing);
  
  // Create new version
  const newRecord = {
    ...validated,
    version: records.length + 1,
    updatedAt: new Date().toISOString()
  };
  
  // Append to NDJSON
  const newLine = JSON.stringify(newRecord) + '\n';
  await put(pathname, existing + newLine, {
    access: 'public',
    contentType: 'application/x-ndjson'
  });
  
  return res.status(200).json({
    success: true,
    profile: newRecord
  });
}
```

### 4.3 Vercel Function: NPS Management

**Location:** `api/nps.js`

```javascript
export default async function handler(req, res) {
  const { method } = req;
  
  switch (method) {
    case 'GET':
      return handleGetNPSAnalytics(req, res);
    case 'POST':
      return handleSubmitNPS(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleSubmitNPS(req, res) {
  const response = req.body;
  
  // Calculate NPS category
  const category = 
    response.volunteerRating >= 9 ? 'promoter' :
    response.volunteerRating >= 7 ? 'passive' :
    'detractor';
  
  const record = {
    id: crypto.randomUUID(),
    ...response,
    submittedAt: new Date().toISOString(),
    npsScore: response.volunteerRating,
    category
  };
  
  // Append to NDJSON
  const pathname = `nps-responses/${response.userId}.ndjson`;
  await appendToNDJSON(pathname, record);
  
  return res.status(200).json({
    success: true,
    responseId: record.id,
    npsScore: record.npsScore,
    category: record.category
  });
}
```

## 5. Frontend Integration

### 5.1 Modified DashboardHome Component

**Changes to:** `src/components/dashboard/DashboardHome.jsx`

```javascript
const DashboardHome = ({ user, onNavigate }) => {
  const [showProfileRegistration, setShowProfileRegistration] = useState(false);
  const [showNPSSurvey, setShowNPSSurvey] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  
  useEffect(() => {
    checkProfileStatus();
  }, [user]);
  
  const checkProfileStatus = async () => {
    const profile = await ProfileService.getProfile(user.id);
    
    if (!profile || !profile.profileComplete) {
      setShowProfileRegistration(true);
      setProfileComplete(false);
    } else {
      setProfileComplete(true);
    }
  };
  
  if (showProfileRegistration) {
    return (
      <ProfileRegistration
        user={user}
        onComplete={() => {
          setShowProfileRegistration(false);
          setProfileComplete(true);
        }}
      />
    );
  }
  
  return (
    <>
      {/* Existing dashboard content */}
      
      {showNPSSurvey && (
        <NPSSurvey
          user={user}
          onClose={() => setShowNPSSurvey(false)}
          onSubmit={handleNPSSubmit}
        />
      )}
    </>
  );
};
```

### 5.2 Profile Service

**Location:** `src/shared/utils/profile.ts`

```typescript
export class ProfileService {
  static async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const response = await fetch(`/api/profile?userId=${userId}`);
      const data = await response.json();
      return data.success ? data.profile : null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }
  
  static async createOrUpdateProfile(
    profile: Partial<UserProfile>
  ): Promise<{ success: boolean; profile?: UserProfile }> {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving profile:', error);
      return { success: false };
    }
  }
  
  static async deleteProfile(userId: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/profile?userId=${userId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error deleting profile:', error);
      return false;
    }
  }
}
```

### 5.3 NPS Service

**Location:** `src/shared/utils/nps.ts`

```typescript
export class NPSService {
  static async submitResponse(
    response: Partial<NPSResponse>
  ): Promise<{ success: boolean; responseId?: string }> {
    try {
      const result = await fetch('/api/nps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(response)
      });
      return await result.json();
    } catch (error) {
      console.error('Error submitting NPS:', error);
      return { success: false };
    }
  }
  
  static async getAnalytics(
    userId: string
  ): Promise<NPSAnalytics | null> {
    try {
      const response = await fetch(`/api/nps/analytics?userId=${userId}`);
      const data = await response.json();
      return data.success ? data.analytics : null;
    } catch (error) {
      console.error('Error fetching NPS analytics:', error);
      return null;
    }
  }
  
  static async hasSubmittedForCourse(
    userId: string,
    courseId: string
  ): Promise<boolean> {
    const analytics = await this.getAnalytics(userId);
    // Implementation to check if user submitted for specific course
    return false; // Placeholder
  }
}
```

## 6. Validation Schemas

### 6.1 Profile Schema

**Location:** `src/shared/schemas/profile.schema.ts`

```typescript
import { z } from 'zod';

export const profileSchema = z.object({
  id: z.string(),
  login: z.string(),
  email: z.string().email(),
  fullName: z.string().min(2).max(100),
  country: z.string().length(2), // ISO 3166-1 alpha-2
  city: z.string().min(2).max(100),
  organization: z.string().max(200).optional(),
  role: z.enum(['volunteer', 'business', 'participant']),
  interests: z.array(z.string()).min(1).max(5),
  bio: z.string().max(500).optional(),
  profileComplete: z.boolean(),
  githubData: z.object({
    avatarUrl: z.string().url(),
    username: z.string()
  })
});

export type UserProfile = z.infer<typeof profileSchema>;
```

### 6.2 NPS Schema

**Location:** `src/shared/schemas/nps.schema.ts`

```typescript
import { z } from 'zod';

export const npsResponseSchema = z.object({
  userId: z.string(),
  userLogin: z.string(),
  volunteerRating: z.number().min(1).max(10),
  contentRating: z.number().min(1).max(10),
  circleUpVolunteerRating: z.number().min(1).max(10),
  observations: z.string().max(1000),
  courseId: z.string().optional()
});

export type NPSResponse = z.infer<typeof npsResponseSchema>;
```

## 7. Environment Variables

### 7.1 Required Variables

Add to `.env.example` and Vercel Dashboard:

```bash
# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_token_here

# Existing variables
GITHUB_APP_CLIENT_ID=...
GITHUB_APP_CLIENT_SECRET=...
GITHUB_TOKEN=...
```

### 7.2 Vercel Configuration

Update `vercel.json`:

```json
{
  "functions": {
    "api/profile.js": {
      "maxDuration": 10
    },
    "api/nps.js": {
      "maxDuration": 10
    }
  }
}
```

## 8. Security Considerations

### 8.1 Data Privacy

- User profiles stored with user consent
- GDPR-compliant data deletion (soft delete with audit trail)
- No PII exposed in public URLs
- Vercel Blob access control (public read, authenticated write)

### 8.2 Validation

- All inputs validated with Zod schemas
- SQL injection prevention (no SQL database)
- XSS prevention (React auto-escaping)
- CSRF protection via Vercel CORS headers

### 8.3 Rate Limiting

- Implement rate limiting on profile/NPS endpoints
- Max 10 profile updates per hour per user
- Max 1 NPS submission per course per user
- Vercel Edge Middleware for rate limiting

## 9. Performance Optimization

### 9.1 Caching Strategy

- Profile data cached in localStorage (5-minute TTL)
- NPS responses cached after submission
- Vercel Edge caching for blob reads
- Stale-while-revalidate pattern

### 9.2 NDJSON Optimization

- Read only last N lines for latest record
- Implement pagination for large files
- Compress old records (gzip)
- Archive records older than 1 year

### 9.3 Loading States

- Skeleton loaders for profile form
- Optimistic UI updates
- Progressive form rendering
- Lazy load NPS survey component

## 10. Testing Strategy

### 10.1 Unit Tests

- Profile validation schemas
- NDJSON parsing utilities
- NPS score calculation
- Service layer methods

### 10.2 Integration Tests

- Profile CRUD operations
- NPS submission flow
- Blob storage read/write
- API endpoint responses

### 10.3 E2E Tests

- Complete profile registration flow
- NPS survey submission
- Profile update and deletion
- Dashboard access gating

## 11. Monitoring and Analytics

### 11.1 Metrics to Track

- Profile completion rate
- Average time to complete profile
- NPS score distribution
- Survey completion rate
- API response times
- Blob storage usage

### 11.2 Error Tracking

- Vercel Function logs
- Client-side error boundaries
- Failed profile submissions
- Blob storage errors

## 12. Migration Plan

### 12.1 Phase 1: Infrastructure Setup

- Install @vercel/blob package
- Create Vercel Blob store
- Setup environment variables
- Create API endpoints

### 12.2 Phase 2: Profile System

- Implement ProfileRegistration component
- Create profile service and schemas
- Add profile completion gate
- Test CRUD operations

### 12.3 Phase 3: NPS System

- Implement NPSSurvey component
- Create NPS service and schemas
- Add trigger logic
- Test submission flow

### 12.4 Phase 4: Testing and Deployment

- Unit and integration tests
- E2E testing
- Performance testing
- Production deployment

## 13. Cost Analysis

### 13.1 Vercel Blob Pricing (Free Tier)

- Storage: 1 GB free
- Bandwidth: 100 GB/month free
- Requests: Unlimited

### 13.2 Estimated Usage

- Average profile size: 2 KB
- Average NPS response: 1 KB
- 1000 users = 2 MB storage
- 10,000 users = 20 MB storage
- Well within free tier limits

### 13.3 Scalability

- Free tier supports 500,000 profiles
- Paid tier: $0.15/GB storage, $0.15/GB bandwidth
- Cost-effective for 100K+ users

## 14. Success Metrics

### 14.1 Profile System

- 90% profile completion rate within 7 days
- Average completion time < 3 minutes
- 99.9% API uptime
- < 500ms average response time

### 14.2 NPS System

- 70% survey completion rate
- Average NPS score > 50
- < 2% survey abandonment rate
- Real-time analytics dashboard

## 15. Future Enhancements

### 15.1 Profile Features

- Profile photo upload (Vercel Blob)
- Social media links
- Skills and certifications
- Public profile pages
- Profile verification badges

### 15.2 NPS Features

- Automated follow-up surveys
- Sentiment analysis on observations
- NPS trends over time
- Comparative analytics
- Email notifications for low scores

### 15.3 Integration

- Export to CSV/JSON
- Webhook notifications
- Third-party analytics integration
- CRM synchronization

## 16. Documentation Requirements

### 16.1 Developer Documentation

- API endpoint reference
- Schema documentation
- Service layer documentation
- Component props documentation

### 16.2 User Documentation

- Profile setup guide
- Privacy policy updates
- NPS survey FAQ
- Data deletion instructions

## 17. Rollout Strategy

### 17.1 Beta Testing

- Internal team testing (1 week)
- Beta user group (50 users, 2 weeks)
- Feedback collection and iteration
- Bug fixes and optimization

### 17.2 Production Release

- Gradual rollout (10% → 50% → 100%)
- Monitor error rates and performance
- A/B testing for NPS survey design
- User feedback collection

## 18. Compliance

### 18.1 GDPR Compliance

- User consent for data collection
- Right to access data
- Right to deletion
- Data portability
- Privacy policy updates

### 18.2 Data Retention

- Active profiles: Indefinite
- Deleted profiles: 30-day soft delete
- NPS responses: 2-year retention
- Audit logs: 1-year retention

## Conclusion

This specification provides a comprehensive, production-ready implementation plan for user profile registration and NPS survey systems. The architecture leverages Vercel's serverless infrastructure and Blob storage to maintain zero-cost operations while ensuring scalability, reliability, and professional-grade user experience. All components follow CircleUp's existing design patterns and technical standards.
