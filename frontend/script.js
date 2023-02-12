let socket = io();

let form = document.getElementById("form");
let input = document.getElementById("input");
let messages = document.getElementById("messages");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", function (msg) {
  let item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user connected", function () {
  let item = document.createElement("span");
  item.textContent = "Someone Connected";
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user disconnected", function () {
  let item = document.createElement("span");
  item.textContent = "Someone Disconnected";
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
