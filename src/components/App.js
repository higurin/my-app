import { useTodo } from "../hooks/useTodo";

// todoTitle コンポーネントを作成
const TodoTitle = ({ title, as }) => {
  if (as === "h1") return <h1>{title}</h1>;
  if (as === "h2") return <h2>{title}</h2>;
  return <p>{title}</p>;
};

// todoItem コンポーネントを作成
const TodoItem = ({ todo }) => {
  return (
    <li>
      {todo.content}
      <button>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
      <button>削除</button>
    </li>
  );
};

// todoList コンポーネントを作成
const TodoList = ({ todoList }) => {
  return (
    <ul>
      {todoList.map((todo) => (
        // TodoItem に一位なIDを key属性の値として付与
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};


function App() {
  // useTodo() カスタムフックで作成した todoList を利用できるようにする
  const { todoList } = useTodo();

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

      {/* 現時点で textarea は機能していない */}
      <textatra />

      {/* 現時点で TODOを追加 button は機能していない */}
      <button>+ TODOを追加</button>

      <TodoTitle title="未完了TODOリスト" as="h2" />
      <TodoList todoList={inCompletedList} />

      <TodoTitle title="完了TODOリスト" as="h2" />
      <TodoList todoList={completedList} />
    </>
  );
}

export default App;
