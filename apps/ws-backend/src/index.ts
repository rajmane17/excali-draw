import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
// import {JWT_SECRET} from "@repo/backend-common/config"
import { User, parsedData } from './types'

//Initializing a new web-socket server
const wss = new WebSocketServer({ port: 8080 });

const users: User[] = [];

function checkUser(accessToken: string): number | null {
  const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET!);

  //decodedToken can be a string or a JWTPayload, so here we are just confirming that its not a string but it is a jwt payload
  if (!decodedToken || !(decodedToken as JwtPayload).userId) {
    throw new Error("Invalid Token");
  }

  return (decodedToken as JwtPayload).userId;
}

wss.on('connection', function connection(ws, request) {

  const url = request.url; //gives us the url usertrying to connect
  // ws://localhost:8080?accessToken=276547
  // split => ["ws://localhost:8080", "accessToken=276547"]

  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  // It tries to retrieve the value of the accessToken query parameter, 
  // and if that value is null (i.e., the parameter doesn't exist), it returns an empty string ("") instead.
  const accessToken = queryParams.get("accessToken") || "";
  const userId = checkUser(accessToken);

  if (!userId) {
    ws.close();
    throw new Error("Unauthorized request");
  }

  users.push({
    userId,
    ws,
    rooms: []
  })

  //Recevied message from that user
  ws.on('message', function message(data) {
    if (typeof data !== "string") {
      return;
    }

    const parsedData: parsedData = JSON.parse(data);

    if (parsedData.type === "join_room") {
      const user = users.find(x => x.ws === ws);

      //checking if the room exists or not
      // const findRoom = users.find(user => user.rooms.find(room => room === parsedData.roomId));
      const findRoom = users.some(user => user.rooms.includes(parsedData.roomId));

      //checking if the user already joined the room or not
      if(user?.rooms.includes(parsedData.roomId)){
        throw new Error("You have already joined this room")
      }

      if (!findRoom) {
        throw new Error("A room with this id doesn't exists.")
      }

      //TODO: There should be a lot of checks you can add. like if the room exits, is the person allowed to join the room, etc
      //user joined the room successfully
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find(x => x.ws === ws);
      if (!user) {
        return;
      }

      //checking if such a room exists or not
      const roomExists = users.some(user => user.rooms.includes(parsedData.roomId));
      if (!roomExists) {
        throw new Error("A room with this ID doesn't exist.");
      }

      //checking if the user requesting to leave the room has firstly joined room or not.
      if (!user.rooms.includes(parsedData.roomId)) {
        throw new Error("You haven't joined this room.");
      }

      //user left the room successfully
      user.rooms = user?.rooms.filter(room => room !== parsedData.roomId);
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;
      const user = users.find(x => x.ws === ws);

      if (!user) {
        throw new Error("User not found.");
      }

      // Check if the room exists
      const roomExists = users.some(user => user.rooms.includes(roomId));
      if (!roomExists) {
        throw new Error("A room with this ID doesn't exist.");
      }

      // Check if the sender has joined the room
      if (!user.rooms.includes(roomId)) {
        throw new Error("You haven't joined this room.");
      }

      // Broadcast the message to all users in the room
      users.forEach(user => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({
            type: "chat",
            message,
            roomId
          }));
        }
      })

  }});

  ws.send('something');
});