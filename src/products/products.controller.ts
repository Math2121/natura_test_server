import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
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

    @Get()
    @HttpCode(200)
    async getAllProducts(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10) {

        const products = await this.productsService.getProducts(page, pageSize);

        return products;
    }

}
