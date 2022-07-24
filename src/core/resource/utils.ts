enum SourceStatus {
	PENDING,
	RESOLVE,
	REJECT,
}

export function createImgBitmap(url: string): Promise<ImageBitmap> {
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
		img.onerror = function () {
			reject(SourceStatus.REJECT)
		}
	})
}

export function CreateSoundRes(url: string): Promise<HTMLAudioElement> {
	return new Promise((resolve, reject) => {
		const audio = new Audio()
		audio.autoplay = true
		audio.src = url
		// audio标签不支持 onload事件，但是支持一个 oncanplaythrough 事件
		audio.oncanplaythrough = function () {
			resolve(audio)
		}
		audio.onerror = function () {
			reject(SourceStatus.REJECT)
		}
	})
}
