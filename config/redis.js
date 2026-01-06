import { createClient } from "redis";
import { RD_URI } from "../config/env.js";

const client = createClient({
    url: RD_URI
});


client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

export default client;
