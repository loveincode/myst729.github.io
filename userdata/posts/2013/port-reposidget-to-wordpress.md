title: WordPress 插件版 Reposidget：WP Reposidget
date: 2013-05-27
---
去年我曾经写过一个叫 [Reposidget](https://github.com/myst729/Reposidget) 的小玩意，利用 GitHub API 在文章/页面上显示一个仓库小挂件。

![show reposidget](/assets/images/2013/05/wp-reposidget-2.png)

最近我发现 GitHub API 抽风，导致博客上这些挂件全都无法显示（怀疑是 GFW 作怪，因为翻墙后它们都恢复正常了）。因此我决定改变以前调用 [JSONP](http://en.wikipedia.org/wiki/JSONP) 接口在浏览器端生成挂件的方式，转而通过服务器 [cURL](http://en.wikipedia.org/wiki/CURL) 的方式，直接从后端生成。服务器在国外就这个好处，可以中转一些被墙掉的数据……

WP Reposidget 插件已提交至 WordPress 官方插件目录<!-- more -->，下载请访问 **https://wordpress.org/plugins/wp-reposidget/**。

插件 2.x 版本重写了大部分代码，修复了 WordPress 自带的 TinyMCE 版本升级后造成的兼容问题。改进了后台编辑界面，使其与 WordPress 整体的界面风格一致。使用 2.x 版本请升级 WordPress 至 3.9 以上。

![add reposidget](/assets/images/2013/05/wp-reposidget-1.png)

部分同学升级到 2.x 以后网站遇到问题，这是由于 2.x 版本要求 PHP 不低于 5.3。PHP 5.3 发布已经 5 年多，根据 PHP 开发团队的时间表，对这个版本不会再做任何开发。因此我个人也选择不再向更低的版本兼容，同时建议你如果条件允许的话考虑升级 PHP 环境。条件确实不允许的同学，请参考[这里](https://github.com/myst729/wp-reposidget/issues/3)给出的两个解决方案，自行修改后上传覆盖原有文件。仍想使用 1.x 版本的同学，可以到[这里](https://github.com/myst729/wp-reposidget/releases/tag/1.0.3)下载。