import {Seeder} from "../../lib/seed_manager";
import {FastifyInstance} from "fastify";
import {hash} from "bcrypt";

/**
 * UserSeeder class - Model class for interacting with "users" table
 */
export class ClearSeeds extends Seeder {
	/**
	 * Runs the IPHistory table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Removing old data...");
		// clear out whatever's already there
		// note we cannot use .clear() because postgres cascade is bugged in Typeorm
		// https://github.com/typeorm/typeorm/issues/1649
		await app.db.user.delete({});
		console.log("Deleted users");
		await app.db.profile.delete({});
		console.log("Deleted profiles");
		await app.db.ip.delete({});
		console.log("Deleted IPs");
		await app.db.match.delete({});
		console.log("Deleted matches");
		await app.db.message.delete({});
		console.log("Deleted messages");
	}
}

// generate default instance for convenience
export const ClearSeed = new ClearSeeds();

