import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import multer from 'multer'

import TransactionsRepository from '../repositories/TransactionsRepository'
import CreateTransactionService from '../services/CreateTransactionService'
import DeleteTransactionService from '../services/DeleteTransactionService'
import ImportTransactionsService from '../services/ImportTransactionsService'

import MulterConfig from '../config/upload'

const transactionsRouter = Router()
const upload = multer(MulterConfig)

transactionsRouter.get('/', async (request, response) => {
	const transactionsRepository = getCustomRepository(TransactionsRepository)

	const transactions = await transactionsRepository.find()
	const balance = await transactionsRepository.getBalance()

	return response.json({
		transactions,
		balance
	})
})

transactionsRouter.post('/', async (request, response) => {
	const { title, value, type, category } = request.body

	const createTransaction = new CreateTransactionService()

	const transaction = await createTransaction.execute({
		title,
		value,
		type,
		categoryTitle: category
	})

	return response.json(transaction)
})

transactionsRouter.delete('/:id', async (request, response) => {
	const { id } = request.params

	const deleteTransaction = new DeleteTransactionService()

	await deleteTransaction.execute({ id })

	response.status(204).send()
})

transactionsRouter.post(
	'/import',
	upload.single('file'),
	async (request, response) => {
		const { filename } = request.file

		const importTransactions = new ImportTransactionsService()

		const transactions = await importTransactions.execute({
			transactionsFilename: filename
		})

		return response.json(transactions)
	}
)

export default transactionsRouter
