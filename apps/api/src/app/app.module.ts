import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module'; // Import your custom modules
import configuration from './configuration';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot('mongodb+srv://user1:ahYJwftSP0CuMK7r@cluster0.vksow.mongodb.net/myDatabase?retryWrites=true&w=majority'),
    AuthModule, // Register your AuthModule
    UserModule, // Register your UserModule
  ],
  controllers: [], // Controllers would be imported inside their respective modules
  providers: [], // Any services that are not already in other modules
})
export class AppModule {}
