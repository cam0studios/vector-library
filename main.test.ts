import Vector from "./main";

expect(Vector).toBeDefined();
expect(Vector).toBeInstanceOf(Function);

test("create 2D", () => {
    let vec = new Vector(1, 2);
    expect(vec).toBeDefined();
    expect(vec).toBeInstanceOf(Vector);
    expect(vec.x).toBe(1);
    expect(vec.y).toBe(2);
    expect(vec.dims).toBe(2);
});
test("create 3D", () => {
    let vec = new Vector(1, 2, 3);
    expect(vec).toBeDefined();
    expect(vec).toBeInstanceOf(Vector);
    expect(vec.x).toBe(1);
    expect(vec.y).toBe(2);
    expect(vec.z).toBe(3);
    expect(vec.dims).toBe(3);
});

test("add vector", () => {
    let a = new Vector(1, 2);
    let b = new Vector(3, 4);
    let c = a.copy;
    c.add(b);
    expect(c).toEqual(new Vector(4, 6));
    expect(c).toEqual((a)["+"](b));
    expect(c).toEqual(Vector.add(a, b));
});
test("add components", () => {
    let a = new Vector(1, 2);
    let b = a.copy;
    b.add(3, 4);
    expect(b).toEqual(new Vector(4, 6));
});

test("sub vector", () => {
    let a = new Vector(1, -2);
    let b = new Vector(-3, 4);
    let c = a.copy;
    c.sub(b);
    expect(c).toEqual(new Vector(4, -6));
    expect(c).toEqual((a)["-"](b));
    expect(c).toEqual(Vector.sub(a, b));
});
test("sub components", () => {
    let a = new Vector(1, -2);
    let b = a.copy;
    b.sub(-3, 4);
    expect(b).toEqual(new Vector(4, -6));
});

test("mult vector", () => {
    let a = new Vector(1, 2);
    let b = new Vector(3, 4);
    let c = a.copy;
    c.mult(b);
    expect(c).toEqual(new Vector(3, 8));
    expect(c).toEqual((a)["*"](b));
    expect(c).toEqual(Vector.mult(a, b));
});
test("mult number", () => {
    let a = new Vector(1, 2);
    let n = 3;
    let b = a.copy;
    b.mult(n);
    expect(b).toEqual(new Vector(3, 6));
    expect(b).toEqual((a)["*"](n));
    expect(b).toEqual(Vector.mult(a, n));
});

test("div vector", () => {
    let a = new Vector(3, 4);
    let b = new Vector(1, 2);
    let c = a.copy;
    c.div(b);
    expect(c).toEqual(new Vector(3, 2));
    expect(c).toEqual((a)["/"](b));
    expect(c).toEqual(Vector.div(a, b));
});
test("div number", () => {
    let a = new Vector(3, 4);
    let n = 2;
    let b = a.copy;
    b.div(n);
    expect(b).toEqual(new Vector(1.5, 2));
    expect(b).toEqual((a)["/"](n));
    expect(b).toEqual(Vector.div(a, n));
});

test("set vector", () => {
    let a = new Vector(1, 2);
    let b = new Vector(3, 4);
    let c = a.copy;
    c.set(b);
    expect(c).toEqual(b);
    c["="](a);
    expect(c).toEqual(a);
    expect((a)["=="](b)).toBe(false);
    expect((a)["=="](c)).toBe(true);
});
test("set components", () => {
    let a = new Vector(1, 2);
    let b = a.copy;
    b.set(3, 4);
    expect(b).toEqual(new Vector(3, 4));
});

test("rotate 2D", () => {
    let a = new Vector(2, 1);
    let b = a.copy;
    b.rotate(Math.PI / 2);
    expect(b.x).toBeCloseTo(-1);
    expect(b.y).toBeCloseTo(2);
    expect(b).toEqual(Vector.rotate(a, Math.PI / 2));
});
test("rotate 3D", () => {
    let a = new Vector(3, 0, 1);
    let b = a.copy;
    b.rotate(Math.PI / 2, "y");
    expect(b.x).toBeCloseTo(-1);
    expect(b.y).toBeCloseTo(0);
    expect(b.z).toBeCloseTo(3);
    expect(b).toEqual(Vector.rotate(a, Math.PI / 2, "y"));
});

test("normalize", () => {
    let a = new Vector(3, 4);
    let b = a.copy;
    b.normalize();
    expect(b.x).toBeCloseTo(0.6);
    expect(b.y).toBeCloseTo(0.8);
    expect(b).toEqual(Vector.normalize(a));
    expect(b.mag).toBeCloseTo(1);
    expect(b).toEqual(a.normalized);
});

test("reflect", () => {
    let a = new Vector(2, -1);
    let b = a.copy;
    b.reflect(new Vector(1, 0));
    expect(b).toEqual(new Vector(2, 1));
    // expect(b).toEqual(Vector.reflect(a, new Vector(0, 1)));
});

test("magSq", () => {
    let a = new Vector(3, 4);
    expect(a.magSq).toBe(25);
    // expect(Vector.magSq(a)).toBe(25);
});

test("mag", () => {
    let a = new Vector(3, 4);
    expect(a.mag).toBeCloseTo(5);
    // expect(Vector.mag(a)).toBeCloseTo(5);
    a.mag = 10;
    expect(a.mag).toBeCloseTo(10);
    expect(a.x).toBeCloseTo(6);
    expect(a.y).toBeCloseTo(8);
});

test("copy", () => {
    let a = new Vector(1, 2);
    let b = a.copy;
    expect(b).toEqual(a);
    expect(b).not.toBe(a);
});

test("heading", () => {
    let a = new Vector(1, 0);
    expect(a.heading).toBeCloseTo(0);
    a["="](new Vector(0, 1));
    expect(a.heading).toBeCloseTo(Math.PI / 2);
    a.heading = Math.PI;
    expect(a.x).toBeCloseTo(-1);
    expect(a.y).toBeCloseTo(0);
    expect(a.heading).toBeCloseTo(Math.PI);
});

test("abs", () => {
    let a = new Vector(-1, 2);
    let b = a.abs;
    expect(b).toEqual(new Vector(1, 2));
    // expect(b).toEqual(Vector.abs(a));
});

test("max", () => {
    let a = new Vector(1, 4);
    let b = new Vector(3, 2);
    let c = a.max(b);
    expect(c).toEqual(new Vector(3, 4));
    // expect(c).toEqual(Vector.max(a, b));
});

test("min", () => {
    let a = new Vector(1, 4);
    let b = new Vector(3, 2);
    let c = a.min(b);
    expect(c).toEqual(new Vector(1, 2));
    // expect(c).toEqual(Vector.min(a, b));
});

test("dot", () => {
    let a = new Vector(1, 2);
    let b = new Vector(3, 4);
    expect(a.dot(b)).toBe(11);
    expect(Vector.dot(a, b)).toBe(11);
});

test("lerp", () => {
    let a = new Vector(1, 2);
    let b = new Vector(3, 4);
    let c = a.lerp(b, 0.5);
    expect(c).toEqual(new Vector(2, 3));
    expect(c).toEqual(Vector.lerp(a, b, 0.5));
});

test("swizzles", () => {
    let a = new Vector(1, 2, 3);
    expect(a.xy).toEqual(new Vector(1, 2));
    expect(a.xz).toEqual(new Vector(1, 3));
    expect(a.yx).toEqual(new Vector(2, 1));
    expect(a.yz).toEqual(new Vector(2, 3));
    expect(a.zx).toEqual(new Vector(3, 1));
    expect(a.zy).toEqual(new Vector(3, 2));
});

test("zero", () => {
    expect(Vector.zero(2)).toEqual(new Vector(0, 0));
    expect(Vector.zero(3)).toEqual(new Vector(0, 0, 0));
    expect(Vector.zero2D).toEqual(new Vector(0, 0));
    expect(Vector.zero3D).toEqual(new Vector(0, 0, 0));
});

test("mod", () => {
    let a = new Vector(5, 3);
    let b = new Vector(2, 4);
    let c = a.mod(b);
    expect(c).toEqual(new Vector(1, 3));
    // expect(c).toEqual(Vector.mod(a, b));
    expect(c).toEqual((a)["%"](b));
});

test("iterator", () => {
    let a = new Vector(1, 2, 3);
    let sum = 0;
    for (let v of a) {
        sum += v;
    }
    expect(sum).toBe(6);
    expect([...a]).toEqual([1, 2, 3]);
    let b = new Vector(1, 2);
    expect([...b]).toEqual([1, 2]);
});

test("toString", () => {
    let a = new Vector(1, 2, 3);
    expect(a.toString()).toBe("(1, 2, 3)");
    let b = new Vector(1, 2);
    expect(b.toString()).toBe("(1, 2)");
});