import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity({ name: "profile" })
export class Profile {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ length: 256 })
    firstName: string;

    @Column({ length: 256 })
    lastName: string;

    @Column({ nullable: true })
    age?: number;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}