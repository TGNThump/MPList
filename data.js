const colors = require('colors');
const mps = require('./data.json');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.on('line', (input) => {
	if (input === ""){
		return;
	} else if (input === "clear"){
		console.clear();
	} else if (input === "all"){
		input = "";
	}

	// if (input === ""){
		// console.table(Object.values(mps).map(mp => {
		// 	let role = mp.posts[0];
		// 	if (role){
		// 		if (role.includes('(')) role = role.substring(0, role.indexOf("(")).trim();
		// 	}

		// 	return {
		// 		name: mp.displayAs,
		// 		party: mp.party,
		// 		constituency: mp.constituency,
		// 		gender: mp.gender,
		// 		age: mp.age,
		// 		twitter: mp.twitter,
		// 		// role: role,
		// 		position: mp.position,
		// 	}
		// }));
	// } else {
		let max = Object.values(mps).map(mp => mp.name.length + mp.constituency.length + 2).reduce((a,b) => a > b ? a : b);
		var results = Object.values(mps).filter(mp => mp.name.toLowerCase().includes(input.toLowerCase()) || mp.displayAs.toLowerCase().includes(input.toLowerCase()));
		if (input === "") results = Object.values(mps);
		results.forEach(mp => {
			let party = (party => {
				switch(party){
					case "Scottish National Party": return " SNP ".bgYellow.black;
					case "Liberal Democrat": return " LIB ".bgWhite.black;
					case "Conservative": return " CON ".bgBlue;
					case "Labour": return " LAB ".bgRed;
					case "Independent": return " IND ".bgMagenta;
					case "Democratic Unionist Party": return " DUP ".bgCyan;
					case "Green Party": return " GRE ".bgGreen;
					case "Plaid Cymru": return " CYM ";
					case "Sinn Féin": return " SNF ";
					case "Speaker": return "SPEAK".bgWhite.black;
					default: return party;
				}
			})(mp.party);

			let age = new String(mp.age ? mp.age : "??");
			let position = (mp.position ? mp.position.substring(0,7) : "NONE");
			while (position.length <= 6) position += " ";

			let role = mp.posts.reduce((a,b) => a + (a.length > 0 ? ", " : " ") + b, "");

			let line = party + " " + mp.displayAs.bold + " " + ("(" + mp.constituency + ")").grey;

			line += (" ".repeat(max - (mp.displayAs + mp.constituency).length)) + age.yellow + " " + mp.gender.substring(0,1).red + " " + position + (mp.posts.length > 0 ? (" " + mp.posts[0].gray) : "");
			console.log(line);

			for (let i = 1; i < mp.posts.length; i++){
				console.log(" ".repeat(max + 22) + mp.posts[i].gray);
			}

		})
	// }


    // bgBlack
    // bgRed
    // bgGreen
    // bgYellow
    // bgBlue
    // bgMagenta
    // bgCyan
    // bgWhite


});