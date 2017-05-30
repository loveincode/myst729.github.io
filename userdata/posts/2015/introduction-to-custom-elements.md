title: 自定义元素简介
date: 2015-03-25
---
> 本文翻译自 [Introduction to Custom Elements](http://webcomponents.org/articles/introduction-to-custom-elements/)，经 [@裕波](http://weibo.com/itchina100) 大大授意，发布于 [w3ctech](http://www.w3ctech.com/topic/867)。本文篇幅较短，并未涵盖自定义元素全部的内容。了解更多细节，可以阅读我之前翻译的另一篇文章[《自定义元素：在 HTML 中定义新元素》](#/blog/articles/2013/custom-elements-defining-new-elements-in-html)。

HTML 是 Web 平台最重要的元素。它提供了各种构造站点和应用程序的底层特性。但是，一旦你开始用原生 HTML 标签实现一个复杂的组件，很容易就会变成 `div` 标签的堆砌。假如 Web 平台允许你创建自己的原始组件会怎样？假如你可以随意选择标签名会怎样？加入你可以扩展已有 HTML 标签的特性会怎样？自定义元素（Custom Elements）就允许你做这些事情。

<p><video src="/assets/media/2015/eiji-kitamura-web-components-custom-elements.mp4" poster="/assets/images/2015/03/customelements-cover.jpg" preload="metadata" controls></video></p><!-- more -->

## 什么是自定义元素？

自定义元素能让开发者创建自定义的 HTML 标签，并用于他们的网站和应用程序，使得组件复用变得更容易。

## 如何构建一个自定义元素

定义一个自定义元素很简单。只要以标签名为第一个参数，调用 `document.registerElement()`。

```js
var XComponent = document.registerElement('x-component');
```

现在你就可以在文档中任何地方使用 `<x-component>` 了。

```html
<x-component></x-component>
```

提示：`<x-component>` 在文档中的位置可以位于自定义元素的定义执行之前。细节请参阅 [HTML5Rocks 的这篇文章](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)。

要检测自定义元素是否可用，可以检查 `document.registerElement` 是否存在。或者你可以直接加载 [`webcomponents.js`](http://webcomponents.org/polyfills/)。

```html
<script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
```

### 命名规则

你的自定义元素的名字当中必须至少有一个“`-`”。任何不含“`-`”的标签名都会导致错误。

好的命名

+ x-component
+ x-web-component

不好的命名

+ web_component
+ xelement
+ XElement

### 命令式用法

通过向 HTML 插入 `<x-component>` 标签，可以声明式的使用定义好的自定义标签，但你也可以采用命令的用法。

```js
var XComponent = document.registerElement('x-component');
var dom = new XComponent();
document.body.appendChild(dom);
```

上面的例子就使用 `new` 实例化了一个自定义元素。

```js
document.registerElement('x-component');
var dom = document.createElement('x-component');
document.body.appendChild(dom);
```

这个例子使用 `document.createElement()` 实例化了一个自定义元素。

## 向自定义元素添加特性

能够使用自定义的标签名挺不错，但这还不够。我们再给这个元素加一些特性。

为了给自定义元素增加特性，你首先需要以 `HTMLElement.prototype` 为参数调用 `Object.create()`，创建一个基本的原型对象。你会得到一个空的原型对象，其原型链上已经设置了基本的 HTML 元素特性。向这个原型对象添加任何你想要的方法和属性，然后把这个原型传入 `document.registerElement`，如下所示：

```js
var proto = Object.create(HTMLElement.prototype);
proto.name = '自定义元素';
proto.alert = function() {
  alert('我是' + this.name);
};
document.registerElement('x-component', {
  prototype: proto
});
```

### 自定义元素结构

我们用 Chrome 开发者工具来看看自定义元素里面都是什么。在“元素”面板观察我们刚创建的 `x-component` 标签。你可以看到 `x-component` 是一个 `x-component` 原型的实例，而后者又是 `HTMLElement` 原型的实例。

![自定义元素结构](/assets/images/2015/03/customelements-inherit.png)

## 类型扩展自定义元素

你可以创建一个扩展原生 HTML 元素特性的自定义的元素。这就是所谓的类型扩展自定义元素。要使用这个元素，可以在原始的标签上用 `is` 属性指定自定义的标签名称。

```html
<div is="x-component"></div>
```

要定义一个类型扩展：

+ 使用要扩展元素的原型创建基本原型对象，而不是 `HTMLElement`。
+ 在 `document.registerElement()` 的第二个参数中添加一个 `extends` 属性，指定要扩展元素的标签名称。

下面是一段扩展 `input` 元素的示例代码：

```js
var XComponent = document.registerElement('x-component', {
  extends: 'input',
  prototype: Object.create(HTMLInputElement.prototype)
});
```

注意 `extends: 'input'`，它的原型是基于 `HTMLInputElement`，而不是 `HTMLElement`。现在你可以在文档中使用 `<input is="x-component">` 了。这样，你就能在基本的 `input` 元素特性上扩展 API。

提示：你可能会好奇，假如为“`extends`”和“`prototype`”设置不同的元素，会发生什么。没错，有这个可能，还可能会导致意外的结果。但根据我的经验，不会有什么有价值的东西。

### GitHub 的用例

类型扩展自定义元素的目的是什么？我们来看看 GitHub 这个现成的绝佳例子。

![实时类型扩展](/assets/images/2015/03/customelements-relativetime.png)

GitHub 有很多显示日期和时间的组件。注意，它们不是绝对的日期和世界，而是相对于浏览器的当前时间。你应该能想象如何计算，但 GitHub 却用类型扩展自定义元素 `time-elements` 来做这件事。

看看它怎么工作的。

![time 元素](/assets/images/2015/03/customelements-time.png)

有四件事需要注意：

+ `time` 标签被当作基本元素使用
+ `datetime` 属性表示了绝对的日期和时间
+ `relative-time` 被指定为一个类型扩展
+ `TextContent` 表示了相对的日期和时间

作为一个类型扩展，这是实时地从绝对日期和时间（`datetime`）属性计算出相对日期和时间。

使用类型扩展自定义元素的好处在于，即使浏览器未开启 JavaScript，或者不支持自定义元素（以及补丁），`time` 元素仍会显示备用的日期和时间信息，保持了它的语义。试试用开发者工具关闭 JavaScript；你会发现它显示的是绝对的日期和时间。

关于 `time-elements` 更多细节，请阅读 webcomponents.org 的文章 [GitHub 在生产中如何使用 Web Components](http://webcomponents.org/articles/interview-with-joshua-peek/)。

## 生命周期回调方法

前面提到的 `relative-time` 自定义元素向 `TextContent` 实时地插入相对的日期和时间信息。但这是什么时候发生的？你可以定义一些在自定义元素产生特定事件时调用，被称为“生命周期回调方法”的函数。

下面列出了这些声明周期回调方法：

+ 元素创建后调用 `.createdCallback()`；
+ 元素附加到文档后调用 `.attachedCallback()`；
+ 从文档中移除元素后调用 `.detachedCallback()`；
+ 元素任一属性变更后调用 `.attributeChangedCallback()`。

在 `relative-time` 的例子中，就用了 `.createdCallback()` 和 `.attributeChangedCallback()` 向 `TextContent` 插入相对的日期和时间。

### 示例

要使用生命周期回调方法，只要在注册自定义元素时，把函数定义成原型对象的属性。

```js
var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = function() {
  var div = document.createElement('div');
  div.textContent = '我是自定义元素';
  this.appendChild(div);
};
var XComponent = document.registerElement('x-component', {
  prototype: proto
});
```

## 自定义元素与模板和 Shadow DOM 结合

在自定义元素中使用模板和 Shadow DOM，可以让组件的操控和复用更容易。有了模板，就能声明式地定义你的自定义元素的内容。有了 Shadow DOM，内容的样式、ID 和类就能以其自身为作用域。

创建自定义元素时，你可以通过 `.createdCallback()` 来应用它们。我们来看一段示例代码。要学习模板和 Shadow DOM，请阅读之前的相关文章（[模板](http://webcomponents.org/articles/introduction-to-template-element)、[Shadow DOM](http://webcomponents.org/articles/introduction-to-shadow-dom)）。

**HTML**

```html
<!-- 定义模板 -->
<template id="template">
  <style>
    ...
  </style>
  <div id="container">
    <img src="http://webcomponents.org/img/logo.svg">
    <content select="h1"></content>
  </div>
</template>
```

```html
<!-- Custom Element usage -->
<x-component>
  <h1>我是自定义元素</h1>
</x-component>
```

**JavaScript**

```js
var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = function() {
  // 添加一个 Shadow DOM
  var root = this.createShadowRoot();
  // 添加一个模板
  var template = document.querySelector('#template');
  var clone = document.importNode(template.content, true);
  root.appendChild(clone);
}
var XComponent = document.registerElement('x-component', {
  prototype: proto
});
```

[这里还有一个例子。](http://jsbin.com/yugoka/3/edit?html,js,output)

## 浏览器支持

Chrome 和 Opera 都支持自定义元素。2014 年 11 月起，Firefox 开启标示后也支持了。要检查其可用性，可以访问 [chromestatus.com](https://www.chromestatus.com/features/4642138092470272) 或 [caniuse.com](http://caniuse.com/#feat=custom-elements)。要支持其他浏览器，可以使用 [webcomponents.js](http://webcomponents.org/polyfills/)（原名 [platform.js](https://github.com/Polymer/platform)）。

## 资料

自定义元素就讲到这里。[你可能也注意到了](http://webcomponents.org/articles/interview-with-joshua-peek/)，GitHub 就使用了自定义元素，并借助补丁实现了对 IE9 的支持。现在就看你的了。

如果你有兴趣了解更多自定义元素的知识，请参阅：

+ [自定义元素：在 HTML 中定义新元素 - HTML5Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)（[译文 1](http://www.html5rocks.com/zh/tutorials/webcomponents/customelements/)、[译文 2](#/blog/articles/2013/custom-elements-defining-new-elements-in-html)）
+ [自定义元素规范标准](http://w3c.github.io/webcomponents/spec/custom/)