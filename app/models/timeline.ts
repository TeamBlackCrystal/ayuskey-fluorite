export const timelines = [
	"main" , "homeTimeline" , "localTimeline" , "hybridTimeline" , "globalTimeline"
] as const

export type Timelines = typeof timelines[number]
