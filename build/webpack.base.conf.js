const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/'
};

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		main: PATHS.src + '/js'
	},
	output: {
		filename: `${PATHS.assets}js/[name].js`,
		path: PATHS.dist,
		publicPath: '/'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		}, {
			test: /\.css$/,
			use: [
			'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {sourceMap: true}
				}, {
					loader: 'postcss-loader',
					options: {sourceMap: true, config: {path: `${PATHS.src}/js/postcss.config.js`}}
				}
			]
		}]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].css`
		}),
		new HtmlWebpackPlugin({
			hash: false,
			template: `${PATHS.src}/index.html`,
			filename: 'index.html'
		}),
		new CopyWebpackPlugin([
			{from: `${PATHS.src}/img`, to: `${PATHS.assets}img`},
			{from: `${PATHS.src}/data`, to: `${PATHS.assets}data`}
		]),
		new CleanWebpackPlugin()
	]
};