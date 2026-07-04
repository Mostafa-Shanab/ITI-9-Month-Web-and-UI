import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from '../repositories/user.repository';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../models/jwt-payload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: '$$$$$MySecret$$$$$$',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;

    const user = await this.userRepository.findUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}