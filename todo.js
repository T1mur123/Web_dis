let notes = [];
let noteId = 0;

// Загрузка заметок из localStorage
function loadNotes() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
        noteId = notes.length;
        renderNotes();
    }
}

// Сохранение заметок в localStorage
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

document.getElementById('addNoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const noteText = document.getElementById('noteText').value.trim();
    if (noteText) {
        addNote(noteText);
        document.getElementById('noteText').value = '';
    }
});

function addNote(text) {
    const note = {
        id: noteId++,
        text: text,
        done: false
    };
    notes.push(note);
    saveNotes();
    renderNotes();
}

function renderNotes() {
    const notesDiv = document.getElementById('notes');
    notesDiv.innerHTML = '';
    notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        if (note.done) {
            noteDiv.classList.add('done');
        }
        noteDiv.innerHTML = `
            <input type="checkbox" id="done-${note.id}" ${note.done ? 'checked' : ''}>
            <span id="note-text-${note.id}">${note.text}</span>
            <button class="edit-btn" data-id="${note.id}">Изменить</button>
            <button class="delete-btn" data-id="${note.id}">Удалить</button>
        `;
        notesDiv.appendChild(noteDiv);
        noteDiv.classList.add('added'); // Добавляем анимацию добавления

        const checkbox = document.getElementById(`done-${note.id}`);
        checkbox.addEventListener('change', function() {
            note.done = checkbox.checked;
            saveNotes(); // Сохраняем изменения
            renderNotes(); // Перерисовываем заметки, чтобы применить стиль выполнения
        });

        const editBtn = noteDiv.querySelector('.edit-btn');
        editBtn.addEventListener('click', function() {
            const newText = prompt('Введите новое содержание заметки:', note.text);
            if (newText) {
                note.text = newText;
                saveNotes();
                renderNotes();
            }
        });

        const deleteBtn = noteDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            noteDiv.classList.add('removed'); // Добавляем анимацию удаления
            setTimeout(() => {
                notes = notes.filter(n => n.id !== note.id);
                saveNotes();
                renderNotes();
            }, 500); // Удаляем заметку после анимации
        });
    });
}

loadNotes(); // Загружаем заметки при запуске страницы
