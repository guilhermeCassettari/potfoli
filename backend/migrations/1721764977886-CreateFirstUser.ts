import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashPassword } from '../src/shared/brypt/bcrypt';

export class FirstUser1725383175957 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hashPassword('_Secure1234567890');
    await queryRunner.query(`
      INSERT INTO users (id, name, email, password, phone)
      VALUES (
        'c97ce6b9-f2b1-4bba-b87e-1a8b7cf6d781',
        'First User',
        'test@example.com',
        '${password}',
        '14998551150'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM users
      WHERE email = 'test@example.com'
    `);
  }
}
