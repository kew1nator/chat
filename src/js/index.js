/* eslint-disable no-unused-vars */
import password from './config';
import style from '../css/style.css';
/* eslint-enable no-unused-vars */
// TODO: kunna välja ett användarnamn
// TODO: tar emot meddelande från webbsocket
// TODO: konverterar från json till javascript
// TODO: en enklare dokumentation
// TODO: ett chatt user interface
const connection = new WebSocket('ws://104.248.143.87:1337');

connection.onmessage = message => {
  const textEl = document.getElementById('logger');
  const obj = JSON.parse(message.data);
  console.log(obj);
  console.log(obj.type);

  if (obj.type === 'heartbeat') {
    textEl.textcontent += `${obj.data}, `;
  }
  console.log(obj.data.text);
  const chattmessageDiv = document.getElementById('chattmessage');
  const div = document.getElementById('send');
  const chattmessage = document.importNode(chattmessageDiv, true);
  const clone = document.importNode(chattmessage.content, true);
  clone.textContent = obj.data.text;
  const paste = document.getElementById('paste');
  paste.appendChild(clone);
};

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
  console.log(jsonOBj);
  connection.send(jsonOBj);
});
