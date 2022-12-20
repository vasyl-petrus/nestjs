import { MigrationInterface, QueryRunner } from 'typeorm';

export class TokenEntity1671552837782 implements MigrationInterface {
  name = 'TokenEntity1671552837782';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tokens\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`token\` varchar(255) NOT NULL, \`type\` enum ('forgot_password', 'confirm_email', 'auth') NOT NULL, \`expires_at\` datetime NOT NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tokens\` ADD CONSTRAINT \`FK_8769073e38c365f315426554ca5\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tokens\` DROP FOREIGN KEY \`FK_8769073e38c365f315426554ca5\``,
    );
    await queryRunner.query(`DROP TABLE \`tokens\``);
  }
}
