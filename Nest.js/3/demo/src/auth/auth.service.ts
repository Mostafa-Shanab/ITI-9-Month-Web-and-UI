import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';
import { LoginDto } from './dtos/login-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginVM } from './vms/login-vm';
import { JwtPayload } from './models/jwt-payload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(loginDto: LoginDto): Promise<LoginVM | null> {
    const { username, password } = loginDto;

    const user = await this.userRepository.findUserByUsername(username);

    if(!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return null;
    }

    //! Generate JWT token
    const payload: JwtPayload = {
      username: user.username,
      email: user.email
    }

    const accessToken = await this.jwtService.sign(payload);

    return { accessToken }; //! you can return => Object.assign(new LoginVM(), { accessToken });
  }

  getDBHost() : string | undefined {
    return this.configService.get<string>("DB_HOST");
  }
}