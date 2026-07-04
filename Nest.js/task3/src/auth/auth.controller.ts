import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login-dto';
import { LoginVM } from './vms/login-vm';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: HttpStatus.CREATED })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @ApiResponse({ status: HttpStatus.OK, type: LoginVM })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: String })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginDto: LoginDto): Promise<LoginVM> {
    const loginResponse = await this.authService.signIn(loginDto);

    if (!loginResponse) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    return loginResponse;
  }
}
