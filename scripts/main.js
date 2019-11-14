'use strict';

const btnGetStarted = document.getElementById('button');
const bg = document.getElementById('gray');
const windowPlay = document.getElementById('modal-form');
const preloader = document.getElementById('preloader-wrapper');
const btnPlay = document.getElementById('button__play');
const tdTableOutput = document.getElementById('result-part');
const input = document.getElementById('input');
const exit = document.getElementById('exit');

exit.addEventListener('click', showAndExit);

function showAndExit() {
  exit.innerHTML = outPutComputerNumbers;
  setTimeout(function () {
    window.location.reload();
  }, 2000);
}

btnGetStarted.addEventListener('click', modalWindow);

function modalWindow() {
  bg.style.display = 'block';
  setTimeout(function () {
    windowPlay.style.display = 'block';
    preloader.style.display = 'none';
  }, 3000);
}

btnPlay.addEventListener('click', play);

function validateInputData() {
  const userValue = document.getElementById('input').value;
  if (userValue === ``) {
    alert('You have enter 4 numbers before game!');
    return false;
  } else if (!isFinite(userValue)) {
    alert('Only numbers!');
    input.value = ``;
    return false;
  } else if (userValue.length !== 4) {
    alert(`Four numbers! You entered ${userValue.length}`);
    return false;
  } else if (userValue.includes('0')) {
    alert(`only numbers from 1 to 9`);
    return false;
  } else if (new Set(userValue).size !== 4) {
    let notUnique = [...userValue]
      .filter((item, i, arr) => arr.indexOf(item) !== arr.lastIndexOf(item))
      .join();
    alert(`Only unique numbers (this numbers are repeated${notUnique})`);
    return false;
  }

  return userValue;
}

generateUniqNum(randomFour);

function randomFour() {
  return [
    Math.floor(1 + Math.random() * (9 + 1 - 1)),
    Math.floor(1 + Math.random() * (9 + 1 - 1)),
    Math.floor(1 + Math.random() * (9 + 1 - 1)),
    Math.floor(1 + Math.random() * (9 + 1 - 1))
  ];
}

function generateUniqNum(callback) {
  let result = [];
  while ([...new Set(result)].length !== 4) {
    result = callback();
  }
  return result.join('');
}

let outPutComputerNumbers = generateUniqNum(randomFour);
console.log(outPutComputerNumbers);

function play() {
  const score = {
    bulls: 0,
    cows: 0
  };
  let outPutGuessNumber = false;
  if (validateInputData()) {
    outPutGuessNumber = validateInputData();

    for (let i = 0; i < outPutComputerNumbers.length; i++) {
      if (outPutComputerNumbers[i] === outPutGuessNumber[i]) {
        score.bulls++;
      } else if (outPutComputerNumbers.includes(outPutGuessNumber[i])) {
        score.cows++;
      }
    }
    tdTableOutput.innerHTML += `<tr>
    <td style='border: 1px solid black'>
        ${outPutGuessNumber}
    </td>
    <td style='border: 1px solid black'>
        ${score.bulls}
    </td>
    <td style='border: 1px solid black'>
        ${score.cows}
    </td>
    </tr>`;
    if (score.bulls===4) {
      alert('YOU WIN!!!!!!!!');
      setTimeout(function () {
        window.location.reload();
      }, 3000);

    }
  }
}
