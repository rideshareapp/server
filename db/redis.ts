import { createNodeRedisClient } from "handy-redis";

const client = createNodeRedisClient({ host: process.env.REDIS_HOST, port: parseInt(process.env.REDIS_PORT || "") });
client.nodeRedis.on('error', err => console.error(err));

export async function insertKey(key: string, value: string): Promise<boolean> {
    try {
        client.set(key, value);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }

}

export async function getKey(key: string): Promise<string> {
    try {
        const value = await client.get(key);
        if (value === null) {
            return "no value";
        }
        return value;
    } catch (err) {
        console.error(err);
        return err;
    }
}

export async function deleteKey(key: string): Promise<boolean> {
    try {
        client.del(key);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function keyExists(key: string): Promise<boolean> {
    try {
        const value = await client.get(key);
        if (value === undefined || value === null) {
            return false;
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}