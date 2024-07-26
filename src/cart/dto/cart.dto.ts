import { Type } from "class-transformer";
import { ArrayContains, ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
class CartItemDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;
}

export class InputCreateCartDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CartItemDto)
    items: CartItemDto[]
}