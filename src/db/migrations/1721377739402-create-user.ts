import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUser1721377739402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "user" (name,email,balance,"dateReg") VALUES
            ('test','test@bk.ru',10000,'2024-07-19 06:43:20.510');
            `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "user"
            WHERE email = 'test@bk.ru';
          `)
  }
}
