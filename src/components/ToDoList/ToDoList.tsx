import React, {ChangeEvent} from "react";
import {FilterValueType, TasksType} from "@/App";
import * as s from "./ToDoList.module.scss";
import {InputForm} from "@/components/InputForm/InputForm";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type PropsType = {
	id:string,
	title: string,
	tasks: Array<TasksType>,
	deleteTasks: (id: string, toDoListID: string) => void,
	changeFilter: (value: FilterValueType , toDoListID: string) => void,
	addTasks: (title: string, toDoListID: string) => void,
	changeStatus: (taskId: string, isDone: boolean, toDoListID: string) => void,
	filter: FilterValueType,
	removeToDoList: (toDoListID: string) => void,
	changeTaskTitle: (taskId: string, title: string, toDoListID: string) => void,
	changeToDoListTitle: (taskId: string, title: string) => void,
}

export const ToDoList = (props:PropsType) => {
	const addTasks = (title: string) => {
		props.addTasks(title, props.id)
	}
	const allClickHandler= () => props.changeFilter('all', props.id)
	const activeClickHandler= () => props.changeFilter('active', props.id)
	const completedClickHandler= () => props.changeFilter('completed', props.id)
	const removeToDoListHandler = () => props.removeToDoList(props.id);
	const changeToDoListTitle = (title: string) => {
		props.changeToDoListTitle(props.id, title)
	};

	return (
		<div>
			<div className={s.title}>
				<h3><EditableSpan title={props.title} onchangeInput={changeToDoListTitle}/>
				</h3>
				<Button variant="contained"
						onClick={removeToDoListHandler}>X
				</Button>
			</div>
			<div>
				<InputForm style={s.inputForm} addItem={addTasks}
				/>
				<ul>
					{
						props.tasks.map((i) => {
							const deleteTaskHandler = () => {
								props.deleteTasks(i.id, props.id)
							}
							const changeCheckBox = ( e: ChangeEvent<HTMLInputElement> ) => {
								props.changeStatus(i.id, e.currentTarget.checked, props.id) // take true or false at checkbox
							}
							const changeTaskTitle = (title: string) => {
								props.changeTaskTitle(i.id, title, props.id)
							}
							return (
								<li className={`${i.isDone ? s.isDone : ""} ${s.listItem}`}
									key={i.id}>
									<div className={s.flex}>
										<input type={"checkbox"}
											   style={{margin: "10px"}}
											   onChange={changeCheckBox}
											   checked={i.isDone}/>
										<EditableSpan title={i.title}
													  onchangeInput={changeTaskTitle}/>
									</div>
									<IconButton aria-label="delete"
												size="small"
												onClick={deleteTaskHandler}>
										<DeleteIcon fontSize="inherit" />
									</IconButton>
								</li>
							)
						})
					}
				</ul>
				<div>
					<Button className={ props.filter === "all" ? "contained" : "text" }
							onClick={ allClickHandler }>All</Button>
					<Button color={"primary"} variant={ props.filter === "active" ? "contained" : "text" }
							onClick={ activeClickHandler }>Active</Button>
					<Button color={"secondary"} variant={ props.filter === "completed" ? "contained" : "text" }
							onClick={ completedClickHandler }>Completed</Button>
				</div>
			</div>
		</div>
	);
};

