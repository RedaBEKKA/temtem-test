import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  findAll(
    filters: { category?: string; sort?: 'ASC' | 'DESC' } = {},
  ): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    if (filters.category) {
      queryBuilder.andWhere('product.category = :category', {
        category: filters.category,
      });
    }
    if (filters.sort) {
      queryBuilder.orderBy('product.price', filters.sort);
    }
    return queryBuilder.getMany();
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(id: number, product: Product): Promise<void> {
    await this.productRepository.update(id, product);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
