import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    get mode() {
        return this.configService.get<'dev' | 'prod'>('NODE_ENV');
    }

    get port() {
        return this.configService.get<number>('PORT');
    }
}