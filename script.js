;(function(){
$(function(){
var $outputArea = null;
var $addList = null;
var $addListInput = null;
var $body = null;
var $task = null;
var $edit = null;
var $menu = null;
var $editInputText = null;
var $menuTask = null;
var $menuAll = null;
var $menuFav = null;
var $menuComp = null;
var $menuBg = null;
var $editBtn  = null;
var $editCompBtn = null;
var $editCancelBtn = null;
var $addBtn = null;
var $favBtn = null;
var $addCancelBtn = null;
var $compBtn = null;
var $removeBtn = null;
var $addListBtn = null;
var num = 0;
var menuStatus = false;

setObj();
setBtn();
setEvent();

// ======================================================================
                                //初期化系
// ======================================================================

function setObj(){
  $body = $("body");
  $addList = $(".l-add-list"); // 追加画面
  $task = $(".l-task"); // タスク一覧画面
  $edit = $(".l-edit"); //編集画面
  $menu = $(".l-menu");
  $outputArea = $(".m-output-area");
  $addListInput = $(".m-add-list-input");
  $editInputText = $(".m-edit-input");
  $favBtn = $(".m-fav-btn");
  $menuTask = $(".l-menu-list-task");
  $menuAll = $(".m-task-tab-all");
  $menuFav = $(".m-task-tab-fav");
  $menuComp = $(".m-task-tab-comp");
  $menuBg = $(".l-menu-list-bg");
  $editBtn = $(".m-edit-btn");
  $editCompBtn = $(".m-edit-comp-btn");
  $editCancelBtn = $(".m-edit-cancel-btn");
  $addBtn = $(".l-menu-list-add");
  $addCancelBtn = $(".m-add-list-cancel-btn");
  $compBtn = $(".m-comp-btn");
  $removeBtn = (".m-remove-btn");
  $addListBtn = $(".m-add-list-btn");
  $taskTab = $(".l-task-tab");
  $header = $(".l-header");
  $headerTitle = $(".m-header-title");
}

function setBtn(){
  $addBtn.on("click",function(){
    $task.css({display:"none"});
    $taskTab.css({display:"none"});
    $addList.css({display:"block"});
    $headerTitle.text("タスクの追加");
    // 最初からフォーカスを当ててくれる
    $addListInput.focus();
  });
  $addListBtn.on("click",function(){
    if ($addListInput.val() !== ""){ //空白禁止
      $addList.css({display:"none"});
      $task.css({display:"block"});
      $taskTab.css({display:"block"});
      $headerTitle.text("Study Time");
      $menu.css({display:"block"});
      addListEl();
    } else {
      alert("タスクを入力してください");
    }
  });
  $addCancelBtn.on("click",function(){
    $addList.css({display:"none"});
    $task.css({display:"block"});
    $taskTab.css({display:"block"});
    $menu.css({display:"block"});
    $headerTitle.text("Study Time");
  });
  $menuTask.on("click",function(evt){
    $addList.css({display:"none"});
    $task.css({display:"block"});
    $taskTab.css({display:"block"});
    $headerTitle.text("Study Time");
    menuListClick($(this));
  });
  $menuAll.on("click",function(evt){
    $addList.css({display:"none"});
    $task.css({display:"block"});
    $taskTab.css({display:"block"});
    $headerTitle.text("Study Time");
    menuListClick($(this));
    reload();
  });
  $menuFav.on("click",function(evt){
    $addList.css({display:"none"});
    $task.css({display:"block"});
    $taskTab.css({display:"block"});
    $headerTitle.text("Study Time");
    menuListClick($(this));
    ShowFavList();
  });
  $menuComp.on("click",function(evt){
    $addList.css({display:"none"});
    $task.css({display:"block"});
    $taskTab.css({display:"block"});
    $headerTitle.text("Study Time");
    menuListClick($(this));
    ShowCompList();
  });
  $menuBg.on("click",function(evt){
    $addList.css({display:"none"});
    $task.css({display:"none"});
    $taskTab.css({display:"none"});
    $headerTitle.text("Study Time");
    $(".m-bg-list li img").fadeIn(1000);
    menuListClick($(this));
    bgChange();
  });
  $editCancelBtn.on("click",function(evt){
    $edit.css({display:"none"});
    $task.css({display:"block"});
    $taskTab.css({display:"block"});
    $headerTitle.text("Study Time");
    $menu.css({display:"block"});
  });

  // ------ 編集ボタン押したら ------

  $editBtn.on("click",function(evt){
    var listArray = getLocalStorage("todo",listArray);
    var $inputTxt = $editInputText.val();
    var newTodo = {task:$inputTxt , comp:false, fav:false, date:null};
    createListEl(newTodo);

    // 元々あったliと新しいliを置き換える
    $outputArea.find("li").eq(num).replaceWith($listEl);
    addListFunction($listEl);

    // ローカルストレージの編集
    listArray[num].task = $inputTxt;
    setLocalStorage("todo",listArray);

    $edit.css({display:"none"});
    $task.css({display:"block"});
    $taskTab.css({display:"block"});
    $headerTitle.text("Study Time");
    $menu.css({display:"block"});
  });

  // ------ 完了ボタン押したら ------

  $editCompBtn.on("click",function(evt){
    $outputArea.find("li").eq(num).remove();

    var listArray = getLocalStorage("todo",listArray);
    var compListArray = getLocalStorage("compTodo",compListArray);

    console.log(listArray[num]);
    listArray[num].comp = true;
    compListArray.unshift(listArray[num]);
    // num番目から1つ配列を消す
    listArray.splice(num,1);

    setLocalStorage("todo",listArray);
    setLocalStorage("compTodo",compListArray);

    $edit.css({display:"none"});
    $task.css({display:"block"});
    $taskTab.css({display:"block"});
    $headerTitle.text("Study Time");
    $($menu).css({display:"block"});
  });
}

function setEvent(){
  reload();
}

// ローカルストレージから配列を取得する
function getLocalStorage(aKey,aObjArray){
  var jsonList = localStorage.getItem(aKey);
  if(jsonList !== null){
    // JSONをオブジェクトにする
    aObjArray = JSON.parse(jsonList);
  } else {
    var aObjArray = [];
  }
  return aObjArray;
}

// 配列をローカルストレージに保存する
function setLocalStorage(aKey,aJsonArray){
  // オブジェクトをJSONにする
  var objList = JSON.stringify(aJsonArray);
  localStorage.setItem(aKey,objList);
}

function clickMenu(aTruthValue){
  menuStatus = aTruthValue;
  $outputArea.empty();
  console.log("menuStatus  " + menuStatus)
}

// li生成
function createListEl(aTask){
  // もし未完了なら
  if(aTask.comp !== null){
    $listEl = $("<li><div class='list-item'><p class='m-list-txt'>"
              + aTask.task
              + "</p><div class='m-date-text'>"
              + aTask.date
              + "</div><span class='m-fav-btn'></span></div></li>");
    // 星済みだったら
    if(aTask.fav === true){
      $listEl.find(".m-fav-btn").addClass("is-active");
    }
    // 日付が未入力だったら
    if(aTask.date === null){
    }
  }
}

// liの各機能をいっぺんに実装
function addListFunction(){
  favBtn($listEl);
  showEdit($listEl);
}

// ======================================================================
                             //メイン画面
// ======================================================================

function reload(){
  clickMenu(false);
  $headerTitle.text("Study Time");
  var listArray = getLocalStorage("todo",listArray);
  // もしローカルストレージにjsonがあったら
  if(listArray !== null) {
    //配列の数だけliを生成する
    for(var cnt=0; cnt < listArray.length; cnt++){
      // li生成してulに追加
      createListEl(listArray[cnt]);
      addListFunction();
      $outputArea.append($listEl);
    }
  }
}

// ======================================================================
                                //新規作成画面
// ======================================================================

// ------------- li生成 -----------

function addListEl(){
  var listArray = getLocalStorage("todo",listArray);
  // インプット要素を取得してulにliを追加する
  var $inputText = $addListInput.val();
  var newList = {task:$inputText, comp:false, fav:false, date:null};
  createListEl(newList);
  addListFunction();
  $listEl.prependTo($outputArea);

  // 配列にオブジェクト追加
  listArray.unshift(newList);
  setLocalStorage("todo",listArray);
  // 打った後空白
  $addListInput.val("");
}

// ======================================================================
                                // 編集画面
// ======================================================================

function showEdit(aTarget){
  aTarget.on("click",function(evt){
    num = $(this).index(); //liのthis番目取得

    $($task).css({display:"none"});
    $($menu).css({display:"none"});
    $edit.css({display:"block"});
    $headerTitle.text("編集");

    // liのテキストを最初から表示させる
    var $inputText = $(this).find(".m-list-txt").text();
    $editInputText.val($inputText);
  });
}

// ======================================================================
                         // お気に入りボタン
// ======================================================================

function favBtn(aTarget) {
  aTarget.find(".m-fav-btn").on("click",function(evt){
    num = $(this).parent().parent().index(); //liのthis番目
    $(this).toggleClass("is-active"); //isactiveなければつける
    var listArray = getLocalStorage("todo",listArray);

    // 全てのタスクのときにふぁぼを押したら
    if(menuStatus === false){
      //もしisactiveがあったら
      if ($(this).hasClass("is-active")){
        listArray[num].fav = true;
      }
      else {
        listArray[num].fav = false;
        $(this).removeClass("is-active");
      }
    } else { // 重要なタスク一覧の時にふぁぼを押したら
      aTarget.slideUp(120, "linear",function(){
        aTarget.remove();
      })
      // 配列の番号とtargetの番号を一致させる処理
      var favCounter = 0;
      for(var cnt=0; cnt<listArray.length; cnt++){
        if(listArray[cnt].fav === true){
          if(favCounter === num){
            break;
          }
          favCounter++;
        }
      }
      listArray[cnt].fav = false;
      $(this).removeClass("is-active");
    }
    setLocalStorage("todo",listArray);
    evt.stopPropagation(); //liへのイベント伝播禁止
  }); //クリック
}

// ======================================================================
                                //メニュー画面
// ======================================================================

function menuListClick(aTarget){
  //全部isactiveリセット
  $(".l-menu-list li").removeClass("is-active");
  aTarget.addClass("is-active");
}

// ======================================================================
                                //重要なタスク一覧
// ======================================================================

function ShowFavList(){
  clickMenu(true);
  var listArray = getLocalStorage("todo",listArray);
  if (listArray !== null){
    //配列の数だけliを生成する
    for(var cnt=0; cnt < listArray.length; cnt++){
      if(listArray[cnt].fav === true) {
        createListEl(listArray[cnt]);
        addListFunction();
        $listEl.appendTo($outputArea);
      }
      // css操作
      $listEl.find($favBtn).addClass("is-active");
    }
  }
}

// ======================================================================
                                //完了したタスク一覧
// ======================================================================

function ShowCompList(){
  $outputArea.empty();
  var compListArray = getLocalStorage("compTodo",compListArray);
  if (compListArray !== null){
    //配列の数だけliを生成する
    for(var cnt=0; cnt < compListArray.length; cnt++){
      createListEl(compListArray[cnt]);
      $listEl.appendTo($outputArea);

      // css操作
      $listEl.find(".m-list-txt").addClass("is-active")
      .parent().find(".m-fav-btn").addClass("m-remove-btn")
      .parent().find(".m-remove-btn").removeClass("m-fav-btn");
      console.log($listEl);

      // 各機能の実装
      compTrueBtn($listEl);
      removeBtn($listEl);
    }
  }
}

// ------------------- 完了済みボタン --------------------

function compTrueBtn(aTarget){
  aTarget.find($compBtn).on("click",function(evt){
    // liのthis番目取得
    var num = $(this).parent().parent().index();
    $(this).parent().parent().slideUp(120,"linear",function(){
      $(this).remove();
    })

    // ------ ローカルストレージ処理 ------
    var listArray = getLocalStorage("todo",listArray);
    var compListArray = getLocalStorage("compTodo",compListArray);

    compListArray[num].comp = false;
    listArray.unshift(compListArray[num]);
    // num番目から1つ配列を消す
    compListArray.splice(num,1);

    setLocalStorage("todo",listArray);
    setLocalStorage("compTodo",compListArray);
  });
}

// ------------------- 削除ボタン --------------------

function removeBtn(aTarget){
  aTarget.find($removeBtn).on("click",function(evt){
    // liのthis番目取得
    var num = $(this).parent().parent().index();
    $(this).parent().parent().slideUp(120,"linear",function(){
      $(this).remove();
    })

    // ------ ローカルストレージ処理 ------
    var compListArray = getLocalStorage("compTodo",compListArray);
    compListArray.splice(num,1);
    setLocalStorage("compTodo",compListArray);
  });
}

}); //html実行後
})(); //即時関数