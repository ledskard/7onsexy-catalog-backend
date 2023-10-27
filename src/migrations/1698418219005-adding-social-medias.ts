import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingSocialMedias1698418219005 implements MigrationInterface {
    name = 'AddingSocialMedias1698418219005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` ADD \`tiktok\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`model\` ADD \`twitter\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` DROP COLUMN \`twitter\``);
        await queryRunner.query(`ALTER TABLE \`model\` DROP COLUMN \`tiktok\``);
    }

}
