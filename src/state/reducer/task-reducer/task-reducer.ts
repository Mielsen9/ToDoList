import {TasksStateType} from "@/App";
import {ActionType, AddedTaskType, ChangeTaskStatusType, ChangeTaskTitleType, RemoveTaskType} from "./task-reducer-type"
import {v1} from "uuid";

export const taskReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
	switch (action.type) {
		case 'ADDED-TASK': {
			const newTask = {
				id: v1(),
				title: action.title,
				isDone: false,
			};
			// Додаємо нове завдання до потрібного списку
			return {
				...state,
				[action.id]: [newTask, ...state[action.id]],
			};
		}
		case 'REMOVE-TASK':
			return {
				...state,
				[action.id]: state[action.id].filter(t => t.id !== action.taskId)
			};
		case 'CHANGE-TASK-TITLE': {
			return {
				...state,
				[action.id]: state[action.id].map(t =>
					t.id === action.taskId
						? { ...t, title: action.title } // Створюємо копію об'єкта із новим title
						: t // Інші елементи залишаються без змін
				)
			};
		}
		case 'CHANGE-TASK-STATUS': {
			return {
				...state,
				[action.id]: state[action.id].map(t =>
					t.id === action.taskId
						? { ...t, isDone: action.isDone } // Створюємо копію об'єкта із новим isDONE
						: t // Інші елементи залишаються без змін
				)
			};
		}
		case 'ADDED-TODOLIST': {

			return {
				...state,
				[action.id]: [] // Додаємо новий ключ зі значенням порожнього масиву
			};
		}
		case 'REMOVE-TODOLIST': {
			const newState = { ...state }; // Створюємо копію стану
			delete newState[action.id]; // Видаляємо потрібний ключ
			return newState; // Повертаємо новий стан
		}
		default:
			throw new Error("I have problem!!!")
	}
}
export const addedTaskAC = (toDoListsID: string, title: string): AddedTaskType => {
	return {
		type: 'ADDED-TASK' as const,
		id: toDoListsID,
		title: title,
	}
}
export const removeTaskAC = (toDoListsID: string, taskId: string): RemoveTaskType => {
	return {
		type: 'REMOVE-TASK' as const,
		id: toDoListsID,
		taskId: taskId,
	}
}
export const changeTaskTitleAC = (toDoListsID: string, taskId: string, title: string): ChangeTaskTitleType => {
	return {
		type: 'CHANGE-TASK-TITLE' as const,
		id: toDoListsID,
		taskId: taskId,
		title: title,
	}
}
export const changeTaskStatusAC = (toDoListsID: string, taskId: string, isDone: boolean): ChangeTaskStatusType => {
	return {
		type: 'CHANGE-TASK-STATUS' as const,
		id: toDoListsID,
		taskId: taskId,
		isDone: isDone,
	}
}