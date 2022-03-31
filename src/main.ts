import { ConsoleLogger } from '@nestjs/common';
import { name as packageName } from 'package.json';
import { name as pm2Name } from 'pm2-process.json';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    const port = app.get(AppConfigService).port || 3000;
    await app.listen(port, () => {
        const logger = new ConsoleLogger('NestApplication');

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