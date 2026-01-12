import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, UserModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/social-media-db')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
