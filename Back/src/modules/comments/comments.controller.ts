import { Controller, ValidationPipe, UseGuards, Get, Query, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';


import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/response-creator';
import { CommentsService } from './comments.service';
import { StrictPaginationGetFilterDto } from 'src/shared/strict-pagination-get-filter.dto';
import { CommentCreateDto } from './dto/comment-create.dto';

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
        const createdData = await this.commentsService.writeComment(user.id, postId, commentCreateDto);
        return new ResponseCreator("COMMENT_CREATED", createdData);
    }

}