import { Controller } from "@nestjs/common";
import { AdminRoleService } from "../services/adminRole.service";


@Controller('adminRole')
export class AdminRoleController {

    constructor(private readonly adminRoleService: AdminRoleService) {}
}