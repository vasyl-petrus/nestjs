import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1671633711378 implements MigrationInterface {
  name = 'migrations1671633711378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`boards\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`author\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`columns\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`board\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cards\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`author\` varchar(36) NULL, \`column\` varchar(36) NULL, UNIQUE INDEX \`REL_6f88fe170e09044ebbad660ba8\` (\`column\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`boards\` ADD CONSTRAINT \`FK_a7f0011efaceb1884e44b253b6a\` FOREIGN KEY (\`author\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`columns\` ADD CONSTRAINT \`FK_7e2c5c03d1f58793575ef62763a\` FOREIGN KEY (\`board\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_a55df267648b27c4c42f2f965d1\` FOREIGN KEY (\`author\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_6f88fe170e09044ebbad660ba8f\` FOREIGN KEY (\`column\`) REFERENCES \`columns\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_6f88fe170e09044ebbad660ba8f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_a55df267648b27c4c42f2f965d1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`columns\` DROP FOREIGN KEY \`FK_7e2c5c03d1f58793575ef62763a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`boards\` DROP FOREIGN KEY \`FK_a7f0011efaceb1884e44b253b6a\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_6f88fe170e09044ebbad660ba8\` ON \`cards\``,
    );
    await queryRunner.query(`DROP TABLE \`cards\``);
    await queryRunner.query(`DROP TABLE \`columns\``);
    await queryRunner.query(`DROP TABLE \`boards\``);
  }
}
