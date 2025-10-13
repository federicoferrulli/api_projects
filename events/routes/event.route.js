console.info('Event service Init')
import express from 'express';
import EventService from '../services/event.service.js'
const router = express.Router();

router.get('/', function(req, res, next){
    const result = EventService.get({
        query: req?.query
    })
    if(result?.status && result.status === 'rejected'){
        return next(result)
    }
    return res.status(result?.code || 200).json(result?.data);    
})

console.info('Event service Loaded')
export {router};