import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InputCreateCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
    constructor(private prismaService: PrismaService) { }
    private readonly logger = new Logger(CartService.name);
    async storeCart(input: InputCreateCartDto) {
        try {
            const { items } = input;

            for (const item of items) {
                const product = await this.prismaService.product.findUnique({
                    where: { id: item.productId }
                });
                if (!product) {
                    throw new InternalServerErrorException(`Product with id ${item.productId} not found.`);
                }
                if (product.quantity < item.quantity) {
                    throw new InternalServerErrorException(`Insufficient quantity for product with id ${item.productId}. Available: ${product.quantity}`);
                }

                await this.prismaService.product.update({
                    where: { id: item.productId },
                    data: { quantity: product.quantity - item.quantity }
                });
                await this.prismaService.cart.create({
                    data: {
                        productId: item.productId,
                        quantity: item.quantity
                    }
                });
            }
            
        } catch (error) {
            this.logger.error('Error create product', error);
            throw new InternalServerErrorException(error);
        }

    }

}
