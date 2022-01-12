import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tasks" })
export class Tasks {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    created: string
}