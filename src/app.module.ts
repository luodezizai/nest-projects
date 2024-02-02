import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule} from '@nestjs/typeorm';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.staging' }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('DB_HOSTNAME') || process.env.DB_HOSTNAME,
      port: 3306,
      username: configService.get<string>('DB_USERNAME') || process.env.DB_USERNAME,
      password:configService.get<string>('DB_PASSWORD') || process.env.DB_PASSWORD,
      database: configService.get<string>('DB_NAME') || process.env.DB_NAME,
      autoLoadEntities: true,
    }),
    inject: [ConfigService],
  }),TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
