/* eslint-disable no-unused-vars */
import style from '../css/style.css';
/* eslint-enable no-unused-vars */
// TODO: skriv ut meddelande
// TODO: kunna välja ett användarnamn
// TODO: tar emot meddelande från webbsocket
// TODO: konverterar från json till javascript
// TODO: en enklare dokumentation
// TODO: ett chatt user interface
const connection = new WebSocket('ws://104.248.143.87:1337');

connection.onmessage = message => {
  const textEl = document.getElementById('logger');
  const obj = JSON.parse(message.data);
  if (obj.type === 'heartbeat') {
    textEl.textcontent += `${obj.data}, `;
  }
  console.log(obj.data.text);
  const chattmessage = document.getElementById('chattmessage');
  const div = document.getElementById('send');
  const chattmessage = document.importNode(chattmessageDiv, true);
  const clone = document.importNode(chattmesage.content, true);
  clone.textcontent = obj.data.text;
  const paste = document.getElementById('paste');
  paste.appendChild(clone);
};

connection.onclose = () => {
  console.log('uppkoppling nedstängd...');
};

const chatt = document.getElementById('chatt');
chatt.addEventListener('click', () => {
  const obj = {
    type: 'textinput.value',
    data: 'chatt meddelande som ska skickas',
    key: 'password'
  };
  const jsonObj = JSON.stringify(obj);
  connection.send(jsonObj);
});
const textinput = document.getElementById('inputtext');
console.log(textinput.value);
