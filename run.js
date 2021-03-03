const path = require('path');
const { FSM } = require('./FSM');
const { generate_strings } = require('./util');

const file = path.join('machines', process.argv[2]);
const fsm = new FSM(file);
const bit_strings = generate_strings(process.argv[3] || 3, fsm.alphabet);
console.log(`machine: ${fsm.description}`);
bit_strings.forEach(str => {
    const accept = fsm.compute(str);
    console.log(`${!accept ? '\t\t' : ''}${str ? str : '\'\''}\t${accept}`)
})