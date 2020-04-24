import { getCustomRepository } from 'typeorm'

import TransactionsRepository from '../repositories/TransactionsRepository'

import AppError from '../errors/AppError'

interface Request {
	id: string
}

class DeleteTransactionService {
	public async execute({ id }: Request): Promise<void> {
		if (!id) {
			throw new AppError('Id is required')
		}

		const transactionsRepository = getCustomRepository(
			TransactionsRepository
		)

		const transactionExists = await transactionsRepository.findOne(id)

		if (!transactionExists) {
			throw new AppError('Transaction does not exists')
		}

		await transactionsRepository.remove(transactionExists)
	}
}

export default DeleteTransactionService
