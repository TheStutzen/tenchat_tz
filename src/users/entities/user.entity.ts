import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column('decimal', { precision: 10, scale: 4, default: 0 })
  balance: number

  @CreateDateColumn()
  dateReg: Date
}
