# void

-   指定方法类型，表示没有返回值,方法体中不能 return

# never

-   其他类型 (包括 null 和 undefined)的子类型，代表从不会出现的值/不会出现的值

```
let l: never;

//匿名函数并抛出异常
l = (() => {
  throw new Error("111");
})();
```

# 函数重载（）

-   被重载的方法，是没有方法体，可以根据参数的类型走其中一个方法并判断参数，但如果传入的参数类型不是任何被重载方法的参数类型就不允许通过。

# 类

-   public 在当前类里面，子类，类外面都可以访问
-   protected 在当前类和子类内部可以访问，类外部无法访问
-   private 在当前类内部可访问，子类，类外部都无法访问。
-   属性不加修饰符,默认就是公有的 (public)

# 多态（）

-   通过抽象方法/方法重载--实现多态--多态的作用是用来定义标准

-   抽象类无法实例化。
-   非抽象类继承抽象父类时不会自动实现来自父类的抽象成员,必须手动定义父类中的抽象成员，否则报错。
-   抽象成员包括属性和方法

# 接口

-   规范的定义，定义了行为和动作的规范
-   用个变量来存储传入的变量,这样可以传入定义的接口以外的值，（否则如果直接传入对象中无接口定义的值会报错，所以建议接口定义了哪些值就传哪些值）。
-   属性接口

```
interface InterfaceName {
    first: string;
    second?: string; //加个问号，接口属性就可以变成可传可不传了，不传默认是undefined。
}
//打印变量
function logParam(name: InterfaceName): void {
    console.log(name.first, name.second, 11);
}
//定义参数
const obj = { first: "1", second: "fff", three: 1 };
//logParam({ first: "1", second: "1", three: 1 }); //报错,只能传接口定义的值
logParam(obj);
```

-   函数接口

```
interface keyMap {
    (key: string, value: string): string;
}
let logKeyMap: keyMap = function (key1: string, value: string): string {
    return key1 + value;
};
console.log(logKeyMap("key1", "value"));
```

-   可索引接口

```
interface Arr {
    [index: number]: string;
}
let ss: Arr = ["2121"];
interface Obj {
    [index: string]: string;
}
let interfaceArr: Obj = { aa: "1" };

对数组进行约束,index后必须跟着number类型。
对对象进行约束,index后必须跟着string类型
索引签名参数类型必须为 "string" 或 "number"
```

-   类类型接口

```
interface Dog {
    eat(): void;
}
interface Persons extends Dog {
    work(): void;
}
class Cat {
    code() {
        console.log("猫在敲代码");
    }
}
// 可继承类后再实现接口
class SuperMan extends Cat implements Persons {
    eat(): void {
        console.log(1);
    }
    work(): void {
        console.log(2);
    }
}
类接口会对类的属性和方法进行约束，类似非抽象类继承抽象类时必须实现某些方法和属性，但对属性和方法的类型的约束更加严格，除了方法void类型可被重新定义外，其他属性或方法的类型定义需要和接口保持一致。
```

# 泛型

-   泛型就是解决类、接口、方法的复用性

## tips

-   抽象类和接口
    -   不同：
        -   一个类只能继承一个直接父类，这个父类可以是具体的类也可是抽象类；但是一个类可以实现多个接口。
        -   在抽象类中可以写非抽象的方法，从而避免在子类中重复书写他们，这样可以提高代码的复用性，这是抽象类的优势；接口中只能有抽象的方法。
    -   相同：
        -   1. 都是上层的抽象层。
        -   2. 都不能被实例化
        -   3. 都能包含抽象的方法，这些抽象的方法用于描述类具备的功能，但是不比提供具体的实现。
