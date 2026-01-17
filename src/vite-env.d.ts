/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string
  readonly VITE_BASE_URL: string
  readonly VITE_GITHUB_APP_CLIENT_ID: string
  readonly VITE_GITHUB_APP_REDIRECT_URI: string
  readonly VITE_GITHUB_REPO_OWNER: string
  readonly VITE_GITHUB_REPO_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
