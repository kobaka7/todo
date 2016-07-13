;(function(){
$(function(){
setEvent();

// ======================================================================
                                //初期化系
// ======================================================================

function setEvent(){
  reload();
  bgReload();
  focus();
}

// 最初からフォーカスを当ててくれる
function focus(){
  $(".m-input").focus();
  $(".m-important-input").focus();
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

// liの各機能をいっぺんに実装
function addListFunction(){
  compBtn($listEl);
  favBtn($listEl);
  clickList($listEl);
}
// ======================================================================
                                //メイン画面
// ======================================================================

// ------------------- リロード --------------------

function reload(){
  $(".m-output-area").empty();
  var listArray = getLocalStorage("todo",listArray);
  // もしローカルストレージにjsonがあったら
  if(listArray !== null) {
    //配列の数だけliを生成する
    for(var cnt=0; cnt < listArray.length; cnt++){
      // li生成してulに追加
      createListEl(listArray[cnt]);
      addListFunction();
      $(".m-output-area").append($listEl);
    }
  }
}

// ------------------- li生成 --------------------

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

// ======================================================================
                                //追加画面
// ======================================================================

function addListEl(){
  var listArray = getLocalStorage("todo",listArray);

  // インプット要素を取得してulにliを追加する
  var $inputText = $(".m-add-list-input").val();
  var newList = {task:$inputText, comp:false, fav:false, date:null};
  createListEl(newList);
  addListFunction();
  $listEl.prependTo(".m-output-area");

  // 配列にオブジェクト追加
  listArray.unshift(newList);
  setLocalStorage("todo",listArray);
}

// ------------- 追加ボタン -----------

$(".m-add-btn").on("click",function(){
  $(".l-main").css({display:"none"});
  $(".l-add-list").css({display:"block"});
});

// ------------- 追加画面完了ボタン -----------

$(".m-add-list-btn").on("click",function(){
  if ($(".m-add-list-input").val() !== ""){ //空白禁止
    $(".l-add-list").css({display:"none"});
    $(".l-main").css({display:"block"});
    addListEl();
  } else {
    alert("タスクを入力してください");
  }
});

// ------------- 追加画面キャンセルボタン -----------

$(".m-add-list-cancel-btn").on("click",function(){
    $(".l-add-list").css({display:"none"});
    $(".l-main").css({display:"block"});
});

// ======================================================================
                                // 時間入力画面
// ======================================================================

function clickList(aTarget){
  aTarget.on("click",function(evt){
    var num = $(this).index(); //liのthis番目取得
    $(".l-main").css({display:"none"});
    $(".l-setTime").css({display:"block"});
    var inputText = $(this).find(".m-list-txt").text()
    $(".m-setTime-list-input").val(inputText);
  });
}

// ------------- 編集完了ボタン -----------

$(".m-setTime-list-btn").on("click",function(evt){
  $(".l-setTime").css({display:"none"});
  $(".l-main").css({display:"block"});
});

// ------------- 編集キャンセルボタン -----------

$(".m-setTime-list-cancel-btn").on("click",function(evt){
  $(".l-setTime").css({display:"none"});
  $(".l-main").css({display:"block"});
});

// --------------------------- 編集機能 ---------------------------

function textEdit(aTarget){
  // テキストをクリックしたら
  aTarget.find(".m-list-txt").on("click",function(evt){
    var num = $(this).index(); //liのthis番目取得

    // インプット要素に置き換えて元々書いてあったテキストを表示
    aTarget.replaceWith("<input class=m-input-edit value=" + $(this).text() + ">");

    // キーダウンしたら
    $('.m-input-edit').on('keydown', function(evt){
      if ($("m-input-edit").val() !== ""){ //空白禁止
        if(typeof evt.keyCode === "undefined" || evt.keyCode === 13) {
          var inputTxt = $(".m-input-edit").val(); //編集テキスト取得
          var newTodo = {task:inputTxt , comp:false, fav:true, date:dateEl};
          createListEl(newTodo);

          // ローカルストレージの編集
          getLocalStorage();
          listArray[num].task = inputTxt;  // ここがちがうよ
          setLocalStorage();

          //インプット要素をliに置き換え
          $(this).replaceWith($listEl);
          addListFunction($listEl);

        } // 13
      } // 空白禁止
    }); // キーダウン
  }); //クリック
} //textEdit
// ------------------- 完了ボタン --------------------

function compBtn(aTarget){
  aTarget.find(".m-comp-btn").on("click",function(evt){
    // liのthis番目取得
    var num = $(this).parent().parent().index();
    $(this).parent().parent().slideUp(120,"linear",function(){
      $(this).remove();
    })

    // ------ ローカルストレージ処理 ------
    var listArray = getLocalStorage("todo",listArray);
    var compListArray = getLocalStorage("compTodo",compListArray);

    listArray[num].comp = true;
    compListArray.unshift(listArray[num]);
    // num番目から1つ配列を消す
    listArray.splice(num,1);

    setLocalStorage("todo",listArray);
    setLocalStorage("compTodo",compListArray);
  });
}

// ------------------- お気に入りボタン --------------------

function favBtn(aTarget){
  aTarget.find(".m-fav-btn").on("click",function(evt){
    // liのthis番目取得
    var num = $(this).parent().parent().index();
    console.log(num);
    $(".m-fav-btn").eq(num).toggleClass("is-active");

    var listArray = getLocalStorage("todo",listArray);
    var favListArray = getLocalStorage("favTodo",favListArray);

    if ($(this).hasClass("is-active")){
      listArray[num].fav = true;
      setLocalStorage("todo",listArray);
      favListArray.unshift(listArray[num]);
      setLocalStorage("favTodo",favListArray);
    }
    else {
      // もし星がなかったら
      // falseにしてlistArrayにセットする
      listArray[num].fav = false;
      setLocalStorage("todo",listArray);
      favListArray.splice(num,1); // liのnum番目に相当する配列を消す方法
      setLocalStorage("favTodo",favListArray);
    }
    evt.stopPropagation(); //liへのイベント伝播禁止
  });
}


// --------------------------- お気に入り機能 ---------------------------

// function favChange(aTarget) {
//   aTarget.find(".fav").on("click",function(evt){
//     num = $(this).parent().parent().index(); //liのthis番目
//     $(".fav").eq(num).toggleClass("is-active"); //isactiveなければつける
//     getLocalStorage();

//     var favCounter = 0;
//     for(var cnt=0; cnt<listArray.length; cnt++){
//       console.log(listArray[cnt].fav);
//       if(listArray[cnt].fav === true){
//         if(favCounter === num){
//           break;
//         }
//         favCounter++;
//       }
//     }

//     console.log(favCounter);
//     if ($(this).hasClass("is-active")){ //もしisactiveがあったら
//       favChangeLS(true, cnt); // ここを変える
//     }
//     else {
//       favChangeLS(false, cnt);
//       $(this).removeClass("is-active");
//     }
//   }); //クリック
// }

// function favChangeLS(aTruthValue,aNum){
//   listArray[aNum].fav = aTruthValue;
//   setLocalStorage();
// }
// ------------------- テキストの編集機能 --------------------

function textEdit(aTarget){
  // テキストをクリックしたら
  aTarget.find(".m-list-txt").on("click",function(evt){
    // liのthis番目取得
    var num = $(this).parent().parent().index();
    // liをインプット要素に置き換えて元々書いてあったテキストを表示
    aTarget.replaceWith("<input class='m-input-edit' value=" + $(this).text() + ">");
    // 最初からフォーカスを当てる
    $(".m-input-edit").focus().val($(this).text());
    // フォーカスが外れたら
    $(".m-input-edit").on('blur', function(){
      var listArray = getLocalStorage("todo",listArray);
      var inputTxt = $(".m-input-edit").val();
      console.log(listArray);
      var newList = {task:inputTxt , comp:false, fav:listArray[num].fav, date:null};
      // ToDoのリストを生成する
      createListEl(newList);

      // ローカルストレージ処理
      listArray[num].task = inputTxt;
      setLocalStorage("todo",listArray);

      //インプット要素をliに置き換え
      $(this).replaceWith($listEl);
      // $listElの機能を加える
      addListFunction($listEl);
    });

    // キーダウンしたら
    $('.m-input-edit').on('keydown', function(evt){
      if ($("m-input-edit").val() !== ""){ //空白禁止
        if(typeof evt.keyCode === "undefined" || evt.keyCode === 13) {
          var listArray = getLocalStorage("todo",listArray);
          var inputTxt = $(".m-input-edit").val();
          console.log(listArray);
          var newList = {task:inputTxt , comp:false, fav:listArray[num].fav, date:null};
          // ToDoのリストを生成する
          createListEl(newList);

          // ローカルストレージ処理
          listArray[num].task = inputTxt;
          setLocalStorage("todo",listArray);

          //インプット要素をliに置き換え
          $(this).replaceWith($listEl);
          // $listElの機能を加える
          addListFunction($listEl);
        }
      }
    });
  });
}

// ======================================================================
                                //完了したタスク一覧
// ======================================================================

function ShowCompList(){
  $(".m-output-area").empty();
  var compListArray = getLocalStorage("compTodo",compListArray);
  if (compListArray !== null){
    //配列の数だけliを生成する
    for(var cnt=0; cnt < compListArray.length; cnt++){
      createListEl(compListArray[cnt]);
      $listEl.appendTo(".m-output-area");

      // css操作
      $listEl.find(".m-comp-btn").addClass("is-active")
      .parent().find(".m-list-txt").addClass("is-active")
      .parent().find(".m-date-text").css({display:"none"})
      .parent().find(".m-fav-btn").addClass("m-remove-btn")
      .parent().find(".m-fav-btn").removeClass("m-fav-btn");

      // 各機能の実装
      compTrueBtn($listEl);
      removeBtn($listEl);
    }
  }
}

// ------------------- 完了済みボタン --------------------

function compTrueBtn(aTarget){
  aTarget.find(".m-comp-btn").on("click",function(evt){
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
  aTarget.find(".m-remove-btn").on("click",function(evt){
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

// ======================================================================
                                //重要なタスク一覧
// ======================================================================

function ShowFavList(){
  $(".m-output-area").empty();
  var favListArray = getLocalStorage("favTodo",favListArray);
  if (favListArray !== null){
    //配列の数だけliを生成する
    for(var cnt=0; cnt < favListArray.length; cnt++){
      createListEl(favListArray[cnt]);
      addListFunction();
      $listEl.appendTo(".m-output-area");

      // css操作
      $listEl.find(".m-fav-btn").addClass("is-active");
    }
  }
}

// ======================================================================
                             //背景画像切り替え
// ======================================================================

function bgReload(){
    var bgArray = getLocalStorage("bg",bgArray);
    var bgImgNum = bgArray[0];
    if(bgImgNum !== undefined){
    $("body").removeClass();
    $("body").addClass(bgImgNum);
    } else {
      // 何もない場合の初期値
      $("body").addClass("bg-0");
    }
}

function bgChange(){
  $(".m-bg-list").find("img").on("click",function(evt){
    var bgArray = getLocalStorage("bg",bgArray);
    var bgImgNum = $(this).parent().index();
    var bodyClass = "bg-" + bgImgNum;
    $("body").removeClass();
    $("body").addClass(bodyClass);

    bgArray.unshift(bodyClass);
    setLocalStorage("bg",bgArray);
  });
}

// ======================================================================
                                //メニュー画面
// ======================================================================

function menuListClick(aTarget,aHideClass,aShowClass){
  $(aHideClass).css({display:"none"});
  $(aShowClass).css({display:"block"});
  //全部isactiveリセット
  $(".l-menu-list li").removeClass("is-active");
  aTarget.addClass("is-active");
}

$(".l-menu-list-main").on("click",function(evt){
  $(".m-bg-list li img").hide();
  menuListClick($(this),".l-bgselect-wrapper",".l-main");
  reload();
});

$(".l-menu-list-fav").on("click",function(evt){
  $(".m-bg-list li img").hide();
  menuListClick($(this),".l-bgselect-wrapper",".l-main");
  ShowFavList();
});

$(".l-menu-list-comp").on("click",function(evt){
  $(".m-bg-list li img").hide();
  menuListClick($(this),".l-bgselect-wrapper",".l-main");
  ShowCompList();
});

$(".l-menu-list-bg").on("click",function(evt){
  $(".m-bg-list li img").fadeIn(1000);
  menuListClick($(this),".l-main",".l-bgselect-wrapper");
  bgChange();
});








}); //html実行後
})(); //即時関数