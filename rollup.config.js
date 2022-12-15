export default {
  input: 'lib/kdu-property-decorator.js',
  name: 'KduPropertyDecorator',
  output: {
    file: 'lib/kdu-property-decorator.umd.js',
    format: 'umd'
  },
  external: [
    'kdu', 'kdu-class-component', 'reflect-metadata'
  ],
  exports: 'named',
  name: 'kdu-property-decorator',
  globals: {
    'kdu': 'Kdu',
    'kdu-class-component': 'KduClassComponent'
  }
}
