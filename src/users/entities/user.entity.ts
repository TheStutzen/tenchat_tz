import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  balance: number

  @CreateDateColumn()
  dateReg: Date
}
