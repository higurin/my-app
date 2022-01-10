import { TodoTitle } from "../components/TodoTitle";
import { TodoItem } from "../components/TodoItem";

export const TodoList = ({ todoList, toggleTodoListItemStatus, deleteTodoListItem, title, as }) => {
    return (
        <>
            {/* todoList 配列の中身が空の場合は、見出しとTODOリストの両方を表示させない */}
            {todoList.length !== 0 && (
                <>
                    <TodoTitle title={title} as={as} />
                    <ul>
                        {todoList.map((todo) => (
                            // TodoItem に一位なIDを key属性の値として付与
                            <TodoItem
                                todo={todo}
                                key={todo.id}
                                toggleTodoListItemStatus={toggleTodoListItemStatus}
                                deleteTodoListItem={deleteTodoListItem} />
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};