
// Aramis Hornung Moraes
// Blocks World
// sample app for Artificial inteligence classes
// sunday, march 11th 2018
// licensed under MIT :^)

var movements = []; // holds the movements performed to solve the puzzle

// define a problem 
/*
var m1 = new Agent("m1");
m1.fixed = true;
blocks.push(m1)

var m2 = new Agent("m2");
m2.fixed = true;
blocks.push(m2)

var m3 = new Agent("m3");
m3.fixed = true;
blocks.push(m3)

// a
var agentA = new Agent("a");
agentA.target = m3;
blocks.push(agentA)

//b
var agentB = new Agent("b");
agentB.target = agentA;
blocks.push(agentB)

//c
var agentC = new Agent("c");
agentC.target = agentB;
blocks.push(agentC)

// define references
m2.up = agentB;
agentB.down = m2;
agentB.up = agentA;
agentA.down = agentB;
agentA.up = agentC;
agentC.down = agentA;
agentC.up = null;

// register global vars for each agent to have access
blocks.forEach(block => {
    block.neighbours = blocks;
    block.movements = movements;
});
*/

// checks if all blocks are happy
function isSimulationDone(blocks) {
    for (b of blocks) {
        if (b.state !== "s" && b.fixed == false) {
            return false;
        }
    }
    return true;
}

//model example
/*
m1 m2 m3 a b c
p - - -
p b - -
p - - -
a c b m3
a m2 m2 a
a - a b
 */
// get the input data, first line defines agents name
// second line defines, passive of active profile followed
// by who is on top and down the given agent
function parseModel (inputModel) {
    var lines = inputModel.split(/\r?\n/);
    var ids =  lines[0].split(" ");
    agents = []

    // clear movements array
    movements = []

    // create the agents
    var index = 0;
    for (var id of ids) {
        var newAgent = new Agent(id);
        newAgent.fixed = (lines[index+1].split(" ")[0] == "p"?true:false); // passive (fixed) or active
        agents.push(newAgent);
        ++index;
    }
        

    // define up down and objective
    index = 0;
    for (var agent of agents) {
        var adjacences = lines[index+1].split(" ");
        upId = adjacences[1];
        downId = adjacences[2];
        targetId = adjacences[3];

        if (upId == "-") {
            agent.up = null
        } else {
            for (var agnt of agents) {
                if (agnt.id == upId) {
                    agent.up = agnt
                }
            }
        }
        if (downId == "-") {
            agent.up = null
        } else {
            for (var agnt of agents) {
                if (agnt.id == downId) {
                    agent.down = agnt
                }
            }
        }
        if (targetId == "-") {
            agent.target = null
        } else {
            for (var agnt of agents) {
                if (agnt.id == targetId) {
                    agent.target = agnt
                }
            }
        }
        ++index;
    }

    // register global vars for each agent to have access
    for (var block of agents) {
        block.neighbours = agents; // model of world composed by the blocks
        block.movements = movements; // global to register the solving steps
    }
    simulate(agents);
}

function simulate(blocks) {
    var jj = 100 // limit iterations to prevent infinite loop or CPU abuse
    while (jj > 0) {
        for (var block of blocks) {
            if (block.fixed == false) {
                block.run()
            }

            if (isSimulationDone(blocks) == true) {
                var outputresult = "";
                var i =0;
                console.log("simulation complete!");
                // compose result text to display
                for (move of movements) {
                    outputresult += "element " + move.element + ", from: " + move.from + " to: " + move.to + "\n";
                }
                console.log(outputresult);
                document.getElementById("RO").value = outputresult;
                jj = 0;
            }
        }
        --jj;
    }
}
