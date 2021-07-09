import { createNodeRedisClient } from "handy-redis";

const client = createNodeRedisClient({ host: process.env.REDIS_HOST, port: parseInt(process.env.REDIS_PORT || "") });
client.nodeRedis.on('error', err => console.error(err));

/**
 * Store key value pair in Redis
 * @param key Key to store in Redis
 * @param value Value to store in Redis
 * @returns Boolean
 */
export async function insertKey(key: string, value: string): Promise<boolean> {
    try {
        client.set(key, value);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }

}

/**
 * Set an expiry on a key
 * @param key Key to set expiry
 * @param time Expiry time in seconds
 * @returns Boolean
 */
export async function expire(key: string, time: number): Promise<boolean> {
    try {
        client.expire(key, time);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Return value from key
 * @param key Key to be queried
 * @returns Value or null
 */
export async function getKey(key: string): Promise<string | null> {
    try {
        const value = await client.get(key);
        if (value === null) {
            return null;
        }
        return value;
    } catch (err) {
        console.error(err);
        return err;
    }
}

/**
 * Delete key value pair from Redis store
 * @param key Key to be deleted
 * @returns Boolean
 */
export async function deleteKey(key: string): Promise<boolean> {
    try {
        client.del(key);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Check if key exists in Redis
 * @param key Key to be checked for existence
 * @returns Boolean
 */
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