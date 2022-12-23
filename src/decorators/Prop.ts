import Kdu, { PropOptions } from 'kdu'
import { createDecorator } from 'kdu-class-component'
import { Constructor } from 'kdu/types/options'
import { applyMetadata } from '../helpers/metadata'

/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
export function Prop(options: PropOptions | Constructor[] | Constructor = {}) {
  return (target: Kdu, key: string) => {
    applyMetadata(options, target, key)
    createDecorator((componentOptions, k) => {
      ;(componentOptions.props || ((componentOptions.props = {}) as any))[
        k
      ] = options
    })(target, key)
  }
}
