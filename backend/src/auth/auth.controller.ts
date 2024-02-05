import { Controller, Post, Body } from '@nestjs/common';

//we need security here with jwt bc these are not meant to be public

@Controller('auth')
export class AuthController {
  @Post('/login')
  async login(@Body() dto): Promise<any> {
    console.log('dto', dto);
    return { result: 'first endpoint response' };
  }
}
