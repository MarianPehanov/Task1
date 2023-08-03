const newNoteButton = document.getElementById("create-note");
const newNoteForm = document.getElementById("newNoteForm");
const saveButton = document.getElementById("saveButton");
const table = document.getElementById("notes-table");
const nameElement = document.getElementsByClassName("name")[0];
const contentElement = document.getElementsByClassName("content")[0];
function time() {
    date = new Date();
    return `  ${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  `
}
let id = 0;
let notes = [
    { id: id++, Name: 'shop', Created: time(), Category: 'Random Thought', Content: "11.11.2222", Dates: "", edit: "", archivated: false, delete: "" },
    { id: id++, Name: 'sport', Created: time(), Category: 'Task', Content: "11/09/1933", Dates: "", edit: "", archivated: false, delete: "" },
    { id: id++, Name: 'travel', Created: time(), Category: 'Idea', Content: "sdfsf", Dates: "", edit: "", archivated: true, delete: "" },
    { id: id++, Name: 'work', Created: time(), Category: 'Random Thought', Content: "sdcscd 22/33/4444", Dates: "", edit: "", archivated: false, delete: "" },
    { id: id++, Name: 'dog', Created: time(), Category: 'Task', Content: "31-12-2209", Dates: "", edit: "", archivated: false, delete: "" },
    { id: id++, Name: 'family', Created: time(), Category: 'Idea', Content: "-", Dates: "", edit: "", archivated: true, delete: "" },
]
function fillMainTableWithData(dataArray) {
    table.innerHTML = '';
    const headerRow = table.insertRow();
    for (const key in dataArray[0]) {
        const headerCell = document.createElement('th');
        if ((key != "edit") && (key != "archivated") && (key != "delete") && (key != "id")) {
            headerCell.textContent = key;
        }
        else {
            headerCell.textContent = "";
        }
        headerRow.appendChild(headerCell);
    }
    dataArray.forEach(item => {
        const row = table.insertRow();
        row.setAttribute('id', item.id);
        for (const key in item) {
            const cell = row.insertCell();
            if ((key != "edit") && (key != "archivated") && (key != "delete") && (key != "id") && (key != "Dates")) {
                cell.textContent = item[key];
            }
            else if(key == "Dates") {
                cell.textContent = extractDatesFromText(item.Content);
            }
            else if (key == "edit") {
                const button = document.createElement("button");
                button.textContent = "edit";
                button.classList.add('edit-button');
                cell.appendChild(button);
            }
            else if (key == "archivated") {
                const button = document.createElement("button");
                button.textContent = "to archive";
                button.classList.add('archive-button');
                cell.appendChild(button);
            }
            else if (key == "delete") {
                const button = document.createElement("button");
                button.textContent = "delete";
                button.classList.add('delete-button');
                cell.appendChild(button);
            }
        }
    });
}
function extractDatesFromText(text) {
const totalArray = text.match(/\b\d{2}.\d{2}.\d{4}\b/g);
if (totalArray) {
const totalString = totalArray.map(item=> `'${item}'`).join(" ");
return totalString;
  } else  return "";
}
function pushNewElement() {
    let name = document.getElementsByClassName("name")[0].value;
    let category = document.getElementsByClassName("category")[0].value;
    let content = document.getElementsByClassName("content")[0].value;
    let newNote = { id: id++, Name: name, Created: time(), Category: category, Content: content, 
        Dates: extractDatesFromText(content), edit: "", archivated: false, delete: "" };
    notes.push(newNote);
 }
function appendRow(newNoteData) {
    const newRow = table.insertRow();
    for (const key in newNoteData) {
        const cell = newRow.insertCell()
        if ((key != "edit") && (key != "archivated") && (key != "delete") && (key != "id") && (key != "Dates") ) {
            cell.textContent = newNoteData[key];
        }
        else if (key == "Dates") {
            cell.textContent = newNoteData[key];
        }
        else if (key == "edit") {
            const button = document.createElement("button");
            button.textContent = "edit";
            button.classList.add('edit-button');
            cell.appendChild(button);
        }
        else if (key == "archivated") {
            const button = document.createElement("button");
            button.textContent = "to archive";
            button.classList.add('archive-button');
            cell.appendChild(button);
        }
        else if (key == "delete") {
            const button = document.createElement("button");
            button.textContent = "delete";
            button.classList.add('delete-button');
            cell.appendChild(button);
        }
    }
}

function statisticArray(notes) {
    let taskActiveCount = 0;
    let taskArchivCount = 0;
    let randomToughtActiveCount = 0;
    let randomToughtArchivCount = 0;
    let ideaActiveCount = 0;
    let ideaArchiveCount = 0;
    notes.forEach(element => {
        if (element.Category == "Task") { if (!element.archivated) { taskActiveCount++; } else { taskArchivCount++ } }
        else if (element.Category == "Random Thought") { if (!element.archivated) { randomToughtActiveCount++; } else { randomToughtArchivCount++ } }
        else if (element.Category == "Idea") { if (!element.archivated) { ideaActiveCount++; } else { ideaArchiveCount++ } }
    });
    return [{ Category: "Task", active: taskActiveCount, archived: taskArchivCount },
    { Category: "Random Thought", active: randomToughtActiveCount, archived: randomToughtArchivCount },
    { Category: "Idea", active: ideaActiveCount, archived: ideaArchiveCount }]
}
function fillStatisticTableWithData(dataArray) {
    const table = document.getElementById('statistic-table');
    table.innerHTML = '';
    const headerRow = table.insertRow();
    for (const key in dataArray[0]) {
        const headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    }
    dataArray.forEach(item => {
        const row = table.insertRow();
        for (const key in item) {
            const cell = row.insertCell();
            cell.textContent = item[key];
        }
    })
}
//index
{
    ///////////////////////////////////////////////////////////
    fillMainTableWithData(notes);
    let arrayStatisticTable = statisticArray(notes)
    fillStatisticTableWithData(arrayStatisticTable);
    ////////////////////////////////////////////////////////////////
}

newNoteButton.addEventListener("click", e => {
    e.preventDefault();
    nameElement.textContent = "";
    contentElement.textContent = "";
    newNoteButton.style.display = "none";
    newNoteForm.style.display = "block";
});

saveButton.addEventListener("click", e => {
    e.preventDefault();
    newNoteButton.style.display = "block";
    pushNewElement()
    appendRow(notes[notes.length - 1]);
    newNoteForm.style.display = "none";
    let arrayStatisticTable = statisticArray(notes);
    fillStatisticTableWithData(arrayStatisticTable);
});
const editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach(element =>
    element.addEventListener("click", e => {
        e.preventDefault();
        newNoteButton.style.display = "none";
        newNoteForm.style.display = "block";
        const clickedRow = e.target.closest('tr');
        const noteId = clickedRow.getAttribute('id');
        delete notes[noteId];
        clickedRow.style.display = "none";
        const cells = clickedRow.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => cell.textContent);
        nameElement.textContent = rowData[1];
        contentElement.textContent = rowData[4];
        let arrayStatisticTable = statisticArray(notes);
        fillStatisticTableWithData(arrayStatisticTable);
    }
    )
)
const archiveButtons = document.querySelectorAll(".archive-button");
archiveButtons.forEach(element => {
    element.addEventListener("click", e => {
        e.preventDefault();
        const clickedRow = e.target.closest('tr');
        const noteId = clickedRow.getAttribute('id');
        notes[noteId].archivated = true;
        clickedRow.style.display = "none";
        let arrayStatisticTable = statisticArray(notes);
        fillStatisticTableWithData(arrayStatisticTable);
    })
})
const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach(element => {
    element.addEventListener("click", e => {
        e.preventDefault();
        const clickedRow = e.target.closest('tr');
        const noteId = clickedRow.getAttribute('id');
        delete notes[noteId];
        clickedRow.style.display = "none";
        let arrayStatisticTable = statisticArray(notes);
        fillStatisticTableWithData(arrayStatisticTable);
    })
})
