import EventRepository from "../repositories/event.repository.js";

class EventService {
    constructor({ repository }) {
        this.repository = repository;
        this.keysToAggregate = {
            'p': 'project', 
            'e': 'employee',
            'd': 'date'
        }
    }

    get({
        aggr
    }) {
        try {

            const events = this.repository.get();
            
            if(!aggr){
                return {
                    data: events
                };
            }

            const aggregations = aggr.split('');

            if(aggregations.length === 0){
                return {
                    data: events
                };
            }

            const hashMap = new Map();
            const valuesMap = new Map();
            const result = [];

            for(let i=0; i<events.length; i++){
                const currEvent = events.at(i);
                let currHash = '';
                
                for(let j=0; j<aggregations.length; j++){
                    const currAggr = aggregations.at(j);
                    if(!Object.hasOwn(this.keysToAggregate, currAggr)){
                        return {
                            status: 'rejected',
                            code: 400,
                            message: 'Bad request!',
                            stack: 'While aggregate 1',
                        }
                    }
                    const currKey = this.keysToAggregate[currAggr];
                    currHash += `${currKey}|${currEvent[currKey]?.id?currEvent[currKey]?.id:currEvent[currKey]};`;
                    valuesMap.set(`${currKey}|${currEvent[currKey]?.id?currEvent[currKey]?.id:currEvent[currKey]}`, currEvent[currKey]);
                }

                if(!hashMap.has(currHash)){
                    hashMap.set(currHash, {
                        hours: 0
                    });
                }
                const currObj = hashMap.get(currHash);
                if(isNaN(Number(currEvent.hours))){
                    currEvent.hours = 0;
                }
                currObj.hours += Number(currEvent.hours);
            }
            
            hashMap.forEach((value, records) => {
                let tmpObj = {};
                records.split(';').forEach(record=>{
                    tmpObj[record.split('|')[0]] = valuesMap.get(record);
                })
                tmpObj = {...tmpObj, ...value}
                result.push(tmpObj);
            });

            return {
                data: result
            };    
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

