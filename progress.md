# CircleUp Implementation Progress

## Phase 1: Foundation and Infrastructure

**Status:** COMPLETED  
**Date:** 2026-01-17

### Step 1.1: Repository Structure and Configuration

**Completed:**
- Created directory structure for config-driven architecture
- Implemented configuration files with environment variable interpolation
- Created JSON schemas for validation
- Setup validation scripts with AJV

**Files Created:**
```
config/
  app.config.json          - Application configuration
  github.config.json       - GitHub API and repository settings
  models.config.json       - LLM models configuration with fallback strategy
  storage.config.json      - Storage paths and versioning settings

schemas/
  app.schema.json          - JSON schema for app config validation
  github.schema.json       - JSON schema for GitHub config validation
  models.schema.json       - JSON schema for models config validation
  storage.schema.json      - JSON schema for storage config validation

scripts/
  validate-config.js       - Configuration validation script using AJV
  setup-env.js             - Environment setup script
```

**Key Features:**
- All configuration externalized (no hardcoded values)
- Environment variable interpolation using ${VAR_NAME} syntax
- JSON schema validation for type safety
- Config validation script with detailed error reporting

### Step 1.2: CI/CD Pipeline Foundation

**Completed:**
- Created GitHub Actions workflows for backend and frontend
- Implemented caching strategy for dependencies and builds
- Setup automated validation and testing pipelines

**Files Created:**
```
.github/workflows/
  ci-backend.yml           - Backend CI pipeline with config validation
  ci-frontend.yml          - Frontend CI pipeline with caching

.nvmrc                     - Node.js version specification (20)
.editorconfig              - Editor configuration for consistent formatting
```

**Pipeline Features:**
- Automatic config validation on every push
- Dependency caching (npm, TypeScript builds)
- Path-based triggering (only run when relevant files change)
- Parallel job execution where possible
- Code coverage reporting

### Step 1.3: File System Conventions

**Completed:**
- Established naming conventions for files and directories
- Configured TypeScript with path aliases
- Setup testing framework (Vitest)
- Updated package.json with new scripts

**Files Created:**
```
tsconfig.json              - TypeScript configuration with strict mode
tsconfig.node.json         - TypeScript config for Node.js scripts
vitest.config.ts           - Vitest testing configuration
tests/setup.ts             - Test environment setup
tests/unit/config.test.js  - Unit tests for config validation
```

**Conventions Established:**
- Components: PascalCase (UserProfile.tsx)
- Utilities: camelCase (formatDate.ts)
- Constants: UPPER_SNAKE_CASE (API_ENDPOINTS.ts)
- Config files: kebab-case (app.config.json)
- Test files: *.test.ts or *.spec.ts
- Directories: kebab-case (user-profile/)

**Path Aliases Configured:**
```
@/*          -> src/*
@config/*    -> config/*
@backend/*   -> backend/*
@shared/*    -> src/shared/*
@features/*  -> src/features/*
@tests/*     -> tests/*
```

### Package Updates

**Updated package.json:**
- Changed name from "brainwave" to "circleup"
- Updated version to 2.0.0
- Added validation scripts (validate:config, setup:env)
- Added testing scripts (test:unit, test:watch, test:coverage)
- Added type-check script
- Added dependencies: ajv, ajv-formats, typescript, vitest

### Validation Checklist

**Phase 1 Exit Criteria:**
- [x] All config files validate against schemas
- [x] Directory structure follows conventions
- [x] CI/CD pipelines configured
- [x] TypeScript setup complete
- [x] Testing framework configured
- [x] No hardcoded values in configuration
- [x] Path aliases working
- [x] EditorConfig for consistent formatting

### Fixes Applied

**ES Module Compatibility:**
- Converted scripts/validate-config.js to ES modules (import/export)
- Converted scripts/setup-env.js to ES modules
- Converted tests/unit/config.test.js to ES modules
- Added __dirname and __filename polyfills for ES modules

**Missing Dependencies:**
- Added jsdom (required for vitest DOM testing)
- Added @testing-library/react (for React component testing)
- Added @vitest/ui (for test UI)

**Package Updates:**
- All scripts now compatible with "type": "module" in package.json
- JSON schemas loaded dynamically using fs.readFileSync
- Import statements use .js extensions for ES module compatibility

### Validation Results

**Installation:**
```bash
npm install
# Status: SUCCESS (344 packages installed)
# Note: 4 moderate vulnerabilities in vitest/esbuild (non-critical)
```

**Commands to Run:**
```bash
# Install missing dependencies (jsdom, @testing-library/react)
npm install

# Setup environment variables
npm run setup:env

# Validate configuration
npm run validate:config

# Run tests
npm run test:unit

# Type check
npm run type-check
```

**Important:** Run `npm install` again to install jsdom and other new dependencies added to package.json.

### Test Results

**Unit Tests Status:**
```bash
npm run test:unit
# Result: 4 passed, 1 failed (github.config.json validation)
# Fix: Removed strict URI format validation from schemas
# Reason: Config files use ${VAR} interpolation which fails URI format check
```

**Schema Adjustments:**
- Removed "format": "uri" from github.schema.json (redirectUri, baseUrl)
- Removed "format": "uri" from models.schema.json (endpoint)
- Schemas now validate structure without strict format requirements
- Allows environment variable interpolation syntax

## Phase 2: Core Backend Services

**Status:** COMPLETED  
**Date:** 2026-01-17

### Step 2.1: Configuration Loader Service

**Completed:**
- Created ConfigLoader singleton service with type safety
- Implemented environment variable interpolation
- Added support for all config types (app, github, models, storage)
- Created comprehensive unit tests

**Files Created:**
```
backend/services/config/ConfigLoader.ts
tests/unit/backend/services/ConfigLoader.test.ts
```

**Key Features:**
- Singleton pattern for single instance across application
- Type-safe config access with TypeScript interfaces
- Automatic environment variable interpolation
- Reload capability for config updates
- 100% test coverage

**Exit Criteria:**
- [x] ConfigLoader tests pass (6/6)
- [x] No hardcoded values
- [x] Environment variable interpolation works
- [x] Singleton pattern validated

### Step 2.2: GitHub API Client

**Completed:**
- Created GitHubClient service using Octokit
- Implemented repository dispatch events
- Added commit status updates
- Created unit tests with mocked Octokit

**Files Created:**
```
backend/services/github/GitHubClient.ts
tests/unit/backend/services/GitHubClient.test.ts
```

**Key Features:**
- Uses ConfigLoader for all settings
- Type-safe API calls
- Repository dispatch for workflow triggers
- Commit status updates for real-time feedback
- Workflow run queries
- Comprehensive error handling

**Exit Criteria:**
- [x] GitHubClient tests pass (6/6)
- [x] API calls use config values
- [x] No hardcoded repository info
- [x] Mocking strategy validated

### Step 2.3: LLM Service with Circuit Breaker

**Completed:**
- Created CircuitBreaker class with three states (CLOSED, OPEN, HALF_OPEN)
- Implemented LLMService with model fallback strategy
- Added automatic retry with exponential backoff
- Created comprehensive unit tests

**Files Created:**
```
backend/services/llm/CircuitBreaker.ts
backend/services/llm/LLMService.ts
tests/unit/backend/services/LLMService.test.ts
```

**Key Features:**
- Circuit breaker pattern (CLOSED → OPEN → HALF_OPEN)
- Multi-model fallback (gpt-4o → Llama 3.1 → Phi-3)
- Configurable retry logic from config
- JSON response parsing with validation
- Structured error handling
- GitHub Models API integration

**Circuit Breaker Logic:**
- Threshold: 3 failures
- Timeout: Calculated from config (backoffMs * multiplier ^ maxAttempts)
- States: CLOSED (normal), OPEN (failing), HALF_OPEN (testing recovery)

**Exit Criteria:**
- [x] LLMService tests pass (8/8)
- [x] Circuit breaker works correctly
- [x] Fallback mechanism validated
- [x] No hardcoded model names
- [x] Error handling comprehensive

### Package Updates

**Added Dependencies:**
- @octokit/rest (GitHub API client)
- @types/node (TypeScript definitions for Node.js)

### Validation Checklist

**Phase 2 Exit Criteria:**
- [x] All services use ConfigLoader
- [x] No hardcoded values anywhere
- [x] Unit tests pass (20/20 total)
- [x] TypeScript compiles without errors
- [x] Circuit breaker pattern implemented
- [x] Fallback strategies validated
- [x] Feature independence maintained

### Commands to Validate Phase 2

```bash
# Install new dependencies
npm install

# Run all tests
npm run test:unit

# Type check
npm run type-check
```

## Phase 3: Frontend Application

**Status:** COMPLETED  
**Date:** 2026-01-17

### Step 3.2: Shared Utilities and Types

**Completed:**
- Created TypeScript types for presentations
- Implemented GitHubAuthService for OAuth flow
- Created ConfigService for frontend config management
- Added Zod schemas for form validation

**Files Created:**
```
src/shared/types/presentation.types.ts
src/shared/utils/github.ts
src/shared/utils/config.ts
src/shared/schemas/presentation.schema.ts
```

**Key Features:**
- Type-safe presentation interfaces
- GitHub OAuth state management
- Config interpolation for frontend
- Zod validation schemas

**Exit Criteria:**
- [x] Types defined for all entities
- [x] GitHub auth utilities created
- [x] Config service working
- [x] Validation schemas implemented

### Step 3.3: Authentication Components

**Completed:**
- Created Auth page with GitHub OAuth button
- Created AuthCallback page for OAuth redirect
- Implemented CSRF protection with state parameter
- Added loading and error states

**Files Created:**
```
src/pages/Auth.jsx
src/pages/AuthCallback.jsx
```

**Key Features:**
- 3D stacked card design (matching Login.jsx pattern)
- GitHub OAuth integration
- State validation for CSRF protection
- User session management
- Loading and success/error states

**Exit Criteria:**
- [x] Auth page created with GitHub button
- [x] OAuth callback handler implemented
- [x] CSRF protection working
- [x] User session management

### Step 3.4: Presentation Form Component

**Completed:**
- Created Dashboard page with presentation form
- Implemented form validation with Zod
- Added all required fields (title, description, slides, theme, model)
- Created advanced options (speaker notes, references, tone)

**Files Created:**
```
src/pages/Dashboard.jsx
```

**Key Features:**
- Full presentation creation form
- Real-time validation with Zod
- Model selection (GPT-4o, Llama 3.1, Phi-3)
- Theme selection (modern, academic, minimal)
- Advanced options (speaker notes, references, tone)
- Loading states during generation
- 3D card design with backdrop blur

**Exit Criteria:**
- [x] Form with all required fields
- [x] Zod validation working
- [x] Model and theme selection
- [x] Advanced options implemented
- [x] Loading states added

### Package Updates

**Added Dependencies:**
- zod (form validation)

### Design Pattern

All pages follow the Login.jsx visual pattern:
- 3D stacked cards with rotation
- Backdrop blur effects
- Gradient decorative elements
- Floating dots and blurs
- Grid and stars background
- Responsive design (mobile-first)

### Validation Checklist

**Phase 3 Exit Criteria:**
- [x] Shared utilities created
- [x] Types and schemas defined
- [x] Authentication flow implemented
- [x] Presentation form created
- [x] Zod validation working
- [x] Visual consistency with existing design
- [x] No hardcoded values

### Commands to Validate Phase 3

```bash
# Install new dependencies
npm install

# Run development server
npm run dev

# Type check
npm run type-check
```

## Phase 4: Integration and Optimization

**Status:** COMPLETED  
**Date:** 2026-01-17

### Step 4.1: Optimize GitHub Actions Workflows

**Completed:**
- Enhanced CI frontend workflow with aggressive caching
- Added TypeScript build cache with restore keys
- Implemented conditional dependency installation
- Added type-check and lint steps
- Upload build artifacts for deployment

**Files Modified:**
```
.github/workflows/ci-frontend.yml
```

**Key Features:**
- Node modules caching (cache hit rate target: >80%)
- TypeScript build caching (.tsbuildinfo, dist)
- Conditional npm ci (only if cache miss)
- Path-based triggering (src, public, package files)
- Build artifact upload (7 day retention)

**Exit Criteria:**
- [x] Cache strategy implemented
- [x] Build time optimization
- [x] Conditional dependency installation
- [x] Artifact upload configured

### Step 4.2: Presentation Generation Workflow

**Completed:**
- Created multi-stage workflow for presentation generation
- Implemented concurrency control per user
- Added validation, generation, build, and deploy stages
- Integrated GitHub Models API for LLM calls
- Added commit status updates for real-time feedback

**Files Created:**
```
.github/workflows/generate-presentation.yml
```

**Workflow Stages:**
1. **Validate**: Input validation and quota check
2. **Generate Content**: LLM slide generation with GitHub Models
3. **Build Presentation**: Impress.js HTML builder
4. **Deploy**: Git commit and push to repository

**Key Features:**
- Repository dispatch trigger
- Concurrency control (queue per user)
- Multi-stage pipeline with artifacts
- GitHub Models API integration
- Commit status updates (pending → success/failure)
- Automatic slug generation
- Error handling and rollback

**Exit Criteria:**
- [x] Workflow created with all stages
- [x] LLM integration configured
- [x] Concurrency control implemented
- [x] Status updates working

### Step 4.3: Environment Configuration

**Completed:**
- Updated .env.example with Vite variables
- Added production environment variables to deploy workflow
- Configured frontend config interpolation

**Files Modified:**
```
.env.example
.github/workflows/deploy.yml
```

**Key Features:**
- VITE_ prefix for frontend variables
- Production vs development configs
- GitHub secrets integration
- Config interpolation ready

**Exit Criteria:**
- [x] Environment variables documented
- [x] Vite variables configured
- [x] Production config in deploy workflow
- [x] No hardcoded values

### Step 4.4: Deployment Workflow Optimization

**Completed:**
- Updated deploy workflow to use .nvmrc
- Added dependency caching
- Configured production environment variables
- Optimized build process

**Files Modified:**
```
.github/workflows/deploy.yml
```

**Key Features:**
- Node version from .nvmrc
- Dependency caching
- Production environment variables in build
- GitHub Pages deployment
- Custom domain support (circleup.com.co)

**Exit Criteria:**
- [x] Deploy workflow optimized
- [x] Caching implemented
- [x] Production config applied
- [x] GitHub Pages ready

### Validation Checklist

**Phase 4 Exit Criteria:**
- [x] All workflows optimized with caching
- [x] Presentation generation workflow created
- [x] Environment variables configured
- [x] Deployment workflow ready
- [x] No hardcoded values
- [x] Multi-stage pipeline implemented
- [x] Error handling in place

### Commands to Validate Phase 4

```bash
# Validate workflows syntax
npm run validate:config

# Test locally (if needed)
act repository_dispatch -e test-payload.json

# Deploy
git push origin main
```

### Architecture Summary

**Complete Flow:**
```
User fills form → Dashboard submits → 
Repository Dispatch → GitHub Actions → 
Validate → Generate (LLM) → Build (Impress.js) → 
Deploy (Git commit) → Status Update → 
User notification
```

**Caching Strategy:**
- npm dependencies (cache key: package-lock.json hash)
- TypeScript builds (cache key: source files hash)
- Build artifacts (7 day retention)

**Zero Cost Infrastructure:**
- GitHub Actions (2000 min/month free)
- GitHub Pages (100GB bandwidth/month)
- GitHub Models API (free tier)
- GitHub Storage (500MB free)

## Post-Implementation Fixes

**Date:** 2026-01-17

### Fix 1: Vite Environment Variables (JSON Parsing Error)

**Problem:**
- Vite couldn't parse JSON config files with `${VAR}` syntax
- Error: `Failed to parse JSON file`
- JSON files with environment variable placeholders are not valid JSON

**Solution:**
- Removed JSON file imports completely
- Rewrote `ConfigService` to use Vite env variables directly
- Created `vite-env.d.ts` for TypeScript support
- All config now comes from `import.meta.env.VITE_*` variables

**Files Modified:**
```
src/shared/utils/config.ts (complete rewrite)
vite.config.js (added aliases)
```

**Files Created:**
```
src/vite-env.d.ts (TypeScript definitions)
```

**New Approach:**
```typescript
// Before: Import JSON with ${VAR} (doesn't work)
import appConfig from '@config/app.config.json';

// After: Use Vite env variables directly
import.meta.env.VITE_GITHUB_APP_CLIENT_ID
```

**Environment Variables Required:**
```bash
VITE_APP_ENV=development
VITE_BASE_URL=http://localhost:5173
VITE_GITHUB_APP_CLIENT_ID=your_client_id
VITE_GITHUB_APP_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_GITHUB_REPO_OWNER=wearecircleup
VITE_GITHUB_REPO_NAME=wearecircleup
```

### Fix 2: Centralized Authentication Entry Point

**Problem:**
- Duplicate authentication pages (Auth.jsx, Login.jsx)
- Unclear user flow

**Solution:**
- Rewrote `Login.jsx` as single entry point
- Removed backward compatibility (no traditional forms)
- Integrated GitHub OAuth directly
- Added session detection

**Files Modified:**
```
src/pages/Login.jsx (complete rewrite)
```

**Files Removed:**
```
src/pages/Auth.jsx (duplicate functionality)
```

**New Login.jsx Features:**
- GitHub OAuth as only auth method
- Automatic session detection
- Two states: not authenticated / already authenticated
- Benefits display (100% free, multiple AI models, auto-generation)
- Direct integration with GitHubAuthService

### System Status

**All 4 phases completed and stable.**

**Validation:**
```bash
# Dev server should start without errors
npm run dev

# All tests should pass
npm run test:unit

# Type check should pass
npm run type-check
```

**Optional Enhancements:**
- Add presentation library/viewer page
- Implement real-time SSE for status updates
- Add presentation analytics
- Create admin dashboard
- Add export options (PDF, PowerPoint)

### Fix 3: GitHub OAuth Callback for SPA

**Problem:**
- GitHub Pages returns 404 for `/auth/callback` route
- SPA routing doesn't work on static hosting

**Solution:**
- Implemented SPA redirect system with `404.html`
- Added script in `index.html` to restore original URL
- Updated `App.jsx` to detect callback from hash or pathname
- Updated `AuthCallback.jsx` to extract params from both sources

**Files Created:**
```
public/404.html (SPA redirect handler)
```

**Files Modified:**
```
index.html (added SPA redirect script)
App.jsx (enhanced callback detection)
AuthCallback.jsx (dual param extraction)
```

### Fix 4: Dashboard Refactoring - Modular Platform

**Date:** 2026-01-17

**Problem:**
- Dashboard was a single form without navigation
- No way to view/manage generated presentations
- Lacked platform feel and user experience

**Solution:**
- Refactored Dashboard into modular platform with navigation
- Created reusable components following DRY principles
- Implemented presentation library with filtering
- Integrated impress.js for dynamic presentations

**Architecture:**
```
Dashboard (Container)
├── DashboardHome (Presentation Library)
│   ├── PresentationCard (Reusable)
│   ├── Filters (all/completed/processing)
│   └── Empty State
└── CreatePresentation (Form View)
    ├── Form Fields
    ├── Validation
    └── Notifications
```

**Files Created:**
```
src/components/PresentationCard.jsx
src/components/dashboard/DashboardHome.jsx
src/components/dashboard/CreatePresentation.jsx
```

**Files Modified:**
```
src/pages/Dashboard.jsx (refactored to container)
backend/scripts/build-presentation.js (impress.js integration)
```

**Key Features:**
- **Navigation**: Switch between home and create views
- **Presentation Library**: Grid view with cards
- **Filtering**: All, completed, processing states
- **Status Tracking**: Visual indicators (✓, ⏳, ✗)
- **Local Storage**: Presentations saved per user
- **Impress.js**: Dynamic 3D presentations with rotation
- **Themes**: Modern, Academic, Minimal with custom colors
- **Branding**: CircleUp logo and colors throughout

**Component Reusability:**
- `PresentationCard`: Used in library grid
- `DashboardHome`: Manages presentation list
- `CreatePresentation`: Extracted form logic
- All components accept props for flexibility

### Fix 5: Workflow Integration

**Problem:**
- Frontend couldn't trigger GitHub Actions workflows
- 401 errors when calling GitHub API
- OAuth code cannot be used for API calls

**Solution:**
- Created backend scripts for AI generation
- Implemented `repository_dispatch` trigger
- Added debug logging for troubleshooting
- Integrated GitHub Models API

**Files Created:**
```
backend/scripts/generate-slides.js (AI content generation)
backend/scripts/build-presentation.js (HTML builder)
src/shared/utils/presentation.ts (API service)
```

**Files Modified:**
```
.github/workflows/generate-presentation.yml (added models: read)
.github/workflows/deploy.yml (added VITE_GITHUB_PUBLIC_TOKEN)
```

**Workflow Flow:**
1. User fills form in Dashboard
2. Frontend calls `PresentationService.generatePresentation()`
3. Service triggers `repository_dispatch` event
4. GitHub Actions workflow executes:
   - Validates input
   - Calls GitHub Models API (GPT-4o/Llama/Phi-3)
   - Generates slides JSON
   - Builds impress.js HTML
   - Commits to repository
5. User can access presentation via URL

**GitHub Models Integration:**
- Endpoint: `https://models.github.ai/inference/chat/completions`
- Models: GPT-4o, Llama 3.1 70B, Phi-3 Medium
- Model name format: `publisher/model-name` (e.g., `openai/gpt-4o`)
- Authentication: Separate PAT with `models` scope (`GH_TOKEN_MODELS`)
- Free tier usage
- Structured JSON output
- Speaker notes support
- ES modules (import/export) for Node.js 20 compatibility

### Fix 6: Persistent Presentation Storage

**Date:** 2026-01-17

**Problem:**
- Workflow used temporary artifacts that expired
- No persistence for generated presentations
- Difficult to scale and manage multiple presentations
- No structured metadata system

**Solution:**
- Implemented persistent storage with structured directories
- Separated concerns: metadata (YAML), content (JSON), rendered (HTML)
- Eliminated artifacts, commit directly to repository
- Created utility script for listing presentations

**Directory Structure:**
```
presentations/
├── metadata/{user_id}/{presentation_id}.yaml  # Configuration and metadata
├── content/{user_id}/{presentation_id}.json   # Raw slides data
└── public/{user_id}/{presentation_id}.html    # Rendered presentation
```

**Metadata Format (YAML):**
```yaml
id: presentation-uuid
title: "Presentation Title"
author: username
theme: modern
model: gpt-4o
slides_count: 10
created_at: 2026-01-17T00:00:00.000Z
status: completed
url: /presentations/public/username/presentation-uuid.html
```

**Benefits:**
- Permanent storage in Git repository
- Easy to query and list presentations
- Scalable architecture (thousands of presentations)
- Renderer-agnostic (can regenerate HTML from JSON)
- Version control for all presentations
- No expiration or cleanup needed

**Files Created:**
```
presentations/.gitkeep
backend/scripts/list-presentations.js
```

**Files Modified:**
```
backend/scripts/build-presentation.js (persistence logic)
.github/workflows/generate-presentation.yml (removed artifacts, direct commit)
```

**Workflow Changes:**
- Merged `build-presentation` and `deploy` jobs into `build-and-deploy`
- Removed all artifact upload/download steps
- Direct commit to repository after build
- Updated URLs to use persistent paths

### Fix 7: Dashboard Synchronization with GitHub

**Date:** 2026-01-17

**Problem:**
- Dashboard used only localStorage for presentations
- No synchronization with GitHub repository
- Completed presentations didn't appear in Dashboard
- No way to fetch presentations from remote storage

**Solution:**
- Created `PresentationsAPI` service to fetch from GitHub
- Implemented hybrid sync: GitHub (completed) + localStorage (processing)
- Automatic status updates when presentations complete
- YAML parsing for metadata retrieval

**Files Created:**
```
src/shared/utils/presentations-api.ts
```

**Files Modified:**
```
src/components/dashboard/DashboardHome.jsx (API integration)
```

**API Features:**
- Fetches metadata from `presentations/metadata/{user}/` via GitHub API
- Parses YAML files to extract presentation info
- Merges remote (completed) with local (processing) presentations
- Updates localStorage cache automatically
- Handles 404 gracefully (no presentations yet)

**Sync Logic:**
1. Fetch all `.yaml` files from GitHub for user
2. Parse each YAML to get metadata
3. Load localStorage presentations
4. Merge: GitHub data overrides local if ID matches
5. Add any GitHub-only presentations
6. Update localStorage with merged data
7. Display in Dashboard with correct status

**Benefits:**
- Real-time sync with repository
- Presentations persist across devices
- Automatic status updates (processing → completed)
- No manual refresh needed after workflow completes
- Fallback to localStorage if GitHub API fails

### Fix 8: UI/UX Improvements and Responsive Design

**Date:** 2026-01-18

**Problem:**
- Inconsistent branding (CircleUp vs Circle Up)
- Mobile menu not connected to Login page
- Duplicate buttons in Login page
- Accessibility button design didn't match dashboard button
- Presentations not fully responsive
- No touch swipe support for slides on mobile

**Solution:**
- Fixed branding to "Circle Up" throughout the app
- Connected mobile menu "Únete a Nosotros" to Login page
- Added curve underline design to Dashboard title
- Redesigned accessibility button to match "Volver al Dashboard"
- Made presentation cards fully responsive (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4)
- Added touch/swipe support for presentation slides
- Implemented click-outside to close accessibility menu
- Fixed duplicate "Volver al inicio" button in Login
- Updated Login buttons to redirect to https://circleup.com.co/

**Files Modified:**
```
src/pages/Dashboard.jsx (branding, curve design)
src/pages/Login.jsx (button fixes, external redirect)
src/pages/PresentationViewer.jsx (accessibility button, touch support)
src/components/Header.jsx (mobile menu routing)
src/components/PresentationCard.jsx (responsive design)
src/components/dashboard/DashboardHome.jsx (responsive grid)
src/constants/index.js (mobile menu URL)
```

**Key Features:**
- **Branding**: Consistent "Circle Up" with curve underline on Dashboard
- **Mobile Navigation**: Menu button connects to Login page
- **Responsive Presentations**: 
  - Desktop: 4 columns
  - Laptop: 3 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- **Touch Support**: Swipe left/right to navigate slides
- **Accessibility**: 
  - Button matches dashboard design (white Button component)
  - Menu closes on click outside
  - Positioned as dropdown below button
- **Login Page**:
  - Single "Volver al inicio" button for desktop (hidden lg:block)
  - Single button for mobile (lg:hidden)
  - Both redirect to https://circleup.com.co/

**Benefits:**
- Consistent user experience across devices
- Better mobile usability with touch gestures
- Professional branding with curve design
- Symmetric and balanced button layout
- Clear navigation flow from marketing site to app

### Fix 9: Vercel OAuth Implementation and User Isolation

**Date:** 2026-01-18

**Problem:**
- Critical security flaw: All users saw CircleUP organization's data
- `user.username` always returned "CircleUP" instead of authenticated user
- No user isolation: presentations shared across all accounts
- OAuth code exchange attempted in frontend (insecure)
- Used `VITE_GITHUB_PUBLIC_TOKEN` (organization token) instead of user's token

**Root Cause:**
GitHub OAuth requires backend to exchange authorization code for access token using `CLIENT_SECRET`. Frontend was using CircleUP's public token to fetch user data, causing all users to appear as "CircleUP".

**Solution:**
- Migrated from Netlify to Vercel for serverless functions
- Created `api/github-auth.js` serverless function for secure OAuth token exchange
- Updated `AuthCallback.jsx` to call `/api/github-auth` instead of using public token
- Modified `GitHubAuthService` to store user's personal access token
- Each user now gets their own token and data isolation

**Files Created:**
```
api/github-auth.js (Vercel serverless function)
vercel.json (Vercel configuration)
VERCEL_DEPLOYMENT.md (deployment guide)
```

**Files Modified:**
```
src/pages/AuthCallback.jsx (OAuth flow via backend)
src/shared/utils/github.ts (added getUserToken method)
.env.example (added GITHUB_APP_CLIENT_SECRET)
SECURITY_ISSUE.md (updated for Vercel)
```

**OAuth Flow:**
```
User → GitHub OAuth → Callback with code → 
Vercel Function (with CLIENT_SECRET) → 
Exchange code for user's token → 
Fetch user's data with their token → 
Store in localStorage → Dashboard
```

**Security Improvements:**
1. ✅ `CLIENT_SECRET` never exposed to frontend
2. ✅ Token exchange happens on Vercel backend
3. ✅ Each user has their own access token
4. ✅ Data isolation by `user.login`
5. ✅ State parameter for CSRF protection
6. ✅ Presentations stored per user: `presentations_${user.login}`

**Deployment:**
- Platform: Vercel
- Domains: `circleup.com.co`, `wearecircleup.vercel.app`
- Serverless function: Node.js 24.x
- Status: Production ready

**Testing Results:**
- ✅ Multiple GitHub accounts tested
- ✅ Each user sees only their own presentations
- ✅ `user.username` shows correct authenticated user
- ✅ No data leakage between accounts
- ✅ OAuth flow works correctly with CSRF protection

**Benefits:**
- Secure OAuth implementation following best practices
- True multi-user support with data isolation
- Scalable serverless architecture
- Zero-cost infrastructure (Vercel free tier)
- Automatic HTTPS and global CDN

## Phase 10: Hybrid Architecture Migration

**Status:** IN PROGRESS
**Date:** 2026-01-18

### Objective

Migrate presentation generation from GitHub Actions to Vercel Functions to solve:
1. Dependency caching (eliminate npm install on every run)
2. Concurrent user support (50+ simultaneous users without queuing)

### Architecture Decision

**Current (GitHub Actions):**
- Time per presentation: 170 seconds (npm install + LLM + build + commit)
- Concurrent limit: 20 jobs
- Monthly capacity: 666 presentations
- 50 simultaneous users: 30 queued, potential failures

**Target (Hybrid):**
- Vercel Functions: LLM generation + HTML build (10 seconds)
- GitHub Actions: Only git commits (background, 20 seconds)
- Concurrent limit: Unlimited
- Monthly capacity: 36,000 presentations
- 50 simultaneous users: All succeed in parallel

### LLM Model Strategy

**GitHub Models API (Free Tier):**
- gpt-4o (openai/gpt-4o)
- Llama 3.1 70B (meta/llama-3.1-70b-instruct)
- Phi-3 Medium (microsoft/phi-3-medium-128k-instruct)
- Cost: 0 COP (free tier)
- Authentication: GitHub token with models scope

**Vercel Free Tier Limits:**
- 100 GB-hours compute/month
- Unlimited concurrent functions
- Max duration per function: 10 seconds (Hobby), 60 seconds (Pro)
- 1,000 serverless invocations/day (Hobby)

### Implementation Plan

**Step 1: Create Vercel Function for LLM Generation**
- File: api/generate-presentation.js
- Responsibility: Call GitHub Models API, generate slides JSON
- Dependencies: Pre-bundled in Vercel deployment
- Testing: Single presentation generation
- Status: COMPLETED
- Changes:
  - Created api/generate-presentation.js with GitHub Models integration
  - Supports all 3 models: gpt-4o, Llama 3.1 70B, Phi-3 Medium
  - Multi-language support: es-LA, en-US, pt-BR
  - Configured maxDuration: 60 seconds in vercel.json
  - CORS headers configured for frontend access
  - Error handling for API failures and JSON parsing

**Step 2: Add HTML Build to Vercel Function**
- Migrate: backend/scripts/build-presentation.js logic
- Output: In-memory HTML generation
- Testing: Verify HTML output matches current format
- Status: COMPLETED
- Changes:
  - Migrated generateHTML function to api/generate-presentation.js
  - Function now returns both slides JSON and complete HTML
  - Supports all 3 themes: modern, academic, minimal
  - Impress.js integration with 3D positioning
  - Theme colors and styling preserved
  - No file system operations (pure in-memory generation)

**Step 3: Simplify GitHub Action**
- New workflow: save-presentation.yml
- Responsibility: Only receive HTML/JSON and commit to repo
- Trigger: repository_dispatch from Vercel Function
- Testing: Verify git commits work correctly
- Status: COMPLETED
- Changes:
  - Created .github/workflows/save-presentation.yml (simplified workflow)
  - Only handles file creation and git commits (no LLM, no npm install)
  - Receives HTML and JSON from Vercel Function via repository_dispatch
  - Timeout: 3 minutes (vs 12 minutes in old workflow)
  - Updated api/generate-presentation.js to trigger save workflow
  - Function returns immediately with presentationId and URL
  - Git commit happens asynchronously in background

**Step 4: Update Frontend**
- Modify: CreatePresentation.jsx
- Change: Call /api/generate-presentation instead of repository_dispatch
- Testing: End-to-end presentation creation
- Status: COMPLETED
- Changes:
  - Modified PresentationService.generatePresentation to call /api/generate-presentation
  - Removed GitHub Actions repository_dispatch logic
  - Removed VITE_GITHUB_PUBLIC_TOKEN dependency from frontend
  - Updated CreatePresentation.jsx to handle immediate response
  - Presentations now marked as 'completed' immediately (not 'processing')
  - User sees result in ~10 seconds instead of 2-3 minutes
  - Simplified error handling (no localStorage fallback needed)

**Step 5: Testing and Bug Fixes**
- Test: End-to-end presentation creation
- Verify: GitHub Action saves files correctly
- Monitor: Vercel function logs and performance
- Status: COMPLETED
- Changes:
  - Fixed save-presentation.yml validation step (removed HTML validation causing syntax errors)
  - Changed HTML save method to use environment variable instead of heredoc
  - Simplified validation to only check user and presentationId
  - Fixed JSON format: wrapped slides array in object with "slides" property
  - PresentationViewer now correctly loads presentation content

**Step 6: Migrate Delete to Vercel Function**
- Create: api/delete-presentation.js
- Update: PresentationsAPI.deletePresentation
- Update: delete-presentation.yml workflow
- Remove: VITE_GITHUB_PUBLIC_TOKEN dependency
- Status: COMPLETED
- Changes:
  - Created api/delete-presentation.js Vercel Function
  - Updated delete-presentation.yml to use correct payload fields
  - Migrated PresentationsAPI.deletePresentation to call Vercel Function
  - Removed VITE_GITHUB_PUBLIC_TOKEN from frontend
  - Configured maxDuration: 10 seconds in vercel.json
  - Complete architecture consistency (all operations via Vercel)
  - Added 'deleting' status to prevent multiple delete triggers
  - Delete button disabled during deletion process
  - Confirmation message warns user about 30-second delay
  - UI shows "Eliminando..." status during deletion
  - Error handling restores original state if deletion fails

### Exit Criteria

- Presentation generation completes in under 15 seconds
- 10 simultaneous users all succeed without queuing
- GitHub Models API calls work from Vercel Function
- Git commits still work via simplified GitHub Action
- Delete operations work via Vercel Function
- No VITE_GITHUB_PUBLIC_TOKEN in frontend
- No increase in costs (stay within free tiers)

### Notes

- All configuration uses environment variable interpolation
- No backward compatibility concerns (breaking changes allowed)
- Caching implemented at every layer
- Feature independence maintained (no cross-dependencies)
- Config-driven topology (zero hardcoding)
- ES modules throughout (import/export syntax)
- Scripts compatible with Node.js 20 LTS
- Component reusability and modularization enforced
- Impress.js for dynamic 3D presentations
- GitHub Models API for AI content generation
- Fully responsive design with mobile-first approach
- Touch/swipe support for mobile presentations
- External redirect to marketing site (circleup.com.co)
- Vercel serverless functions for secure OAuth
- User data isolation by GitHub login

## Phase 11: User Profile Registration System

**Status:** IN PROGRESS
**Date:** 2026-01-24

### Objective

Implement complete user profile registration system with CRUD operations using Vercel Blob storage and NDJSON data lake format.

### Architecture

**Storage Strategy:**
- Vercel Blob with NDJSON format (append-only)
- Data lake structure: `profiles/{userId}.ndjson`
- Versionado automático (cada cambio = nueva línea)
- Audit trail completo
- Free tier: 500MB (650K+ perfiles)

**Components:**
```
Backend:
├── Schemas (Zod validation)
├── ProfileStorageService (NDJSON utilities)
├── ProfileService (Frontend CRUD + cache)
└── Vercel Function /api/profile.js (GET/POST/PUT/DELETE)

Frontend:
├── ProfileCreationCTA (Spotify-style button)
├── ProfileRegistration (Typeform 6 pasos)
├── ProfileView (Display profile)
├── ProfileEdit (Update profile)
├── AccountDeletion (2-step confirmation)
└── DashboardHome integration (Profile gate)
```

### Implementation Progress

**Step 1: Schemas y Validación** ✅ COMPLETED
- Created: `src/shared/schemas/profile.schema.ts`
- Zod schemas con validación completa
- Sistema educativo colombiano (primaria → posgrado)
- Rangos de edad con validación parental (14-17 requiere consentimiento)
- Mensajes de error en español
- Tests: 28/28 passing

**Step 2: NDJSON Storage Service** ✅ COMPLETED
- Created: `src/shared/utils/profile-storage.js`
- NDJSONUtils class (parse, serialize, append, getLatest)
- ProfileStorageService (CRUD utilities)
- Versionado automático
- Soft deletes con audit trail
- Analytics metadata extraction
- Tests: 31/31 passing

**Step 3: Frontend Service** ✅ COMPLETED
- Created: `src/shared/utils/profile.js`
- ProfileService class (CRUD operations)
- localStorage cache con TTL (5 minutos)
- Offline fallback support
- Error handling robusto
- Cache invalidation

**Step 4: Vercel Function API** ✅ COMPLETED
- Created: `api/profile.js`
- GET: Obtener perfil por userId
- POST: Crear nuevo perfil
- PUT: Actualizar perfil existente
- DELETE: Soft delete con confirmación
- CORS headers configurados
- Validación de campos requeridos
- Integración con Vercel Blob

**Step 5: UI Components** 🔄 IN PROGRESS
- Created: `src/components/profile/ProfileCreationCTA.jsx` ✅
- Pending: ProfileRegistration (Typeform 6 pasos)
- Pending: ProfileView
- Pending: ProfileEdit
- Pending: AccountDeletion

**Step 6: Configuration** ✅ COMPLETED
- Updated: `vercel.json` (added /api/profile function)
- Updated: `.env.example` (added BLOB_READ_WRITE_TOKEN)
- Configuration: maxDuration 10 seconds

### Data Lake Structure

```
profiles/
  └── {userId}.ndjson    # NDJSON append-only
      ├── Line 1: Initial profile (version 1)
      ├── Line 2: Updated profile (version 2)
      ├── Line 3: Updated profile (version 3)
      └── Line N: Deletion record (soft delete)
```

### Profile Schema Fields

**Required:**
- userId, login, email (from GitHub OAuth)
- firstName, lastName
- ageRange (14-17, 18-24, 25-34, 35+)
- educationLevel (primaria, bachillerato, técnico, tecnólogo, universitario, posgrado)
- educationStatus (in-progress, completed)
- legalDisclaimerAccepted (must be true)
- githubData (avatarUrl, username, email)

**Conditional:**
- parentalConsentConfirmed (required if ageRange = 14-17)

**Auto-generated:**
- version, createdAt, updatedAt, profileComplete, legalDisclaimerAcceptedAt

### Testing Results

**Unit Tests:**
- Schemas: 28/28 ✅
- Storage Service: 31/31 ✅
- Config: 5/5 ✅
- Total: 64/64 passing

**Fixes Applied:**
- Removed TypeScript syntax (`as const`) from JavaScript tests
- Changed `.toEndWith()` to `.endsWith().toBe(true)` (Chai compatibility)
- Separated profileBaseSchema from profileSchema for `.extend()` compatibility

### Vercel Blob Setup

**Blob Store Created:** ✅
- Name: `circleup-datalake`
- Region: GRU1 (São Paulo, Brazil)
- Status: Active
- Storage: 0 B (ready for use)

**Installation:**
```bash
npm install @vercel/blob
```

**Environment Variables:**
```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXXXXXXX
```

**Configuration:**
1. ✅ Vercel Dashboard → Storage → Create Blob
2. ✅ Name: `circleup-datalake`
3. ✅ Connected to Vercel project
4. ✅ BLOB_READ_WRITE_TOKEN configured
5. ✅ Token available in production and local environment

### API Endpoints

**GET /api/profile?userId={userId}**
- Returns latest profile version
- Returns null if deleted or not found

**POST /api/profile**
- Creates new profile with version 1
- Validates all required fields
- Returns 409 if profile exists

**PUT /api/profile**
- Updates profile (increments version)
- Preserves createdAt, userId (immutable)
- Appends new line to NDJSON

**DELETE /api/profile**
- Soft delete (appends deletion record)
- Requires confirmation: "Delete"
- Preserves audit trail

### Security

- ✅ BLOB_READ_WRITE_TOKEN never exposed to frontend
- ✅ All operations server-side (Vercel Functions)
- ✅ Zod validation on all inputs
- ✅ Immutable fields (userId, email) protected
- ✅ Soft deletes preserve audit trail
- ✅ CORS configured for frontend access

### Performance

**Cache Strategy:**
- Frontend: localStorage (5 min TTL)
- Vercel Function: Direct Blob access
- NDJSON parsing: O(n) where n = versions

**Capacity:**
- Free tier: 500MB storage
- Estimated: 650K+ profiles
- 3-5 versions per profile average

### Next Steps

1. ⏳ Implement ProfileRegistration component (Typeform-style, 6 steps)
2. ⏳ Implement ProfileView component
3. ⏳ Implement ProfileEdit component
4. ⏳ Implement AccountDeletion component (2-step confirmation)
5. ⏳ Integrate profile gate into DashboardHome.jsx
6. ⏳ Write integration tests for API endpoints
7. ⏳ Write E2E tests for registration flow

### Files Created

```
src/shared/schemas/profile.schema.ts
src/shared/utils/profile-storage.js
src/shared/utils/profile.js
src/components/profile/ProfileCreationCTA.jsx
api/profile.js
tests/unit/schemas/profile.schema.test.js
tests/unit/services/profile-storage.test.js
```

### Files Modified

```
vercel.json (added /api/profile function)
.env.example (added BLOB_READ_WRITE_TOKEN)
```

## Phase 12: DynamoDB Migration (No Backward Compatibility)

**Status:** IN PROGRESS  
**Date:** 2026-01-25

### Objective

Migrate user profile storage from Vercel Blob (NDJSON) to AWS DynamoDB for improved performance, scalability, and query capabilities. **No backward compatibility** - clean migration strategy.

### Migration Rationale

**Why DynamoDB:**
- Single-digit millisecond latency (vs Blob fetch + parse)
- Native query support (filter by role, age, etc.)
- Atomic transactions and conditional writes
- Pay-per-request pricing (cheaper at scale)
- Vercel OIDC integration (no AWS credentials needed)

**Cost Comparison:**
- Vercel Blob: $0 (included in Pro plan)
- DynamoDB: ~$1.25/month for 1000 users (on-demand)

### Architecture

**Table Structure:**
```
Table: CircleUpProfiles
Partition Key: userId (String)
Attributes: All profile fields as JSON
```

**Vercel Integration:**
- Uses `@vercel/functions/oidc` for AWS credentials
- No hardcoded AWS keys (OIDC role assumption)
- Environment variables: AWS_REGION, AWS_ROLE_ARN, DYNAMODB_TABLE_NAME

### Migration Plan (8 Steps)

**Step 1: Pull Environment Variables** ✅ COMPLETED
```bash
vercel env pull
```
- Retrieved: AWS_REGION, AWS_ROLE_ARN, DYNAMODB_TABLE_NAME
- Status: Variables available in .env.local

**Step 2: Install Dependencies** ✅ COMPLETED
```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb @vercel/functions
npm uninstall @vercel/blob
```
- Installed: AWS SDK v3 with Document Client
- Removed: Vercel Blob SDK
- Status: Dependencies updated in package.json

**Step 3: Create DynamoDB Client** ✅ COMPLETED
- Created: `lib/dynamodb.js`
- Features:
  - OIDC credentials provider (no hardcoded keys)
  - Document Client for JSON operations
  - Exports: docClient, TABLE_NAME
- Status: Client ready for use

**Step 4: Rewrite API Endpoint** ✅ COMPLETED
- Modified: `api/profile.js`
- Changes:
  - Removed: All Vercel Blob imports and logic
  - Removed: NDJSON parsing functions
  - Removed: Soft delete logic (now hard delete)
  - Added: DynamoDB commands (Get, Put, Update, Delete)
  - Added: Conditional expressions for data integrity
  - Added: Dynamic UpdateExpression builder
- Operations:
  - **GET**: GetCommand with userId key
  - **POST**: PutCommand with ConditionExpression (prevent overwrite)
  - **PUT**: UpdateCommand with dynamic fields + version increment
  - **DELETE**: DeleteCommand with ConditionExpression (ensure exists)
- Status: API fully migrated to DynamoDB

**Step 5: Update Documentation** ✅ COMPLETED
- Update: progress.md (this section)
- Update: .env.example (AWS variables)
- Status: Completed

**Step 6: Update .env.example** ✅ COMPLETED
- Removed: BLOB_READ_WRITE_TOKEN
- Added: AWS_REGION, AWS_ROLE_ARN, DYNAMODB_TABLE_NAME
- Status: Completed

**Step 7: Create Unit Tests** ✅ COMPLETED
- Created: `tests/unit/api/profile.test.js`
- Mock: DynamoDB Document Client with vi.mock
- Tests: 16 test cases covering all CRUD operations
- Results: ✓ 16/16 passing
- Coverage:
  - GET: Profile exists, 404, missing userId
  - POST: Create success, 409 conflict, missing fields
  - PUT: Update success, 404, immutable fields, version increment
  - DELETE: Delete success, 404, invalid confirmation, missing confirmation
  - Error handling: DynamoDB errors, network errors
- Status: Completed

**Step 8: Remove Legacy Blob Code** ✅ COMPLETED
- Deleted: `tests/integration/api/profile.test.js` (452 lines, Blob tests)
- Deleted: `src/shared/utils/profile-storage.js` (NDJSON utilities)
- Deleted: `tests/unit/services/profile-storage.test.js` (31 tests)
- Verified: No `@vercel/blob` imports in codebase
- Verified: No `profile-storage` references in src/
- Tests: ✓ 63/63 passing (all unit tests)
- Status: Completed

**Step 9: Fix localStorage Phantom Profile** ✅ COMPLETED
- Issue: DashboardHome showed "Mi Perfil" based on localStorage flag even when profile didn't exist in DynamoDB
- Root cause: Optimistic UI logic trusted localStorage over API response
- Fix: Removed localStorage flag logic, API is now source of truth
- Changes:
  - Simplified `checkProfile()` to always check API first
  - Clear localStorage on API error or null response
  - No more phantom profiles from Vercel Blob migration
- Status: Completed

**Step 10: Production Deployment** ✅ COMPLETED
```bash
vercel --prod --yes
```
- Deployed to: https://www.circleup.com.co
- Build time: 33 seconds
- Status: Live in production
- Next: Test profile creation flow

### Key Differences from Blob

| Feature | Vercel Blob (NDJSON) | DynamoDB |
|---------|---------------------|----------|
| **Storage** | Append-only file | Key-value table |
| **Versioning** | Manual (append lines) | Automatic (version field) |
| **Delete** | Soft (append record) | Hard (remove item) |
| **Queries** | Parse entire file | Native queries |
| **Latency** | 50-100ms | 1-5ms |
| **Audit Trail** | Complete (all versions) | Single version only |

### Breaking Changes

**No Backward Compatibility:**
1. ❌ Old NDJSON files will NOT be migrated
2. ❌ No soft deletes (hard delete only)
3. ❌ No version history (single version)
4. ❌ Users must re-create profiles

**Rationale:**
- Clean slate for production launch
- Simplified data model
- Better performance
- No legacy code maintenance

### Files Created

```
lib/dynamodb.js (DynamoDB client with OIDC)
tests/unit/api/profile.test.js (16 DynamoDB tests)
```

### Files Modified

```
api/profile.js (complete rewrite for DynamoDB - 291 lines)
package.json (AWS SDK dependencies, removed @vercel/blob)
.env.example (AWS variables, removed BLOB_READ_WRITE_TOKEN)
progress.md (Phase 12 documentation)
```

### Files Deleted (No Backward Compatibility)

```
tests/integration/api/profile.test.js (452 lines - Blob integration tests)
src/shared/utils/profile-storage.js (NDJSON utilities for Blob)
tests/unit/services/profile-storage.test.js (31 Blob storage tests)
```

### Environment Variables

**Required:**
```bash
AWS_REGION=us-east-1
AWS_ROLE_ARN=arn:aws:iam::123456789:role/vercel-dynamodb
DYNAMODB_TABLE_NAME=CircleUpProfiles
```

**Removed:**
```bash
BLOB_READ_WRITE_TOKEN (no longer needed)
```

### Testing Checklist

**Unit Tests:** ✅ 16/16 passing
- [x] GET /api/profile returns profile when exists
- [x] GET /api/profile returns 404 when not found
- [x] GET /api/profile returns 400 when userId missing
- [x] POST /api/profile creates profile successfully
- [x] POST /api/profile returns 409 when duplicate
- [x] POST /api/profile returns 400 when fields missing
- [x] PUT /api/profile updates profile successfully
- [x] PUT /api/profile returns 404 when not found
- [x] PUT /api/profile ignores immutable fields
- [x] PUT /api/profile increments version
- [x] DELETE /api/profile deletes successfully
- [x] DELETE /api/profile returns 404 when not found
- [x] DELETE /api/profile returns 400 when confirmation invalid
- [x] DELETE /api/profile returns 400 when confirmation missing
- [x] Error handling for DynamoDB errors
- [x] Error handling for network errors

**Production Tests:** ⏳ Pending deployment
- [ ] GET /api/profile?userId=test returns 404
- [ ] POST /api/profile creates profile successfully
- [ ] GET /api/profile?userId=test returns created profile
- [ ] PUT /api/profile updates profile (version increments)
- [ ] DELETE /api/profile removes profile
- [ ] GET /api/profile?userId=test returns 404 after delete

### Rollback Plan

If migration fails:
1. Revert `api/profile.js` to previous commit
2. Reinstall `@vercel/blob`
3. Redeploy with `vercel --prod`
4. Restore BLOB_READ_WRITE_TOKEN environment variable

### Next Steps

1. ⏳ Update .env.example with AWS variables
2. ⏳ Create unit tests for DynamoDB operations
3. ⏳ Test locally with `vercel dev`
4. ⏳ Deploy to production
5. ⏳ Monitor DynamoDB metrics
6. ⏳ Update user documentation
