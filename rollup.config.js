import path from 'path'
import { fileURLToPath } from 'url'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import alias from '@rollup/plugin-alias'
import postcss from 'rollup-plugin-postcss'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  input: './src/index.js',
  output: [
    {
      file: 'dist/react-contextmenu.js',
      format: 'es',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-dom/client': 'ReactDOM',
        'react-transition-group': 'ReactTransitionGroup'
      }
    },
  ],
  external: ['react', 'react-dom', 'react-dom/client', 'react-transition-group'],
  plugins:[
    resolve(),
    commonjs(),
    terser(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-react-jsx'],
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx']
    }),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
    }),
    postcss({
      extract: false,
      modules: false
    })
  ],  
}