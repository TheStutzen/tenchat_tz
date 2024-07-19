import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
  })
  @IsNotEmpty()
  @IsString({ message: 'Поле должно быть строкой' })
  name: string

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
  })
  @IsNotEmpty()
  @IsString({ message: 'Поле должно быть строкой' })
  email: string
}
