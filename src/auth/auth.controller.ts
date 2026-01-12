import { Body, Controller, Post, Get, Query, Res } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { AuthHelper } from './auth-helper/auth-helper';
import type { Response } from 'express';

    @Controller('auth')
    export class AuthController {

    constructor(private authService: AuthService, private authHelper: AuthHelper) {}

    @Post('/sign-in')
    async signIn(@Res({passthrough: true}) response: Response, @Body() signInDto: SignInDto){
        return await this.authService.signIn(response, signInDto);
    }

    @Get('/generate-password')
    async generatePassword(@Query('password') password: string){
        return await this.authHelper.hashPassword(password);
    }

}
