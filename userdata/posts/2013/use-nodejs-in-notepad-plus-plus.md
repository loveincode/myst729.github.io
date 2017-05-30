title: Notepad++ 小技巧 – 调用 NodeJS 模块编译/压缩 CSS 和 JavaScript
date: 2013-05-26
---
[Stylus](http://learnboost.github.io/stylus/) 是一个 CSS 预处理工具。[UglifyJS](http://lisperator.net/uglifyjs/) 是一个 JavaScript 压缩/格式化工具。两者均运行于 [NodeJS](http://nodejs.org/) 环境。本文不准备过多介绍 NodeJS 或 Stylus、UglifyJS，只讲如何在 [Notepad++](http://notepad-plus-plus.org/) 中调用它们。

首先从 NodeJS 官网下载 Windows 版本安装包。安装完成后打开 NodeJS 命令行工具，输入 `npm install stylus -g` 和 `npm install uglify-js -g`，安装 [stylus](https://npmjs.org/package/stylus) 和 [uglify-js](https://npmjs.org/package/uglify-js) 两个包。

![npm install](/assets/images/2013/05/ncommand-install-npm.png)

默认情况下，这两个包会被安装到 `C:\Users\[用户名]\node_modules` 目录。而在 `C:\Users\[用户名]\node_modules\.bin` 目录可以看到对应的命令行文件。<!-- more -->

![ncommand-cmd-tool](/assets/images/2013/05/ncommand-cmd-tool.png)

接下来我们准备一个简单的 styl 范例

![ncommand-example-styl](/assets/images/2013/05/ncommand-example-styl.png)

通过 stylus 命令行工具进行编译

![ncommand-stylus-compile](/assets/images/2013/05/ncommand-stylus-compile.png)

编译完成会在同一目录下生成一个 CSS 文件

![ncommand-example-compiled](/assets/images/2013/05/ncommand-example-compiled.png)

也可以通过参数改变编译选项，比如 `-c` 是指编译并压缩

![ncommand-example-compressed](/assets/images/2013/05/ncommand-example-compressed.png)

还可以指定输出的文件名

![ncommand-example-output](/assets/images/2013/05/ncommand-example-output.png)

接下来，我们要做的事，就是在 Notepad++ 里定义快捷键来完成上面的工作。打开 Notepad++ 的“运行”菜单，选择“运行”命令（快捷键 F5）

![ncommand-run](/assets/images/2013/05/ncommand-run.png)

就会弹出“运行”对话框

![ncommand-run-command](/assets/images/2013/05/ncommand-run-command.png)

把我们刚才用过的命令行直接输入并运行（注意别忘了 cmd 文件的完整路径），就可以完成对 styl 的编译和压缩任务。

```batch
C:\Users\[用户名]\node_modules\.bin\stylus.cmd -c < C:\n++\example.styl > C:\n++\example-min.css
```

这样就够了吗？当然不够，我们还需要更智能的操作——自动获取当前文件的路径和文件名，否则每个文件都手敲一次会疯的。

查阅 Notepad++ 的[在线文档](http://npp-community.tuxfamily.org/documentation/notepad-user-manual/commands)，我们可以找到几个有用的变量，这样我们可以把上面的命令重写成这个样子：

```batch
C:\Users\[用户名]\node_modules\.bin\stylus.cmd -c < $(FULL_CURRENT_PATH) > $(CURRENT_DIRECTORY)\$(NAME_PART)-min.css
```

再次打开“运行”对话框，输入命令后点击“保存”按钮，就会打开“快捷键”对话框。输入命令的名称，以及快捷键（可选），保存这个命令

![ncommand-save-command](/assets/images/2013/05/ncommand-save-command.png)

以后就可以在“运行”菜单中直接调用而无需输入了。如果保存时指定了快捷键，更可以一键运行命令。

![ncommand-command-saved](/assets/images/2013/05/ncommand-command-saved.png)

名字敲错了？快捷键设置得不好按？没问题，打开“运行”菜单下的“管理快捷键”对话框，改到顺手为止。

![ncommand-shortcut-mapper](/assets/images/2013/05/ncommand-shortcut-mapper.png)

遗憾的是，你不能在 Notepad++ 里修改已保存命令的内容。这些命令都保存在 `C:\Users\[用户名]\AppData\Roaming\Notepad++\shortcuts.xml`。要修改命令的内容，必须用其他编辑器打开这个文件。另一个比较笨的办法是删除旧命令，新建一个。

同样的，对于 UglifyJS，我们可以在 Notepad++ 中保存下面这条命令，来对 JavaScript 进行压缩。

```batch
C:\Users\[用户名]\node_modules\.bin\uglifyjs.cmd -m < $(FULL_CURRENT_PATH) > $(CURRENT_DIRECTORY)\$(NAME_PART)-min.js
```

好了，下面是我自己用的几个命令，伸手党们赶紧的啦~

```batch
// Stylus Compiler：编译 styl 为 css
C:\Users\[用户名]\node_modules\.bin\stylus.cmd $(FULL_CURRENT_PATH)
 
// Stylus Compressor：编译 styl 并压缩输出 css
C:\Users\[用户名]\node_modules\.bin\stylus.cmd -c < $(FULL_CURRENT_PATH) > $(CURRENT_DIRECTORY)\$(NAME_PART)-min.css
 
// UglifyJS Beautifier：格式化 js
C:\Users\[用户名]\node_modules\.bin\uglifyjs.cmd -b < $(FULL_CURRENT_PATH) > $(CURRENT_DIRECTORY)\$(NAME_PART)-src.js
 
// UglifyJS Compressor：压缩 js，混淆标识符
C:\Users\[用户名]\node_modules\.bin\uglifyjs.cmd -m < $(FULL_CURRENT_PATH) > $(CURRENT_DIRECTORY)\$(NAME_PART)-min.js
```

-完-