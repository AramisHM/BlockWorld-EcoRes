
function Agent(id) {
    this.id = id;
    this.state = "f"; // s stifait, rf rechercherFuit, rs rechercherSatisfait, f fairFuit  
    this.target = {};
    this.up = null;
    this.down = null;
    this.fixed = false;
    this.restrictions = [];
    this.neighbours = []; // holds all other blocks

    this.attack = function (attackedAgent, restrictionArray) {
        restrictionArray.forEach(r => {
            attackedAgent.restrictions.push(r);
        });
        attackedAgent.state = "f"
    }
    this.fairFuit = function () {
    };
    this.rechercherSatisfacion = function () {
        if (this.down !== this.target) { // not on target yet?
            if (this.up === null) { // persuit happinness, go somewhere not restricted
                this.neighbours.forEach(neighbour => {
                    if (neighbour.up === null && restrictions.includes(neighbour)===false) {
                        this.down.up = null;
                        this.down = neighbour;
                        neighbour.up = this;
                    }
                });
            } else { // attack it
                this.attack(this.up, [this.target, this]) // restrict me and my objective
            }
        } else {
            this.state = "s"
        }
    };

    this.run = function () {
        if (this.state == "s") {
            return;
        }
        else if (this.state == "f") {
            if (this.restrictions.length == 0) { // no restrictions? go find happiness
                this.state = "rs" // go find happiness
            } else {
                // escape
                this.fairFuit();
            }
        }
        else if (this.state == "rs") {
            // try to get to the target
            this.rechercherSatisfacion();
        }
    };
}

var blocks = [];

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

blocks.forEach(block => {
    block.neighbours = blocks;
});

var jj = 100
while (jj > 0) {
    blocks.forEach(block => {
        if (block.fixed == false) {
            block.run()
        }
    });
    --jj;
}