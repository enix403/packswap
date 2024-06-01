import { Type } from "class-transformer";
import { PartialType, OmitType } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
  ValidateNested
} from "class-validator";

export class SetTravelStopDto {
  @IsOptional()
  @IsUUID()
  id?: string | null;

  @ValidateIf(obj => obj.id == undefined)
  @IsString()
  @IsNotEmpty()
  address: string;

  @ValidateIf(obj => obj.id == undefined)
  @IsString()
  @IsNotEmpty()
  city: string;

  @ValidateIf(obj => obj.id == undefined)
  @IsString()
  @IsNotEmpty()
  country: string;
}

export class CreateTravelDto {
  @IsDateString()
  startDate: string;

  @IsNumber()
  @Min(1)
  totalCapacity: number;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => SetTravelStopDto)
  travelStops: SetTravelStopDto[];
}

export class UpdateTravelDto extends  PartialType(OmitType(CreateTravelDto, ['totalCapacity'] as const)) {}
