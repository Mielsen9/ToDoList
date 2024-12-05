import {ActionType, StateType} from "@/state/reducer/user-reducer/user-reducer-type";

export const userReducer = (state: StateType, action: ActionType) => {
	switch (action.type) {
		case 'INCREMENT-AGE':
			let newState = {...state}
			newState.age = state.age + 1;
			return newState;
		case 'INCREMENT-CHILDRENCOUNT':
			return {
				...state,
				childrenCount: state.childrenCount + 1
			}
		case 'CHANGE-NAME':
			return {
				...state,
				name: action.newName
			}
		default:
			throw new Error("I have a problem!!!")
	}
}