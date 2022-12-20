import { join } from 'path';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

const defaults = {
  dbUrl: 'mongodb://localhost:27017/nest',
  graphQlSchemaPath: 'src/schema.gql',
  port: 3000,
};

export const configModule = ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
  isGlobal: true,
});

export const configDbModule = MongooseModule.forRoot(
  process.env.DB_URI || defaults.dbUrl,
);

export const configGraphQModule = GraphQLModule.forRoot({
  driver: ApolloDriver,
  autoSchemaFile: join(
    process.cwd(),
    process.env.GRAPHQl_SCHEMA_PATH || defaults.graphQlSchemaPath,
  ),
  sortSchema: true,
  playground: true,
  debug: false,
});

export const port = process.env.PORT || defaults.port;

export default [configModule, configDbModule, configGraphQModule];
