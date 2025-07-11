/** A class for 2D and 3D vectors */
export default class Vector {
	x: number;
	y: number;
	z: number;
	dims: 2 | 3;
	/**
	 * Create a new vector object
	 * @example
	 * let a = new Vector(1, 2);
	 * @example
	 * let a = new Vector(1, 2, 3);
	 */
	constructor(x: number, y: number);
	constructor(x: number, y: number, z: number);
	constructor(x: number, y: number, z?: number) {
		this.x = x;
		this.y = y;
		if (typeof z === "number") {
			this.z = z;
			this.dims = 3;
		} else {
			this.dims = 2;
		}
	}

	/**
	 * Add a vector to this vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * a.add(b);
	 * @example
	 * let a = new Vector(1, 2);
	 * a.add(3, 4);
	 */
	add(v: Vector): Vector;
	add(x: number, y: number): Vector;
	add(x: number, y: number, z: number): Vector;
	add(v: Vector | number, y?: number, z?: number): Vector {
		if (v instanceof Vector) {
			this.x += v.x;
			this.y += v.y;
			if (this.dims === 3 && v.dims === 3) {
				this.z += v.z;
			}
		} else if (typeof y === "number") {
			this.x += v;
			this.y += y;
			if (this.dims === 3 && typeof z === "number") {
				this.z += z;
			}
		}
		return this;
	}

	/**
	 * Subtract a vector from this vector
	 * @example
	 * let a = new Vector(3, 4);
	 * let b = new Vector(1, 2);
	 * a.sub(b);
	 * @example
	 * let a = new Vector(3, 4);
	 * a.sub(1, 2);
	 */
	sub(v: Vector): Vector;
	sub(x: number, y: number): Vector;
	sub(x: number, y: number, z: number): Vector;
	sub(v: Vector | number, y?: number, z?: number): Vector {
		if (v instanceof Vector) {
			this.x -= v.x;
			this.y -= v.y;
			if (this.dims === 3 && v.dims === 3) {
				this.z -= v.z;
			}
		} else if (typeof y === "number") {
			this.x -= v;
			this.y -= y;
			if (this.dims === 3 && typeof z === "number") {
				this.z -= z;
			}
		}
		return this;
	}

	/**
	 * Multiply this vector by a number or vector
	 * @example
	 * let a = new Vector(1, 2);
	 * a.mult(2);
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * a.mult(b);
	 */
	mult(v: Vector): Vector;
	mult(n: number): Vector;
	mult(v: Vector | number): Vector {
		if (v instanceof Vector) {
			this.x *= v.x;
			this.y *= v.y;
			if (this.dims === 3 && v.dims === 3) {
				this.z *= v.z;
			}
		} else {
			this.x *= v;
			this.y *= v;
			if (this.dims === 3) {
				this.z *= v;
			}
		}
		return this;
	}

	/**
	 * Divide this vector by a number or vector
	 * @example
	 * let a = new Vector(1, 2);
	 * a.div(2);
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * a.div(b);
	 */
	div(v: Vector): Vector;
	div(n: number): Vector;
	div(v: Vector | number): Vector {
		if (v instanceof Vector) {
			if (v.x === 0 || v.y === 0) {
				throw new Error("Div parameter cannot be zero");
			}
			this.x /= v.x;
			this.y /= v.y;
			if (this.dims === 3 && v.dims === 3) {
				if (v.z === 0) {
					throw new Error("Div parameter cannot be zero");
				}
				this.z /= v.z;
			}
		} else {
			if (v === 0) {
				throw new Error("Div parameter cannot be zero");
			}
			this.x /= v;
			this.y /= v;
			if (this.dims === 3) {
				this.z /= v;
			}
		}
		return this;
	}

	/**
	 * Sets this vector to another vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * a.set(b);
	 * @example
	 * let a = new Vector(1, 2);
	 * a.set(3, 4);
	 */
	set(v: Vector): Vector;
	set(x: number, y: number): Vector;
	set(x: number, y: number, z: number): Vector;
	set(v: Vector | number, y?: number, z?: number): Vector {
		if (v instanceof Vector) {
			this.x = v.x;
			this.y = v.y;
			if (this.dims === 3 && v.dims === 3) {
				this.z = v.z;
			}
		} else if (typeof y === "number") {
			this.x = v;
			this.y = y;
			if (this.dims === 3 && typeof z === "number") {
				this.z = z;
			}
		}
		return this;
	}

	/**
	 * Rotate this vector by an angle (in radians)
	 * @example
	 * let a = new Vector(1, 0);
	 * a.rotate(Math.PI / 2);
	 * @example
	 * let a = new Vector(1, 0, 0);
	 * a.rotate(Math.PI / 2, "x");
	 */
	rotate(angle: number, axis: "x" | "y" | "z" = "z"): Vector {
		if (this.dims < 3 && axis !== "z") {
			throw new Error("Cannot rotate 2D vector around x or y axis");
		}
		let rot: Vector;
		if (axis === "x") rot = this.yz;
		else if (axis === "y") rot = this.xz;
		else if (axis === "z") rot = this.xy;
		else throw new Error("Invalid axis for rotation");
		let a = rot.heading + angle;
		let m = rot.mag;
		rot.set(Math.cos(a) * m, Math.sin(a) * m);
		if (axis === "x") this.yz = rot;
		if (axis === "y") this.xz = rot;
		if (axis === "z") this.xy = rot;
		return this;
	}

	/**
	 * Normalize this vector
	 * @example
	 * let a = new Vector(3, 4);
	 * a.normalize();
	 */
	normalize(): Vector {
		if (this.mag === 0) {
			console.warn("Cannot normalize a zero vector");
			return this;
		}
		this["/="](this.mag);
		return this;
	}

	/**
	 * Reflect this vector off of another vector
	 * @example
	 * let a = new Vector(2, 0);
	 * let b = new Vector(1, 1).normalized;
	 * a.reflect(b);
	 */
	reflect(v: Vector): Vector {
		let sub = (v)["*"](this.dot(v));
		this["-="](sub);
		this["*="](-1);
		this["+="](sub);
		return this;
	}

	/**
	 * Get the squared magnitude of this vector
	 * @example
	 * let a = new Vector(3, 4);
	 * let n = a.magSq;
	 */
	get magSq(): number {
		if (this.dims < 3) {
			return this.x * this.x + this.y * this.y;
		} else {
			return this.x * this.x + this.y * this.y + this.z * this.z;
		}
	}

	/**
	 * Get the magnitude of this vector
	 * @example
	 * let a = new Vector(3, 4);
	 * let n = a.mag;
	 */
	get mag(): number {
		return Math.sqrt(this.magSq);
	}

	/**
	 * Get the normalized vector
	 * @example
	 * let a = new Vector(3, 4);
	 * let b = a.normalized;
	 */
	get normalized(): Vector {
		return this.copy.normalize();
	}

	/**
	 * Get a copy of this vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = a.copy;
	 */
	get copy(): Vector {
		if (this.dims < 3) {
			return new Vector(this.x, this.y);
		} else {
			return new Vector(this.x, this.y, this.z);
		}
	}

	/**
	 * Get the heading of the vector (in radians)
	 * @example
	 * let a = new Vector(1, 2);
	 * let n = a.heading;
	 */
	get heading(): number {
		return Math.atan2(this.y, this.x);
	}

	/**
	 * Get the absolute value (by component) of this vector
	 * @example
	 * let a = new Vector(-1, -2, 3);
	 * let b = a.abs;
	 */
	get abs(): Vector {
		if (this.dims < 3) {
			return new Vector(Math.abs(this.x), Math.abs(this.y));
		} else {
			return new Vector(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
		}
	}

	/**
	 * Get the maximum (by component) between this vector and another vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, -1);
	 * let c = a.max(b);
	 */
	max(v: Vector): Vector;
	max(x: number, y: number): Vector;
	max(x: number, y: number, z: number): Vector;
	max(v: Vector | number, y?: number, z?: number): Vector {
		if (v instanceof Vector) {
			if (this.dims < 3 || v.dims < 3) {
				return new Vector(
					Math.max(this.x, v.x),
					Math.max(this.y, v.y)
				);
			} else {
				return new Vector(
					Math.max(this.x, v.x),
					Math.max(this.y, v.y),
					Math.max(this.z, v.z)
				)
			}
		} else if (typeof y === "number") {
			if (this.dims === 3 && typeof z === "number") {
				return new Vector(
					Math.max(this.x, v),
					Math.max(this.y, y),
					Math.max(this.z, z)
				);
			} else {
				return new Vector(
					Math.max(this.x, v),
					Math.max(this.y, y)
				);
			}
		} else {
			return Vector.zero(this.dims);
		}
	}

	/**
	 * Get the minimum (by component) between this vector and another vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, -1);
	 * let c = a.min(b);
	 */
	min(v: Vector): Vector;
	min(x: number, y: number): Vector;
	min(x: number, y: number, z: number): Vector;
	min(v: Vector | number, y?: number, z?: number): Vector {
		if (v instanceof Vector) {
			if (this.dims < 3 || v.dims < 3) {
				return new Vector(
					Math.min(this.x, v.x),
					Math.min(this.y, v.y)
				);
			} else {
				return new Vector(
					Math.min(this.x, v.x),
					Math.min(this.y, v.y),
					Math.min(this.z, v.z)
				)
			}
		} else if (typeof y === "number") {
			if (this.dims === 3 && typeof z === "number") {
				return new Vector(
					Math.min(this.x, v),
					Math.min(this.y, y),
					Math.min(this.z, z)
				);
			} else {
				return new Vector(
					Math.min(this.x, v),
					Math.min(this.y, y)
				);
			}
		} else {
			return Vector.zero(this.dims);
		}
	}

	/**
	 * Get the dot product between this vector and another vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, -1);
	 * let n = a.dot(b);
	 */
	dot(v: Vector): number;
	dot(x: number, y: number): number;
	dot(x: number, y: number, z: number): number;
	dot(v: Vector | number, y?: number, z?: number): number {
		if (v instanceof Vector) {
			if (this.dims < 3 || v.dims < 3) {
				return this.x * v.x + this.y * v.y;
			} else {
				return this.x * v.x + this.y * v.y + this.z * v.z;
			}
		} else if (typeof y === "number") {
			if (this.dims === 3 && typeof z === "number") {
				return this.x * v + this.y * y + this.z * z;
			} else {
				return this.x * v + this.y * y;
			}
		} else {
			return 0;
		}
	}

	/**
	 * Linearly interpolate between this vector and another vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, -1);
	 * let c = a.lerp(b, 0.5);
	 */
	lerp(v: Vector, t: number): Vector;
	lerp(x: number, y: number, t: number): Vector;
	lerp(x: number, y: number, z: number, t: number): Vector;
	lerp(v: Vector | number, y: number, z?: number, t?: number): Vector {
		if (v instanceof Vector) {
			this["+="]((v)["-"](this)["*"](y));
		} else if (typeof z === "number") {
			if (this.dims < 3 || typeof t !== "number") {
				this["+="](new Vector(v, y)["-"](this)["*"](z));
			} else {
				this["+="](new Vector(v, y, z)["-"](this)["*"](t));
			}
		}
		return this;
	}

	/**
	 * Gets the remainder of a vector division
	 * @example
	 * let a = new Vector(5, 10);
	 * let b = new Vector(3, 4);
	 * let c = a.mod(b);
	 * @example
	 * let a = new Vector(5, 10);
	 * let n = 3;
	 * let c = a.mod(n);
	 */
	mod(v: Vector): Vector;
	mod(n: number): Vector;
	mod(v: Vector | number): Vector {
		if (typeof v === "number") {
			if (v === 0) {
				throw new Error("Div parameter cannot be zero");
			}
			if (this.dims === 3) {
				return new Vector(
					this.x % v,
					this.y % v,
					this.z % v
				);
			} else {
				return new Vector(
					this.x % v,
					this.y % v
				);
			}
		} else {
			if (v.x === 0 || v.y === 0) {
				throw new Error("Div parameter cannot be zero");
			}
			if (v.dims === 3) {
				if (v.z === 0) {
					throw new Error("Div parameter cannot be zero");
				}
				return new Vector(
					this.x % v.x,
					this.y % v.y,
					this.z % v.z
				);
			} else {
				return new Vector(
					this.x % v.x,
					this.y % v.y
				);
			}
		}
	}

	/**
	 * Get the 2D vector (x, y) of this vector
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * let b = a.xy;
	 */
	get xy(): Vector {
		return new Vector(this.x, this.y);
	}
	/**
	 * Get the 2D vector (x, z) of this vector
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * let b = a.xz;
	 */
	get xz(): Vector {
		if (this.dims < 3) {
			throw new Error("Cannot get z component of a 2D vector");
		}
		return new Vector(this.x, this.z);
	}
	/**
	 * Get the 2D vector (y, x) of this vector
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * let b = a.yx;
	 */
	get yx(): Vector {
		return new Vector(this.y, this.x);
	}
	/**
	 * Get the 2D vector (y, z) of this vector
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * let b = a.yz;
	 */
	get yz(): Vector {
		if (this.dims < 3) {
			throw new Error("Cannot get z component of a 2D vector");
		}
		return new Vector(this.y, this.z);
	}
	/**
	 * Get the 2D vector (z, x) of this vector
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * let b = a.zx;
	 */
	get zx(): Vector {
		if (this.dims < 3) {
			throw new Error("Cannot get z component of a 2D vector");
		}
		return new Vector(this.z, this.x);
	}
	/**
	 * Get the 2D vector (z, y) of this vector
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * let b = a.zy;
	 */
	get zy(): Vector {
		if (this.dims < 3) {
			throw new Error("Cannot get z component of a 2D vector");
		}
		return new Vector(this.z, this.y);
	}

	/**
	 * Sets the 2D vector (x, y) of this vector
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * a.xy = new Vector(4, 5);
	 */
	set xy(v: Vector) {
		this.x = v.x;
		this.y = v.y;
	}
	/**
	 * Sets the 2D vector (x, z) of this vector
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * a.xz = new Vector(4, 5);
	 */
	set xz(v: Vector) {
		if (this.dims < 3) {
			throw new Error("Cannot set z component of a 2D vector");
		}
		this.x = v.x;
		this.z = v.y;
	}
	/**
	 * Sets the 2D vector (y, x) of this vector
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * a.yx = new Vector(4, 5);
	 */
	set yx(v: Vector) {
		this.y = v.x;
		this.x = v.y;
	}
	/**
	 * Sets the 2D vector (y, z) of this vector
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * a.yz = new Vector(4, 5);
	 */
	set yz(v: Vector) {
		if (this.dims < 3) {
			throw new Error("Cannot set z component of a 2D vector");
		}
		this.y = v.x;
		this.z = v.y;
	}
	/**
	 * Sets the 2D vector (z, x) of this vector
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * a.zx = new Vector(4, 5);
	 */
	set zx(v: Vector) {
		if (this.dims < 3) {
			throw new Error("Cannot set z component of a 2D vector");
		}
		this.z = v.x;
		this.x = v.y;
	}
	/**
	 * Sets the 2D vector (z, y) of this vector
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * a.zy = new Vector(4, 5);
	 */
	set zy(v: Vector) {
		if (this.dims < 3) {
			throw new Error("Cannot set z component of a 2D vector");
		}
		this.z = v.x;
		this.y = v.y;
	}

	/**
	 * Multiplies this vector to a magnitude
	 * @example
	 * let a = new Vector(1, 2);
	 * a.mag = 5;
	 */
	set mag(n: number) {
		this["*="](n / this.mag);
	}

	/**
	 * Rotate this vector to a heading (2D only)
	 * @example
	 * let a = new Vector(2, 0);
	 * a.heading = Math.PI / 2;
	 */
	set heading(n: number) {
		if (this.dims === 3) {
			throw new Error("Cannot set heading of a 3D vector");
		}
		this.rotate(n - this.heading);
	}

	/**
	 * Adds two vectors
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * let c = Vector.add(a, b);
	 */
	static add(v1: Vector, v2: Vector): Vector {
		let v = v1.copy;
		v.add(v2);
		return v;
	}

	/**
	 * Subtracts a vector from another vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * let c = Vector.sub(a, b);
	 */
	static sub(v1: Vector, v2: Vector): Vector {
		let v = v1.copy;
		v.sub(v2);
		return v;
	}

	/**
	 * Multiplies a vector by another vector or a number
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * let c = Vector.mult(a, b);
	 * @example
	 * let a = new Vector(1, 2);
	 * let n = 3;
	 * let c = Vector.mult(a, n);
	 */
	static mult(v1: Vector, n: number): Vector;
	static mult(v1: Vector, v2: Vector): Vector;
	static mult(v1: Vector, v2: Vector | number): Vector {
		let v = v1.copy;
		if (typeof v2 === "number") {
			v.mult(v2);
		} else {
			v.mult(v2);
		}
		return v;
	}

	/**
	 * Multiplies a vector by another vector or a number
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * let c = Vector.div(a, b);
	 * @example
	 * let a = new Vector(1, 2);
	 * let n = 3;
	 * let c = Vector.div(a, n);
	 */
	static div(v1: Vector, n: number): Vector;
	static div(v1: Vector, v2: Vector): Vector;
	static div(v1: Vector, v2: Vector | number): Vector {
		let v = v1.copy;
		if (typeof v2 === "number") {
			v.div(v2);
		} else {
			v.div(v2);
		}
		return v;
	}

	/**
	 * Rotates a vector by an angle and an axis
	 * @example
	 * let a = new Vector(3, 1);
	 * let b = Vector.rotate(a, Math.PI / 2);
	 * @example
	 * let a = new Vector(0, 3, 1);
	 * let b = Vector.rotate(a, Math.PI / 2, "x");
	 */
	static rotate(v: Vector, angle: number, axis: "z" | "x" | "y" = "z"): Vector {
		let v2 = v.copy;
		v2.rotate(angle, axis);
		return v2;
	}

	/**
	 * Gets the dot product of two vectors
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * let n = Vector.dot(a, b);
	 */
	static dot(v1: Vector, v2: Vector): number {
		return v1.dot(v2);
	}

	/**
	 * Linearly interpolates between two vectors
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * let c = Vector.lerp(a, b, 0.5);
	 */
	static lerp(v1: Vector, v2: Vector, t: number): Vector {
		return v1.lerp(v2, t);
	}

	/**
	 * Gets a vector normalized
	 * @example
	 * let a = new Vector(3, 4);
	 * let b = Vector.normalize(a);
	 */
	static normalize(v: Vector): Vector {
		return v.normalized;
	}

	/**
	 * Gets the vector (0, 0) or (0, 0, 0)
	 */
	static zero(dims: 2 | 3 = 3): Vector {
		if (dims === 2) {
			return new Vector(0, 0);
		} else if (dims === 3) {
			return new Vector(0, 0, 0);
		} else {
			throw new Error("Invalid dimensions for zero vector");
		}
	}
	/**
	 * Gets the vector (0, 0)
	 */
	static get zero2D(): Vector {
		return Vector.zero(2);
	}
	/**
	 * Gets the vector (0, 0, 0)
	 */
	static get zero3D(): Vector {
		return Vector.zero(3);
	}

	/**
	 * Adds a vector to this vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * a["+="](b);
	 * @example
	 * let a = new Vector(1, 2);
	 * a["+="](3, 4);
	 */
	"+="(x: number, y: number): Vector;
	"+="(x: number, y: number, z: number): Vector;
	"+="(v: Vector): Vector;
	"+="(v: Vector|number, y?: number, z?: number): Vector {
		if (v instanceof Vector) {
			this.add(v);
		} else if (typeof y === "number") {
			if (typeof z === "number") {
				this.add(v, y, z);
			} else {
				this.add(v, y);
			}
		}
		return this;
	}

	/**
	 * Subtracts a vector from this vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * a["-="](b);
	 * @example
	 * let a = new Vector(1, 2);
	 * a["-="](3, 4);
	 */
	"-="(x: number, y: number): Vector;
	"-="(x: number, y: number, z: number): Vector;
	"-="(v: Vector): Vector;
	"-="(v: Vector | number, y?: number, z?: number): Vector {
		if (v instanceof Vector) {
			this.sub(v);
		} else if (typeof y === "number") {
			if (typeof z === "number") {
				this.sub(v, y, z);
			} else {
				this.sub(v, y);
			}
		}
		return this;
	}

	/**
	 * Multiplies this vector by a vector or a number
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * a["*="](b);
	 * @example
	 * let a = new Vector(1, 2);
	 * a["*="](3);
	 */
	"*="(n: number): Vector;
	"*="(v: Vector): Vector;
	"*="(v: Vector | number): Vector {
		if (v instanceof Vector) {
			this.mult(v);
		} else {
			this.mult(v);
		}
		return this;
	}

	/**
	 * Divides this vector by a vector or a number
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * a["/="](b);
	 * @example
	 * let a = new Vector(1, 2);
	 * a["/="](3);
	 */
	"/="(n: number): Vector;
	"/="(v: Vector): Vector;
	"/="(v: Vector | number): Vector {
		if (v instanceof Vector) {
			this.div(v);
		} else {
			this.div(v);
		}
		return this;
	}

	/**
	 * Sets this vector to another vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * a["="](b);
	 * @example
	 * let a = new Vector(1, 2);
	 * a["="](3, 4);
	 */
	"="(x: number, y: number): Vector;
	"="(x: number, y: number, z: number): Vector;
	"="(v: Vector): Vector;
	"="(v: Vector | number, y?: number, z?: number): Vector {
		if (v instanceof Vector) {
			this.set(v);
		} else if (typeof y === "number") {
			if (typeof z === "number") {
				this.set(v, y, z);
			} else {
				this.set(v, y);
			}
		}
		return this;
	}

	/**
	 * Adds two vectors
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * let c = (a)["+"](b);
	 */
	"+"(v: Vector): Vector {
		return Vector.add(this, v);
	}

	/**
	 * Subtracts two vectors
	 * @example
	 * let a = new Vector(3, 4);
	 * let b = new Vector(1, 2);
	 * let c = (a)["-"](b);
	 */
	"-"(v: Vector): Vector {
		return Vector.sub(this, v);
	}

	/**
	 * Multiplies a vector by a number or another vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * let c = (a)["*"](b);
	 * @example
	 * let a = new Vector(1, 2);
	 * let n = 2;
	 * let c = (a)["*"](n);
	 */
	"*"(v: Vector): Vector;
	"*"(n: number): Vector;
	"*"(v: Vector | number): Vector {
		if (v instanceof Vector) {
			return Vector.mult(this, v);
		} else {
			return Vector.mult(this, v);
		}
	}

	/**
	 * Divides a vector by a number or another vector
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(3, 4);
	 * let c = (a)["/"](b);
	 * @example
	 * let a = new Vector(1, 2);
	 * let n = 2;
	 * let c = (a)["/"](n);
	 */
	"/"(v: Vector): Vector;
	"/"(n: number): Vector;
	"/"(v: Vector | number): Vector {
		if (v instanceof Vector) {
			return Vector.div(this, v);
		} else {
			return Vector.div(this, v);
		}
	}

	/**
	 * Gets the remainder of a vector division
	 * @example
	 * let a = new Vector(5, 10);
	 * let b = new Vector(3, 4);
	 * let c = (a)["%"](b);
	 * @example
	 * let a = new Vector(5, 10);
	 * let n = 3;
	 * let c = (a)["%"](n);
	 */
	"%"(v: Vector): Vector;
	"%"(n: number): Vector;
	"%"(v: Vector | number): Vector {
		if (v instanceof Vector) {
			return this.mod(v);
		} else {
			return this.mod(v);
		}
	}

	/**
	 * Checks if two vectors are equal
	 * @example
	 * let a = new Vector(1, 2);
	 * let b = new Vector(1, 2);
	 * let eq = (a)["=="](b);
	 */
	"=="(vector: Vector): boolean {
		if (this.dims < 3 || vector.dims < 3) {
			return this.x == vector.x && this.y == vector.y;
		} else {
			return this.x == vector.x && this.y == vector.y && this.z == vector.z;
		}
	}
	[Symbol.toPrimitive](hint: string): number | string {
		switch (hint) {
			case "string":
				return this.toString();
			case "number":
			default:
				return this.toNumber();
		}
	}
	[Symbol.iterator](): Iterator<number> {
		if (this.dims < 3) {
			return [this.x, this.y][Symbol.iterator]();
		} else {
			return [this.x, this.y, this.z][Symbol.iterator]();
		}
	}

	/**
	 * Converts the vector to a string (x, y, z) or (x, y)
	 * @example
	 * let a = new Vector(1, 2);
	 * let str = a.toString();
	 * @example
	 * let a = new Vector(1, 2, 3);
	 * let str = a.toString();
	 */
	toString(): string {
		if (this.dims < 3) {
			return `(${this.x}, ${this.y})`;
		} else {
			return `(${this.x}, ${this.y}, ${this.z})`;
		}
	}

	/**
	 * Converts the vector to a number, equal to the magnitude
	 * @example
	 * let a = new Vector(3, 4);
	 * let n = a.toNumber();
	 */
	toNumber(): number {
		return this.mag;
	}
}
