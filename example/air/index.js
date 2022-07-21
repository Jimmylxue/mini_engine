const { RES, createDisplay, Image: CImage } = mini_engine

const mapJson = [
	{
		key: 'bg',
		url: './assets/bg.jpg',
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

	display.track(() => {
		bg1.y -= 1
		bg2.y -= 1
		if (bg1.y < -bg1.height + 1) {
			bg1.y = bg1.height
		}
		if (bg2.y < -bg2.height + 1) {
			bg2.y = bg2.height
		}
	})
})
// console.log(RES)
