import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config"

//Initializing a new web-socket server
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {

  const url = request.url; //gives us the url usertrying to connect
  // ws://localhost:8080?accessToken=276547
  // split => ["ws://localhost:8080", "accessToken=276547"]

  if(!url){
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const accessToken = queryParams.get("accessToken") || "";

  const decodedToken = jwt.verify(accessToken, JWT_SECRET);

  //decodedToken can be a string or a JWTPayload, so here we are just confirming that its not a string but it is a jwt payload
  if(!decodedToken || !(decodedToken as JwtPayload).userId){ 
    ws.close();
    throw new Error("Unauthorized request");
  }


  //Recevied message from that user
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});