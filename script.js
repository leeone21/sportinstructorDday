const EXAM_DATE = new Date(2027, 3, 17, 9, 0, 0); // 2027-04-17 09:00:00

const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const ddayBadge = document.getElementById('dday-badge');
const remainingText = document.getElementById('remaining-text');
const todayEl = document.getElementById('today');

function pad(n, len = 2) {
  return String(n).padStart(len, '0');
}

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function update() {
  const now = new Date();
  const diffMs = EXAM_DATE - now;

  if (diffMs <= 0) {
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    ddayBadge.textContent = 'D-0';
    remainingText.textContent = '시험이 종료되었습니다.';
    return;
  }

  const totalSec = Math.floor(diffMs / 1000);
  const days = Math.floor(diffMs / 86400000);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);

  ddayBadge.textContent = `D-${days}`;
  remainingText.textContent = `${days}일 ${pad(hours)}시간 ${pad(minutes)}분 ${pad(seconds)}초 남았습니다`;
}

todayEl.textContent = getTodayStr();
update();
setInterval(update, 1000);
