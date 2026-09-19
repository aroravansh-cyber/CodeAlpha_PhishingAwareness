
// cluewell.js — client-side, keyword-based educational signal detector.
// Nothing typed here is stored or sent anywhere; analysis happens only in the browser.

const SIGNAL_RULES = [
  { key: 'urgency', label: 'Urgency language', test: /(immediately|urgent|right away|within \d+ (minutes|hours)|act now|expires soon|final notice)/i,
    detail: 'The text uses time pressure to encourage a fast decision.' },
  { key: 'credential', label: 'Credential request', test: /(password|login credentials|verify your account|confirm your identity|sign in to confirm)/i,
    detail: 'The text asks for account credentials or identity verification.' },
  { key: 'financial', label: 'Financial request', test: /(gift card|wire transfer|payment (is|was) required|bank details|invoice attached|processing fee)/i,
    detail: 'The text involves a payment, transfer, or financial detail.' },
  { key: 'link-wording', label: 'Suspicious link wording', test: /(click here|verify now|confirm here|update your details|log in here)/i,
    detail: 'The text uses generic call-to-action phrasing often paired with disguised links.' },
  { key: 'attachment', label: 'Unexpected attachment reference', test: /(see attached|open the attachment|download the file|attached invoice|attached document)/i,
    detail: 'The text references an attachment, which is worth verifying before opening.' },
];

function analyze(text) {
  return SIGNAL_RULES.filter(rule => rule.test.test(text));
}

function renderResults(matches) {
  const output = document.getElementById('cluewell-output');
  if (matches.length === 0) {
    output.innerHTML = `
      <span class="output-label">Educational analysis</span>
      <div class="no-signals">No common educational signals were detected in this text.</div>
      <p class="disclaimer">This is a simple keyword-based teaching aid, not a reliable security verdict. Always apply the judgment covered in the Learn section.</p>
    `;
    return;
  }

  const items = matches.map(m => `
    <li class="signal-item">
      <div><strong>${m.label}</strong>${m.detail}</div>
    </li>
  `).join('');

  output.innerHTML = `
    <span class="output-label">Educational analysis</span>
    <ul class="signal-list">${items}</ul>
    <p class="disclaimer">Keyword matches like these are an awareness aid only, not a reliable security verdict — always apply the judgment covered in the Learn section.</p>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('analyze-btn');
  const textarea = document.getElementById('email-text');
  if (!btn || !textarea) return;

  btn.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text) {
      document.getElementById('cluewell-output').innerHTML =
        '<p class="output-placeholder">Paste some email content above to analyze it.</p>';
      return;
    }
    const matches = analyze(text);
    renderResults(matches);
    // Text is processed in-memory only and is never stored or transmitted.
  });
});
