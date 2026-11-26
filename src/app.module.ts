
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        ScheduleModule.forRoot(),
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
