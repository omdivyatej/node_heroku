const WebSocket = require("ws");

const PORT =process.env.PORT || 5000;

const wsServer = new WebSocket.Server({
  port: PORT,
});
var input = 'w'
wsServer.on("connection", function (socket) {
  // Some feedback on the console
  console.log("A client just connected");

  // Attach some behavior to the incoming socket
  socket.on("message", function (msg) {
    console.log("Received message from client: " + msg);
    // socket.send("Take this back: " + msg);

    // Broadcast that message to all connected clients
    wsServer.clients.forEach(function (client) {
      client.send("Input Key: " + input);
    });
  });

  socket.on("close", function () {
    console.log("Client disconnected");
  });
});

console.log(new Date() + " Server is listening on port " + PORT);