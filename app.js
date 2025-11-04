const noteForm = document.getElementById('noteForm');
const authorInput = document.getElementById('author');
const textInput = document.getElementById('text');
const notesDiv = document.getElementById('notes');
const db = window.db;

// Простая защита от XSS
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderNote(doc) {
  const data = doc.data();
  const el = document.createElement('div');
  el.className = 'note';
  el.innerHTML = `<div class="meta"><strong>${escapeHtml(data.author)}</strong> — <small>${new Date(data.createdAt).toLocaleString()}</small></div>
                  <div>${escapeHtml(data.text)}</div>`;
  notesDiv.appendChild(el);
}

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const author = authorInput.value.trim();
  const text = textInput.value.trim();
  if (!author || !text) return;

  try {
    await db.collection('notes').add({
      author,
      text,
      createdAt: Date.now()
    });
    textInput.value = '';
  } catch (err) {
    console.error('Ошибка сохранения:', err);
    alert('Не удалось сохранить заметку.');
  }
});

// Подписка на изменения в реальном времени
db.collection('notes').orderBy('createdAt', 'desc')
  .onSnapshot(snapshot => {
    notesDiv.innerHTML = ''; // перерисовываем для простоты
    snapshot.forEach(doc => renderNote(doc));
  }, err => {
    console.error('Ошибка получения заметок:', err);
  });
