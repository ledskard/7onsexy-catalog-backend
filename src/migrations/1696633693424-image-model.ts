import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageModel1696633693424 implements MigrationInterface {
    name = 'ImageModel1696633693424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` ADD \`model_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_83c886dc028a4b8e9ce4192f533\` FOREIGN KEY (\`model_id\`) REFERENCES \`model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_83c886dc028a4b8e9ce4192f533\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP COLUMN \`model_id\``);
    }

}
