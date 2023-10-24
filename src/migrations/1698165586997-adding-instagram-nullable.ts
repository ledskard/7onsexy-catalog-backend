import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingInstagramNullable1698165586997 implements MigrationInterface {
    name = 'AddingInstagramNullable1698165586997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` CHANGE \`instagram\` \`instagram\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` CHANGE \`instagram\` \`instagram\` varchar(255) NOT NULL`);
    }

}
