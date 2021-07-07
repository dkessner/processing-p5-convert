//
// ArrayList.js
//


class ArrayList extends Array {
    size() {return this.length;}
    add(x) {this.push(x);}
    get(i) {return this[i];}
    remove(i) {this.splice(i,1);}
}


(function testArrayList()
{
    let a = new ArrayList(1,2,3);
    a.add(4);
    a.add(5);
    a.add(6);
    console.log("a: " + a);
    console.log("size:" + a.size());

    console.log("a.remove(5)");
    a.remove(5);
    console.log("a: " + a);

    console.log("size:" + a.size());

    for (let i=0; i<a.size(); i++)
        console.log("a.get(" + i + "): " + a.get(i));
})();


