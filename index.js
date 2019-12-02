let socket = io();
let userId;

socket.on("userId", id => {
    console.log(id);
    if (userId == undefined) {
        userId = id;
        let username = prompt("Enter username: ");
        socket.emit("username", {username, userId});
    }
})

function sendmsg() {
    let msg = document.getElementById("msg");
    if (msg.value.trim() == "") return;
    socket.emit("msg", {msg: msg.value, userId});
    msg.value = "";
}

socket.on("msg", data => {
    let newP = document.createElement("p");
    newP.innerHTML = `${data.username}: ${data.msg}`;
    document.getElementById("main").append(newP);
})