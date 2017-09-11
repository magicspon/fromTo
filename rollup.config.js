import babel from 'rollup-plugin-babel'
import pkg from './package.json'
import uglify from 'rollup-plugin-uglify'

export default [
	{
		entry: 'src/main.js',
		dest: pkg.main,
		format: 'umd',
		moduleName: 'fromTo',
		plugins: [
			uglify(),
			babel({
				exclude: ['node_modules/**']
			})
		]
	}
]