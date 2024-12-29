import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
 * @desc    Create a new user
 * @route   POST /api/users
 * @access  Private[ADMIN]
 * @returns {Object} - User object
 * @throws {Error} - If user already exists
 */
  async createUser(createUserDto: CreateUserDto): Promise<{status: string, message: string, data: Object }> {

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
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        address: newUser.address,
        age: newUser.age,
        gender: newUser.gender,
      }
    };
  }


  async getAllUsers(query: any) {
    const { 
      limit = 100,
      skip = 0,
      sort = 'asc',
      name,
      email,
      role
    } = query;

    if (Number.isNaN(Number(+limit))) {
      throw new HttpException('Invalid limit', 400);
    }

    if (Number.isNaN(Number(+skip))) {
      throw new HttpException('Invalid skip', 400);
    }

    if (!['asc', 'desc'].includes(sort)) {
      throw new HttpException('Sort must be asc or desc', 400);
    }

    if (!['ADMIN', 'USER'].includes(role)) {
      throw new HttpException('Role must be ADMIN or USER', 400);
    }

      
    const users = await this.prisma.user.findMany({
      take: +limit,
      skip: +skip,
      where: {
        name: { contains: name, mode: 'insensitive' },
        email: { contains: email, mode: 'insensitive' },
        role: role ? { equals: role } : undefined  
      },
      orderBy: {
        name: sort,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        age: true,
        phoneNumber: true,
        address: true,
        gender: true,
        isActive: true
      },
    });
   return {
    status: 200,
    message: 'Users found successfully',
    length: users.length,
    data: users,
  };

  }


  /**
   * @desc    Get a user by id
   * @route   GET /api/users/:id
   * @access  Private[ADMIN]
   * @returns {Object} - User object
   * @throws {Error} - If user not found
   */
  async getUserById(id: number): Promise<{status: string, data: Object }> {

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

    return {
      status: 'success',
      data: user
    }
  }



  /**
   * @desc    Update a user by id
   * @route   PUT /api/users/:id
   * @access  Private[ADMIN]
   * @returns {Object} - User object
   * @throws {Error} - If user not found
   */
  async updateUserById(id: number, updateUserDto: UpdateUserDto): Promise<{status: string, message: string, data: Object }> {
   
    const findUser = await this.getUserById(id);

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    const hashedPassword = bcrypt.hashSync(updateUserDto.password, 10);

    const data = {
      ...updateUserDto,
      password: hashedPassword
    };

    const updatedUser = await this.prisma.user.update({
      where: { id }, data
    });

    return {
      status: 'success',
      message: 'User updated successfully',
      data: updatedUser
    };
  }

  async deleteUserById(id: number) {
    const findUser = await this.getUserById(id);

    if (!findUser) throw new HttpException('User not found', 404);

    return this.prisma.user.delete({ where: { id } });
  }
}