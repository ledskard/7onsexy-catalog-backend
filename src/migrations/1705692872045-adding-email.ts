import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingEmail1705692872045 implements MigrationInterface {
    name = 'AddingEmail1705692872045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`model\` ADD UNIQUE INDEX \`IDX_0049b8eed7227e82c98220525f\` (\`email\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` DROP INDEX \`IDX_0049b8eed7227e82c98220525f\``);
        await queryRunner.query(`ALTER TABLE \`model\` DROP COLUMN \`email\``);
    }

}
