title: 为 WordPress 官方插件目录的页面添加图片横幅
date: 2012-03-12
---
WordPress 官方插件目录最近一次改版以后，有些插件页面（比如 [Hello Dolly](https://wordpress.org/plugins/hello-dolly/)）增加了一个图片横幅，看起来效果很不错哦。

![plugin-banner-preview](/assets/images/2012/03/plugin-banner-preview.png)

那怎么让自己光秃秃的插件页面也能用上好看的图片横幅呢？<!-- more -->其实很简单，只要制作一张名为 `banner-772×250` 的图片，尺寸当然就是宽 772 像素，高 250 像素啦，图片格式可以是 png 或 jpg。在本地的 SVN 目录下新建一个名为 `assets` 的文件夹，把刚才制作好的图片放进这个文件夹，通过 SVN 提交到官方的插件仓库，稍等一会就可以看到效果啦。

![plugin-banner-svn](/assets/images/2012/03/plugin-banner-svn.png)

我的 [txt2img 山寨长微博](https://wordpress.org/plugins/txt2img/)插件在添加图片横幅以前是这样的：

![plugin-banner-before](/assets/images/2012/03/plugin-banner-before.png)

对比一下添加横幅以后的样子。怎么样？有没有觉得下载按钮更诱人了？

![plugin-banner-after](/assets/images/2012/03/plugin-banner-after.png)

[WP MashSocial Widget](https://wordpress.org/plugins/wp-mashsocial-wigdet/stats/) 插件的作者就在 2 月 16 日添加了图片横幅。看看插件的下载数据，怎么样？效果很惊人吧！

![plugin-banner-effect](/assets/images/2012/03/plugin-banner-effect.png)

一图胜千言！插件作者们，还等什么？赶紧给你的插件页面也填上图片横幅吧。