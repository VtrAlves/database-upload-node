import csvParse from 'csv-parse'
import fs from 'fs'
import path from 'path'
import AppError from '../errors/AppError'

async function read(filePath: string): Promise<Object[]> {
	const fileExists = fs.promises.stat(filePath)

	if (!fileExists) {
		throw new AppError('File Not Found', 404)
	}

	const parseStream = csvParse({
		ltrim: true,
		rtrim: true,
		columns: true
	})

	const rows = [] as Object[]

	const fileStream = fs
		.createReadStream(filePath)
		.pipe(parseStream)
		.on('data', row => {
			rows.push(row)
		})

	await new Promise(resolve => {
		fileStream.on('end', () => resolve())
	})
	return rows
}

export default { read }
