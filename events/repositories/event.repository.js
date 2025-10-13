import EventModel from '../model/event.model.js';

class EventRepository{
    constructor({
        model
    }){
        this.model = model;
    }
    get(){
        const result = this.model.get();
        return result;
    }
}

export default new EventRepository({
    model: EventModel
});