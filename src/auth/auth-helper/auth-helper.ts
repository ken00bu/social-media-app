import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthHelper {

    constructor(private jwtService: JwtService){}

    async generateAccesToken(payload: Record<string, any>): Promise<string | undefined> {
        try {
            const token = await this.jwtService.signAsync(payload);
            return token;
        } catch (error) {
            return undefined;
        }
    }

    async verifyAccessToken(token: string): Promise< Record<string, any> | false> {
        try {
            const payload = await this.jwtService.verifyAsync(token);
            return payload;
        } catch (error) {
            return false;
        }
    }

    async hashPassword(plainPassword: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        try {
            return await bcrypt.hash(plainPassword, salt);
        } catch (error) {
            throw new BadRequestException('Failed to hash password');
        }
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            throw new BadRequestException('Failed to compare password');
        }
    }
}
