title: 借助 Wind.js 编写更流畅的异步代码
date: 2012-09-09
---
两个月前我写过一篇[时钟方向坐标系点排序算法及 JavaScript 实现](#/blog/articles/2012/clockwise-points-sorting)。最初的演示只能打印输入输出，实在太简陋，因此我后来加了一个用 canvas 实现的排序结果图。由于这个图是一次生成的，跟我为文章制作的动画 GIF 图（见下图）相比，演示效果显得很一般。考虑到 canvas 可编程的特性，我决定给 demo 中的排序图加上动画，让演示效果更直观有趣。然而跟大多数的 JavaScript 异步编程一样，这个过程让人十分抓狂：为了满足延时的需求，程序原有的结构完全被拆开，分散在各种回调函数中。有没有一种工具可以让我们用同步的方式编写异步代码呢？老赵开发的 [Wind.js](http://windjs.org/) 就是这样一种工具。本文将尝试使用传统的 `setTimeout` 大法和 Wind.js 分别实现给演示加上动画的需求。

![Clockwise Points Sorting](/assets/images/2012/07/clockwise-points-sorting.gif)

先来看看最初没有动画效果的演示代码，其中部分用伪代码代替（如果您对隐去的代码感兴趣，可以在[这里](https://github.com/myst729/clockwise-points-sorting/blob/gh-pages/demo1.html)查看完整代码）。<!-- more -->

```js
var drawLine = function(points, i) {
    /* 绘制线条 */
};

var drawPoints = function(points) {
    /* 绘制所有输入的点 */
 
    for(var i = 0, l = points.length; i < l; i++) {
        drawLine(points, i);
    }
};
```

在按下“排序”按钮时，下面这行代码将会被执行，从而开始图像的绘制。其中 `clockwiseSorting` 是一个点排序的算法，具体内容请阅读[前文](#/blog/articles/2012/clockwise-points-sorting)。

```js
drawPoints(clockwiseSorting(input, basic));
```

由于 JavaScript 代码运行非常快，整个绘制过程所耗费的时间短到我们无法感知。如果要实现动画效果，就必须在绘制过程中插入足够长的延时，让它慢下来。现在假设我们想让绘制线条的过程慢一点，比如说，每 400 毫秒画一条线，应该怎么做呢？可以肯定的是我们不能再使用 `for` 循环了，因为 `for` 循环的每次迭代并不会等待上一次迭代中调用函数的返回。即使我们像下面这样，在循环中加入延时，也无法控制两次迭代之间的时间间隔，所有的线条都会在 400 毫秒后绘制出来。

```js
var drawPoints = function(points) {
    /* 绘制所有输入的点 */
 
    for(var i = 0, l = points.length; i < l; i++) {
        setTimeout(function() {
            drawLine(points, i);
        }, 400);
    }
};
```

目前常见的一个解决方案，是在每次绘制结束时调用下一次绘制。

```js
var drawLine = function(points, i) {
    setTimeout(function() {
        /* 绘制线条 */
 
        if(i + 1 < points.length) {
            // 如果还有未绘制的线条，则继续下一次绘制
            drawLine(points, i + 1);
        }
    }, 400);
};
 
var drawPoints = function(points) {
    /* 绘制所有输入的点 */
 
    drawLine(points, 0);
};
```

如果你有回调癖，一定这样也不是不可以啦……

```js
var drawLine = function(points, i, callback) {
    setTimeout(function() {
        /* 绘制线条 */
 
        if(i + 1 < points.length) {
            // 如果还有未绘制的线条，则继续下一次绘制
            callback(points, i + 1, callback);
        }
    }, 400);
};
 
var drawPoints = function(points) {
    /* 绘制所有输入的点 */
 
    drawLine(points, 0, drawLine);
};
```

怎么样，难看吗？原有代码的逻辑结构整个被拆散了，这大大增加了维护异步编程代码的成本。对于复杂项目的编程，如果同步代码结构有变动，异步代码不可避免要作出调整，糟糕时甚至不得不完全重写。要是能在原有结构不变的基础上实现异步编程，那就太爽了。“接下来，就是见证奇迹的时刻。”我们要用 Wind.js 来爽一把！

首先我们要引入 Wind.js 类库。根据官方网站提供的文档，只需要添加一行代码就可以了。

```html
<script src="wind-all-0.7.1.js"></script>
```

然后要做的事情，就是按照 Wind.js 的方式编译原先用同步方式编写的 `drawPoints` 函数（即需要在 `for` 循环中加入延时的函数）。在需要延时的地方（循环中）调用 `$await`，程序运行到此处时就会暂停，当我们预设的时间过去以后，程序会从暂停中恢复过来，继续执行。

```js
var drawPointsAsync = eval(Wind.compile('async', function(points) {
    /* 绘制所有输入的点 */
 
    for(var i = 0, l = points.length; i < l; i++) {
        // 延时 400 毫秒
        $await(Wind.Async.sleep(400));
 
        drawLine(points, i);
    }
}));
```

最后只要调用 `start` 方法（千万别忘了哟~），就可以执行编译后的 `drawPointsAsync` 函数了。

```js
drawPointsAsync(clockwiseSorting(input, basic)).start();
```

大功告成，动画已经做好了。那 `drawLine` 函数怎么办？什么怎么办？已经完事了，根本不需要改动 `drawLine` 函数，神奇吧！到底有多神奇，看看下面这张 git diff 的截图，相信你会更加震惊。

![git diff](/assets/images/2012/09/windjs-git-diff.png)

从图中可以看到，使用 Wind.js 前后，代码只有几处非常小的改动，完全没有影响原有逻辑结构。相比于代码逻辑被回调函数肢解的传统手法，使用 Wind.js 编写的代码更简洁，易于维护，极大改善了异步编程的体验，解放了深陷回调漩涡的 JavaScript 程序员。

好了，对 Wind.js 的简单介绍就到这里。更多资料请访问 Wind.js 官方网站 [http://windjs.org/](http://windjs.org/) 及其 [GitHub 项目页面](https://github.com/JeffreyZhao/wind)，你还可以在新浪微博上关注 Wind.js 的作者 [@老赵](http://weibo.com/jeffz)。

附录：文中提到的几个演示

1. [没有动画的最初版本](/clockwise-points-sorting/demo1.html)
2. [setTimeout 版本](/clockwise-points-sorting/demo2.html)
3. [使用 Wind.js 的版本](/clockwise-points-sorting/demo3.html)

去 GitHub 查看[上面几个演示的代码](https://github.com/myst729/clockwise-points-sorting)