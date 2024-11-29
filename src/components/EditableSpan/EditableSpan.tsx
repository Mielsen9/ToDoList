import React, {useState} from "react";

type EditableSpanPropsType = {
	title: string
	onchangeInput: (title: string) => void,
};
export const EditableSpan = (props: EditableSpanPropsType) => {
	const [editMode, setEditMode] = useState(true);
	const [inputTitle, setInputTitle] = useState("")
// show input
	const changeEditMode = () => {
		setEditMode(false);
		setInputTitle(props.title)
	};
// View input
	const changeViewMode = () => {
		setEditMode(true)
		props.onchangeInput(inputTitle)
	};
// Change input
	const changeInput = (e:any) => {
		let inputTitleValue = e.currentTarget.value;
		setInputTitle(inputTitleValue)
	};
	return (
		<div>{
			editMode
			? <span onClick={changeEditMode}>{props.title}</span>
			: <input value={inputTitle}
					 autoFocus={true}
					 onBlur={changeViewMode}
					 onChange={changeInput}
				/>
		}</div>
	)
};