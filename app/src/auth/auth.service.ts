import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
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

           const payload = { id: newUser.id };

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
     }



