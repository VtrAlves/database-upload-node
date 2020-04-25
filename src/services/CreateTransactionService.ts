import { getCustomRepository, getRepository } from 'typeorm'

import Transaction from '../models/Transaction'
import TransactionsRepository from '../repositories/TransactionsRepository'
import Category from '../models/Category'

import AppError from '../errors/AppError'

interface Request {
	title: string
	value: number
	type: 'income' | 'outcome'
	categoryTitle: string
}
class CreateTransactionService {
	public async execute({
		title,
		value,
		type,
		categoryTitle
	}: Request): Promise<Transaction> {
		const transactionsRepository = getCustomRepository(
			TransactionsRepository
		)

		if (type === 'outcome') {
			const { total } = await transactionsRepository.getBalance()

			if (total < value) {
				throw new AppError('Insuficient founds')
			}
		}

		const categoriesRepository = getRepository(Category)

		let categoryExists = await categoriesRepository.findOne({
			where: { title: categoryTitle }
		})

		if (!categoryExists) {
			categoryExists = categoriesRepository.create({
				title: categoryTitle
			})

			await categoriesRepository.save(categoryExists)
		}

		const transaction = transactionsRepository.create({
			title,
			value,
			type,
			category: categoryExists
		})

		// delete transaction.categoryId
		await transactionsRepository.save(transaction)

		return transaction
	}
}

export default CreateTransactionService
