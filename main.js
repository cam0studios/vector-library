/** A class for 2D and 3D vectors */
export default class Vector {

	/**
	 * Create a new vector object
	 * @param {number} x - The x component of the vector
	 * @param {number} y - The y component of the vector
	 * @param {number} [z=0] - The z component of the vector (optional)
	 * @returns {Vector} A new Vector object
	 * @example
	 * let a = new Vector(1, 2);
	 */
	constructor(x, y, z = 0) {
		if (arguments.length > 1) {
			this.x = x;
			this.y = y;
			this.z = z;
			return this;
		} else {
			console.error("Error: Vector expected 2 or 3 arguments, not " + arguments.length);
		}
	}

	/**
	 * Add a vector to this vector
	 * @param {number|Vector} v - The vector to add, or the x component of the vector
	 * @param {number} y - The y component of the vector (optional)
	 * @param {number} z - The z component of the vector (optional)
	 * @returns {Vector} The vector object
	 */
	add(v, y, z) {
		if (arguments.length > 1) {
			if (arguments.length == 2) z = 0;
			this.x += v;
			this.y += y;
			this.z += z;
		} else {
			this.x += v.x;
			this.y += v.y;
			this.z += v.z;
		}
		return this;
	}

	/**
	 * Subtract a vector from this vector
	 * @param {number|Vector} v - The vector to subtract, or the x component of the vector
	 * @param {number} y - The y component of the vector (optional)
	 * @param {number} z - The z component of the vector (optional)
	 * @returns {Vector} The vector object
	 */
	sub(v, y, z) {
		if (arguments.length > 1) {
			if (arguments.length == 2) z = 0;
			this.x -= v;
			this.y -= y;
			this.z -= z;
		} else {
			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;
		}
		return this;
	}

	/**
	 * Divide this vector by a number or vector
	 * @param {number|Vector} v - The number or vector to divide by
	 * @returns {Vector} The vector object
	 */
	div(n) {
		if (n instanceof Vector) {
			if (n.x == 0 || n.y == 0 || n.z == 0) {
				console.error("Error: div parameter cannot be 0");
			} else {
				this.x /= n.x;
				this.y /= n.y;
				this.z /= n.z;
			}
		} else {
			if (n == 0) {
				console.error("Error: div parameter cannot be 0");
			} else {
				this.x /= n;
				this.y /= n;
				this.z /= n;
			}
		}
		return this;
	}

	/**
	 * Multiply this vector by a number or vector
	 * @param {number|Vector} v - The number or vector to multiply by
	 * @returns {Vector} The vector object
	 */
	mult(n) {
		if (n instanceof Vector) {
			this.x *= n.x;
			this.y *= n.y;
			this.z *= n.z;
		} else {
			this.x *= n;
			this.y *= n;
			this.z *= n;
		}
		return this;
	}
	/**
	 * Set this vector to another vector
	 * @param {number|Vector} v - The vector to add, or the x component of the vector
	 * @param {number} [y=0] - The y component of the vector (optional)
	 * @param {number} [z=0] - The z component of the vector (optional)
	 * @returns {Vector} The vector object
	 */
	set(v, y, z) {
		if (arguments.length > 1) {
			if (arguments.length == 2) z = 0;
			this.x = v;
			this.y = y;
			this.z = z;
		} else {
			this.x = v.x;
			this.y = v.y;
			this.z = v.z;
		}
		return this;
	}

	/**
	 * Rotate this vector by an angle
	 * @param {number} angle - The angle to rotate by in radians
	 * @param {string} [axis="z"] - The axis to rotate around (optional)
	 * @returns {Vector} The vector object
	 */
	rotate(angle, axis = "z") {
		let rot;
		if (axis == "x") rot = this.yz;
		if (axis == "y") rot = this.xz;
		if (axis == "z") rot = this.xy;
		let a = rot.heading + angle;
		let m = rot.mag;
		rot.set(Math.cos(a) * m, Math.sin(a) * m);
		if (axis == "x") this.yz = rot;
		if (axis == "y") this.xz = rot;
		if (axis == "z") this.xy = rot;
		return this;
	}

	/**
	 * Normalize this vector
	 * @returns {Vector} The normalized vector object
	 */
	normalize() {
		this["/="](this.mag);
		return this;
	}

	/**
	 * Reflect this vector off another vector
	 * @param {Vector} v - The number or vector to reflect off of
	 * @returns {Vector} The vector object
	 */
	reflect(v) {
		let sub = (v)["*"](this.dot(v));
		this["-="](sub);
		this["*="](-1);
		this["+="](sub);
		return this;
	}


	/**
	 * Get the squared magnitude of the vector
	 * @returns {number} The squared magnitude
	 */
	get magSq() {
		return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
	}

	/**
	 * Get the magnitude of the vector
	 * @returns {number} The magnitude
	 */
	get mag() {
		return Math.sqrt(this.magSq);
	}

	/**
	 * Get the normalized vector
	 * @returns {Vector} The normalized vector
	 */
	get normalized() {
		return this.copy.normalize();
	}

	/**
	 * Get a copy of the vector
	 * @returns {Vector} The copied vector
	 */
	get copy() {
		return new Vector(this.x, this.y, this.z);
	}

	/**
	 * Get the heading of the vector
	 * @returns {number} The heading in radians
	 */
	get heading() {
		return Math.atan2(this.y, this.x);
	}

	/**
	 * Get the absolute value of the vector
	 * @returns {number} The vector, with all components positive
	 */
	get abs() {
		return new Vector(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
	}

	/**
	 * Get the maximum between this vector and another vector
	 * @param {Vector} v - The other vector
	 * @returns {Vector} The maximum vector
	 */
	max(v) {
		return new Vector(Math.max(this.x, v.x), Math.max(this.y, v.y), Math.max(this.z, v.z));
	}

	/**
	 * Get the minimum between this vector and another vector
	 * @param {Vector} v - The other vector
	 * @returns {Vector} The minimum vector
	 */
	min(v) {
		return new Vector(Math.min(this.x, v.x), Math.min(this.y, v.y), Math.min(this.z, v.z));
	}

	/**
	 * Get the dot product between this vector and another vector
	 * @param {Vector} v - The other vector
	 * @returns {number} The dot product
	 */
	dot(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}

	/**
	 * Linearly interpolate between this vector and another vector
	 * @param {Vector} v - The other vector
	 * @returns {Vector} The lerped vector
	 */
	lerp(v, n) {
		return (this)["+"](((v)["-"](this))["*"](n));
	}

	/**
	 * Get the 2D vector (x, y) of this vector
	 * @returns {Vector} The 2D vector
	 */
	get xy() {
		return new Vector(this.x, this.y);
	}

	/**
	 * Get the 2D vector (x, z) of this vector
	 * @returns {Vector} The 2D vector
	 */
	get xz() {
		return new Vector(this.x, this.z);
	}

	/**
	 * Get the 2D vector (y, z) of this vector
	 * @returns {Vector} The 2D vector
	 */
	get yz() {
		return new Vector(this.y, this.z);
	}

	/**
	 * Sets the x and y components of this vector
	 * @param {Vector} v - The 2D vector to set
	 * @returns {Vector} The modified vector
	 */
	set xy(v) {
		this.set(v.x, v.y, this.z);
	}

	/**
	 * Sets the x and z components of this vector
	 * @param {Vector} v - The 2D vector to set
	 * @returns {Vector} The modified vector
	 */
	set xz(v) {
		this.set(v.x, this.y, v.y);
	}

	/**
	 * Sets the y and z components of this vector
	 * @param {Vector} v - The 2D vector to set
	 * @returns {Vector} The modified vector
	 */
	set yz(v) {
		this.set(this.x, v.x, v.y);
	}


	/**
	 * Multiplies this vector to a magnitude
	 * @param {number} n - The magnitude to set to
	 * @returns {Vector} The modified vector
	 */
	set mag(n) {
		this.mult(n / this.mag);
		return this;
	}

	/**
	 * Rotate this vector to a heading (2D only)
	 * @param {Vector} v - The 2D vector to set
	 * @returns {Vector} The modified vector
	 */
	set heading(n) {
		this.rotate(n - this.heading);
		return this;
	}


	/**
	 * Add two vectors
	 * @param {Vector} v1 - The first vector
	 * @param {Vector} v2 - The second vector
	 * @returns {Vector} The completed result
	 */
	static add(v1, v2) {
		let v = v1.copy;
		v.add(v2);
		return v;
	}

	/**
	 * Subtracts a vector from another vector
	 * @param {Vector} v1 - The first vector
	 * @param {Vector} v2 - The second vector
	 * @returns {Vector} The completed result
	 */
	static sub(v1, v2) {
		let v = v1.copy;
		v.sub(v2);
		return v;
	}

	/**
	 * Multiplies two vectors
	 * @param {Vector} v1 - The first vector
	 * @param {Vector} v2 - The second vector
	 * @returns {Vector} The completed result
	 */
	static mult(v, n) {
		let v2 = v.copy;
		v2.mult(n);
		return v2;
	}

	/**
	 * Divides a vector by another vector
	 * @param {Vector} v1 - The first vector
	 * @param {Vector} v2 - The second vector
	 * @returns {Vector} The completed result
	 */
	static div(v, n) {
		let v2 = v.copy;
		v2.div(n);
		return v2;
	}

	/**
	 * Rotates a vector by an angle and an axis
	 * @param {Vector} v - The vector
	 * @param {Vector} angle - The angle to rotate by
	 * @param {Vector} [axis="z"] - The axis to rotate around
	 * @returns {Vector} The completed result
	 */
	static rotate(v, angle, axis) {
		let v2 = v.copy;
		v2.rotate(angle, axis);
		return v2;
	}

	/**
	 * Gets the dot product of two vectors
	 * @param {Vector} v1 - The first vector
	 * @param {Vector} v2 - The second vector
	 * @returns {Vector} The completed result
	 */
	static dot(v1, v2) {
		return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z);
	}

	/**
	 * Linearly interpolates between two vectors
	 * @param {Vector} v1 - The first vector
	 * @param {Vector} v2 - The second vector
	 * @returns {Vector} The completed result
	 */
	static lerp(v1, v2, n) {
		return v1.lerp(v2, n);
	}

	/**
	 * Gets the normalized vector of a vector
	 * @param {Vector} v - The vector
	 * @returns {Vector} The completed result
	 */
	static normalize(v) {
		return v.normalized;
	}

	/**
	 * Gets a vector (0, 0, 0)
	 * @returns {Vector} (0, 0, 0)
	 */
	static get zero() {
		return new Vector(0, 0, 0);
	}

	/**
	 * Add a vector to this vector
	 * @param {number|Vector} v - The vector to add, or the x component of the vector
	 * @param {number} y - The y component of the vector (optional)
	 * @param {number} z - The z component of the vector (optional)
	 * @returns {Vector} The vector object
	 */
	"+="(v, y, z) {
		return this.add(...arguments);
	}

	/**
	 * Subtracts a vector from this vector
	 * @param {number|Vector} v - The vector to subtract, or the x component of the vector
	 * @param {number} y - The y component of the vector (optional)
	 * @param {number} z - The z component of the vector (optional)
	 * @returns {Vector} The vector object
	 */
	"-="(v, y, z) {
		return this.sub(...arguments);
	}

	/**
	 * Divides this vector by another vector
	 * @param {number|Vector} v - The vector to divide by, or the x component of the vector
	 * @param {number} y - The y component of the vector (optional)
	 * @param {number} z - The z component of the vector (optional)
	 * @returns {Vector} The vector object
	 */
	"/="(n) {
		return this.div(...arguments);
	}

	/**
	 * Multiplies his vector by another vector
	 * @param {number|Vector} v - The vector to multiply by, or the x component of the vector
	 * @param {number} y - The y component of the vector (optional)
	 * @param {number} z - The z component of the vector (optional)
	 * @returns {Vector} The vector object
	 */
	"*="(n) {
		return this.mult(...arguments);
	}

	/**
	 * Sets this vector to another vector
	 * @param {number|Vector} v - The vector to set to, or the x component of the vector
	 * @param {number} y - The y component of the vector (optional)
	 * @param {number} z - The z component of the vector (optional)
	 * @returns {Vector} The vector object
	 */
	"="(v, y, z) {
		this.set(...arguments);
	}

	/**
	 * Adds two vectors
	 * @param {Vector} v - The vector to add to this one
	 * @returns {Vector} The vector object
	 */
	"+"(v) {
		return Vector.add(this, v);
	}

	/**
	 * Subtracts two vectors
	 * @param {Vector} v - The vector to subtract from this one
	 * @returns {Vector} The vector object
	 */
	"-"(v) {
		return Vector.sub(this, v);
	}

	/**
	 * Divides two vectors
	 * @param {number|Vector} n - The number or vector to divide this one by
	 * @returns {Vector} The vector object
	 */
	"/"(n) {
		return Vector.div(this, n);
	}

	/**
	 * Multiplies two vectors
	 * @param {Vector} v - The vector to multiply by this one
	 * @returns {Vector} The vector object
	 */
	"*"(n) {
		return Vector.mult(this, n);
	}

	/**
	 * Gets the remainder of two vectors
	 * @param {Vector} v - The vector to divide this one by and get the remainder
	 * @returns {Vector} The vector object
	 */
	"%"(n) {
		return new Vector(this.x % n, this.y % n, this.z % n);
	}

	/**
	 * Checks if two vectors are equal
	 * @param {Vector} vector - The vector to check against
	 * @returns {boolean} If the vectors are equal
	 */
	"=="(vector) {
		return this.x == vector.x && this.y == vector.y && this.z == vector.z;
	}

	[Symbol.toPrimitive](hint) {
		switch (hint) {
			case "string":
				return this.toString();
			case "number":
			default:
				return this.toNumber();
		}
	}


	/**
	 * Converts the vector to a string (x, y, z) or (x, y) if z == 0
	 * @returns {string} The stringified vector
	 */
	toString() {
		return this.z == 0 ? `(${this.x}, ${this.y})` : `(${this.x}, ${this.y}, ${this.z})`;
	}

	/**
	 * Converts the vector to a number, equal to the magnitude
	 * @returns {Vector} The number-ified vector
	 */
	toNumber() {
		return this.mag;
	}
}