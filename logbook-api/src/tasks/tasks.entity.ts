import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tasks" })
export class Tasks {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: "date", default: () => "current_timestamp" })
    created: Date

    @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User
}