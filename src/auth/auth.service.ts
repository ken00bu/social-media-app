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

        const jwt = await this.authHelper.generateAccesToken({
            id: user._id,
            email: user.email,
            role: 'user',
        });
        response.cookie('access_token', jwt, { httpOnly: true });
        return {message: 'Sign-in successful'};
    }

    async signUp(response, signUpDto) {
        
        const email = signUpDto.email;

        // allow only verified users, block completed accounts to prevent overwrite
        const user = await this.userService.findUserByEmail(email);
        if(!user?.isVerified || user?.isFinishSignUp) throw new UnauthorizedException('please verify your account or sign in instead');
        
        const username = signUpDto.username;
        const nickname = signUpDto.nickname;
        const plainPassword = signUpDto.password;
        const birthdate = signUpDto.birthdate;
        
        const hashedPassword = await this.authHelper.hashPassword(plainPassword);
        const newUserData = {
            email,
            username,
            nickname,
            password: hashedPassword,
            birthdate,
            isFinishSignUp: true,
        }

        const newUser = await this.userService.createUser(newUserData);

        const jwt = await this.authHelper.generateAccesToken({email: newUser.email});
        response.cookie('access_token', jwt, { httpOnly: true });
        return {message: 'Sign-up successful'};

    }

    async checkEmailAvailable(email: string) {
        if(!email) return {available: false, message: 'No email provided'};
        const user = await this.userService.findUserByEmail(email);
        return {available: !user};
    }

    async checkUsernameAvailable(username: string){
        if(!username) return {available: false, message: 'No username provided'};
        const user = await this.userService.findUserByUsername(username);
        return {available: !user};
    }

    async validateUser(request, response): Promise<boolean> {
        const cookies = request.cookies;
        const token = cookies?.access_token;
        if(!token) return false;

        const user = await this.authHelper.verifyAccessToken(token);
        if (!user) return false;

        request.credentials = {
            id: user.id,
            email: user.email,
            role: user.role,
        }

        return true;
    }

}
