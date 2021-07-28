# todo

- new Object[n] -> new Array(n)
- Object(int a) {this.a = a;} -> constructor(a) {this.a = a;}
    - local variable list
    - this.a -> this.a (idempotent)
    - a -> this.a if (member && !local)
