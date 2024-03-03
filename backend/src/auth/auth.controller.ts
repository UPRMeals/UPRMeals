import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() signUpDto: any) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('login')
  logIn(@Body() loginDto: Record<string, any>) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
