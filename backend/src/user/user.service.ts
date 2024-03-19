import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UserProfile } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  private async getUserById(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
        removed: false,
      },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email.toLowerCase(),
        removed: false,
      },
    });

    return user;
  }

  async logInUser(userId: number) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: { isActive: true, lastLogin: new Date() },
    });
  }

  async getProfile(userId: number): Promise<UserProfile> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      isStaff: user.isStaff,
      isAdmin: user.isAdmin,
    };
  }

  async removeUser(userId: number): Promise<{ success: boolean }> {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { isActive: false, removed: true },
    });

    return {
      success: user.removed,
    };
  }
}
