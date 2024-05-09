import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decoractors';
import { IntercomService } from './intercom.service';
import { MessageDto } from './message.dto';

@Controller('intercom')
export class IntercomController {
  constructor(private intercomService: IntercomService) {}

  @Post('/send')
  @Roles(Role.Admin, Role.BaseUser)
  sendMessage(@Body(new ValidationPipe()) body: MessageDto) {
    return this.intercomService.sendMessage(body);
  }
}
