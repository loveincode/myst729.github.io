title: 深入了解 Git 原理（搬运）
date: 2016-06-16
---
> 今天工作不饱和，在微信群里又跟人争了一回“程序员到底应不应该了解所用技术的原理”。其实我并不赞成对什么都要知根知底。庄老师说得好，“以有涯随无涯，殆已！”花太多精力在这上面反而往往忘记自己最初的目的是什么。但同时，我又认为拥有好奇心是做一个合格（包括但不仅限于）程序员的基本要求。至少，对于你挣稀饭钱的家伙事儿，总归还是需要多了解那么一点点吧。

演讲者 Paolo Perrotta 是《Ruby 元编程》一书的作者。Paolo 是意大利人，用英语演讲时的口音很重，但好在他的节奏一直控制得很好，语言也很风趣，所以影响并不大，还是比较容易听懂的。这个演讲的内容主要是 Git 的内部原理，在文件系统中的组织方式。理解这些基础知识后，再使用 Git 的命令，就会很清楚 checkout、merge、rebase 等命令到底是怎么回事，以及在不同的场景下如何合理地选择和使用这些命令。

<p><video src="/assets/media/2016/paolo-perrotta-wrapping-your-head-around-git.mp4" poster="/assets/images/2016/06/paolo-perrotta-wrapping-your-head-around-git.jpg" preload="metadata" controls></video></p>
