import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
  synchronize: false, // Устанавливайте в false в production (для миграции)
  logging: true, // Добавлено для логирования
  schema: 'public',
}

const dataSource = new DataSource(dataSourceOptions)
// dataSource.runMigrations({ transaction: 'all' })
// console.log(dataSource)

export default dataSource
