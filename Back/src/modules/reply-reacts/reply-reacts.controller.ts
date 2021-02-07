import { Controller, ValidationPipe, UseGuards, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';


import { ReplyReactsService } from './reply-reacts.service';
import { GetUser } from '../auth/get-account-data.decorator';
import { User } from '../users/user.entity';
import { ResponseCreator } from 'src/shared/utils/response-creator';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('replyReacts')
@Controller('public/replyReacts')
@UseGuards(AuthGuard())
export class ReplyReactsController {

    constructor(private readonly replyReactsService: ReplyReactsService) {}

    @Get('post/:postId/comment/:commentId/reply/:replyId')
    public async getUserReactsByReplyId(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Param('commentId', ParseIntPipe) commentId: number,
        @Param('replyId', ParseIntPipe) replyId: number,
        @Query(ValidationPipe) strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<ResponseCreator> {
        const gotData = await this.replyReactsService.getUserReactsByReplyId(user.id, postId, commentId, replyId, strictPaginationGetFilterDto);
        return new ResponseCreator("REPLYREACTS_GOT", gotData);
    }

    @Get('/react/post/:postId/comment/:commentId/reply/:replyId')
    public async reactReply(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Param('commentId', ParseIntPipe) commentId: number,
        @Param('replyId', ParseIntPipe) replyId: number): Promise<ResponseCreator> {
        const createdData = await this.replyReactsService.reactReply(user, postId, commentId, replyId);
        return new ResponseCreator("REPLYREACT_CREATED", createdData);
    }

    @Get('/react/post/:postId/comment/:commentId/reply/:replyId')
    public async unReactComment(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Param('commentId', ParseIntPipe) commentId: number,
        @Param('replyId', ParseIntPipe) replyId: number): Promise<ResponseCreator> {
        const deletedData = await this.replyReactsService.unReactReply(user.id, postId, commentId, replyId);
        return new ResponseCreator("REPLYREACT_DELETED", deletedData);
    }

    // @Get('/checkReact/:postId')
    // public async checkReact(
    //     @GetUser() user: User,
    //     @Param('postId', ParseIntPipe) postId: number): Promise<ResponseCreator> {
    //     const gotData = await this.commentReactsService.checkReact(user.id, postId);
    //     return new ResponseCreator("POSTREACT_GOT", gotData);
    // }

}