import { Exclude } from "class-transformer";
import { Tasks } from "src/tasks/tasks.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @OneToMany((_type) => Tasks, (tasks) => tasks.user, {eager: true})
    @Exclude({ toPlainOnly: true })
    tasks: Tasks

    @Column({ type: "timestamp", default: () => "current_timestamp" })
    created: Date
}