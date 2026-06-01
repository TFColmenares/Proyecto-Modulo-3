import { AppDataSource } from './config/data-source';
import { PORT } from './config/envs';
import server from './server';
import "reflect-metadata";

AppDataSource.initialize().then(()=>{
    console.info('DB Connection established');

server.listen(PORT, () => {
    console.info(`Server up and running on http://localhost:${PORT}`);
});
}).catch((error: unknown) => console.log(error));


