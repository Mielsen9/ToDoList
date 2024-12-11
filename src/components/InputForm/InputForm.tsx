import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import * as s from "@/components/InputForm/InputForm.module.scss";
import {Button, TextField} from "@mui/material";
// Type
type InputFormPropsType = {
	style?: string,
	addItem: (title: string) => void,
}
// InputForm
export const InputForm = React.memo((props: InputFormPropsType) => {
	// UseState
	console.log('InputForm is called')
	const [taskTitle, setTaskTitle] = useState("");
	const [error, setError] = useState("")
	// Logic
	const inputChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.currentTarget.value) // take value at e
	}, []);
	const taskTitleHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
		if(error !== "") {
			setError("")
		}
		if (e.key === 'Enter') {
			if (taskTitle.trim() !== "") {
				props.addItem(taskTitle)
				setTaskTitle('')
			} else {
				setError("Title is required")
			}
		}
	},[error, taskTitle, props.addItem]);
	const addTask =useCallback(() => {
		if (taskTitle.trim() !== "") {
			props.addItem(taskTitle)
			setTaskTitle('')
		} else {
			setError("Title is required")
		}

	},[taskTitle, props.addItem]);
	// Return
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
});