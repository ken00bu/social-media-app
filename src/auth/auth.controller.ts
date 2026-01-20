import { Body, Controller, Post, Get, Query, Res, UseGuards } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { AuthService } from './auth.service';
import { AuthHelper } from './auth-helper/auth-helper';
import { AuthGuard } from './guard/auth.guard';

import type { Response } from 'express';

    @Controller('auth')
    export class AuthController {

    constructor(private authService: AuthService, private authHelper: AuthHelper) {}

    @Post('/sign-in')
    async signIn(@Res({passthrough: true}) response: Response, @Body() signInDto: SignInDto){
        return await this.authService.signIn(response, signInDto);
    }

    @Post('/sign-up')
    async signUp(@Res({passthrough: true}) response: Response, @Body() signUpDto: SignUpDto){
        return await this.authService.signUp(response, signUpDto);
    }

    @Get('/check-email-available')
    async checkEmailAvailable(@Query('email') email: string) {
        return await this.authService.checkEmailAvailable(email);
    }

    @Get('/check-username-available')
    async checkUsernameAvailable(@Query('username') username: string) {
        return await this.authService.checkUsernameAvailable(username);
    }

    @Post('/logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('access_token');
        return {message: 'Logged out successfully'};
    }


    //debuging only
    @Get('/generate-password')
    async generatePassword(@Query('password') password: string){
        return await this.authHelper.hashPassword(password);
    }

}
