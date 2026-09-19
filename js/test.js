
// test.js — 20-question phishing-awareness test
const QUESTIONS = [
  { q: "An email from your bank asks you to click a link to 'confirm' your account within 15 minutes. What's the safest first step?", options: ["Click the link and check quickly", "Open your banking app or site directly, not via the link", "Reply asking if it's real", "Forward it to a friend"], correct: 1, hint: "Think about how you could reach your bank without using anything in the message." },
  { q: "You get a text saying a delivery fee is due for a package you don't remember ordering. What should you do?", options: ["Pay the small fee to be safe", "Check tracking directly on the carrier's official site or app", "Reply STOP", "Click the link to see the amount"], correct: 1, hint: "Consider going straight to a source you already trust instead of the message." },
  { q: "A coworker's email address is spelled almost correctly but has one extra letter. What does this suggest?", options: ["A typo they made themselves", "Possible impersonation of their account or domain", "Nothing unusual", "Their email is just old"], correct: 1, hint: "Compare the address carefully to one you know is correct." },
  { q: "Which detail matters most when checking a link before clicking?", options: ["The color of the button", "The actual domain the link points to", "How official the logo looks", "The length of the email"], correct: 1, hint: "Hovering over a link reveals something important — what is it?" },
  { q: "A message threatens legal action unless you respond within the hour. This is an example of:", options: ["Standard business communication", "Fear and urgency used to rush a decision", "A normal deadline", "Good customer service"], correct: 1, hint: "Think about which social-engineering lever creates a countdown feeling." },
  { q: "You receive an unexpected password-reset message. What should you do?", options: ["Click the reset link right away", "Ignore it completely and delete", "Verify through the site directly, not the message's link", "Reply with your current password"], correct: 2, hint: "Think about how you could verify the alert without using the message's link." },
  { q: "An attachment named 'Invoice_Urgent.exe' arrives from an unfamiliar sender. What's the concern?", options: ["The file name is too long", "An .exe file claiming to be an invoice is a mismatch worth stopping for", "Invoices are always safe", "Nothing — just open it"], correct: 1, hint: "Compare what the file claims to be with what type of file it actually is." },
  { q: "A message says 'Act now or lose access forever.' This phrasing is designed to:", options: ["Inform you calmly", "Create panic that skips careful thinking", "Offer a helpful reminder", "Confirm your identity"], correct: 1, hint: "Notice the emotion the wording is aiming to produce." },
  { q: "Which sender address is most likely legitimate for 'Netflix'?", options: ["support@netflix-billing-help.com", "billing@netflix.com", "netflix.support@mailservice.info", "account@netfIix.com (capital I)"], correct: 1, hint: "Look for the domain that matches the real company exactly, with nothing added." },
  { q: "You get a call from someone claiming to be 'IT support' asking for your password to fix an issue. Best response?", options: ["Give the password since it's IT", "Hang up and contact IT through a known internal number", "Give a fake password", "Ask them to call back later"], correct: 1, hint: "Think about verifying a caller's identity independently of the call itself." },
  { q: "A QR code on a flyer leads to a login page asking for your work credentials. What's the concern?", options: ["QR codes are always safe", "You can't easily see where a QR code leads before scanning", "Flyers are trustworthy by default", "Nothing, if the page looks nice"], correct: 1, hint: "Consider what's different about checking a QR code link versus a normal link." },
  { q: "An email claims to be from your CEO, asking you to urgently buy gift cards. What should you do?", options: ["Buy them quickly to help out", "Verify the request through a separate, known channel first", "Reply asking for more gift card details", "Forward to the whole team"], correct: 1, hint: "Think about unusual requests involving money and how to confirm they're real." },
  { q: "Which is the strongest sign of a look-alike domain?", options: ["A .com ending", "Extra words or slight misspellings inserted into a familiar brand name", "A short domain name", "A domain that uses HTTPS"], correct: 1, hint: "Read the domain slowly, letter by letter, near the brand name." },
  { q: "A message asks you to 'verify your identity' by entering your password on a page linked in the email. This is:", options: ["Standard verification", "A common credential-harvesting tactic", "Required by most companies", "Always safe if the page looks official"], correct: 1, hint: "Think about how real companies usually ask you to verify identity." },
  { q: "What's the safest way to check if a suspicious email is real?", options: ["Reply to the email directly", "Contact the organization using contact info you already have, not from the message", "Search the sender's name online", "Ask a friend to check the link"], correct: 1, hint: "Consider a way to verify that doesn't rely on anything the message itself provided." },
  { q: "An unexpected shared-document email asks you to sign in with your email password. What's suspicious?", options: ["Nothing, document shares are always safe", "Being asked to enter your email password to view a document is unusual", "Documents should never be shared", "The file format"], correct: 1, hint: "Think about what a normal document-sharing notification actually asks of you." },
  { q: "A vishing (voice phishing) call typically relies on:", options: ["Written proof sent afterward", "Live pressure and impersonation over the phone", "Email attachments", "QR codes"], correct: 1, hint: "Consider what makes a phone call different from a written message." },
  { q: "Which behavior best protects against attachment-based phishing?", options: ["Opening all attachments from known-looking senders", "Verifying unexpected attachments before opening them", "Disabling antivirus for convenience", "Forwarding attachments to check with others first"], correct: 1, hint: "Think about confirming expectations before interacting with a file." },
  { q: "If you've already clicked a suspicious link but entered no information, what's a reasonable next step?", options: ["Do nothing further", "Close the page, avoid entering anything, and report it through the appropriate channel", "Restart your computer only", "Click it again to double check"], correct: 1, hint: "Consider reporting as part of the response, even if no data was entered." },
  { q: "Which best describes spear phishing?", options: ["A mass email sent to thousands of random addresses", "A message tailored specifically to one person or role using researched details", "A phone call with no personalization", "A generic delivery notification"], correct: 1, hint: "Think about the level of personalization involved compared to a generic message." }
];

let currentAnswers = new Array(QUESTIONS.length).fill(null);

function renderQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  QUESTIONS.forEach((item, i) => {
    const card = document.createElement('article');
    card.className = 'q-card';
    card.innerHTML = `
      <p class="q-index">Question ${i + 1} of ${QUESTIONS.length}</p>
      <h3>${item.q}</h3>
      <div class="q-options">
        ${item.options.map((opt, oi) => `<button class="q-option" data-q="${i}" data-opt="${oi}">${opt}</button>`).join('')}
      </div>
      <button class="hint-toggle" data-q="${i}">💡 Show Hint</button>
      <div class="hint-text" id="hint-${i}">${item.hint}</div>
    `;
    container.appendChild(card);
  });

  container.addEventListener('click', (e) => {
    const opt = e.target.closest('.q-option');
    const hintBtn = e.target.closest('.hint-toggle');

    if (opt) {
      const qi = Number(opt.dataset.q);
      const oi = Number(opt.dataset.opt);
      currentAnswers[qi] = oi;
      const card = opt.closest('.q-card');
      card.querySelectorAll('.q-option').forEach(b => b.classList.remove('selected'));
      opt.classList.add('selected');
      updateProgress();
    }

    if (hintBtn) {
      const qi = hintBtn.dataset.q;
      const hint = document.getElementById(`hint-${qi}`);
      hint.classList.toggle('show');
      hintBtn.textContent = hint.classList.contains('show') ? '💡 Hide Hint' : '💡 Show Hint';
    }
  });
}

function updateProgress() {
  const answered = currentAnswers.filter(a => a !== null).length;
  const pct = Math.round((answered / QUESTIONS.length) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = `${answered} of ${QUESTIONS.length} answered`;
}

function submitTest() {
  const unanswered = currentAnswers.filter(a => a === null).length;
  if (unanswered > 0) {
    const proceed = confirm(`You have ${unanswered} unanswered question(s). Submit anyway? Unanswered questions count as incorrect.`);
    if (!proceed) return;
  }

  let correct = 0;
  QUESTIONS.forEach((item, i) => {
    if (currentAnswers[i] === item.correct) correct++;
  });

  const total = QUESTIONS.length;
  const percentage = Math.round((correct / total) * 100);
  const status = correct >= 12 ? 'PASS' : 'RETRY';

  const result = { correct, total, percentage, status, date: new Date().toISOString() };
  try {
    localStorage.setItem('learnphish_result', JSON.stringify(result));
  } catch (err) {
    console.warn('Could not save result locally:', err);
  }

  window.location.href = 'result.html';
}

document.addEventListener('DOMContentLoaded', () => {
  renderQuiz();
  document.getElementById('submit-test').addEventListener('click', submitTest);
});
