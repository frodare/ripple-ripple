module.exports = {
	entry: './src/rr.js',
	output: {
		path: __dirname,
		filename: 'dist/rr.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style!css'
			},{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};