import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, SendVerificationCodeDto, ResetPasswordDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body(new ValidationPipe({forbidNonWhitelisted: true }))
  signUpDto: SignUpDto
) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body(new ValidationPipe({forbidNonWhitelisted: true }))  
  signInDto: SignInDto
) {
    return this.authService.signIn(signInDto);
  }

  @Post('send-verification-code')
  async sendVerificationCode(@Body() dto: SendVerificationCodeDto) {
    return this.authService.sendVerificationCode(dto);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(dto);
  }
}
