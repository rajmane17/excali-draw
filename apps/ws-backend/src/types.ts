import { WebSocket } from 'ws';

export interface User {
  ws: WebSocket,
  rooms: string[],
  userId: number
}

export interface parsedDataType {
  type: string,
  roomSlug: string,
  message?: string
}