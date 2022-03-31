import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    const port = app.get(AppConfigService).port || 3000;
    await app.listen(port, () => console.log(`🔥Server running at port: ${port}`));
}
bootstrap();