;(function(){
$(function(){
var $outputArea = null;
var $addList = null;
var $addListInput = null;
var $body = null;
var $task = null;
var $edit = null;
var $menu = null;
var $header = null;
var $headerTitle = null;
var $backBtn = null;
var $cancelBtn = null;
var $logo = null;
var $editInputText = null;
var $menuTask = null;
var $taskTabAll = null;
var $taskTab = null;
var $taskTabFav = null;
var $taskTabComp = null;
var $editBtn  = null;
var $editCompBtn = null;
var $editCancelBtn = null;
var $comp = null;
var $compEditCancelBtn = null;
var $compEditBtn = null;
var $compEditCancelBtn = null;
var $compEditDelateBtn = null;
var $compEditRevivalBtn = null;
var $addBtn = null;
var $favBtn = null;
var $addCancelBtn = null;
var $compDoneBtn = null;
var $compBtn = null;
var $editCompInput = null;
var $removeBtn = null;
var $doneAddBtn = null;
var $study = null;
var $listEl = null;
var $timeText = null;
var num = 0;
var studyTimes = 0;
var time = 0; //タイマーの中
var menuStatus = false;
var weekGraphScroll = false;
var circleGraphFrag = false;

// ストップウォッチ全体
var watch = $("#watch");
// 時間の表示
var hour = $("#hour");
// 分の表示
var minute = $("#minute");
// 秒の表示
var second = $("#second");
// スタートボタンを操作する変数
var btnStart = $("#start");
// リセットボタンを操作する変数
var btnReset = $("#reset");
// 経過時間（最初は0）
var currentTime = 0;
// 止まるかどうか
var stop = true;
// タイマーを押した時間
var timerStartTime = 0;
// タイマーで表示されている勉強時間
var timerStudyTime = 0;
var nowTime = 0;

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

$(document).ready(function(){
  $('.modal-trigger').leanModal();
});

function setObj(){
  // ヘッダー
  $body = $("body");
  $header = $(".l-header");
  $headerTitle = $(".m-header-title");
  $logo = $(".m-logo");
  $backBtn = $(".m-header-back");
  $cancelBtn = $(".m-header-cancel");

  // タスク画面タブ
  $taskTab = $(".l-task-tab");
  $taskTabAll = $(".m-task-tab-all");
  $taskTabFav = $(".m-task-tab-fav");
  $taskTabComp = $(".m-task-tab-comp");

  // 完了画面
  $comp = $(".l-comp")
  $compBtn = $(".m-comp-btn");
  $compDoneBtn = $(".m-comp-done-btn");
  $removeBtn = $(".m-remove-btn");
  $compEditCancelBtn = $(".m-comp-edit-cancel-btn");
  $compEditDelateBtn = $(".m-comp-edit-delate-btn");
  $compEditRevivalBtn = $(".m-comp-edit-revival-btn");
  $editCompInput = $(".m-comp-edit-input");
  $compEdit = $(".l-comp-edit");

  // メニューバー
  $menu = $(".l-menu");
  $menuTask = $(".l-menu-list-task");
  $addBtn = $(".l-menu-list-add");
  $menuStudy = $(".l-menu-list-study");

  // タスク画面
  $task = $(".l-task");
  $outputArea = $(".m-output-area");
  $timerBtn = $(".m-timer-btn")

  // 新規作成画面
  $addList = $(".l-add-list");
  $addListInput = $(".m-add-list-input");
  $addCancelBtn = $(".m-add-list-cancel-btn");
  $doneAddBtn = $(".m-add-list-btn");

  // 編集画面
  $edit = $(".l-edit");
  $editmode = $(".m-edit-edit")
  $editInputText = $(".m-edit-input");
  $editBtn = $(".m-edit-btn");
  $editCompBtn = $(".m-edit-comp-btn");
  $editCancelBtn = $(".m-edit-cancel-btn");
  $favBtn = $(".m-fav-btn");
  $timeText = $(".m-time-text");
  $tabTimer = $(".m-edit-tab-timer");
  $tabEdit = $(".m-edit-tab-edit");
  $EditStudyTime = $(".m-edit-studytime");
  $editHour = $(".m-edit-hour");
  $editMinute = $(".m-edit-minute");
  $editSecond = $(".m-edit-second");

  // タイマー画面
  $timer = $(".l-timer");
  $timerStratBtn = $(".m-edit-timer-start-btn");
  $timerStopBtn = $(".m-edit-timer-stop-btn");

  // 勉強時間画面
  $study = $(".l-study");
}

// ボタン操作まとめ
function showTask(){
  $addList.css({display:"none"});
  $edit.css({display:"none"});
  $study.css({display:"none"});
  $compEdit.css({display:"none"});
  $comp.css({display:"none"});
  $timer.css({display:"none"});
  $task.css({display:"block"});
  $taskTab.css({display:"block"});
  $menu.css({display:"block"});
  $logo.css({display:"block"});
  $header.css({display:"block"});
  $backBtn.css({display:"none"});
  $cancelBtn.css({display:"none"});
  $headerTitle.text("");
  $header.css({backgroundColor:"#007AFF"})

  $("#container").css({visibility:"hidden"});
  weekGraphScroll = false;

  $("#doughnutChart").find("svg").remove();
  $(".doughnutSummary").find("p").remove();
  circleGraphFrag = false;
}

function setBtn(){
  // 新規作成ボタンを押したら
  $addBtn.on("click",function(){
    showAddList();
  });
  // 新規作成画面で追加ボタンを押したら
  $doneAddBtn.on("click",function(){
    //空白禁止
    if ($addListInput.val() !== ""){
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
    tabListClick($(this));
    reload();
  });
  $taskTabFav.on("click",function(evt){
    showTask();
    tabListClick($(this));
    ShowFavList();
  });
  $taskTabComp.on("click",function(evt){
    showTask();
    tabListClick($(this));
    ShowCompList();
  });
  $editCancelBtn.on("click",function(evt){
    showTask();
  });
  $backBtn.on("click",function(evt){
    showTask();
  });
  $cancelBtn.on("click",function(evt){
    clearInterval(time);
    showTask();
  });
  // 編集画面の編集ボタン押したら
  $editBtn.on("click",function(evt){
    doneEdit();
  });
  $compEditCancelBtn.on("click",function(evt){
    showTask();
  });
  $compEditDelateBtn.on("click",function(evt){
    doneRemove(num);
  });
  $tabEdit.on("click",function(evt){
    $(".l-edit-tab-list > li").removeClass("is-active");
    $(this).addClass("is-active");
    $timermode.css({display:"none"});
    $editmode.css({display:"block"});
  });
  $timerStratBtn.on("click",function(evt){
    $(this).css({display:"none"});
    $timerStopBtn.css({display:"block"});
  });
  $timerStopBtn.on("click",function(evt){
    $(this).css({display:"none"});
    $timerStratBtn.css({display:"block"});
  });
  // 完了ボタン押したら
  $compDoneBtn.on("click",function(evt){
    $outputArea.find("li").eq(num).remove();
    var listArray = getLocalStorage("todo",listArray);
    var compListArray = getLocalStorage("compTodo",compListArray);

    // 勉強時間入力
    var studyHours = $("select.m-comp-time-hours").val();
    var studyMinutes = $("select.m-comp-time-minutes").val();
    // 文字列を数値に変換する
    studyHours = Number(studyHours);
    studyMinutes = Number(studyMinutes);
    studyTimes = studyHours + studyMinutes;
    listArray[num].study = studyTimes;

    // 勉強完了日時取得
    var compDate = new Date();
    // 経過ミリ秒に変換
    var getTimeCompDate = compDate.getTime();
    listArray[num].compTime = getTimeCompDate;

    listArray[num].comp = true;
    compListArray.unshift(listArray[num]);
    // num番目から1つ配列を消す
    listArray.splice(num,1);

    setLocalStorage("todo",listArray);
    setLocalStorage("compTodo",compListArray);

    // 画面切り替え
    showTask();
  });
}

// 円グラフをスクロールしてから表示
function graphScroll(){
  // スクロール毎にイベントが発火
  $(window).scroll(function(){
    var scr_count = $(document).scrollTop();
    if(scr_count > 200 && weekGraphScroll === false){
      showWeekTime();
      weekGraph();
      $("#container").css({visibility:"visible"});
      //　フラグで制御
      weekGraphScroll = true;
    }
  })
}

function setEvent(){
  reload();
  graphScroll();
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
  console.log(timerStartTime);
  // もし未完了なら
  if(aTask.comp !== null){
    $listEl = $("<li><div class='list-item'><span class=m-comp-btn></span><p class='m-list-txt'>"
              + aTask.task
              + "</p><span class='m-timer-btn'></span><span class='m-fav-btn'></span></div></li>");
    // 星済みだったら
    if(aTask.fav === true){
      $listEl.find(".m-fav-btn").addClass("is-active");
    }
  }
  // 科目ごとの色分け
  subjectColor(aTask.subject);
}

function subjectColor(aTarget){
  // 科目ごとの色分け
  var sbj = aTarget;
  var listColor = null;
  switch(sbj){
      case "国語":
          listColor = "#00CCC6";
          break;
      case "数学":
          listColor = "#F5A623";
          break;
      case "英語":
          listColor = "#BA78FF";
          break;
      default:
          listColor = "gray";
          break;
  }
  $listEl.css({borderLeft:"3px solid " + listColor})
}

// liの各機能をいっぺんに実装
function addListFunction(){
  favBtn($listEl);
  showEdit($listEl);
  showComp($listEl);
  showTimer($listEl);
  // timerBtn($listEl);
}

// ======================================================================
                                //メニュー画面
// ======================================================================

function tabListClick(aTarget){
  //全部isactiveリセット
  $(".l-task-tab-list > li").removeClass("is-active");
  aTarget.addClass("is-active");
}

function menuListClick(aTarget){
  //全部isactiveリセット
  $(".l-menu-list > li").removeClass("is-active");
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
  $menu.css({display:"none"});
  $logo.css({display:"none"});
  $comp.css({display:"none"});
  $addList.css({display:"block"});
  $backBtn.css({display:"none"});
  $cancelBtn.css({display:"block"});
  $headerTitle.text("タスクの新規作成");
  $header.css({background:"#fff"});
  // 最初からフォーカスを当ててくれる
  $addListInput.focus();
}

// ------------- li生成 -----------

function addListEl(){
  var listArray = getLocalStorage("todo",listArray);
  // インプット要素を取得してulにliを追加する
  var $inputText = $addListInput.val();
  var $inputSbject = $("select.m-add-subject").val();

  var newList = {
    task:$inputText,
    comp:false,
    fav:false,
    subject:$inputSbject,
    study:null,
    compTime:null,
    timerStartTime:0,
    timerStudyTime:0,
  };
  createListEl(newList);
  addListFunction($listEl);
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

  aTarget.on("click",function(){
    $(".input-field col s12 > label").addClass("active");
    var listArray = getLocalStorage("todo",listArray);
    num = aTarget.index(); //liのthis番目取得
    console.log(num);

    $task.css({display:"none"});
    $menu.css({display:"none"});
    $taskTab.css({display:"none"});
    $study.css({display:"none"});
    $logo.css({display:"none"});
    $comp.css({display:"none"});
    $edit.css({display:"block"});
    $backBtn.css({display:"block"});
    $cancelBtn.css({display:"none"});
    $header.css({background:"#fff"});
    $headerTitle.text("編集");

    // liのテキストを最初から表示させる
    var $inputText = aTarget.find(".m-list-txt").text();
    $editInputText.val($inputText);


    currentTime = listArray[num].timerStudyTime;

    // 追加する時間
    var appendHour = currentTime / (1000 * 60 * 60) | 0; // 1/1000秒x60秒x60分
    var appendMinute = currentTime % (1000 * 60 * 60) / (1000 * 60) | 0; // 時間で割った余りを割る
    var appendSecond = currentTime  % (1000 * 60) / 1000 | 0; // 分で割った余りを割る

    // 1けただったら「0」を足す ex. 1 → 01
    appendHour = appendHour < 10 ? "0" + appendHour : appendHour;
    appendMinute = appendMinute < 10 ? "0" + appendMinute : appendMinute;
    appendSecond = appendSecond < 10 ? "0" + appendSecond : appendSecond;

    // 時間をHTMLに記述する
    console.log(appendHour);
    $editHour.text(appendHour);
    $editSecond.text(appendSecond);
    $editMinute.text(appendMinute);

  });
}

// 編集ボタンを押したら
function doneEdit(){
  $("select.m-edit-subject").prop("selected",false);
  // listArray[num].subjectで切り替え
  // 選んだやつをeqで指定してselectedをtrueにする
  // 科目のvalueを数字にしてあげると楽かも
  $('select').material_select();
  var listArray = getLocalStorage("todo",listArray);
  var $inputTxt = $editInputText.val();
  var $inputSbject = $("select.m-edit-subject").val();
  console.log($inputSbject);

  // 編集した内容を新しいオブジェクトとして生成し、元あった場所と置き換える
  function createNewTodo(num,arrayNum,isFav){
    var newTodo = {
      task:$inputTxt,
      comp:false,
      fav:isFav,
      time:null,
      subject:$inputSbject,
      study:null,
      compTime:null,
      timerStartTime:0,
      timerStudyTime:0,
    };
    createListEl(newTodo);
    console.log($inputSbject);
    // 元々あったliと新しいliを置き換える
    $outputArea.find("li").eq(num).replaceWith($listEl);
    addListFunction($listEl);
    listArray[num].fav = isFav;
  }

  // 全てのタスク一覧だったら
  if (menuStatus === false){
    // もしnum番目のふぁぼがactiveだったら
    if ($outputArea.find("li").eq(num).find(".m-fav-btn").hasClass("is-active")){
      createNewTodo(num,num,true);
      $outputArea.find("li").eq(num).find(".m-fav").addClass("is-active");
    } else {
      createNewTodo(num,num,false);
      $outputArea.find("li").eq(num).find(".m-fav").removeClass("is-active");
    }
    // ローカルストレージの編集
    listArray[num].task = $inputTxt;
    listArray[num].subject = $inputSbject;
    setLocalStorage("todo",listArray);
  }
  // もし重要なタスク一覧だったら
  else {
    var favCounter = 0;
    for(var cnt=0; cnt<listArray.length; cnt++){
      if(listArray[cnt].fav === true){
        if(favCounter === num){
          break;
        }
        favCounter++;
      }
    }
    if ($outputArea.find("li").eq(num).find(".m-fav-btn").hasClass("is-active")){
      createNewTodo(num,num,true);
      $outputArea.find("li").eq(num).find(".m-fav").addClass("is-active");
    } else {
      $outputArea.find("li").eq(num).remove();
      listArray[cnt].fav = false;
      }
      // ローカルストレージの編集
      listArray[cnt].task = $inputTxt;
      listArray[cnt].subject = $inputSbject;
      setLocalStorage("todo",listArray);
    }
  // 画面切り替え
  showTask();
}

// ======================================================================
                            // 完了画面
// ======================================================================

function showComp(aTarget){
  aTarget.find(".m-comp-btn").on("click",function(evt){
    evt.stopPropagation(); //liへのイベント伝播禁止
    var listArray = getLocalStorage("todo",listArray);
    $task.css({display:"none"});
    $menu.css({display:"none"});
    $taskTab.css({display:"none"});
    $study.css({display:"none"});
    $edit.css({display:"none"});
    $logo.css({display:"none"});
    $comp.css({display:"block"});
    $backBtn.css({display:"block"});
    $cancelBtn.css({display:"none"});
    $header.css({display:"none"});
    $headerTitle.text("");
  });
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
                            // お気に入りボタン
// ======================================================================

function favBtn(aTarget) {
  aTarget.find(".m-fav-btn").on("click",function(evt){
    evt.stopPropagation(); //liへのイベント伝播禁止
    num = $(this).parent().parent().index(); //liのthis番目
    $(this).toggleClass("is-active"); //isactiveなければつける
    var listArray = getLocalStorage("todo",listArray);

    // 全てのタスクのとき
    if(menuStatus === false){
      if ($(this).hasClass("is-active")){ //もしisactiveがあったら
        listArray[num].fav = true;
      }
      else {
        listArray[num].fav = false;
        $(this).removeClass("is-active");
      }
    }

    // 重要なタスク一覧の時
    else {
      aTarget.slideUp(120, "linear",function(){
        aTarget.remove();
      })
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
      listArray[cnt].fav = false;
      $(this).removeClass("is-active");
    }
    setLocalStorage("todo",listArray);
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
    $logo.css({display:"none"});
    $comp.css({display:"none"});
    $compEdit.css({display:"block"});
    $backBtn.css({display:"block"});
    $cancelBtn.css({display:"none"});
    $header.css({background:"#fff"});
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
  $logo.css({display:"none"});
  $backBtn.css({display:"none"});
  $cancelBtn.css({display:"none"});
  $menu.css({display:"block"});
  $study.css({display:"block"});
  $header.css({background:"#fff"});
  $headerTitle.text("勉強時間");

  var compListArray = getLocalStorage("compTodo",compListArray);
  var studyAllTimes = 0;
  var studyJapaneseTime = 0;
  var studyAllJapaneseTimes = 0;
  var studyMathTime = 0;
  var studyAllMathTimes = 0;
  var studyEnglishTime = 0;
  var studyAllEnglishTimes = 0;
  var studyTodayTime = 0;
  var studyTodayAllTimes = 0;

  // 全ての勉強時間（分）（数値）
  for(var cnt=0; cnt<compListArray.length; cnt++){
    studyTime = Number(compListArray[cnt].study);
    studyAllTimes += studyTime;
  }
  console.log("全ての勉強時間は " + studyAllTimes);

  // 国語の勉強時間（分）（数値）
  for(var cnt=0; cnt<compListArray.length; cnt++){
    if(compListArray[cnt].subject === "国語"){
      studyJapaneseTime = Number(compListArray[cnt].study);
      studyAllJapaneseTimes += studyJapaneseTime;
    }
  }
  console.log("全ての国語の勉強時間は " + studyAllJapaneseTimes);

  // 数学の勉強時間（分）（数値）
  for(var cnt=0; cnt<compListArray.length; cnt++){
    if(compListArray[cnt].subject === "数学"){
      studyMathTime = Number(compListArray[cnt].study);
      studyAllMathTimes += studyMathTime;
    }
  }
  console.log("全ての数学の勉強時間は " + studyAllMathTimes);

  // 英語の勉強時間（分）（数値）
  for(var cnt=0; cnt<compListArray.length; cnt++){
    if(compListArray[cnt].subject === "英語"){
      studyEnglishTime = Number(compListArray[cnt].study);
      studyAllEnglishTimes += studyEnglishTime;
    }
  }
  console.log("全ての英語の勉強時間は " + studyAllEnglishTimes);
}

// ======================================================================
                            // 本日の勉強時間
// ======================================================================

var totalTime = 0;
var totalJapaneseTime = 0;
var totalMathTime = 0;
var totalEnglishTime = 0;
var totalUnsetTime = 0;
var studyClickTime = 0;
var today = null;
var year = null;
var month = null;
var date = null;
var week = null;
var startDay = null;
var endDay = null;
var startTime = null;
var endTime = null;
clickMenuStudy();

function clickMenuStudy(){
  $menuStudy.on("click",function(evt){
    today = new Date();
    year = today.getFullYear();
    month = today.getMonth();
    date = today.getDate();
    week = today.getDay();
    menuListClick($(this));
    showStudy();
    showTodayTime();
    showWeekTime();
    weekGraph();
    doughnutChart();
  });
}

function showTodayTime(){
  var compListArray = getLocalStorage("compTodo",compListArray);
  startDay = new Date(year, month, date, 0, 0, 0);
  endDay = new Date(year, month, date, 23, 59, 59);
  startTime = startDay.getTime();
  endTime = endDay.getTime();
  for(var cnt=0;cnt<compListArray.length;cnt++){
    // もし勉強完了した時間がその日の0:00-23:59だったら
    if(compListArray[cnt].compTime >= startTime && compListArray[cnt].compTime <= endTime){
      // 全ての勉強時間
      totalTime += compListArray[cnt].study;

      // 科目別勉強時間
      if(compListArray[cnt].subject === "国語"){
        totalJapaneseTime += compListArray[cnt].study;
      } else if (compListArray[cnt].subject === "英語"){
        totalEnglishTime += compListArray[cnt].study;
      } else if (compListArray[cnt].subject === "数学"){
        totalMathTime += compListArray[cnt].study;
      } else {
        totalUnsetTime += compListArray[cnt].study;
      }
    }
      todayTotalTime = totalTime;
      todayJapaneseTime = totalJapaneseTime;
      todayEnglishTime = totalEnglishTime;
      todayMathTime = totalMathTime;
      todayUnsetTime = totalUnsetTime;
  }
  return totalTime;
}

// ======================================================================
                            // 今週の勉強時間
// ======================================================================

var totalWeekTime = 0;
var SunTotalTime = null;
var SunJapaneseTime = null;
var SunEnglishTime = null;
var SunMathTime = null;
var SunUnsetTime = null;

var MonTotalTime = null;
var MonJapaneseTime = null;
var MonEnglishTime = null;
var MonMathTime = null;
var MonUnsetTime = null;

var TueTotalTime = null;
var TueJapaneseTime = null;
var TueEnglishTime = null;
var TueMathTime = null;
var TueUnsetTime = null;

var WedTotalTime = null;
var WedJapaneseTime = null;
var WedEnglishTime = null;
var WedMathTime = null;
var WedUnsetTime = null;

var ThuTotalTime = null;
var ThuJapaneseTime = null;
var ThuEnglishTime = null;
var ThuMathTime = null;
var ThuUnsetTime = null;

var FriTotalTime = null;
var FriJapaneseTime = null;
var FriEnglishTime = null;
var FriMathTime = null;
var FriUnsetTime = null;

var SatTotalTime = null;
var SatJapaneseTime = null;
var SatEnglishTime = null;
var SatMathTime = null;
var SatUnsetTime = null;

var todayTotalTime = null;
var todayJapaneseTime = null;
var todayEnglishTime = null;
var todayMathTime = null;
var toDayUnsetTime = null;


// var FevDate =...;
// 月ごとのマックスの日数
var maxDate = [31,28,31,30,31,30,31,31,30,31,30,31];
var weekStartDay = null;
var weekEndDay = null;
var startDay = null;
var startMonth = null;
var startYaer = null;


function showWeekTime(){
  // 曜日の数字分引いてから7足した分までの1日分の勉強時間を出してあげる＝7日分

  // startDayは通常0になる
  startDay = date - week;
  startMonth = month;
  startYaer = year;
  weekStartDay = new Date(startYaer, startMonth, startDay, 0, 0, 0);
  // startDayがマイナスになるとき＝もし月をまたぐ場合
  if(startDay <= 0){
    // maxDate[現在の月-1]が0以上かどうか（1月かどうか）→1月なら年もまたぐ
    if(maxDate[startMonth]<=0){
      // もし年をまたぐ場合は年-1して12月からカウントを始める
      startYaer = year - 1;
      startMonth = 12;
    }
    // 開始日は先月の最大日数からstartDayの絶対値を引いた数（startDayは負の値）
    startDay = maxDate[startMonth] + startDay;
  }
  getWeekStudyTime();
}

function getWeekStudyTime(){
  var compListArray = getLocalStorage("compTodo",compListArray);
  StartDay = new Date(startYaer, startMonth, startDay, 0, 0, 0);
  startTime = StartDay.getTime();
  console.log("週の始まりは  " + new Date(startTime));
  console.log("週の終わりは  " + new Date(startTime + 86400000*6));

// 開始日から7日分取得する
    for(var dayCnt=0;dayCnt<=6;dayCnt++){
      startTime = startTime + 86400000;
      endTime = startTime + 86400000; //24時間
      totalTime = 0;
      totalJapaneseTime = 0;
      totalEnglishTime = 0;
      totalMathTime = 0;
      totalUnsetTime = 0;
      console.log(new Date(startTime));
      console.log(new Date(endTime));
      for(var cnt=0;cnt<compListArray.length;cnt++){
        // もし勉強完了した時間がその日の0:00-23:59だったら
        if(compListArray[cnt].compTime >= startTime && compListArray[cnt].compTime < endTime){
          // 全ての勉強時間
          totalTime += compListArray[cnt].study;

          // 科目別勉強時間
          if(compListArray[cnt].subject === "国語"){
            totalJapaneseTime += compListArray[cnt].study;
          } else if (compListArray[cnt].subject === "英語"){
            totalEnglishTime += compListArray[cnt].study;
          } else if (compListArray[cnt].subject === "数学"){
            totalMathTime += compListArray[cnt].study;
          } else {
            totalUnsetTime += compListArray[cnt].study;
          }
        }
      }

      // １週間分の勉強時間
      if(dayCnt === 0){
        SunTotalTime = totalTime;
        SunJapaneseTime = totalJapaneseTime;
        SunEnglishTime = totalEnglishTime;
        SunMathTime = totalMathTime;
        SunUnsetTime = totalUnsetTime;
      } else if (dayCnt === 1) {
        MonTotalTime = totalTime;
        MonJapaneseTime = totalJapaneseTime;
        MonEnglishTime = totalEnglishTime;
        MonMathTime = totalMathTime;
        MOnUnsetTime = totalUnsetTime;
      } else if (dayCnt === 2) {
        TueTotalTime = totalTime;
        TueJapaneseTime = totalJapaneseTime;
        TueEnglishTime = totalEnglishTime;
        TueMathTime = totalMathTime;
        TueUnsetTime = totalUnsetTime;
      } else if (dayCnt === 3) {
        WedTotalTime = totalTime;
        WedJapaneseTime = totalJapaneseTime;
        WedEnglishTime = totalEnglishTime;
        WedMathTime = totalMathTime;
        WedUnsetTime = totalUnsetTime;
      } else if (dayCnt === 4) {
        ThuTotalTime = totalTime;
        ThuJapaneseTime = totalJapaneseTime;
        ThuEnglishTime = totalEnglishTime;
        ThuMathTime = totalMathTime;
        ThuUnsetTime = totalUnsetTime;
      } else if (dayCnt === 5) {
        FriTotalTime = totalTime;
        FriJapaneseTime = totalJapaneseTime;
        FriEnglishTime = totalEnglishTime;
        FriMathTime = totalMathTime;
        FriUnsetTime = totalUnsetTime;
      } else if (dayCnt === 6) {
        SatTotalTime = totalTime;
        SatJapaneseTime = totalJapaneseTime;
        SatEnglishTime = totalEnglishTime;
        SatMathTime = totalMathTime;
        SatUnsetTime = totalUnsetTime;
      }
    }
}

function weekGraph(){
  $('#container').highcharts({
      chart: {
          type: 'column',
          events: {
              afterPrint : function(evt) {
                  alert();
              }
          }
      },
      title: {
          text: 'Stacked column chart'
      },
      xAxis: {
          max: 6,
          categories: ['日','月', '火', '水', '木', '金','土']
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Total fruit consumption'
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
              }
          }
      },
      legend: {
          //ジャンルの場所
          // align: 'right',
          // x: -30,
          // verticalAlign: 'top',
          // y: 25,
          // floating: true,
          // backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
          // borderColor: '#CCC',
          // borderWidth: 1,
          // shadow: false
      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              pointWidth: 10,
              // dataLabels: {
              //     enabled: true,
              //     color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
              //     style: {
              //         // textShadow: '0 0 3px black'
              //         textShadow: false
              //     }
              // }
          }
      },
      series: [{
          name: '国語',
          data: [
          SunJapaneseTime,
          MonJapaneseTime,
          TueJapaneseTime,
          WedJapaneseTime,
          ThuJapaneseTime,
          FriJapaneseTime,
          SatJapaneseTime,
          ]
      }, {
          name: '英語',
          data: [
          SunEnglishTime,
          MonEnglishTime,
          TueEnglishTime,
          WedEnglishTime,
          ThuEnglishTime,
          FriEnglishTime,
          SatEnglishTime,
          ]
      }, {
          name: '数学',
          data: [
          SunMathTime,
          MonMathTime,
          TueMathTime,
          WedMathTime,
          ThuMathTime,
          FriMathTime,
          SatMathTime,
          ]
      },{
          name: '未設定',
          data: [
          SunUnsetTime,
          MonUnsetTime,
          TueUnsetTime,
          WedUnsetTime,
          ThuUnsetTime,
          FriUnsetTime,
          SatUnsetTime,
          ]
      },
      ]
  });

  $(".highcharts-axis").remove();
  $(".highcharts-tracker rect").css({strokeWidth:"0"});
  $(".highcharts-button").remove();
  $(".highcharts-series-0 rect").css({fill:"#00CCC6"});
  $(".highcharts-series-1 rect").css({fill:"#BA78FF"});
  $(".highcharts-series-2 rect").css({fill:"#F5A623"});
  $(".highcharts-series-3 rect").css({fill:"#ccc"});
  $(".highcharts-legend-item rect").eq(0).css({fill:"#00CCC6"});
  $(".highcharts-legend-item rect").eq(1).css({fill:"#BA78FF"});
  $(".highcharts-legend-item rect").eq(2).css({fill:"#F5A623"});
  $(".highcharts-legend-item rect").eq(3).css({fill:"#ccc"});
  $(".highcharts-container").css({position:"relative"});
  $(".highcharts-container").css({left:"-5%"});
  $(".highcharts-grid > path").css({stroke:"#ddd"}).css({opacity:0.4});
}

function doughnutChart(){
  if(circleGraphFrag === false){
    var compListArray = getLocalStorage("compTodo",compListArray);

    if(compListArray[0] === undefined){
      $("#doughnutChart").find("p").text("今日はまだ勉強してません");
    } else {
      $("#doughnutChart").find("p").text("");
      $("#doughnutChart").drawDoughnutChart([
          { title: "国語", value : todayJapaneseTime,  color: "#00CCC6" },
          { title: "英語", value:  todayEnglishTime,   color: "#BA78FF" },
          { title: "数学", value:  todayMathTime,   color: "#F5A623" },
          { title: "未設定", value:  todayUnsetTime,   color: "#ccc" },
      ]);
    }
  }
  circleGraphFrag = true;
}

// ======================================================================
                            // タイマー
// ======================================================================

// スタートを押してないときは0
// 押したらスタート時刻をgettime（=timerStartTime）して
// タイマーが市っぱなしのときは再度表示したときに現在時刻-スタート時刻する
// そこからカウントアップ
// startTimeはストップボタンを押すたびにリセットされて
// studyTimeに時間が反映される。
// 再度スタートするときはstudyTimeを表示を繰り返す

function showTimer(aTarget){
  aTarget.find(".m-timer-btn").on("click",function(evt){
    evt.stopPropagation(); //liへのイベント伝播禁止
    num = $(this).parent().parent().index(); //liのthis番目
    $task.css({display:"none"});
    $menu.css({display:"none"});
    $taskTab.css({display:"none"});
    $study.css({display:"none"});
    $logo.css({display:"none"});
    $comp.css({display:"none"});
    $cancelBtn.css({display:"block"});
    $timer.css({display:"block"});
    $header.css({background:"#fff"});
    $headerTitle.text("タイマー");
    setTimer();
  });
}

// showTimerで何度もクリックイベントを呼んでしまっている＝2回目以降にスタートストップボタンがバグる

    var method = {
        // ストップウォッチを動かす
        timer : function() {

            // このメソッドを呼び出す間隔（単位は1/1000秒）
            var interval = 1000;

            // 一定間隔ごとに以下を実行する
            time = setInterval(function() {

              if (timerStartTime !== 0) { // ← stopという変数がfalseであればと云う意味
                // カウントアップ

                // 前回までのタイマー時間に1秒ずつ足していく
                currentTime += timerStudyTime;
                currentTime += interval;

                // 追加する時間
                var appendHour = currentTime / (1000 * 60 * 60) | 0; // 1/1000秒x60秒x60分
                var appendMinute = currentTime % (1000 * 60 * 60) / (1000 * 60) | 0; // 時間で割った余りを割る
                var appendSecond = currentTime  % (1000 * 60) / 1000 | 0; // 分で割った余りを割る

                // 1けただったら「0」を足す ex. 1 → 01
                appendHour = appendHour < 10 ? "0" + appendHour : appendHour;
                appendMinute = appendMinute < 10 ? "0" + appendMinute : appendMinute;
                appendSecond = appendSecond < 10 ? "0" + appendSecond : appendSecond;

                // 時間をHTMLに記述する
                hour.html(appendHour);
                minute.html(appendMinute);
                second.html(appendSecond);
                }

            }, interval); // ←これが間隔

      }, // ここまで timer

        // スタート/ストップボタン
        startAndStop : function() {
        // ストップであればスタート、スタートであればストップ
          if(timerStartTime === 0){

            // スタートするときにtimeを発火
            var listArray = getLocalStorage("todo",listArray);
            // タイマー開始時間
            timerStartTime = (new Date()).getTime();
            console.log(timerStartTime);

            // 配列のthis番目のタイマー開始時間に代入
            listArray[num].timerStartTime = timerStartTime;
            setLocalStorage("todo",listArray);
            $outputArea.find("li").eq(num).find(".m-timer-btn").css({'opacity':1});
            $("#start").text("ストップ");
            console.log('hoge');
          } else {
            nowTime = (new Date()).getTime();
            // 勉強時間 = 現在時刻 - タイマー開始時刻
            timerStudyTime = nowTime - timerStartTime;

            // タイマー開始時刻をリセットする
            timerStartTime = 0;

            var listArray = getLocalStorage("todo",listArray);
            // 配列のthis番目にタイマーの勉強時間と今までのタイマー勉強時間をたす
            listArray[num].timerStudyTime = timerStudyTime + listArray[num].timerStudyTime;
            listArray[num].timerStartTime = timerStartTime;
            setLocalStorage("todo",listArray);
            console.log(num);
            $outputArea.find("li").eq(num).find(".m-timer-btn").css({'opacity':0.1});

            $("#start").text("スタート");
            console.log('fuga');
          }
        },

        // リセットするメソッド
        reset : function() {
          // リセット（経過時間を0に戻す）
          currentTime = 0;
          // 時間をHTMLに記述する
          hour.html("00");
          minute.html("00");
          second.html("00");

          listArray[num].timerStudyTime = 0;
          listArray[num].timerStartTime = 0;
          setLocalStorage("todo",listArray);
        },

        // 初期化メソッドはいらなくなる
        init : function() {

          // ストップウォッチを動かすメソッドを呼び出す
          method.timer();
          // スタート/リセットボタンをクリックしたらstartAndStopを呼び出す
          btnStart.click(method.startAndStop);
          // リセットボタンをクリックしたらresetを呼び出す
          btnReset.click(method.reset);
        }
    };
method.init();










  function setTimer(){
    var listArray = getLocalStorage("todo",listArray);
    currentTime = listArray[num].timerStudyTime;
    // タイマーが動いてるとき
    if(timerStartTime !== 0){
      nowTime = (new Date()).getTime();
      currentTime = currentTime + (nowTime - listArray[num].timerStartTime);
    }

    // 追加する時間
    var appendHour = currentTime / (1000 * 60 * 60) | 0; // 1/1000秒x60秒x60分
    var appendMinute = currentTime % (1000 * 60 * 60) / (1000 * 60) | 0; // 時間で割った余りを割る
    var appendSecond = currentTime  % (1000 * 60) / 1000 | 0; // 分で割った余りを割る

    // 1けただったら「0」を足す ex. 1 → 01
    appendHour = appendHour < 10 ? "0" + appendHour : appendHour;
    appendMinute = appendMinute < 10 ? "0" + appendMinute : appendMinute;
    appendSecond = appendSecond < 10 ? "0" + appendSecond : appendSecond;

    // 時間をHTMLに記述する
    hour.html(appendHour);
    minute.html(appendMinute);
    second.html(appendSecond);

    // メソッド
    // method = {
    //     // ストップウォッチを動かす
    //     timer : function() {

    //         // このメソッドを呼び出す間隔（単位は1/1000秒）
    //         var interval = 1000;

    //         // 一定間隔ごとに以下を実行する
    //         time = setInterval(function() {

    //           if (timerStartTime !== 0) { // ← stopという変数がfalseであればと云う意味
    //             // カウントアップ

    //             // 前回までのタイマー時間に1秒ずつ足していく
    //             currentTime += timerStudyTime;
    //             currentTime += interval;

    //             // 追加する時間
    //             var appendHour = currentTime / (1000 * 60 * 60) | 0; // 1/1000秒x60秒x60分
    //             var appendMinute = currentTime % (1000 * 60 * 60) / (1000 * 60) | 0; // 時間で割った余りを割る
    //             var appendSecond = currentTime  % (1000 * 60) / 1000 | 0; // 分で割った余りを割る

    //             // 1けただったら「0」を足す ex. 1 → 01
    //             appendHour = appendHour < 10 ? "0" + appendHour : appendHour;
    //             appendMinute = appendMinute < 10 ? "0" + appendMinute : appendMinute;
    //             appendSecond = appendSecond < 10 ? "0" + appendSecond : appendSecond;

    //             // 時間をHTMLに記述する
    //             hour.html(appendHour);
    //             minute.html(appendMinute);
    //             second.html(appendSecond);
    //             }

    //         }, interval); // ←これが間隔

    //   }, // ここまで timer

    //     // スタート/ストップボタン
    //     startAndStop : function() {
    //     // ストップであればスタート、スタートであればストップ
    //       if(timerStartTime === 0){
    //         var listArray = getLocalStorage("todo",listArray);
    //         // タイマー開始時間
    //         timerStartTime = (new Date()).getTime();
    //         console.log(timerStartTime);

    //         // 配列のthis番目のタイマー開始時間に代入
    //         listArray[num].timerStartTime = timerStartTime;
    //         setLocalStorage("todo",listArray);
    //         $outputArea.find("li").eq(num).find(".m-timer-btn").css({'opacity':1});
    //         $("#start").text("ストップ");
    //         console.log('hoge');
    //       } else {
    //         nowTime = (new Date()).getTime();
    //         // 勉強時間 = 現在時刻 - タイマー開始時刻
    //         timerStudyTime = nowTime - timerStartTime;

    //         // タイマー開始時刻をリセットする
    //         timerStartTime = 0;

    //         var listArray = getLocalStorage("todo",listArray);
    //         // 配列のthis番目にタイマーの勉強時間と今までのタイマー勉強時間をたす
    //         listArray[num].timerStudyTime = timerStudyTime + listArray[num].timerStudyTime;
    //         listArray[num].timerStartTime = timerStartTime;
    //         setLocalStorage("todo",listArray);
    //         console.log(num);
    //         $outputArea.find("li").eq(num).find(".m-timer-btn").css({'opacity':0.1});

    //         $("#start").text("スタート");
    //         console.log('fuga');
    //       }
    //     },

    //     // リセットするメソッド
    //     reset : function() {
    //       // リセット（経過時間を0に戻す）
    //       currentTime = 0;
    //       // 時間をHTMLに記述する
    //       hour.html("00");
    //       minute.html("00");
    //       second.html("00");

    //       listArray[num].timerStudyTime = 0;
    //       listArray[num].timerStartTime = 0;
    //       setLocalStorage("todo",listArray);
    //     },

    //     // 初期化メソッド
    //     init : function() {

    //       // ストップウォッチを動かすメソッドを呼び出す
    //       method.timer();
    //       // スタート/リセットボタンをクリックしたらstartAndStopを呼び出す
    //       btnStart.click(method.startAndStop);
    //       // リセットボタンをクリックしたらresetを呼び出す
    //       btnReset.click(method.reset);
    //     }
    // };

    // ページを読み込んだ時に初期化メソッドを呼び出す（実行する）
  }

// ======================================================================
                            // タイマーアイコン
// ======================================================================

// function timerBtn(aTarget) {
//   console.log(aTarget);
//   var listArray = getLocalStorage("todo",listArray);
//   num = aTarget.index(); //liのthis番目
//   console.log(num);
//   if(listArray[num].timerStartTime !== 0){
//     aTarget.find(".m-timer-btn").css({'opacity':1});
//   }
// }

}); //html実行後
})(); //即時関数
