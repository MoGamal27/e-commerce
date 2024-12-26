import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser (data: Prisma.UserCreateInput) {

   return this.prisma.user.create({ data })
   
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  getUserById(id: number) {

    const user = this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if(!user) {
      throw new HttpException('User not found', 404)
  }

    return user;
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {

    const findUser = await this.getUserById(id);

    if(!findUser) {
      throw new HttpException('User not found', 404)
    }

    return this.prisma.user.update({
      where: { id }, data
    })

  }

  async deleteUserById(id: number) {

    const findUser = await this.getUserById(id);

    if (!findUser) throw new HttpException('User not found', 404);

    return this.prisma.user.delete({ where: { id } });
  }
}
