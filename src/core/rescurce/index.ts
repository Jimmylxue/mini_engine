// const obj = {
// 	url: Image,
// }

// const img = new Image()

const source2map = new Map<string, HTMLImageElement>()

function getRes(url: string) {
	if (!source2map.has(url)) {
		// createImageBitmap(url)
		const bitmap = createImage(url)
		return bitmap
		// console.log(bitmap)
	}
	// source2map.has(url) ? source2map.set(url, url) : null
}

function createImage(url: string) {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.src = url
		img.onload = async function () {
			const res: ImageBitmap = await createImageBitmap(
				img,
				0,
				0,
				img.width,
				img.height
			)
			resolve(res)
		}
	})
}

export const RES = {
	getRes,
}
