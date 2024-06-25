import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { Roles } from 'src/auth/roles.decorator';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Roles('owner')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Roles('owner')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Put(':id')
  update(@Param('id') id: any, @Body() product: Product) {
    return this.productsService.update(id, product);
  }

  @Roles('owner')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: any): Promise<void> {
    return this.productsService.remove(id);
  }
}
