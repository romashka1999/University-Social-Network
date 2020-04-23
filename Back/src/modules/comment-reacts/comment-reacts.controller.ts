import { Controller, ValidationPipe, UseGuards, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';

import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/utils/response-creator';
import { CommentReactsService } from './comment-reacts.service';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('commentReacts')
@Controller('public/commentReacts')
@UseGuards(AuthGuard())
export class CommentReactsController {

    constructor(private readonly commentReactsService: CommentReactsService) {}

    @Get('post/:postId/comment/:commentId')
    public async getUserReactsByCommentId(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Param('commentId', ParseIntPipe) commentId: number,
        @Query(ValidationPipe) strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<ResponseCreator> {
        const gotData = await this.commentReactsService.getUserReactsByCommentId(user.id, postId, commentId, strictPaginationGetFilterDto);
        return new ResponseCreator("COMMENTREACTS_GOT", gotData);
    }

    @Get('/react/post/:postId/comment/:commentId')
    public async reactComment(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Param('commentId', ParseIntPipe) commentId: number): Promise<ResponseCreator> {
        const createdData = await this.commentReactsService.reactComment(user, postId, commentId);
        return new ResponseCreator("COMMENTREACT_CREATED", createdData);
    }

    @Get('/unreact/post/:postId/comment/:commentId')
    public async unReactComment(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Param('commentId', ParseIntPipe) commentId: number): Promise<ResponseCreator> {
        const deletedData = await this.commentReactsService.unReactComment(user.id, postId, commentId);
        return new ResponseCreator("COMMENTREACT_DELETED", deletedData);
    }

    // @Get('/checkReact/:postId')
    // public async checkReact(
    //     @GetUser() user: User,
    //     @Param('postId', ParseIntPipe) postId: number): Promise<ResponseCreator> {
    //     const gotData = await this.commentReactsService.checkReact(user.id, postId);
    //     return new ResponseCreator("POSTREACT_GOT", gotData);
    // }

}