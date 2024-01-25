let monthEle = document.querySelector('.month')
let yearEle = document.querySelector('.year')
let btnPrev = document.querySelector('.prev-month')
let btnNext = document.querySelector('.next-month')
let dateEle = document.querySelector('.date-container')
let btnToday = document.querySelector('.today')
let btnNextYear = document.querySelector('.downYear')
let closeBtn = document.querySelector('.close');
let downYearBtn = document.querySelector('.downYear');
let yearPopup = document.querySelector('.year-popup');
let listYear = document.querySelector('.list-year')
let prevYear = document.querySelector('.prev-year')
let nextYear = document.querySelector('.next-year')

let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

function displayInfo() {
    // Hiển thị tên tháng
    let currentMonthName = new Date(
        currentYear,
        currentMonth
    ).toLocaleString('en-us', { month: 'long' });
    let nameCurrentMonth = currentMonthName.slice(0,3)

    // Hiển thị tháng
    monthEle.innerText = currentMonthName;
    // Hiển thị năm
    yearEle.innerText = currentYear;
    // Hiển thị tên tháng tiếp theo
    let nextMonthName = new Date(
        currentYear,
        currentMonth + 1
    ).toLocaleString('en-us', { month: 'long' });
    dateEle.innerHTML = '';
    let nameNextMonth = nextMonthName.slice(0,3)
    
    // Hiển thị ngày trong tháng
    renderDate(nameCurrentMonth, nameNextMonth);
}
// Lấy số ngày của tháng trước đó
function getDayPrevMonth() {
    return new Date(currentYear, currentMonth, 0).getDate();
}
// Lấy số ngày của tháng hiện tại
function getDayInMonth() {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
}

// Lấy ngày bắt đầu của tháng hiện tại
function getStartDayInMonth() {
    return new Date(currentYear, currentMonth, 1).getDay();
}

// Active current day
let activeCurrentDay = (day) => {
    let day1 = new Date().toDateString()
    let day2 = new Date(currentYear, currentMonth, day).toDateString()
    return day1 == day2 ? 'active' : ''
}


// Hiển thị ngày trong tháng lên trên giao diện
function renderDate(nameCurrentMonth,nameNextMonth ) {
    let daysInMonth = getDayInMonth();
    let startDay = getStartDayInMonth();
    let DayPrevMonth = getDayPrevMonth()


    for (let i = startDay; i > 0; i--) {
        dateEle.innerHTML += `
            <div class="day opacity"><p>${DayPrevMonth - i + 1}</p></div>
        `;
    }

    for (let i = 0; i < daysInMonth; i++) {
        dateEle.innerHTML += `
            <div class="day ${activeCurrentDay(i + 1)}" style="${i == 0 ? 'padding: 2px 10px 0 0;' : ''}">
                <p style="${i === 0 ? 'width:10px; margin: 0' : ''}">${i + 1}</p>
                ${i === 0 ? nameCurrentMonth : ''}
            </div>
        `;
    }

    // Tính toán số ngày còn lại trong tuần
    let remainingDays = 7 - (startDay + daysInMonth) % 7;
    console.log(remainingDays , startDay , daysInMonth);
    // Thêm các ô div còn lại
    for (let i = 0; i < remainingDays; i++) {
        dateEle.innerHTML += `
        <div class="day opacity" style="${i == 0 ? 'padding: 2px 10px 0 0;' : ''}">
            <p style="${i === 0 ? 'width: 10px; margin: 0' : ''}">${i + 1}</p>
            ${i === 0 ? nameNextMonth : ''}
        </div>     
        `;
    }
}

// Xử lý khi ấn vào nút prev month
btnPrev.addEventListener('click', ()=> {
    if (currentMonth === 0) {
        currentYear--
        currentMonth = 11
    } else {
        currentMonth--
    }
    displayInfo()
})

btnToday.addEventListener('click', () => {
    currentMonth = new Date().getMonth()
    currentYear = new Date().getFullYear()
    displayInfo()
})

// Xử lý khi ấn vào nút next month
btnNext.addEventListener('click', ()=> {
    if(currentMonth === 11){
        currentYear++
        currentMonth = 0;
    } else {
        currentMonth++
    }
    displayInfo()
})


let totalScroll = 0;
const scrollThreshold = 100;

// Sự kiện cuộn chuột
document.addEventListener('wheel', (event) => {
    // Ngăn chặn sự kiện cuộn mặc định
    event.preventDefault();

    // Cộng dồn lượng cuộn
    totalScroll += event.deltaY;
    console.log(totalScroll);

    // Nếu lượng cuộn đạt đến ngưỡng 100, thực hiện tăng hoặc giảm số năm
    if (Math.abs(totalScroll) >= scrollThreshold) {
        if (event.deltaY > 0) {
            // Cuộn xuống, giảm số năm
            currentYear--;
        } else {
            // Cuộn lên, tăng số năm
            currentYear++;
        }

        // Đặt lại lượng cuộn
        totalScroll = 0;
        displayInfo()
    }
}, { passive: false });


// popup ===========
var year = currentYear
function getYears (yearPop) {
    listYear.innerHTML = '';

    for (let i = yearPop - 8; i < yearPop + 8; i++) {
        listYear.innerHTML += `
            <div class="item-year col-3 ${currentYear === i ? 'activPopup' : ''}">${i}</div>
        `
    }
    let listItemYear = document.querySelectorAll('.item-year')
    listItemYear.forEach(itemYear => {
        itemYear.addEventListener('click', function () {
            const iValue = parseInt(this.textContent);

            currentYear = iValue;

            yearPopup.classList.remove('activePopup');

            displayInfo()
        });
    });

}

document.addEventListener('DOMContentLoaded', function () {
    closeBtn.addEventListener('click', function () {
        yearPopup.classList.remove('activePopup');
});

document.addEventListener('click', function (event) {
    if (!yearPopup.contains(event.target) && event.target !== downYearBtn) {
        yearPopup.classList.remove('activePopup');
    }
});

downYearBtn.addEventListener('click', function () {
        yearPopup.classList.add('activePopup');
        let year = currentYear
        getYears(year)
    });
});

prevYear.addEventListener('click', () => {
    year -= 16
    getYears(year)
})


nextYear.addEventListener('click', () => {
    year += 16
    getYears(year)
})


window.onload = () => {
    displayInfo()
} 