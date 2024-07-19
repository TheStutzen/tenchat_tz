import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { DepositUserDto, UpdateUserDto } from './dto/update-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ description: 'Регистрация пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрован!',
  })
  @ApiResponse({ status: 404, description: 'Неудалось создать пользователя' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get(':id')
  @ApiOperation({ description: 'Поиск пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно найден!',
  })
  @ApiResponse({ status: 404, description: 'Неудалось найти пользователя' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ description: 'Обновление пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно обновлён!',
  })
  @ApiResponse({ status: 400, description: 'Обновление не удалось' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOperation({ description: 'Удаление пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно удален',
  })
  @ApiResponse({ status: 400, description: 'Удаление не удалось' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id)
  }

  @Patch('/balance/deposit')
  @ApiOperation({ description: 'Пополнение баланса пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Успешно пополнен баланс',
  })
  @ApiResponse({ status: 400, description: 'Пополнение не удалось' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  deposit(@Param('id') id: number, @Body() updateUserDto: DepositUserDto) {
    return this.usersService.deposit(id, updateUserDto)
  }

  @Patch('/balance/deduct')
  @ApiOperation({ description: 'Списание баланса пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Успешно списан баланс',
  })
  @ApiResponse({ status: 400, description: 'Списание не удалось' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  deduct(@Param('id') id: number, @Body() updateUserDto: DepositUserDto) {
    return this.usersService.deduct(id, updateUserDto)
  }
}
