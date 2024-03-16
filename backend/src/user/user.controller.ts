import { Controller, Get, Request } from '@nestjs/common';
import { UserProfile } from './user.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req): Promise<UserProfile> {
    const user = await this.userService.getProfile(req.user.userId);

    return user;
  }
}
