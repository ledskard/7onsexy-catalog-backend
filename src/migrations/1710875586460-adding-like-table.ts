import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingLikeTable1710875586460 implements MigrationInterface {
    name = 'AddingLikeTable1710875586460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`like\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` datetime NOT NULL, \`modelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_8ed52d63c37d492770099fddc50\` FOREIGN KEY (\`modelId\`) REFERENCES \`model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_8ed52d63c37d492770099fddc50\``);
        await queryRunner.query(`DROP TABLE \`like\``);
    }

}
