/* =========================================================
   CONFIG
========================================================= */

const CURRENT_YEAR  = 2026;
const CURRENT_MONTH = 4; // Mai = 4

/* =========================================================
   HELPERS
========================================================= */

function randomLevel(){

    return Math.floor(Math.random() * 5);
}

/* =========================================================
   MONTH DATA
========================================================= */

const monthGrid =
    document.getElementById('month-grid');

const monthTitle =
    document.querySelector('.month-title');

const date =
    new Date(CURRENT_YEAR, CURRENT_MONTH);

const monthName =
    date.toLocaleString('de-DE', {
        month:'long'
    });

monthTitle.textContent =
    `${monthName} ${CURRENT_YEAR}`;

const daysInMonth =
    new Date(
        CURRENT_YEAR,
        CURRENT_MONTH + 1,
        0
    ).getDate();

const firstDayIndex =
    (new Date(CURRENT_YEAR, CURRENT_MONTH, 1).getDay() + 6) % 7;

const monthWeeks =
    Math.ceil((firstDayIndex + daysInMonth) / 7);

monthGrid.style.setProperty(
    '--month-weeks',
    monthWeeks
);

/* =========================================================
   MONTH GRID BUILD
========================================================= */

for(let i = 0; i < monthWeeks * 7; i++){

    const cell =
        document.createElement('div');

    const dayNumber =
        i - firstDayIndex + 1;

    const isRealDay =
        dayNumber >= 1 && dayNumber <= daysInMonth;

    if(isRealDay){

        cell.className =
            `cell l${randomLevel()}`;

        cell.dataset.day = dayNumber;
    }

    else{

        cell.className = 'cell cell-empty';
    }

    monthGrid.appendChild(cell);
}

/* =========================================================
   YEAR GRID
========================================================= */

const yearGrid =
    document.getElementById('year-grid');

const daysInYear =
    new Date(CURRENT_YEAR, 12, 0).getDate();

const yearFirstDayIndex =
    (new Date(CURRENT_YEAR, 0, 1).getDay() + 6) % 7;

const yearWeeks =
    Math.ceil((yearFirstDayIndex + daysInYear) / 7);

yearGrid.style.setProperty(
    '--year-weeks',
    yearWeeks
);

for(let i = 0; i < yearWeeks * 7; i++){

    const dayOfYear =
        i - yearFirstDayIndex + 1;

    const isRealDay =
        dayOfYear >= 1 && dayOfYear <= daysInYear;

    const cell =
        document.createElement('div');

    if(isRealDay){

        cell.className =
            `year-cell l${randomLevel()}`;

        cell.dataset.dayOfYear = dayOfYear;
    }

    else{

        cell.className = 'year-cell cell-empty';
    }

    yearGrid.appendChild(cell);
}

/* =========================================================
   TOGGLE
========================================================= */

const buttons =
    document.querySelectorAll('.toggle button');

const views =
    document.querySelectorAll('.view');

const pill =
    document.querySelector('.toggle-pill');

buttons.forEach((button, index) => {

    button.addEventListener('click', () => {

        /* ---------------- ACTIVE BTN ---------------- */

        buttons.forEach(btn =>
            btn.classList.remove('active')
        );

        button.classList.add('active');

        /* ---------------- MOVE PILL ---------------- */

        pill.style.transform =
            `translateX(${button.offsetLeft - 4}px)`;

        /* ---------------- TARGET VIEW ---------------- */

        const target =
            button.dataset.view;

        views.forEach(view =>
            view.classList.remove('active')
        );

        const targetView =
            document.getElementById(
                `${target}-view`
            );

        targetView.classList.add('active');
    });
});

/* init pill alignment */
const activeButton = document.querySelector('.toggle button.active');
if(activeButton){
    pill.style.transform = `translateX(${activeButton.offsetLeft - 4}px)`;
}
