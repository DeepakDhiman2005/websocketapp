import http from "http";
import express from "express";
import path from "path";
// import { Server } from "socket.io";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);

dotenv.config();
const port = process.env.PORT || 8000;

app.use(express.static(path.resolve("./public")));

// Socket.io
// const io = new Server(server);
// io.on("connection", (socket)=>{
//     // console.log("userconnected!", socket.id);
//     socket.on("client_message", (message)=>{
//         io.emit("server_message", message);
//     })
// })

// Web Socket Server -> wss
const wss = new WebSocketServer({ server });
  
wss.on("connection", (ws)=>{
    // console.log("connect to client!");

    ws.on("message", (response)=>{
        // ws.send(`${response}`);
        wss.clients.forEach((client)=>{
            client.send(`${response}`);
        })
    });
});

app.get("/", (req, res)=>{
    res.sendFile("./public/index.html");
});

server.listen(port, ()=>console.log("Server Running..."));