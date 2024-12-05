import {ToDoListType} from "@/App";
import {
	ActionType, AddedTodolistType, ChangeTodolistFilterType,
	ChangeTodolistTitleType,
	RemoveTodolistType
} from "@/state/reducer/todolist-reducer/todolist-reducer-type";
import {v1} from "uuid";

export const toDoListReducer = (state: Array<ToDoListType>, action: ActionType) => {
	switch (action.type) {
		case 'ADDED-TODOLIST': {
			return [...state, {
				id: action.id,
				title: action.title,
				filter: "all",
			}]
		}
		case 'REMOVE-TODOLIST': {
			return state.filter(t => t.id !== action.id);
		}
		case 'CHANGE-TODOLIST-TITLE': {
			return state.map(t =>
				t.id === action.id
					? { ...t, title: action.title } // Створюємо копію об'єкта із новим title
					: t // Інші елементи залишаються без змін
			);
		}
		case 'CHANGE-TODOLIST-FILTER': {
			return state.map(t =>
				t.id === action.id
					? { ...t, filter: action.filter } // Створюємо копію об'єкта із новим title
					: t // Інші елементи залишаються без змін
			);
		}
		default:
			throw new Error("I have problem!!!")
	}
}

export const addTodolistAC = (title: string): AddedTodolistType => {
	return {type: 'ADDED-TODOLIST' as const, id: v1(), title: title}
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistType => {
	return {type: 'REMOVE-TODOLIST' as const, id: todolistId}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleType => {
	return {
		type: 'CHANGE-TODOLIST-TITLE',
		id: todolistId,
		title: title,
	}
}
export const changeTodolistFilterAC = (todolistId: string, filter: string): ChangeTodolistFilterType => {
	return {
		type: 'CHANGE-TODOLIST-FILTER',
		id: todolistId,
		filter: filter,
	}
}