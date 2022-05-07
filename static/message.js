const socket2 = io();

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");


let PERSON_NAME = null;
async function getUser() {
    await fetch('/getUserFromBackEnd').then(d=> d.json()).then(data=> {
        PERSON_NAME = data.currentUser;
    }).catch(e=>new Error(e));
}
getUser();

async function userNav() {
    await getUser().then(d=>{
        if(PERSON_NAME == null) {
            window.location = "/";
        }
    });
}
userNav();

// Icons made by Freepik from www.flaticon.com
const PERSON_IMG = "https://icons-for-free.com/download-icon-person-1324760545186718018_512.png";
const BOT_NAME = "BOT";
msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  
  const msgText = msgerInput.value;
  if (!msgText) return;
  let obj =  {appendMessage}
  socket2.emit('sendMessage',PERSON_NAME, PERSON_IMG, "right", msgText);
  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

});
socket2.on('receiveMessage',(PERSON_NAME, PERSON_IMG, dir, msgText)=>{
    
    appendMessage(PERSON_NAME, PERSON_IMG, "left", msgText);
});
function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  const r = random(0, BOT_MSGS.length - 1);
  const msgText = BOT_MSGS[r];
  const delay = msgText.split(" ").length * 100;

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
