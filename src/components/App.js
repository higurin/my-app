import React, { useRef } from "react";
import { useTodo } from "../hooks/useTodo";

// todoTitle コンポーネントを作成
const TodoTitle = ({ title, as }) => {
  if (as === "h1") return <h1>{title}</h1>;
  if (as === "h2") return <h2>{title}</h2>;
  return <p>{title}</p>;
};

// todoItem コンポーネントを作成
const TodoItem = ({ todo, toggleTodoListItemStatus, deleteTodoListItem }) => {

  const handleToggleTodoListItemStatus = () => toggleTodoListItemStatus(todo.id, todo.done);
  const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);

  return (
    <li>
      {todo.content}
      <button onClick={handleToggleTodoListItemStatus}>
        {todo.done ? "未完了リストへ" : "完了リストへ"}
      </button>
      <button onClick={handleDeleteTodoListItem}>削除</button>
    </li>
  );
};

// todoList コンポーネントを作成
const TodoList = ({ todoList, toggleTodoListItemStatus, deleteTodoListItem }) => {
  return (
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
  );
};

// todoAdd コンポーネントを作成
const TodoAdd = ({ inputEl, handleAddTodoListItem }) => {
  return (
    <>
      {/* useRef() で作成した refオブジェクトを ref属性に指定してDOMを参照する */}
      < textarea ref={inputEl} />
      {/* 「+ TODOを追加」ボタンをクリックで handleAddTodoListItem 関数を実行 */}
      <button button onClick={handleAddTodoListItem} > + TODOを追加</button >
    </>
  );

};


function App() {
  // useTodo() カスタムフックで作成した todoList を利用できるようにする
  const {
    todoList,
    addTodoListItem,
    toggleTodoListItemStatus,
    deleteTodoListItem,
  } = useTodo();

  // useRef でrefオブジェクトを作成(TODO入力フォームで利用)
  const inputEl = useRef(null);

  // TODO入力フォームで入力された文字列を新しいTODOに登録するための handleAddTodoListItem 関数を宣言
  const handleAddTodoListItem = () => {
    // 何も入力されていない場合にクリックしても何も返さない
    if (inputEl.current.value === "") return;

    // テキストエリアに入力されたテキストを新規TODOとして追加
    // 追加したら、テキストエリアをからの文字列にする
    addTodoListItem(inputEl.current.value);
    inputEl.current.value = "";
  };

  console.log("TODOリスト:", todoList);

  // filter() を利用して「TODOの状態が未完了」の要素をもつ新しい配列を作成
  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  // filter() を利用して「TODOの状態が完了」の要素を持つ新しい配列を作成
  const completedList = todoList.filter((todo) => {
    return todo.done;
  });

  return (
    <>
      <TodoTitle title="TODO進捗管理" as="h1" />

      <TodoAdd
        inputEl={inputEl}
        handleAddTodoListItem={handleAddTodoListItem} />
      <TodoTitle title="未完了TODOリスト" as="h2" />
      <TodoList
        todoList={inCompletedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
      />

      <TodoTitle title="完了TODOリスト" as="h2" />
      <TodoList
        todoList={completedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
      />
    </>
  );
}

export default App;
