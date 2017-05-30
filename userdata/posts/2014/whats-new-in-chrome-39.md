title: Chrome 39 新功能
date: 2014-12-09
---
> 本文翻译自 [What’s New in Chrome 39](http://www.sitepoint.com/whats-new-chrome-39/)，经 [@裕波](http://weibo.com/itchina100) 大大授意，发布于 [w3ctech](http://www.w3ctech.com/topic/652)。

尽管已步入第六个年头，Chrome 的版本号仍然大踏步的向中年迈进。Chrome 39 已经发布，说不定你都装上了。它有一些很好的新功能，以及一两处令人生疑的改动。

## ECMAScript 6 生成器

生成器是以 `function*` 声明，能生成迭代器的特殊函数。迭代器是一个对象，它具有 `next()` 方法，在调用时会返回一个值。生成器函数使用 `yield` 语句向序列提供下一个值。

Arunoda Susiripala 在[《JavaScript 生成器和防止回调地狱》](http://www.sitepoint.com/javascript-generators-preventing-callback-hell/)中给出了一个基本的示例：

```js
function* HelloGen() {
    yield 100;
    yield 400;
}

var gen = HelloGen();

console.log(gen.next()); // {value: 100, done: false}
console.log(gen.next()); // {value: 400, done: false}
console.log(gen.next()); // {value: undefined, done: true}
```

Chrome、Opera 和 Firefox 31 以上版本均支持 ECMAScript 6 生成器。<!-- more -->

## 信标 API

新的[信标 API](http://www.w3.org/TR/beacon/) 使得你能够在无需等待回应的情况下向服务器发送数据。请求由浏览器排队，尽可能快的发送。然而——重要的是——它并不会对释放当前页面或加载下一页面造成延迟。

`navigator.sendBeacon()` 可传入 URL 和数据——可能是字符串或表单数据值。通常它可以用来传输统计信息，比如：

```js
navigator.sendBeacon('/log', 'page-unloaded');
```

如果浏览器排列信标请求队列成功，该方法会返回 `true`。我不知道返回 `false` 时你能做什么，但信标不应用于基本的功能或消息。

Chrome、Opera 和 Firefox 31 以上版本均支持信标 API。

## Web 动画控制

Chrome 36 引入了 [Web 动画](http://w3c.github.io/web-animations/)。这能让 JavaScript 完成类似 CSS3 的关键帧和动画声明，比如：

```js
var myanimation = myelement.animate([
    { color: "#f00" },
    { left: "20em" },
    { transform: "rotate(180deg)" }
], {
    duration: 1000,
    iterations: 1,
    delay: 0
});
```

它的优点是你可以根据用户输入或其他条件控制和同步播放。Chrome 39 增加了 `play()`、`pause()`、`reverse()`、`finish()`（把动画置为最终状态）和 `cancel()`（清除全部效果）等播放方法。

可以把 Web 动画看成是简单的 CSS3 动画与使用 `requestAnimationFrame` 和自定义时序函数的复杂 JavaScript 全帧控制之间的一种折衷。这对于一般的网页效果可能是绰绰有余，但对游戏来说还不够强大。应用程序和演示可能是很好的用例？

目前仅 Chrome 和 Opera 支持 Web 动画。Firefox 每夜构建版本也提供支持，并且[有 polyfill 可用](https://github.com/web-animations/web-animations-js)，但技术暂时还不稳定。

## Web 应用程序清单

别跟[应用程序缓存清单](http://www.sitepoint.com/offline-browsing-in-html5-with-applicationcache/)搞混了，[Web 应用程序清单](http://w3c.github.io/manifest/)是一个可以存放名称、起始地址、图标、显示模式、方向等元数据的 JSON 文件。

你会在 HTML 的 `head` 中引入一个 `link`：

```html
<link rel="manifest" href="manifest.json">
```

清单文件的内容大概是这样的：

```json
{
    "name": "My Application",
    "icons": [{
        "src": "icon/lowres",
        "sizes": "64x64"
    }, {
        "src": "icon/small",
        "sizes": "64x64"
    }, {
        "src": "icon/hd_hi",
        "sizes": "128x128",
        "density": 2
    }],
    "start_url": "/index.html",
    "display": "fullscreen",
    "orientation": "landscape"
}
```

这意味着最终我们可以移除所有页面顶部的 57x57 的 iOS 图标……**假设苹果决定在 Safari 中实现这项技术！**

跨浏览器的支持尚不完整。Firefox 在其 Marketplace 中使用了清单，但属性名似乎有所不同。

## Windows 7 沉浸模式

Windows 7 切换到沉浸模式能让 Chrome 表现得像一个 Windows 8 全屏 Metro 应用程序。诡异的是，之后它会在 Windows 任务栏上再放一个像 Chrome OS 一样的半透明任务栏——有自己的开始按钮和时钟。

**为什么？**如果 Windows 7 用户想要体验 Windows 8，他们可以升级。然而，很多 Windows 7 用户都有选择坚守的理由：他们不想要 Windows 8！

对于 Google 坚持往其他操作系统里偷偷插入 Chrome OS 组件的做法，我也很困惑。到处都是 Chrome 应用程序图标也没什么——但照搬原生功能毫无意义。也许他们是希望引导人们使用 Chrome OS，但是骚扰只会适得其反。

## 杂项更新

更多次要功能……

+ 无需登入也可以从 Play 商店安装免费的 Chrome 应用程序了；
+ 在高 DPI 和视网膜屏幕上，`scrollTop` 和 `scrollLeft` 现在可返回分数像素。如果你认为像素完美是件坏事，那就等到客户提出子像素完美的要求再说吧！
+ 现在可以编辑已保存密码了；
+ 对 Mac OS 只提供 64 位版本的 Chrome；
+ SHA-1 加密被替换为 SHA-2；
+ 增加了对菜单中的扩展按钮图标的实验性支持（在 **about:flags** 中设置**启用扩展程序工具栏重新设计功能**）。

尽管有一点夹带私货，以及受到 Firefox 的追赶，39 还一次重大的更新。Chrome 仍然很快，很稳定，占据了浏览器市场的半壁江山。推荐。