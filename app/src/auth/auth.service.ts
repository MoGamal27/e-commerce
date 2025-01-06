import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto, SendVerificationCodeDto, ResetPasswordDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service'; 

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private emailService: EmailService
    ) {}
    
   
     async signUp(signUpDto: SignUpDto) {
        const existUser = await this.prisma.user.findUnique({
            where: {
                email: signUpDto.email
            }
        });

        if(existUser){
            throw new HttpException('User already exists', 400);
        }

       const hashedPassword = bcrypt.hashSync(signUpDto.password, 10);
       
           const data = {
             ...signUpDto,
             password: hashedPassword
           };
       
           const newUser = await this.prisma.user.create({ data });

           const payload = { id: newUser.id, role: newUser.role };

           const token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
          });

          return {
            status: 'success',
            message: 'Sign up successfully',
            data: {
              user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
              },
              access_token: token
            }
          }

        }

     async signIn(signInDto: SignInDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: signInDto.email
            }
        });

        if(!user){
          throw new NotFoundException('User not found');
        }

        const isMatch = await bcrypt.compare(signInDto.password, user.password);

        if(!isMatch){
          throw new HttpException('Invalid Password', 401);
        } 

       const payload = { id: user.id, role: user.role };
       
       const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      });

      return {
        status: 'success',
        message: 'Sign in successfully',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          access_token: token
        }
      }
     }

     
      // Generate a 6-digit verification code
  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

     async sendVerificationCode(dto: SendVerificationCodeDto) {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
  
      // If the user exists, generate and send a verification code
      if (user) {
        const verificationCode = this.generateVerificationCode();
  
        // Save the verification code in the user's record
        await this.prisma.user.update({
          where: { id: user.id },
          data: { verificationCode },
        });
  
        // Send the code via email
        const emailSubject = 'Password Reset Verification Code';
        const emailText = `Your verification code is: ${verificationCode}`;
        await this.emailService.sendEmail(user.email, emailSubject, emailText);
      }
  
      // same response for all cases
      // improve security to avoid Email Enumeration attack
      return { message: 'if email exist, a verification code will be sent to your email' };
    }
  
    // Reset password using verification code
    async resetPassword(dto: ResetPasswordDto) {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
  
      // If the user doesn't exist or the code is invalid, return success (but do nothing)
      // this is improve security to avoid Email Enumeration attack
      if (!user || user.verificationCode !== dto.verificationCode) {
        return;
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
  
      // Update the user's password and clear the verification code
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          verificationCode: null, 
        },
      });  

      return { message: 'Updated Password Successfully' };
    }
    }



