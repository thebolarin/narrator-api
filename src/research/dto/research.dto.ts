import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  ValidateIf,
  IsIn,
  IsEmail,
  IsNumber,
  IsOptional,
  IsInt,
  MinLength,
  MaxLength,
} from 'class-validator';

export class GetProjectDto {
	@IsString()
	@MinLength(24)
	@MaxLength(24)
	readonly projectId: string;
}


export class PaginationRequestDTO {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    page: number = 1;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    size: number = 10;
  
    @IsOptional()
    @IsString()
    sortBy: string = 'createdAt';
  
    @IsOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    sortOrder: string = 'DESC';
  }