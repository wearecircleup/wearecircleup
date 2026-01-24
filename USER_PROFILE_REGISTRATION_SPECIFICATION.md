# Technical Specification: User Profile Registration System (CRUD)

## Executive Summary

This specification outlines the implementation of a comprehensive user profile registration system with full CRUD operations for the CircleUp platform. The system leverages Vercel Blob storage with NDJSON format for data persistence, ensuring scalability, reliability, and zero-cost infrastructure alignment with the existing architecture. The system includes a mandatory profile completion gate, Typeform-style registration flow, and strict account deletion safeguards.

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
[No Profile] → Profile Creation CTA (Spotify-style button)
    ↓
Profile Registration Form (Typeform-style)
    ↓
Legal Disclaimer Acceptance
    ↓
Vercel Function → Vercel Blob (NDJSON append)
    ↓
Dashboard Access Granted
```

### 1.3 Storage Architecture

**Vercel Blob Structure:**
```
/profiles/{userId}.ndjson          # User profile records (versioned, append-only)
```

**NDJSON Format Benefits:**
- Append-only operations (no file locking)
- Streaming support for large datasets
- Version history preservation (audit trail)
- Efficient line-by-line processing
- Scalable to millions of records
- Automatic versioning for profile updates

## 2. User Profile System

### 2.1 Profile Data Schema

```typescript
interface UserProfile {
  // System fields
  id: string;                    // GitHub user ID
  login: string;                 // GitHub username
  email: string;                 // From GitHub OAuth (non-editable)
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
  version: number;               // Profile version for history
  
  // Required profile fields
  firstName: string;             // Required (2-50 chars)
  lastName: string;              // Required (2-50 chars)
  ageRange: '14-17' | '18-24' | '25-34' | '35+'; // Required
  educationLevel: EducationLevel; // Required (see schema below)
  educationStatus: 'in-progress' | 'completed'; // Required
  
  // Legal compliance
  legalDisclaimerAccepted: boolean;     // Required (must be true)
  legalDisclaimerAcceptedAt: string;    // ISO 8601 timestamp
  parentalConsentConfirmed: boolean;    // Required if ageRange is '14-17'
  
  // Metadata
  profileComplete: boolean;      // Completion status
  githubData: {
    avatarUrl: string;
    username: string;
    email: string;               // Immutable from GitHub
  };
}

interface EducationLevel {
  level: 'primaria' | 'bachillerato' | 'tecnico' | 'tecnologo' | 'universitario' | 'posgrado';
  status: 'in-progress' | 'completed';
}
```

### 2.2 Colombian Education System Levels

The education level field follows the Colombian education system:

1. **Primaria** (Primary Education)
   - Grades 1-5
   - Ages 6-10

2. **Bachillerato** (Secondary Education)
   - Grades 6-11
   - Ages 11-16

3. **Tecnico** (Technical Education)
   - 1-2 years post-secondary
   - Vocational/technical training

4. **Tecnologo** (Technological Education)
   - 2-3 years post-secondary
   - Advanced technical training

5. **Universitario** (University Education)
   - 4-5 years
   - Bachelor's degree

6. **Posgrado** (Postgraduate Education)
   - Specialization, Master's, Doctorate

Each level can be marked as:
- **In Progress**: Currently studying
- **Completed**: Finished the level

### 2.3 Age Restrictions and Parental Consent

**Age Restrictions:**
- Minimum age: 14 years old
- Users under 14 cannot create an account
- Users 14-17 require parental consent confirmation

**Parental Consent Flow:**
```
User selects age range "14-17"
    ↓
Additional checkbox appears:
"Confirmo que cuento con el consentimiento de mis padres o tutores legales para participar en Circle Up"
    ↓
Must be checked to proceed
    ↓
Stored as parentalConsentConfirmed: true
```

## 3. User Interface Components

### 3.1 Profile Creation CTA (No Profile State)

**Location:** `src/components/dashboard/ProfileCreationCTA.jsx`

**Design Specifications:**
- Spotify-style centered button
- Full-screen centered layout
- Gradient background with CircleUp branding
- Large, prominent call-to-action

**Visual Design:**
```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│          [CircleUp Logo/Icon]           │
│                                         │
│     ¡Bienvenido a Circle Up!           │
│                                         │
│   Para comenzar, necesitamos conocerte │
│                                         │
│     ┌─────────────────────────┐        │
│     │   Crear Mi Perfil       │        │
│     │   [Gradient Button]     │        │
│     └─────────────────────────┘        │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Component Code Structure:**
```jsx
const ProfileCreationCTA = ({ onCreateProfile }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-n-8 via-n-7 to-n-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <img src="./assets/grid.png" alt="" className="w-full h-full object-cover" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 px-4">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-color-1 to-color-2 rounded-full flex items-center justify-center">
            {/* CircleUp Icon */}
          </div>
        </div>
        
        {/* Welcome text */}
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-n-1">
            ¡Bienvenido a Circle Up!
          </h1>
          <p className="text-xl text-n-4 max-w-md mx-auto">
            Para comenzar, necesitamos conocerte un poco mejor
          </p>
        </div>
        
        {/* CTA Button - Spotify style */}
        <button
          onClick={onCreateProfile}
          className="group relative px-12 py-5 bg-gradient-to-r from-color-1 to-color-2 rounded-full text-n-1 font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-color-1/50"
        >
          <span className="relative z-10">Crear Mi Perfil</span>
          <div className="absolute inset-0 bg-gradient-to-r from-color-2 to-color-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        
        {/* Subtle info text */}
        <p className="text-sm text-n-5 max-w-sm mx-auto">
          Solo te tomará 2 minutos completar tu perfil
        </p>
      </div>
    </div>
  );
};
```

### 3.2 Profile Registration Form (Typeform Style)

**Location:** `src/components/dashboard/ProfileRegistration.jsx`

**Design Philosophy:**
- One question at a time (Typeform approach)
- Smooth transitions between steps
- Progress indicator
- Large, readable typography
- Modern, clean design matching CircleUp UI
- Mobile-first responsive design

**Form Steps:**

#### Step 1: First Name
```
┌─────────────────────────────────────────┐
│ [Progress: 1/6]                         │
│                                         │
│ ¿Cuál es tu nombre?                    │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ [Input field]                    │   │
│ └─────────────────────────────────┘   │
│                                         │
│              [Continuar →]              │
│                                         │
└─────────────────────────────────────────┘
```

#### Step 2: Last Name
```
┌─────────────────────────────────────────┐
│ [Progress: 2/6]                         │
│                                         │
│ ¿Y tu apellido?                        │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ [Input field]                    │   │
│ └─────────────────────────────────┘   │
│                                         │
│    [← Atrás]      [Continuar →]        │
│                                         │
└─────────────────────────────────────────┘
```

#### Step 3: Email (Non-editable)
```
┌─────────────────────────────────────────┐
│ [Progress: 3/6]                         │
│                                         │
│ Tu correo electrónico                  │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ user@example.com [locked icon]   │   │
│ └─────────────────────────────────┘   │
│                                         │
│ ℹ Este correo proviene de tu cuenta    │
│   de GitHub y no puede ser modificado  │
│                                         │
│    [← Atrás]      [Continuar →]        │
│                                         │
└─────────────────────────────────────────┘
```

#### Step 4: Age Range
```
┌─────────────────────────────────────────┐
│ [Progress: 4/6]                         │
│                                         │
│ ¿En qué rango de edad te encuentras?   │
│                                         │
│ ┌─────────────┐  ┌─────────────┐      │
│ │   14-17     │  │   18-24     │      │
│ └─────────────┘  └─────────────┘      │
│                                         │
│ ┌─────────────┐  ┌─────────────┐      │
│ │   25-34     │  │    35+      │      │
│ └─────────────┘  └─────────────┘      │
│                                         │
│    [← Atrás]                            │
│                                         │
└─────────────────────────────────────────┘
```

**If age range 14-17 is selected:**
```
┌─────────────────────────────────────────┐
│ [Progress: 4/6]                         │
│                                         │
│ ⚠ Consentimiento Parental Requerido    │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ ☐ Confirmo que cuento con el     │   │
│ │   consentimiento de mis padres o │   │
│ │   tutores legales para participar│   │
│ │   en Circle Up                   │   │
│ └─────────────────────────────────┘   │
│                                         │
│    [← Atrás]      [Continuar →]        │
│                                         │
└─────────────────────────────────────────┘
```

#### Step 5: Education Level
```
┌─────────────────────────────────────────┐
│ [Progress: 5/6]                         │
│                                         │
│ ¿Cuál es tu nivel de escolaridad?     │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ Primaria                         │   │
│ │ Bachillerato                     │   │
│ │ Técnico                          │   │
│ │ Tecnólogo                        │   │
│ │ Universitario                    │   │
│ │ Posgrado                         │   │
│ └─────────────────────────────────┘   │
│                                         │
│ Estado:                                 │
│ ○ En progreso    ○ Completado          │
│                                         │
│    [← Atrás]      [Continuar →]        │
│                                         │
└─────────────────────────────────────────┘
```

#### Step 6: Legal Disclaimer
```
┌─────────────────────────────────────────┐
│ [Progress: 6/6]                         │
│                                         │
│ Términos y Condiciones                 │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ DECLARACIÓN LEGAL                │   │
│ │                                   │   │
│ │ Al crear tu perfil en Circle Up,  │   │
│ │ declaras que:                     │   │
│ │                                   │   │
│ │ 1. Toda la información            │   │
│ │    proporcionada es verídica y    │   │
│ │    precisa.                       │   │
│ │                                   │   │
│ │ 2. Tienes al menos 14 años de     │   │
│ │    edad. Los menores de 14 años   │   │
│ │    no pueden participar.          │   │
│ │                                   │   │
│ │ 3. Si eres menor de edad (14-17), │   │
│ │    cuentas con el consentimiento  │   │
│ │    expreso de tus padres o        │   │
│ │    tutores legales.               │   │
│ │                                   │   │
│ │ 4. Aceptas los términos de uso y  │   │
│ │    política de privacidad de      │   │
│ │    Circle Up.                     │   │
│ │                                   │   │
│ │ El incumplimiento de estas        │   │
│ │ declaraciones puede resultar en   │   │
│ │ la suspensión o eliminación de    │   │
│ │ tu cuenta.                        │   │
│ └─────────────────────────────────┘   │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ ☐ He leído y acepto la           │   │
│ │   declaración legal anterior     │   │
│ └─────────────────────────────────┘   │
│                                         │
│    [← Atrás]   [Crear Mi Perfil]       │
│                                         │
└─────────────────────────────────────────┘
```

**Legal Disclaimer Design Specifications:**
- Microsoft-style professional design
- Serious, clear, and unambiguous language
- Highlighted/bordered container
- Numbered list for clarity
- Large checkbox for acceptance
- Disabled submit button until checkbox is checked
- Scroll container if content is long

### 3.3 Profile View Component

**Location:** `src/components/dashboard/ProfileView.jsx`

**Features:**
- Display all profile information
- Edit button to modify profile
- Delete account option (with warnings)
- Professional card-based layout

**Layout:**
```
┌─────────────────────────────────────────┐
│ Mi Perfil                    [Editar]   │
├─────────────────────────────────────────┤
│                                         │
│ [Avatar]  Juan Pérez                   │
│           juan.perez@example.com       │
│                                         │
│ Información Personal                    │
│ ├─ Edad: 25-34                         │
│ ├─ Educación: Universitario (Completado)│
│ └─ Miembro desde: 24 Ene 2026          │
│                                         │
│ Cuenta de GitHub                        │
│ ├─ Usuario: @juanperez                 │
│ └─ ID: 12345678                        │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ ⚠ Zona de Peligro                │   │
│ │                                   │   │
│ │ [Eliminar Cuenta]                │   │
│ └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### 3.4 Profile Edit Component

**Location:** `src/components/dashboard/ProfileEdit.jsx`

**Features:**
- All fields editable except email
- Same validation as creation form
- Save/Cancel buttons
- Optimistic UI updates
- Version tracking in backend

**Layout:**
```
┌─────────────────────────────────────────┐
│ Editar Perfil                           │
├─────────────────────────────────────────┤
│                                         │
│ Nombre                                  │
│ ┌─────────────────────────────────┐   │
│ │ Juan                             │   │
│ └─────────────────────────────────┘   │
│                                         │
│ Apellido                                │
│ ┌─────────────────────────────────┐   │
│ │ Pérez                            │   │
│ └─────────────────────────────────┘   │
│                                         │
│ Email (no editable)                     │
│ ┌─────────────────────────────────┐   │
│ │ juan.perez@example.com [locked]  │   │
│ └─────────────────────────────────┘   │
│                                         │
│ Rango de Edad                           │
│ [Dropdown: 25-34]                       │
│                                         │
│ Nivel de Escolaridad                    │
│ [Dropdown: Universitario]               │
│ Estado: ○ En progreso ● Completado     │
│                                         │
│ [Cancelar]              [Guardar]       │
│                                         │
└─────────────────────────────────────────┘
```

### 3.5 Account Deletion Component

**Location:** `src/components/dashboard/AccountDeletion.jsx`

**Critical Features:**
- Two-step confirmation process
- Warning about permanent data loss
- Typed confirmation ("Delete")
- GitHub OAuth revocation
- Presentation deletion warning

**Step 1: Initial Warning**
```
┌─────────────────────────────────────────┐
│ ⚠ Eliminar Cuenta                      │
├─────────────────────────────────────────┤
│                                         │
│ ADVERTENCIA: Esta acción es permanente │
│                                         │
│ Al eliminar tu cuenta:                  │
│                                         │
│ ✗ Se eliminarán TODAS tus              │
│   presentaciones creadas                │
│                                         │
│ ✗ Se eliminará tu perfil y toda tu     │
│   información personal                  │
│                                         │
│ ✗ Se revocará el acceso de Circle Up   │
│   a tu cuenta de GitHub                 │
│                                         │
│ ✗ Esta acción NO PUEDE DESHACERSE      │
│                                         │
│ ✗ No podrás recuperar ningún contenido │
│                                         │
│ ¿Estás seguro de que deseas continuar? │
│                                         │
│ [Cancelar]    [Sí, Eliminar Cuenta]    │
│                                         │
└─────────────────────────────────────────┘
```

**Step 2: Typed Confirmation**
```
┌─────────────────────────────────────────┐
│ ⚠ Confirmación Final                   │
├─────────────────────────────────────────┤
│                                         │
│ Para confirmar la eliminación de tu     │
│ cuenta, escribe la palabra:             │
│                                         │
│          Delete                         │
│                                         │
│ en el campo a continuación:             │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ [Input field]                    │   │
│ └─────────────────────────────────┘   │
│                                         │
│ [Cancelar]    [Eliminar Permanentemente]│
│               (disabled until typed)    │
│                                         │
└─────────────────────────────────────────┘
```

**Deletion Flow:**
```javascript
const handleAccountDeletion = async () => {
  // 1. Delete all user presentations from Vercel Blob
  await deleteAllPresentations(userId);
  
  // 2. Delete user profile from Vercel Blob
  await deleteProfile(userId);
  
  // 3. Revoke GitHub OAuth access
  await revokeGitHubAccess(accessToken);
  
  // 4. Clear localStorage
  localStorage.clear();
  
  // 5. Redirect to home page
  window.location.href = '/';
};
```

## 4. API Endpoints

### 4.1 Create Profile

**Endpoint:** `POST /api/profile`

**Request Body:**
```json
{
  "userId": "12345",
  "login": "juanperez",
  "email": "juan.perez@example.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "ageRange": "25-34",
  "educationLevel": "universitario",
  "educationStatus": "completed",
  "legalDisclaimerAccepted": true,
  "parentalConsentConfirmed": false,
  "githubData": {
    "avatarUrl": "https://avatars.githubusercontent.com/u/12345",
    "username": "juanperez",
    "email": "juan.perez@example.com"
  }
}
```

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": "12345",
    "login": "juanperez",
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan.perez@example.com",
    "profileComplete": true,
    "version": 1,
    "createdAt": "2026-01-24T20:00:00.000Z",
    "updatedAt": "2026-01-24T20:00:00.000Z"
  }
}
```

**Validation:**
- All required fields present
- Age range is valid enum value
- Education level is valid enum value
- Legal disclaimer accepted is true
- If age range is 14-17, parental consent must be true
- Email matches GitHub OAuth email

### 4.2 Get Profile

**Endpoint:** `GET /api/profile?userId={userId}`

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": "12345",
    "login": "juanperez",
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan.perez@example.com",
    "ageRange": "25-34",
    "educationLevel": "universitario",
    "educationStatus": "completed",
    "profileComplete": true,
    "version": 2,
    "createdAt": "2026-01-20T10:00:00.000Z",
    "updatedAt": "2026-01-24T20:00:00.000Z",
    "legalDisclaimerAccepted": true,
    "legalDisclaimerAcceptedAt": "2026-01-20T10:00:00.000Z",
    "parentalConsentConfirmed": false,
    "githubData": {
      "avatarUrl": "https://avatars.githubusercontent.com/u/12345",
      "username": "juanperez",
      "email": "juan.perez@example.com"
    }
  }
}
```

**Implementation:**
- Read NDJSON file from Vercel Blob
- Parse line-by-line to get latest version
- Return most recent profile record
- Cache in localStorage for offline access

### 4.3 Update Profile

**Endpoint:** `PUT /api/profile`

**Request Body:**
```json
{
  "userId": "12345",
  "firstName": "Juan Carlos",
  "lastName": "Pérez García",
  "ageRange": "25-34",
  "educationLevel": "posgrado",
  "educationStatus": "in-progress"
}
```

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": "12345",
    "version": 3,
    "updatedAt": "2026-01-24T21:00:00.000Z"
  }
}
```

**Implementation:**
- Validate updated fields
- Read existing profile from Vercel Blob
- Create new version with updated fields
- Append to NDJSON file
- Increment version number
- Update localStorage cache

### 4.4 Delete Profile

**Endpoint:** `DELETE /api/profile`

**Request Body:**
```json
{
  "userId": "12345",
  "confirmation": "Delete",
  "accessToken": "github_oauth_token"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

**Implementation:**
```javascript
async function deleteAccount(userId, confirmation, accessToken) {
  // 1. Validate confirmation text
  if (confirmation !== 'Delete') {
    throw new Error('Invalid confirmation');
  }
  
  // 2. Delete all presentations
  const presentations = await listUserPresentations(userId);
  for (const presentation of presentations) {
    await deletePresentationFiles(userId, presentation.id);
  }
  
  // 3. Soft delete profile (append deletion record)
  await appendToNDJSON(`profiles/${userId}.ndjson`, {
    deleted: true,
    deletedAt: new Date().toISOString(),
    deletedBy: userId
  });
  
  // 4. Revoke GitHub OAuth access
  await revokeGitHubOAuth(accessToken);
  
  return { success: true };
}
```

## 5. Vercel Blob Implementation

### 5.1 Profile Storage Service

**Location:** `src/shared/utils/profile-storage.ts`

```typescript
import { put, list, del } from '@vercel/blob';

export class ProfileStorageService {
  static async createProfile(profile: UserProfile): Promise<void> {
    const pathname = `profiles/${profile.id}.ndjson`;
    
    // Create initial record
    const record = {
      ...profile,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const content = JSON.stringify(record) + '\n';
    
    await put(pathname, content, {
      access: 'public',
      contentType: 'application/x-ndjson'
    });
  }
  
  static async getProfile(userId: string): Promise<UserProfile | null> {
    const pathname = `profiles/${userId}.ndjson`;
    
    try {
      const response = await fetch(
        `https://blob.vercel-storage.com/${pathname}`
      );
      
      if (!response.ok) return null;
      
      const content = await response.text();
      const records = this.parseNDJSON<UserProfile>(content);
      
      // Get latest non-deleted record
      const validRecords = records.filter(r => !r.deleted);
      return validRecords.length > 0 
        ? validRecords[validRecords.length - 1] 
        : null;
    } catch {
      return null;
    }
  }
  
  static async updateProfile(
    userId: string, 
    updates: Partial<UserProfile>
  ): Promise<void> {
    const pathname = `profiles/${userId}.ndjson`;
    
    // Read existing records
    const existing = await this.readNDJSON(pathname);
    const records = this.parseNDJSON<UserProfile>(existing);
    const currentVersion = records.length;
    
    // Create new version
    const newRecord = {
      ...records[records.length - 1],
      ...updates,
      version: currentVersion + 1,
      updatedAt: new Date().toISOString()
    };
    
    // Append to file
    const newLine = JSON.stringify(newRecord) + '\n';
    await put(pathname, existing + newLine, {
      access: 'public',
      contentType: 'application/x-ndjson'
    });
  }
  
  static async deleteProfile(userId: string): Promise<void> {
    const pathname = `profiles/${userId}.ndjson`;
    
    // Append deletion record (soft delete)
    const existing = await this.readNDJSON(pathname);
    const deletionRecord = {
      deleted: true,
      deletedAt: new Date().toISOString(),
      deletedBy: userId
    };
    
    const newLine = JSON.stringify(deletionRecord) + '\n';
    await put(pathname, existing + newLine, {
      access: 'public',
      contentType: 'application/x-ndjson'
    });
  }
  
  private static async readNDJSON(pathname: string): Promise<string> {
    try {
      const response = await fetch(
        `https://blob.vercel-storage.com/${pathname}`
      );
      return await response.text();
    } catch {
      return '';
    }
  }
  
  private static parseNDJSON<T>(content: string): T[] {
    return content
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));
  }
}
```

### 5.2 Vercel Function: Profile Management

**Location:** `api/profile.js`

```javascript
import { put } from '@vercel/blob';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { method } = req;
  
  try {
    switch (method) {
      case 'GET':
        return await handleGetProfile(req, res);
      case 'POST':
        return await handleCreateProfile(req, res);
      case 'PUT':
        return await handleUpdateProfile(req, res);
      case 'DELETE':
        return await handleDeleteProfile(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Profile API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}

async function handleCreateProfile(req, res) {
  const profile = req.body;
  
  // Validate required fields
  if (!profile.userId || !profile.firstName || !profile.lastName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Validate age restrictions
  if (profile.ageRange === '14-17' && !profile.parentalConsentConfirmed) {
    return res.status(400).json({ 
      error: 'Parental consent required for users under 18' 
    });
  }
  
  // Validate legal disclaimer
  if (!profile.legalDisclaimerAccepted) {
    return res.status(400).json({ 
      error: 'Legal disclaimer must be accepted' 
    });
  }
  
  // Create profile record
  const record = {
    ...profile,
    version: 1,
    profileComplete: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    legalDisclaimerAcceptedAt: new Date().toISOString()
  };
  
  // Save to Vercel Blob
  const pathname = `profiles/${profile.userId}.ndjson`;
  const content = JSON.stringify(record) + '\n';
  
  await put(pathname, content, {
    access: 'public',
    contentType: 'application/x-ndjson',
    addRandomSuffix: false
  });
  
  return res.status(200).json({
    success: true,
    profile: {
      id: record.id,
      login: record.login,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      profileComplete: true,
      version: 1,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt
    }
  });
}

async function handleGetProfile(req, res) {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId required' });
  }
  
  const pathname = `profiles/${userId}.ndjson`;
  
  try {
    const response = await fetch(
      `https://blob.vercel-storage.com/${pathname}`
    );
    
    if (!response.ok) {
      return res.status(404).json({ 
        success: false, 
        profile: null 
      });
    }
    
    const content = await response.text();
    const records = content
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));
    
    // Get latest non-deleted record
    const validRecords = records.filter(r => !r.deleted);
    const profile = validRecords.length > 0 
      ? validRecords[validRecords.length - 1] 
      : null;
    
    return res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    return res.status(404).json({ 
      success: false, 
      profile: null 
    });
  }
}

async function handleUpdateProfile(req, res) {
  const updates = req.body;
  const { userId } = updates;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId required' });
  }
  
  const pathname = `profiles/${userId}.ndjson`;
  
  // Read existing records
  const response = await fetch(
    `https://blob.vercel-storage.com/${pathname}`
  );
  
  if (!response.ok) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  
  const existing = await response.text();
  const records = existing
    .split('\n')
    .filter(line => line.trim())
    .map(line => JSON.parse(line));
  
  const currentProfile = records[records.length - 1];
  
  // Create new version
  const newRecord = {
    ...currentProfile,
    ...updates,
    version: records.length + 1,
    updatedAt: new Date().toISOString()
  };
  
  // Append to file
  const newLine = JSON.stringify(newRecord) + '\n';
  await put(pathname, existing + newLine, {
    access: 'public',
    contentType: 'application/x-ndjson',
    addRandomSuffix: false
  });
  
  return res.status(200).json({
    success: true,
    profile: {
      id: newRecord.id,
      version: newRecord.version,
      updatedAt: newRecord.updatedAt
    }
  });
}

async function handleDeleteProfile(req, res) {
  const { userId, confirmation, accessToken } = req.body;
  
  if (!userId || !confirmation || !accessToken) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (confirmation !== 'Delete') {
    return res.status(400).json({ error: 'Invalid confirmation' });
  }
  
  // Delete all presentations (trigger GitHub Action)
  await deleteUserPresentations(userId);
  
  // Soft delete profile
  const pathname = `profiles/${userId}.ndjson`;
  const response = await fetch(
    `https://blob.vercel-storage.com/${pathname}`
  );
  
  const existing = await response.text();
  const deletionRecord = {
    deleted: true,
    deletedAt: new Date().toISOString(),
    deletedBy: userId
  };
  
  const newLine = JSON.stringify(deletionRecord) + '\n';
  await put(pathname, existing + newLine, {
    access: 'public',
    contentType: 'application/x-ndjson',
    addRandomSuffix: false
  });
  
  // Revoke GitHub OAuth
  await revokeGitHubAccess(accessToken);
  
  return res.status(200).json({
    success: true,
    message: 'Account deleted successfully'
  });
}

async function deleteUserPresentations(userId) {
  // Trigger GitHub Action to delete all presentations
  const repoOwner = process.env.GITHUB_REPO_OWNER;
  const repoName = process.env.GITHUB_REPO_NAME;
  
  await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_type: 'delete_user_presentations',
        client_payload: { userId }
      })
    }
  );
}

async function revokeGitHubAccess(accessToken) {
  // Revoke GitHub OAuth token
  const clientId = process.env.GITHUB_APP_CLIENT_ID;
  const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;
  
  await fetch(
    `https://api.github.com/applications/${clientId}/token`,
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ access_token: accessToken })
    }
  );
}
```

## 6. Frontend Integration

### 6.1 Modified DashboardHome Component

**Changes to:** `src/components/dashboard/DashboardHome.jsx`

```javascript
import { useState, useEffect } from "react";
import ProfileCreationCTA from "./ProfileCreationCTA";
import ProfileRegistration from "./ProfileRegistration";
import ProfileView from "./ProfileView";
import PresentationCard from "../PresentationCard";
import Button from "../Button";
import { ProfileService } from "../../shared/utils/profile";

const DashboardHome = ({ user, onNavigate }) => {
  const [profileState, setProfileState] = useState('loading'); // loading, no-profile, creating, viewing
  const [profile, setProfile] = useState(null);
  const [presentations, setPresentations] = useState([]);
  
  useEffect(() => {
    checkProfileStatus();
  }, [user]);
  
  const checkProfileStatus = async () => {
    const userProfile = await ProfileService.getProfile(user.id);
    
    if (!userProfile || !userProfile.profileComplete) {
      setProfileState('no-profile');
    } else {
      setProfile(userProfile);
      setProfileState('viewing');
      loadPresentations();
    }
  };
  
  const handleCreateProfile = () => {
    setProfileState('creating');
  };
  
  const handleProfileCreated = (newProfile) => {
    setProfile(newProfile);
    setProfileState('viewing');
    loadPresentations();
  };
  
  const loadPresentations = async () => {
    // Existing presentation loading logic
  };
  
  // Show loading state
  if (profileState === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-16 w-16 border-4 border-color-1 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Show profile creation CTA
  if (profileState === 'no-profile') {
    return <ProfileCreationCTA onCreateProfile={handleCreateProfile} />;
  }
  
  // Show profile registration form
  if (profileState === 'creating') {
    return (
      <ProfileRegistration
        user={user}
        onComplete={handleProfileCreated}
        onCancel={() => setProfileState('no-profile')}
      />
    );
  }
  
  // Show dashboard with presentations (existing code)
  return (
    <div className="space-y-8">
      {/* Existing dashboard content */}
    </div>
  );
};

export default DashboardHome;
```

### 6.2 Profile Service

**Location:** `src/shared/utils/profile.ts`

```typescript
export class ProfileService {
  static async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const response = await fetch(`/api/profile?userId=${userId}`);
      const data = await response.json();
      
      if (data.success && data.profile) {
        // Cache in localStorage
        localStorage.setItem(
          `profile_${userId}`, 
          JSON.stringify(data.profile)
        );
        return data.profile;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      
      // Try localStorage fallback
      const cached = localStorage.getItem(`profile_${userId}`);
      return cached ? JSON.parse(cached) : null;
    }
  }
  
  static async createProfile(
    profile: Partial<UserProfile>
  ): Promise<{ success: boolean; profile?: UserProfile; error?: string }> {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Cache in localStorage
        localStorage.setItem(
          `profile_${profile.userId}`, 
          JSON.stringify(data.profile)
        );
      }
      
      return data;
    } catch (error) {
      console.error('Error creating profile:', error);
      return { 
        success: false, 
        error: 'Error de conexión. Intenta nuevamente.' 
      };
    }
  }
  
  static async updateProfile(
    userId: string,
    updates: Partial<UserProfile>
  ): Promise<{ success: boolean; profile?: UserProfile; error?: string }> {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...updates })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update localStorage cache
        const cached = localStorage.getItem(`profile_${userId}`);
        if (cached) {
          const profile = JSON.parse(cached);
          const updated = { ...profile, ...updates };
          localStorage.setItem(
            `profile_${userId}`, 
            JSON.stringify(updated)
          );
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      return { 
        success: false, 
        error: 'Error de conexión. Intenta nuevamente.' 
      };
    }
  }
  
  static async deleteProfile(
    userId: string,
    confirmation: string,
    accessToken: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('/api/profile', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, confirmation, accessToken })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Clear all localStorage
        localStorage.clear();
      }
      
      return data;
    } catch (error) {
      console.error('Error deleting profile:', error);
      return { 
        success: false, 
        error: 'Error de conexión. Intenta nuevamente.' 
      };
    }
  }
}
```

## 7. Validation Schemas

### 7.1 Profile Schema

**Location:** `src/shared/schemas/profile.schema.ts`

```typescript
import { z } from 'zod';

export const ageRangeSchema = z.enum(['14-17', '18-24', '25-34', '35+']);

export const educationLevelSchema = z.enum([
  'primaria',
  'bachillerato',
  'tecnico',
  'tecnologo',
  'universitario',
  'posgrado'
]);

export const educationStatusSchema = z.enum(['in-progress', 'completed']);

export const profileSchema = z.object({
  // System fields
  userId: z.string(),
  login: z.string(),
  email: z.string().email(),
  
  // Required profile fields
  firstName: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  
  lastName: z.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),
  
  ageRange: ageRangeSchema,
  
  educationLevel: educationLevelSchema,
  educationStatus: educationStatusSchema,
  
  // Legal compliance
  legalDisclaimerAccepted: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar la declaración legal' })
  }),
  
  parentalConsentConfirmed: z.boolean().optional(),
  
  // GitHub data
  githubData: z.object({
    avatarUrl: z.string().url(),
    username: z.string(),
    email: z.string().email()
  })
}).refine(
  (data) => {
    // If age range is 14-17, parental consent must be true
    if (data.ageRange === '14-17') {
      return data.parentalConsentConfirmed === true;
    }
    return true;
  },
  {
    message: 'Se requiere consentimiento parental para menores de 18 años',
    path: ['parentalConsentConfirmed']
  }
);

export type UserProfile = z.infer<typeof profileSchema>;
export type AgeRange = z.infer<typeof ageRangeSchema>;
export type EducationLevel = z.infer<typeof educationLevelSchema>;
export type EducationStatus = z.infer<typeof educationStatusSchema>;
```

## 8. Environment Variables

### 8.1 Required Variables

Add to `.env.example` and Vercel Dashboard:

```bash
# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_token_here

# GitHub OAuth (existing)
GITHUB_APP_CLIENT_ID=...
GITHUB_APP_CLIENT_SECRET=...
GITHUB_TOKEN=...

# GitHub Repository (existing)
GITHUB_REPO_OWNER=wearecircleup
GITHUB_REPO_NAME=wearecircleup
```

### 8.2 Vercel Configuration

Update `vercel.json`:

```json
{
  "functions": {
    "api/profile.js": {
      "maxDuration": 10
    },
    "api/github-auth.js": {
      "maxDuration": 10
    },
    "api/generate-presentation.js": {
      "maxDuration": 60
    },
    "api/delete-presentation.js": {
      "maxDuration": 10
    }
  }
}
```

## 9. Security and Compliance

### 9.1 Data Privacy

- User profiles stored with explicit consent
- GDPR-compliant data deletion (soft delete with audit trail)
- No PII exposed in public URLs
- Email field immutable (from GitHub OAuth)
- Vercel Blob access control (public read, authenticated write)

### 9.2 Age Verification

- Minimum age: 14 years
- Self-reported age ranges (no verification)
- Parental consent checkbox for 14-17 age range
- Legal disclaimer clearly states age restrictions
- Platform reserves right to verify age if needed

### 9.3 Legal Compliance

- Clear terms of service acceptance
- Data accuracy declaration
- Parental consent for minors
- Account deletion consequences clearly stated
- Audit trail for all profile changes

### 9.4 Input Validation

- All inputs validated with Zod schemas
- XSS prevention (React auto-escaping)
- CSRF protection via Vercel CORS headers
- SQL injection prevention (no SQL database)
- Rate limiting on profile endpoints

## 10. Performance Optimization

### 10.1 Caching Strategy

- Profile data cached in localStorage (5-minute TTL)
- Vercel Edge caching for blob reads
- Stale-while-revalidate pattern
- Optimistic UI updates

### 10.2 NDJSON Optimization

- Read only last line for latest record
- Implement pagination for large files
- Archive old versions (keep last 10)
- Compress historical records

### 10.3 Loading States

- Skeleton loaders for profile form
- Optimistic UI updates
- Progressive form rendering (Typeform style)
- Smooth transitions between steps

## 11. Testing Strategy

### 11.1 Unit Tests

- Profile validation schemas
- NDJSON parsing utilities
- Age range validation
- Parental consent logic
- Service layer methods

### 11.2 Integration Tests

- Profile CRUD operations
- Blob storage read/write
- API endpoint responses
- GitHub OAuth integration
- Account deletion flow

### 11.3 E2E Tests

- Complete profile registration flow
- Profile update and view
- Account deletion with confirmation
- Dashboard access gating
- Email immutability

## 12. Migration Plan

### 12.1 Phase 1: Infrastructure Setup (Week 1)

- Install @vercel/blob package
- Create Vercel Blob store
- Setup environment variables
- Create API endpoints skeleton
- Configure vercel.json

### 12.2 Phase 2: Profile System Implementation (Week 2)

- Implement ProfileCreationCTA component
- Create ProfileRegistration component (Typeform style)
- Implement ProfileView component
- Implement ProfileEdit component
- Create profile service and schemas
- Add profile completion gate to DashboardHome

### 12.3 Phase 3: Account Deletion (Week 3)

- Implement AccountDeletion component
- Add typed confirmation flow
- Integrate presentation deletion
- Implement GitHub OAuth revocation
- Add deletion warnings and disclaimers

### 12.4 Phase 4: Testing and Deployment (Week 4)

- Unit and integration tests
- E2E testing
- Performance testing
- Security audit
- Production deployment
- User acceptance testing

## 13. Cost Analysis

### 13.1 Vercel Blob Pricing (Free Tier)

- Storage: 1 GB free
- Bandwidth: 100 GB/month free
- Requests: Unlimited

### 13.2 Estimated Usage

- Average profile size: 1.5 KB (with version history)
- 1,000 users = 1.5 MB storage
- 10,000 users = 15 MB storage
- 100,000 users = 150 MB storage
- Well within free tier limits

### 13.3 Scalability

- Free tier supports 650,000+ profiles
- Paid tier: $0.15/GB storage, $0.15/GB bandwidth
- Cost-effective for 1M+ users

## 14. Success Metrics

### 14.1 Profile System

- 95% profile completion rate within 24 hours
- Average completion time < 2 minutes
- 99.9% API uptime
- < 300ms average response time
- < 1% form abandonment rate

### 14.2 User Experience

- Typeform-style satisfaction score > 4.5/5
- Mobile completion rate > 90%
- Profile update frequency tracking
- Account deletion rate < 2%

## 15. Future Enhancements

### 15.1 Profile Features

- Profile photo upload (Vercel Blob)
- Additional optional fields (phone, address)
- Skills and certifications
- Public profile pages
- Profile verification badges
- Social media links

### 15.2 Analytics

- Profile completion funnel analysis
- Drop-off point identification
- A/B testing for form design
- User demographic insights
- Education level distribution

### 15.3 Integration

- Export to CSV/JSON
- Webhook notifications
- Third-party analytics integration
- CRM synchronization
- Eventbrite API integration (future)

## 16. Documentation Requirements

### 16.1 Developer Documentation

- API endpoint reference
- Schema documentation
- Service layer documentation
- Component props documentation
- NDJSON format specification

### 16.2 User Documentation

- Profile setup guide
- Privacy policy updates
- Terms of service
- Data deletion instructions
- FAQ for age restrictions

## 17. Rollout Strategy

### 17.1 Beta Testing

- Internal team testing (1 week)
- Beta user group (50 users, 2 weeks)
- Feedback collection and iteration
- Bug fixes and optimization

### 17.2 Production Release

- Gradual rollout (10% → 50% → 100%)
- Monitor error rates and performance
- A/B testing for form design
- User feedback collection
- Continuous improvement

## 18. Compliance and Legal

### 18.1 GDPR Compliance

- User consent for data collection
- Right to access data
- Right to deletion
- Data portability
- Privacy policy updates
- Cookie consent (if needed)

### 18.2 Data Retention

- Active profiles: Indefinite
- Deleted profiles: 30-day soft delete, then permanent
- Audit logs: 1-year retention
- Version history: Last 10 versions

### 18.3 Age Verification

- Self-reported age ranges
- Parental consent for 14-17
- Platform reserves right to verify
- Account suspension for false information
- Compliance with COPPA (if applicable)

## Conclusion

This specification provides a comprehensive, production-ready implementation plan for the user profile registration system with full CRUD operations. The system leverages Vercel's serverless infrastructure and Blob storage to maintain zero-cost operations while ensuring scalability, reliability, and professional-grade user experience. All components follow CircleUp's existing design patterns and technical standards, with special emphasis on legal compliance, age restrictions, and data security.

The Typeform-style registration flow ensures high completion rates and excellent user experience, while the strict account deletion safeguards protect users from accidental data loss. The system is designed to scale seamlessly from hundreds to millions of users without infrastructure changes or cost increases within the free tier limits.
