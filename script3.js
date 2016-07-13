;(function(){
$(function(){
var $outputArea = null;
var $addList = null;
var $addListInput = null;
var $body = null;
var $main = null;
var edit = null;
var $editInputText = null;
var $menuAll = null;
var $menuFav = null;
var $menuComp = null;
var $menuBg = null;
var $editBtn  = null;
var $editCompBtn = null;
var $editCancelBtn = null;
var $addBtn = null;
var $addCancelBtn = null;
var $compBtn = null;
var $removeBtn = null;
var $addListBtn = null;
var num = 0;

setObj();
setBtn();
setEvent();

// ======================================================================
                                //初期化系
// ======================================================================

function setObj(){
  $body = $("body");
  $addList = $(".l-add-list"); // 追加画面
  $main = $(".l-main"); // タスク一覧画面
  $edit = $(".l-edit"); //編集画面
  $outputArea = $(".m-output-area");
  $addListInput = $(".m-add-list-input");
  $editInputText = $(".m-edit-input");
  $favBtn = $(".m-fav-btn");
  $menuAll = $(".l-menu-list-main");
  $menuFav = $(".l-menu-list-fav");
  $menuComp = $(".l-menu-list-comp");
  $menuBg = $(".l-menu-list-bg");
  $editBtn = $(".m-edit-btn");
  $editCompBtn = $(".m-edit-comp-btn");
  $editCancelBtn = $(".m-edit-cancel-btn");
  $addBtn = $(".m-add-btn");
  $addCancelBtn = $(".m-add-list-cancel-btn");
  $compBtn = $(".m-comp-btn");
  $removeBtn = (".m-remove-btn");
  $addListBtn = $(".m-add-list-btn");
}

function setBtn(){
  $addBtn.on("click",function(){
    $($main).css({display:"none"});
    $addList.css({display:"block"});
    $addListInput.focus();
  });
  $addListBtn.on("click",function(){
    if ($addListInput.val() !== ""){ //空白禁止
      $addList.css({display:"none"});
      $($main).css({display:"block"});
      addListEl();
    } else {
      alert("タスクを入力してください");
    }
  });
  $addCancelBtn.on("click",function(){
      $addList.css({display:"none"});
      $($main).css({display:"block"});
  });
  $menuAll.on("click",function(evt){
    menuListClick($(this));
    reload();
  });
  $menuFav.on("click",function(evt){
    menuListClick($(this));
    ShowFavList();
  });
  $menuComp.on("click",function(evt){
    menuListClick($(this));
    ShowCompList();
  });
  $menuBg.on("click",function(evt){
    $(".m-bg-list li img").fadeIn(1000);
    menuListClick($(this));
    bgChange();
  });
  $editCancelBtn.on("click",function(evt){
    $edit.css({display:"none"});
    $($main).css({display:"block"});
  });
}

function setEvent(){
  reload();
  bgReload();
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
      $listEl.find($favBtn).addClass("is-active");
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
  $outputArea.empty();
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

// ------------- 背景リロード -----------

function bgReload(){
    var bgArray = getLocalStorage("bg",bgArray);
    var bgImgNum = bgArray[0];
    if(bgImgNum !== undefined){
    $body.removeClass();
    $body.addClass(bgImgNum);
    } else {
      // 何もない場合の初期値
      $body.addClass("bg-0");
    }
}

// ======================================================================
                                //新規作成画面
// ======================================================================

// ------------- li生成 -----------

function addListEl(){
  var listArray = getLocalStorage("todo",listArray);
  // 最初からフォーカスを当ててくれる
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
    console.log(num);

    $($main).css({display:"none"});
    $edit.css({display:"block"});

    // liのテキストを最初から表示させる
    var $inputText = $(this).find(".m-list-txt").text();
    $editInputText.val($inputText);
  });
}

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
  $($main).css({display:"block"});
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
  $($main).css({display:"block"});
});

// ======================================================================
                         // お気に入りボタン
// ======================================================================

function favBtn(aTarget) {
  aTarget.find($favBtn).on("click",function(evt){
    num = $(this).parent().parent().index(); //liのthis番目
    $favBtn.eq(num).toggleClass("is-active"); //isactiveなければつける
    var listArray = getLocalStorage("todo",listArray);

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
    console.log(cnt);
    console.log(favCounter);
    if ($(this).hasClass("is-active")){ //もしisactiveがあったら
      console.log(listArray[favCounter]);
      listArray[favCounter].fav = true; // ここをnumに変える
    }
    else {
      listArray[favCounter].fav = false;
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
  $outputArea.empty();
  var favListArray = getLocalStorage("favTodo",favListArray);
  if (favListArray !== null){
    //配列の数だけliを生成する
    for(var cnt=0; cnt < favListArray.length; cnt++){
      createListEl(favListArray[cnt]);
      addListFunction();
      $listEl.appendTo($outputArea);

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
      .parent().find(".m-date-text").css({display:"none"})
      .parent().find($favBtn).addClass("m-remove-btn")
      .parent().find($favBtn).removeClass("m-fav-btn");

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