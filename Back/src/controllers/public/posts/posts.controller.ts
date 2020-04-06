import { Controller, UseGuards, Get, Query, ValidationPipe, Post, Body, ParseIntPipe, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PostsService } from 'src/modules/posts/posts.service';
import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/response-creator';
import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { GetUserPostsFilterDto } from 'src/modules/posts/dtos/get-user-posts-filter.dto';
import { PostCreateDto } from 'src/modules/posts/dtos/post-create.dto';
import { PostUpdateDto } from 'src/modules/posts/dtos/post-update.dto';


@Controller('public/posts')
@UseGuards(AuthGuard())
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    @Get()
    public async getPostsByLoggedUserId(
        @GetUser() user: User,
        @Query(ValidationPipe) getUserPostsFilterDto: GetUserPostsFilterDto): Promise<ResponseCreator> {
        const gotData = await this.postsService.getPostsByLoggedUserId(user, getUserPostsFilterDto);
        return new ResponseCreator("POSTS_GOT", gotData);
    }

    @Post()
    public async createPost(
        @GetUser() user: User,
        @Body(ValidationPipe) postCreateDto: PostCreateDto): Promise<ResponseCreator> {
        const createdData = await this.postsService.createPost(user, postCreateDto);
        return new ResponseCreator("POST_CREATED", createdData);
    }

    @Put('/:id')
    public async updatePostByPostId(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) postId: number,
        @Body(ValidationPipe) postUpdateDto: PostUpdateDto): Promise<ResponseCreator> {
        const updatedData = await this.postsService.updatePostByPostId(user, postId, postUpdateDto);
        return new ResponseCreator("POST_UPDATED", updatedData);
    }

    @Delete('/:id')
    public async deletePostByPostId(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) postId: number): Promise<ResponseCreator> {
        const deletedData = await this.postsService.deletePostByPostId(user, postId);
        return new ResponseCreator("POST_DELETED", deletedData);
    }

    @Get('/user/:otherUserId')
    public async getPostsByOtherUserId(
        @GetUser() user: User,
        @Param('otherUserId', ParseIntPipe) otherUserId: number,
        @Query(ValidationPipe) getUserPostsFilterDto: GetUserPostsFilterDto): Promise<ResponseCreator> {
        const gotData = await this.postsService.getPostsByOtherUserId(user, otherUserId, getUserPostsFilterDto);
        return new ResponseCreator("POSTS_GOT", gotData);
    }

}
