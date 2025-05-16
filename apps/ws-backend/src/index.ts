import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"
import { User, parsedDataType } from './types'
import { prismaClient } from "@repo/db/client"

const WS_PORT = 8080;
const MAX_MESSAGE_LENGTH = 1000;

//Initializing a new web-socket server
const wss = new WebSocketServer({ port: WS_PORT });

const users: User[] = [];

function checkUser(accessToken: string): number | null {
  const decodedToken = jwt.verify(accessToken, JWT_SECRET);

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

  ws.on('message', async function message(data) {
    const stringData = data.toString();

    if (typeof stringData !== "string") {
      return;
    }

    try {
      const parsedData: parsedDataType = JSON.parse(stringData);

      //work on join room logic. Its not full proof and there are so many bugs
      if (parsedData.type === "join_room") {
        const user = users.find(x => x.ws === ws);

        //checking if the room exists or not
        // const findRoom = users.find(user => user.rooms.find(room => room === parsedData.roomSlug));
        // const findRoom = users.some(user => user.rooms.includes(parsedData.roomSlug));
        // console.log("findroom : ", findRoom);

        const room = await prismaClient.room.findFirst({
          where: {
            slug: parsedData.roomSlug
          }
        })
        
        if (!room) {
          throw new Error("No such room exists")
        }

        //checking if the user already joined the room or not
        if (user?.rooms.includes(parsedData.roomSlug)) {
          throw new Error("You have already joined this room");
        }

        //TODO: There should be a lot of checks you can add. like if the room exits, is the person allowed to join the room, etc
        //yaha tk poch gaya mtlb room bhi exists krta h aur user ne join bhi nhi kiya
        user?.rooms.push(parsedData.roomSlug);
      }

      if (parsedData.type === "leave_room") {
        const user = users.find(x => x.ws === ws);
        if (!user) {
          return;
        }

        //checking if such a room exists or not
        const roomExists = users.some(user => user.rooms.includes(parsedData.roomSlug));
        if (!roomExists) {
          throw new Error("A room with this ID doesn't exist.");
        }

        //checking if the user requesting to leave the room has firstly joined room or not.
        if (!user.rooms.includes(parsedData.roomSlug)) {
          throw new Error("You haven't joined this room.");
        }

        //user left the room successfully
        user.rooms = user?.rooms.filter(room => room !== parsedData.roomSlug);
      }

      if (parsedData.type === "chat") {
        const roomSlug = parsedData.roomSlug;
        const message = parsedData.message;
        const sender = users.find(x => x.ws === ws);

        if (!sender) {
          throw new Error("User not found.");
        }

        if (!message) {
          throw new Error("some message is needed to send");
        }

        // Check if the room exists
        const roomExists = users.some(user => user.rooms.includes(roomSlug));
        if (!roomExists) {
          throw new Error("A room with this ID doesn't exist.");
        }

        // Check if the sender has joined the room
        if (!sender.rooms.includes(roomSlug)) {
          throw new Error("You can't send messages in this room, since you are not a member of this room");
        }

        //Ideally we use slightly async architecture. we should push it over a queue and through a pipeline push it to the database
        await prismaClient.chat.create({
          data: {
            roomId: 1,// we can't add the slug over here. we need the roomId
            userId,
            message,
          }
        })

        // Broadcast the message to all users in the room
        users.forEach(user => {
          if (user.rooms.includes(roomSlug)) {
            if (sender.ws === user.ws) {
              return; // skip sender
            }
            user.ws.send(JSON.stringify({
              type: "chat",
              message,
              roomSlug
            }));
          }
        })

      }
    } catch (error: any) {
      ws.send(error.message);
    }
  });

  ws.send('ws connected successfully');
});

// Error handling
wss.on('error', (error) => {
  console.error("WebSocket server error:", error);
});