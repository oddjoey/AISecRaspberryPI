const dgram = require("dgram");
const { WebSocketServer } = require("ws");

const UDP_PORT = 5005;
const UDP_HOST = "0.0.0.0";

const server = dgram.createSocket("udp4");
const wss = new WebSocketServer({ port: 8080 });

server.on("message", (data, rinfo) => {
    //console.log(`Received UDP message: ${data}`);

    // Broadcast UDP data to all WebSocket clients
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
});

server.on("listening", () => {
    console.log(`✅ UDP Server listening on ${UDP_HOST}:${UDP_PORT}`);
});

server.bind(UDP_PORT, UDP_HOST);

console.log("✅ WebSocket server running on ws://localhost:8080");
