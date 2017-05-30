title: Projects
---

# fractal

写代码的目的也可以很单纯。比如，让自己开心。

![Mandelbrot](/assets/images/projects/mandelbrot.png)

+ [项目地址](https://github.com/myst729/fractal)
+ [演示地址](https://myst729.github.io/fractal)

<p class="eof"><i></i></p>

# takahashi

有了趁手的工具以后，一些以前做起来很麻烦很费事的东西，现在都变得无比简单。我算手慢的，撸这个高桥流投影片模版，也就是晚饭后睡觉前这会儿功夫。如果不知道高桥流是什么，可以看[这里](https://zh.wikipedia.org/wiki/%E9%AB%98%E6%A9%8B%E6%B5%81%E7%B0%A1%E5%A0%B1%E6%B3%95)。

操作方式很简单。桌面浏览器按键盘的右（➡️）、下（⬇️）和空格键向后翻页，按左（⬅️）和上（⬆️）向前翻页。移动设备上左划向后翻页，右划向前翻页。

+ [项目地址](https://github.com/myst729/takahashi)
+ [演示地址](https://myst729.github.io/takahashi)

<p class="eof"><i></i></p>

# Vue Source Code

写了个看 Vue.js 源码的玩具，就近链接各个模块，方便阅读。

Vue 的源码里混杂了 flow 语法，导致 highlight.js 等语法高亮库直接跪了。因此全程请求 GitHub 的 markdown 渲染 API，性能感人，翻墙还可以，不翻墙就别看了。另外由于 GitHub API 对未认证访问每 IP 每小时 60 次的限制，如果不设置 [personal access token](https://github.com/settings/tokens) 基本看不了几个模块就超限了。好在这个简单的认证几乎没有成本，况且想看 Vue 源码的人应该都有 GitHub 账号吧。认证后每 IP 每小时访问次数的限制可以提升到 5000，足够了。

发到微博上以后，有人建议可以写成通用的模块浏览工具。其实一开始就这样想的，然而有点小麻烦——Vue 项目的构建工具设置了一些别名，这些别名被用于解析模块路径。因此这部分并不是纯粹的 ECMAScript 模块语法。在处理上，这个源码阅读器也实现得很粗糙，是根据 Vue 的项目设置硬编码的。如何读取使用者的通用别名设置，这个暂时没想好。还有建议说支持读取本地项目，这个也是不错的想法。再就是可以用 Electron 做成本地应用，有了系统级接口的支持应该还可以开发一些有趣的功能。

然而暂时只是一个玩具，待续……

![Vue Source Code](/assets/images/projects/vue-source-code.png)

+ [项目地址](https://github.com/myst729/vue-source-code)
+ [演示地址](https://myst729.github.io/vue-source-code)

<p class="eof"><i></i></p>

# Vue Webpack Seed Projects

用了一段时间 vue-cli，觉得官方提供的 Webpack 模版还是过于大而全，想自己搞一个精简一些的，就弄了这么个东西。当然最后弄下来，该有的东西都加上之后，也并没有比官方的模版轻多少，就当是学了一下搭建 Webpack 环境吧。

不过官方模版的示例 app 太简单了，我按照自己的想法整了一个复杂得多的示例。这个示例集成了 vue-router、vuex、vue-i18n 和 vue-resource，基本上，搭建一个大型 Web 应用项目需要用的东西都在里面了。

+ [Webpack 1 项目地址](https://github.com/myst729/vue-webpack)
+ [Webpack 1 演示地址](https://myst729.github.io/vue-webpack)

还有一个针对 Electron 应用开发的，支持 VS Code 调试主线程。

+ [Electron + Webpack 项目地址](https://github.com/myst729/vew)

Webpack 2 加入了类似 Rollup 的 tree-shaking 特性，听上去很吸引人。不过因为还在 beta 阶段，文档又是一贯出了名的糟烂，所以很多问题我也还没整明白。比如 vue 组件中抽取 CSS 的 sourcemap 就没有搞定（其实就连 tree-shaking 怎么配置我也还没搞明白）……

+ [Webpack 2 项目地址](https://github.com/myst729/vue-webpack-2)
+ [Webpack 2 演示地址](https://myst729.github.io/vue-webpack-2)

仿照 vue-cli 官方模版改写了一个 Electron + Webpack 2 的模版。配置和上面的 Electron 种子项目完全一样，只是示例应用借用了官方模版的。

+ [Electron + Webpack for vue-cli 项目地址](https://github.com/myst729/electron-webpack)

打算后面等 Webpack 2 正式发布再接着折腾，暂时不推荐，先用 Webpack 1 吧。

<p class="eof"><i></i></p>

# AJAX File Uploader

厂里项目要做一个上传文件的组件。没有看到满意的开源项目，要么太大太重，要么需求细节不满足。干脆自己撸一个。用 `XMLHttpRequest` level 2 实现的，带上传进度。

+ [项目地址](https://github.com/myst729/ajax-upload)

<p class="eof"><i></i></p>

# N Puzzle Solver

之前写过这种 n puzzle 小游戏，连带写个自动求解吧。写完不禁感叹，自己以前对 A* 算法的理解还是太表象了。加强理论基础学习，那是必须的。

![15 Puzzle](/assets/images/projects/n-puzzle-solver.png)

+ [项目地址](https://github.com/myst729/n-puzzle-solver)
+ [演示地址](https://myst729.github.io/n-puzzle-solver)

<p class="eof"><i></i></p>

# Vuelog

算是用 Vue.js 写的第一个还算像样的东西。起因是对 Hexo 的更新构建厌烦了，又懒于配置 GitHub 的自动构建系统。干脆动手写了一个无后端，更新也不需要构建的 blog 系统。回头看其实有不少问题和可以改进的地方，代码也被人吐槽写得丑。学习嘛，慢慢来……

+ [项目地址](https://github.com/myst729/Vuelog)
+ [演示地址](https://myst729.github.io/Vuelog)

<!-- next -->

# Vue Tada

用 Vue 实现的一个 todo 小应用，练手。

+ [项目地址](https://github.com/myst729/vue-tada)
+ [演示地址](https://myst729.github.io/vue-tada)

<p class="eof"><i></i></p>

# chemequal

一个渲染化学方程式的小玩意。本来还想做自动配平的，烂尾中……

+ [项目地址](https://github.com/myst729/chemequal)
+ [演示地址](https://myst729.github.io/chemequal)

<p class="eof"><i></i></p>

# A* 寻路算法动画演示

[A* 算法](http://en.wikipedia.org/wiki/A*_search_algorithm)是一种解决图遍历问题的计算机算法，在电子游戏中最主要的应用是寻找地图上两点间的最短路线。

![A*](/assets/images/projects/a-star-pathfinding.gif)

+ [项目地址](https://github.com/myst729/a-star-pathfinding)
+ [演示地址](https://myst729.github.io/a-star-pathfinding)

<p class="eof"><i></i></p>

# Bulkop - 批量图像优化工具

一个基于 NodeJS 的图像优化工具，除了可用于 JPG、PNG、GIF 格式的图片外，对 SVG 格式也有很好的优化效果。

![Bulkop](/assets/images/projects/bulkop.png)

+ [项目地址](https://github.com/myst729/bulkop)

<p class="eof"><i></i></p>

# CTRL

手机控制 Web 演讲稿的工具，通过运行在 NodeJS 上的 WebSocket 服务实现。客户端只需要引用一个脚本，兼容 [HTML5Slides](https://code.google.com/p/html5slides/)、[reveal.js](https://github.com/hakimel/reveal.js) 等主流 Web 演讲稿模板。实际使用后发现，这个工具无法解决屏保程序的问题。因此，对于少则半小时，多则一两个小时的演讲环境，这个工具的实用性很有限。云服务由 [IBM Bluemix](https://bluemix.net/) 提供。

![CTRL](/assets/images/projects/ctrl.png)

+ [项目地址](https://github.com/myst729/ctrl)
+ [演示地址](http://ctrl.mybluemix.net/)

<p class="eof"><i></i></p>

# Point in Polygon

判断一个点是否在二维平面内，这是计算机图形学中很常见和基础的一类问题。详情请阅读博文[两种方法判断平面内的点是否在多边形内](#/blog/articles/2013/two-solutions-for-point-in-polygon-problem)。

+ [项目地址](https://github.com/myst729/point-in-polygon)
+ [演示地址](https://myst729.github.io/point-in-polygon)

<p class="eof"><i></i></p>

# 字符串查找算法

字符串查找和匹配可以说是计算机科学中最基础、最广泛存在的问题。除了最简单但低效的暴力算法，也给出了 [KMP](http://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) 和 [BM](http://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm) 两种经典且非常高效的算法实现。

+ [项目地址](https://github.com/myst729/string-search-algorithm)

<p class="eof"><i></i></p>

# 时钟方向坐标系点排序

对坐标系中的离散点按时钟方向排序的动画演示。详情请阅读博文[时钟方向坐标系点排序算法及 JavaScript 实现](#/blog/articles/2012/clockwise-points-sorting)和[借助 Wind.js 编写更流畅的异步代码](#/blog/articles/2012/better-asynchronous-coding-with-windjs)。

![Clockwise Points Sorting](/assets/images/projects/clockwise-points-sorting.gif)

+ [项目地址](https://github.com/myst729/clockwise-points-sorting)
+ [演示地址](https://myst729.github.io/clockwise-points-sorting/demo3.html)

<!-- next -->

# step.js

一个简易的 Promise 实现，支持 `then` 和 `when` 方法调用。

+ [项目地址](https://github.com/myst729/step.js)
+ [演示地址](https://myst729.github.io/step.js)

<p class="eof"><i></i></p>

# front.js

一个 JavaScript 实现的模板引擎。功能比较简陋，只支持简单的逻辑、自动迭代和多层结构的数据。跟 force.js 一样，不适合真正的生产环境，可以作为了解和学习模版引擎实现机制的参考。

+ [项目地址](https://github.com/myst729/front.js)
+ [演示地址](https://myst729.github.io/front.js)

<p class="eof"><i></i></p>

# force.js

一个简易的 AMD 模块加载器。由于没有写构建工具，因此在生产环境恐怕没有太大的实用价值。但作为对 AMD 规范和实现机制的学习和理解，应该算得上一个不错的开始。

+ [项目地址](https://github.com/myst729/force.js)
+ [演示地址](https://myst729.github.io/force.js)

<p class="eof"><i></i></p>

# Reposidget WordPress 插件

Reposidget - GitHub 仓库挂件的 WordPress 插件。详情请阅读博文 [WordPress 插件版 Reposidget：WP Reposidget](#/blog/articles/2013/port-reposidget-to-wordpress)。

![WP Reposidget](/assets/images/projects/wp-reposidget.png)

+ [项目地址](https://github.com/myst729/wp-reposidget)

<p class="eof"><i></i></p>

# txt2img 山寨长微博 WordPress 插件

可以把文章和页面内容转换成图片分享到新浪微博的 WordPress 插件，详情请阅读博文 [txt2img — 把 WordPress 文章发布到新浪微博](#/blog/articles/2012/txt2img-publish-posts-to-weibo)及[单纯的满足感：关于 txt2img 插件](#/blog/articles/2012/pure-satisfaction-about-txt2img-plugin)。

![txt2img](/assets/images/projects/wp-txt2img.png)

+ [项目地址](https://github.com/myst729/txt2img)

<p class="eof"><i></i></p>

# 贝塞尔曲线生成器

动态演示 de Casteljau 算法绘制贝塞尔曲线的过程。关于贝塞尔曲线，请阅读博文[贝塞尔曲线扫盲](#/blog/articles/2013/bezier-curve-literacy)。

![Bezier Curve](/assets/images/projects/bezier-curve.png)

+ [项目地址](https://github.com/myst729/bezier-curve)
+ [演示地址](https://myst729.github.io/bezier-curve)

<p class="eof"><i></i></p>

# HTML5 Jukebox

HTML5 实现的音乐播放器，一个无聊的礼拜六写的半成品。还有一些计划的功能没有完成，但是没有心思继续做了。

+ [项目地址](https://github.com/myst729/html5-jukebox)
+ [演示地址](https://myst729.github.io/html5-jukebox)

<p class="eof"><i></i></p>

# 15 Puzzle

一个简单的 15 子棋游戏，用键盘方向键 `←`、`↑`、`→`、`↓` 进行游戏。

![15 Puzzle](/assets/images/projects/15-puzzle.png)

+ [项目地址](https://github.com/myst729/15-puzzle)
+ [演示地址](https://myst729.github.io/15-puzzle)

<!-- next -->

# 生命游戏和兰顿蚂蚁

生命游戏和兰顿蚂蚁是两个非常著名的细胞自动机游戏，属于零玩家游戏的一种。详情请阅读博文[生命游戏和兰顿蚂蚁](#/blog/articles/2013/game-of-life-and-langtons-ant)。

#### 生命游戏

+ [项目地址](https://github.com/myst729/game-of-life)
+ [演示地址](https://myst729.github.io/game-of-life)

#### 兰顿蚂蚁

+ [项目地址](https://github.com/myst729/ant)
+ [演示地址](https://myst729.github.io/ant)

<p class="eof"><i></i></p>

# 宽度自适应瀑布流

写了个瀑布流这种事，我会随便到处跟人讲吗？绝对定位，页面宽度自适应。

+ [项目地址](https://github.com/myst729/Waterfall)
+ [演示地址](https://myst729.github.io/Waterfall)

根据用户的建议，添加了 [MIT 开源协议](http://opensource.org/licenses/MIT)。这竟然是我在 GitHub 上得到 star 最多的项目……

<p class="eof"><i></i></p>

# HTML 演讲稿模板

随便写的，放了很久，一直没完工。

+ [项目地址](https://github.com/myst729/Presentation)
+ [演示地址](https://myst729.github.io/Presentation)

操作方法：

向前翻页 `←`，`↑`，`PgUp`
向后翻页 `→`，`↓`，`PgDn`，`　　Space　　`
回第一页 `Home`
最后一页 `End`

<p class="eof"><i></i></p>

# HTML 简历模板

做前端开发的同学们，为什么不能用 HTML 编写自己的简历呢？

+ [项目地址](https://github.com/myst729/Resume)
+ [演示地址](https://myst729.github.io/Resume)

响应式设计（responsive design），不同屏幕分辨率下显示效果略有不同。对打印样式也做了优化，打印纸质文档时，超链接会以 URL 的形式打印出来。

最后一次更新是 2012 年末找工作那阵子。现在看来其实做得很一般，体验没有自己想象那么好。最大的感受是打印样式的设计太难了，要考虑的边边角角并不比屏幕显示设备简单，而且一个很麻烦的问题是预览成本高……

<p class="eof"><i></i></p>

# 经典排序算法

[冒泡排序](http://en.wikipedia.org/wiki/Bubble_sort)、[归并排序](http://en.wikipedia.org/wiki/Merge_sort)、[快速排序](http://en.wikipedia.org/wiki/Quicksort)三个经典排序算法的 JavaScript 实现。详情请阅读博文[几个经典排序算法的 JavaScript 实现](#/blog/articles/2012/sorting-algorithm-javascript-implementation)。

+ [项目地址](https://github.com/myst729/sorting-algorithm)

<p class="eof"><i></i></p>

# Reposidget - GitHub 仓库挂件

一个展示 GitHub 仓库相关信息的小挂件，名字叫 Reposidget，意思是 Repository + Widget。

它是利用 GitHub 开放 API 中与仓库相关的 JSONP 接口开发的，可以把一个含有类名 `reposidget` 并指向 GitHub 仓库页面的普通超链接变成一个仓库挂件（~~由于 GitHub 的限制，未认证用户每小时对一个 URI 只能请求 60 次，因此访问量大的网站使用这个插件可能会很快用完限额而看不到效果~~<ins>已增加认证功能，认证后请求限额为每小时 5000 次</ins>）。

![Reposidget](/assets/images/projects/reposidgit.png)

+ [项目地址](https://github.com/myst729/Reposidget)
+ [演示地址](https://myst729.github.io/Reposidget)

<p class="eof"><i></i></p>

# 山寨卡通头像生成器

卡通头像生成工具 [FaceYourManga](http://www.faceyourmanga.com/) 的山寨版本。扒素材是个很累人的事情，因此只做了一小部分，主要目的是技术实现。

![Favatar](/assets/images/projects/favatar.png)

+ [项目地址](https://github.com/myst729/Favatar)
+ [演示地址](https://myst729.github.io/Favatar)
