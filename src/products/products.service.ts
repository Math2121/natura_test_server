import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InputCreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    private readonly logger = new Logger(ProductsService.name);
    constructor(private prismaService: PrismaService){}

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
            this.logger.error('Error fetching user', error);
            throw new InternalServerErrorException('An error occurred');
        }
    }
}
