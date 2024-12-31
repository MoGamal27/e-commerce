import { Controller, Get, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseGuards} from '@nestjs/common';
import { singleUserService } from '../../services/User/singleUser.service';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { AuthGuard } from '../../guard/Auth.guard';

@Controller('singleUser')
@UsePipes(new ValidationPipe({
  forbidNonWhitelisted: true
}))
export class singleUserController {
  constructor(private readonly singleUserService: singleUserService) {}

  @Get(':id')
  getSingleUser(@Param('id') id: number) {
    return this.singleUserService.getSingleUser(id);
  }

  @Patch(':id')
  updateSingleUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.singleUserService.updateSingleUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteSingleUserById(@Param('id') id: number) {
    return this.singleUserService.deleteSingleUserById(id);
  }

}
