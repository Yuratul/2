module.exports = {
	run: function(creep) {
        if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
        creep.memory.working = true
        } else if(creep.memory.working == true && creep.carry.energy < creep.carryCapacity){
        	creep.memory.working = false
        }
        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        	   filter: (c) => c.structureType == STRUCTURE_CONTAINER && c.store[RESOURCE_ENERGY] <= c.storeCapacity
    	});
    	let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
    	let helper = creep.pos.findClosestByPath(FIND_MY_CREEPS, {filter: (c) => c.memory.role == "Courier"});
    	let courier = creep.pos.findClosestByPath(FIND_MY_CREEPS, {filter: (c) => c.memory.role == "Courier" && c.store.getFreeCapacity(RESOURCE_ENERGY) > 0});
    	if(creep.memory.working == false) {
    	    
    	    if(creep.harvest(source) == ERR_NOT_IN_RANGE){
    	        creep.memory.help = true;
    	        creep.move(helper)
    	    } else {
    	        creep.harvest(source)
    	        creep.memory.help = false;
    	    }
    	} else {
    	    creep.transfer(helper, RESOURCE_ENERGY)
    	}
	}
};
