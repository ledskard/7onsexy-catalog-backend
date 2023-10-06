import { MigrationInterface, QueryRunner } from "typeorm";

export class ModelType1696634348538 implements MigrationInterface {
    name = 'ModelType1696634348538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` ADD \`type\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` DROP COLUMN \`type\``);
    }

}
