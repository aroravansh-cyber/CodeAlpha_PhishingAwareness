
// practice.js — renders fictional practice scenarios and handles selection
const SCENARIOS = [
  {
    context: "Fake account alert",
    sender: "security@accnt-verify-support.com",
    subject: "Unusual sign-in detected — verify now",
    message: "We noticed a sign-in from a new device. If this wasn't you, verify your identity within 30 minutes or your account will be suspended.",
    answer: "suspicious",
    why: "The sender domain isn't a real company name, and the message manufactures urgency with a countdown to pressure quick action."
  },
  {
    context: "Delivery message",
    sender: "no-reply@parcel-track-update.net",
    subject: "Your package could not be delivered",
    message: "A redelivery fee of $1.99 is required. Confirm your address and pay the fee to reschedule delivery.",
    answer: "suspicious",
    why: "A small unexpected fee tied to a link is a common lure — legitimate carriers don't usually ask for card details this way."
  },
  {
    context: "Payroll request",
    sender: "hr@yourcompany.com",
    subject: "Q3 benefits enrollment reminder",
    message: "Reminder: open enrollment for benefits closes on the 30th. Visit the HR portal you already use to review your selections.",
    answer: "safe",
    why: "No urgency, no link to click, and it points you to a portal you already know rather than asking you to follow a new one."
  },
  {
    context: "Password warning",
    sender: "alerts@it-secure-check.co",
    subject: "Your password expires in 2 hours",
    message: "Click below immediately to keep access to your account. Failure to update will lock you out permanently.",
    answer: "suspicious",
    why: "Extreme time pressure plus a permanent-sounding consequence is designed to stop you from checking with IT first."
  },
  {
    context: "College/library message",
    sender: "library@campus.edu",
    subject: "Your book is due back this week",
    message: "This is a reminder that 'Introduction to Networks' is due back on Friday. Renew online or return it at the front desk.",
    answer: "safe",
    why: "Routine, low-stakes, and it doesn't ask for credentials, payment, or urgent action."
  },
  {
    context: "Routine notification",
    sender: "notifications@teamchat.com",
    subject: "You have 3 unread messages",
    message: "You have new messages waiting in your workspace. Open the app to view them.",
    answer: "safe",
    why: "A generic, low-urgency nudge that matches normal product behavior, with no request for sensitive information."
  }
];

function renderScenarios() {
  const container = document.getElementById('practice-container');
  if (!container) return;

  SCENARIOS.forEach((s, i) => {
    const card = document.createElement('article');
    card.className = 'email-card';
    card.innerHTML = `
      <div class="email-meta">
        <span class="context-tag">${s.context}</span>
        <dl>
          <dt>From</dt><dd>${s.sender}</dd>
          <dt>Subject</dt><dd>${s.subject}</dd>
        </dl>
      </div>
      <div class="email-message">${s.message}</div>
      <div class="email-actions">
        <button class="choice-btn" data-choice="suspicious" data-index="${i}">Suspicious</button>
        <button class="choice-btn" data-choice="safe" data-index="${i}">Likely safe</button>
      </div>
      <div class="email-explain" id="explain-${i}">
        <span class="explain-label"></span>
        <p></p>
      </div>
    `;
    container.appendChild(card);
  });

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.choice-btn');
    if (!btn) return;
    const index = Number(btn.dataset.index);
    const choice = btn.dataset.choice;
    const scenario = SCENARIOS[index];
    const card = btn.closest('.email-card');
    const buttons = card.querySelectorAll('.choice-btn');
    const explain = card.querySelector('.email-explain');

    buttons.forEach(b => { b.disabled = true; b.classList.remove('selected-suspicious','selected-safe'); });
    btn.classList.add(choice === 'suspicious' ? 'selected-suspicious' : 'selected-safe');

    const correct = choice === scenario.answer;
    explain.classList.add('show', correct ? 'correct' : 'incorrect');
    explain.querySelector('.explain-label').textContent = correct ? 'Correct — why?' : 'Not quite — why?';
    explain.querySelector('p').textContent = scenario.why;
  });
}

document.addEventListener('DOMContentLoaded', renderScenarios);
