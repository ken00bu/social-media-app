import { Body, Controller, Post, Get, Query, Res, UseGuards, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto';
import type { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {

    constructor(private postService: PostService){}

    @Post('/create-post')
    @UseInterceptors(FilesInterceptor('files', 3))
    async createPost( 
        @UploadedFiles() files: Express.Multer.File[],
        @Body() createPostDto: CreatePostDto, 
        @Req() req: Request,
    ) {
        return await this.postService.createPost(files, createPostDto, req)
    }

}
