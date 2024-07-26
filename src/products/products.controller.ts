import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { InputCreateProductDto, Product, ProductPagination } from './dto/product.dto';
import { ProductsService } from './products.service';
import { ApiAcceptedResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Post()
    @ApiCreatedResponse({
        description: 'Product created successfully',
    })
    async createProduct(@Body() input: InputCreateProductDto) {
        await this.productsService.createProduct(input);
    }

    @Get()
    @ApiAcceptedResponse({
        type:ProductPagination
    })
    async getAllProducts(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10) {

        const products = await this.productsService.getProducts(page, pageSize);

        return products;
    }

    @Get('search')
    @ApiAcceptedResponse({
        type: [Product]
    })
    async getProductById(@Query('name') name: string) {
        const product = await this.productsService.getProductByName(name);
        return product;
    }

}
