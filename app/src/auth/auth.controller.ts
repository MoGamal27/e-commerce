import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';

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
}
