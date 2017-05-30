title: 创建和监听自定义事件
date: 2012-05-09
---
做前端开发的筒子们，有没有经常觉得原生的事件类型不够用？今天就来介绍一下如何创建自定义的事件类型吧。

举个例子，你有没有实现过像“长按”这样的需求？这是一个挺常见的需求，可是原生的事件类型里并没有它。以前通常的做法是用 `mousedown` 和 `mouseup` 来模拟。同时监听这两个事件，记录两次事件触发的时间戳，得出按下时长，再决定是否执行后续动作。这个方案还不错，思路清晰，实现容易。

好，现在新的需求来了（该死的 PM！），页面上有两个需要监听长按状态的元素，怎么办？这好办，写具名函数嘛，复用一下还是很容易的。别急，PM 又来了…… 两个元素触发长按所需的时长不一样，怎么办？时长还要能方便的修改，怎么办？在心里咒骂 PM 肯定少不了，但需求还是得给他实现了。好，修修改改勉强又能用了。可是这么一看，代码写得真丑啊…… 万一待会 PM 又改需求怎么办？

有没有办法把这个需求实现得简单好看又灵活呢？当然可以！创建一个自定义事件吧骚年！

在文档对象模型（DOM）中有 `createEvent`、`initEvent` 和 `dispatchEvent` 这么一组方法可以很方便的创建，初始化和触发一个自定义的事件。以前面提到的长按需求为例，我们首先需要创建一个事件对象。

```js
var evt = document.createEvent('Event');
```

在这里我基于最基础的 Event 创建了一个事件对象，如果你需要对事件进行精细地控制，可以选择更具体的事件模块（UIEvents、MouseEvents、MutationEvents、HTMLEvents 等）。<!-- more -->

接下来就是初始化这个事件，三个参数分别是事件类型（字符串）、是否冒泡（布尔）、是否可取消（布尔）。

```js
evt.initEvent('longpress', true, true);
```

注意这里初始化事件的方法名跟上一步所选的事件模块是有关的，具体可以参照 MDN 这个[表格](https://developer.mozilla.org/en/DOM/document.createEvent#Notes)。

然后我们要做的事，就是在特定条件（按下时间超过 1 秒）下触发这个事件。

```js
var timer;
button.addEventListener('mousedown', function() {
  timer = Date.now();
}, false);
button.addEventListener('mouseup', function() {
  if(Date.now() - timer > 1000) {
    evt.duration = Date.now() - timer;
    button.dispatchEvent(evt);
  }
}, false);
```

检测鼠标按下和松开之间的时间间隔，大于 1 秒（1000 毫秒）则触发自定义的 `longpress` 事件。在这个过程中我们还可以为自定义的事件对象增加属性，比如上面例子中的 `duration` 属性，即鼠标按下的时长。

最后只需要像监听原生的事件那样，监听这个自定义的事件，太简单了。

```js
button.addEventListener('longpress', function(e) {
  console.log('Pressed for ' + e.duration + ' milliseconds.');
}, false);
```

到这里就结束了吗？当然没有，别忘了 PM 的需求，触发事件的时长要可以方便的修改，还要能支持多个实例。

不过我想你应该也知道要怎么做了，就是把自定义事件的这部分代码包装一下。

```js
function enableLongPress(target, threshold) {
  var timer;
  var evt = document.createEvent('Event');
  evt.initEvent('longpress', true, true);
  target.addEventListener('mousedown', function() {
    timer = Date.now();
  }, false);
  target.addEventListener('mouseup', function() {
    if(Date.now() - timer > threshold) {
      evt.duration = Date.now() - timer;
      target.dispatchEvent(evt);
    }
  }, false);
}
```

把需要监听的 DOM 元素和触发事件的条件作为参数传入，调用这个函数，就完成了事件的自定义。

```js
enableLongPress(button, 1000);
```

事件的监听部分完全不用改动。

```js
button.addEventListener('longpress', function(e) {
  console.log('Pressed for ' + e.duration + ' milliseconds.');
}, false);
```

增加实例易如反掌。

```js
enableLongPress(anotherButton, 2000);
anotherButton.addEventListener('longpress', function(e) {
  console.log('Pressed for ' + e.duration + ' milliseconds.');
}, false);
```

最后给个[演示](/assets/examples/custom-event/)，大家随便玩。