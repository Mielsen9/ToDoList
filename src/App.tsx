import React, {useState} from "react";
import * as s from "./App.module.scss";
import {ToDoList} from "@/components/ToDoList/ToDoList";
import {v1} from "uuid";
import {InputForm} from "@/components/InputForm/InputForm";
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import ButtonAppBar from "@/components/Nav/Nav";

//type
export type FilterValueType = 'all' | 'completed' | 'active';
export type TasksStateType = {
    [id: string]: Array<TasksType>
}
export type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
}
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
}
// App
export const App = () => {
// State
    let toDoListsID1 = v1();
    let toDoListsID2 = v1();

    const [toDoLists, setToDoList] = useState<Array<ToDoListType>>([
        {id: toDoListsID1, title: "What to doc", filter: "all"},
        {id: toDoListsID2, title: "What to buy", filter: "all"}
    ]);
    const [tasksObj, setTasksObj] = useState<TasksStateType>({
        [toDoListsID1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [toDoListsID2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
        ],
    })
// logic
    function removeToDoList(toDoListID: string) {
        let filterToDoLists = toDoLists.filter(t => t.id !== toDoListID);
        setToDoList(filterToDoLists);
        delete tasksObj[toDoListID];
        setTasksObj(tasksObj);
    }
    function changeToDoListTitle(taskId: string, title: string) {
        let task = toDoLists.find(t => t.id === taskId)
        if(task) {
            task.title = title;
        }
        setToDoList([...toDoLists])
    }
    function addToDoList(title: string) {
        let toDoList: ToDoListType = {
            id: v1(),
            title: title,
            filter: "all",
        }
        setToDoList([toDoList, ...toDoLists]);
        setTasksObj({
            ...tasksObj,
            [toDoList.id]: []
        });
    }
    function changeFilter (value: FilterValueType, toDoListID: string ) {
        let toDoList = toDoLists.find(td => td.id === toDoListID)
        if(toDoList) {
            toDoList.filter = value;
            setToDoList([...toDoLists]);
        }
    }

    function changeStatus(taskId: string, isDone: boolean, toDoListID: string) {
        let tasks = tasksObj[toDoListID]
        let task = tasks.find(t => t.id === taskId)
        if(task) {
            task.isDone = isDone
        }
        setTasksObj({...tasksObj})
    }
    function changeTaskTitle(taskId: string, title: string, toDoListID: string) {
        let tasks = tasksObj[toDoListID]
        let task = tasks.find(t => t.id === taskId)
        if(task) {
            task.title = title;
        }
        setTasksObj({...tasksObj})
    }
    function addTasks(title: string, toDoListID: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[toDoListID]
        tasksObj[toDoListID] = [task, ...tasks];
        setTasksObj({...tasksObj})
    }
    function deleteTasks(id: string, toDoListID: string) {
        const tasks = tasksObj[toDoListID];
        tasksObj[toDoListID] = tasks.filter(i => i.id !== id);
        setTasksObj({...tasksObj})
    }



    return (
        <div className={s.conteiner}>
            <ButtonAppBar />
            <InputForm style={s.inputForm} addItem={addToDoList}/>
            <Grid container spacing={4}>

                {
                    toDoLists.map((td) => {
                        let tasksForToDoList = tasksObj[td.id];
                        if(td.filter === 'completed') {
                            tasksForToDoList = tasksForToDoList.filter(i => i.isDone)
                        }
                        if(td.filter === 'active') {
                            tasksForToDoList = tasksForToDoList.filter(i => !i.isDone)
                        }
                        return(<Grid size={6}>
                            <Paper elevation={10}
                                   style={{
                                       padding: "10px",
                            }}
                            >
                            <ToDoList
                                key={ td.id }
                                id={ td.id }
                                title = { td.title }
                                tasks = { tasksForToDoList }
                                deleteTasks = { deleteTasks }
                                changeFilter = { changeFilter }
                                addTasks = { addTasks }
                                changeStatus = { changeStatus }
                                filter={ td.filter }
                                removeToDoList={removeToDoList}
                                changeTaskTitle={changeTaskTitle}
                                changeToDoListTitle={changeToDoListTitle}
                            />
                            </Paper>
                    </Grid>)
                    })
            }
            </Grid>
        </div>
    );
};
