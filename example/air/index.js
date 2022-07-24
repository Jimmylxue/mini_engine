const { RES, createDisplay, Image: CImage, Text } = mini_engine

const mapJson = [
	{
		key: 'bg',
		url: './assets/bg.jpg',
		type: 'image',
	},
	{
		key: 'hero',
		url: './assets/hero.png',
		type: 'image',
	},
	{
		key: 'bullet',
		url: './assets/bullet.png',
		type: 'image',
	},
	{
		key: 'enemy',
		url: './assets/enemy.png',
		type: 'image',
	},
	{
		key: 'bullets',
		url: './assets/bullet.mp3',
		type: 'sound',
	},
]
RES.resolve(mapJson, (process, sum) => {
	console.log('进度~', process, sum)
})

RES.onLoad(() => {
	const bulletList = new Set()
	const enemyList = new Set()
	const display = createDisplay({ canvas, ctx })
	// 画背景
	const bg1 = new CImage({
		leftTop: {
			x: 0,
			y: 0,
		},
		width: 375,
		height: 667,
		source: RES.getRes('bg'),
	})
	const bg2 = new CImage({
		leftTop: {
			x: 0,
			y: -667,
		},
		width: 375,
		height: 667,
		source: RES.getRes('bg'),
	})
	display.add(bg1)
	display.add(bg2)

	// 记录得分
	let scoreNumber = 0
	const score = new Text({
		text: `当前得分：${scoreNumber}`,
		size: 18,
		color: '#e67e22',
		x: 10,
		y: 30,
	})
	display.add(score)

	// 全局事件
	let enemyTick = 0
	display.track(() => {
		bgMove()
		enemyTick++
		if (enemyTick === 100) {
			initEnemy()
			enemyTick = 0
		}
		checkHit()
	})

	// 创建猪脚
	const hero = new CImage({
		leftTop: {
			x: 375 / 2 - 80 / 2,
			y: 667 - 100,
		},
		width: 80,
		height: 80,
		source: RES.getRes('hero'),
	})
	display.add(hero)

	let isDown = false
	hero.on('mousedown', () => {
		isDown = true
	})

	hero.on('mouseup', () => {
		isDown = false
	})

	hero.on('mousemove', event => {
		if (!isDown) {
			return
		}
		let startPoint = {
			x: event.point.x - hero.width / 2,
			y: event.point.y - hero.height / 2,
		}
		hero.x = startPoint.x
		hero.y = startPoint.y
	})

	let num = 0
	hero.track(() => {
		num++
		if (num === 100) {
			num = 0
			const bullet = new CImage({
				leftTop: {
					x: hero.x + hero.width / 2 - 15 / 2,
					y: hero.y - 20,
				},
				width: 15,
				height: 15,
				source: RES.getRes('bullet'),
			})
			display.add(bullet)
			bulletList.add(bullet)
			RES.getRes('bullets').play()
			bullet.track(() => {
				bullet.y -= 5
				if (bullet.y <= 50) {
					display.remove(bullet)
					bulletList.delete(bullet)
				}
			})
		}
	})

	// 移动背景
	function bgMove() {
		bg1.y -= 1
		bg2.y -= 1
		if (bg1.y < -bg1.height + 1) {
			bg1.y = bg1.height - 2
		}
		if (bg2.y < -bg2.height + 1) {
			bg2.y = bg2.height - 2
		}
	}

	// 创建敌机
	function initEnemy() {
		const enemy = new CImage({
			leftTop: {
				x: Math.floor(Math.random() * (375 - 60 - 0)) + 0,
				y: 0,
			},
			width: 60,
			height: 60,
			source: RES.getRes('enemy'),
		})

		display.add(enemy)
		enemyList.add(enemy)
		enemy.track(() => {
			enemy.y += 2
			if (enemy.y >= 550) {
				display.remove(enemy)
				enemyList.delete(enemy)
			}
		})
	}

	// 碰撞检测
	function checkHit() {
		bulletList.forEach(bullet => {
			enemyList.forEach(enemy => {
				if (bullet.intersects(enemy)) {
					scoreNumber += 10
					score.text = `当前得分：${scoreNumber}`
					enemyList.delete(enemy)
					bulletList.delete(bullet)
					display.remove(enemy)
					display.remove(bullet)
					return
				}
				if (enemy.intersects(hero)) {
					gameOver()
					console.log('碰撞了，游戏结束')
				}
			})
		})
	}

	// 游戏结束
	function gameOver() {
		display.release()
		display.remove(hero)
		enemyList.forEach(enemy => {
			display.remove(enemy)
		})
		bulletList.forEach(bullet => {
			display.remove(bullet)
		})
	}
})
