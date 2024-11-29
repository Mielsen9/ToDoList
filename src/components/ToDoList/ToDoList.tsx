import React, {ChangeEvent} from "react";
import {FilterValueType, TasksType} from "@/App";
import * as s from "./ToDoList.module.scss";
import {InputForm} from "@/components/InputForm/InputForm";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan";

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
			<h3><EditableSpan title={props.title} onchangeInput={changeToDoListTitle}/></h3>
			<button onClick={removeToDoListHandler}>X</button>
			<div>
				<InputForm addItem={addTasks}
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
								<li className={i.isDone ? s.isDone : ""}
									key={ i.id }>
									<input type={ "checkbox" }
										   onChange={ changeCheckBox }
										   checked={ i.isDone }/>
									<EditableSpan title={i.title} onchangeInput={changeTaskTitle}/>
									<button onClick={ deleteTaskHandler }>x</button>
								</li>
								)
							})
					}
				</ul>
				<div>
					<button className={ props.filter === "all" ? s.activeFilter : "" }
							onClick={ allClickHandler }>All</button>
					<button className={ props.filter === "active" ? s.activeFilter : "" }
							onClick={ activeClickHandler }>Active</button>
					<button className={ props.filter === "completed" ? s.activeFilter : "" }
							onClick={ completedClickHandler }>Completed</button>
				</div>
			</div>
		</div>
	);
};

