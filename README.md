# 金融工场 网站页面

> 启动命令npm run gulp web:文件名:watch

当前代码库中包含2个项目

* web 金融工场 主站PC端部分页面
* keji-web
* p2p-web
* zx-web

使用方式:

2个项目使用方式相同, 都要先对代码进行编译, 生成目标文件到 build 目录中, 才可以使用.
在正式发布时, build 目录中的文件会再次被版本化, 并将添加版本号的文件添加到 cdn 目录中.

本代码库中项目使用相同的编译流程和编译方式, 以 `web` 项目为例:

    编译指定页面
    npm run gulp web:[page_name]

    编译指定页面并开启文件监控, 页面目录内任何文件变动都会重新编译
    npm run gulp web:[page_name]:watch

    打包项目(发布时使用)
    npm run build:web

其它常用命令:

    清除所有编译结果
    npm run clean

    列出所有可用指令
    npm run gulp

PC端可以不再支持IE8 但要有相应提示