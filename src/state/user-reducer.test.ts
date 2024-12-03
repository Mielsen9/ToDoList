import {userReducer} from "@/state/user-reducer";



test("user reducer should increment only age", () => {
	const startState = {age: 20, childrenCount: 2, name: "Petro"};
	const endState = userReducer(startState, { type: 'INCREMENT-AGE'})

	expect(endState.age).toBe(21);

});

test("user reducer should increment only childrenCount", () => {
	const startState = {age: 20, childrenCount: 2, name: "Petro"};
	const endState = userReducer(startState, { type: 'INCREMENT-CHILDRENCOUNT'})

	expect(endState.childrenCount).toBe(3);
})