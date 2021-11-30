//In this Js file we have the Server side part for websockets "Chat view"

//Require ws module
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
    ws.room = "";
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
        //Here we parse the incoming message into JSON
        let msg = JSON.parse(message);
        if (msg.joinRoom) {
            ws.room = msg.joinRoom
        }
        //if the user is already in a room send the message to this room
        if (msg.room) {
            websocketSendToAll(message);
        }
    })
    ws.send(JSON.stringify({ message: 'Hello! Message From Server!!'}))
})

//this should broadcast any incoming message to all connected clients
function websocketSendToAll(text) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            //send the message only to the clients who are also in the same room
            if(client.room === JSON.parse(text).room)
            client.send(text);
        }
    });
}