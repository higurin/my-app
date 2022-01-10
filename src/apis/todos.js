// モックサーバーとの通信のため axios をimport
import axios from "axios";

// ローカルに用意したモックサーバーのURL
const todoDataUrl = "http://localhost:3100/todos";


// axios.get() でGETリクエストを送信
// サーバー上の全てのTODO(todos)を取得する getAllTodosData 関数を宣言
// 他ファイルでgetAllTodosData()を利用できるようにするため expot しておく
export const getAllTodosData = async () => {
    const renponse = await axios.get(todoDataUrl);
    // 通信後、response.data でレスポンスデータを返す
    return renponse.data;
};

// axios.post()で新規TODOを追加する
// TODO を追加する addTodoData 関数を宣言
export const addTodoData = async (todo) => {
    // 第２引数に、送信したいデータを指定してPOST送信
    // サーバーに転送することで新規のデータを追加
    const response = await axios.post(todoDataUrl, todo);

    // 通信後、response.data でレスポンスデータを返す
    return response.data;
};

// axios.delete() で一致した id のTODOを削除する
// TODO を削除する deleteTodoData 関数を宣言
export const deleteTodoData = async (id) => {
    await axios.delete(`${todoDataUrl}/${id}`);

    // 通信後、削除したTODOのidを返す
    return id;
};

// axios.put() で一致した id のTODOを更新する
// TODO を更新する updetaTodoData 関数を宣言
export const updateTodoData = async (id, todo) => {
    const response = await axios.put(`${todoDataUrl}/${id}`, todo);

    // 通信後、response.data でレスポンスデータを返す
    return response.data;
};