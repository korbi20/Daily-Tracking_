/* =========================================================
   CONFIG
========================================================= */

const NOW = new Date();
const CURRENT_YEAR  = NOW.getFullYear();
const CURRENT_MONTH = NOW.getMonth();

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

    const weekdayRow =
        Math.floor(i / monthWeeks);

    const weekColumn =
        i % monthWeeks;

    const cell =
        document.createElement('div');

    const dayNumber =
        weekColumn * 7 + weekdayRow - firstDayIndex + 1;

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
    Math.round(
        (
            new Date(CURRENT_YEAR + 1, 0, 1) -
            new Date(CURRENT_YEAR, 0, 1)
        ) / (1000 * 60 * 60 * 24)
    );

const yearFirstDayIndex =
    (new Date(CURRENT_YEAR, 0, 1).getDay() + 6) % 7;

const yearWeeks =
    Math.ceil((yearFirstDayIndex + daysInYear) / 7);

yearGrid.style.setProperty(
    '--year-weeks',
    yearWeeks
);

for(let i = 0; i < yearWeeks * 7; i++){

    const weekdayRow =
        Math.floor(i / yearWeeks);

    const weekColumn =
        i % yearWeeks;

    const dayOfYear =
        weekColumn * 7 + weekdayRow - yearFirstDayIndex + 1;

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

function activateView(target){

    views.forEach(view =>
        view.classList.remove('active')
    );

    const targetView =
        document.getElementById(`${target}-view`);

    if(targetView){
        targetView.classList.add('active');
    }
}

function movePillTo(button) {
    // Verschiebung berechnen (-4 wegen des 4px Paddings vom Container)
    pill.style.transform = `translateX(${button.offsetLeft - 4}px)`;
    
    // Breite der Pille exakt an den Button anpassen
    pill.style.width = `${button.offsetWidth}px`;
}


buttons.forEach(button => {

    button.addEventListener('click', () => {

        buttons.forEach(btn =>
            btn.classList.remove('active')
        );

        button.classList.add('active');

        movePillTo(button);
        activateView(button.dataset.view);
    });
});

/* init active view + pill */
const activeButton =
    document.querySelector('.toggle button.active') || buttons[0];

if(activeButton){

    activeButton.classList.add('active');

    movePillTo(activeButton);
    activateView(activeButton.dataset.view);
}
