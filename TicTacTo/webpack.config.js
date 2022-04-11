const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	name: 'tictacto-setting',
	mode: 'development',
	devtool: 'eval',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	entry: {
		app: ['./client'], //extensions에 의해 client.js 혹은 client.jsx 찾음
	}, //이름은 바꿀 수 있음 - 다른 프로젝트들은 뭘로 하려나

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
					plugins: ['react-refresh/babel'],
				},
			},
		],
	},

	plugins: [new RefreshWebpackPlugin()],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/dist',
	},
	devServer: {
		devMiddleware: { publicPath: '/dist' }, //webpack이 생성해준 파일들의 경로
		static: { directory: path.resolve(__dirname) }, //실제로 존재하는 정적파일들의 정보
		hot: true,
	},
};
