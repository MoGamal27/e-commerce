import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email
      }
    });

    if (existUser) {
      throw new HttpException('User already exists', 400);
    }

    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    const data = {
      ...createUserDto,
      password: hashedPassword
    };

    const newUser = await this.prisma.user.create({ data });
    return {
      status: 'success',
      message: 'User created successfully',
      data: {
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        address: newUser.address,
        age: newUser.age,
        gender: newUser.gender,
      }
    };
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    const findUser = await this.getUserById(id);

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    return this.prisma.user.update({
      where: { id }, data
    });
  }

  async deleteUserById(id: number) {
    const findUser = await this.getUserById(id);

    if (!findUser) throw new HttpException('User not found', 404);

    return this.prisma.user.delete({ where: { id } });
  }
}