/* eslint-disable no-unused-vars */
import password from './config';
import style from '../css/style.css';
/* eslint-enable no-unused-vars */
// TODO: ett chatt user interface
// skicka meddelande med enter
// varje användare ska få en egen färg
// se vilken tid meddelandet skickas

const connection = new WebSocket('ws://104.248.143.87:1337');

connection.onmessage = message => {
  const textEl = document.getElementById('logger');
  const obj = JSON.parse(message.data);
  console.log(obj.data.time);

  if (obj.type === 'history') {
    const history = obj.data;

    history.forEach(element => {
      console.log(element.text);
      printmsg(element.text, element.author, element.time);
    });
  }

  if (obj.type === 'color') {
    const input = document.getElementById('inputtext');
    input.setAttribute('placeholder', 'chattmessage');
  }

  printmsg(obj.data.text, obj.data.author, obj.data.time);
};

function printmsg(printer, author, time) {
  const chattmessageDiv = document.getElementById('chattmessage');
  const div = document.getElementById('send');
  const chattmessage = document.importNode(chattmessageDiv, true);
  const clone = document.importNode(chattmessage.content, true);
  clone.textContent = ` ${new Date(time)} ${author} ${printer}`;
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
