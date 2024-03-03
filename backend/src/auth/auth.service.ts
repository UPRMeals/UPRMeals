import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(userData: any) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: userData.email.toLowerCase(),
      },
    });

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
    const access_token = this.jwtService.signAsync(payload);
    return { access_token };
  }

  async login(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    // const user = await this.usersService.findOne(username);
    // //needs hashing, will probably use bcrypt
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // const payload = { sub: user.userId, username: user.username };
    return {
      // access_token: await this.jwtService.signAsync(payload),
      access_token: '',
    };
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
}
