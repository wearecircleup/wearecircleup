/**
 * Profile Service - Frontend CRUD operations for user profiles
 * 
 * This service handles all profile-related operations from the frontend,
 * including API calls to Vercel Functions and localStorage caching.
 * 
 * Features:
 * - Create, Read, Update, Delete operations
 * - localStorage caching with TTL
 * - Offline fallback support
 * - Error handling and retry logic
 */

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const CACHE_PREFIX = 'profile_';
const HAS_PROFILE_PREFIX = 'has_profile_';

/**
 * Profile Service for frontend operations
 */
export class ProfileService {
  /**
   * Get user profile by userId
   * Uses cache-first strategy with API fallback
   */
  static async getProfile(userId) {
    if (!userId) {
      throw new Error('userId is required');
    }

    try {
      // Try API first
      const response = await fetch(`/api/profile?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          // If we believe a profile exists (local flag), try cached profile instead of showing CTA
          const hasFlag = this.hasProfile(userId);
          if (hasFlag) {
            const cachedWhen404 = this._getCachedProfile(userId);
            if (cachedWhen404) {
              return { success: true, profile: cachedWhen404 };
            }
          }
          // Profile doesn't exist
          return { success: true, profile: null };
        }
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.profile) {
        // Cache the profile
        this._cacheProfile(userId, data.profile);
        // Persist flag that profile exists
        this._setHasProfile(userId, true);
        return { success: true, profile: data.profile };
      }
      
      // If API did not return profile but we have local flag and cache, prefer cache
      const hasFlagNoData = this.hasProfile(userId);
      if (hasFlagNoData) {
        const cachedNoData = this._getCachedProfile(userId);
        if (cachedNoData) {
          return { success: true, profile: cachedNoData };
        }
      }
      return { success: true, profile: null };
    } catch (error) {
      console.error('Error fetching profile from API:', error);
      
      // On 500 errors, clear cache and return null (don't use stale cache)
      if (error.message.includes('500')) {
        console.warn('Server error - clearing stale cache');
        this._clearCache(userId);
        return { success: true, profile: null };
      }
      
      // For other errors, fallback to localStorage cache
      const cached = this._getCachedProfile(userId);
      if (cached) {
        console.log('Using cached profile (offline mode)');
        return { success: true, profile: cached };
      }
      
      return { success: true, profile: null };
    }
  }

  /**
   * Create new user profile
   */
  static async createProfile(profileData) {
    if (!profileData || !profileData.userId) {
      throw new Error('Profile data with userId is required');
    }

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `Error ${response.status}: ${response.statusText}`
        };
      }

      if (data.success && data.profile) {
        // Cache the new profile
        this._cacheProfile(profileData.userId, data.profile);
        this._setHasProfile(profileData.userId, true);
        return {
          success: true,
          profile: data.profile
        };
      }

      return {
        success: false,
        error: data.error || 'Failed to create profile'
      };
    } catch (error) {
      console.error('Error creating profile:', error);
      return {
        success: false,
        error: 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.'
      };
    }
  }

  /**
   * Update existing user profile
   */
  static async updateProfile(userId, updates) {
    if (!userId) {
      throw new Error('userId is required');
    }

    if (!updates || Object.keys(updates).length === 0) {
      throw new Error('Updates object is required');
    }

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          ...updates
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `Error ${response.status}: ${response.statusText}`
        };
      }

      if (data.success) {
        // Update cache with new data
        const cached = this._getCachedProfile(userId);
        if (cached) {
          const updated = { ...cached, ...updates, updatedAt: new Date().toISOString() };
          this._cacheProfile(userId, updated);
        }
        // Ensure flag remains true after successful update
        this._setHasProfile(userId, true);

        return {
          success: true,
          profile: data.profile
        };
      }

      return {
        success: false,
        error: data.error || 'Failed to update profile'
      };
    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        error: 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.'
      };
    }
  }

  /**
   * Delete user profile and all associated data
   * Requires typed confirmation for safety
   */
  static async deleteProfile(userId, confirmation, accessToken) {
    if (!userId || !confirmation || !accessToken) {
      throw new Error('userId, confirmation, and accessToken are required');
    }

    if (confirmation !== 'eliminar') {
      return {
        success: false,
        error: 'Confirmación inválida. Debes escribir exactamente "eliminar"'
      };
    }

    try {
      const response = await fetch('/api/profile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          confirmation,
          accessToken
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `Error ${response.status}: ${response.statusText}`
        };
      }

      if (data.success) {
        // Clear all caches
        this._clearCache(userId);
        this._clearAllCaches(); // Clear everything for security
        this._setHasProfile(userId, false);
        
        return {
          success: true,
          message: data.message || 'Cuenta eliminada exitosamente'
        };
      }

      return {
        success: false,
        error: data.error || 'Failed to delete profile'
      };
    } catch (error) {
      console.error('Error deleting profile:', error);
      return {
        success: false,
        error: 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.'
      };
    }
  }

  /**
   * Check if user has a complete profile
   */
  static async hasCompleteProfile(userId) {
    const profile = await this.getProfile(userId);
    return profile && profile.profileComplete === true;
  }

  /**
   * Public: Get cached profile without touching network
   */
  static getCachedProfile(userId) {
    return this._getCachedProfile(userId);
  }

  /**
   * Public: Read local flag that indicates this user created a profile before
   */
  static hasProfile(userId) {
    try {
      return localStorage.getItem(`${HAS_PROFILE_PREFIX}${userId}`) === 'true';
    } catch (e) {
      return false;
    }
  }

  /**
   * Private: Persist the has_profile flag
   */
  static _setHasProfile(userId, value) {
    try {
      localStorage.setItem(`${HAS_PROFILE_PREFIX}${userId}`, value ? 'true' : 'false');
    } catch (e) {
      // ignore
    }
  }

  /**
   * Cache profile in localStorage with timestamp
   * @private
   */
  static _cacheProfile(userId, profile) {
    try {
      const cacheData = {
        profile,
        timestamp: Date.now()
      };
      localStorage.setItem(
        `${CACHE_PREFIX}${userId}`,
        JSON.stringify(cacheData)
      );
    } catch (error) {
      console.warn('Failed to cache profile:', error);
    }
  }

  /**
   * Get cached profile from localStorage
   * Returns null if cache is expired or doesn't exist
   * @private
   */
  static _getCachedProfile(userId) {
    try {
      const cached = localStorage.getItem(`${CACHE_PREFIX}${userId}`);
      if (!cached) return null;

      const cacheData = JSON.parse(cached);
      const age = Date.now() - cacheData.timestamp;

      // Check if cache is still valid
      if (age > CACHE_TTL) {
        // Cache expired, remove it
        localStorage.removeItem(`${CACHE_PREFIX}${userId}`);
        return null;
      }

      return cacheData.profile;
    } catch (error) {
      console.warn('Failed to read cached profile:', error);
      return null;
    }
  }

  /**
   * Clear cache for specific user
   * @private
   */
  static _clearCache(userId) {
    try {
      localStorage.removeItem(`${CACHE_PREFIX}${userId}`);
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  /**
   * Clear all profile caches
   * Used during logout or account deletion
   * @private
   */
  static _clearAllCaches() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear all caches:', error);
    }
  }

  /**
   * Invalidate cache for user (force refresh on next get)
   */
  static invalidateCache(userId) {
    this._clearCache(userId);
  }

  /**
   * Clear all profile data for user (cache + flags)
   * Use this to reset user state completely
   */
  static clearUserData(userId) {
    this._clearCache(userId);
    this._setHasProfile(userId, false);
  }

  /**
   * Get cache statistics (for debugging)
   */
  static getCacheStats() {
    try {
      const keys = Object.keys(localStorage);
      const profileKeys = keys.filter(k => k.startsWith(CACHE_PREFIX));
      
      return {
        totalCached: profileKeys.length,
        cacheKeys: profileKeys,
        cacheSizeEstimate: profileKeys.reduce((total, key) => {
          const value = localStorage.getItem(key);
          return total + (value ? value.length : 0);
        }, 0)
      };
    } catch (error) {
      return { error: error.message };
    }
  }
}
