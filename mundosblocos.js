
function Agent(id) {
    this.id = id;
    this.state = "f"; // s stifait, rf rechercherFuit, rs rechercherSatisfait, f fairFuit  
    this.target = -1;
    this.up = -1;
    this.down = -1;
    this.fixed = false;
    this.restrictions = [];

    this.fairFuit = function () {
        console.log("test");
    };
    this.rechercherSatisfacion = function () {
        console.log("test");
    };

    this.run = function () {
        if (this.state == "s") {
            return;
        }
        else if (this.state == "f") {
            if (this.restrictions.length == 0) {
                this.state = "rs"
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

var ag1 = new Agent(1);
ag1.fixed = true;
blocks.push(ag1)

var ag2 = new Agent(2);
ag2.fixed = true;
blocks.push(ag2)

var ag3 = new Agent(3);
ag3.fixed = true;
blocks.push(ag3)

// a
var ag4 = new Agent(4);
ag4.target = 3;
blocks.push(ag4)

//b
var ag5 = new Agent(5);
ag5.target = 4;
blocks.push(ag5)

//c
var ag6 = new Agent(6);
ag6.target = 5;
blocks.push(ag6)

var jj = 100
while (jj > 0) {
    blocks.forEach(block => {
        if (block.fixed == false) {
            block.run()
        }
    });
    --jj;
}

