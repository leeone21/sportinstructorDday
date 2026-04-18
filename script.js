const EXAM_DATE = new Date('2027-04-17T00:00:00+09:00');

const ddayLabel = document.getElementById('dday-label');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const todayEl = document.getElementById('today');

function pad2(n) { return String(n).padStart(2, '0'); }
function pad3(n) { return String(n).padStart(3, '0'); }

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function update() {
  const now = new Date();
  const diffMs = EXAM_DATE - now;

  if (diffMs <= 0) {
    const passedDays = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
    ddayLabel.textContent = passedDays === 0 ? 'D-Day' : `D+${passedDays}`;
    daysEl.textContent = '000';
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

  ddayLabel.textContent = `D-${days}`;
  daysEl.textContent = pad3(days);
  hoursEl.textContent = pad2(hours);
  minutesEl.textContent = pad2(minutes);
  secondsEl.textContent = pad2(seconds);
}

todayEl.textContent = getTodayStr();
update();
setInterval(update, 1000);
