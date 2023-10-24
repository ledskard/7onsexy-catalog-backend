import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingInstagramNullable1698165586997 implements MigrationInterface {
    name = 'AddingInstagramNullable1698165586997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_83c886dc028a4b8e9ce4192f533\``);
        await queryRunner.query(`ALTER TABLE \`model\` CHANGE \`instagram\` \`instagram\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_83c886dc028a4b8e9ce4192f533\` FOREIGN KEY (\`model_id\`) REFERENCES \`model\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_83c886dc028a4b8e9ce4192f533\``);
        await queryRunner.query(`ALTER TABLE \`model\` CHANGE \`instagram\` \`instagram\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_83c886dc028a4b8e9ce4192f533\` FOREIGN KEY (\`model_id\`) REFERENCES \`model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
