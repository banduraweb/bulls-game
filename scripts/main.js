'use strict';



  const btnGetStarted = document.getElementById('button');
  const bg = document.getElementById('gray');
  const windowPlay = document.getElementById('modal-form');
  btnGetStarted.addEventListener('click', modalWindow);
   function modalWindow() {
     bg.style.display = 'block';
     setTimeout(function () {
       windowPlay.style.display = 'block';
     },3000)
   }


