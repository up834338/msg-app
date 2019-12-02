'use-strict';

require('env2')('.env');
const express = require('express')
const app = express()
const http = require("http").createServer(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const port = process.env.SERVER_PORT;
const dir = process.env.SERVER_DIR;

let msgList = [];
let users = [];
let userId = 0;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.on('connection', function (socket) {
  io.emit("userId", userId)
  userId += 1;
  console.log('a user connected');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on("username", data => {
    console.log(data);
    users[data.userId] = data.username
  })

  socket.on("msg", data => {
    console.log(data);
    msgList.push(data.msg);
    io.emit("msg", {msg: data.msg, username: users[data.userId]});
  });
});

app.use('/', express.static(dir))

app.get('/home', (req, res) => {
  res.sendFile(dir, 'index.js')
})

http.listen(port, () => console.log(`listening on port ${port}!`));