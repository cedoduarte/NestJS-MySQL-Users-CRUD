import { Profile } from "src/profiles/entities/profile.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToOne } from "typeorm"

@Entity({ name: "users" })
export class User {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ length: 256 })
    username: string;

    @Column({ length: 256 })
    password: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({ nullable: true })
    authStrategy: string;

    @OneToOne(() => Profile, (profile) => profile.id, { eager: true })
    @JoinColumn()
    profile: Profile;
}