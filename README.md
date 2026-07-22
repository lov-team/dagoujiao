# 大狗叫

一个支持中英文切换的互动狗叫静态网页，包含狗叫音效、弹性缩放和全屏粒子特效。

线上演示：[https://fuck-claude.ai](https://fuck-claude.ai)

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

## 开源协议

本项目采用 [MIT License](./LICENSE)。许可证末尾包含一条非限制性附加声明。
