import Kdu, { PropOptions } from 'kdu'
import { createDecorator } from 'kdu-class-component'
import { Constructor } from 'kdu/types/options'
import { applyMetadata } from '../helpers/metadata'

/**
 * decorator of a synced prop
 * @param propName the name to interface with from outside, must be different from decorated property
 * @param options the options for the synced prop
 * @return PropertyDecorator | void
 */
export function PropSync(
  propName: string,
  options: PropOptions | Constructor[] | Constructor = {},
) {
  return (target: Kdu, key: string) => {
    applyMetadata(options, target, key)
    createDecorator((componentOptions, k) => {
      ;(componentOptions.props || (componentOptions.props = {} as any))[
        propName
      ] = options
      ;(componentOptions.computed || (componentOptions.computed = {}))[k] = {
        get() {
          return (this as any)[propName]
        },
        set(this: Kdu, value) {
          this.$emit(`update:${propName}`, value)
        },
      }
    })(target, key)
  }
}
