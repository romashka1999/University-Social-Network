import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';


import { AdminRolesService } from './admin-roles.service';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('adminRoles')
@Controller('backOffice/adminRoles')
@UseGuards(AuthGuard())
export class AdminRolesController {

    constructor(private readonly adminRolesService: AdminRolesService) {}

    
}
