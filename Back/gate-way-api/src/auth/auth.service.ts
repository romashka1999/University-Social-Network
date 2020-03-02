import { Injectable, BadRequestException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import { SignUpUserDto } from './dto/signUpUser.dto';
import { SignInUserDto } from './dto/signInUser.dto';

@Injectable()
export class AuthService {

    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({url: process.env.ACCOUNT_SERVICE_HOST});
    }

    public async signUpUser(signUpUserDto: SignUpUserDto): Promise<any> {
        try {
            const response = await this.axios.post('/createUser', signUpUserDto);
            return response;
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    public async signInUser(signInUserDto: SignInUserDto): Promise<any> {
        try {
            const response = await this.axios.post('/getUserByWhere', signInUserDto);
            return response;
        } catch (error) {
            return new BadRequestException(error);
        }
    }


}
