import React, { useState, useEffect } from "react";

// モックサーバーとの通信のため axios をimport
import axios from "axios";

// ローカルに用意したモックサーバーのURL
const todoDataUrl = "http://localhost:3100/todos";

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

  // console.log でコンソールに取得した未完了TODOリストの情報を表示してみる
  console.log("未完了TODOリスト:", inCompletedList);

  // filter() を利用して「TODOの状態が完了」の要素を持つ新しい配列を作成
  const completedList = todoList.filter((todo) => {
    return todo.done;
  });

  // console.log でコンソールに取得した完了TODOリストの情報を表示してみる
  console.log("完了TODOリスト：", completedList);

  return (
    <>
      <h1>TODO進捗管理</h1>

      {/* 現時点で textarea は機能していない */}
      <textatra />

      {/* 現時点で TODOを追加 button は機能していない */}
      <button>+ TODOを追加</button>

      <h2>未完了TODOリスト</h2>
      <ul>

        {/* map() を利用して inCompletedListの要素を1つひとつ取り出す */}
        {inCompletedList.map((todo) => (

          // li に一意なIDを key属性の値として付与
          <li key={todo.id}>
            {todo.content}

            {/* TODOが完了の場合は「未完了リストへ」、未完了の場合は「完了リストへ」と表示するボタンを設置する */}
            {/* 現時点でトグルボタンは機能していない */}
            <button>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
            {/* TODOの「削除」ボタンを設置しておく */}
            {/* 現時点で「削除」ボタンは機能していない */}
            <button>削除</button>
          </li>
        ))}
      </ul>

      <h2>完了TODOリスト</h2>
      <ul>
        {completedList.map((todo) => (
          <li key={todo.id}>
            {todo.content}
            <button>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
            <button>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
