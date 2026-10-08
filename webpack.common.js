module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: "html-loader",
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.svg$/i,
                type: "asset/source"
            },
        ],
    },
};