import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import Bookmark from './Bookmark';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Bookmark, (bookmark) => bookmark.user, {
        onDelete: 'CASCADE',
    })
    bookmarks!: Bookmark[];

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
