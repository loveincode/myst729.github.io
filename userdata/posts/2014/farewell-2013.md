title: 2013 小汇总
date: 2014-01-01
---
2013 年已经结束了，今天是 2014 年的第一天。过去的一年里做了不少事情，但是太忙了，只写了 12 篇文章（包括 2 篇翻译），希望新的一年里能更好的调整和安排时间，争取多写一些东西。下面把去年做过但没来得及介绍，或者不值得单独写一篇文章的小玩意整理一下。

force.js，2月份写的一个简易的 [AMD](http://en.wikipedia.org/wiki/Asynchronous_module_definition) 加载器。由于没有写构建工具，因此在生产环境恐怕没有太大的实用价值。但作为对 AMD 规范和实现机制的学习和理解，应该算得上一个不错的开始。

+ https://github.com/myst729/force.js

front.js，年中写的一个 JavaScript 模板引擎。功能比较简陋，只支持简单的逻辑、自动迭代和多层结构的数据。跟 force.js 一样，不适合真正的生产环境，可以作为了解和学习模版引擎实现机制的参考。<!-- more -->

+ https://github.com/myst729/front.js

HTML5 Jukebox，音乐播放器。也是在年中，一个无聊的礼拜六写的半成品。还有一些计划功能没有完成，但是没有心思继续做了。这个烂尾楼最有意思的部分是，音频文件都托管在[七牛云](https://portal.qiniu.com/)，速度杠杠的，开发者账号还有免费限额！顺便说一句，歌单里都是我很喜欢的歌。

+ https://github.com/myst729/html5-jukebox

2013 年做的最后一件事，就是学习了用于字符串查找的 [KMP](http://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) 算法和 [BM](http://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm) 算法，并且用 JavaScript 分别写了实现。不出意外的，这两个实现都不如原生的 `String.prototype.indexOf` 快。这是两个非常经典的字符串查找算法，大家可以到 wikipedia 页面了解更多细节。虽然有些人始终认为 Web 前端就是小打小闹，切切图，做做特效而已，也有不少妄自菲薄的前端开发者认为自己不需要了解算法，甚至对此抱有抵触和厌恶的情绪，但我相信，随着 web 前端技术和规范的飞速发展，扎实的理论基础会成为我们职业发展的基石。

+ https://github.com/myst729/string-search-algorithm

2013 年快要结束的时候学了一点点 Python，不过看起来这门语言对我没有太大吸引力，我想我还是应该花更多精力在 JavaScript 和 NodeJS 上。

除此之外，2013 年也读了一些书，有技术的，也有人文的，但收获最大的却是这本[《观止-微软创建 NT 和未来的夺命狂奔》](http://www.amazon.cn/dp/B002J9I5JI/)。

![观止](/assets/images/2014/01/showstopper.jpg)

书的内容全都是微软开发 [Windows NT](http://en.wikipedia.org/wiki/Windows_NT) 操作系统这个过程中发生的事情。故事开始于上世纪 80 年代末，NT 项目的核心人物、传奇程序员 [Dave Cutler](http://en.wikipedia.org/wiki/Dave_Cutler) 加入微软，直到 1993 年第一个版本 NT 3.1 发布。Windows NT 是计算机软件工程史上数一数二的超大规模项目，这个项目从最初计划的 18 个月，历经多次延期，最终耗费了 5 年才得以完成，这在今天简直是无法想像的。这五年中，这个项目遭遇了很多变动，产品规划、项目进度、人员构成，不仅如此，参与这个项目的人之间的关系，以及他们各自的生活，都因为这个项目而彻底改变。有一种说法，工程管理说到底其实是对人的管理。这个说法可能并不全面，但也有一定的道理。相信读过《观止》这本书后，你会对这个说法有非常深刻的体会。

2013 年，一些老朋友的人生走向了新的阶段，有的人当了爹娘，有的人结了婚。2013 年也认识了一些新朋友。

一年就这么过去了，做了一些事，也错过一些事，希望新的一年再接再厉，实现人生新的突破。