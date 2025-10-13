import events from '../event.json' with { type: 'json' };

class EventModel{
    constructor(){}
    get(){
        return events;
    }
}

export default new EventModel();