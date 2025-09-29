# M艺术家展示网站

这是一个展示中国艺术家及其作品的网站项目。

## 功能特点

- 主页展示
- 艺术家作品展示页面
- 作品详情页面，包括：
  - 艺术家信息
  - 作品详细描述
  - 艺术家采访和作品视频讲解按钮
  - 作品大图展示

## 文件结构

- `index.html` - 网站主页
- `artists.html` - 艺术家和作品展示页面
- `artwork-detail.html` - 作品详情页面
- `css/` - 样式文件目录
  - `style.css` - 主页样式
  - `artists.css` - 艺术家页面样式
  - `artwork-detail.css` - 作品详情页面样式
- `js/` - JavaScript文件目录
- `images/` - 图片资源目录

## 使用方法

1. 克隆仓库
2. 使用网页服务器（如Python的http.server）运行项目
3. 在浏览器中访问相应页面

```
python -m http.server
```

然后访问 http://localhost:8000