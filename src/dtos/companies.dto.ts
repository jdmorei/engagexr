import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  public name: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  public phone: string;

  @IsString()
  @IsOptional()
  public website: string;
}
