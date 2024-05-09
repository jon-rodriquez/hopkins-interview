import { Injectable } from '@nestjs/common';
import { SocketGateway } from 'src/socket/socket.gateway';
import { MessageDto } from './message.dto';

@Injectable()
export class IntercomService {
  constructor(private socketGateway: SocketGateway) {}

  sendMessage(body: MessageDto) {
    this.socketGateway.sendToClient(body.to, 'message', {
      message: body.message,
      from: body.from,
    });
    return body;
  }
}
