/*Ocultar Barra Deplazamiento*/ 

window.addEventListener('load', function() {
  const sidebar = document.querySelector('.bd-sidebar-primary.bd-sidebar.noprint');
  if (sidebar) {
      sidebar.style.overflowY = 'hidden';
  }
});

window.addEventListener('load', function() {
  if (document.body.classList.contains('page-intro')) { // Verificar si es la página de intro
      const toggleButton = document.querySelector('.sidebar-toggle.primary-toggle.btn.btn-sm');
      if (toggleButton) {
          toggleButton.click(); // Simular el clic en el botón
      }
  }
});