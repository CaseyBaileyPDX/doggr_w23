/** @module Seeds/User */
import {User} from "../models/user";
import {Seeder} from "../../lib/seed_manager";
import {FastifyInstance} from "fastify";
import {hash} from "bcrypt";
/**
 * UserSeeder class - Model class for interacting with "users" table
 */
export class UserSeeder extends Seeder {
	/**
	 * Runs the IPHistory table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding Users...");

		for (let i = 0; i < 10; i++) {
			let user = new User();
			user.name = "user" + i;
			user.email = "user" + i + "@email.com";
			user.password = await hash("password", 10);
			await user.save();
			app.log.info("Seeded user " + i);
		}
	}
}

// generate default instance for convenience
export const UserSeed = new UserSeeder();

