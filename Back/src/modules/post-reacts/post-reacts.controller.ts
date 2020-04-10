import { Controller, ValidationPipe, UseGuards, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/response-creator';
import { PaginationGetFilterDto } from 'src/shared/pagination-get-filter.dto';
import { PostReactsService } from './post-reacts.service';


@Controller('public/postReacts')
@UseGuards(AuthGuard())
export class PostReactsController {

    constructor(private readonly postReactsService: PostReactsService) {}

    @Get('/:postId')
    public async getUserReactsByPostId(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Query(ValidationPipe) paginationGetFilterDto: PaginationGetFilterDto): Promise<ResponseCreator> {
        const gotData = await this.postReactsService.getUserReactsByPostId(user.id, postId, paginationGetFilterDto);
        return new ResponseCreator("POSTREACTS_GOT", gotData);
    }

    @Get('/react/:postId')
    public async reactPost(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number): Promise<ResponseCreator> {
        const updatedData = await this.postReactsService.reactPost(user.id, postId);
        return new ResponseCreator("POSTREACTS_GOT", updatedData);
    }

    @Get('/unreact/:postId')
    public async unReactPost(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number): Promise<ResponseCreator> {
        const updatedData = await this.postReactsService.unReactPost(user.id, postId);
        return new ResponseCreator("POSTREACTS_GOT", updatedData);
    }

}