import React, {useCallback} from "react";
import {FilterValueType, TasksType} from "@/App";
import * as s from "./ToDoList.module.scss";
import {InputForm} from "@/components/InputForm/InputForm";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "@/state/store";
import {addedTaskAC} from "@/state/reducer/task-reducer/task-reducer";
import {
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC
} from "@/state/reducer/todolist-reducer/todolist-reducer";
import {Task} from "@/components/Task/Task";
//Type
type PropsType = {
	toDoListId: string,
	toDoListTitle: string,
	toDoListFilter: FilterValueType,
}
// Todolist
export const ToDoList = React.memo((props:PropsType) => {
	// State
	console.log('ToDoList is called')
	const dispatch = useDispatch();
	const tasks = useSelector<AppRootState, Array<TasksType>>(state => state.tasks[props.toDoListId] || []);
	// Logic
	const addTasks = useCallback((title: string) => {
		dispatch(addedTaskAC(props.toDoListId, title))
	}, [props.toDoListId]);
	const allClickHandler= useCallback(() => {
		dispatch(changeTodolistFilterAC(props.toDoListId, 'all'));
	}, [props.toDoListId]);
	const activeClickHandler= useCallback(() => {
		dispatch(changeTodolistFilterAC(props.toDoListId, 'active'));
	}, [props.toDoListId]);
	const completedClickHandler= useCallback(() => {
		dispatch(changeTodolistFilterAC(props.toDoListId, 'completed'));
	}, [props.toDoListId]);
	const removeToDoListHandler = useCallback(() => {
		dispatch(removeTodolistAC(props.toDoListId));
	}, [props.toDoListId]);
	const changeToDoListTitle =useCallback((title: string) => {
		dispatch(changeTodolistTitleAC(props.toDoListId, title));
	}, [props.toDoListId]);

	let tasksForToDoList = tasks;
	if(props.toDoListFilter === 'completed') {
		tasksForToDoList = tasksForToDoList.filter(i => i.isDone)
	}
	if(props.toDoListFilter === 'active') {
		tasksForToDoList = tasksForToDoList.filter(i => !i.isDone)
	}
	// Return
	return (
		<div>
			<div className={s.title}>
				<h3><EditableSpan title={props.toDoListTitle}
								  onchangeInput={changeToDoListTitle}/></h3>
				<Button variant="contained"
						onClick={removeToDoListHandler}>X</Button>
			</div>
			<div>
				<InputForm style={s.inputForm}
						   addItem={addTasks}/>
				<ul>
					{tasksForToDoList && tasksForToDoList.length > 0 ? (
						tasksForToDoList.map((task) =>
							<Task key={task.id}
								  toDoListId={props.toDoListId}
								  taskId={task.id}
								  isDone={task.isDone}
								  taskTitle={task.title} />
						)
					) : (
						<li>No tasks available</li> // If no tasks available, show this message
					)}
				</ul>
				<div>
					<Button className={ props.toDoListFilter === "all" ? "contained" : "text" }
							onClick={ allClickHandler }>All</Button>
					<Button color={"primary"} variant={ props.toDoListFilter === "active" ? "contained" : "text" }
							onClick={ activeClickHandler }>Active</Button>
					<Button color={"secondary"} variant={ props.toDoListFilter === "completed" ? "contained" : "text" }
							onClick={ completedClickHandler }>Completed</Button>
				</div>
			</div>
		</div>
	);
});

