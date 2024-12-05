 export type StateType = {
	age: number,
	childrenCount: number,
	name: string
}
export type ActionType = {
	type: string,
	[key: string]: any
}