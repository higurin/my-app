
export const TodoAdd = ({ inputEl, handleAddTodoListItem }) => {
    return (
        <>
            {/* useRef() で作成した refオブジェクトを ref属性に指定してDOMを参照する */}
            < textarea ref={inputEl} />
            {/* 「+ TODOを追加」ボタンをクリックで handleAddTodoListItem 関数を実行 */}
            <button button onClick={handleAddTodoListItem} > + TODOを追加</button >
        </>
    );

};