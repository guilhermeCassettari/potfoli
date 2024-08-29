import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUuidGenerateV4Function1683745544000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION uuid_generate_v4()
      RETURNS uuid
      LANGUAGE plpgsql
      AS $$
      DECLARE
        uuid_str uuid;
      BEGIN
        SELECT uuid_generate_v4() INTO uuid_str;
        RETURN uuid_str;
      END;
      $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS uuid_generate_v4()`,
    );
  }
}
