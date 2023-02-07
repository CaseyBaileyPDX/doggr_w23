
import * as dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import fs from "fs/promises";
import path from "path";
import {Nastify} from "./nastify";
import axios from "axios";
import { promisify } from "util";
//import { Fastify } from "./fastify";

// Makes our lives a bit nicer, now we can await the timeout, see note on custom variant here
// https://nodejs.org/docs/latest-v8.x/api/timers.html#timers_settimeout_callback_delay_args
const asyncTimer = promisify(setTimeout);

const app = Nastify();
app.use("/about", cors());
app.use("/get", cors());

//////////////////////////////////// HW1 solution
// Part 1 of hw TESTING
// app.put("/users", (req, res) => {
//   console.log("PUT a user");
//   res.send("PUT a user");
// });
// app.delete("/users", (req, res) => {
//   console.log("Deleted a user");
//   res.send("Deleted a user");
// })

// BONUS 1
app.use("/users/:userID", (req, res, next) => {
  console.error(`${req.params.userID}`);
  // MUST CALL NEXT!
  return next();
});

// BONUS 2
app.get("/fetchRandomUser", async (req, res) => {
  const randomUser = await axios.get("https://randomuser.me/api/");
  res.status(200).json(randomUser.data);
});

// BONUS 3
app.get("/fetchUserPicture", async (req, res) => {
  const randomUser = await axios.get("https://dog.ceo/api/breeds/image/random");
  const imgLink = randomUser.data.message;
  const htmly = `<html><body><img src="${imgLink}"></body></html>`
  res.status(200).send(htmly);
});

// Part 2 of hw "/users" methods
app.get("/users", async (req, res) => {
  const usersFile = await fs.readFile(path.resolve(__dirname, 'public', 'users.html'))
    .catch(err => {
      console.error(err);
      //send error result - 500!
      res.setHeader('Content-Type', 'text/html');
      res.status(500).send("Error occurred", err);
    });

  res.status(200).send(usersFile);
});

app.post("/users", async (req, res) => {

  console.log("Starting 3 second wait");

  setTimeout(() => {
    console.log("Completed 3 second wait");
    res.send("POST to users waited 3 seconds");
  }, 3000);
});

app.put("/users", async (req, res) => {
  console.log("Starting 2 second wait");
  await asyncTimer(2000);
  console.log("Completed 2 second wait");
  return res.send("PUT to users waited 2 seconds");

});

// Part 2 of hw "/users/:userID" methods
app.delete("/users/:userID", async (req, res) => {
  const heads = Math.random() < 0.5;
  const userId = req.params.userID;
  if (heads) { // fake coin flip is heads
    res.send(`User ${userId} was deleted.`);
  } else { // fake coin flip was tails
    await asyncTimer(2000);
    res.status(500).send(`User ${userId} NOT FOUND!`);
  }
});

//////////////////////////////////////////////////////////

app.get("/about", (req, res) => {
  res.send("I am the about page");
});

app.post("/about", (req, res) => {
  res.send("I am POST REQUEST");
})

app.get("/users", (req, res) => {

})

app.get("/", async (req, res) => {

    const indexFile = await fs.readFile(path.resolve(__dirname, 'public', 'index.html'))
        .catch(err => {
            console.error(err);
            //send error result - 500!
            res.setHeader('Content-Type', 'text/html');
            res.status(500).send("Error occurred", err);
        });

    res.status(200).send(indexFile);
});

app.get('/get', async (req, res) => {
    const indexFile = await fs.readFile(path.resolve(__dirname, 'public', 'index.html'))
        .catch(err => {
            console.error(err);
            //send error result - 500!
            res.setHeader('Content-Type', 'text/html');
            return res.status(500).send("Error occurred", err);

        });

    return res.status(200).send(indexFile);
});

async function main() {
    const server = await app.listen(8080, () => {
        console.log("Server is running on 8080...");
    });
}

void main();

// import {App} from "./app";
// import {FastifyInstance} from "fastify";
//
// const app: FastifyInstance = App({
//     logger: {
//         level: 'info',
//         transport: {
//             target: 'pino-pretty'
//         }
//     }
// });
//
//
// const host_addr = '0.0.0.0';
// app.listen({port: 3000, host: host_addr},
//     (err, _address) => {
//         if (err) {
//             app.log.error(err);
//             process.exit();
//         }
//         const msg = `Server listening on '${host_addr}' ...`;
//         console.log(msg);
//         app.log.info(msg);
//     });
