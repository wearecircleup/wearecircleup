const PresentationCard = ({ presentation, onOpen, onDelete }) => {
  const { title, description, theme, createdAt, status } = presentation;
  
  const statusColors = {
    completed: 'bg-green-500/20 text-green-400 border-green-500/50',
    processing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    failed: 'bg-red-500/20 text-red-400 border-red-500/50',
    deleting: 'bg-orange-500/20 text-orange-400 border-orange-500/50'
  };

  return (
    <div className="group relative bg-n-7/90 backdrop-blur-sm border border-n-6/50 rounded-xl overflow-hidden hover:border-color-1/50 transition-all duration-300 w-full">
      {/* Thumbnail with quote */}
      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-n-8 via-n-7 to-n-8 overflow-hidden border-b border-n-6/50">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-color-1 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-color-2 rounded-full blur-3xl"></div>
        </div>
        
        {/* Quote content */}
        <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-color-1/50 mb-2 sm:mb-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-n-2 text-xs sm:text-sm font-medium line-clamp-3 italic">
            {description || title}
          </p>
          <div className="mt-2 sm:mt-3 w-12 h-0.5 bg-gradient-to-r from-color-1 to-color-2 rounded-full"></div>
        </div>
        
        {/* Status badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${statusColors[status] || statusColors.processing}`}>
          {status === 'completed' && 'Completada'}
          {status === 'processing' && 'Procesando'}
          {status === 'failed' && 'Error'}
          {status === 'deleting' && 'Eliminando...'}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-n-1 mb-2 line-clamp-1">{title}</h3>
        <p className="text-n-4 text-xs sm:text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between text-xs text-n-4 mb-4">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            {theme === 'modern' ? 'Moderno' : theme === 'academic' ? 'Académico' : 'Minimalista'}
          </span>
          <span>{new Date(createdAt).toLocaleDateString('es-ES')}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onOpen(presentation)}
            disabled={status !== 'completed'}
            className={`flex-1 relative group ${status !== 'completed' ? 'cursor-not-allowed' : ''}`}
          >
            {status === 'completed' ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-color-1 via-color-2 to-color-1 rounded-lg opacity-100 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-n-8 m-[2px] rounded-[6px] py-2 sm:py-3 px-3 sm:px-4 text-n-1 text-sm sm:text-base font-semibold">
                  Abrir
                </div>
              </>
            ) : status === 'deleting' ? (
              <div className="bg-n-6 rounded-lg py-2 sm:py-3 px-3 sm:px-4 text-n-4 text-sm sm:text-base font-semibold">
                Eliminando...
              </div>
            ) : (
              <div className="bg-n-6 rounded-lg py-2 sm:py-3 px-3 sm:px-4 text-n-4 text-sm sm:text-base font-semibold">
                Procesando...
              </div>
            )}
          </button>
          
          {onDelete && (
            <button
              onClick={() => onDelete(presentation)}
              disabled={status === 'deleting'}
              className={`p-2 rounded-lg border border-n-6 text-n-4 transition-all flex-shrink-0 ${
                status === 'deleting' 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:border-red-500/50 hover:text-red-400'
              }`}
              title={status === 'deleting' ? 'Eliminación en proceso...' : 'Eliminar presentación'}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresentationCard;
