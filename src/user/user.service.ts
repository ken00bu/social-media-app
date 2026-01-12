import { Injectable } from '@nestjs/common';
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

}
