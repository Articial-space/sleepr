import { Type } from "class-transformer"
import { IsDate, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator"
import { createChargeDto } from "@app/common"

export class CreateReservationDto {
    @IsDate()
    @Type(() => Date)
    startDate: Date
    @IsDate()
    @Type(() => Date)
    endDate: Date
    @IsString()
    @IsNotEmpty()
    placeId: String
    @IsString()
    @IsNotEmpty()
    invoiceId: String
    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => createChargeDto)
    charge: createChargeDto
}
