import "./App.css";
import { useEffect, useState } from "react"; // useState hook'u import edildi

type Todo = {
	id: number;
	text: string;
	completed: boolean;
}; // interface yerine type kullanıldı

type Filter = "all" | "active" | "completed"; // union type (birden fazla tipi bir arada tutmak için)

function App(): JSX.Element {
	const [todos, setTodos] = useState<Todo[]>(() => {
		const todosFromStorage = localStorage.getItem('todos');
		return todosFromStorage ? JSON.parse(todosFromStorage) : [];
	}); // useState hook'u ile todos isimli state oluşturuldu
	const [newTodo, setNewTodo] = useState<string>(""); // useState hook'u ile newTodo isimli state oluşturuldu
	const [filter, setFilter] = useState<Filter>("all"); // useState hook'u ile filter isimli state oluşturuldu
	const [isEditing, setIsEditing] = useState<boolean>(false);


	setLocalStorage(setTodos); // localStorage'dan verileri çekmek için useEffect hook'u kullanıldı

	const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!newTodo.trim()) return; // newTodo boşsa fonksiyonu sonlandır

		const newTodoItem = { id: Date.now(), text: newTodo, completed: false }; // newTodoItem oluşturuldu
		setTodos([
			...todos,
			newTodoItem
		]); // setTodos ile todos state'ine yeni todo item'ı eklendi
		localStorage.setItem('todos', JSON.stringify([...todos, newTodoItem])); // localStorage'a yeni todo item'ı eklendi
		setNewTodo("");
	}; // addTodo fonksiyonu oluşturuldu




	const toggleTodo = (id: number) => {
		console.log('toggleTodo', todos); // toggleTodo fonksiyonu oluşturuldu
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			} // todo.id ile id eşitse todo.completed değerini tersine çevir
			return todo; // eşit değilse todo döndür
		}); // updatedTodos oluşturuldu
		console.log('toggleTodo', updatedTodos);
		setTodos(updatedTodos); // setTodos ile todos state'ine updatedTodos eklendi
		localStorage.setItem('todos', JSON.stringify(updatedTodos)); // localStorage'a updatedTodos eklendi
	};

	const deleteTodo = (id: number) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos); // setTodos ile todos state'ine updatedTodos eklendi
		localStorage.setItem('todos', JSON.stringify(updatedTodos)); // localStorage'a updatedTodos eklendi
	};

	const clearCompleted = () => {
		const updatedTodos = todos.filter((todo) => !todo.completed); // completed değeri false olan todo'ları updatedTodos'a ekle
		setTodos(updatedTodos); // setTodos ile todos state'ine updatedTodos eklendi
	};

	const countActiveTodos = () => {
		return todos.filter((todo) => !todo.completed).length; // completed değeri false olan todo'ların sayısını döndür
	};

	const getVisibleTodos = () => {
		switch (filter) {
			case "all":
				return todos;
			case "active":
				return todos.filter((todo) => !todo.completed);
			case "completed":
				return todos.filter((todo) => todo.completed);
			default:
				return todos;
		}
	}; // getVisibleTodos fonksiyonu oluşturuldu



	const editLabel = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, text: e.target.value } : todo
		);
		setTodos(updatedTodos);
		localStorage.setItem("todos", JSON.stringify(updatedTodos));
	};
	const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

	const handleLabelDoubleClick = (id: number) => {
		setIsEditing(true);
		setSelectedTodoId(id);
	};


	return (
		<div className="App">
			<section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<form onSubmit={addTodo}>
						<input
							className="new-todo"
							placeholder="What needs to be done?"
							autoFocus
							value={newTodo}
							onChange={(event) => setNewTodo(event.target.value)}
						/>
					</form>
				</header>

				<section className="main">
					<input className="toggle-all" type="checkbox" />
					<label
						htmlFor="toggle-all"
						onClick={() =>
							setTodos(
								todos.map((todo) => ({ ...todo, completed: true }))
							)
						}
					>
						Mark all as complete
					</label>

					<ul className="todo-list">
						{getVisibleTodos().map((todo) => (
							<li
								key={todo.id}
								className={`${todo.completed ? "completed" : ""} ${isEditing && selectedTodoId === todo.id ? "editing" : ""
									}`}
							>
								<div className="view">
									<label onDoubleClick={() => {
										setIsEditing(true);
										setSelectedTodoId(todo.id);
									}}>
										{todo.text}
									</label>
									<button className="destroy" onClick={() => deleteTodo(todo.id)} />
								</div>
								{isEditing && selectedTodoId === todo.id && (
									<input
										type="text"
										className="edit"
										value={todo.text}
										onChange={(e) => editLabel(e, todo.id)}
										onBlur={() => {
											setIsEditing(false);
											setSelectedTodoId(null);
										}}
										autoFocus
									/>
								)}
							</li>
						))}
					</ul>
				</section>
				<footer className="footer">
					<span className="todo-count">
						<strong>{countActiveTodos()}</strong> item(s) left
					</span>
					<ul className="filters">
						<li>
							<button
								className={filter === "all" ? "selected" : ""}
								onClick={() => setFilter("all")}
							>
								All
							</button>
						</li>
						<li>
							<button
								className={filter === "active" ? "selected" : ""}
								onClick={() => setFilter("active")}
							>
								Active
							</button>
						</li>
						<li>
							<button
								className={filter === "completed" ? "selected" : ""}
								onClick={() => setFilter("completed")}
							>
								Completed
							</button>
						</li>
					</ul>
					{todos.some((todo) => todo.completed) && (
						<button className="clear-completed" onClick={clearCompleted}>
							Clear completed
						</button>
					)}
				</footer>
			</section>
		</div>

	);
}

export default App;

function setLocalStorage(setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) {
	useEffect(() => {
		const storedTodos = localStorage.getItem("todos");
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);
} // localStorage'dan verileri çekmek için useEffect hook'u kullanıldı
