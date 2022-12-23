import Kdu, { PropOptions } from 'kdu'
import { createDecorator } from 'kdu-class-component'

/**
 * decorator for capturings k-model binding to component
 * @param options the options for the prop
 */
export function KModel(options: PropOptions = {}) {
  const valueKey: string = 'value'
  return createDecorator((componentOptions, key) => {
    ;(componentOptions.props || ((componentOptions.props = {}) as any))[
      valueKey
    ] = options
    ;(componentOptions.computed || (componentOptions.computed = {}))[key] = {
      get() {
        return (this as any)[valueKey]
      },
      set(this: Kdu, value: any) {
        this.$emit('input', value)
      },
    }
  })
}
