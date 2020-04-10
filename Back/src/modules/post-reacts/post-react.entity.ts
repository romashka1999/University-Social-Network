import { BaseEntity, PrimaryGeneratedColumn, Entity, ManyToOne, RelationId } from "typeorm";
import { User } from "../users/user.entity";
import { Post } from "../posts/post.entity";


@Entity()
export class PostReact extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.postReacts)
    user: User;

    @RelationId((postReact: PostReact) => postReact.user)
    userId: number;

    @ManyToOne(type => Post, post => post.postReacts)
    post: Post;

    @RelationId((postReact: PostReact) => postReact.post)
    postId: number;
}