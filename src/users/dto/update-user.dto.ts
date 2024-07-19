import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Поле должно быть числом' })
  balance: number
}

export class DepositUserDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Поле должно быть числом' })
  balance: number
}
