import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class singleUserService {
  constructor(private prisma: PrismaService) {}

  async getSingleUser(id: number): Promise<{status: number, message: string, data: Object}> {

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        age: true,
        phoneNumber: true,
        address: true,
        gender: true,
      }
    });
      
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      status: 200,
      message: 'User found',
      data: user,
    };
  }


async updateSingleUser(id: number, updateUserDto: UpdateUserDto): Promise<{status: number, message: string, data: Object }> {
   
    const user = await this.prisma.user.findUnique({
        where: {
          id
        },
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          address: true,
          age: true,
          gender: true,
        }
      });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const data = {
      ...updateUserDto
    };

    const updatedUser = await this.prisma.user.update({
      where: { id }, data
    });

    return {
      status: 200,
      message: 'User updated successfully',
      data: updatedUser
    };
  }


  async deleteSingleUserById(id: number) {
      const user = await this.prisma.user.findUnique({
          where: {
              id,
          }
      });

      if (!user) throw new NotFoundException('User not found');

      await this.prisma.user.update({
          where: { id },
          data: { 
              isActive: false 
          }
      });
  }

}

