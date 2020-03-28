import { Controller } from "@nestjs/common";
import { AdminPermissionService } from "../services/adminPermission.service";


@Controller('adminPermission')
export class AdminPermissionController {

    constructor(private readonly adminPermissionService: AdminPermissionService) {}
}