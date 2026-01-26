import { useState, useEffect } from "react";
import PresentationCard from "../PresentationCard";
import Button from "../Button";
import { PresentationsAPI } from "../../shared/utils/presentations-api";
import { ProfileService } from "../../shared/utils/profile";
import DeletePresentationModal from "./DeletePresentationModal";
import ImportPresentationModal from "./ImportPresentationModal";
import ProfileRegistration from "../profile/ProfileRegistration";
import ProfileView from "../profile/ProfileView";
import ProfileEdit from "../profile/ProfileEdit";
import AccountDeletion from "../profile/AccountDeletion";

const DashboardHome = ({ user, onNavigate, profileAction, onProfileActionComplete, onProfileStatusChange, showPresentations = true }) => {
  const [presentations, setPresentations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, completed, shared, failed
  const [presentationToDelete, setPresentationToDelete] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Profile state management
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileView, setProfileView] = useState('check'); // check, cta, register, view, edit, delete

  useEffect(() => {
    checkProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  useEffect(() => {
    if (profile) {
      loadPresentations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.login, profile]);

  // Handle profile actions from Dashboard header
  useEffect(() => {
    if (profileAction && profile) {
      if (profileAction === 'view') {
        setProfileView('view');
      } else if (profileAction === 'delete') {
        setProfileView('delete');
      }
    }
  }, [profileAction, profile]);

  const checkProfile = async () => {
    setProfileLoading(true);
    try {
      // Always check API first (source of truth)
      const result = await ProfileService.getProfile(user.id);
      
      if (result.success && result.profile) {
        // Profile exists in DynamoDB
        setProfile(result.profile);
        setProfileView('view');
        onProfileStatusChange?.(true); // Notify Dashboard
      } else {
        // Profile doesn't exist - show CTA
        setProfile(null);
        setProfileView('cta');
        onProfileStatusChange?.(false); // Notify Dashboard
        // Clear any stale localStorage data
        ProfileService.clearUserData(user.id);
      }
    } catch (error) {
      console.error('Error checking profile:', error);
      // On error, default to CTA (don't trust localStorage)
      setProfile(null);
      setProfileView('cta');
      onProfileStatusChange?.(false); // Notify Dashboard
      // Clear stale data
      ProfileService.clearUserData(user.id);
    } finally {
      setProfileLoading(false);
    }
  };

  const loadPresentations = async () => {
    setLoading(true);
    try {
      // Fetch from DynamoDB using userId
      const userId = user.id || user.node_id;
      const response = await fetch(`/api/list-presentations?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch presentations');
      }
      
      const data = await response.json();
      const remotePresentations = data.presentations || [];
      
      // Merge with localStorage (for any local-only data)
      const localKey = `presentations_${user.login}`;
      const localData = localStorage.getItem(localKey);
      const localPresentations = localData ? JSON.parse(localData) : [];
      
      // Create a map of remote presentations by ID
      const remoteMap = new Map(remotePresentations.map(p => [p.id, p]));
      
      // Filter local presentations: only keep if exists in remote OR is processing
      const validLocalPresentations = localPresentations.filter(local => {
        if (local.status === 'processing') {
          return true;
        }
        return remoteMap.has(local.id);
      });
      
      // Update local presentations with remote data if available
      const merged = validLocalPresentations
        .map(local => {
          const remote = remoteMap.get(local.id);
          if (remote) {
            remoteMap.delete(local.id);
            return remote;
          }
          return local;
        });
      
      // Add any remote presentations not in local storage
      remoteMap.forEach(remote => merged.push(remote));
      
      setPresentations(merged);
      
      // Update localStorage with merged data
      localStorage.setItem(localKey, JSON.stringify(merged));
    } catch (error) {
      console.error('Error loading presentations:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem(`presentations_${user.login}`);
      if (stored) {
        setPresentations(JSON.parse(stored));
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredPresentations = presentations.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'shared') return p.metadata?.model === 'imported';
    return p.status === filter;
  });

  const handleOpenPresentation = (presentation) => {
    // Navigate to presentation viewer with data in state
    onNavigate('view', presentation);
  };

  const handleDelete = (presentation) => {
    setPresentationToDelete(presentation);
  };

  const handleImportPresentation = async (newPresentation) => {
    try {
      // Save to DynamoDB
      const userId = user.id || user.node_id;
      const response = await fetch('/api/save-presentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          presentation: newPresentation
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save imported presentation');
      }

      const result = await response.json();

      if (result.success) {
        // Add to local state
        const updated = [newPresentation, ...presentations];
        setPresentations(updated);
        localStorage.setItem(`presentations_${user.login}`, JSON.stringify(updated));
        
        // Reload to ensure sync
        await loadPresentations();
      } else {
        throw new Error(result.error || 'Failed to import');
      }
    } catch (error) {
      console.error('Error importing presentation:', error);
      alert('Error al importar la presentación. Por favor intenta nuevamente.');
    }
  };

  const handleConfirmDelete = async () => {
    if (!presentationToDelete) return;

    setIsDeleting(true);
    
    try {
      // Mark presentation as deleting
      const updated = presentations.map(p => 
        p.id === presentationToDelete.id 
          ? { ...p, status: 'deleting' }
          : p
      );
      setPresentations(updated);
      localStorage.setItem(`presentations_${user.login}`, JSON.stringify(updated));

      // Delete from DynamoDB
      const userId = user.id || user.node_id;
      const response = await fetch('/api/delete-presentation', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          presentationId: presentationToDelete.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to delete presentation');
      }

      const result = await response.json();

      if (!result.success) {
        console.error('Failed to delete from DynamoDB:', result.message);
        alert('Hubo un error al eliminar la presentación. Por favor intenta nuevamente.');
        
        // Restore original status on error
        const restored = presentations.map(p => 
          p.id === presentationToDelete.id 
            ? { ...p, status: presentationToDelete.status }
            : p
        );
        setPresentations(restored);
        localStorage.setItem(`presentations_${user.login}`, JSON.stringify(restored));
      } else {
        // Reload presentations immediately
        await loadPresentations();
      }
    } catch (error) {
      console.error('Error deleting presentation:', error);
      alert('Error de conexión al eliminar la presentación. Por favor intenta nuevamente.');
      
      // Restore on error
      loadPresentations();
    } finally {
      setIsDeleting(false);
      setPresentationToDelete(null);
    }
  };

  // Profile gate: Show profile flow if no profile exists
  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-color-1 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-n-4">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Show ProfileCreationCTA if no profile
  if (profileView === 'cta') {
    return (
      <ProfileRegistration
        onStart={() => setProfileView('register')}
        onSkip={() => {
          // Allow skip for now, but remind later
          setProfileView('view');
          setProfile({ firstName: user.name || user.login });
        }}
      />
    );
  }

  // Show ProfileRegistration
  if (profileView === 'register') {
    return (
      <ProfileRegistration
        user={user}
        onComplete={(newProfile) => {
          setProfile(newProfile);
          setProfileView('view');
        }}
        onCancel={() => setProfileView('cta')}
      />
    );
  }

  // Show ProfileEdit
  if (profileView === 'edit') {
    return (
      <ProfileEdit
        profile={profile}
        onSave={(updatedProfile) => {
          setProfile(updatedProfile);
          setProfileView('view');
        }}
        onCancel={() => setProfileView('view')}
      />
    );
  }

  // Show AccountDeletion
  if (profileView === 'delete') {
    return (
      <AccountDeletion
        profile={profile}
        user={user}
        onDelete={() => {
          setProfile(null);
          setProfileView('cta');
        }}
        onCancel={() => setProfileView('view')}
      />
    );
  }

  // Show ProfileView (full screen) - only when profile action is active
  if (profileAction && profileView === 'view' && profile) {
    return (
      <ProfileView
        profile={profile}
        onEdit={() => setProfileView('edit')}
        onDelete={() => setProfileView('delete')}
        onClose={() => {
          setProfileView('dashboard');
          onProfileActionComplete();
        }}
      />
    );
  }

  // Don't render presentations if we're in profile tab and not showing presentations
  if (!showPresentations && !profileAction) {
    return null;
  }

  // Main dashboard view
  return (
    <div className="space-y-6">
      {/* Action buttons */}
      <div className="flex gap-2 sm:gap-3 w-full justify-end">
        <button
          onClick={loadPresentations}
          className="px-3 sm:px-4 py-2 bg-n-6 hover:bg-n-5 text-n-1 rounded-lg transition-all flex items-center gap-2 text-xs sm:text-sm justify-center"
          title="Refrescar presentaciones"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline">Refrescar</span>
        </button>
        
        <Button onClick={() => onNavigate('create')} white>
          <span className="flex items-center gap-2 justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs sm:text-sm">Nueva Presentación</span>
          </span>
        </Button>
      </div>

      {/* Filters and Import button */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'Todas' },
          { key: 'completed', label: 'Completadas' },
          { key: 'shared', label: 'Compartidas' },
          { key: 'failed', label: 'Fallidas' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              filter === key
                ? 'bg-color-1 text-n-1'
                : 'bg-n-7/50 text-n-4 hover:bg-n-7 hover:text-n-2'
            }`}
          >
            {label}
          </button>
        ))}
        </div>
        
        {/* Import button */}
        <button
          onClick={() => setShowImportModal(true)}
          className="px-4 py-2 bg-n-6 hover:bg-n-5 text-n-1 rounded-lg transition-all flex items-center gap-2 text-sm whitespace-nowrap"
          title="Importar presentación compartida"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>Importar</span>
        </button>
      </div>

      {/* Presentations Grid */}
      {loading ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-color-1 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-n-4">Cargando presentaciones...</p>
        </div>
      ) : filteredPresentations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPresentations.map(presentation => (
            <PresentationCard
              key={presentation.id}
              presentation={presentation}
              onOpen={handleOpenPresentation}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-n-7/50 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-n-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-n-1 mb-2">
            {filter === 'all' ? 'No hay presentaciones' : `No hay presentaciones ${filter === 'completed' ? 'completadas' : 'en proceso'}`}
          </h3>
          <p className="text-n-4 mb-6">
            {filter === 'all' ? 'Crea tu primera presentación con AI' : 'Cambia el filtro para ver otras presentaciones'}
          </p>
          {filter === 'all' && (
            <Button onClick={() => onNavigate('create')} white>
              Crear Presentación
            </Button>
          )}
        </div>
      )}

      {/* Delete Presentation Modal */}
      {presentationToDelete && (
        <DeletePresentationModal
          presentation={presentationToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPresentationToDelete(null)}
          isDeleting={isDeleting}
        />
      )}

      {/* Import Presentation Modal */}
      {showImportModal && (
        <ImportPresentationModal
          user={user}
          onClose={() => setShowImportModal(false)}
          onImport={handleImportPresentation}
        />
      )}
    </div>
  );
};

export default DashboardHome;
