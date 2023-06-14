const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/views/test.html');
});

io.on('connection', (socket) => {
    // console.log("New User Found !");
    console.log("Connected: " + socket.id);

    socket.on("disconnect", () => {
        console.log("Disconnected: " + socket.id);
    });

    socket.on("connected", (data) => {
        console.log(data);
    });

    socket.on("subscribe", ({ endpoint }) => {
        socket.join(endpoint);
        console.log("A device subscribed to: " + endpoint);
    });

    socket.on("unsubscribe", ({ endpoint }) => {
        socket.leave(endpoint);
        console.log("A device disconnected from: " + endpoint);
    });

    socket.on("update", async ({ endpoint, value }) => {
        console.log("Transaction:", endpoint, "<-", value);
        // Some actions and an emit function here
    });

    socket.on("hello", async ({ endpoint, value }) => {
        console.log("Hello World");
        // Some actions and an emit function here
    });


    socket.on("sendImage", async (data) => {
        // data.picture
        // data.hostname
        console.log("image received", data)
        io.emit("image", data)
    });
});
// io.on('connection', socket => {
//     console.log("Connected: " + socket.id);

//     socket.on("disconnect", () => {
//         console.log("Disconnected: " + socket.id);
//     });

//     socket.on("subscribe", ({ endpoint }) => {
//         socket.join(endpoint);
//         console.log("A device subscribed to: " + endpoint);
//     });

//     socket.on("unsubscribe", ({ endpoint }) => {
//         socket.leave(endpoint);
//         console.log("A device disconnected from: " + endpoint);
//     });

//     socket.on("update", async ({ endpoint, value }) => {
//         console.log("Transaction:", endpoint, "<-", value);
//         // Some actions and an emit function here
//     });
// });

server.listen(3000, () => {
    console.log('listening on *:3000');
});