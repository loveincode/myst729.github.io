title: 一道面试题：筛选 DOM 元素（续）
date: 2012-08-11
---
接前文[一道面试题：筛选 DOM 元素](#/blog/articles/2012/an-interview-quiz-filtered-dom-selector)。

奥运会的追求是“更高，更快，更强”，我们前端开发的同学也有同样的追求——效能更高，速度更快，兼容性更强。

以下是用 `while` 循环给出的一个递归的替代方案，运行 100000 次耗时不到 3000 毫秒：

```js
function selector(rootId, filterClass, targetTag) {
    var root = document.getElementById(rootId);
    var nodes = root.getElementsByTagName(targetTag);
    var result = [];
    var i;
    var l;
    var node;
 
    loop: for(i = 0, l = nodes.length; i < l; i++) {
        node = nodes[i].parentNode;
        while(node != root) {
            if((' ' + node.className.toLowerCase() + ' ').indexOf(' ' + filterClass + ' ') == -1) {
                node = node.parentNode;
            } else {
                continue loop;
            }
        }
        result.push(nodes[i]);
    }
 
    return result;
}
```
如果不考虑旧浏览器，用 ES5 和 HTML5 提供的接口可以用更简短的代码实现这个需求：<!-- more -->

```js
function selector(rootId, filterClass, targetTag) {
    var root = document.getElementById(rootId);
    var nodes = root.getElementsByTagName(targetTag);
 
    return Array.prototype.filter.call(nodes, function(el) {
        var node = el.parentNode;
        while(node != root) {
            if(!node.classList.contains(filterClass)) {
                node = node.parentNode;
            } else {
                return false;
            }
        }
        return true;
    });
}
```

注意用 `classList` 比对类名是大小写敏感的，因此更稳妥的办法应该还是用字符串的方法。这个实现由于数组 `filter()` 方法中的函数开销，效能稍有下降，运行 100000 次的耗时大概在 3500 毫秒。

除此之外，W3C 的 DOM 规范还提供了一类 [DOM 遍历](http://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html)的方法。遗憾的是这类古老的方法浏览器实现非常低效，比手写的递归还要慢很多，就当是了解吧。

```js
function selector(rootId, filterClass, targetTag) {
    var result = [];
    var domWalker = document.createTreeWalker(
        document.getElementById(rootId),
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: function(node) {
                if(node.parentNode.classList.contains(filterClass)) {
                    return NodeFilter.FILTER_REJECT;
                } else if(node.tagName.toLowerCase() == targetTag) {
                    return NodeFilter.FILTER_ACCEPT;
                } else {
                    return NodeFilter.FILTER_SKIP;
                }
            }
        },
        false
    );
 
    while(domWalker.nextNode()) {
        result.push(domWalker.currentNode);
    }
 
    return result;
}
```

以上几段代码的演示：[演示三](/assets/examples/dom-filter/demo3.html)、[演示四](/assets/examples/dom-filter/demo4.html)、[演示五](/assets/examples/dom-filter/demo5.html)。