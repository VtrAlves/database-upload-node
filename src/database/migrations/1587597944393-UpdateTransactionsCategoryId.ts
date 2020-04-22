import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class UpdateTransactionsCategoryId1587597944393
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'transactions',
			new TableForeignKey({
				name: 'TransactionCategory',
				columnNames: ['categoryId'],
				referencedTableName: 'categories',
				referencedColumnNames: ['id'],
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE'
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('transactions', 'TransactionCategory')
	}
}
