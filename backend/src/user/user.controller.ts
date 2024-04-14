import { Controller, Get, Post, Request } from '@nestjs/common';
import { StaffOnly } from 'src/auth/decorators/isStaff.decorator';
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

  @Post('remove')
  async removeUser(@Request() req): Promise<{ success: boolean }> {
    const response = await this.userService.removeUser(req.user.userId);

    return response;
  }

  @StaffOnly()
  @Get('customerProfiles')
  async getCustomerProfiles(): Promise<UserProfile[]> {
    const customerProfiles = await this.userService.getCustomerProfiles();

    return customerProfiles;
  }
}
