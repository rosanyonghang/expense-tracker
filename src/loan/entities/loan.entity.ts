import { Entity, Column, ManyToOne, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
}
