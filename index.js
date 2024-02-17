let todoInput;
let errorInfo;
let addBtn;
let ulList;

let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

let main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};
let prepareDOMElements = () => {
	todoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");

	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCloseBtn = document.querySelector(".cancel");
};
let prepareDOMEvents = () => {
	addBtn.addEventListener("click", addNewTodo);
	ulList.addEventListener("click", checkClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changeTodoText);
	todoInput.addEventListener("keyup", enterKeyCheck);
};

let addNewTodo = () => {
	if (todoInput.value !== "") {
		let newTodo = document.createElement("li");
		newTodo.textContent = todoInput.value;
		createToolsArea(newTodo);
		ulList.append(newTodo);
		todoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Add a task.";
	}
};

let createToolsArea = (todoNew) => {
	let toolsPanel = document.createElement("div");
	toolsPanel.classList.add("tools");
	todoNew.append(toolsPanel);

	let completeBtn = document.createElement("button");
	completeBtn.classList.add("complete");
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	let editBtn = document.createElement("button");
	editBtn.classList.add("edit");
	editBtn.textContent = "EDIT";

	let deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete");
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

let checkClick = (e) => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
	} else if (e.target.classList.contains("edit")) {
		editTodo(e);
	} else if (e.target.matches(".delete")) {
		deleteTodo(e);
	}
};
const editTodo = (e) => {
	todoToEdit = e.target.closest("li");
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = "flex";
};
const closePopup = () => {
	popup.style.display = "none";
	popupInfo.textContent = "";
};
const changeTodoText = () => {
	if (popupInput.value !== "") {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = "none";
		popupInfo.textContent = "";
	} else {
		popupInfo.textContent = "Add a task.";
	}
};
const deleteTodo = (e) => {
	e.target.closest("li").remove();
	const allTodos = ulList.querySelectorAll("li");
	if (allTodos.length === 0) {
		errorInfo.textContent = "There are no tasks to delete.";
	}
};
let enterKeyCheck = (e) => {
	if (e.key === "Enter") {
		addNewTodo();
	}
};
document.addEventListener("DOMContentLoaded", main);
