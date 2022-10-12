module.exports = {
	run: function(creep) {
        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        	   filter: (c) => c.structureType == STRUCTURE_CONTAINER && c.store[RESOURCE_ENERGY] <= c.storeCapacity
    	});
    	let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
    	let helper = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
        	   filter: (c) => c.memory.role == "Courier"});
        let controller = creep.room.controller
    	if(creep.memory.working == false) {
    	    if(creep.upgradeController(controller)== ERR_NOT_IN_RANGE) {
    	        creep.memory.help = true;
    	        creep.move(helper)
    	    } else {
    	        creep.upgradeController(controller)
    	        creep.memory.help = false;
    	    }
    	} 
	}
};
