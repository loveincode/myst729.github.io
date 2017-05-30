/* DO NOT CHANGE THE GLOBAL VARIABLE NAME */

window.VUELOG_DATABASE = {

  config: {
    // The name of your site, will be displayed in browser tab and site header.
    brand: '一个平庸的码农',

    // The image displayed in site header right beside the brand.
    logo: './static/vuelog.svg',

    // The full URL where your site is hosted.
    home: 'https://myst729.github.io',

    // Path to the domain root that serves your site, starts and ends with slash (`/`).
    // Set to `'/'` if your site is under domain root.
    base: '/',

    // The path to route to when you visit `/`.
    // Set to `/home`, `/blog` or a valid path at your need.
    homePath: '/blog',

    // Whether footer is visible on `homePath` or not.
    homeFooter: true,

    // Vuelog interface language. Currently only support 'zh-CN' and 'en-US'.
    defaultLang: 'zh-CN',

    // Allow/disallow visitors to switch interface language.
    switchLang: false,

    // Available languages for switching. Must be a subset of supported languages, or leave empty.
    selectedLangs: [],

    // Number of posts listed in a blog/category view.
    postsCount: 7,

    // Fill in the shortname to integrate Disqus with your blog.
    disqusShortname: '', // 'myst729',

    // Fill in the account to integrate IntenseDebate with your blog.
    intenseDebateAccount: '', // '6d5f04a17cd6835996d6f0dab8d4fdaf',

    // Fill in the uid to integrate LiveRe with your blog.
    livereUid: '' // 'MTAyMC8yNzE0NS8zNzM0'
  },

  navigation: [
    {
      label: '吹水',
      type: 'category',
      path: '/blog'
    },
    {
      label: '翻译',
      type: 'page',
      path: '/page/books'
    },
    {
      label: '小玩意',
      type: 'page',
      path: '/page/projects'
    },
    {
      label: '投影片',
      type: 'page',
      path: '/page/slides'
    },
    {
      label: '音乐',
      type: 'page',
      path: '/page/music'
    },
    {
      label: '社交',
      type: 'dropdown',
      children: [
        {
          label: '微博',
          type: 'outgoing',
          link: 'http://weibo.com/myst729'
        },
        {
          label: 'GitHub',
          type: 'outgoing',
          link: 'https://github.com/myst729'
        },
        {
          label: 'StackOverflow',
          type: 'outgoing',
          link: 'https://stackoverflow.com/users/1032492'
        }
      ]
    }
  ],

  pages: [
    {
      title: '翻译',
      titleless: true,
      commentless: true,
      slug: 'books'
    },
    {
      title: '小玩意',
      titleless: true,
      commentless: true,
      slug: 'projects'
    },
    {
      title: '投影片',
      titleless: true,
      commentless: true,
      slug: 'slides'
    },
    {
      title: '音乐',
      titleless: true,
      commentless: true,
      slug: 'music'
    }
  ],

  categories: [
    {
      title: '吹水',
      slug: 'articles'
    }
  ],

  posts: [
    // 2017
    {
      title: 'git inside --simplified --part 1',
      slug: 'git-inside-simplified-part-1',
      category: 'articles',
      date: '2017-06-22'
    },
    {
      title: '自己挖坑自己填',
      slug: 'into-my-own-pits',
      category: 'articles',
      date: '2017-01-02'
    },
    // 2016
    {
      title: '两本书',
      slug: 'two-books',
      category: 'articles',
      date: '2016-12-31'
    },
    {
      title: '计算三角形个数',
      slug: 'counting-triangles',
      category: 'articles',
      date: '2016-10-02'
    },
    {
      title: '面向未来的 Web 调试工具（搬运）',
      slug: 'kenneth-auchenberg-devtools-for-the-progressive-web',
      category: 'articles',
      date: '2016-09-06'
    },
    {
      title: 'AngularJS, React, Vue...',
      slug: 'angularjs-react-vue',
      category: 'articles',
      date: '2016-09-05'
    },
    {
      title: 'Our Last Summer',
      slug: 'abba-our-last-summer',
      category: 'articles',
      date: '2016-06-24'
    },
    {
      title: '深入了解 Git 原理（搬运）',
      slug: 'paolo-perrotta-wrapping-your-head-around-git',
      category: 'articles',
      date: '2016-06-16'
    },
    {
      title: '你的第一个 Visual Studio Code 扩展',
      slug: 'your-first-visual-studio-code-extension',
      category: 'articles',
      date: '2016-01-16'
    },
    // 2015
    {
      title: 'Over A Decade...',
      slug: 'over-a-decade',
      category: 'articles',
      date: '2015-11-07'
    },
    {
      title: '元元，走好。',
      slug: 'may-you-finally-find-peace',
      category: 'articles',
      date: '2015-07-18',
      draft: true
    },
    {
      title: '小谈 JavaScript 的 if 语句写法',
      slug: 'on-writing-if-statements',
      category: 'articles',
      date: '2015-06-24'
    },
    {
      title: 'WAI 调查之 ARIA 界标角色',
      slug: 'wai-finding-with-aria-landmark-roles',
      category: 'articles',
      date: '2015-04-12'
    },
    {
      title: '自定义元素简介',
      slug: 'introduction-to-custom-elements',
      category: 'articles',
      date: '2015-03-25'
    },
    {
      title: 'CSSConf China, from 0 to 1',
      slug: 'cssconf-china-2015-beijing',
      category: 'articles',
      date: '2015-01-13'
    },
    // 2014
    {
      title: '学着变得更具可用性',
      slug: 'learning-to-be-accessible',
      category: 'articles',
      date: '2014-12-11'
    },
    {
      title: 'Chrome 39 新功能',
      slug: 'whats-new-in-chrome-39',
      category: 'articles',
      date: '2014-12-09'
    },
    {
      title: 'A* 寻路算法',
      slug: 'a-star-pathfinding',
      category: 'articles',
      date: '2014-11-19'
    },
    {
      title: 'HTML5 dialog 元素一学就会',
      slug: 'html5-dialog-element',
      category: 'articles',
      date: '2014-11-14'
    },
    {
      title: 'D2/2014',
      slug: 'd2-2014',
      category: 'articles',
      date: '2014-10-28'
    },
    {
      title: '博客迁移到 Hexo',
      slug: 'hello-hexo',
      category: 'articles',
      date: '2014-10-27'
    },
    {
      title: '《程序员必读之软件架构》译者序',
      slug: 'software-architecture-for-developers-translators-preface',
      category: 'articles',
      date: '2014-10-09'
    },
    {
      title: '曾经是的，永远都是。',
      slug: 'once-was-always-will-be',
      category: 'articles',
      date: '2014-07-30'
    },
    {
      title: '我的世界杯',
      slug: 'my-world-cup-2014',
      category: 'articles',
      date: '2014-07-16'
    },
    {
      title: '如何成功地毁掉你的（程序员）职业生涯？',
      slug: 'how-to-successfully-ruin-your-career-as-a-programmer',
      category: 'articles',
      date: '2014-03-31'
    },
    {
      title: '2013 小汇总',
      slug: 'farewell-2013',
      category: 'articles',
      date: '2014-01-01'
    },
    // 2013
    {
      title: '为什么 [[编程语言A]] 明显地优于 [[编程语言B]]',
      slug: 'the-programming-languages-war',
      category: 'articles',
      date: '2013-12-25'
    },
    {
      title: '贝塞尔曲线扫盲',
      slug: 'bezier-curve-literacy',
      category: 'articles',
      date: '2013-11-28'
    },
    {
      title: '两种方法判断平面内的点是否在多边形内',
      slug: 'two-solutions-for-point-in-polygon-problem',
      category: 'articles',
      date: '2013-11-01'
    },
    {
      title: '生命游戏和兰顿蚂蚁',
      slug: 'game-of-life-and-langtons-ant',
      category: 'articles',
      date: '2013-09-30'
    },
    {
      title: '自定义元素：在 HTML 中定义新元素',
      slug: 'custom-elements-defining-new-elements-in-html',
      category: 'articles',
      date: '2013-09-07'
    },
    {
      title: 'Test the Web Forward 2013 上海站回顾',
      slug: 'test-the-web-forward-2013-shanghai',
      category: 'articles',
      date: '2013-08-28'
    },
    {
      title: 'Android 设备 Chrome 远程调试',
      slug: 'android-chrome-remote-debugging',
      category: 'articles',
      date: '2013-07-21'
    },
    {
      title: 'WordPress 插件版 Reposidget：WP Reposidget',
      slug: 'port-reposidget-to-wordpress',
      category: 'articles',
      date: '2013-05-27'
    },
    {
      title: 'Notepad++ 小技巧 – 调用 NodeJS 模块编译/压缩 CSS 和 JavaScript',
      slug: 'use-nodejs-in-notepad-plus-plus',
      category: 'articles',
      date: '2013-05-26'
    },
    {
      title: '近半年小结',
      slug: 'the-past-six-months',
      category: 'articles',
      date: '2013-05-13'
    },
    // 2012
    {
      title: '单纯的满足感 — 关于 txt2img 插件',
      slug: 'pure-satisfaction-about-txt2img-plugin',
      category: 'articles',
      date: '2012-11-05'
    },
    {
      title: '借助 Wind.js 编写更流畅的异步代码',
      slug: 'better-asynchronous-coding-with-windjs',
      category: 'articles',
      date: '2012-09-09'
    },
    {
      title: '一道面试题：筛选 DOM 元素（续）',
      slug: 'an-interview-quiz-filtered-dom-selector-continued',
      category: 'articles',
      date: '2012-08-11'
    },
    {
      title: '一道面试题：筛选 DOM 元素',
      slug: 'an-interview-quiz-filtered-dom-selector',
      category: 'articles',
      date: '2012-08-07'
    },
    {
      title: '小技巧：编写一个书签应用',
      slug: 'how-to-write-a-bookmarklet',
      category: 'articles',
      date: '2012-08-03'
    },
    {
      title: '时钟方向坐标系点排序算法及 JavaScript 实现',
      slug: 'clockwise-points-sorting',
      category: 'articles',
      date: '2012-07-06'
    },
    {
      title: '山寨卡通头像生成器',
      slug: 'favatar-manga-avatar-generator',
      category: 'articles',
      date: '2012-06-06'
    },
    {
      title: '创建和监听自定义事件',
      slug: 'how-to-create-a-custom-event',
      category: 'articles',
      date: '2012-05-09'
    },
    {
      title: '几个经典排序算法的 JavaScript 实现',
      slug: 'sorting-algorithm-javascript-implementation',
      category: 'articles',
      date: '2012-04-12'
    },
    {
      title: '为 WordPress 官方插件目录的页面添加图片横幅',
      slug: 'add-banner-image-to-wordpress-plugins-directory',
      category: 'articles',
      date: '2012-03-12'
    },
    {
      title: 'txt2img — 把 WordPress 文章发布到新浪微博',
      slug: 'txt2img-publish-posts-to-weibo',
      category: 'articles',
      date: '2012-02-14'
    },
    // 2011
    {
      title: '利用 WordPress 自定义抓取外部 Feed 源',
      slug: 'wp-custom-feed-reader',
      category: 'articles',
      date: '2011-11-30'
    }
  ]

}
