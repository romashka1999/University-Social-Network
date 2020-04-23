import { Controller, ValidationPipe, UseGuards, Get, Query, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';



import { RepliesService } from './replies.service';


@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('replies')
@Controller('public/replies')
@UseGuards(AuthGuard())
export class RepliesController {

    constructor(private readonly repliesService: RepliesService) {}


    // @Get('/post/:postId')
    // public async getPostComments(
    //     @GetUser() user: User,
    //     @Param('postId', ParseIntPipe) postId: number,
    //     @Query(ValidationPipe) strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<ResponseCreator> {
    //     const updatedData = await this.commentsService.getPostComments(user.id, postId, strictPaginationGetFilterDto);
    //     return new ResponseCreator("COMMENTS_GOT", updatedData);
    // }

    // @Post('/post/:postId')
    // public async writeComment(
    //     @GetUser() user: User,
    //     @Param('postId', ParseIntPipe) postId: number,
    //     @Body(ValidationPipe) commentCreateDto: CommentCreateDto): Promise<ResponseCreator> {
    //     const createdData = await this.commentsService.writeComment(user, postId, commentCreateDto);
    //     return new ResponseCreator("COMMENT_CREATED", createdData);
    // }

    // @Put('/:commentId')
    // public async updateComment(
    //     @GetUser() user: User,
    //     @Param('commentId', ParseIntPipe) commentId: number,
    //     @Body(ValidationPipe) commentUpdateDto: CommentUpdateDto): Promise<ResponseCreator> {
    //     const updatedData = await this.commentsService.updateComment(user.id, commentId, commentUpdateDto);
    //     return new ResponseCreator("COMMENT_UPDATED", updatedData);
    // }

    // @Delete('post/:postId/comment/:commentId')
    // public async deleteComment(
    //     @GetUser() user: User,
    //     @Param('postId', ParseIntPipe) postId: number,
    //     @Param('commentId', ParseIntPipe) commentId: number): Promise<ResponseCreator> {
    //     const deletedData = await this.commentsService.deleteComment(user.id, postId, commentId);
    //     return new ResponseCreator("COMMENT_DELETED", deletedData);
    // }

}