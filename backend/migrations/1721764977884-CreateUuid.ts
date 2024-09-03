import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUuidGenerateV4Function1683745544000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS uuid_generate_v4()`,
    );
  }
}
