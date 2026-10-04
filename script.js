const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all-btn");

// Load notes from localStorage or initialize empty array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Render notes list with search filtering, counts, and safe DOM creation
function render(filter = "") {
    notesList.textContent = "";

    const filteredNotes = notes.filter(note => 
        note.text.toLowerCase().includes(filter.toLowerCase())
    );

    // Update count message based on total notes
    const total = notes.length;
    if (total === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (total === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${total} notes.`;
    }

    if (filteredNotes.length === 0) {
        const li = document.createElement("li");
        li.className = "empty-message";
        li.textContent = filter ? "No notes match your search." : "No notes added yet.";
        notesList.appendChild(li);
        return;
    }

    filteredNotes.forEach(note => {
        const li = document.createElement("li");
        li.className = `note-card category-${note.category}`;

        const contentDiv = document.createElement("div");
        contentDiv.className = "note-content";

        const textP = document.createElement("p");
        textP.className = "note-text";
        textP.textContent = note.text; // Safe text rendering

        const metaP = document.createElement("p");
        metaP.className = "note-meta";

        const badgeSpan = document.createElement("span");
        badgeSpan.className = "category-tag";
        badgeSpan.textContent = note.category;

        const dateSpan = document.createElement("span");
        dateSpan.textContent = `• ${note.createdAt}`;

        metaP.appendChild(badgeSpan);
        metaP.appendChild(dateSpan);

        contentDiv.appendChild(textP);
        contentDiv.appendChild(metaP);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteNote(note.id);
        });

        li.appendChild(contentDiv);
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

// Add note form submission and validation handler
noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    errorMessage.textContent = "";

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }
    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
    };

    notes.push(newNote);
    saveNotes();
    render(searchInput.value);

    noteInput.value = "";
    errorMessage.textContent = "";
});

// Delete individual note handler
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    render(searchInput.value);
}

// Bonus: Clear all notes with confirmation prompt
clearAllBtn.addEventListener("click", () => {
    if (notes.length === 0) return;
    if (confirm("Delete all notes?")) {
        notes = [];
        saveNotes();
        render(searchInput.value);
    }
});

// Search input live filter handler
searchInput.addEventListener("input", (e) => {
    render(e.target.value);
});

// Initial page load render
render();