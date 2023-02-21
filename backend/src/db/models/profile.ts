/** @module Models/Profile */
import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {User} from "./user";

/**
 * Profile model - This is for interacting with the profile table
 * Each profile corresponds to exactly 1 pet owned by a User.
 * This allows each user to have many pet profiles without needing to create more accounts
 */
@Entity()
export class Profile extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	picture: string;

	@ManyToOne((type) => User, (user: User) => user.profiles, {
		//adding an IPHistory will also add associated User if it is new, somewhat useless in this example
		cascade: true,
		// if we delete a User, also delete their IP History
		onDelete: "CASCADE"
	})
	user: Relation<User>;

	@CreateDateColumn()
	created_at: string;
}
