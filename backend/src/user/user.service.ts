import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUserById(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email.toLowerCase(),
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
}
