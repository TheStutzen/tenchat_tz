import {
  BadRequestException,
  HttpException,
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

  /**
   * Create user
   *
   * @param {String} createUserDto.name = name User
   * @param {String} createUserDto.email = email User
   * @returns {User} = object user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const emailCheck = await this.userRepositiry
      .createQueryBuilder('user')
      .where('user.email = :email', { email: createUserDto.email })
      .getOne()

    if (emailCheck) {
      throw new BadRequestException(
        'Пользователь с такой почтой уже зарегестрирован',
      )
    }

    const user = await this.userRepositiry.save(createUserDto)

    return user
  }

  /**
   * Find user
   *
   * @param Number id = id user
   * @returns {User} = object user
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepositiry
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne()

    if (user) {
      return user
    }

    throw new NotFoundException('Пользователя не существует')
  }

  /**
   * Update user
   *
   * Я знаю что можно обновить поле balance используя этот endpoint
   * @param Number id = id user
   * @param {String} updateUserDto.name = otional name User
   * @param {String} updateUserDto.email = otional email User
   * @param {Number} updateUserDto.balance = otional balance User
   * @returns {User} = object user
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const hasUpdate = await this.userRepositiry.update(id, updateUserDto)

    if (hasUpdate.affected === 1) {
      const user = await this.findOne(id)

      return user
    }

    throw new BadRequestException('Обновление не удалось')
  }

  /**
   * Remove user
   *
   * @param Number id = id user
   * @returns Пользователь успешно удален
   */
  async remove(id: number) {
    const hasRemove = await this.userRepositiry.delete(id)

    if (hasRemove.affected === 1) {
      return 'Пользователь успешно удален'
    }

    throw new BadRequestException('Удаление не удалось')
  }

  /**
   * Added balance user
   *
   * @param Number id = id user
   * @param {Number} params.balance = user balance
   * @returns Пользователь успешно удален
   */
  async deposit(id: number, params: DepositUserDto) {
    const user = await this.findOne(id)

    if (user) {
      const amount = user.balance + params.balance
      const hasUpdate = await this.update(id, { balance: amount })

      return { message: 'Успешно пополнен баланс', balance: hasUpdate.balance }
    }

    return user
  }

  /**
   * Deduct user balance
   *
   * @param Number id = id user
   * @param {Number} params.balance = user balance
   * @returns Пользователь успешно удален
   */
  async deduct(id: number, params: DepositUserDto) {
    const user = await this.findOne(id)

    if (user) {
      if (user.balance >= params.balance) {
        const deduct = user.balance - params.balance
        const hasUpdate = await this.update(id, { balance: deduct })

        return { message: 'Успешно списан баланс', balance: hasUpdate.balance }
      }

      throw new HttpException('Списание не удалось. Деньги кончились', 402)
    }

    return user
  }
}
