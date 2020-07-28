function socket(server) {
  var io = require("socket.io")(server);

  io.on("connection", function (socket) {
    console.log(location);
    console.log("a user connected");
    socket.on("chat message", function (msg) {
      io.emit("chat message", msg);
    });
    socket.on("disconnect", function () {
      console.log("user disconnected");
    });
  });
}

module.exports = socket;
