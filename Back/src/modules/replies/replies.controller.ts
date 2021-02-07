import { Controller, ValidationPipe, UseGuards, Get, Query, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';



import { RepliesService } from './replies.service';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';
import { GetUser } from '../auth/get-account-data.decorator';
import { User } from '../users/user.entity';
import { ResponseCreator } from 'src/shared/utils/response-creator';
import { ReplyCreateDto } from './dto/reply-create.dto';
import { ReplyUpdateDto } from './dto/reply-update.dto';


@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('replies')
@Controller('public/replies')
@UseGuards(AuthGuard())
export class RepliesController {

    constructor(private readonly repliesService: RepliesService) {}


    @Get('post/:postId/comment/:commentId')
    public async getCommentReplies(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Param('commentId', ParseIntPipe) commentId: number,
        @Query(ValidationPipe) strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<ResponseCreator> {
        const gotData = await this.repliesService.getCommentReplies(user.id, postId, commentId, strictPaginationGetFilterDto);
        return new ResponseCreator("REPLIES_GOT", gotData);
    }

    @Post('post/:postId/comment/:commentId')
    public async writeReply(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Param('commentId', ParseIntPipe) commentId: number,
        @Body(ValidationPipe) replyCreateDto: ReplyCreateDto): Promise<ResponseCreator> {
        const createdData = await this.repliesService.writeReply(user, postId, commentId, replyCreateDto);
        return new ResponseCreator("REPLY_CREATED", createdData);
    }

    @Put('/:replyId')
    public async updateReply(
        @GetUser() user: User,
        @Param('replyId', ParseIntPipe) replyId: number,
        @Body(ValidationPipe) replyUpdateDto: ReplyUpdateDto): Promise<ResponseCreator> {
        const updatedData = await this.repliesService.updateReply(user.id, replyId, replyUpdateDto);
        return new ResponseCreator("REPLY_UPDATED", updatedData);
    }

    @Delete('/comment/:commentId/reply/:replyId')
    public async deleteComment(
        @GetUser() user: User,
        @Param('commentId', ParseIntPipe) commentId: number,
        @Param('replyId', ParseIntPipe) replyId: number): Promise<ResponseCreator> {
        const deletedData = await this.repliesService.deleteReply(user.id, commentId, replyId);
        return new ResponseCreator("COMMENT_DELETED", deletedData);
    }

}