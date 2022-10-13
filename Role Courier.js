module.exports = {
	run: function(creep) {
        if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
        creep.memory.working = true
        } else if(creep.memory.working == true && creep.carry.energy == 0){
        	creep.memory.working = false
        }
        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        	   filter: (c) => c.structureType == STRUCTURE_CONTAINER && c.store[RESOURCE_ENERGY] <= c.store.getCapacity
    	});
    	let harvester = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
        	   filter: (c) =>  c.memory.role == "Harvester" && c.store[RESOURCE_ENERGY] > 0
    	});
    	let spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { 
    	filter: (c) => c.structureType == STRUCTURE_SPAWN && c.store.getFreeCapacity(RESOURCE_ENERGY) > 0});
    	let extensions = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (c) => c.structureType == STRUCTURE_EXTENSION && c.store.getFreeCapacity() > 0});
    	let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
    	let controller = creep.room.controller
    	let helped = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
        	   filter: (c) => c.memory.help == true});
        let upgrader = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
        	   filter: (c) =>  c.memory.role == "Upgrader" && c.store[RESOURCE_ENERGY] <= c.store.getCapacity()
    	});
    	let droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (c) =>  c.resourceType == RESOURCE_ENERGY  })
    	if(helped) {
    	    if (creep.pull(helped) == ERR_NOT_IN_RANGE){
    	        creep.moveTo(helped)
    	    } else {
    	        if (helped.memory.role == "Harvester"){
          	        if(creep.pos.inRangeTo(source,1)){
            	            creep.moveTo(spawn)
            	            creep.pull(helped)
                    } else {
                        creep.moveTo(source)
                        creep.pull(helped)
                    }
    	        } else if (helped.memory.role == "Upgrader"){
          	        if(creep.pos.inRangeTo(controller,1)){
            	            creep.moveTo(spawn)
            	            creep.pull(helped)
                    } else {
                        creep.moveTo(controller)
                        creep.pull(helped)
                    }
    	        }
    	    }
        } else {
            if(creep.memory.working == false) {
                if(container){
                    
                } else if (droppedEnergy){
                    if(creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE){
                        creep.moveTo(droppedEnergy)
                    }
                }    
                else {
                    creep.moveTo(harvester)
                }
            } else {
                console.log(upgrader)
                if(spawn){
                    if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(spawn)
                        console.log(2)
                    }
                } else if(extensions){
                    if(creep.transfer(extensions, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        creep.moveTo(extensions)
                } else if (upgrader){
                    if(creep.transfer(upgrader, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(upgrader)
                    }
                }
            }
        }
	}
};
