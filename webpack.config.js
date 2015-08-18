// webpack.config.js
module.export = {
	entry: './src/js/main.js',
	output: {
		filename: './dist/bundle.js'
	},
	module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
}