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
      isFlagged: user.isFlagged,
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

  async getCustomerProfiles(): Promise<UserProfile[]> {
    const customers = await this.prismaService.user.findMany({
      where: { isStaff: false, removed: false },
    });

    const userProfiles = customers.flatMap((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        isActive: user.isActive,
        isStaff: user.isStaff,
        isAdmin: user.isAdmin,
        isFlagged: user.isFlagged,
      };
    });

    return userProfiles;
  }

  async getEmployeeProfiles(): Promise<UserProfile[]> {
    const employees = await this.prismaService.user.findMany({
      where: { isStaff: true },
    });

    const userProfiles = employees.flatMap((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        isActive: user.isActive,
        isStaff: user.isStaff,
        isAdmin: user.isAdmin,
        isFlagged: user.isFlagged,
      };
    });

    return userProfiles;
  }

  async createEmployee(userId: number): Promise<UserProfile> {
    const employeeProfile = await this.prismaService.user.update({
      where: { id: userId, removed: false },
      data: { isStaff: true },
    });

    return employeeProfile;
  }

  async removeEmployee(userId: number): Promise<UserProfile> {
    const userProfile = await this.prismaService.user.update({
      where: { id: userId, removed: false },
      data: { isStaff: false },
    });

    return userProfile;
  }
}
