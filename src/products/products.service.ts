import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InputCreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    private readonly logger = new Logger(ProductsService.name);
    constructor(private prismaService: PrismaService) { }

    async createProduct(input: InputCreateProductDto) {

        try {
            await this.prismaService.product.create({
                data: {
                    name: input.name,
                    price: input.price,
                    quantity: input.quantity,
                    description: input.description,
                    image: input.image
                }
            });

        } catch (error) {
            this.logger.error('Error create product', error);
            throw new InternalServerErrorException('An error occurred');
        }
    }

    async getProducts(page: number = 1, pageSize: number = 10) {
        try {
            const products = await this.prismaService.product.findMany({
                skip: (page - 1) * pageSize,
                take: pageSize,
            });
            const total = await this.prismaService.product.count();
            return {
                data: products,
                total,
                page,
                pageSize,
            };
        } catch (error) {
            this.logger.error('Error fetching products', error);
            throw new InternalServerErrorException('An error occurred');
        }
    }
}
