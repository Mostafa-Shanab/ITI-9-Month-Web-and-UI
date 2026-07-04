import { Body, Controller, HttpCode, HttpStatus, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login-dto';
import { LoginVM } from './vms/login-vm';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @ApiResponse({ status: HttpStatus.CREATED })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto)
  }

  @ApiResponse({ status: HttpStatus.OK, type: LoginVM })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: String })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginDto: LoginDto): Promise<LoginVM> {
    const loginResponse = await this.authService.signIn(loginDto);

    if(!loginResponse) {
      throw new UnauthorizedException('Login Credentials Invalid') //! 401
    }

    return loginResponse;
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@Req() req: Request) {
    console.log(req)
    // if you want to get user from the request
    // const user = req.user;
  }
}