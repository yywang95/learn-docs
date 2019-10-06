## setup

- setup是构造组件的入口点
- 它在初始化props和组件实例被创建后调用，即beforeCreate之后，created之前被调用

```html
<template>
    <div>{{ obj.foo }}</div>
</template>

<script>
import { reactive } from '@vue/composition-api';

export default {
    setup() {
        const obj = reactive({ foo: 'bar' });

        // 返回值会被合并到render上下文中，在render组件template的时候使用
        return {
            obj,
        };
    },
}
</script>
```

```ts
function setup(
    props: Data,
    context: SetupContext
): Data
```

## props

- `setup中的this是undefined`，但是setup的第一个参数是props
- props和2.x一样，不能直接在组件内修改props的值，会报错
- setup中的props是响应式的，父组件修改props值时，组件内的props会更新
- 和2.x一样，props不用在setup中返回也能在模版中访问到

```js
export default {
    props: {
        text: String,
    },
    // 第一个参数为props
    setup(props) {
        // TODO: 直接console props是{}，所以props属性并不是直接在props上的
        console.log(props.text);
    },
}
```

```ts
interface Data {
    [key: string]: unknown
}
```

> 把props分开，而不是放到context的原因
> 1. 相对于其他属性，props在组件中使用频率更高
> 2. props和context分开可以更好的进行ts类型设置
> 3. 同时可以保持在setup、render、tsx纯功能函数中保持签名一致

## context上下文

- setup中的this是undefined，但是setup的第二个参数中context
- context提供了2.x中this提供的一些列属性

```js
export default {
    setup(props, context) {
        const {
            attrs,
            slots,
            parent,
            root,
            emit,
        } = context;
    },
}
```

```ts
// typing
interface SetupContext {
    attrs: Data
    slots: Slots
    parent: ComponentInstance | null
    root: ComponentInstance
    emit: ((event: string, ...args: unknown[]) => void)
}
```

> 不用在setup中提供this的原因
> 1. 在setup中的this和之前版本的this有很大的不同，为了避免和2.x一起的使用困惑，所以不在setup中提供this
> 2. 同时在setup中不同地方使用的this不同，例如在setup中定义一个函数，那么函数中的this不是你想要的this

## reactive创建响应式

- reactive接收一个对象，并返回一个响应式代理对象，和2.x的Vue.observable()等同
- reactive基于es6的proxy，无论你是修改原始数据还是reactive返回的数据都会实现动态响应的效果，但是最好避免直接修改原始数据，而是通过修改返回的代理数据
- reactive监听是深层监听

```js
const obj = reactive({ count: 0 });
```

```ts
// typing
function reactive<T extends object>(raw: T): T
```

## ref把一个数据包装为响应式对象

- ref对于非引用类型，可以返回一个响应式数据
- reactive接收的是一个对象，但是ref可以接收任何类型的数据

```js
const count = ref(0);

// ref返回的对象中，通过.value来获取和设置值
count.value++
console.log(count.value)
```

ref传入对象
```js
const obj = ref({ a: 1 });

obj.value.a++
console.log(obj.value.a)
```

当作为setup返回值，或者reactive参数的时候不用.value，框架内部会打开数据

```html
<template>
    <div>{{count}}</div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api';

export default {
    setup() {
        const count = ref(0);
        const obj = reactive({
            count,
        });

        console.log(obj.count); // 0
        obj.count++;
        console.log(obj.count); // 1

        return {
            count
        }
    }
}
</script>
```

```ts
// typing
interface Ref<T> {
    value: T
}

function ref<T>(value: T): Ref<T>
```

## isRef

- isRef判断一个数据是否为ref，如果是ref需要使用.value

```js
const unwrapped = isRef(foo) ? foo.value : foo;
```

```ts
// typing
function isRef(value: any): value is Ref<any>
```

## toRefs

- 如果reactive中的某项是个非引用类型，那么在解构的时候就会失去响应，toRefs可以使每一项都转为ref
- 当直接返回一个reactive对象时，toRefs很有用

```js
const state = reactive({
    foo: 1,
});

// 此时的foo不具有响应功能，只是一个静态数据
let { foo } = state;

// 此处的refFoo: Ref<1>，具有响应功能
let { foo: refFoo } = toRefs(state);

foo++;
console.log(state.foo); // 1

refFoo.value++;
console.log(state.foo); // 2

```

```js
export default {
    setup() {
        const state = reactive({
            foo: 1,
        });

        return toRefs(state);
    }
}
```

## computed

- computed接收一个getter方法，返回一个`ref对象`
- computed接收一个对象来指定get和set

```js
const count = ref(1);
const plusOne = computed(() => count.value + 1);

console.log(plusOne.value); // 2

const plusTwo = computed({
    get: () => count.value + 1,
    set: val => { count.value = val - 1 }
});
plusTwo.value = 1;
console.log(count.value); // 0
```

```ts
// typing
// read-only
function computed<T>(getter: () => T): Readonly<Ref<Readonly<T>>>

// writable
function computed<T>(options: {
    get: () => T,
    set: (value: T) => void
}): Ref<T>
```

## readonly

- 创建一个只读对象，可以接收一个reactive、ref、纯object，返回一个通过proxy处理过的只读对象
- TODO: 这个属性没有在@vue/composition-api中找到

```js
const state = reactive({
    foo: 1,
});

const s = readonly(state);

state.foo++;

s.foo++; // 报错
```

## watch

- watch方法会在依赖nextTick的时候调用一次，然后当依赖属性变化的时候调用一次
- 当组件unmounted的时候，watcher会自动停止，同时watch会返回一个`stop方法`，可以`手动停止监听`
- watch提供了一个`onCleanUp方法`，在re-run之前和stop之后被调用，可以在这里进行进行一些清理工作
- watch可以接收一个`option设置`，和2.x一样，{ flush, lazy, onTrack, onTrigger }

```js
const state = reactive({
    foo: 1,
    bar: 2
});

// 用法一：会根据依赖项调用
watch(() => {
    console.log('foo change: ', state.foo);
});

// 用法二：需要知道prevValue和currValue
watch(() => state.foo, (val, prevValue) => { /* ... */ });

// 用法三：指定监听的属性
watch(ref(state.count), (val, prevValue) => { /* ... */ });

// 用法四：监听多个属性
const { foo, bar } = toRefs(state);
watch([foo, bar], ([fooVal, barval], [prevFoo, prevBar]) => { /* ... */ });

// 停止监听
const stop = watch(() => {});
stop();

// onCleanup
watch((onCleanup) => {
    const token = performAsyncOperation(id.value);

    onCleanup(() => {
        // id has changed or watcher is stopped.
        // invalidate previously pending async operation
        token.cancel();
    });
});
watch(foo, (val, prevValue, onCleanup) => { /* ... */ });

// options
watch(() => {}, {
    flush: 'sync', // sync | pre 在组件更新之前还是之后调用
    lazy: true, // true | false 
    onTrigger(e) { // watcher callback调用之前调用
        debugger
    },
    onTrack(e) {}, // 监听的ref或reactive作为跟踪依赖改变时
});
```

```ts
type StopHandle = () => void

type WatcherSource<T> = Ref<T> | (() => T)

type MapSources<T> = {
    [K in keyof T]: T[K] extends WatcherSource<infer V> ? V : never
}

type InvalidationRegister = (invalidate: () => void) => void

interface DebuggerEvent {
    effect: ReactiveEffect
    target: any
    type: OperationTypes
    key: string | symbol | undefined
}

interface WatchOptions {
    lazy?: boolean
    flush?: 'pre' | 'post' | 'sync'
    deep?: boolean
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
}

// basic usage
function watch(
    effect: (onInvalidate: InvalidationRegister) => void,
    options?: WatchOptions
): StopHandle

// wacthing single source
function watch<T>(
    source: WatcherSource<T>,
    effect: (
        value: T,
        oldValue: T,
        onInvalidate: InvalidationRegister
    ) => void,
    options?: WatchOptions
): StopHandle

// watching multiple sources
function watch<T extends WatcherSource<unknown>[]>(
    sources: T
    effect: (
        values: MapSources<T>,
        oldValues: MapSources<T>,
        onInvalidate: InvalidationRegister
    ) => void,
    options? : WatchOptions
): StopHandle
```

## 生命周期

- beforeCreate -> use setup()
- created -> use setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> onBeforeUnmount
- destroyed -> onUnmounted
- errorCaptured -> onErrorCaptured
- onRenderTracked
- onRenderTriggered

```js
export default {
    setup() {
        // 生命周期函数必须和setup同步调用
        onMounted(() => {});
    },
    onRenderTracked() {},
}
```

## provide && inject

- 和2.x的provide/inject一样，需要在setup中调用
- provide提供的如果是个响应式数据，那么inject到的数据也是响应式变化的

```js
import { provide, inject } from '@vue/composition-api';

const ThemeSymbol = Symbol();

const p = {
    setup() {
        // provide提供
        provide(ThemeSymbol, 'dark');
    },
};

const c = {
    setup() {
        // inject接收
        const theme = inject(ThemeSymbol, 'light');

        return {
            theme,
        };
    },
};
```

```js
// in provider
const themeRef = ref('dark');
provide(ThemeSymbol, themeRef);

// in consumer
const theme = inject(ThemeSymbol, ref('light'));
watch(() => {
    console.log(`theme set to: ${theme.value}`);
});
```

```ts
// typing
interface InjectionKey<T> extends Symbol {}

function provide<T>(key: InjectionKey<T> | string, value: T): void

// without default value
function inject<T>(key: InjectionKey<T> | string): T | undefined
// with default value
function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T
```

## Template Refs

```html
<template>
    <div ref="root"></div>
</template>

<script>
    import { onMounted, ref } from '@vue/composition-api';

    export default {
        setup() {
            const root = ref(null);

            onMounted(() => {
                // 在执行虚拟节点算法时，如果一个虚拟节点的ref属性在ref render context中，则会将该变量复制为当前组件对象
                // 定义一个root变量在setup抛出，在onMounted的时候就能接收到
                console.log(root.value);
            });

            return {
                root,
            };
        }
    }
</script>
```

## createComponent

- createComponent是为了类型推断提供的，为了让ts知道该对象是一个组件生成所用，所以ts可以推断出props会被传到setup中
- crateComponent没有任何其他的行为，只是期望组件的定义和返回

```js
export default createComponent({
    props: {
        foo: String,
    },
    setup(props) {
        props.foo // 会被识别为String类型
    }
});
```

如果方法只有一个setup函数，可以直接传递一个函数参数

```js
export default createCompoent((props: { foo: String }) => {
    props.foo
});
```
