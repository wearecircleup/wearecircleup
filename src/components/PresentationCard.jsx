const PresentationCard = ({ presentation, onOpen, onDelete }) => {
  const { title, description, theme, createdAt, thumbnail, status } = presentation;
  
  const statusColors = {
    completed: 'bg-green-500/20 text-green-400 border-green-500/50',
    processing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    failed: 'bg-red-500/20 text-red-400 border-red-500/50'
  };

  return (
    <div className="group relative bg-n-7/90 backdrop-blur-sm border border-n-6/50 rounded-xl overflow-hidden hover:border-color-1/50 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-color-1/20 to-color-2/20 overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-n-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Status badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${statusColors[status] || statusColors.processing}`}>
          {status === 'completed' && '✓ Completada'}
          {status === 'processing' && '⏳ Procesando'}
          {status === 'failed' && '✗ Error'}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-n-1 mb-2 line-clamp-1">{title}</h3>
        <p className="text-n-4 text-sm mb-4 line-clamp-2">{description}</p>
        
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
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              status === 'completed'
                ? 'bg-color-1 text-n-1 hover:bg-color-1/90'
                : 'bg-n-6 text-n-4 cursor-not-allowed'
            }`}
          >
            {status === 'completed' ? 'Abrir' : 'Procesando...'}
          </button>
          
          {onDelete && (
            <button
              onClick={() => onDelete(presentation)}
              className="p-2 rounded-lg border border-n-6 text-n-4 hover:border-red-500/50 hover:text-red-400 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
