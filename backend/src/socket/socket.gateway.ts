import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;

  handleConnection() {
    console.log('Client connected');
  }

  @SubscribeMessage('LoggedIn')
  handleLoggedIn(client: Socket, data: any) {
    client.join(data.email);
  }

  sendToClient(email: string, event: string, data: any) {
    this.server.to(email).emit(event, data);
  }

  sendToAll(event: string, data: any) {
    this.server.emit(event, data);
  }
}
