title: 一道面试题：筛选 DOM 元素
date: 2012-08-07
---
> 设 A = $("#id a")，B = $("#id .c a")，求 A - B。要求：1、不能用 jQuery 等框架；2、兼容 IE6 在内的各大浏览器；3、尽可能高效；4、尽可能简短。

这是淘宝的 [@oldj](http://weibo.com/oldjwu) 出的一道面试题，题目借用了 jQuery 选择器的语法。换一个说法，就是从 `#id` 元素内选出所有不是 `.c` 后代的 `a` 元素。这个表述尽管还是不够书面和严谨，但我想大家应该都能明白题目意思了。这个题目难度并不大，考察的是 DOM 操作的知识。好，下面开始解题。

第一种思路：先选出所有 `a` 元素。对每个 `a` 元素，从其所在位置沿 DOM 树上行，每走一步比对当前节点类名，含有 `c` 立刻中止，否则继续上行直至根节点（`#id`）处，结束并将 `a` 元素加入结果集。对全部 `a` 元素执行完该操作后，返回结果集。

![Flow chart of filtered selector](/assets/images/2012/08/selector1.png)<!-- more -->

有了思路以后，代码就好写了。理解上有疑点的，欢迎在评论区提问。

```js
function selector(rootId, filterClass, targetTag) {
    var root = document.getElementById(rootId);
    var nodes = root.getElementsByTagName(targetTag);
    var result = [];
    var i;
    var l;
 
    var ascend = function(start, end, current) {
        if(current == end) {
            result.push(start);
        } else if((' ' + current.className.toLowerCase() + ' ').indexOf(' ' + filterClass + ' ') == -1) {
            ascend(start, end, current.parentNode);
        }
    };
 
    for(i = 0, l = nodes.length; i < l; i++) {
        ascend(nodes[i], root, nodes[i].parentNode);
    }
 
    return result;
}
```

**第二种思路**：选出全部 `a` 元素的集合（记为 A）。选出所有含有类名 `c` 的元素，再把它们后代中的 `a` 元素放入一个集合（记为 B）。从集合 A 中剔除集合 B 的所有成员。这个思路完全照搬题目原始描述，流程图就不画了，直接看代码。

```js
function selector(rootId, filterClass, targetTag) {
    var root = document.getElementById(rootId);
    var nodes;
    var result = [];
    var filter = [];
    var eliminated = [];
    var i;
    var j;
    var k;
    var l;
    var filterRegExp = new RegExp("\\b" + filterClass + "\\b");
 
    if(document.getElementsByClassName) {
        filter = root.getElementsByClassName(filterClass);
    } else {
        nodes = root.getElementsByTagName('*');
        for(i = 0, k = nodes.length; i < k; i++) {
            if(filterRegExp.test(nodes[i].className.toLowerCase())) {
                filter.push(nodes[i]);
            }
        }
    }
 
    for(i = 0, k = filter.length; i < k; i++) {
        nodes = filter[i].getElementsByTagName(targetTag);
        for(j = 0, l = nodes.length; j < l; j++) {
            eliminated.push(nodes[j]);
        }
        //eliminated = eliminated.concat(Array.prototype.slice.call(nodes, 0));
        //eliminated = Array.prototype.concat.apply(eliminated, nodes);
    }
 
    nodes = root.getElementsByTagName(targetTag);
    loop: for(i = 0, k = nodes.length; i < k; i++) {
        for(j = 0, l = eliminated.length; j < l; j++) {
            if(nodes[i] == eliminated[j]) {
                continue loop;
            }
        }
        result.push(nodes[i]);
    }
 
    return result;
}
```

第 13 行：IE6 不支持原生的 `getElementsByClassName` 方法，好在这个并不难实现。这里我用了另一种匹配类名的做法，性能要比前面的 `String.prototype.indexOf` 差，权当复习一下正则吧。

第 26 行：有人可能会想这个循环可以先用 `Array.prototype.slice.call` 把 `nodes` 转换成数组，再用数组的 `concat` 方法拼接（第 29 行）。没错，通过函数的 `call` 方法可以用数组方法去处理类数组对象（比如函数的 `arguments`）。`nodes` 也是一个类数组对象—— NodeList，不过 `NodeList` 并不是 [ECMAScript](http://www.ecmascript.org/) 规范的一部分，它的实现是由浏览器厂商决定的。实际上，在 IE6-8 里，`Array.prototype.slice.call` 确实无法将 `NodeList` 转换成标准的数组。

第 30 行：在 ES5 里，函数 `apply` 方法的第二个参数已经可以传入除 `arguments` 以外的其他类数组对象（比如 `{'length':2, '0':4, '1':7}`，甚至还可以是 `new String('asdf')`！）了，所以这行代码在 Chrome 里也可以实现第 26 行那个循环的效果。但正如上面所说，这样做是有风险的，生产环境中使用它请先做测试，确保其兼容性。另外，IE9 `apply` 的实现仍然沿用 ES3 的规范——第二个参数只接受数组或 `arguments` 对象。

最后是一个双层循环。集合 A 的全部成员分别和集合 B 的全部成员各做一次匹配，筛选出最后的结果集，顺便复习一下平常较少用到的 `continue` 和 `label`。

**结论**

第二个实现跟前一个相比，没有使用递归，看似性能有所提升，实测结果却比第一个慢得多（Chrome 下前者调用 100000 次耗时 7000 多毫秒，后者耗时 9000 多毫秒），过多的 DOM 遍历是造成性能问题的罪魁祸首。在实际项目中，由于不太可能出现变态深度的 DOM 结构，因此第一个实现中由递归带来的性能问题并不会很显著，调用栈溢出就更遥远了（前提是没有误写成死循环……）。相比之下第二个实现因为性能不佳，在生产环境中意义不大，但作为一个面试题，考察知识点掌握的程度，多种方法解决问题的能力，都是很重要的。希望这个“意义不大”的答案也能对你有所启发，帮助你在以后的面试中有更好的发挥。

以上两个答案的 演示：[演示一](/assets/examples/dom-filter/demo1.html)、[演示二](/assets/examples/dom-filter/demo2.html)。欢迎补充更优的解决方案。

补充：[一道面试题：筛选 DOM 元素（续）](#/blog/articles/2012/an-interview-quiz-filtered-dom-selector-continued)。