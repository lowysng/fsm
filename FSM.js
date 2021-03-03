const { assert } = require('console');
const { exit } = require('process');
const fs = require('fs');

class FSM {
	constructor(fsm_file) {
		try {
			const data = fs.readFileSync(fsm_file).toString();
			let tokens = data.split('\n');
			tokens = tokens.map(line => line.split(';'));

			this.description = tokens[0][0];
			this.states = tokens[1];
			this.alphabet = tokens[2];
			this.start_state = tokens[3][0];
			this.accept_states = tokens[4];
			const transition_table = tokens.slice(5);
			this.transition_function = make_transition_function(this.states, this.alphabet, transition_table);

			const is_start_state_in_states = this.states.findIndex(s => s === this.start_state) !== -1;
			assert(is_start_state_in_states, 'warning: this.start_state is not in this.states');

			const is_accept_states_subset_of_states = this.accept_states.every(a_state => this.states.includes(a_state));
			assert(is_accept_states_subset_of_states, 'warning: this.accept_states is not a subset of this.states');

			this.states.forEach(state => {
				this.alphabet.forEach(symbol => {
					assert(this.transition_function(state, symbol), 'warning: this.transition_function is incomplete');
				})
			})

		} catch (err) {
			console.log(err);
			exit();
		}
	}

	compute = string => {
		let state = this.start_state;
		for (let i = 0; i < string.length; i++) {
			state = this.transition_function(state, string[i]);
		}
		return this.accept_states.includes(state);
	}
}

const make_transition_function = (states, alphabet, transition_table) => {
	return (state, symbol) => {
		const state_index = states.findIndex(s => s === state);
		const symbol_index = alphabet.findIndex(s => s === symbol);
		return transition_table[state_index][symbol_index];
	}
}

module.exports = {
	FSM
}
