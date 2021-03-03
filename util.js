const generate_strings = (max_num_bits, alphabet) => {
    let strings = [''];
    for (let i = 1; i <= max_num_bits; i++) {
        let aux = [...strings];
        alphabet.forEach(symbol => {
            strings = strings.concat(aux.map(str => str + symbol));
        })
    }
    return [...new Set(strings)]; // remove dupes
}

module.exports = {
    generate_strings
}