const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("typing", (msg) => {
    socket.broadcast.emit("typing", `${msg} is typing`);
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", `${msg.sender} : ${msg.msg}`);
  });
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
