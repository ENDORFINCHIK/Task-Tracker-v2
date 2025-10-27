const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.querySelector('.prev-month-btn');
const nextMonthBtn = document.querySelector('.next-month-btn');
const dates = document.querySelector('.dates'); // виправлено
const dayNames = document.querySelector('.day-names'); // виправлено

let currentDate = new Date();

function updateMonthYear() {
    const options = { year: 'numeric', month: 'long' };
    monthYear.textContent = currentDate.toLocaleDateString('uk-UA', options);
}
updateMonthYear();

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateMonthYear();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateMonthYear();
});

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function addDate() {
    dayNames.innerHTML = '';

    for (let i = 0; i < daysOfWeek.length; i++) {
        const dayNameDiv = document.createElement('div');
        dayNameDiv.classList.add('day-name');
        dayNameDiv.textContent = daysOfWeek[i];
        dayNames.appendChild(dayNameDiv);
    }

    dates.innerHTML = '';

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const adjustedFirstDayIndex = (firstDayIndex + 6) % 7; // Adjust for Monday start

    for (let i = 0; i < adjustedFirstDayIndex; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('date');
        dates.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateBtn = document.createElement('button');
        dateBtn.classList.add('date');
        dateBtn.textContent = day;
        dates.appendChild(dateBtn);
    }
}
addDate();

prevMonthBtn.addEventListener('click', addDate);
nextMonthBtn.addEventListener('click', addDate);


const taskTable = document.getElementById('task-table');
const addTaskBtn = document.getElementById('add-task-btn');

function addTaskRow() {
    const newRow = document.createElement('tr');
    newRow.classList.add('task-row');
    newRow.innerHTML = `
   <td class="nameTask"><textarea></textarea></td>
                    <td><input type="date" name="" class="dateTask"></td>
                    <td class="status-field">
                        <p id="status-paragraph">In progress</p>
                        <button class="select-btn"><img src="Images/status-select.png" alt=""></button>
                    </td>
                    <td class="del-btn-field"><button id="deleteBtn" class="delete-btn">X</button></td>`;
    taskTable.appendChild(newRow);
    
}


function deleteTask(){
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            row.remove();
        });
    });
}
function saveTasksToLocalStorage() {
    const tasks = [];
    const rows = taskTable.querySelectorAll('tr.task-row');
    rows.forEach(row => {
        const name = row.querySelector('textarea').value;
        const date = row.querySelector('input[type="date"]').value;
        const status = row.querySelector('.status-field p').textContent;
        tasks.push({ name, date, status });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const newRow = document.createElement('tr');
        newRow.classList.add('task-row');
        newRow.innerHTML = `
                        <td class="nameTask"><textarea>${task.name}</textarea></td>
                        <td><input type="date" name="" class="dateTask" value="${task.date}"></td>
                        <td class="status-field">
                            <p id="status-paragraph">${task.status}</p>
                            <button class="select-btn"><img src="Images/status-select.png" alt=""></button>
                        </td>
                        <td class="del-btn-field"><button id="deleteBtn" class="delete-btn">X</button></td>`;
        taskTable.appendChild(newRow);
        window.textareaAutoResize();
    });
};
window.addEventListener('load', loadTasksFromLocalStorage);
window.addEventListener('beforeunload', saveTasksToLocalStorage)
taskTable.addEventListener('click', deleteTask );
addTaskBtn.addEventListener('click', addTaskRow);

function textareaAutoResize() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        textarea.addEventListener('input', () => {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        });
    });
}
taskTable.addEventListener('input', textareaAutoResize);

function toggleStatus(event) {
    const btn = event.target.closest('.select-btn');
    const field = btn.closest('.status-field');

    const select = document.createElement('div');
    select.classList.add('status-select');
    select.innerHTML = `
        <button class="status-option">In progress</button>
        <button class="status-option">Completed</button>
        <button class="status-option">To do</button>
    `;
    select.addEventListener('click', (e) => {
        if (e.target.classList.contains('status-option')) {
            const statusParagraph = field.querySelector('p');
            statusParagraph.textContent = e.target.textContent;
            select.remove();
        }
    });

    field.appendChild(select);
}

taskTable.addEventListener('click', toggleStatus);