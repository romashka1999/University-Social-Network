import { ClientOpts, RedisClient, createClient } from "redis";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RedisStoreClientService {

    private client: RedisClient;
    constructor() {
        const host: string = 'localhost';
        const port: number = 6379;
        const options: ClientOpts = { host, port };
        const URL = 'redis://h:pd9c554bc20aeab2a8aa8f8bf2f3b9d5c4c41eec79cd4d1102f2f219f9a5ea25b@ec2-34-240-22-157.eu-west-1.compute.amazonaws.com:25949';
        this.client = createClient(options);
        console.log("redis client created");

        this.client.on("error", (err) => {
            console.log("Redis Error " + JSON.stringify(err));
        });
    }

    public async get(key: string): Promise<any> {
        this.client.HMGET(key, (err, reply) => {
            console.log(reply);
        });
    }

    public async set(key: string, value: any): Promise<boolean> {
        const setResult: boolean = await this.client.HMSET(key, value);
        return setResult;
    }

    public async delete(key: string): Promise<boolean> {
        const deleteResult: boolean = await this.client.DEL(key);
        return deleteResult;
    }

    public async expire(key: string, time: number): Promise<boolean> {
        const setExpirationResult: boolean = await this.client.EXPIRE(key, time);
        return setExpirationResult;
    }

}
