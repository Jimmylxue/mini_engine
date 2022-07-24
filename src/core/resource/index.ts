import BaseError, { ErrorType } from '../error'
import { TSource, SourceItem } from './type'
import { createImgBitmap, CreateSoundRes } from './utils'
import to from 'await-to-js'

let sourceSuccessFn: () => void
let progressFn: (process: number, sum: number) => void
let sourceCount: number = 0

const source2map = new Map<string, ImageBitmap | HTMLAudioElement>()

function getRes(key: string) {
	if (source2map.has(key)) {
		return source2map.get(key)
	}
	throw new BaseError(
		ErrorType.SOURCE_NOT_FOUND,
		`${key} resource is not found`
	)
}

async function analyzeImageRes(source: SourceItem) {
	const [error, bitmap] = await to(createImgBitmap(source.url))
	if (error) {
		throw new BaseError(
			ErrorType.SourceError,
			`${source.key} resource failed to load`
		)
	}
	bindRes(source, bitmap)
}

async function analyzeSoundRes(source: SourceItem) {
	const [error, bitmap] = await to(CreateSoundRes(source.url))
	if (error) {
		throw new BaseError(
			ErrorType.SourceError,
			`${source.key} resource failed to load`
		)
	}
	bindRes(source, bitmap)
}

function bindRes(source: SourceItem, bitmap: ImageBitmap | HTMLAudioElement) {
	source2map.set(source.key, bitmap)
	progressFn && progressFn(source2map.size, sourceCount)
	if (source2map.size === sourceCount) {
		sourceSuccessFn && sourceSuccessFn()
	}
}

function resolveAssets(map: TSource, onProgress: () => void) {
	sourceCount = map.length
	map.forEach(source => {
		switch (source.type) {
			case 'image':
				analyzeImageRes(source)
				break
			case 'sound':
				analyzeSoundRes(source)
		}
	})
	progressFn = onProgress
}

function onLoad(fn: () => void) {
	sourceSuccessFn = fn
}

export const RES = {
	getRes,
	resolve: resolveAssets,
	onLoad,
}
