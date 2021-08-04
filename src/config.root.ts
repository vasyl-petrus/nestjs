import { join } from 'path';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

const defaults = {
  dbUrl: 'mongodb://localhost:27017/nest',
  graphQlSchemaPath: 'src/schema.gql',
};

export const configModule = ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
  isGlobal: true,
});

export const configDbModule = MongooseModule.forRoot(
  process.env.DB_URI || defaults.dbUrl,
);

export const configGraphQModule = GraphQLModule.forRoot({
  autoSchemaFile: join(
    process.cwd(),
    process.env.GRAPHQl_SCHEMA_PATH || defaults.graphQlSchemaPath,
  ),
  sortSchema: true,
  playground: true,
  debug: false,
});

export default [configModule, configDbModule, configGraphQModule];
