const path = require('path');
const webpack = require('webpack');
const glob = require("glob");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const fs = require('file-system');
const CopyWebpackPlugin = require('copy-webpack-plugin');
let html = [];

fs.recurseSync('./src/assets/pug/', function(filepath, relative, filename) {
    html.push((filepath.split('\\').pop()).split('.').shift());
});


let multiplesFiles = html.map(function (entryName) {
    return new HtmlWebPackPlugin({
        filename: entryName + '.html',
        template: __dirname + `/src/assets/pug/${entryName}.pug`
    });
});



const pug = {
    test: /\.pug$/,
    use: ['html-loader?attrs=false', 'pug-html-loader']
};



module.exports = {
    entry: './src/assets/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            },

        },
            pug,
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: false
                    }
                }]
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./node_modules']
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: "file-loader"
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/img',
                to: './src/img'
            },
        ]),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),

    ].concat(multiplesFiles)
};