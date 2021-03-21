import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import User from './User';

@Entity()
export default class Bookmark {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column()
    favicon: string;

    @Column()
    order: number;

    @ManyToOne(() => User, (user) => user.bookmarks)
    user: User;

    constructor(
        name: string,
        url: string,
        favicon: string,
        order: number,
        user: User,
    ) {
        this.name = name;
        this.url = url;
        this.favicon = favicon;
        this.order = order;
        this.user = user;
    }
}
