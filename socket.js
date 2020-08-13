function socket(server) {
  var io = require("socket.io")(server);

  io.on("connection", function (socket) {
    var userId = null;
    var room = null;

    console.log("a user connected");

    socket.on("room enter", function (roomName, id) {
      userId = id;
      room = roomName;
      socket.join(roomName, function () {
        console.log(`a new user connected ${roomName}`);
        io.to(roomName).emit("room enter");
      });
    });

    socket.on("chat message", function (roomName, msg) {
      io.to(roomName).emit("chat message", { msg: msg, userId: userId });
    });

    // 연결종료
    socket.on("disconnect", function (data) {
      socket.leave(room);
      console.log("a user disconnected");
    });
  });
}

module.exports = socket;
