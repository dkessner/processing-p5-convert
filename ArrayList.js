//
// ArrayList.js
//


class ArrayList extends Array {
    constructor() {super(...[]);}
    size() {return this.length;}
    add(x) {this.push(x);}
    get(i) {return this[i];}
    remove(i) {this.splice(i,1);}
}


console.log("ArrayList:\n");
console.log(ArrayList.toString());

(function testArrayList()
{
    let a = new ArrayList();
    a.add(4);
    a.add(5);
    a.add(6);
    console.log(a);
    console.log("a: " + a);
    console.log("size:" + a.size());

    console.log("a.remove(2)");
    a.remove(2);
    console.log("a: " + a);

    console.log("size:" + a.size());

    for (let i=0; i<a.size(); i++)
        console.log("a.get(" + i + "): " + a.get(i));

    let b = new ArrayList();
    console.log(b);

})();


