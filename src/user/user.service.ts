import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findUserByEmail(email: string) {
        const user = await this.userModel.findOne({email}).exec();
        return user;
    }

    async findUserByUsername(username: string){
        const user = await this.userModel.findOne({username}).exec();
        return user;
    }

    async getUserCertainFields(email: string, fields: string[]){
        const projection = fields.reduce((acc, field) => {
            acc[field] = 1;
            return acc;
        }, {});
        const user = await this.userModel.findOne({email}, projection).exec();
        return user;
    }

    async createUser(userData: Partial<User>) {
        
        try {
            const newUser = new this.userModel(userData);
            return await newUser.save();
        } catch (error) {
            throw new BadRequestException('Failed to create user');
        }
    }

}
