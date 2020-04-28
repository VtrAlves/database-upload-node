import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn
} from 'typeorm'

import Category from './Category'

@Entity('transactions')
class Transaction {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	title: string

	@Column()
	type: 'income' | 'outcome'

	@Column('integer')
	value: number

	@Column('uuid')
	categoryId: string

	@ManyToOne(() => Category, category => category.transaction, {
		eager: true
	})
	@JoinColumn({ name: 'categoryId' })
	category: Category

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}

export default Transaction
