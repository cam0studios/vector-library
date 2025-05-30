declare class Vector {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z?: number);

    add(v: number | Vector, y?: number, z?: number): this;
    sub(v: number | Vector, y?: number, z?: number): this;
    div(n: number | Vector): this;
    mult(n: number | Vector): this;
    set(v: number | Vector, y?: number, z?: number): this;
    rotate(angle: number, axis?: string): this;
    normalize(): this;
    reflect(v: Vector): this;

    get magSq(): number;
    get mag(): number;
    set mag(n: number);
    get normalized(): Vector;
    get copy(): Vector;
    get heading(): number;
    set heading(n: number);
    get abs(): Vector;
    max(v: Vector): Vector;
    min(v: Vector): Vector;
    dot(v: Vector): number;
    lerp(v: Vector, n: number): Vector;

    get xy(): Vector;
    set xy(v: Vector);
    get xz(): Vector;
    set xz(v: Vector);
    get yz(): Vector;
    set yz(v: Vector);

    static add(v1: Vector, v2: Vector): Vector;
    static sub(v1: Vector, v2: Vector): Vector;
    static mult(v: Vector, n: number | Vector): Vector;
    static div(v: Vector, n: number | Vector): Vector;
    static rotate(v: Vector, angle: number, axis?: string): Vector;
    static dot(v1: Vector, v2: Vector): number;
    static lerp(v1: Vector, v2: Vector, n: number): Vector;
    static normalize(v: Vector): Vector;
    static get zero(): Vector;

    ["+="](v: number | Vector, y?: number, z?: number): this;
    ["-="](v: number | Vector, y?: number, z?: number): this;
    ["/="](n: number | Vector): this;
    ["*="](n: number | Vector): this;
    ["="](v: number | Vector, y?: number, z?: number): void;
    ["+"](v: Vector): Vector;
    ["-"](v: Vector): Vector;
    ["/"](n: number | Vector): Vector;
    ["*"](n: number | Vector): Vector;
    ["%"](n: number): Vector;
    ["=="](vector: Vector): boolean;

    [Symbol.toPrimitive](hint: string): string | number;

    toString(): string;
    toNumber(): number;
}

export default Vector;