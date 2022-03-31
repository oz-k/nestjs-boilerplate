import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { path as rootPath } from 'app-root-path';
import { join } from 'path';
import { AppConfigService } from './app-config.service';

const CONFIG_PROVIDERS = [
    {name: 'app', provider: AppConfigService},
] as const;

@Module({})
export class ConfigModule {
    static register(...configNames: typeof CONFIG_PROVIDERS[number]['name'][]): DynamicModule {
        const envFilePath = join(rootPath, 'environments', `${process.env.NODE_ENV ??= 'dev'}.env`);
        const providers: Provider<any>[] = configNames.map(name => CONFIG_PROVIDERS.find(provider => provider.name === name).provider);

        return {
            module: ConfigModule,
            imports: [NestConfigModule.forRoot({envFilePath})],
            providers,
            exports: providers,
        };
    }
}