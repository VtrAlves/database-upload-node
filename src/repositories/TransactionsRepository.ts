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
		// const transactionValuesByType = await this.createQueryBuilder()
		// 	.select('type')
		// 	.addSelect('SUM(value)', 'value')
		// 	.groupBy('type')
		// 	.getRawMany()
		// const incomeValue = transactionValuesByType.filter(
		// 	transaction => transaction.type === 'income'
		// )
		// console.log(incomeValue)
		// const income = incomeValue[0].value || 0
		// console.log('income', income)
		// const outcomeValue = transactionValuesByType.filter(
		// 	transaction => transaction.type === 'outcome'
		// )

		const incomeTransactions = await this.find({
			where: { type: 'income' }
		})

		const { value: income } = incomeTransactions.reduce(
			(total, currentValue) => {
				const value = total.value + currentValue.value

				return {
					...total,
					value
				}
			},
			{ value: 0 }
		)

		const outcomeTransactions = await this.find({
			where: { type: 'outcome' }
		})

		const { value: outcome } = outcomeTransactions.reduce(
			(total, currentValue) => {
				const value = total.value + currentValue.value

				return {
					...total,
					value
				}
			},
			{ value: 0 }
		)

		return {
			income,
			outcome,
			total: income - outcome
		}
	}
}

export default TransactionsRepository
