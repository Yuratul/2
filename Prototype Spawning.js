  
module.exports = function() {

    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {
            
            var numberOfParts = Math.floor(energy / 200);
            numberOfParts = Math.min(numberOfParts, Math.floor(30/3))
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }


            return this.spawnCreep(body, roleName, {memory: {role: roleName, working: false} });
        };
        StructureSpawn.prototype.createCustomHarvester =
        function(energy, roleName) {
            
            var numberOfParts = Math.floor(((energy - 150) / 100));
            numberOfParts = Math.min(numberOfParts, 47)
            var body = [CARRY, CARRY, CARRY];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            return this.spawnCreep(body, roleName, {memory: {role: roleName, working: false} });
        };
    StructureSpawn.prototype.createCustomPatroller =
        function(energy) {
            
            var numberOfParts = Math.floor(energy / 130);
            numberOfParts = Math.min(numberOfParts, Math.floor(50/2))
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(ATTACK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }


            return this.spawnCreep(body, roleName, {memory:{role: 'patroller'}});
        };
      StructureSpawn.prototype.createCustomCourier =
        function(energy, roleName) {
            
            var numberOfParts = Math.floor(energy / 100);
            numberOfParts = Math.min(numberOfParts, Math.floor(30/2))
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }


            return this.spawnCreep(body, roleName, {memory: {role: roleName, working: false}});
        };
        
    
         
    
        
};
