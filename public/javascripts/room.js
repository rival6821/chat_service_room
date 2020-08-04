var socket = io.connect("http://localhost:3000");

var pathArr = location.pathname.split("/");
var roomName = pathArr[pathArr.length - 1];

function guid() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

var id = guid();

socket.emit("room enter", roomName, id);

socket.on("room enter", function () {
  console.log("room enter");
});

socket.on("disconnect", function () {
  console.log("disconnect");
});

socket.on("chat message", function (data) {
  console.log(data);
  var li = document.createElement("LI");
  var msg = data.msg;
  if (id === data.userId) {
    msg = "나 : " + msg;
    li.classList.add("me");
  }
  li.textContent = msg;
  document.getElementById("boxList").appendChild(li);
});

function chatMessage() {
  var $textInput = document.getElementById("textInput");
  socket.emit("chat message", roomName, $textInput.value);
  $textInput.value = "";
}
