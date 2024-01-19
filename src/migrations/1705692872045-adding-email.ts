import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingEmail1705692872045 implements MigrationInterface {
    name = 'AddingEmail1705692872045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_83c886dc028a4b8e9ce4192f533\``);
        await queryRunner.query(`ALTER TABLE \`model\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`model\` ADD UNIQUE INDEX \`IDX_0049b8eed7227e82c98220525f\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_83c886dc028a4b8e9ce4192f533\` FOREIGN KEY (\`model_id\`) REFERENCES \`model\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_83c886dc028a4b8e9ce4192f533\``);
        await queryRunner.query(`ALTER TABLE \`model\` DROP INDEX \`IDX_0049b8eed7227e82c98220525f\``);
        await queryRunner.query(`ALTER TABLE \`model\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_83c886dc028a4b8e9ce4192f533\` FOREIGN KEY (\`model_id\`) REFERENCES \`model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
