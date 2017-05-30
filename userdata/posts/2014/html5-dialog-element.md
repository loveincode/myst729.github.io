title: HTML5 dialog 元素一学就会
date: 2014-11-14
---
Chrome 37 已经支持 `<dialog>` 元素，这意味着我们创建模态窗口组件再也不需要像以前那么麻烦了。

### 基本知识

#### 属性

+ `open`：为 `true` 时 `<dialog>` 元素可见，为 `false` 时不可见。

+ `returnValue`：当 `<dialog>` 元素的 `close` 方法被调用并传入参数时，`returnValue` 将被设置为 `close` 方法的参数的值。

#### 方法

+ `show`：显示 `<dialog>` 元素，页面上其他元素仍可交互。

+ `showModal`：以**模态方式**显示 `<dialog>` 元素，页面上 `<dialog>` 以外的其他元素不可交互。与 `show` 方法不同的是，如果 `<dialog>` 的 `open` 值为 `true`，调用此方法将报错。

+ `close`：关闭（隐藏）`<dialog>` 元素。该方法接受一个可选参数，如果传入参数，则 `<dialog>` 的 `returnValue` 属性将会被设置为参数的值。如果 `<dialog>` 的 `open` 值为 `false` 或未设置，调用此方法将报错。<!-- more -->

#### 事件

+ `close`：关闭 `<dialog>` 元素时触发该事件（设置 `open` 属性为 `false` 会隐藏窗口，但不触发该事件）。

+ `cancel`：按键盘的 `Esc` 键关闭**模态** `<dialog>` 元素时触发该事件。


### 示例

#### 1. 打开和关闭窗口

看了上面的介绍，这个简单例子我想大家理解起来应该没有任何难度。

```html
<button id="open">Open Dialog</button>
<button id="modal">Open Modal Dialog</button>
<button id="close">Close Dialog</button>

<dialog>
  <p>This is a dialog.</p>
  <button>Close</button>
</dialog>

<script>
  document.querySelector('#open').onclick = function() {
    document.querySelector('dialog').show()
  }
  document.querySelector('#modal').onclick = function() {
    document.querySelector('dialog').showModal()
  }
  document.querySelector('#close').onclick = function() {
    document.querySelector('dialog').close()
  }
  document.querySelector('dialog > button').onclick = function() {
    document.querySelector('dialog').close()
  }
</script>
```

[示例 1 在线演示](/assets/examples/html5-dialog-element/demo1.html)

#### 2. 设置样式

我们可以为 `<dialog>` 窗口设置各种样式。当它以模态方式打开时，还可以通过 `::backdrop` 伪元素为窗口背景设置样式。

```html
<style>
  dialog {
    background: #f0f0f0;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 0 0 10px gray;
    top: 30%;
  }
  dialog::backdrop {
    background: rgba(173, 216, 230, .7);
  }
</style>

<button id="open">Open Dialog</button>

<dialog>
  <p>Is this a dialog?</p>
  <button id="yes">Yes</button>
  <button id="no">No</button>
</dialog>

<script>
  document.querySelector('#open').onclick = function() {
    document.querySelector('dialog').showModal()
  }
  document.querySelector('#yes').onclick = function() {
    document.querySelector('dialog').close(true)
  }
  document.querySelector('#no').onclick = function() {
    document.querySelector('dialog').close(false)
  }
  document.querySelector('dialog').onclose = function() {
    alert(document.querySelector('dialog').returnValue)
  }
  document.querySelector('dialog').oncancel = function() {
    alert('Canceled!')
  }
</script>
```

[示例 2 在线演示](/assets/examples/html5-dialog-element/demo2.html)

#### 3. 在窗口中插入表单

当 `<dialog>` 内嵌表单的 `method` 属性设置为 `dialog` 时，提交表单将会关闭 `<dialog>` 并将其 `returnValue` 设置为提交按钮的值。

```html
<button id="open">Open Dialog</button>

<dialog>
  <form method="dialog">
    <p>Is this a dialog?</p>
    <button type="submit" value="YES">Yes</button>
    <button type="submit" value="NO">No</button>
  </form>
</dialog>

<script>
  document.querySelector('#open').onclick = function() {
    document.querySelector('dialog').showModal()
  }
  document.querySelector('dialog').onclose = function() {
    alert(document.querySelector('dialog').returnValue)
  }
</script>
```

[示例 3 在线演示](/assets/examples/html5-dialog-element/demo3.html)

### 结论

目前 `<dialog>` 的支持程度还不是很理想，而规范描述的一些特性即使 Chrome 也并未实现。因此短期还无法大规模应用，但我相信随着规范的进一步完善和厂商的跟进，这个 Web 应用中非常常见的组件应该会得到普遍的应用，取代笨重的传统做法。

![Can I use dialog?](/assets/images/2014/11/can-i-use-dialog.png)