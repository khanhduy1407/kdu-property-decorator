export default {
  input: 'lib/kdu-property-decorator.js',
  output: {
    file: 'lib/kdu-property-decorator.umd.js',
    format: 'umd',
    name: 'KduPropertyDecorator',
    globals: {
      kdu: 'Kdu',
      'kdu-class-component': 'KduClassComponent',
    },
    exports: 'named',
  },
  external: ['kdu', 'kdu-class-component', 'reflect-metadata'],
}
