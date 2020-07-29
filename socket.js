function socket(server) {
  var io = require("socket.io")(server);

  io.on("connection", function (socket) {
    console.log("a user connected");

    socket.on("room enter", function (roomName, id) {
      socket.join(roomName, function () {
        console.log(`a new user connected ${roomName}`);
        io.to(roomName).emit("room enter");
      });
    });

    socket.on("chat message", function (msg) {
      io.emit("chat message", msg);
    });

    // 연결종료
    socket.on("disconnect", function (data) {
      console.log("a user disconnected");
    });
  });
}

module.exports = socket;
