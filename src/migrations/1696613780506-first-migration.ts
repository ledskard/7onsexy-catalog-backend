import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1696613780506 implements MigrationInterface {
    name = 'FirstMigration1696613780506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`likes\` int NOT NULL, \`telegram_vip\` varchar(255) NOT NULL, \`telegram_free\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ac481add37a1e8793b7b52b8e0\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ac481add37a1e8793b7b52b8e0\` ON \`model\``);
        await queryRunner.query(`DROP TABLE \`model\``);
        await queryRunner.query(`DROP TABLE \`images\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
