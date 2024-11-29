import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import * as s from "@/components/ToDoList/ToDoList.module.scss";

type InputFormPropsType = {
	addItem: (title: string) => void,
}
export const InputForm = (props: InputFormPropsType) => {
	const [taskTitle, setTaskTitle] = useState("");
	const [error, setError] = useState("")

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.currentTarget.value) // take value at e
	};
	const taskTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError("")
		if (e.key === 'Enter') {
			if (taskTitle.trim() !== "") {
				props.addItem(taskTitle)
				setTaskTitle('')
			} else {
				setError("Title is required")
			}
		}
	};
	const addTask = () => {
		if (taskTitle.trim() !== "") {
			props.addItem(taskTitle)
			setTaskTitle('')
		} else {
			setError("Title is required")
		}

	};
	return (
		<div>
			<input value={taskTitle}
				   onChange={inputChangeHandler}
				   onKeyUp={taskTitleHandler}
				   className={error ? s.error : ""}
			/>
			<button onClick={addTask}>+</button>
			{error && <div className={s['error-massage']}>{error}</div>}
		</div>
	)
}