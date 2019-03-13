class Student {
	constructor(id, noise, compatibilityMatrix) {
		this.id = id;
		if (typeof noise !== 'number') {
			throw new TypeError("Noise must be of type boolean.");
		} else if (!(0 <= noise <= 1)) {
			throw new Error("Noise is not between 0 or 1.");
		} else {
			this.noise = noise;
		}

		for (var compat in Object.keys(compatibilityMatrix)) {
			if (typeof compatibilityMatrix[Object.keys(compatibilityMatrix)[compat]] !== "number") {
				throw new TypeError("Compatibility matrix is malformed (" + Object.keys(compatibilityMatrix)[compat] + " value is not a number.)");
			} else if (!(0 <= compatibilityMatrix[Object.keys(compatibilityMatrix)[compat]] <= 1)) {
				throw new Error("Compatibility matrix is malformed. (" + Object.keys(compatibilityMatrix)[compat] + " value must be between 0 and 1, inclusive.)");
			}
		}

		this.compatibilityMatrix = compatibilityMatrix;
	}

	getCompatibility(studentB) {
		if (!Object.keys(this.compatibilityMatrix).includes(studentB.id)) {
			throw new Error(`"${this.id} does not have a value for "${studentB.id}" in its compatibility matrix.`);
		} else if (!Object.keys(studentB.compatibilityMatrix).includes(this.id)) {
			throw new Error(`${studentB.id} does not have a value for "${this.id}" in its compatibility matrix.`);
		}
		var noiseFactor = (studentB.noise + this.noise) / 2;
		return (((-1.5 * Math.pow(noiseFactor, 2)) + (1.2 * noiseFactor) + 0.5) * (1/3)) + ((((this.compatibilityMatrix[studentB.id]) + studentB.compatibilityMatrix[this.id]) / 2) * (2/3));
	}
}

module.exports = Student;