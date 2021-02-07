import { Controller, ValidationPipe, UseGuards, Get, Query, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';


import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/utils/response-creator';
import { CommentsService } from './comments.service';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';
import { CommentCreateDto } from './dto/comment-create.dto';
import { CommentUpdateDto } from './dto/comment-update.dto';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('comments')
@Controller('public/comments')
@UseGuards(AuthGuard())
export class CommentsController {

    constructor(private readonly commentsService: CommentsService) {}


    @Get('/post/:postId')
    public async getPostComments(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Query(ValidationPipe) strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<ResponseCreator> {
        const updatedData = await this.commentsService.getPostComments(user.id, postId, strictPaginationGetFilterDto);
        return new ResponseCreator("COMMENTS_GOT", updatedData);
    }

    @Post('/post/:postId')
    public async writeComment(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Body(ValidationPipe) commentCreateDto: CommentCreateDto): Promise<ResponseCreator> {
        const createdData = await this.commentsService.writeComment(user, postId, commentCreateDto);
        return new ResponseCreator("COMMENT_CREATED", createdData);
    }

    @Put('/:commentId')
    public async updateComment(
        @GetUser() user: User,
        @Param('commentId', ParseIntPipe) commentId: number,
        @Body(ValidationPipe) commentUpdateDto: CommentUpdateDto): Promise<ResponseCreator> {
        const updatedData = await this.commentsService.updateComment(user.id, commentId, commentUpdateDto);
        return new ResponseCreator("COMMENT_UPDATED", updatedData);
    }

    @Delete('post/:postId/comment/:commentId')
    public async deleteComment(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Param('commentId', ParseIntPipe) commentId: number): Promise<ResponseCreator> {
        const deletedData = await this.commentsService.deleteComment(user.id, postId, commentId);
        return new ResponseCreator("COMMENT_DELETED", deletedData);
    }

}