import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AdminRepository } from '../repositories/admin.repository';

@Injectable()
export class AdminService {

    constructor(@InjectRepository(AdminRepository) private readonly adminRepository: AdminRepository) {}

    
}
