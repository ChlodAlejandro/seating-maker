var SM = require("./index.js");
console.log('=== [SeatingMaker] ===');
console.log(SM);

randomStudents = [];
studentIDs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234";
for (var c = 0; c < studentIDs.length; c++) {
	let student = new SM.Student(studentIDs.charAt(c), +(Math.random().toFixed(2)), {});
	for (var d = 0; d < studentIDs.length; d++) {
		if (d !== c) {
			student.compatibilityMatrix[studentIDs.charAt(d)] = +(Math.random().toFixed(2));
		}
	}
	randomStudents.push(student);
	console.log(`New student - ${studentIDs.charAt(c)}:`);
	console.log(`\tNoise: ${student.noise}`);
	console.log('\tCompatibility Table:');
	var compatString = "\t{";
	for (var studBId in student.compatibilityMatrix) {
		compatString = compatString + studBId + ": " + student.compatibilityMatrix[studBId] + ", ";
	}
	compatString = compatString.substr(0, compatString.length - 2) + "}";
	console.log(compatString);
}

console.log("=== [COMPATIBILITIES] ===");

for (var s = 0; s < randomStudents.length; s++) {
	console.log("Compatibilities for student: " + randomStudents[s].id);
	let student = randomStudents[s];
	for (var s2 = 0; s2 < randomStudents.length; s2++) {
		if (s !== s2) {
			let student2 = randomStudents[s2];
			console.log(`${student.id} => ${student2.id}: ${student.getCompatibility(student2).toFixed(4)}`);
			console.log(`${student2.id} => ${student.id}: ${student2.getCompatibility(student).toFixed(4)}`);
			console.log(``);
		}
	}
}