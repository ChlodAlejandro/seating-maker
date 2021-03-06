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

var bestStudents;
var bestStudentsScore = 0;
var worstStudents;
var worstStudentsScore = 1;

for (var s = 0; s < randomStudents.length; s++) {
	console.log("Compatibilities for student: " + randomStudents[s].id);
	let student = randomStudents[s];
	var bestStudent;
	var bestStudentScore = 0;
	var worstStudent;
	var worstStudentScore = 1;
	for (var s2 = 0; s2 < randomStudents.length; s2++) {
		if (s !== s2) {
			let student2 = randomStudents[s2];
			var compat = student.getCompatibility(student2).toFixed(4);
			console.log(`${student.id} => ${student2.id}: ${compat}`);
			if (bestStudentScore < compat) {
				bestStudent = student2.id;
				bestStudentScore = compat;
			}
			if (bestStudentsScore < compat) {
				bestStudents = `${student.id} => ${student2.id}`;
				bestStudentsScore = compat;
			}
			if (worstStudentScore > compat) {
				worstStudent = student2.id;
				worstStudentScore = compat;
			}
			if (worstStudentsScore > compat) {
				worstStudents = `${student.id} => ${student2.id}`;
				worstStudentsScore = compat;
			}
		}
	}
	console.log("");
	console.log(`Best compatible with: \"${bestStudent}\" (${bestStudentScore})`);
	console.log(`Worst compatible with: \"${worstStudent}\" (${worstStudentScore})`);
	console.log("");
}

console.log("");
console.log(`Best compatibilities: \"${bestStudents}\" (${bestStudentsScore})`);
console.log(`Worst compatibilities: \"${worstStudents}\" (${worstStudentsScore})`);
console.log("");