/// <reference types='reflect-metadata'/>
import Kdu, { PropOptions } from 'kdu'
import { Constructor } from 'kdu/types/options'

/** @see {@link https://github.com/kdujs/kdu-class-component/blob/main/src/reflect.ts} */
const reflectMetadataIsSupported =
  typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined'

export function applyMetadata(
  options: PropOptions | Constructor[] | Constructor,
  target: Kdu,
  key: string,
) {
  if (reflectMetadataIsSupported) {
    if (
      !Array.isArray(options) &&
      typeof options !== 'function' &&
      !options.hasOwnProperty('type') &&
      typeof options.type === 'undefined'
    ) {
      const type = Reflect.getMetadata('design:type', target, key)
      if (type !== Object) {
        options.type = type
      }
    }
  }
}
