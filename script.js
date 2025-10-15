const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.querySelector('.prev-month-btn');
const nextMonthBtn = document.querySelector('.next-month-btn');

let currentDate = new Date();

function UpdateCalendar() {
    const optionsMonth = { year: 'numeric', month: 'long' };
    monthYear.textContent = currentDate.toLocaleDateString('en-US', optionsMonth);
    const optionDay = { day: 'numeric' };
    const daysContainer = document.querySelector('.dates');
    daysContainer.innerHTML = '';
    
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate(); 
    for (let i = 1; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        daysContainer.appendChild(emptyCell);
    }
    for (let day = 1; day <= totalDays; day++) {
        const dateCell = document.createElement('div');
        dateCell.textContent = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toLocaleDateString('en-US', optionDay);
        daysContainer.appendChild(dateCell);
    }
}
UpdateCalendar();

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    UpdateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    UpdateCalendar();
});

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const calendarBody = document.querySelector('.calendar-body');