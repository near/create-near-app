module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "My NEAR Vue App";
                return args;
            })
    }
}
