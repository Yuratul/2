module.exports.loop = function () {
    require('Prototype Spawning')();
    let Harvester = require("Role Harvester")
    let Courier = require("Role Courier")
    let Upgrader = require("Role Upgrader")
    for(let i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    Game.market.createOrder({
    type: ORDER_SELL,
    resourceType: PIXEL,
    price: 1000000,
    totalAmount: 1,
    });
    for(let spawn in Game.spawns){
        for(let creep in Game.creeps){
            creep = Game.creeps[creep]
            
            if(creep.memory.role == "Harvester"){
                Harvester.run(creep)
            } else if(creep.memory.role == "Courier"){
                Courier.run(creep)
            } else if(creep.memory.role == "Upgrader"){
                Upgrader.run(creep)
            }
        }
        spawn = Game.spawns[spawn]
        let creepsInRoom = spawn.room.find([FIND_MY_CREEPS])
        let numberOfHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'Harvester');
        let numberOfUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'Upgrader');
        let numberOfCouriers = _.sum(creepsInRoom, (c) => c.memory.role == 'Courier');
        console.log(numberOfCouriers + " Couriers")
        
        if(spawn.room.controller.level >= 1){
            let minNumberHarvesters = 1 
            let minNumberCouriers = 2
            let minNumberUpgraders = 1
            if(minNumberHarvesters > numberOfHarvesters){
                spawn.createCustomHarvester(300, "Harvester")   
            } else if (minNumberCouriers > numberOfCouriers){
                spawn.createCustomCourier(200, "Courier")
            } else if (minNumberUpgraders > numberOfUpgraders){
                spawn.createCustomHarvester(300, "Upgrader")
            }
        }
    } 
};
