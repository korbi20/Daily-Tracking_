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

/* =========================================================
   MONTH GRID BUILD
========================================================= */

for(let i = 1; i <= 42; i++){

    const cell =
        document.createElement('div');

    const level =
        randomLevel();

    cell.className =
        `cell l${level}`;

    /* ---------------- REAL DAYS ---------------- */

    if(i <= daysInMonth){

        cell.dataset.day = i;
    }

    /* ---------------- FADED DAYS ---------------- */

    else{

        cell.style.opacity = '.18';
        cell.style.filter  = 'saturate(.2)';
    }

    monthGrid.appendChild(cell);
}

/* =========================================================
   YEAR GRID
========================================================= */

const yearGrid =
    document.getElementById('year-grid');

for(let i = 0; i < 371; i++){

    const cell =
        document.createElement('div');

    cell.className =
        `year-cell l${randomLevel()}`;

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
            `translateX(${index * 90}px)`;

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