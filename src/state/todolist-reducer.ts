import {ToDoListType} from "@/App";
import {v1} from "uuid";

type ActionType = {
	type: string,
	[key: string]: any
}
export const toDoListReducer = (state: Array<ToDoListType>, action: ActionType) => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(t => t.id !== action.id);
		}
		case 'ADDED-TODOLIST': {
			return [...state, {
				id: v1(),
				title: action.title,
				filter: "all",
			}]
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