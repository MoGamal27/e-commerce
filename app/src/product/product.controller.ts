import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/users/decorator/Roles.decorator';
import { AuthGuard } from 'src/auth/guard/Auth.guard';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  create(@Body(new ValidationPipe({ forbidNonWhitelisted: true })) 
  createProductDto: CreateProductDto,
) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
