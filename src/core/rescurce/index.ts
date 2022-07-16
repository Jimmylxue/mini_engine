import BaseError, { ErrorType } from '../error'
import { TSource, SourceItem } from './type'
import to from 'await-to-js'

enum ImgStatus {
	PENDING,
	RESOLVE,
	REJECT,
}

let sourceSuccessFn: () => void
let sourceCount: number = 0

const source2map = new Map<string, ImageBitmap>()

function getRes(key: string) {
	if (source2map.has(key)) {
		return source2map.get(key)
	}
	throw new BaseError(
		ErrorType.SOURCE_NOT_FOUND,
		`${key} resource is not found`
	)
}

async function bindRes(source: SourceItem) {
	const [error, bitmap] = await to(createImage(source.url))
	if (error) {
		throw new BaseError(
			ErrorType.SourceError,
			`${source.key} resource failed to load`
		)
	}
	source2map.set(source.key, bitmap)
	if (source2map.size === sourceCount) {
		sourceSuccessFn && sourceSuccessFn()
	}
}

function createImage(url: string): Promise<ImageBitmap> {
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
			reject(ImgStatus.REJECT)
		}
	})
}

function resolve(map: TSource, onSuccess: () => void) {
	sourceCount = map.length
	map.forEach(source => {
		bindRes(source)
	})
}

function onLoad(fn: () => void) {
	sourceSuccessFn = fn
}

export const RES = {
	getRes,
	resolve,
	onLoad,
}
