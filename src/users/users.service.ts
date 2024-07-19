import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { DepositUserDto, UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly userRepositiry: Repository<User>

  async create(createUserDto: CreateUserDto): Promise<User> {
    const emailCheck = await this.userRepositiry
      .createQueryBuilder('User')
      .where('User.email = :email', { email: createUserDto.email })
      .getOne()

    if (emailCheck) {
      throw new BadRequestException(
        'Пользователь с такой почтой уже зарегестрирован',
      )
    }

    const user = await this.userRepositiry.save(createUserDto)

    return user
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepositiry
      .createQueryBuilder('User')
      .where('User.id = :id', { id })
      .getOne()

    if (user) {
      return user
    }

    throw new NotFoundException('Пользователя не существует')
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hasUpdate = await this.userRepositiry.update(id, updateUserDto)

    if (hasUpdate.affected === 1) {
      const user = await this.findOne(id)

      return user
    }

    throw new BadRequestException('Обновление не удалось')
  }

  async remove(id: number) {
    const hasRemove = await this.userRepositiry.delete(id)

    if (hasRemove.affected === 1) {
      return 'Пользователь успешно удален'
    }

    throw new BadRequestException('Удаление не удалось')
  }

  async deposit(id: number, params: DepositUserDto) {
    const user = await this.findOne(id)

    if (user) {
      const hasUpdate = await this.update(id, params)

      return { message: 'Успешно пополнен баланс', hasUpdate }
    }

    return user
  }

  async deduct(id: number, params: DepositUserDto) {
    const user = await this.findOne(id)

    if (user) {
      if (user.balance > params.balance) {
        const hasUpdate = await this.update(id, params)

        return { message: 'Успешно списан баланс', hasUpdate }
      }

      return 'Списание не удалось'
    }

    return user
  }
}
