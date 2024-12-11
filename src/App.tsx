import React, {useCallback} from "react";
import * as s from "./App.module.scss";
import {ToDoList} from "@/components/ToDoList/ToDoList";
import {InputForm} from "@/components/InputForm/InputForm";
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import ButtonAppBar from "@/components/Nav/Nav";
import {addTodolistAC} from "@/state/reducer/todolist-reducer/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "@/state/store";

// Type
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
    console.log('App is called')
    const dispatch = useDispatch();
    const toDoLists = useSelector<AppRootState, Array<ToDoListType>>(state => state.toDoLists);
    // Logic
    const addToDoList = useCallback( (title: string) => {
        dispatch(addTodolistAC(title));
    }, [] );
    // Return
    return (
        <div className={s.conteiner}>
            <ButtonAppBar />
            <InputForm style={s.inputForm} addItem={addToDoList}/>
            <Grid container spacing={4}>
                {
                    toDoLists.map((td) => {
                        return(
                            <Grid size={6}
                                  key={ td.id }>
                                <Paper elevation={10}
                                       style={{padding: "10px",}}>
                                    <ToDoList toDoListId={ td.id }
                                              toDoListTitle = { td.title }
                                              toDoListFilter={ td.filter }/>
                                </Paper>
                            </Grid>)
                    })
                }
            </Grid>
        </div>
    );
};
