import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/user.schema';

export type UserDocument = mongoose.HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop(
        {
            type: {
                createdAt: Date,
                updatedAt: Date
            },
            required: true,
            default: () =>({
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }
    )
    timestamp: {
        createdAt: Date;
        updatedAt: Date;
    };

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    })
    authorId: User;

    @Prop({required: true, default: ''})
    content: string;

    @Prop({maxlength: 10, required: true, default: []})
    fileUrl: string[];

    @Prop({required: true, default: []})
    topics: string[];

    @Prop({required: true, default: []})
    likes: string[];

    @Prop({required: true, default: []})
    comments: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post)