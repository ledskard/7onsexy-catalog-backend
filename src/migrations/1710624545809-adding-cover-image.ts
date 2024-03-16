import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingCoverImage1710624545809 implements MigrationInterface {
    name = 'AddingCoverImage1710624545809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` ADD \`cover_image_id\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` DROP COLUMN \`cover_image_id\``);
    }

}
