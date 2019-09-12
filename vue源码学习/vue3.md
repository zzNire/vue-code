## Proxy 替代 defineProperty 
1. proxy 可以直接定义在对象上，不需要再为对象的每一个属性设置 defineProperty
2. proxy 可以监听到 对象属性的添加或删除，而在vue2.0中需要通过 vue.Set Vue.delete 或 在增强数据的方法 来实现监听
3. proxy 提供了不仅仅是 get set 的代理，还可以代理 deleteProperty、has

1. Proxy的劣势就是兼容性问题

## RFC Function-based API
```js
function useMouse() {
  const x = value(0)
  const y = value(0)
  const update = e => {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  return { x, y }
}

// 在组件中使用该函数
const Component = {
  setup() {
    const { x, y } = useMouse()
    // 与其它函数配合使用
    const { z } = useOtherLogic()
    return { x, y, z }
  },
  template: `<div>{{ x }} {{ y }} {{ z }}</div>`
}
```

1. 暴露给模版的属性来源清晰（从函数返回）；
2. 返回值可以被任意重命名，所以不存在命名空间冲突；
3. 没有创建额外的组件实例所带来的性能损耗


* 由 setup() + value) + state) 取代） 代替 data methods 
* computed 由 computed()
* watch 由 watch() 取代
* mixins （由组合函数取代）
* extends （由组合函数取代）

```js
import { value } from 'vue'

const MyComponent = {
  setup(props) {
    const msg = value('hello') 
    //value() 返回的是一个 value wrapper （包装对象）。一个包装对象只有一个属性：.value ，该属性指向内部被包装的值。
    //如果在一个函数中返回一个字符串变量，接收到这个字符串的代码只会获得一个值，是无法追踪原始变量后续的变化的。
    const object = state({
        count: 0
    })
    //如果你依然想创建一个没有包装的响应式对象，可以使用 stateAPI
    
    const appendName = () => {
      msg.value = `hello ${props.name}`
    }
    const countPlusOne = computed(() => count.value + 1)
    //computed() 返回的是一个只读的包装对象，它可以和普通的包装对象一样在 setup() 中被返回 ，也一样会在渲染上下文中被自动展开。
    
    watch(
        // getter
        () => count.value + 1,
        // callback
        (value, oldValue) => {
            console.log('count + 1 is: ', value)
        })
    //和 2.x 的 $watch 有所不同的是，watch() 的回调会在创建时就执行一次

    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    // destroyed 调整为 unmounted
    onUnmounted(() => {
      console.log('unmounted!')
    })
    //所有现有的生命周期钩子都会有对应的 onXXX 函数（只能在 setup() 中使用）：
    return {
      msg,
      appendName
    }
  },
  template: `<div @click="appendName">{{ msg }}</div>`
}

```

##函数式编程
主要思想是把运算过程尽量写成一系列嵌套的函数调用

"表达式"（expression）是一个单纯的运算过程，总是有返回值；"语句"（statement）是执行某种操作，没有返回值。函数式编程要求，只使用表达式，不使用语句。也就是说，每一步都是单纯的运算，而且都有返回值。



```js
(1 + 2) * 3 - 4

var a = 1 + 2;
var b = a * 3;
var c = b - 4;

//函数式编程要求使用函数，我们可以把运算过程定义为不同的函数
var result = subtract(multiply(add(1,2), 3), 4);

```
函数式编程的精髓：业务系统模型无状态
* 可以把函数作为参数传递给另一个函数，也就是所谓的高阶函数
* 可以返回一个函数，这样就可以实现闭包或者惰性计算
* 函数运行的结果只依赖于输入的参数，而不依赖于外部状态。没有副作用有个巨大的好处，就是函数内部无状态，即输入确定，输出就是确定的，容易测试和维护。

优点
* 接近自然语言，易于理解
* 更方便的代码管理，单元测试
* 代码的热升级，函数式编程没有副作用，只要保证接口不变，内部实现是外部无关的。所以，可以在运行状态下直接升级代码。

### 纯函数
纯函数只有一个思想：相同的输入，永远都会得到相同的输出。




