import Kdu, { PropOptions } from 'kdu'
import { createDecorator } from 'kdu-class-component'
import { Constructor } from 'kdu/types/options'
import { applyMetadata } from '../helpers/metadata'

/**
 * decorator of synced model and prop
 * @param propName the name to interface with from outside, must be different from decorated property
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
export function ModelSync(
  propName: string,
  event?: string,
  options: PropOptions | Constructor[] | Constructor = {},
) {
  return (target: Kdu, key: string) => {
    applyMetadata(options, target, key)
    createDecorator((componentOptions, k) => {
      ;(componentOptions.props || ((componentOptions.props = {}) as any))[
        propName
      ] = options
      componentOptions.model = { prop: propName, event: event || k }
      ;(componentOptions.computed || (componentOptions.computed = {}))[k] = {
        get() {
          return (this as any)[propName]
        },
        set(value) {
          // @ts-ignore
          this.$emit(event, value)
        },
      }
    })(target, key)
  }
}
