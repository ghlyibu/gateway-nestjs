import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
/**
  @nestjs/config 默认会从项目根目录载入并解析一个 .env 文件，从 .env 文件和 process.env 合并环境变量键值对，
  并将结果存储到一个可以通过 ConfigService 访问的私有结构。
 */
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
