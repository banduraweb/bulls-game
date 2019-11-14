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
    swal({
      title: "error!",
      text: "You have enter 4 numbers before game!",
      icon: "error",
    });
    return false;
  } else if (!isFinite(userValue)) {
    swal({
      title: "error!",
      text: "Only numbers!",
      icon: "error",
    });
    input.value = ``;
    return false;
  } else if (userValue.length !== 4) {
    swal({
      title: "error!",
      text: `Four numbers! You entered ${userValue.length}`,
      icon: "error",
    });
    return false;
  } else if (new Set(userValue).size !== 4) {
    let notUnique = [...userValue]
      .filter((item, i, arr) => arr.indexOf(item) !== arr.lastIndexOf(item))
      .join();
    swal({
      title: "error!",
      text: `Only unique numbers (this numbers are repeated${notUnique})`,
      icon: "error",
    });
    return false;
  }

  return userValue;
}

generateUniqNum(randomFour);

function randomFour() {
  return [
    Math.floor(Math.random() * (10)),
    Math.floor(Math.random() * (10)),
    Math.floor(Math.random() * (10)),
    Math.floor(Math.random() * (10)),
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
      swal({
        title: "Good job!",
        text: "You won!",
        icon: "success",
      });
      setTimeout(function () {
        window.location.reload();
      }, 3000);

    }
  }
}
