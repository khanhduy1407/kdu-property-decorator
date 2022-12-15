# Kdu Property Decorator

This library fully depends on `kdu-class-component`.

## License

MIT License

## Install

```bash
npm i -S kdu-property-decorator
```

## Usage

There are 8 decorators:

* `@Emit`
* `@Inject`
* `@Mixins` (the helper function named `mixins` defined at `kdu-class-component`)
* `@Model`
* `@Prop`
* `@Provide`
* `@Watch`
* `@Component` (**from** `kdu-class-component`)

### `@Prop(options: (PropOptions | Constructor[] | Constructor) = {})` decorator

```ts
import { Kdu, Component, Prop } from 'kdu-property-decorator'

@Component
export default class YourComponent extends Kdu {
  @Prop(Number) propA!: number
  @Prop({ default: 'default value' }) propB!: string
  @Prop([String, Boolean]) propC: string | boolean
}
```

is equivalent to

```js
export default {
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: 'default value'
    },
    propC: {
      type: [String, Boolean]
    },
  }
}
```

**Note that:**

* `reflect-metada` isn't used in this library and setting `emitDecoratorMetadata` to `true` means nothing.
* Each prop's default value need to be defined as same as the example code shown in above.

### `@Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {})` decorator

```ts
import { Kdu, Component, Model } from 'kdu-property-decorator'

@Component
export default class YourComponent extends Kdu {
  @Model('change', { type: Boolean }) checked!: boolean
}
```

is equivalent to

```js
export default {
  props: {
    checked: {
      type: Boolean
    },
    model: {
      prop: 'checked',
      event: 'change'
    }
  }
}
```

### `@Watch(path: string, options: WatchOptions = {})` decorator

```ts
import { Kdu, Component, Watch } from 'kdu-property-decorator'

@Component
export default class YourComponent extends Kdu {
  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) { }
}
```

is equivalent to

```js
export default {
  watch: {
    'child': {
      handler: 'onChildChanged',
      immediate: false,
      deep: false
    },
    'person': {
      handler: 'onPersonChanged',
      immediate: true,
      deep: true
    }
  },
  methods: {
    onChildChanged(val, oldVal) { },
    onPersonChanged(val, oldVal) { }
  }
}
```

### `@Emit(event?: string)` decorator

The functions decorated by `@Emit` `$emit` their arguments after they ran.

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
}
```

is equivalent to

```js
export default {
  data() {
    return {
      count: 0
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
    }
  }
}
```

### `@Provide(key?: string | symbol)` / `@Inject(options?: { from?: InjectKey, default?: any } | InjectKey)` decorator

```ts
import { Component, Inject, Provide, Kdu } from 'kdu-property-decorator'

const symbol = Symbol('baz')

@Component
export class MyComponent extends Kdu {
  @Inject() foo!: string
  @Inject('bar') bar!: string
  @Inject({ from: 'optional', default: 'default' }) optional!: string
  @Inject(symbol) baz!: string


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
    'optional': { from: 'optional', default: 'default' },
    [symbol]: symbol
  },
  data () {
    return {
      foo: 'foo',
      baz: 'bar'
    }
  },
  provide () {
    return {
      foo: this.foo,
      bar: this.baz
    }
  }
})
```
