import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginate } from 'src/utils/pagination.util';
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


 /**
  * @desc  Get all users
  * @param query {
  *   limit: number,
  *   skip: number,
  *   sort: 'asc' | 'desc',
  *   name: string,
  *   email: string,
  *   role: 'ADMIN' | 'USER'
  * }
  * @returns {Object} - User object
  * @throws {Error} - If user not found
  * @access  Private[ADMIN]
  * @route   GET /api/users
  */
   getAllUsers(query: any) {
    
    return paginate(this.prisma, 'user', query, ['name', 'email'],{
      role: (value) => ({ equals: value }),
    });
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