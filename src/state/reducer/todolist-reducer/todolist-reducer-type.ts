export type ActionType =
	| AddedTodolistType
	| RemoveTodolistType
	| ChangeTodolistTitleType
	| ChangeTodolistFilterType
	;

export type AddedTodolistType = {
	type: 'ADDED-TODOLIST',
	id: string,
	title: string,
}
export type RemoveTodolistType = {
	type: 'REMOVE-TODOLIST',
	id: string,
}
export type ChangeTodolistTitleType = {
	type: 'CHANGE-TODOLIST-TITLE',
	id: string,
	title: string,
}
export type ChangeTodolistFilterType = {
	type: 'CHANGE-TODOLIST-FILTER',
	id: string,
	filter: string,
}