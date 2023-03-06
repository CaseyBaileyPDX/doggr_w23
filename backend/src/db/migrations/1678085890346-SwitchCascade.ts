import {MigrationInterface, QueryRunner} from "typeorm";

export class SwitchCascade1678085890346 implements MigrationInterface {
    name = 'SwitchCascade1678085890346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match"
            DROP CONSTRAINT "FK_80e61381b28b6b6dd958c13be6d"`);
        await queryRunner.query(`ALTER TABLE "match"
            DROP CONSTRAINT "FK_d5b0c1cdda6e33736477797ea70"`);
        await queryRunner.query(`ALTER TABLE "match"
            ADD CONSTRAINT "FK_80e61381b28b6b6dd958c13be6d" FOREIGN KEY ("matcherId") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match"
            ADD CONSTRAINT "FK_d5b0c1cdda6e33736477797ea70" FOREIGN KEY ("matcheeId") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match"
            DROP CONSTRAINT "FK_d5b0c1cdda6e33736477797ea70"`);
        await queryRunner.query(`ALTER TABLE "match"
            DROP CONSTRAINT "FK_80e61381b28b6b6dd958c13be6d"`);
        await queryRunner.query(`ALTER TABLE "match"
            ADD CONSTRAINT "FK_d5b0c1cdda6e33736477797ea70" FOREIGN KEY ("matcheeId") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match"
            ADD CONSTRAINT "FK_80e61381b28b6b6dd958c13be6d" FOREIGN KEY ("matcherId") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
