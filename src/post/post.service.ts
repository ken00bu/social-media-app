import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { S3Client } from '@aws-sdk/client-s3';
import { PutObjectAclCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

@Injectable()
export class PostService {

    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        @Inject('R2_CLIENT') private r2: S3Client
    ){}

    async createPost(files, createPostDto, req) {
        const content = createPostDto.content
        const authorId = req.credentials.id
        const topics = createPostDto.topics
        let fileUrls = createPostDto.fileUrls || []

        for (let file of files){
            try {
                const key = 'post/' + randomUUID()
                let response = await this.r2.send(new PutObjectCommand({
                    Bucket: "",
                    Key: key,
                    Body: file.buffer
                }))    
                fileUrls.push(key)
            } catch (error) {
                console.log(error)
                throw new BadRequestException('failed uploading your file')
            }
        }

        try {
            const newPost = new this.postModel({
                authorId,
                content,
                fileUrls,
                topics,
            })
            return await newPost.save()
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    async updatePost(){
        
    }
}

