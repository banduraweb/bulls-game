'use strict';

(() => {
  const today = new Date();
  const innersForDays = document.body.getElementsByTagName('div');
  function getDInW() {
    return {
      1: 'mon',
      2: 'tue',
      3: 'wed',
      4: 'thu',
      5: 'fri',
      6: 'sat',
      7: 'sun',
    };
  }
  for (let i = 0; i < innersForDays.length; i++) {
    if (i === today.getDate()) {
      innersForDays[i].style.cssText = 'background-color: #4bcaff;';
      innersForDays[i].innerHTML = `<span>${getDInW()[today.getDay()]}</span>`;
      document.body.getElementsByTagName('span')[0]
        .style.cssText = 'position: relative; left:-5px';
    }
  }
})();
