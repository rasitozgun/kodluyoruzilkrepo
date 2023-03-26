var myNodeList = document.getElementsByTagName('LI');

// Create a "close" button and append it to each list item
for (var i = 0; i < myNodeList.length; i++) {
  var span = document.createElement('SPAN');
  var txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  myNodeList[i].appendChild(span);
}

// Click on a close button to hide the current list item

var close = document.getElementsByClassName('close');
for (var i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = 'none';
  };
}

// Add a "checked" symbol when clicking on a list item

var list = document.querySelector('ul');
list.addEventListener(
  'click',
  function (ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  },
  false,
);

// Create a new list item when clicking on the "Add" button

function newElement() {
  var li = document.createElement('li');
  var inputValue = document.getElementById('task').value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    $('.toast.error').toast('show', { delay: 1500 });
  } else {
    document.getElementById('list').appendChild(li);
    $('.toast.success').toast('show', { delay: 1500 });
  }
  document.getElementById('task').value = '';

  var span = document.createElement('SPAN');
  var txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = 'none';
    };
  }
}

// Path: js\index.js
