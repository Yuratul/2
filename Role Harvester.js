module.exports = {
	run: function(creep) {
        if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
        creep.memory.working = true
        } else if(creep.memory.working == true && creep.carry.energy == 0){
        	creep.memory.working = false
        }
        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        	   filter: (c) => c.structureType == STRUCTURE_CONTAINER && c.store[RESOURCE_ENERGY] <= c.storeCapacity
    	});
    	if(creep.memory.working == false) {
    	    if(creep.memory.source)
    	}
	}
};
