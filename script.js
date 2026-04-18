const STORAGE_KEY = 'sportinstructor_ddays';

const examDateInput = document.getElementById('examDate');
const examNameInput = document.getElementById('examName');
const addBtn = document.getElementById('addBtn');
const ddayList = document.getElementById('ddayList');
const todaySpan = document.getElementById('today');

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function calcDday(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function loadData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function renderList() {
  const data = loadData();

  if (data.length === 0) {
    ddayList.innerHTML = '<p class="empty-msg">등록된 시험이 없습니다.</p>';
    return;
  }

  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  ddayList.innerHTML = data.map((item, idx) => {
    const diff = calcDday(item.date);
    let ddayText, ddayClass, cardClass;

    if (diff > 0) {
      ddayText = `D-${diff}`;
      ddayClass = 'future';
      cardClass = '';
    } else if (diff === 0) {
      ddayText = 'D-Day';
      ddayClass = 'today-label';
      cardClass = 'today';
    } else {
      ddayText = `D+${Math.abs(diff)}`;
      ddayClass = 'past-label';
      cardClass = 'past';
    }

    return `
      <div class="dday-card ${cardClass}">
        <div class="card-info">
          <div class="card-name">${escapeHtml(item.name)}</div>
          <div class="card-date">${formatDate(item.date)}</div>
        </div>
        <div class="card-dday ${ddayClass}">${ddayText}</div>
        <button class="delete-btn" data-idx="${idx}" title="삭제">✕</button>
      </div>
    `;
  }).join('');

  ddayList.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.idx, 10);
      const data = loadData();
      data.splice(i, 1);
      saveData(data);
      renderList();
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function addItem() {
  const date = examDateInput.value;
  const name = examNameInput.value.trim() || '스포츠지도사 필기시험';

  if (!date) {
    alert('시험 날짜를 선택해주세요.');
    return;
  }

  const data = loadData();
  data.push({ name, date });
  saveData(data);

  examDateInput.value = '';
  examNameInput.value = '';

  renderList();
}

addBtn.addEventListener('click', addItem);

document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    examNameInput.value = btn.dataset.name;
    examDateInput.focus();
  });
});

todaySpan.textContent = getTodayStr();
renderList();

// 자정에 자동 갱신
const now = new Date();
const msToMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
setTimeout(() => {
  todaySpan.textContent = getTodayStr();
  renderList();
}, msToMidnight);
