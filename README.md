# 大狗叫

一个可以点击、拖动互动的大狗叫静态网页，包含狗叫音效、弹性缩放和全屏粒子特效。

线上演示：[http://47.128.78.22/dagoujiao/](http://47.128.78.22/dagoujiao/)

![大狗叫预览](./preview.png)

## 本地运行

```bash
python3 -m http.server 4173
```

然后打开 [http://127.0.0.1:4173/](http://127.0.0.1:4173/)。首次点击用于解锁浏览器音频，之后点击或拖动页面即可触发叫声与视觉特效。

## 文件结构

- `index.html`：页面结构与样式
- `main.js`：音频、动画和交互逻辑
- `audio-data.js`：内嵌狗叫音频数据
- `Image/`：闭嘴与张嘴状态素材

## 素材来源

页面视觉与音频素材参考并复用于 Bilibili 玩具页：[大狗 Tap](https://www.bilibili.com/toy/Dagou-Tap/index.html)。使用或再发布前请确认相关素材授权。
