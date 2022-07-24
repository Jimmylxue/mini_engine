type TSourceType = 'image' | 'sound'

export type SourceItem = { key: string; url: string; type: TSourceType }

export type TSource = SourceItem[]
