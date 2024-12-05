import {
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	toDoListReducer
} from "@/state/reducer/todolist-reducer/todolist-reducer";
import {v1} from "uuid";
import {ToDoListType} from "@/App";

test("toDoList mast be removed", () => {
	let toDoListsID1 = v1();
	let toDoListsID2 = v1();

	const startState: Array<ToDoListType> = [
		{id: toDoListsID1, title: "What to doc", filter: "all"},
		{id: toDoListsID2, title: "What to buy", filter: "all"}
	]
	const endState = toDoListReducer(startState, { type: 'REMOVE-TODOLIST', id: toDoListsID1})

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(toDoListsID2);
});
test("toDoList mast be added", () => {
	let toDoListsID1 = v1();
	let toDoListsID2 = v1();
	let newTitle = "New Title";

	const startState: Array<ToDoListType> = [
		{id: toDoListsID1, title: "What to doc", filter: "all"},
		{id: toDoListsID2, title: "What to buy", filter: "all"}
	]
	const endState = toDoListReducer(startState, { type: 'ADDED-TODOLIST', title: newTitle})

	expect(endState.length).toBe(3);
	expect(endState[2].title).toBe(newTitle);
	expect(endState[2].filter).toBe("all");
});
test("toDoList title mast change ", () => {
	let toDoListsID1 = v1();
	let toDoListsID2 = v1();
	let newTitle = "New Title";

	const startState: Array<ToDoListType> = [
		{id: toDoListsID1, title: "What to doc", filter: "all"},
		{id: toDoListsID2, title: "What to buy", filter: "all"}
	];

	const action = changeTodolistTitleAC(toDoListsID1, newTitle)

	const endState = toDoListReducer(startState, action)

	expect(endState[0].title).toBe(newTitle);
	expect(endState[0].filter).toBe("all");
});
test("toDoList filter mast change ", () => {
	let toDoListsID1 = v1();
	let toDoListsID2 = v1();

	let newFilter = "active";

	const startState: Array<ToDoListType> = [
		{id: toDoListsID1, title: "What to doc", filter: "all"},
		{id: toDoListsID2, title: "What to buy", filter: "all"}
	];

	const action = changeTodolistFilterAC(toDoListsID1, newFilter)

	const endState = toDoListReducer(startState, action)

	expect(endState[0].filter).toBe(newFilter);
});