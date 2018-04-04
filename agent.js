
//agent class
function Agent(id) {
    this.id = id;
    this.state = "f"; // s stifait, rf rechercherFuit, rs rechercherSatisfait, f fairFuit  
    this.target = {};
    this.up = null;
    this.down = null;
    this.fixed = false;
    this.restrictions = [];
    this.neighbours = []; // holds all other blocks
    this.movements = []; // reference to movements

    this.attack = function (attackedAgent, restrictionArray) {
        restrictionArray.forEach(r => {
            attackedAgent.restrictions.push(r);
        });
        attackedAgent.state = "f"
    };
    this.moveTo = function (moveToObj) {
        // register it
        this.movements.push({
            element: this.id,
            from: this.down.id,
            to: moveToObj.id
        });

        this.down.up = null;
        this.down = moveToObj;
        moveToObj.up = this;
        
    };
    this.moveSomewhere = function () { // this can lock, if all possible places are restrict
        if (this.up === null) { // check if can move first
            for (var n of this.neighbours) {
                if (n.up == null && this.restrictions.includes(n) == false && this != n) {
                    this.moveTo(n)
                    return true;
                }
            }
            console.log(this.id + ": Erro fatal, sem lugar para mover!! Inconsistencia de modelagem");
        }
        return false;
    };
    this.fairFuit = function () {
        if (this.up === null) { // find someplace to escape
            if (this.moveSomewhere() == true) {
                this.state = "rs"; // if scaped, go back on trying to find happiness
            }
        } else {
            this.attack(this.up, [this]); // atack the upper block and demand to not come back on me
        }
    };
    this.rechercherSatisfacion = function () { // persuit happinness
        if (this.down !== this.target) { // not on target yet?
            if (this.up === null) { // can i move? (no upper blocks)
                if (this.target.up === null) { // is my objective available?
                    this.moveTo(this.target)
                    return true;
                } else { // move to someplace else that is not restricted
                    this.moveSomewhere();
                }

                if (this.down == this.target) {
                    this.state = "s";
                }
            } else { // attack it
                this.attack(this.up, [this.target, this]) // restrict me and my objective
            }
        } else {
            this.state = "s" // I'm happy :^)
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