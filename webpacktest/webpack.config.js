
var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: [
       // 'webpack/hot/dev-server',
        // 'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, './src/script/main.js')
    ],
    output:{
        filename:'js/bundle.js',
        path: path.resolve('./dist')
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel'
        }, {
            test: /\.css$/, // Only .css files
            loader: 'style-loader!css-loader' // Run both loaders
        },
            {
               test:/\.less$/,
                loader:'less-loader'
            },
            {
                test:/\.sass$/,
                loader:'sass-loader'
            },
            {
                test:/\.(jpg|svg|png|gif)$/,
                loader:'file-loader'
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({template:"./index.html"})
    ]
}
