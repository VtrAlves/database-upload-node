import fs from 'fs'
import path from 'path'
import csvParse from 'csv-parse'
import { getCustomRepository, getRepository } from 'typeorm'

import Transaction from '../models/Transaction'
import Category from '../models/Category'
import TransactionsRepository from '../repositories/TransactionsRepository'
import UploadConfig from '../config/upload'
import csvUtils from '../utils/csv'
import AppError from '../errors/AppError'

interface Request {
	transactionsFilename: string
}

interface TransactionCSV {
	title: string
	type: 'income' | 'outcome'
	value: number
	category: string
}

class ImportTransactionsService {
	// async execute({ transactionsFilename }: Request): Promise<any> {
	async execute({ transactionsFilename }: Request): Promise<Transaction[]> {
		const transactionsRepository = getCustomRepository(
			TransactionsRepository
		)
		const categoriesRepository = getRepository(Category)

		const transactionFilePath = path.join(
			UploadConfig.directory,
			transactionsFilename
		)

		const parseStream = csvParse({
			ltrim: true,
			rtrim: true,
			columns: true
		})

		const transactionsCSV = [] as TransactionCSV[]
		let categories = await categoriesRepository.find()

		const fileStream = fs
			.createReadStream(transactionFilePath)
			.pipe(parseStream)
			.on('data', (row: TransactionCSV) => {
				const categoryExists = categories.find(
					category => category.title === row.category
				)

				if (!categoryExists) {
					categories.push(
						categoriesRepository.create({
							title: row.category
						})
					)
				}
				transactionsCSV.push(row)
			})

		await new Promise(resolve => {
			fileStream.on('end', () => resolve())
		})

		if (transactionsCSV.length < 1) {
			throw new AppError('CSV empty!')
		}

		categories = await categoriesRepository.save(categories)

		const transactions = transactionsCSV.map(
			(transaction): Transaction => {
				const category = categories.find(
					category => category.title === transaction.category
				)
				if (!category) {
					throw new AppError('Category Not Found')
				}
				return transactionsRepository.create({
					title: transaction.title,
					type: transaction.type,
					value: transaction.value,
					category,
					categoryId: category.id
				})
			}
		)

		await transactionsRepository.save(transactions)

		return transactions
	}
}

export default ImportTransactionsService
