import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfileImageModel1697047844388 implements MigrationInterface {
    name = 'ProfileImageModel1697047844388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` ADD \`profile_image_id\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` DROP COLUMN \`profile_image_id\``);
    }

}
