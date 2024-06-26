import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';

import { Product } from './product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ProductService } from './products.service';
import { Role } from 'src/auth/role.enum';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Get()
  findAll(
    @Query('category') category: string,
    @Query('sort') sort: 'ASC' | 'DESC',
  ): Promise<Product[]> {
    return this.productService.findAll({ category, sort });
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.StoreOwner)
  update(@Param('id') id: number, @Body() product: Product): Promise<void> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.StoreOwner)
  remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }
}
