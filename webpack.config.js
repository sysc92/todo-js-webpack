//este plugin habilita la importacion del html
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyWebpack = require("copy-webpack-plugin");

module.exports={
    mode:'development',

    output:{
        clean:true,
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

            }
        ],
    },

    optimization:{},

    plugins:[
        new HtmlWebPackPlugin({
            title:'Mi App',
            filename:'index.html',
            template:'./src/index.html',
        }),
        new MiniCssExtract({
            filename:'style.min.css',//[name].[fullhash].css
        }),
        new CopyWebpack(
            {
                patterns:[
                    {from:'src/assets/img/',to:'assets/img/'}//copia los archivos de la carpeta img a produccion
                ]
            }
        )

    ],

}