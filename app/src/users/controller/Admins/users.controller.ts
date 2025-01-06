import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseGuards, Query} from '@nestjs/common';
import { UsersService } from '../../services/Admins/users.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { AuthGuard } from '../../../auth/guard/Auth.guard';
import { Roles } from '../../decorator/Roles.decorator';

@Controller('users')
@UsePipes(new ValidationPipe({
  forbidNonWhitelisted: true
}))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  getAllUsers(@Query() query: any) {
    return this.usersService.getAllUsers(query);
  }

  @Get(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @Patch(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  updateUserById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserById(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(+id);
  }
}
