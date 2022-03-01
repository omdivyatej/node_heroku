// const WebSocket = require("ws");

// const PORT =process.env.PORT || 5000;
// var connections=[]
// const wsServer = new WebSocket.Server({
//   port: PORT,
// });

// wsServer.on("connection", function (ws) {
  
//   console.log("A client just connected");    
   
//   ws.on("message", function (msg) {    
    
//     console.log("Received message from client: " + msg);    
//     const obj = JSON.parse(msg)
    
//     connections[obj.username] = ws
//     // wsServer.clients.forEach(function (client) {      
         
//     // //connections[obj.username].send("Hello from server: " +obj.username)
//     // });
//     connections[obj.username].send("Hello from server: " +obj.username)
//     //connections[obj.username].send("Hello from server")
//   });

//   ws.on("close", function () {
//     console.log("Client disconnected");
//   });
// });

//  console.log(new Date() + " Server is listening on port " + PORT);
// var con={
//   Name: "Eric",
//   Age : 23,
//   Job: "Freelancer",
//   Skills : "JavaScript"
// }
// con["username"]="eric"
// console.log(con)

const WebSocket = require("ws");
const PORT =process.env.PORT || 5000;

const wsServer = new WebSocket.Server({
  port: PORT,
});
const clients = [];

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
  };

wsServer.on("connection", function (ws) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection ');
  const connection_CLient = ws;
  clients[userID] = connection_CLient;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
  clients[userID].send("Hello from Server. Mr. Client "+userID);   
  connection_CLient.on("message", function(message){
    var messagedata = JSON.parse(message);
    var username = messagedata.username;
    var mess = messagedata.mess;
    console.log(username);
    console.log(mess);
    try{
      clients[username].send(mess);
    }catch(er){
      console.log(er)
    }
//     clients[username].send(mess);
    })
    connection_CLient.on("close",function(){
       console.log("A Client just got disconnected :" + userID);
     })
});
 console.log(new Date() + " Server is listening on port " + PORT);
