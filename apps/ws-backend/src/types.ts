import { WebSocket } from 'ws';

export interface User {
  ws: WebSocket,
  rooms: string[],
  userId: number
}

export interface parsedData {
  type: string,
  roomId: string,
  message?: string
}