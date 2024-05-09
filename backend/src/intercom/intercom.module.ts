import { Module } from '@nestjs/common';
import { IntercomService } from './intercom.service';
import { IntercomController } from './intercom.controller';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [SocketModule],
  controllers: [IntercomController],
  providers: [IntercomService],
})
export class IntercomModule {}
