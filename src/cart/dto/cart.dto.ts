import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayContains, ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
class CartItemDto {
    @ApiProperty()
    @IsNumber()
    productId: number;
    
    @ApiProperty()
    @IsNumber()
    quantity: number;
}

export class InputCreateCartDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CartItemDto)
    @ApiProperty({ type:[CartItemDto] })
    items: CartItemDto[]
}