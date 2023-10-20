import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingInstagram1697808387498 implements MigrationInterface {
    name = 'AddingInstagram1697808387498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` CHANGE \`location\` \`instagram\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`model\` DROP COLUMN \`instagram\``);
        await queryRunner.query(`ALTER TABLE \`model\` ADD \`instagram\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` DROP COLUMN \`instagram\``);
        await queryRunner.query(`ALTER TABLE \`model\` ADD \`instagram\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`model\` CHANGE \`instagram\` \`location\` varchar(255) NOT NULL`);
    }

}
