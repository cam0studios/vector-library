/*
Made by Camer0

  f(a,b,[c])     c is optional
  <number>.f()   don't literally write number
  = f()          use the return value
  v = n          setter

VECTORS :
  = new Vector(x,y,[z])           returns a vector
  <vector>.add(x,y,[z])           adds x, y, and z to a vector
  <vector>.add(v)                 adds a vector to a vector
  <vector>.sub(x,y,[z])           subtracts x, y, and z from a vector
  <vector>.sub(v)                 subtracts a vector from a vector
  <vector>.mult(n)                multiplies a vector by a value
  <vector>.div(n)                 divides a vector by a non-zero value
  <vector>.set(x,y,[z])           sets a vector to x, y and z
  <vector>.set(v)                 sets a vector to another vector
  <vector>.rotate(angle, [axis])  rotates a vector by an angle, 2d vectors don't need axis

  = <vector>.mag                  magnitude of the vector
  = <vector>.heading              heading of the vector, for 3D vectors ignores the z-component
  = <vector>.copy                 copy of the vector

  <vector>.mag = n                sets magnitude of the vector
  <vector>.heading = n            sets heading of the vector
  
  Vector.add(v1,v2)               static, adds 2 vectors
  Vector.sub(v1,v2)               static, subtracts a vector from a vector
  Vector.mult(v,n)                static, multiplies vector by a number
  Vector.div(v,n)                 static, divides a vector by a number
  Vector.rotate(v,angle,[axis])   static, rotates a vector
*/

const Vector = class {
  constructor(x,y,z) {
    if(arguments.length>1) {
      this.type = arguments.length;
      this.x = x;
      this.y = y;
      this.z = this.type>2 ? z : 0;
    } else {
      console.error("Error: Vector expected 2 or 3 arguments, not "+arguments.length);
    }
  }
  add(v,y,z) {
    if(arguments.length>1) {
      this.x += v;
      this.y += y;
      this.z += this.type>2 ? z : 0;
    } else {
      this.x += v.x;
      this.y += v.y;
      this.z += this.type>2 ? v.z : 0;
    }
  }
  sub(v,y,z) {
    if(arguments.length>1) {
      this.x -= v;
      this.y -= y;
      this.z -= this.type>2 ? z : 0;
    } else {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= this.type>2 ? v.z : 0;
    }
  }
  div(n) {
    if (n==0) {
      console.error("Error: div parameter cannot be 0");
    } else {
      this.x /= n;
      this.y /= n;
      this.z /= n;
    }
  }
  mult(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
  }
  set(v,y,z) {
    if(arguments.length>1) {
      this.x = v;
      this.y = y;
      this.z = this.type>2 ? z : 0;
    } else {
      this.x = v.x;
      this.y = v.y;
      this.z = this.type>2 ? v.z : 0;
    }
  }
  rotate(angle,axis) {
    let rot;
    if(this.type==2) {
      rot = this.copy;
    } else {
      if(axis=="x") rot = new Vector(this.y,this.z);
      if(axis=="y") rot = new Vector(this.x,this.z);
      if(axis=="z") rot = new Vector(this.x,this.y);
    }
    let a = rot.heading + angle;
    let m = rot.mag;
    rot.set(Math.cos(a)*m,Math.sin(a)*m);
    if(this.type==2) {
      this.set(rot);
    } else {
      if(axis=="x") this.set(this.x,rot.x,rot.y);
      if(axis=="y") this.set(rot.x,this.y,rot.y);
      if(axis=="z") this.set(rot.x,rot.y,this.z);
    }
  }
  
  get mag() {
    return Math.sqrt((this.x*this.x) + (this.y*this.y) + (this.z*this.z));
  }
  get copy() {
    if(this.type>2) return new Vector(this.x,this.y,this.z);
    else return new Vector(this.x,this.y);
  }
  get heading() {
    if(this.type>2) console.warn("Warning: heading is only for 2D vectors"); 
    return Math.atan2(this.y,this.x);
  }

  set mag(n) {
    this.mult(n/this.mag);
  }
  set heading(n) {
    if(this.type>2) console.warn("Warning: heading is only for 2D vectors");
    this.rotate(n-this.heading);
  }

  static add(v1,v2) {
    let v = v1.copy;
    v.add(v2);
    return v;
  }
  static sub(v1,v2) {
    let v = v1.copy;
    v.sub(v2);
    return v;
  }
  static mult(v,n) {
    let v2 = v.copy;
    v2.mult(n);
    return v2;
  }
  static div(v,n) {
    let v2 = v.copy;
    v2.div(n);
    return v2;
  }
  static rotate(v,angle,axis) {
    let v2 = v.copy;
    v2.rotate(angle,axis);
    return v2;
  }
}