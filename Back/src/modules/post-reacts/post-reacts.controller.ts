import { Controller, ValidationPipe, UseGuards, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';

import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/utils/response-creator';
import { PostReactsService } from './post-reacts.service';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('postReacts')
@Controller('public/postReacts')
@UseGuards(AuthGuard())
export class PostReactsController {

    constructor(private readonly postReactsService: PostReactsService) {}

    @Get('/:postId')
    public async getUserReactsByPostId(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number,
        @Query(ValidationPipe) strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<ResponseCreator> {
        const gotData = await this.postReactsService.getUserReactsByPostId(user.id, postId, strictPaginationGetFilterDto);
        return new ResponseCreator("POSTREACTS_GOT", gotData);
    }

    @Get('/react/:postId')
    public async reactPost(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number): Promise<ResponseCreator> {
        const createdData = await this.postReactsService.reactPost(user, postId);
        return new ResponseCreator("POSTREACT_CREATED", createdData);
    }

    @Get('/unreact/:postId')
    public async unReactPost(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number): Promise<ResponseCreator> {
        const deletedData = await this.postReactsService.unReactPost(user.id, postId);
        return new ResponseCreator("POSTREACT_DELETED", deletedData);
    }

    @Get('/checkReact/:postId')
    public async checkReact(
        @GetUser() user: User,
        @Param('postId', ParseIntPipe) postId: number): Promise<ResponseCreator> {
        const gotData = await this.postReactsService.checkReact(user.id, postId);
        return new ResponseCreator("POSTREACT_GOT", gotData);
    }

}