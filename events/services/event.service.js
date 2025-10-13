import EventRepository from "../repositories/event.repository.js";

class EventService {
    constructor({ repository }) {
        this.repository = repository;
    }

    get({
        query
    }) {
        try {

            const result = this.repository.get();
            return result;    
        } catch (e) {
            return {
                status: 'rejected',
                code: 500,
                message: e.message,
                stack: e.stack,
            }
        }
        
    }
}

export default new EventService({
    repository: EventRepository
})

