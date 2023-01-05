const onClicAdd = () => {
  // 入力された値を取得する,値が残らないように消す
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  
  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // liタグを生成
  const li = document.createElement("li");

  // divタグを生成し、クラス名を付与する
  const div = document.createElement("div");
  div.className = "list-row";

  // pタグを生成し、入力値を入れる
  const p = document.createElement("p");
  p.innerText = text;

  // 完了ボタン生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの祖先要素（li）を未完了リストから削除
    deleteFromIncompleteList(completeButton.closest("li"));

    // 完了リストに追加する要素
    const addTarget = completeButton.closest("li");

    // TODOテキスト内容を取得
    const text = addTarget.querySelector("p").innerText;

    // li以下を初期化
    addTarget.textContent = null;

    // li以下のタグを生成
    const div = document.createElement("div");
    div.className = "list-row";

    const p = document.createElement("p");
    p.innerText = text;

    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグ（li）を削除する
      const deleteTarget = backButton.closest("li");
      document.getElementById("complete-list").removeChild(deleteTarget);

      // TODOテキスト内容を取得
      const text = deleteTarget.querySelector("p").innerText;
      console.log(text);
      createIncompleteList(text);
    });

    // 生成したタグをliタグ以下に設置
    addTarget.appendChild(div);
    div.appendChild(p);
    div.appendChild(backButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);

    // const completeTarget = completeButton.closest("li");
    // document.getElementById("complete-list").appendChild(completeTarget);
    // completeButton.remove();
    // deleteButton.remove();
    // const releaseButton = document.createElement("button");
    // div.appendChild(releaseButton);
    // releaseButton.innerText = "戻す";
  });

  // 削除ボタン生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの祖先（li）要素を未完了リストから削除
    deleteFromIncompleteList(deleteButton.closest("li"));
    // const deleteTarget = deleteButton.closest("li");
    // document.getElementById("incomplete-list").removeChild(deleteTarget);
  });

  // liタグの子要素に各要素を設定
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 追加ボタンを押すと生成したli以下を追加する
  document.getElementById("incomplete-list").appendChild(li);
};

// 追加ボタンを押した時に関数内を実行する
document
  .getElementById("add-button")
  .addEventListener("click", () => onClicAdd());