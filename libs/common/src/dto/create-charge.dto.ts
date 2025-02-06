import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsNumber, ValidateNested } from "class-validator";
import { CardDto } from "./card.dto";


export class CreateChargeDto {
    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested() //validate for the value inside card dto
    @Type(() => CardDto) //convert plain js to a real js obj
    card: CardDto
    @IsNumber()
    amount: number
}