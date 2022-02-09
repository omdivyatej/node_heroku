const WebSocket = require("ws");

const PORT =process.env.PORT || 5000;
var connections=[]
const wsServer = new WebSocket.Server({
  port: PORT,
});

wsServer.on("connection", function (ws) {
  
  console.log("A client just connected");    
   
  ws.on("message", function (msg) {    
    
    console.log("Received message from client: " + msg);    
    const obj = JSON.parse(msg)
    
    connections[obj.username] = ws
    wsServer.clients.forEach(function (client) {      
         
    //connections[obj.username].send("Hello from server: " +obj.username)
    });
    connections[obj.username].send("Hello from server: " +obj.username)
    //connections[obj.username].send("Hello from server")
  });

  ws.on("close", function () {
    console.log("Client disconnected");
  });
});

 console.log(new Date() + " Server is listening on port " + PORT);
// var con={
//   Name: "Eric",
//   Age : 23,
//   Job: "Freelancer",
//   Skills : "JavaScript"
// }
// con["username"]="eric"
// console.log(con)

