import React, {useState} from "react";
// Type
type EditableSpanPropsType = {
	title: string
	onchangeInput: (title: string) => void,
};
// EditableSpan
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
	// State
	console.log('EditableSpan is called')
	const [editMode, setEditMode] = useState(true);
	const [inputTitle, setInputTitle] = useState("")
	// Logic
	const changeEditMode = () => {
		setEditMode(false);
		setInputTitle(props.title)
	};
	const changeViewMode = () => {
		setEditMode(true)
		props.onchangeInput(inputTitle)
	};
	const changeInput = (e:any) => {
		let inputTitleValue = e.currentTarget.value;
		setInputTitle(inputTitleValue)
	};
	// Return
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
});