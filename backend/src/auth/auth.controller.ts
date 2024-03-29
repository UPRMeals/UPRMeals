import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LogInDto, SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('log-in')
  logIn(@Body() loginDto: LogInDto) {
    return this.authService.logIn(loginDto);
  }

  @Post('log-out')
  logOut(@Request() req) {
    return this.authService.logOut(req.user.userId);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
