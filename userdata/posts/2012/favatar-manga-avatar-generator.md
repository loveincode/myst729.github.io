title: 山寨卡通头像生成器
date: 2012-06-06
---
一直觉得 [FaceYourManga](http://www.faceyourmanga.com/) 是个很不错的网站，曾经用它拼过头像。因为 FYM 的素材和选项非常丰富，所以稍稍耐心一点，就可以拼出和本人相似度极高的卡通头像。

![Favatar](/assets/images/2012/06/favatar.png)

FYM 的在线版是用 Flash 实现的，而我作为一个搞 web 前端开发且创造力匮乏的人，自然想到了用 HTML/CSS/JavaScript 来山寨一个。因此有了这么一个寨味十足项目：[Favatar](http://github.com/myst729/Favatar)，欢迎大家围观。目前只实现了个大概功能，素材和选项都比较少。素材还是从 FYM 扒来的，乃们要拍砖我都认，如果有设计师MM义务帮我画就更好了~<!-- more -->

刚开始是[用 DOM 实现的](/Favatar/favatar1.html)，打算从后端进行图层拼合，再返回到浏览器端下载。因为 GitHub 上不能跑后端的东西，所以图层拼合这块就一直没写（保存按钮无效）。但是有朋友觉得很好玩想保存下来自己用，于是我又赶紧[用 Canvas 重写了一个](/Favatar/favatar2.html)。这回用了 `dataURL` 的方式，可以不需要服务器也能生成拼合后的图片。

+ [项目地址](https://github.com/myst729/Favatar)
+ [演示地址](/Favatar)