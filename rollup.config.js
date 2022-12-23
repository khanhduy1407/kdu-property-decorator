export default {
  input: 'lib/index.js',
  output: {
    file: 'lib/index.umd.js',
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
