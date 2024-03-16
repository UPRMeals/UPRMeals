import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(userData: any) {
    const existingUser = await this.userService.getUserByEmail(userData.email);

    if (existingUser) {
      return { access_token: '', error: 'User already exists.' };
    }

    const password = await this.hashPassword(userData.password);
    const user = await this.prismaService.user.create({
      data: {
        username: userData.email.toLowerCase(),
        email: userData.email.toLowerCase(),
        password: password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isAdmin: false,
        isStaff: false,
        isActive: true,
        createdAt: new Date(),
        lastLogin: new Date(),
      },
    });
    if (!user) {
      throw new UnauthorizedException('User creation failed.');
    }

    const payload = {
      userId: user.id,
      username: user.username,
      sub: user.id.toString(),
    };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async logIn(
    userData: any,
  ): Promise<{ access_token: string; error?: string }> {
    const user = await this.userService.getUserByEmail(userData.email);

    if (!user) {
      return {
        access_token: '',
        error: 'Email or password is incorrect.',
      };
    }

    const passwordMatch = await this.comparePasswords(
      userData.password,
      user.password,
    );
    if (!passwordMatch) {
      return { access_token: '', error: 'Email or password is incorrect.' };
    }

    await this.userService.logInUser(user.id);

    const payload = {
      userId: user.id,
      sub: user.id.toString(),
      username: user.username,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async logOut(userId: number) {
    try {
      await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          isActive: false,
        },
      });
    } catch (error) {
      throw new BadRequestException('There was an error logging out.');
    }
  }
}
