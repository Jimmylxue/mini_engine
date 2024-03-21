
<br>

<h1 align="center">Welcome to canvas_easy_draw 👋</h1>

<br>

## 为什么会做这个

偶然间接到公司的一个新任务 => 开发**小游戏**，在已经确定使用 `canvas` 进行开发之后面临的第一个问题便是：**手撸canvas实在是太难和太复杂了😭**，一切的原因在我看来皆是`canvas`的提供的一些API过于底层，由于过去有过一些些 [egret ]()开发经验，与市面上一些第三方库的引导下，在想，我们为什么自己不能开发一套canvas库呢？于是收干就干！

## 它的优势

- [x] 👽 元素皆对象，画布中每个可见的元素都是一个独立的对象
- [x] 💛 像操作`jQuery`一样操作`canvas`中的元素
- [x] ⚡ 支持浏览器的事件系统，点击事情、鼠标移入事件等等
- [x] ☀️ 动画系统接入，像使用`Tween.js`一样写出优雅的动画

## 推荐人群

- 当您有一些简单的canvas需求，那么使用它也是一种选择，简单和灵活的api可以让你像写jQuery一样快速的开发您的需求，如：飞机大战、多避障碍。
- 如果您也是canvas爱好者，且正需要一个小工程类的项目练手，那么它是一个非常不错的选择✅！您也可以**从0到1** 开发一个属于您的`npm` 库，添加上您自己写的API，通过这个项目，您将会学会：打包、工程化相关知识！

## 案例演示

> 用它开发小游戏到底有多简单呢？
>
> 使用它，我们可以不到200行实现一个飞机大战✈️

1. 克隆该项目

2. 运行`example`目录中的游戏案例

   > 目前已有的游戏案例：
   >
   > - [x] 飞机大战
   > - [ ] 消消乐
   > - [ ] 像素鸟


(如果觉得不错 👍，给个star ⭐吧，你的认可是我开发的最大的动力 ！也期待有喜欢图形，喜欢canvas的小伙伴加入进来，让这个项目可用于工业生产！)

## 快速开始

### 安装

npm install canvas_easy_draw

### 使用

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="referrer" content="no-referrer" />
		<title>canvas_easy_draw</title>
		<style>
			#myCanvas {
				background-color: #95a5a6;
			}
		</style>
	</head>
	<body>
		<script src="mini_engine.min.js"></script>
		<canvas id="myCanvas" width="500" height="500"></canvas>

		<script>
			const { RES, createDisplay, Image: CImage, Rect } = mini_engine
			const canvas = document.getElementById('myCanvas')
			const ctx = canvas.getContext('2d')

			// 静态资源配置
			const mapJson = [
				{
					key: 'header',
					url: 'https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220326203849385.png',
					type: 'image',
				},
				{
					key: 'bg',
					url: 'https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1655171440449/%E7%AB%99%E9%95%BF%E7%B4%A0%E6%9D%90%28sc.chinaz.com%29.mp3?Expires=3231971440&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=pcqUeIU9AMRFelOpaP%2B4zANc3x0%3D',
					type: 'image',
				},
				{
					key: 'clean',
					url: 'https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1655171440449/%E7%AB%99%E9%95%BF%E7%B4%A0%E6%9D%90%28sc.chinaz.com%29.mp3?Expires=3231971440&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=pcqUeIU9AMRFelOpaP%2B4zANc3x0%3D',
					type: 'sound',
				},
			]

			RES.resolve(mapJson, (process, sum) => {
				console.log('进度~', process, sum)
			})

			RES.onLoad(() => {
				// 创建舞台
				const display = createDisplay({ canvas, ctx })
				const cImg = new CImage({
					leftTop: {
						x: 200,
						y: 200,
					},
					width: 50,
					height: 50,
					source: RES.getRes('header'),
				})
				display.add(cImg)
				setTimeout(() => {
					cImg.change(
						{
							source: RES.getRes('bg'),
							width: 100,
							height: 50,
						},
						display
					)
				}, 500)
				const rect = new Rect({
					leftTop: {
						x: 100,
						y: 100,
					},
					width: 100,
					height: 100,
					fillColor: '#3498db',
				})

				// 缓动动画
				rect.change(
					{
						leftTop: {
							x: 200,
							y: 300,
						},
						width: 50,
						height: 50,
						fillColor: '#3498db',
					},
					{
						duration: 1000,
						repeat: 2,
						delay: 500,
						onComplete: () => {
							console.log('动画完成了')
						},
						onUpdate: () => {
							console.log('动画进行中')
						},
						onRepeat: () => {
							console.log('动画重新开始了')
						},
					}
				)
				// 添加元素
				display.add(rect)

				// 点击事件
				rect.on('mousedown', () => {
					console.log('点击了')
				})
			})

			// console.log('res', res)
		</script>
	</body>
</html>

```


## 目录结构

---

````
├── dist                     # 打包文件
│   ├── mini_engine.min.js   # 压缩后的生产环境sdk
│   ├── mini_engine.js       # 未压缩开发环境sdk
├── examples                 # 示例项目
│   ├── air                  # 飞机大战示例项目
├── node_modules             # 依赖文件 
├── src
│   ├── core              # 核心文件 
│   │   ├── resource         # 资源处理核心文件
│   │   ├── types            # 类型文件
│   │   ├── utils            # 工具库
│   │   ├── views            # 关键视图对象
│   ├── main                 # 入口文件
├── .gitignore                # git忽略文件
└── index.html               # index本地调试
├── index.js                 # 自动引包配置
├── package.json             # npm包配置
├── README.md                # 文档
└── tsconfig.json            # ts相关配置
├── webpack.config.js        # webpack配置
````

## TodoList

- img组件也需要支持 tween 缓动动画