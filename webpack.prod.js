//este plugin habilita la importacion del html
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyWebpack = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");

module.exports={
    mode:'production',

    output:{
        clean:true,
        filename:'main.[contenthash].js',
    },

    module:{
        rules:[
            {
                test:/\.html$/,//busca todos los archivmos html
                loader:'html-loader',//aca indica quien lo carga
                options:{
                    sources:false
                }
            },
            {
                test:/\.css$/,
                exclude:/style.css$/,
                use:['style-loader','css-loader']//siempr poner en este orden sino mostrara error
            },
            {
                test:/style.css$/,//un estilo global
                use:[MiniCssExtract.loader,'css-loader']
            },
            {
                test:/\.(png|jpe?g|gif)$/,//carga lo que son las imagenes
                loader:'file-loader'

            },
            {
                test:/\.m?js$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            }
        ],
    },

    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizer(),
            new Terser()
        ]
    },

    plugins:[
        new HtmlWebPackPlugin({
            title:'Mi App',
            filename:'index.html',
            template:'./src/index.html',
        }),
        new MiniCssExtract({
            filename:'[name].[fullhash].min.css',//[name].[fullhash].css
        }),
        new CopyWebpack(
            {
                patterns:[
                    {from:'src/assets/img/',to:'assets/img/'}//copia los archivos de la carpeta img a produccion
                ]
            }
        ),
        new CssMinimizer(),
        new Terser()

    ],

}