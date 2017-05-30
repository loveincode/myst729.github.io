title: 你的第一个 Visual Studio Code 扩展
date: 2016-01-16
---
> 本文翻译自 Visual Studio Code 官方文档 [Example - Hello World](https://code.visualstudio.com/Docs/extensions/example-hello-world)。Visual Studio Code（以下简称 VS Code）是微软基于 Electron 开发的代码编辑器，详情请自行搜索，在此不赘述。

本文将指导你创建一个 VS Code 扩展（Hello World），并讲解 VS Code 扩展性的基本概念。

在这篇教程中，你将为 VS Code 添加一个新指令，显示一条简单的“Hello World”信息。接下来还会和 VS Code 编辑器交互，查询用户选中的文本。

## 准备工作

请安装 [node.js](https://nodejs.org/en/) 并将其添加到系统环境变量 `$PATH`。

## 创建新扩展

要为 VS Code 增加功能，最简单的方式是添加指令。指令会注册一个回调函数，可以通过指令面板或快捷键调用。

为了帮助你开始，我们编写了一个 Yeoman 生成器。安装 Yeoman 和 [Yeoman VS Code Extension generator](https://code.visualstudio.com/docs/tools/yocode)，创建一个新扩展：

```bash
npm install -g yo generator-code
yo code
```
<!-- more -->

这个扩展既可以用 **TypeScript** 编写，也可以用 **JavaScript**。在这个示例中，我们选择 **TypeScript**。

![指令生成器](/assets/images/2016/01/vscode-extension-generator.png)

## 运行你的扩展

+ 启动 VS Code，选择 `File` > `Open...`，打开刚才生成的文件夹；
+ 按 <kbd>F5</kbd>，或点击 `Debug` 图标，然后点击 `Start`；
+ VS Code 将以“扩展开发”模式启动一个新的实例，**这个实例将启用你正在开发的扩展**；
+ 按 <kbd>F1</kbd>，执行 `Hello World` 指令；
+ 恭喜！你刚刚创建并执行了你的第一个 VS Code 指令！

![在 VS Code 中运行扩展](/assets/images/2016/01/vscode-extension-running.png)

## 扩展的结构

使用 Yeoman 生成器生成的扩展结构如下：

```
.
├── .gitignore
├── .vscode                     // VS Code 集成
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
├── .vscodeignore
├── README.md
├── src                         // 源代码
│   └── extension.ts            // 如果是 JavaScript 扩展则为 extension.js
├── test                        // 测试
│   ├── extension.test.ts       // 如果是 JavaScript 扩展则为 extension.test.js
│   └── index.ts                // 如果是 JavaScript 扩展则为 index.js
├── node_modules
│   ├── vscode                  // 语言服务
│   └── typescript              // TypeScript 编译器（针对 TypeScript 扩展）
├── out                         // 编译输出（针对 TypeScript 扩展）
│   ├── src
│   │   ├── extension.js
│   │   └── extension.js.map
│   └── test
│       ├── extension.test.js
│       ├── extension.test.js.map
│       ├── index.js
│       └── index.js.map
├── package.json                // 扩展清单
├── tsconfig.json               // 如果是 JavaScript 扩展则为 jsconfig.json
├── typings                     // 类型定义文件
│   ├── node.d.ts               // Node.js API 链接
│   └── vscode-typings.d.ts     // VS Code API 链接
└── vsc-extension-quickstart.md // 扩展开发快速上手指南
```

我们来挨个看看这些文件的用途：

#### 扩展清单：`package.json`

+ 请阅读 [`package.json` 扩展清单参考](https://code.visualstudio.com/docs/extensionAPI/extension-manifest)；
+ 更多信息见 [`package.json` 的构造](https://code.visualstudio.com/docs/extensionAPI/extension-points)；
+ 每个 VS Code 扩展都必须包含一个描述扩展及其功能的 `package.json` 文件；
+ VS Code 会在启动时读取这个文件，并对每个部分立刻做出响应。

**TypeScript 扩展的清单示例**

```json
{
    "name": "myFirstExtension",
    "description": "",
    "version": "0.0.1",
    "publisher": "",
    "engines": {
        "vscode": "^0.10.1"
    },
    "categories": [
        "Other"
    ],
    "activationEvents": [
        "onCommand:extension.sayHello"
    ],
    "main": "./out/src/extension",
    "contributes": {
        "commands": [{
            "command": "extension.sayHello",
            "title": "Hello World"
        }]
    },
    "scripts": {
        "vscode:prepublish": "node ./node_modules/vscode/bin/compile",
        "compile": "node ./node_modules/vscode/bin/compile -watch -p ./"
    },
    "devDependencies": {
        "typescript": "^1.6.2",
        "vscode": "0.10.x"
    }
}
```

> **笔记：** JavaScript 扩展不需要编译，因此不必填写 `scripts` 字段。

+ 这个 package.json 对扩展作出如下描述：
+ 在指令面板（<kbd>F1</kbd>）定义了一个可调用指令 `"extension.sayHello"` 的入口 `"Hello world"`；
+ 调用指令 `"extension.sayHello"` 时加载（`activationEvents`）；
+ JavaScript 代码的主文件是 `"./out/src/extension.js"`。

> **笔记：** VS Code **不会**在启动时主动加载扩展。扩展必须通过 `activationEvents` 属性声明其激活（加载）条件。

#### 代码

生成的扩展代码在 `extension.ts`（如果是 JavaScript 扩展则为 `extension.js`）文件中：

```ts
// 'vscode' 模块包含了 VS Code 扩展 API
// 以 vscode 为标识符引入这个模块
import * as vscode from 'vscode';

// 扩展激活时会调用这个方法
// 扩展会在指令首次执行时激活
export function activate(context: vscode.ExtensionContext) {

    // 在控制台输出诊断信息（console.log）和错误（console.error）
    // 这行代码只会在扩展激活时执行一次
    console.log('Congratulations, your extension "my-first-extension" is now active!');

    // 指令已经在 package.json 文件中定义了
    // 现在通过 registerCommand 方法给出指令的实现
    // commandId 参数必须与 package.json 文件中的 command 字段对应
    var disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // 每次执行指令时，都会执行这里的代码

        // 显示一条消息
        vscode.window.showInformationMessage('Hello World!');
    });
    
    context.subscriptions.push(disposable);
}
```

+ 每一个扩展都要从主文件导出一个 `activate()` 函数，它**只会被 VS Code 调用一次**，即 `package.json` 文件中描述的 `activationEvents` 发生时；
+ 如果一个扩展使用了操作系统资源（比如生成进程），可以从主文件导出一个执行清理工作的 `deactivate()` 函数，VS Code 会在关闭时调用这个它；
+ 这个扩展引入了 `vscode` API，然后注册了一个指令，并关联了一个函数。该函数会在指令 `"extension.sayHello"` 被调用时执行。指令的实现会在 VS Code 中显示一条“Hello world”消息。

> **笔记：** `package.json` 文件的 `contributes` 部分会在指令面板中添加入口。`extension.ts/.js` 则定义了 `"extension.sayHello"` 的实现。

> **笔记：** 对于 TypeScript 扩展，VS Code 会在运行时加载并执行生成的 `out/src/extension.js` 文件。

#### 其他文件

+ `.vscode/launch.json` 定义了 VS Code 将以扩展开发模式启动。它还通过 `preLaunchTask` 指向 `.vscode/tasks.json` 中定义的一个运行 TypeScript 编译器的任务；
+ `.vscode/settings.json` 默认不包含 `out` 文件夹。你可以编辑想要隐藏的文件类型；
+ `.gitignore` 告诉 Git 要忽略哪些模式的文件；
+ `.vscodeignore` 告诉打包工具在发布扩展时要忽略哪些文件；
+ `README.md` 文件会向 VS Code 用户描述你的扩展；
+ `vsc-extension-quickstart.md` 文件是一个快速上手指南；
+ 你可以把扩展的单元测试放进 `test/extension.test.ts`，通过 VS Code API 运行测试（请阅读[测试你的扩展](https://code.visualstudio.com/docs/extensions/testing-extensions)）。

## 运行你的扩展

现在我们把扩展中包含的这些文件都搞清楚了，接下来就是扩展如何被激活：

+ 扩展开发实例会找到扩展并读取它的 `package.json` 文件；
+ 当你按 <kbd>F1</kbd> 时，已注册的指令会显示在指令面板中；
+ 现在这个列表里有一个 `"Hello world"` 入口，是在 `package.json` 中定义的；
+ 选择这个 `"Hello world"` 指令时，`"extension.sayHello"` 指令将被调用：
  + 创建激活事件 `"onCommand:extension.sayHello"`；
  + 所有在其 `activationEvents` 中列出这个激活事件的扩展都将被激活；
    + `./out/src/extension.js` 文件被载入 JavaScript 虚拟机；
    + VS Code 从中找到导出的 `activate` 函数并调用它；
    + 注册 `"extension.sayHello"` 指令并定义其实现；
+ `"extension.sayHello"` 指令的实现函数将被调用；
+ 指令的实现会显示一条“Hello World”消息。

## 调试扩展

在注册的指令中设置一个断点，然后在 VS Code 的扩展开发实例中运行 `"Hello World"` 指令。

![调试扩展](/assets/images/2016/01/vscode-extension-debug.png)

> **笔记：** 由于 VS Code 调试器支持源码映射，因此对于 TypeScript 扩展，尽管 VS Code 加载并执行的是 `out/src/extension.js`，你还是可以借助源码映射文件 `out/src/extension.js.map` 调试原始的 TypeScript 代码。

> **技巧：** 调试控制台会显示你记录的所有消息。

进一步了解扩展[开发环境](https://code.visualstudio.com/docs/extensions/debugging-extensions)。

## 一点小变化

在 `extension.ts`（如果是 JavaScript 扩展则为 `extension.js`）中，试着把 `extension.sayHello` 指令的实现替换为显示编辑器中选中的字符数：

```ts
var editor = vscode.window.activeTextEditor;
if (!editor) {
    return; // 没有打开编辑器
}

var selection = editor.selection;
var text = editor.document.getText(selection);

// 显示一条消息
vscode.window.showInformationMessage('Selected characters: ' + text.length);
```

> **技巧：** 修改了扩展源代码后，需要重启 VS Code 的扩展开发实例。你可以点击 VS Code 主实例顶部的 Restart 按钮，或在副实例中按 <kbd>Ctrl</kbd>+<kbd>R</kbd>（Mac：<kbd>Cmd</kbd>+<kbd>R</kbd>）。

![运行改进的扩展](/assets/images/2016/01/vscode-extension-selection-length.png)

## 本地安装扩展

目前为止，你编写的扩展还只能在特殊的 VS Code 扩展开发实例中运行。把它复制到操作系统的扩展文件夹中，才能在所有的 VS Code 实例中运行：

+ Windows：`%USERPROFILE%\.vscode\extensions`
+ Mac/Linux：`$HOME/.vscode/extensions`

## 发布你的扩展

请阅读[分享一个扩展](https://code.visualstudio.com/docs/tools/vscecli)。

## 下一步

本文介绍了如何编写一个非常简单的扩展。[单词计数器示例](https://code.visualstudio.com/docs/extensions/example-word-count)是一个更详尽的示例，展示了如何针对特定的语言（Markdown），监听编辑器文档的变更事件。

如果你想进一步了解扩展 API，可以阅读以下内容：

+ [扩展 API 概览](https://code.visualstudio.com/docs/extensionAPI/overview) - 全面了解 VS Code 的扩展性模型；
+ [API 模式与原则](https://code.visualstudio.com/docs/extensions/patterns-and-principles) - VS Code 扩展性所遵循的指导性模式与原则；
+ [构造](https://code.visualstudio.com/docs/extensionAPI/extension-points) - 深入了解 VS Code 的构造；
+ [激活事件](https://code.visualstudio.com/docs/extensionAPI/activation-events) - VS Code 激活事件参考。

## 常见问题

暂无。