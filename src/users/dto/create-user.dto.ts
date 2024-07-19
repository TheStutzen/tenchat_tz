import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
  })
  @IsNotEmpty({ message: 'Поле name не заполнено' })
  @IsString({ message: 'Поле должно быть строкой' })
  name: string

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
  })
  @IsNotEmpty({ message: 'Поле email не заполнено' })
  @IsEmail({}, { message: 'Невалидная почта' })
  @IsString({ message: 'Поле должно быть строкой' })
  email: string
}
