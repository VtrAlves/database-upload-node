import { EntityRepository, Repository } from 'typeorm'

import Transaction from '../models/Transaction'

interface Balance {
	income: number
	outcome: number
	total: number
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
	public async getBalance(): Promise<Balance> {
		const transactionValuesByType = await this.createQueryBuilder()
			.select('type')
			.addSelect('SUM(value)', 'value')
			.groupBy('type')
			.getRawMany()

		const [{ value: income }] = transactionValuesByType.filter(
			transaction => transaction.type === 'income'
		)

		const [{ value: outcome }] = transactionValuesByType.filter(
			transaction => transaction.type === 'outcome'
		)

		return {
			income: Number(income),
			outcome: Number(outcome),
			total: income - outcome
		}
	}
}

export default TransactionsRepository
