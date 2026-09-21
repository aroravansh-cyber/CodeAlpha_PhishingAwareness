
function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

// If the developer photo is missing or fails to load, show the initials
// in the same spot instead of a broken-image icon.
function showPhotoFallback(img) {
  const nameEl = document.querySelector('.cluewell-dev h3');
  const fallback = document.createElement('div');
  fallback.className = 'cluewell-dev-photo cluewell-dev-photo--fallback';
  fallback.setAttribute('aria-hidden', 'true');
  fallback.textContent = getInitials(nameEl ? nameEl.textContent : '');
  img.replaceWith(fallback);
}

document.addEventListener('DOMContentLoaded', () => {
  const photo = document.querySelector('img.cluewell-dev-photo');
  if (!photo) return;

  // The image may already have failed before this script ran.
  if (photo.complete && photo.naturalWidth === 0) {
    showPhotoFallback(photo);
    return;
  }

  photo.addEventListener('error', () => showPhotoFallback(photo), { once: true });
});