import Kdu, { PropOptions } from 'kdu'
import { createDecorator } from 'kdu-class-component'
import { Constructor } from 'kdu/types/options'
import { applyMetadata } from '../helpers/metadata'

/**
 * decorator of model
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
export function Model(
  event?: string,
  options: PropOptions | Constructor[] | Constructor = {},
) {
  return (target: Kdu, key: string) => {
    applyMetadata(options, target, key)
    createDecorator((componentOptions, k) => {
      ;(componentOptions.props || ((componentOptions.props = {}) as any))[
        k
      ] = options
      componentOptions.model = { prop: k, event: event || k }
    })(target, key)
  }
}
