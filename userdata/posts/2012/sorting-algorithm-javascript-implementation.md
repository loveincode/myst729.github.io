title: 几个经典排序算法的 JavaScript 实现
date: 2012-04-12
---
作为一个学化学转行做互联网的人，缺乏计算机科学的基础训练一直是我的硬伤。上星期花时间专门看了一些排序类算法，并且决定要写几个实现出来，免得一转眼又忘了。经过周末休息日的死磕，我终于在理解算法的基础上，用 JavaScript 写出了归并排序和快速排序的实现。在此记录一笔，以示备忘……

不过在开始之前，还是先来看看我长久以来唯一会写的[冒泡排序](http://en.wikipedia.org/wiki/Bubble_sort)吧……

为方便起见，我扩展了一个交换数组项的 swap 方法。

```js
if(!Array.prototype.swap) {
    Array.prototype.swap = function(a, b) {
        var temp = this[a];
        this[a] = this[b];
        this[b] = temp;
        return this;
    };
}
```

当然我们也可以用更好的方式来扩展原型<!-- more -->，这是题外话了。

```js
if(!Array.prototype.swap) {
    Object.defineProperty(Array.prototype, 'swap', {
        value: function(a, b) {
            var temp = this[a];
            this[a] = this[b];
            this[b] = temp;
            return this;
        }
    });
}
```

接下来就是真正的冒泡排序了。

```js
var bubbleSort = function(arr) {
    var len = arr.length;
    if(len > 1) {
        for(var i = 1; i < len; i++) {
            for(var j = i; j > 0; j--) {
                if(arr[j] < arr[j-1]) {
                    arr.swap(j, j-1);
                } else {
                    break;
                }
            }
        }
    }
    return arr;
};
```

稍作调整也可以改成数组方法的形式，或者参考上面提到的 `defineProperty` 的形式。

```js
Array.prototype.bubbleSort = function() {
    var arr = this,
        len = arr.length;
    if(len > 1) {
        for(var i = 1; i < len; i++) {
            for(var j = i; j > 0; j--) {
                if(arr[j] < arr[j-1]) {
                    arr.swap(j, j-1);
                } else {
                    break;
                }
            }
        }
    }
    return arr;
};
```

接下来看看比冒泡更快的[归并排序](http://en.wikipedia.org/wiki/Merge_sort)吧。这个算法采用了“[分而治之](http://zh.wikipedia.org/wiki/%E5%88%86%E8%80%8C%E6%B2%BB%E4%B9%8B)（[divide and rule/conquer](http://en.wikipedia.org/wiki/Divide_and_rule)）”的思想。算法的实现由“分”和“治”两个部分构成，把一个大问题分割成若干个容易解决的小问题，然后递归地逐个击破，从而解决整个大问题。

```js
var merge = function(left, right) {
    var arr = [];
    while(left.length && right.length) {
        if(left[0] < right[0]) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }
    return arr.concat(left, right);
};

var mergeSort = function(arr) {
    var len = arr.length;
    if(len > 1) {
        var index = Math.floor(len/2),
            left  = arr.slice(0, index),
            right = arr.slice(index);
        return merge(mergeSort(left), mergeSort(right));
    } else {
        return arr;
    }
};
```

由于 JavaScript 本身并未对尾递归进行优化，而可以用递归实现的算法，也都可以用非递归的方式实现，因此自然有人考虑用迭代来实现归并排序。

```js
var mergeSortIteration = function(arr) {
    var len = arr.length;
    if(len > 1) {
        var work = [];
        for(var i = 0; i < len; i++) {
            work.push([arr[i]]);
        }
        work.push([]);
        for(var j = len; j > 1; j = Math.ceil(j/2)) {
            for(var k = 0, l = 0; l < j; k++, l += 2) {
                work[k] = merge(work[l], work[l+1]);
            }
            work[k] = [];
        }
        return work[0];
    } else {
        return arr;
    }
};
```

最后来说说[快速排序](http://en.wikipedia.org/wiki/Quicksort)。这应该是实际生产和各种算法类面试题中最常见的排序算法了吧。快排也是一个典型的“分而治之”算法，用递归来写实现非常简单，也很容易理解。

```js
var quickSort = function(arr) {
    var len = arr.length;
    if(len > 1) {
        var pivot = arr[0],
            left  = [],
            right = [];
        for(var i = 1; i < len; i++) {
            if(arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return quickSort(left).concat(pivot, quickSort(right));
    } else {
        return arr;
    }
};
```

这个实现有一个不足，就是会占用额外的内存空间，这跟归并算法是一样的。而归并算法很稳定，极端情况下的耗时要优于快排，因此这个快排的现实意义并不大。实际生产中大量使用的快排算法，大多是在比较过程中直接对数组元素进行交换操作，避免了占用额外的空间，这就是所谓的原地（in-place）快排。

```js
var partition = function(arr, start, end) {
    var index = start,
        pivot = arr[start];
    arr.swap(start, end);
    for(var i = start; i < end; i++) {
        if(arr[i] < pivot) {
            arr.swap(i, index);
            index++;
        }
    }
    arr.swap(index, end);
    return index;
};

var sorting = function(arr, start, end) {
    if(end - start > 1) {
        var index = partition(arr, start, end-1);
        sorting(arr, start, index);
        sorting(arr, index+1, end);
    }
    return arr;
};

var quickSortInPlace = function(arr) {
    var len = arr.length;
    if(len > 1) {
        return sorting(arr, 0, len);
    } else {
        return arr;
    }
};
```

好，本文到此也应该结束了。虽然 JavaScript 数组已经有了用快排实现的原生 `sort()` 方法，我还是希望本文提到这些算法的思路和实现会对你有帮助。