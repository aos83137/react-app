const foo = 1
let bar = 2

class Human {
    constructor(name){
        this.name = name;
    }
    say(){
        console.log(`Hello, My name is ${this.name}.`);
    }
}
const Taro = new Human('Taro');
Taro.say()