/** kdu-property-decorator verson 9.1.2 MIT LICENSE copyright 2020 kaorun343 */
/// <reference types='reflect-metadata'/>
import Kdu from 'kdu'
import Component, { mixins } from 'kdu-class-component'

export { Component, Kdu, mixins as Mixins }

export { Emit } from './decorators/Emit'
export { Inject } from './decorators/Inject'
export { InjectReactive } from './decorators/InjectReactive'
export { Model } from './decorators/Model'
export { ModelSync } from './decorators/ModelSync'
export { Prop } from './decorators/Prop'
export { PropSync } from './decorators/PropSync'
export { Provide } from './decorators/Provide'
export { ProvideReactive } from './decorators/ProvideReactive'
export { Ref } from './decorators/Ref'
export { KModel } from './decorators/KModel'
export { Watch } from './decorators/Watch'
