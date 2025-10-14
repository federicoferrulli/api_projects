import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import LoggerMiddleware from './middlewares/logger.middleware.js';
import ErrorMiddleware from './middlewares/error.middleware.js';
import { routes } from './config/route.config.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(LoggerMiddleware);

app.get('/ping', function(req, res, next){
    return res.status(200).json({
        message: 'pong'
    })    
})

for(let i=0; i<routes.length; i++){
    const routeConfig = routes[i];
    const { router } = await import(`./${routeConfig?.path}`);
    app.use(
        routeConfig?.endpoint || '/',
        router
    );
}

app.use(function(req, res, next){
    next({
        status: 'rejected',
        code: 404,
        message: 'Resource not found!',
        stack: '-',
    });
})

app.use(ErrorMiddleware);

app.listen(process.env.PORT || 3000, function(){
    console.info(`${new Date().toISOString()}:LISTENING:${process.env?.PORT || 3000}`)
})