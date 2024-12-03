import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import * as s from "@/components/InputForm/InputForm.module.scss";
import {Button, TextField} from "@mui/material";

type InputFormPropsType = {
	addItem: (title: string) => void,
	style?: string,
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
		<div className={`${s.inputConteiner} ${props.style}`}>
			<TextField id="outlined-basic"
					   label="Add Task"
					   variant="outlined"
					   size="small"
					   error={!!error}
					   fullWidth
					   value={taskTitle}
					   onChange={inputChangeHandler}
					   onKeyUp={taskTitleHandler}
					   helperText={error}/>
			<Button onClick={addTask}
					variant="contained">+</Button>
		</div>
	)
}