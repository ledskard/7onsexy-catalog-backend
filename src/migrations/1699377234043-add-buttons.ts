import { MigrationInterface, QueryRunner } from "typeorm";

export class AddButtons1699377234043 implements MigrationInterface {
    name = 'AddButtons1699377234043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`buttons\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NULL, \`title\` varchar(255) NULL, \`image_id\` int NULL, \`user_id\` int NULL, UNIQUE INDEX \`REL_d8a54c07401bd8254e7c2932ef\` (\`image_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`buttons\` ADD CONSTRAINT \`FK_d8a54c07401bd8254e7c2932ef7\` FOREIGN KEY (\`image_id\`) REFERENCES \`images\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`buttons\` ADD CONSTRAINT \`FK_2401aa27b6290ab83f6074eb9e8\` FOREIGN KEY (\`user_id\`) REFERENCES \`model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`buttons\` DROP FOREIGN KEY \`FK_2401aa27b6290ab83f6074eb9e8\``);
        await queryRunner.query(`ALTER TABLE \`buttons\` DROP FOREIGN KEY \`FK_d8a54c07401bd8254e7c2932ef7\``);
        await queryRunner.query(`DROP INDEX \`REL_d8a54c07401bd8254e7c2932ef\` ON \`buttons\``);
        await queryRunner.query(`DROP TABLE \`buttons\``);
    }

}
