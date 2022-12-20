import { join } from 'path';

import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

const defaults = {
  db: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    synchronize: false,
  },
  graphQlSchemaPath: 'src/schema.gql',
  port: 3000,
};

export const configModule = ConfigModule.forRoot({
  envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'development'}`],
  isGlobal: true,
});

export const configDbModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST || defaults.db.host,
  port: parseInt(process.env.DB_PORT, 10) || defaults.db.port,
  username: process.env.DB_USER || defaults.db.username,
  password: process.env.DB_PASSWORD || defaults.db.password,
  database: process.env.DB_NAME || defaults.db.database,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development',
  autoLoadEntities: true,
});

export const configGraphQModule = GraphQLModule.forRoot({
  driver: ApolloDriver,
  autoSchemaFile: join(
    process.cwd(),
    process.env.GRAPHQl_SCHEMA_PATH || defaults.graphQlSchemaPath,
  ),
  sortSchema: true,
  playground: true,
  debug: true,
});

export const port = process.env.PORT || defaults.port;

export default [configModule, configDbModule, configGraphQModule];
