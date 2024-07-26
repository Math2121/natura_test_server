import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { InputCreateProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Post()
    @HttpCode(201)
    async createProduct(@Body() input: InputCreateProductDto) {
        await this.productsService.createProduct(input);
        return { message: 'Product created successfully' };
    }
}
