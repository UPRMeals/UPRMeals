import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { StaffOnly } from '../auth/decorators/isStaff.decorator';
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

  @Get('profile/:userId')
  async getProfileById(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserProfile> {
    const user = await this.userService.getProfile(userId);

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

  @StaffOnly()
  @Get('employeeProfiles')
  async getEmployeeProfiles(): Promise<UserProfile[]> {
    const employeeProfiles = await this.userService.getEmployeeProfiles();

    return employeeProfiles;
  }

  @StaffOnly()
  @Post('employee/:userId/set')
  async setEmployee(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserProfile> {
    const employeeProfile = await this.userService.setEmployee(userId);

    return employeeProfile;
  }

  @StaffOnly()
  @Post('employee/:userId/remove')
  async removeEmployee(
    @Request() req,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserProfile> {
    if (req.user.userId === Number(userId)) {
      throw new Error();
    }

    const userProfile = await this.userService.removeEmployee(userId);

    return userProfile;
  }

  @StaffOnly()
  @Post('customer/:userId/flag')
  async flagUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserProfile> {
    const userProfile = await this.userService.flagUser(userId);

    return userProfile;
  }
}
