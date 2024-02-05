import { MigrationInterface, QueryRunner } from "typeorm";

export class DescriptionRemove1707098670474 implements MigrationInterface {
    name = 'DescriptionRemove1707098670474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` DROP COLUMN \`description\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
