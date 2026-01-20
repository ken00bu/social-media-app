import { IsNotEmpty, IsString, ArrayMaxSize, isString } from "class-validator";

export class CreatePostDto {

    @IsString()
    content: string

    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    topics: string[];

}