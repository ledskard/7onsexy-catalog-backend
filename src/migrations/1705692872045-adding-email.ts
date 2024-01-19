import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingEmail1705692872045 implements MigrationInterface {
    name = 'AddingEmail1705692872045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` ADD \`email\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` DROP COLUMN \`email\``);
    }

}
