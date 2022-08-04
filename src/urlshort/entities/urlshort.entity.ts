import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["code"])
export class Urlshort {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column({ length: 20 })
    code: string

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date

    @CreateDateColumn({ type: "timestamp" })
    updated_at: Date
}
