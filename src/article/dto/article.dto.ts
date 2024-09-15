import {
    IsString,
    IsNotEmpty,
    ValidateIf,
    IsIn,
    IsEmail,
    IsNumber,
    IsOptional,
    MinLength,
    MaxLength,
    IsBoolean,
    IsArray,
} from 'class-validator';

export class GenerateNarrativeAnalysisDto {
    @IsOptional()
    @IsString()
	@MinLength(24)
	@MaxLength(24)
	readonly projectId: String;
    
    @IsString()
	@IsNotEmpty()
	readonly researchQuestion: String;

    @IsNotEmpty()
    articles: any
}

export class FetchArticleDto {
    @IsOptional()
    @IsString()
	@MinLength(24)
	@MaxLength(24)
	readonly projectId: String;

    @IsString()
	@IsNotEmpty()
	readonly researchQuestion: String;

    @IsOptional()
    @IsString({
        message: 'Research Start Date is required.',
    })
    @IsNotEmpty()
    researchStartDate: Date

    @IsOptional()
    @IsString({
        message: 'Research End Date is required.',
    })
    @IsNotEmpty()
    researchEndDate: Date
}

export class CreateArticleDto {
    @IsOptional()
    @IsString()
	@MinLength(24)
	@MaxLength(24)
	readonly projectId: String;

    @IsOptional()
    @IsNotEmpty()
    @IsArray()
	readonly inclusionCriteria: String[];

    @IsOptional()
	readonly exclusionCriteria: String;

    @IsString()
	@IsNotEmpty()
	readonly researchQuestion: String;

    @IsOptional()
    @IsString({
        message: 'Research Start Date is required.',
    })
    @IsNotEmpty()
    researchStartDate: Date

    @IsOptional()
    @IsString({
        message: 'Research End Date is required.',
    })
    @IsNotEmpty()
    researchEndDate: Date
}

// export class GetProjectDto {
// 	@IsString()
// 	@MinLength(24)
// 	@MaxLength(24)
// 	readonly projectId: string;
// }
