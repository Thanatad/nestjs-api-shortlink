import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Urlshort {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column()
    code: string

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date

    @CreateDateColumn({ type: "timestamp" })
    updated_at: Date
}
