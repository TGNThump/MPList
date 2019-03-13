const colors = require('colors');
const mps = require('./mps.js');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.on('line', (input) => {
	if (input === ""){
		return;
	} else if (input === "clear"){
		console.clear();
		return;
	} else if (input === "all"){
		input = "";
	}

	let partyCodes = {
		"SNP": "Scottish National Party",
		"LIB": "Liberal Democrat",
		"CON": "Conservative",
		"LAB": "Labour",
		"IND": "Independent",
		"DUP": "Democratic Unionist Party",
		"GRE": "Green Party",
		"CYM": "Plaid Cymru",
		"SNF": "Sinn Féin",
		"SPEAK": "Speaker",
	};

	let max = Object.values(mps).map(mp => mp.name.length + mp.constituency.length + 2).reduce((a,b) => a > b ? a : b);
	var results;
	if (input === "") results = Object.values(mps);
	else if (["LEAVE", "REMAIN", "UNKNOWN"].includes(input.toUpperCase())){
		results = Object.values(mps).filter(mp => mp.position === input.toUpperCase());
	} else if (input.toUpperCase() === "NONE"){
		results = Object.values(mps).filter(mp => mp.position == null);
	} else if (input.toUpperCase() in partyCodes){
		results = Object.values(mps).filter(mp => mp.party === partyCodes[input.toUpperCase()]);
	} else results = Object.values(mps).filter(mp => mp.displayAs.toLowerCase().includes(input.toLowerCase()));

	results.forEach(mp => mp.print())
	console.log(new String(results.length).yellow + " results");
});