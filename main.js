module.exports.loop = function () {
    require('Prototype spawning')();
    let Harvester = require("Role Harvester")
    for(let spawn in Game.spawns){
        for(let creep in Game.creeps){
            creep = Game.creeps[creep]
            if(creep.memory.role == "Harvester"){
                Harvester.run(creep)
            }
        }
        spawn = Game.spawns[spawn]
        let creepsInRoom = spawn.room.find([FIND_MY_CREEPS])
        let numberOfHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'Harvester');
        let numberOfUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'Upgrader');
        let numberOfCouriers = _.sum(creepsInRoom, (c) => c.memory.role == 'Courier');
        if(spawn.room.controller.level >= 1){
            let minNumberHarvesters = 1 
            let minNumberCouriers = 2
            let minNumberUpgraders = 1
            if(minNumberHarvesters > numberOfHarvesters){
                spawn.createCustomCreep(300, "Harvester")   
            }
        }
    } 
};
