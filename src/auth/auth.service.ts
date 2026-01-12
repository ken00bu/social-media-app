import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthHelper } from './auth-helper/auth-helper';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private authHelper: AuthHelper 
    ) {}

    async signIn(response, signInDto: SignInDto) {
        const email = signInDto.email;
        const plainPassword = signInDto.password

        const user = await this.userService.findUserByEmail(email);
        if(!user) throw new UnauthorizedException('User not found');
        
        const isPasswordValid = await this.authHelper.comparePassword(plainPassword, user.password);
        if(!isPasswordValid) throw new UnauthorizedException('Wrong password');

        const jwt = await this.authHelper.generateAccesToken({email: user.email});
        response.cookie('auth_token', jwt, { httpOnly: true });
        return {message: 'Sign-in successful', jwt};
    }

}
