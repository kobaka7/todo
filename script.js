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
var $taskTabAll = null;
var $taskTab = null;
var $taskTabFav = null;
var $taskTabComp = null;
var $editBtn  = null;
var $editCompBtn = null;
var $editCancelBtn = null;
var $compEditCancelBtn = null;
var $compEditBtn = null;
var $compEditCancelBtn = null;
var $compEditDelateBtn = null;
var $compEditRevivalBtn = null;
var $addBtn = null;
var $favBtn = null;
var $addCancelBtn = null;
var $compBtn = null;
var $editCompInput = null;
var $removeBtn = null;
var $doneAddBtn = null;
var $study = null;
var $listEl = null;
var $timeText = null;
var num = 0;
var menuStatus = false;

setObj();
setBtn();
setEvent();

// ======================================================================
                                //初期化系
// ======================================================================

// マテリアルデザイン対応
$(document).ready(function() {
  $('select').material_select();
});

function setObj(){
  // ヘッダー
  $body = $("body");
  $header = $(".l-header");
  $headerTitle = $(".m-header-title");

  // タスク画面タブ
  $taskTab = $(".l-task-tab");
  $taskTabAll = $(".m-task-tab-all");
  $taskTabFav = $(".m-task-tab-fav");
  $taskTabComp = $(".m-task-tab-comp");

  // 完了画面
  $compBtn = $(".m-comp-btn");
  $removeBtn = $(".m-remove-btn");
  $compEditBtn = $(".m-comp-edit-btn");
  $compEditCancelBtn = $(".m-comp-edit-cancel-btn");
  $compEditDelateBtn = $(".m-comp-edit-delate-btn");
  $compEditRevivalBtn = $(".m-comp-edit-revival-btn");
  $editCompInput = $(".m-comp-edit-input");

  // メニューバー
  $menu = $(".l-menu");
  $menuTask = $(".l-menu-list-task");
  $addBtn = $(".l-menu-list-add");
  $menuStudy = $(".l-menu-list-study");

  // タスク画面
  $task = $(".l-task");
  $outputArea = $(".m-output-area");

  // 新規作成画面
  $addList = $(".l-add-list");
  $addListInput = $(".m-add-list-input");
  $addCancelBtn = $(".m-add-list-cancel-btn");
  $doneAddBtn = $(".m-add-list-btn");

  // 編集画面
  $edit = $(".l-edit");
  $editInputText = $(".m-edit-input");
  $editBtn = $(".m-edit-btn");
  $editCompBtn = $(".m-edit-comp-btn");
  $editCancelBtn = $(".m-edit-cancel-btn");
  $favBtn = $(".m-fav-btn");
  $timeText = $(".m-time-text");

  // 勉強時間画面
  $study = $(".l-study");
}

// ボタン操作まとめ
function showTask(){
  $addList.css({display:"none"});
  $edit.css({display:"none"});
  $study.css({display:"none"});
  $task.css({display:"block"});
  $taskTab.css({display:"block"});
  $menu.css({display:"block"});
  $headerTitle.text("Study Time");
}

// $(function() {
//   var touched = false;
//   var touch_time = 0;
//   $(".button").bind({
//     'touchstart mousedown': function(e) {
//       touched = true;
//       touch_time = 0;
//       document.interval = setInterval(function(){
//         touch_time += 100;
//         if (touch_time == 500) {
//           alert("ok");
//           showEdit($listEl);
//           console.log($listEl);
//         }
//       }, 100)
//       e.preventDefault();
//     },
//     'touchend mouseup mouseout': function(e) { // マウスが領域外に出たかどうかも拾うと、より自然
//       if (touched) {
//         if (touch_time < 500 ) {
//           alert("!")
//         }
//       }
//       touched = false;
//       clearInterval(document.interval);
//       e.preventDefault();
//     }
//   });
// });


function setBtn(){
  // 新規作成ボタンを押したら
  $addBtn.on("click",function(){
    showAddList();
  });
  // 新規作成画面で追加ボタンを押したら
  $doneAddBtn.on("click",function(){
    if ($addListInput.val() !== ""){ //空白禁止
      addListEl();
      // 元いた場所が完了画面、星画面でも全てのタスクに飛ばす
      reload();
    } else {
      alert("タスクを入力してください");
    }
  });
  $addCancelBtn.on("click",function(){
    showTask();
  });
  $menuTask.on("click",function(evt){
    showTask();
    menuListClick($(this));
  });
  $taskTabAll.on("click",function(evt){
    showTask();
    menuListClick($(this));
    reload();
  });
  $taskTabFav.on("click",function(evt){
    showTask();
    menuListClick($(this));
    ShowFavList();
  });
  $taskTabComp.on("click",function(evt){
    showTask();
    menuListClick($(this));
    ShowCompList();
  });
  $editCancelBtn.on("click",function(evt){
    showTask();
  });
  // 編集画面の編集ボタン押したら
  $editBtn.on("click",function(evt){
    doneEdit();
  });
  // 編集画面の完了ボタン押したら
  $editCompBtn.on("click",function(evt){
    doneComp(num);
  });
  $compEditCancelBtn.on("click",function(evt){
    showTask();
  });
  $compEditDelateBtn.on("click",function(evt){
    doneRemove(num);
  });
  $menuStudy.on("click",function(evt){
    showStudy();
  });
}

function setEvent(){
  reload();
  favBtn();
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

// 重要なタスク一覧用フラグ
function clickMenu(aTruthValue){
  menuStatus = aTruthValue;
  $outputArea.empty();
}

// li生成
function createListEl(aTask){
  // もし未完了なら
  if(aTask.comp !== null){
    $listEl = $("<li class='button'><div class='list-item'><p class='m-list-txt'>"
              + aTask.task
              + "</p><div class='m-time-text'>"
              + aTask.time
              + "</div><span class='m-fav'></span></div></li>");
    // 星済みだったら
    if(aTask.fav === true){
      $listEl.find(".m-fav").addClass("is-active");
    }
    // 勉強時間が未入力だったら
    if(aTask.time === undefined || aTask.time === null){
      $listEl.find('.m-time-text').text("未着手");
    }
    // 科目ごとの色分け
    var sbj = aTask.subject;
    var listColor = null;
    switch(sbj){
        case "国語":
            listColor = "red";
            break;
        case "数学":
            listColor = "green";
            break;
        case "英語":
            listColor = "blue";
            break;
        default:
            listColor = "gray";
            break;
    }
    console.log($listEl.find("li"));
    $listEl.css({borderLeft:"3px solid " + listColor})
  }
}

// liの各機能をいっぺんに実装
function addListFunction(){
  showEdit($listEl);
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
                             // タスク画面（全て）
// ======================================================================

function reload(){
  clickMenu(false);
  showTask();
  var listArray = getLocalStorage("todo",listArray);
  console.log(listArray);
  // もしローカルストレージにjsonがあったら
  if(listArray !== null) {
    //配列の数だけliを生成する
    for(var cnt=0; cnt < listArray.length; cnt++){
      createListEl(listArray[cnt]);
      addListFunction();
      $outputArea.append($listEl);
    }
  }
}

// ======================================================================
                                //新規作成画面
// ======================================================================

function showAddList(){
  $task.css({display:"none"});
  $taskTab.css({display:"none"});
  $study.css({display:"none"});
  $addList.css({display:"block"});
  $headerTitle.text("タスクの新規作成");
  // 最初からフォーカスを当ててくれる
  $addListInput.focus();
}

// ------------- li生成 -----------

function addListEl(){
  var listArray = getLocalStorage("todo",listArray);
  // インプット要素を取得してulにliを追加する
  var $inputText = $addListInput.val();
  var $inputSbject = "数学";

  var newList = {
    task:$inputText,
    comp:false,
    fav:false,
    subject:$inputSbject,
    time:null
  };
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
    var listArray = getLocalStorage("todo",listArray);
    num = $(this).index(); //liのthis番目取得

    $task.css({display:"none"});
    $menu.css({display:"none"});
    $taskTab.css({display:"none"});
    $study.css({display:"none"});
    $edit.css({display:"block"});
    $headerTitle.text("編集");

    // liのテキストを最初から表示させる
    var $inputText = $(this).find(".m-list-txt").text();
    $editInputText.val($inputText);

    // リストのnum番目の星がactiveかどうかで星の初期表示を決める
    if(menuStatus === false){
      if(listArray[num].fav === true){
        $favBtn.addClass("is-active");
      } else {
        $favBtn.removeClass("is-active");
      }
    } else {
      $favBtn.addClass("is-active");
    }
  });
}

// 編集ボタンを押したら
function doneEdit(){
  var listArray = getLocalStorage("todo",listArray);
  var $inputTxt = $editInputText.val();

  // 全てのタスク一覧だったら
  if (menuStatus === false){
    // 編集画面の黄色の星にisactiveがついてるかどうかで
    // ローカルと見た目の星をtrue版にする
    if ($favBtn.hasClass("is-active")){
      var newTodo = {task:$inputTxt , comp:false, fav:true, time:null};
      createListEl(newTodo);
    // 元々あったliと新しいliを置き換える
      $outputArea.find("li").eq(num).replaceWith($listEl);
      addListFunction($listEl);
      $outputArea.find("li").eq(num).find(".m-fav").addClass("is-active");
      listArray[num].fav = true;
    } else {
      var newTodo = {task:$inputTxt , comp:false, fav:false, time:null};
      createListEl(newTodo);
    // 元々あったliと新しいliを置き換える
      $outputArea.find("li").eq(num).replaceWith($listEl);
      addListFunction($listEl);
      $outputArea.find("li").eq(num).find(".m-fav").removeClass("is-active");
      listArray[num].fav = false;
    }
    // ローカルストレージの編集
    listArray[num].task = $inputTxt;
    setLocalStorage("todo",listArray);
  }
  // もし重要なタスク一覧だったら
  else {
      // $outputArea.find("li").eq(num).remove();
      var favCounter = 0;
      for(var cnt=0; cnt<listArray.length; cnt++){
        console.log(listArray[cnt].fav);
        if(listArray[cnt].fav === true){
          if(favCounter === num){
            break;
          }
          favCounter++;
        }
      }
      // もし黄色い星がisactiveだったら
      if ($favBtn.hasClass("is-active")){
        var newTodo = {task:$inputTxt , comp:false, fav:true, time:null};
        createListEl(newTodo);
      // 元々あったliと新しいliを置き換える
        $outputArea.find("li").eq(num).replaceWith($listEl);
        addListFunction($listEl);
        $outputArea.find("li").eq(num).find(".m-fav").addClass("is-active");
        listArray[cnt].fav = true;
      } else {
        $outputArea.find("li").eq(num).remove();
        listArray[cnt].fav = false;
      }
      // ローカルストレージの編集
      listArray[cnt].task = $inputTxt;
      setLocalStorage("todo",listArray);
  }

  // 画面切り替え
  showTask();
}

// 完了ボタンを押したら
function doneComp(num){
  $outputArea.find("li").eq(num).remove();
  var listArray = getLocalStorage("todo",listArray);
  var compListArray = getLocalStorage("compTodo",compListArray);

  listArray[num].comp = true;
  compListArray.unshift(listArray[num]);
  // num番目から1つ配列を消す
  listArray.splice(num,1);

  setLocalStorage("todo",listArray);
  setLocalStorage("compTodo",compListArray);

  // 画面切り替え
  showTask();
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

// ------- お気に入りボタン --------

function favBtn(){
  $favBtn.on("click",function(evt){
    var listArray = getLocalStorage("todo",listArray);
    $favBtn.toggleClass("is-active"); //isactiveなければつける
  }); //クリック
}


// ======================================================================
                           // 完了したタスク一覧
// ======================================================================

function ShowCompList(){
  $outputArea.empty();
  var compListArray = getLocalStorage("compTodo",compListArray);
  if (compListArray !== null){
    //配列の数だけliを生成する
    for(var cnt=0; cnt < compListArray.length; cnt++){
      createListEl(compListArray[cnt]);
      $listEl.appendTo($outputArea);

      $listEl.find(".m-list-txt").addClass("is-active");
      showCompEdit($listEl);
    }
  }
}

// ======================================================================
                                // 完了編集画面
// ======================================================================

function showCompEdit(aTarget){
  aTarget.on("click",function(evt){
    num = $(this).index(); //liのthis番目取得

    $task.css({display:"none"});
    $menu.css({display:"none"});
    $study.css({display:"none"});
    $(".l-comp-edit").css({display:"block"});
    $headerTitle.text("完了したタスク");

    // liのテキストを最初から表示させる
    var $inputText = $(this).find(".m-list-txt").text();
    $editCompInput.val($inputText);
  });
}

// 削除ボタンを押したら
function doneRemove(num){
  $outputArea.find("li").eq(num).remove();

  // ------ ローカルストレージ処理 ------
  var compListArray = getLocalStorage("compTodo",compListArray);
  compListArray.splice(num,1);
  setLocalStorage("compTodo",compListArray);

  // 画面切り替え
  showTask();
}

// ======================================================================
                            // 勉強時間
// ======================================================================

function showStudy(){
  $addList.css({display:"none"});
  $edit.css({display:"none"});
  $task.css({display:"none"});
  $taskTab.css({display:"none"});
  $menu.css({display:"block"});
  $study.css({display:"block"});
  $headerTitle.text("勉強時間");
}

}); //html実行後
})(); //即時関数