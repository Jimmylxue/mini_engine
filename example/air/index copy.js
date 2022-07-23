const { RES, createDisplay, Image: CImage } = mini_engine

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
	// {
	// 	key: 'bg',
	// 	url: '',
	// 	type: 'image',
	// },
	// {
	// 	key: 'clean',
	// 	url: 'https://shiheng-tech.oss-cn-shanghai.aliyuncs.com/shihengtest//1655171440449/%E7%AB%99%E9%95%BF%E7%B4%A0%E6%9D%90%28sc.chinaz.com%29.mp3?Expires=3231971440&OSSAccessKeyId=LTAI4G9rgor8RbRNVjtsLqxi&Signature=pcqUeIU9AMRFelOpaP%2B4zANc3x0%3D',
	// 	type: 'sound',
	// },
]
RES.resolve(mapJson, (process, sum) => {
	console.log('进度~', process, sum)
})

RES.onLoad(() => {
	const bulletList = new Set()
	const enemyList = new Set()
	const display = createDisplay({ canvas, ctx })
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
				console.log('删除敌机')
				display.remove(enemy)
				enemyList.delete(enemy)
			}
		})
	}

	function checkHit() {
		// 碰撞检测
		bulletList.forEach(bullet => {
			enemyList.forEach(enemy => {})
		})
	}

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

			bullet.track(() => {
				bullet.y -= 5
				if (bullet.y <= 50) {
					console.log('删除子弹')
					display.remove(bullet)
					bulletList.delete(bullet)
				}
			})
		}
	})
})
