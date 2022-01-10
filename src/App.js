import React, { useState, useEffect } from "react";

// モックサーバーとの通信のため axios をimport
import axios from "axios";

// ローカルに用意したモックサーバーのURL
const todoDataUrl = "http://localhost:3100/todos";


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
        // todoList から取り出した todo を子コンポーネントへ props で渡す
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};


function App() {
  // todoList は現在のTODOの状態
  // setTodoList は現在の todoList の状態を更新するための関数
  // todoList の初期値に空の配列をセット
  const [todoList, setTodoList] = useState([]);

  // useEffect() を利用することでコンポーネントのマウント後に処理を実行
  // async/await で非同期処理
  useEffect(() => {
    const fetchData = async () => {

      // get は外部から情報を取得する基本メソッド
      // get の引数にURLを入れると、URLに対してGETリクエストを送信
      // リクエスト後に戻ってくる値は全て response に保存される
      const response = await axios.get(todoDataUrl);

      // 戻された値について useState を利用して、
      // todoList の現在の値としてセットする
      setTodoList(response.data);
    };
    fetchData();
  }, []);

  // console.logでコンソールに取得したTODOリストの情報を表示してみる
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
