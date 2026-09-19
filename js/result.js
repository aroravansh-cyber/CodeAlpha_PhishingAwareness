
// result.js — reads the latest saved test result from localStorage
document.addEventListener('DOMContentLoaded', () => {
  let result = null;
  try {
    const raw = localStorage.getItem('learnphish_result');
    if (raw) result = JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read saved result:', err);
  }

  const card = document.getElementById('result-card');
  const eyebrow = document.getElementById('result-eyebrow');
  const title = document.getElementById('result-title');
  const note = document.getElementById('result-note');

  if (!result) {
    eyebrow.textContent = 'No result yet';
    title.textContent = "You haven't taken the test yet";
    note.textContent = 'Take the 20-question phish test to see your score here.';
    document.getElementById('stat-score').textContent = '—';
    document.getElementById('stat-percent').textContent = '—';
    document.getElementById('stat-status').textContent = '—';
    return;
  }

  const isPass = result.status === 'PASS';
  card.classList.add(isPass ? 'status-pass' : 'status-retry');
  eyebrow.textContent = isPass ? 'Congratulations 🎉' : 'Keep learning';
  title.textContent = isPass ? 'You passed the Phish Test' : "You didn't pass the Phish Test";
  document.getElementById('stat-score').textContent = `${result.correct} / ${result.total}`;
  document.getElementById('stat-percent').textContent = `${result.percentage}%`;
  document.getElementById('stat-status').textContent = result.status;
  note.textContent = isPass
    ? 'Solid instincts. Revisit any topic anytime to sharpen your awareness further.'
    : 'Awareness builds with review. Work back through the topics and try again when ready.';
});
