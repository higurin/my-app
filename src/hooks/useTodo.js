import { useState, useEffect } from "react";

// 一位な id を生成する ulid を import
import { ulid } from "ulid";

import * as todoData from "../apis/todos";

export const useTodo = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        // useEffect() を利用することによりコンポーネントのマウント後、またはアンマウント後に処理を実行する
        // モックサーバーからTODOデータを取得する getAllTodoData() を実行
        todoData.getAllTodosData().then((todo) => {

            // モックサーバーからTODOデータを取得後、取得したTODOデータを反転させておくことで、
            // TODOを追加した順に上から表示させることができる
            // Array.reverse() と、スプレット構文[ES2015]を組み合わせて
            // 並び替えを行うことで、元の配列要素の並び順に影響することなく新しい配列を作成できる
            // todoList の状態(state)を更新
            setTodoList([...todo].reverse());
        });
    }, []);

    // todoListItem の　done（完了/未完了）の新一を反転させて
    // 更新する toggleTodoListItemStatus 関数を宣言
    const toggleTodoListItemStatus = (id, done) => {
        // find() は配列から条件に合う値を見つけて、最初に true になった要素を返し、要素を見つけた時点で処理を停止する
        // done(完了/未完了)の状態を反転させたい todoListItem の id を見つけ、
        // 条件に一致する todoItem を返す
        const todoItem = todoList.find((item) => item.id === id);

        // 現在の todoList の中から、条件に一致した要素である todoItem の done(完了/未完了)を反転させる
        const newTodoItem = { ...todoItem, done: !done };

        // updateTodoData() を利用して指定された id のTODOを更新したら、
        // 続いて todoList の状態も更新する
        todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
            const newTodoList = todoList.map((item) =>

                // id が異なる場合、todoListから取り出した item をそのまま返し、
                // 同じ場合は done(完了/未完了)の状態を反転させた updatedTodo を
                // 返して新しい配列 nowTodoList を作成
                item.id !== updatedTodo.id ? item : updatedTodo
            );

            // todoList の現在の状態(state)を newTodoListの内容に更新
            setTodoList(newTodoList);
        });
    };

    // 新規TODOを追加する addTodoListItem 関数を宣言
    const addTodoListItem = (todoContent) => {
        const newTodoItem = {

            // content は追加するTODOの内容
            content: todoContent,

            // id に ulid で生成された一意な値をセット
            id: ulid(),

            // 追加されたTODOはデフォルトで未完了状態にセット
            done: false
        }

        // addTodoData() を利用してTODOを更新したら、
        // 続いて todoList の状態も更新
        return todoData.addTodoData(newTodoItem).then((addTodo) => {

            // todoList の状態(state)を newTodoItem が追加された状態に更新
            setTodoList([addTodo, ...todoList]);
        });
    };

    // TODOを削除する deleteTodoListItem 関数を宣言
    const deleteTodoListItem = (id) => {

        // todoData を更新したら todoList の状態も更新
        // deleteTodoData() を利用して指定された id のTODOを削除したら、
        // 続いて todoList の状態も更新する
        todoData.deleteTodoData(id).then((deleteListItemId) => {
            const newTodoList = todoList.filter(
                // 削除したTODOと id が一致しないTODOをフィルタリングして新しい配列を返す
                (item) => item.id !== deleteListItemId
            );

            // todoList の状態を更新
            setTodoList(newTodoList);
        });
    };

    // 作成した関数を返す
    return {
        todoList,
        toggleTodoListItemStatus,
        addTodoListItem,
        deleteTodoListItem
    };
};