const net = require('net');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// Create TCP server
const tcpServer = net.createServer((socket) => {
  console.log('New TCP client connected');

  let buffer = Buffer.alloc(0);

  socket.on('data', (data) => {
    buffer = Buffer.concat([buffer, data]);

    while (buffer.length >= 4) {
      // Read 4 bytes for frame size
      const frameSize = buffer.readUInt32BE(0);

      if (buffer.length >= frameSize + 4) {
        const frameData = buffer.slice(4, 4 + frameSize);

        // Absolute path to /secureguard/public/
        const outputDir = path.join(__dirname, '..', '..', 'public');
        const framePath = path.join(outputDir, 'current_frame.jpg');

        // Ensure the folder exists
        fs.mkdirSync(outputDir, { recursive: true });

        // Save the frame
        fs.writeFile(framePath, frameData, (err) => {
        if (err) {
            console.error('Failed to save frame:', err);
        } else {
            console.log('Frame saved to', framePath);
            broadcastNewFrame?.(); // optional if using WebSocket
        }
        });
        fs.writeFile(framePath, frameData, (err) => {
          if (err) {
            console.error('Failed to save frame:', err);
          } else {
            // After saving, notify all WebSocket clients
            broadcastNewFrame();
          }
        });

        buffer = buffer.slice(4 + frameSize);
      } else {
        break;
      }
    }
  });

  socket.on('close', () => {
    console.log('TCP client disconnected');
  });

  socket.on('error', (err) => {
    console.error('TCP Socket error:', err);
  });
});

// Start TCP server
const TCP_PORT = 5005;
tcpServer.listen(TCP_PORT, () => {
  console.log(`TCP server listening on port ${TCP_PORT}`);
});

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });
console.log(`WebSocket server listening on port 8080`);

function broadcastNewFrame() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('new_frame');
    }
  });
}
