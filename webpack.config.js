const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const TenserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
	entry: {
		mini_engine: './src/main.ts',
		'mini_engine.min': './src/main.ts',
	},
	output: {
		filename: '[name].js',
		library: 'mini_engine',
		libraryTarget: 'umd', //umd 是兼容的
		libraryExport: 'default',
	},
	resolve: {
		extensions: ['.js', '.json', '.ts'],
		alias: {
			'@src': path.resolve(__dirname, 'src/'),
			types: path.resolve(__dirname, 'src/core/types/'),
			'@utils': path.resolve(__dirname, 'src/core/utils/'),
			'@views': path.resolve(__dirname, 'src/core/views/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.ts/,
				use: {
					// loader: 'babel-loader',
					loader: 'ts-loader',
				},
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
		],
	},
	mode: 'none',
	optimization: {
		minimize: true, // 是否开启压缩
		minimizer: [
			new TenserWebpackPlugin({
				test: /\.min\.js$/, // 只针对 .min.js进行压缩
				terserOptions: {
					compress: {
						// drop_console: true,
						drop_debugger: false,
						// pure_funcs: ['console.log'], // 移除console
					},
				},
			}),
		],
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
			scriptLoading: 'blocking',
		}),
	],
	devServer: {
		// contentBase: './dist', //这个一般都不会去改的
		port: 666, //服务器端口
		open: true, //自动打开浏览器的窗口
		hot: true,
	},
}
