const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const grid = document.querySelector('.grid');
const startBtn = document.querySelector('#start');
const timer = document.querySelector('#timer');
const score = document.querySelector('#score');
//create grid
for (let i in arr) {
    const elem = document.createElement('div');
    elem.setAttribute('data-id', i);
    elem.setAttribute('id', 'm-' + i);
    elem.className = 'box';
    elem.addEventListener('click', countWhack);
    elem.classList.add('disabled');
    grid.appendChild(elem);
}
const squares = [...document.querySelectorAll('.box')];
let count = 30;
let hitId = -1;
let result = 0;
let num = -1;
score.innerHTML = result;
timer.innerHTML = count + ' sec';
const imgElem = document.createElement('img');
imgElem.style.height = '100px';
imgElem.style.width = '100px';
//start timer
function startTimer() {
    moveMole();
    let timerId = setInterval(() => {
        if (count === 0) {
            clearInterval(timerId);
            document.querySelector('img').classList.add('disabled');
            document.querySelector('#m-' + num).classList.add('disabled');
            document.querySelector('#m-' + num).classList.remove('enable');
        } else {
            --count;
            timer.innerHTML = count;
        }
    }, 1000);
}
//Move the mole randomly every one seconds
function moveMole() {
    let timerId = setInterval(() => {
        if (count === 0) {
            clearInterval(timerId);
        } else {
            num = Math.floor(Math.random() * (8 - 0 + 1) + 0);
            hitId = num;
            let square = squares.filter(elem => {
                if (elem.getAttribute('data-id') == num) {
                    // console.log(elem.getAttribute('data-id'), "   ", num);
                    elem.classList.remove('disabled');
                    elem.classList.add('enable');
                    return elem;
                } else {
                    elem.classList.add('disabled');
                    elem.classList.remove('enable');
                }
            });
            // console.log(square);
            imgElem.setAttribute('id', num);
            imgElem.src = 'mole.jpg';
            square[0].appendChild(imgElem);
        }
    }, 500);
}
function countWhack() {
    let val = document.querySelector('.box img').getAttribute('id');
    console.log(val, "   ", hitId);
    if (hitId == val) {
        ++result;
        score.innerHTML = result;
        console.log("result>>>>", result);
    }
}
//Adding events
startBtn.addEventListener('click', startTimer);