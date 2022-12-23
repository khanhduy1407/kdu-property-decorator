# Kdu Property Decorator

This library fully depends on `kdu-class-component`, so please read its README before using this library.

## License

MIT License

## Install

```bash
npm i -S kdu-property-decorator
```

## Usage

There are several decorators and 1 function (Mixin):

- [`@Prop`](#Prop)
- [`@PropSync`](#PropSync)
- [`@Model`](#Model)
- [`@ModelSync`](#ModelSync)
- [`@Watch`](#Watch)
- [`@Provide`](#Provide)
- [`@Inject`](#Provide)
- [`@ProvideReactive`](#ProvideReactive)
- [`@InjectReactive`](#ProvideReactive)
- [`@Emit`](#Emit)
- [`@Ref`](#Ref)
- [`@KModel`](#KModel)
- `@Component` (**provided by** `kdu-class-component`)
- `Mixins` (the helper function named `mixins` **provided by** `kdu-class-component`)

### <a id="Prop"></a> `@Prop(options: (PropOptions | Constructor[] | Constructor) = {})` decorator

```ts
import { Kdu, Component, Prop } from 'kdu-property-decorator'

@Component
export default class YourComponent extends Kdu {
  @Prop(Number) readonly propA: number | undefined
  @Prop({ default: 'default value' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}
```

is equivalent to

```js
export default {
  props: {
    propA: {
      type: Number,
    },
    propB: {
      default: 'default value',
    },
    propC: {
      type: [String, Boolean],
    },
  },
}
```

**Note that:**

## If you'd like to set `type` property of each prop value from its type definition, you can use [reflect-metadata](https://github.com/rbuckton/reflect-metadata).

1. Set `emitDecoratorMetadata` to `true`.
2. Import `reflect-metadata` **before** importing `kdu-property-decorator` (importing `reflect-metadata` is needed just once.)

```ts
import 'reflect-metadata'
import { Kdu, Component, Prop } from 'kdu-property-decorator'

@Component
export default class MyComponent extends Kdu {
  @Prop() age!: number
}
```

## Each prop's default value need to be defined as same as the example code shown in above.

It's **not** supported to define each `default` property like `@Prop() prop = 'default value'` .

### <a id="PropSync"></a> `@PropSync(propName: string, options: (PropOptions | Constructor[] | Constructor) = {})` decorator

```ts
import { Kdu, Component, PropSync } from 'kdu-property-decorator'

@Component
export default class YourComponent extends Kdu {
  @PropSync('name', { type: String }) syncedName!: string
}
```

is equivalent to

```js
export default {
  props: {
    name: {
      type: String,
    },
  },
  computed: {
    syncedName: {
      get() {
        return this.name
      },
      set(value) {
        this.$emit('update:name', value)
      },
    },
  },
}
```

[`@PropSync`](#PropSync) works like [`@Prop`](#Prop) besides the fact that it takes the propName as an argument of the decorator, and also creates a computed getter and setter behind the scenes. This way you can interface with the property as if it was a regular data property whilst making it as easy as appending the `.sync` modifier in the parent component.

### <a id="Model"></a> `@Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {})` decorator

```ts
import { Kdu, Component, Model } from 'kdu-property-decorator'

@Component
export default class YourComponent extends Kdu {
  @Model('change', { type: Boolean }) readonly checked!: boolean
}
```

is equivalent to

```js
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
    },
  },
}
```

`@Model` property can also set `type` property from its type definition via `reflect-metadata` .

### <a id="ModelSync"></a> `@ModelSync(propName: string, event?: string, options: (PropOptions | Constructor[] | Constructor) = {})` decorator

```ts
import { Kdu, Component, ModelSync } from 'kdu-property-decorator'

@Component
export default class YourComponent extends Kdu {
  @ModelSync('checked', 'change', { type: Boolean })
  readonly checkedValue!: boolean
}
```

is equivalent to

```js
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
    },
  },
  computed: {
    checkedValue: {
      get() {
        return this.checked
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
}
```

`@ModelSync` property can also set `type` property from its type definition via `reflect-metadata` .

### <a id="Watch"></a> `@Watch(path: string, options: WatchOptions = {})` decorator

```ts
import { Kdu, Component, Watch } from 'kdu-property-decorator'

@Component
export default class YourComponent extends Kdu {
  @Watch('child')
  onChildChanged(val: string, oldVal: string) {}

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged1(val: Person, oldVal: Person) {}

  @Watch('person')
  onPersonChanged2(val: Person, oldVal: Person) {}
}
```

is equivalent to

```js
export default {
  watch: {
    child: [
      {
        handler: 'onChildChanged',
        immediate: false,
        deep: false,
      },
    ],
    person: [
      {
        handler: 'onPersonChanged1',
        immediate: true,
        deep: true,
      },
      {
        handler: 'onPersonChanged2',
        immediate: false,
        deep: false,
      },
    ],
  },
  methods: {
    onChildChanged(val, oldVal) {},
    onPersonChanged1(val, oldVal) {},
    onPersonChanged2(val, oldVal) {},
  },
}
```

### <a id="Provide"></a> `@Provide(key?: string | symbol)` / `@Inject(options?: { from?: InjectKey, default?: any } | InjectKey)` decorator

```ts
import { Component, Inject, Provide, Kdu } from 'kdu-property-decorator'

const symbol = Symbol('baz')

@Component
export class MyComponent extends Kdu {
  @Inject() readonly foo!: string
  @Inject('bar') readonly bar!: string
  @Inject({ from: 'optional', default: 'default' }) readonly optional!: string
  @Inject(symbol) readonly baz!: string

  @Provide() foo = 'foo'
  @Provide('bar') baz = 'bar'
}
```

is equivalent to

```js
const symbol = Symbol('baz')

export const MyComponent = Kdu.extend({
  inject: {
    foo: 'foo',
    bar: 'bar',
    optional: { from: 'optional', default: 'default' },
    baz: symbol,
  },
  data() {
    return {
      foo: 'foo',
      baz: 'bar',
    }
  },
  provide() {
    return {
      foo: this.foo,
      bar: this.baz,
    }
  },
})
```

### <a id="ProvideReactive"></a> `@ProvideReactive(key?: string | symbol)` / `@InjectReactive(options?: { from?: InjectKey, default?: any } | InjectKey)` decorator

These decorators are reactive version of `@Provide` and `@Inject`. If a provided value is modified by parent component, then the child component can catch this modification.

```ts
const key = Symbol()
@Component
class ParentComponent extends Kdu {
  @ProvideReactive() one = 'value'
  @ProvideReactive(key) two = 'value'
}

@Component
class ChildComponent extends Kdu {
  @InjectReactive() one!: string
  @InjectReactive(key) two!: string
}
```

### <a id="Emit"></a> `@Emit(event?: string)` decorator

The functions decorated by `@Emit` `$emit` their return value followed by their original arguments. If the return value is a promise, it is resolved before being emitted.

If the name of the event is not supplied via the `event` argument, the function name is used instead. In that case, the camelCase name will be converted to kebab-case.

```ts
import { Kdu, Component, Emit } from 'kdu-property-decorator'

@Component
export default class YourComponent extends Kdu {
  count = 0

  @Emit()
  addToCount(n: number) {
    this.count += n
  }

  @Emit('reset')
  resetCount() {
    this.count = 0
  }

  @Emit()
  returnValue() {
    return 10
  }

  @Emit()
  onInputChange(e) {
    return e.target.value
  }

  @Emit()
  promise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(20)
      }, 0)
    })
  }
}
```

is equivalent to

```js
export default {
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    addToCount(n) {
      this.count += n
      this.$emit('add-to-count', n)
    },
    resetCount() {
      this.count = 0
      this.$emit('reset')
    },
    returnValue() {
      this.$emit('return-value', 10)
    },
    onInputChange(e) {
      this.$emit('on-input-change', e.target.value, e)
    },
    promise() {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(20)
        }, 0)
      })

      promise.then((value) => {
        this.$emit('promise', value)
      })
    },
  },
}
```

### <a id="Ref"></a> `@Ref(refKey?: string)` decorator

```ts
import { Kdu, Component, Ref } from 'kdu-property-decorator'

import AnotherComponent from '@/path/to/another-component.kdu'

@Component
export default class YourComponent extends Kdu {
  @Ref() readonly anotherComponent!: AnotherComponent
  @Ref('aButton') readonly button!: HTMLButtonElement
}
```

is equivalent to

```js
export default {
  computed() {
    anotherComponent: {
      cache: false,
      get() {
        return this.$refs.anotherComponent as AnotherComponent
      }
    },
    button: {
      cache: false,
      get() {
        return this.$refs.aButton as HTMLButtonElement
      }
    }
  }
}
```

### <a id="KModel"></a> `@KModel(propsArgs?: PropOptions)` decorator

```ts
import { Kdu, Component, KModel } from 'kdu-property-decorator'

@Component
export default class YourComponent extends Kdu {
  @KModel({ type: String }) name!: string
}
```

is equivalent to

```js
export default {
  props: {
    value: {
      type: String,
    },
  },
  computed: {
    name: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
```
