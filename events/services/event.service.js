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
                    currHash += `${currKey}U+003A${currEvent[currKey]?.id}U+002C${currEvent[currKey]?.name}U+002C${currEvent[currKey]}U+003B`;  
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
                const tmpObj = {}
                records.split('U+003B').forEach(function(record){
                    
                    if(!record){
                        return;
                    }

                    const [key, values] = record.split('U+003A');
                    
                    const arrValues = values.split('U+002C')
                    if(arrValues[0] == 'undefined'){
                        tmpObj[key] = arrValues[2];
                        return;
                    }
                    tmpObj[key] = {};
                    tmpObj[key].id = arrValues[0];
                    tmpObj[key].name = arrValues[1];
                })
                tmpObj.hours = value?.hours;
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

