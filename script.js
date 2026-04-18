const EXAM_DATE = new Date('2027-04-17T00:00:00+09:00');

const ddayEl = document.getElementById('dday');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function pad(n) {
  return String(n).padStart(2, '0');
}

function update() {
  const now = new Date();
  const diffMs = EXAM_DATE - now;

  if (diffMs <= 0) {
    const passedDays = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
    ddayEl.textContent = passedDays === 0 ? 'D-Day' : `D+${passedDays}`;
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const totalSec = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  ddayEl.textContent = `D-${days}`;
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

update();
setInterval(update, 1000);
