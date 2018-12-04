/* eslint-disable no-unused-vars */
import password from './config';
import style from '../css/style.css';
/* eslint-enable no-unused-vars */
// skicka meddelande med enter
// varje användare ska få en egen färg

const connection = new WebSocket('ws://104.248.143.87:1337');

connection.onmessage = message => {
  const textEl = document.getElementById('logger');
  const obj = JSON.parse(message.data);
  console.log(obj.data.time);

  if (obj.type === 'history') {
    const history = obj.data;

    history.forEach(element => {
      console.log(element.text);
      printmsg(element.text, element.author, element.time, element.color);
    });
  }

  if (obj.type === 'color') {
    const input = document.getElementById('inputtext');
    input.setAttribute('placeholder', 'chattmessage');
  }

  printmsg(obj.data.text, obj.data.author, obj.data.time, obj.data.color);
};

function printmsg(printer, author, time, color) {
  const chattmessageDiv = document.getElementById('chattmessage');
  const div = document.getElementById('send');
  const chattmessage = document.importNode(chattmessageDiv, true);
  const clone = document.importNode(chattmessage.content.firstElementChild, true);

  const jad = new Date(time).toString();
  clone.textContent = ` ${jad.substr(0, 23)} ${author} ${printer}`;
  clone.style = `color: ${color}`;
  const paste = document.getElementById('paste');
  paste.appendChild(clone);
}
connection.onclose = () => {
  console.log('uppkoppling nedstängd...');
};

const chatt = document.getElementById('chatt');
chatt.addEventListener('click', () => {
  const textinput = document.getElementById('inputtext');
  const obj = {
    type: 'message',
    data: textinput.value,
    key: password
  };
  const jsonOBj = JSON.stringify(obj);
  connection.send(jsonOBj);
});
