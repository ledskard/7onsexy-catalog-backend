import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingFeatureFlags1699372446179 implements MigrationInterface {
    name = 'AddingFeatureFlags1699372446179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`feature_flags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_feature_flags\` (\`user_id\` int NOT NULL, \`feature_flag_id\` int NOT NULL, INDEX \`IDX_535178dd9cf2986b063ada6f45\` (\`user_id\`), INDEX \`IDX_d50cd5239b505fed93d067f2e0\` (\`feature_flag_id\`), PRIMARY KEY (\`user_id\`, \`feature_flag_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_feature_flags\` ADD CONSTRAINT \`FK_535178dd9cf2986b063ada6f458\` FOREIGN KEY (\`user_id\`) REFERENCES \`model\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_feature_flags\` ADD CONSTRAINT \`FK_d50cd5239b505fed93d067f2e0f\` FOREIGN KEY (\`feature_flag_id\`) REFERENCES \`feature_flags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_feature_flags\` DROP FOREIGN KEY \`FK_d50cd5239b505fed93d067f2e0f\``);
        await queryRunner.query(`ALTER TABLE \`user_feature_flags\` DROP FOREIGN KEY \`FK_535178dd9cf2986b063ada6f458\``);
        await queryRunner.query(`DROP INDEX \`IDX_d50cd5239b505fed93d067f2e0\` ON \`user_feature_flags\``);
        await queryRunner.query(`DROP INDEX \`IDX_535178dd9cf2986b063ada6f45\` ON \`user_feature_flags\``);
        await queryRunner.query(`DROP TABLE \`user_feature_flags\``);
        await queryRunner.query(`DROP TABLE \`feature_flags\``);
    }

}
