const openButton = document.getElementById('openButton');
const closeButton = document.getElementById('closeButton');
const overlay = document.getElementById('overlay');

openButton.addEventListener('click', function() {
  overlay.style.display = 'block';
});

closeButton.addEventListener('click', function() {
  overlay.style.display = 'none';
});

overlay.addEventListener('click', function(event) {
  if (event.target === overlay) {
    overlay.style.display = 'none';
  }
});
