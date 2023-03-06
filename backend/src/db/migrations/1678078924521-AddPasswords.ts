import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPasswords1678078924521 implements MigrationInterface {
    name = 'AddPasswords1678078924521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"
            ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"
            DROP COLUMN "password"`);
    }

}
