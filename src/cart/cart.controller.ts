import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { InputCreateCartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService){}
    @Post()
    async addToCart(@Body()input: InputCreateCartDto) {
        await this.cartService.storeCart(input);
        return {
            message: 'Cart added successfully'
        }
    }
}
