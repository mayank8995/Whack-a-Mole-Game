const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const grid = document.querySelector('.grid');
const startBtn = document.querySelector('#start');
const timer = document.querySelector('#timer');
const score = document.querySelector('#score');
//create grid
for (let i in arr) {
    const elem = document.createElement('div');
    elem.setAttribute('data-id', i);
    elem.className = 'box';
    elem.addEventListener('click', countWhack);
    elem.classList.add('disabled');
    grid.appendChild(elem);
}
const squares = [...document.querySelectorAll('.box')];
let count = 60;
let hitId = -1;
let result = 0;
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
            let num = Math.floor(Math.random() * (8 - 0 + 1) + 0);
            hitId = num;
            let square = squares.find(elem => {
                if (elem.getAttribute('data-id') == num) {
                    elem.classList.remove('disabled');
                    elem.classList.add('enable');
                    return elem;
                } else {
                    elem.classList.add('disabled');
                    elem.classList.remove('enable');
                }
            });
            imgElem.setAttribute('id', num);
            imgElem.src = 'mole.jpg';
            square.appendChild(imgElem);
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