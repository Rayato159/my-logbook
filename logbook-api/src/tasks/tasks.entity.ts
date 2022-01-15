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

    @Column()
    created: string

    @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
    user: User
}