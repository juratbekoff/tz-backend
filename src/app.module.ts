import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

// modules
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PrismaModule.forRoot(),
    UserModule,
  ],
})
export class AppModule {}
