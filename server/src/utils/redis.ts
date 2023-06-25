import { createClient } from 'redis';


const redisUrl = 'redis://127.0.0.1:6379';
const redisClient = createClient({ url: redisUrl });
(async () => {
    await redisClient.connect();
})();
  
redisClient.on('connect', () => console.log('Cache is connecting'));
redisClient.on('ready', () => console.log('Cache is ready'));
redisClient.on('end', () => console.log('Cache disconnected'));
redisClient.on('reconnecting', () => console.log('Cache is reconnecting'));
redisClient.on('error', (e) => console.log(e));

export default redisClient;


export const redisGetAsync = (redisClient.get).bind(redisClient);
export const redisSetAsync = (redisClient.set).bind(redisClient);
export const redisDelAsync = (redisClient.del).bind(redisClient);
