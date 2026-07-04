import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  providers: [AuthService, UserRepository, JwtStrategy],
  controllers: [AuthController],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register( { defaultStrategy: 'jwt' } ),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600
        }
      })
    })
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})

export class AuthModule {}

// Authentication Flow
//=====================================
// register
//
// login  ====>  jwt token
//
//
// request (jwt token)  =====> guard ===> decoding the token , attached in http request
//
//
// controller (auth guard)
//
// controller (@GetUser)     req.user
