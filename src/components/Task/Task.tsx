import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "@/state/reducer/task-reducer/task-reducer";
import React, {ChangeEvent, useCallback} from "react";
import * as s from "@/components/ToDoList/ToDoList.module.scss";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// Type
type TaskPropsType = {
	toDoListId: string,
	taskId: string,
	isDone: boolean,
	taskTitle: string
};
// Task
export const Task = React.memo((props: TaskPropsType) => {
	// Logic
	const dispatch = useDispatch();
	const deleteTask = useCallback(() => {
		dispatch(removeTaskAC(props.toDoListId, props.taskId));
	}, [props.toDoListId, props.taskId]);
	const changeCheckBox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeTaskStatusAC(props.toDoListId, props.taskId, e.currentTarget.checked)); // take true or false at checkbox
	},[props.toDoListId, props.taskId]);
	const changeTaskTitle = useCallback((title: string) => {
		dispatch(changeTaskTitleAC(props.toDoListId, props.taskId, title));
	}, [props.toDoListId, props.taskId]);
	//Return
	return (
		<li className={`${props.isDone ? s.isDone : ""} ${s.listItem}`}>
			<div className={s.flex}>
				<input type="checkbox"
					   style={{margin: "10px"}}
					   onChange={changeCheckBox}
					   checked={props.isDone}/>
				<EditableSpan title={props.taskTitle}
							  onchangeInput={changeTaskTitle}/>
			</div>
			<IconButton aria-label="delete"
						size="small"
						onClick={deleteTask}>
				<DeleteIcon fontSize="inherit"/>
			</IconButton>
		</li>
	);
});