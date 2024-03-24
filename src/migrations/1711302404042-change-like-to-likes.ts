import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLikeToLikes1711302404042 implements MigrationInterface {
    name = 'ChangeLikeToLikes1711302404042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`likes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` datetime NOT NULL, \`modelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_ef38547699d780eb3d0a8133ef6\` FOREIGN KEY (\`modelId\`) REFERENCES \`model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`like\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_ef38547699d780eb3d0a8133ef6\``);
        await queryRunner.query(`DROP TABLE \`likes\``);
    }

}
