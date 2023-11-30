let cards;
const memoryWrap = document.querySelector('.memoryWrap');
const btnNav = document.querySelectorAll('.game__nav');
let arr = [];
function createArr(n) {
    for (let i = 0; n > i; i++) {
        if (i <= 9) {
            arr.push(`980${i}`);
            arr.push(`980${i}`);
        } else {
            arr.push(`98${i}`);
            arr.push(`98${i}`);
        }
    }
    arr.sort(() => (Math.random() > 0.5 ? 2 : -1));
}
function createCard(arr) {
    arr.forEach((item) => {
        let wrap = document.createElement('div');
        wrap.classList.add('wrap');
        wrap.innerHTML = `
            <div class="card" data-id="${item}">
                <div class="front"></div>
                <div class="back">&#${item};</div>
            </div>
    `;
        memoryWrap.appendChild(wrap);
    });
    cards = document.querySelectorAll('.card');
    openCard(cards);
}
function reset() {
    if (arr.length > 0) {
        arr = [];
        let wrap = document.querySelectorAll('.wrap');
        wrap.forEach((e) => e.remove());
    }
}
btnNav.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (e.target.innerText === 'Easy') {
            if (arr.length === 0 || arr.length > 16) {
                reset()
                memoryWrap.style.setProperty('--columns', 4);
                memoryWrap.style.setProperty('--rows', 4);
                createArr(8);
                createCard(arr);
            }
        } else if (e.target.innerText === 'Normal') {
            if (arr.length === 0 || arr.length === 16 || arr.length === 24) {
                reset();
                memoryWrap.style.setProperty('--columns', 5);
                memoryWrap.style.setProperty('--rows', 4);
                createArr(10);
                createCard(arr);
            }
        } else if (e.target.innerText === 'Hard') {
            if (arr.length === 0 || arr.length < 24) {
                reset();
                memoryWrap.style.setProperty('--columns', 6);
                memoryWrap.style.setProperty('--rows', 4);
                createArr(12);
                createCard(arr);
            }
        } else if (e.target.innerText === 'Reset') {
            let count = arr.length;
            reset();
            createArr(count / 2);
            createCard(arr);
        }
    });
});

let idArr = [];
function openCard(cards) {
    cards.forEach((card) => {
        card.addEventListener('click', (e) => {
            let card = e.target.parentElement;
            card.firstElementChild.classList.add('frontAdd');
            card.lastElementChild.classList.add('backAdd');
            let id = card.dataset.id;
            idArr.push(id);
            card.classList.add('no-click');
            if (idArr.length === 2) {
                if (idArr[0] === idArr[1]) {
                    // noCard.forEach((c) => {
                    //     c.classList.add('no-click');
                    // });
                    idArr = [];
                } else if (idArr[0] !== idArr[1]) {
                    memoryWrap.classList.add('no-click');
                    let noCard = document.querySelectorAll(
                        `[data-id='${idArr[0]}']`
                    );
                    card.classList.remove('no-click');
                    noCard.forEach((c) => {
                        c.classList.remove('no-click');
                    });
                    setTimeout(() => {
                        noCard.forEach((c) => {
                            c.firstElementChild.classList.remove('frontAdd');
                            c.lastElementChild.classList.remove('backAdd');
                        });
                        card.firstElementChild.classList.remove('frontAdd');
                        card.lastElementChild.classList.remove('backAdd');
                        memoryWrap.classList.remove('no-click');
                        idArr = [];
                    }, 1000);
                }
            }
        });
    });
}
