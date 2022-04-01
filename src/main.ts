import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import { AppConfigService } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    const port = app.get(AppConfigService).port || 3000;
    await app.listen(port, () => {
        const logger = new ConsoleLogger('NestApplication');
        const packageName = JSON.parse(readFileSync('../package.json').toString()).name;
        const pm2Name = JSON.parse(readFileSync('../pm2-process.json').toString()).name;

        try {
            if(!packageName) throw new Error('Package name not set');
            if(!pm2Name) throw new Error('Pm2 name not set');
        } catch(err) {
            logger.error(err.message);

            throw err;
        }

        if(packageName !== pm2Name) {
            logger.warn('Package name and Pm2 name are different');
        }
        
        logger.debug(`🔥${packageName} server running at port: ${port}`);
    });
}
bootstrap();