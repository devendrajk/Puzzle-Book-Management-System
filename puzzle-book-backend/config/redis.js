// const { createClient } = require("redis");
const IORedis = require("ioredis");

const redis = new IORedis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null
});

redis.on("connect", () => {
    console.log("✅ Redis Connected");
});

redis.on("error", (err) => {
    console.log("Redis Error:", err);
});

module.exports = redis;