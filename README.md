# 大狗叫 / Dog Bark

## 简介 / Overview

一个支持中英文切换的互动狗叫静态网页，包含狗叫音效、弹性缩放和全屏粒子特效。

An interactive dog-bark webpage with Chinese and English UI, dog-bark sound effects, elastic scaling, and full-screen particle effects.

## 在线演示 / Live demo

[https://fuck-claude.ai](https://fuck-claude.ai)

![大狗叫预览](./preview.png)

## 本地运行 / Run locally

```bash
python3 -m http.server 4173
```

然后打开 [http://127.0.0.1:4173/](http://127.0.0.1:4173/)。首次点击用于解锁浏览器音频，之后点击或拖动页面即可触发叫声与视觉特效。

Then open [http://127.0.0.1:4173/](http://127.0.0.1:4173/). The first interaction unlocks browser audio; afterwards, click or drag anywhere to trigger the bark and visual effects.

## 文件结构 / Project structure

| 文件 / Path | 说明 / Description |
| --- | --- |
| `index.html` | 页面结构、样式与中英文文案 / Page structure, styles, and translations |
| `main.js` | 音频、动画和交互逻辑 / Audio, animation, and interaction logic |
| `audio-data.js` | 内嵌狗叫音频数据 / Embedded dog-bark audio data |
| `Image/` | 闭嘴与张嘴状态素材 / Closed- and open-mouth artwork |

## 开源协议 / License

本项目采用 [MIT License](./LICENSE)。许可证末尾包含一条非限制性附加声明。

This project uses the [MIT License](./LICENSE), followed by a non-restrictive additional notice.
