let userName = prompt('İsim: ');

document.getElementById('myName').innerHTML = userName;

window.onload = function () {
  showTime();
};

const days = [
  'Pazar',
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
];

function showTime() {
  let date = new Date();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
  let day = date.getDay('tr-TR'); // 0 - 6

  document.getElementById('myClock').innerHTML =
    h + ':' + m + ':' + s + ' ' + days[day];
}

setInterval(showTime, 1000);
