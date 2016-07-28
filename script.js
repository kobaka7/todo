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
var $compCancelBtn = null;
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
var $studyTab = null;
var $studyTabToday = null;
var $studyTabWeek = null;
var $studyTabAll = null;
var $taskNoneImg = null;
var $todayNoneImg = null;
var $allNoneImg = null;
var $weekNoneImg = null;
var selectedSubject = null;
var num = 0;
var studyTimes = 0;
var time = 0; //タイマーの中
var menuStatus = false;
var weekGraphScroll = false;
var circleGraphFrag = false;
var allCircleGraphFrag = false;
var allCircleGraphTabFrag = false;
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
var totalTime = 0;
var totalJapaneseTime = 0;
var totalMathTime = 0;
var totalEnglishTime = 0;
var totalUnsetTime = 0;
var studyClickTime = 0;
var btnFlug = 0;
var today = null;
var year = null;
var month = null;
var date = null;
var week = null;
var startDay = null;
var endDay = null;
var startTime = null;
var endTime = null;
// var FevDate =...;
// 月ごとのマックスの日数
var maxDate = [31,28,31,30,31,30,31,31,30,31,30,31];
var weekStartDay = null;
var weekEndDay = null;
var startDay = null;
var startMonth = null;
var startYaer = null;

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
// タイマーで表示されている勉強時間
var timerStudyTime = 0;
var nowTime = 0;
var studyAllTimes = 0;
var studyJapaneseTime = 0;
var studyAllJapaneseTimes = 0;
var studyMathTime = 0;
var studyAllMathTimes = 0;
var studyEnglishTime = 0;
var studyAllEnglishTimes = 0;
var studyUnsetTime = 0;
var studyAllUnsetTimes = 0;

setObj();
setBtn();
setEvent();

// ======================================================================
                                //初期化系
// ======================================================================

// モーダル
$('[data-remodal-id=modal2]').remodal({
  modifier: 'with-red-theme'
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
  $comp = $(".l-comp");
  $compBtn = $(".m-comp-btn");
  $compDoneBtn = $(".m-comp-done-btn");
  $compCancelBtn =$(".m-comp-cancel-btn");
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
  $timerBtn = $(".m-timer-btn");
  $taskNoneImg = $(".m-task-none");
  $todayNoneImg = $(".m-study-today-none");
  $allNoneImg = $(".m-study-all-none");
  $weekNoneImg = $(".m-study-week-none");

  // 新規作成画面
  $addList = $(".l-add-list");
  $addListInput = $(".m-add-list-input");
  $addCancelBtn = $(".m-add-list-cancel-btn");
  $doneAddBtn = $(".m-add-list-btn");

  // 編集画面
  $edit = $(".l-edit");
  $editmode = $(".m-edit-edit");
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
  $studyTab = $(".l-study-tab");
  $studyTabToday = $(".m-study-tab-today");
  $studyTabWeek = $(".m-study-tab-week");
  $studyTabAll = $(".m-study-tab-all");
  $todayMode = $(".l-study-today");
  $weekMode = $("#container");
  $allMode = $(".l-study-all");
  $studyTimeNoneImg = $(".m-study-time-none");
}

// ボタン操作まとめ
function showTask(){
  var listArray = getLocalStorage("todo",listArray);
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
  $studyTab.css({display:"none"});
  $taskNoneImg.css({display:"none"});
  $headerTitle.text("");
  $header.css({backgroundColor:"#007AFF"});

  // 非表示にする
  $("#doughnutChart").find("svg").remove();
  $("#allDoughnutChart").find("svg").remove();
  $(".doughnutSummary").find("p").remove();
  circleGraphFrag = false;
  allCircleGraphFrag = false;

  // メニューアクティブ操作
  $(".l-menu-list > li").removeClass("is-active");
  $(".l-menu-list-task").addClass("is-active");

  // 表示するものがない場合
  // if($(".m-output-area > li").length === 0){
  //   $taskNoneImg.css({display:"block"});
  // }
  if(listArray.length === 0){
    $taskNoneImg.css({display:"block"});
  }
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
  $compCancelBtn.on("click",function(evt){
    showTask();
  });
  $timerStratBtn.on("click",function(evt){
    $(this).css({display:"none"});
    $timerStopBtn.css({display:"block"});
  });
  $timerStopBtn.on("click",function(evt){
    $(this).css({display:"none"});
    $timerStratBtn.css({display:"block"});
  });
  $studyTabToday.on("click",function(evt){
    $(".l-study-tab-list > li").removeClass("is-active");
    $(this).addClass("is-active");
    $todayMode.css({display:"block"});
    $weekMode.css({display:"none"});
    $allMode.css({display:"none"});
    circleGraphFrag = false;
    allCircleGraphTabFrag = false;
  });
  $studyTabWeek.on("click",function(evt){
    $(".l-study-tab-list > li").removeClass("is-active");
    $(this).addClass("is-active");
    $todayMode.css({display:"none"});
    $weekMode.css({display:"block"});
    $allMode.css({display:"none"});
    showWeekTime();
    weekGraph();
    allCircleGraphTabFrag = false;
  });
  $studyTabAll.on("click",function(evt){
    $(".l-study-tab-list > li").removeClass("is-active");
    $(this).addClass("is-active");
    $todayMode.css({display:"none"});
    $weekMode.css({display:"none"});
    $allMode.css({display:"block"});
    showAllTime();
    allDoughnutChart();
    allCircleGraphTabFrag = true;
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

function setEvent(){
  reload();
  clickMenuStudy();
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
    $listEl = $("<li><div class='list-item'><a href='#modal2' class='m-comp-btn'></a><p class='m-list-txt'>" + aTask.task + "</p><span class='m-timer-btn'></span><span class='m-fav-btn'></span></div></li>");
    // 星済みだったら
    if(aTask.fav === true){
      $listEl.find(".m-fav-btn").addClass("is-active");
    }
    if (aTask.timerStartTime !== 0){
      $listEl.find(".m-timer-btn").css({'opacity':1});
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
  $listEl.css({borderLeft:"3px solid " + listColor});
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
  $studyTab.css({display:"none"});
  $addList.css({display:"block"});
  $backBtn.css({display:"none"});
  $cancelBtn.css({display:"block"});
  $headerTitle.text("タスクの新規作成");
  $header.css({background:"#fff"});

  // 科目色初期化
  selectedSubject = $('select.m-add-subject').val();
  changeSubject();
  // 科目クリックするたびに色変わる
  $('select.m-add-subject').on('change', function(evt){
    selectedSubject = $(this.options[this.selectedIndex]).text();
    changeSubject();
  });
}

function changeSubject(){
  if(selectedSubject === "国語"){
    $(".m-subject-label").addClass("m-subject-label-jp");
    $(".m-subject-label").removeClass("m-subject-label-english");
    $(".m-subject-label").removeClass("m-subject-label-math");
  } else if (selectedSubject === "英語"){
    $(".m-subject-label").removeClass("m-subject-label-jp");
    $(".m-subject-label").addClass("m-subject-label-english");
    $(".m-subject-label").removeClass("m-subject-label-math");
  } else if (selectedSubject === "数学"){
    $(".m-subject-label").removeClass("m-subject-label-jp");
    $(".m-subject-label").removeClass("m-subject-label-english");
    $(".m-subject-label").addClass("m-subject-label-math");
  } else {
    $(".m-subject-label").removeClass("m-subject-label-jp");
    $(".m-subject-label").removeClass("m-subject-label-english");
    $(".m-subject-label").removeClass("m-subject-label-math");
  }
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
    btnFlug:0,
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
    var listArray = getLocalStorage("todo",listArray);
    num = aTarget.index(); //liのthis番目取得
    currentTime = 0;
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

    // 科目の初期値を取得する
    var subjectNum = 0;
    switch(listArray[num].subject){
      case "国語":
          subjectNum = 1;
          break;
      case "英語":
          subjectNum = 2;
          break;
      case "数学":
          subjectNum = 3;
          break;
      default:
          subjectNum = 0;
          break;
    }
    $("select.m-edit-subject").find("option").eq(subjectNum + 1).prop("selected",true);
    selectedSubject = $('select.m-edit-subject').val();
    changeSubject();

    // 科目クリックするたびに変わる
    $('select.m-edit-subject').on('change', function(evt){
      selectedSubject = $(this.options[this.selectedIndex]).text();
      changeSubject();
    });
    // 勉強時間を表示する
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
    console.log(appendMinute);
    console.log(appendSecond);
    $editHour.text(appendHour);
    $editMinute.text(appendMinute);
    $editSecond.text(appendSecond);
  });
}

// 編集ボタンを押したら
function doneEdit(){
  $("select.m-edit-subject").prop("selected",false);
  var listArray = getLocalStorage("todo",listArray);
  var $inputTxt = $editInputText.val();
  var $inputSbject = $("select.m-edit-subject").val();
  console.log($inputSbject);

  // 編集した内容を新しいオブジェクトとして生成し、元あった場所と置き換える
  function createNewTodo(num,arrayNum,isFav,isBtnFlug){
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
      btnFlug:isBtnFlug,
    };
    createListEl(newTodo);
    console.log($inputSbject);
    // 元々あったliと新しいliを置き換える
    $outputArea.find("li").eq(num).replaceWith($listEl);
    addListFunction($listEl);
    listArray[num].fav = isFav;
    listArray[num].btnFlug = isBtnFlug;
  }

  // 全てのタスク一覧だったら
  if (menuStatus === false){
    // もしnum番目のふぁぼがactiveだったら
    if ($outputArea.find("li").eq(num).find(".m-fav-btn").hasClass("is-active")){
      // かつタイマー判定
      if(listArray[num].btnFlug === 0){
        createNewTodo(num,num,true,0);
      } else {
        createNewTodo(num,num,true,1);
      }
    } else {
      // かつタイマー判定
      if(listArray[num].btnFlug === 0){
        createNewTodo(num,num,false,0);
      } else {
        createNewTodo(num,num,false,1);
      }
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
      // かつタイマー判定
      if(listArray[num].btnFlug === 0){
        createNewTodo(num,num,true,0);
      } else {
        createNewTodo(num,num,true,1);
      }
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
    num = aTarget.index();
    // 完了一覧画面のモーダル禁止
    if($(this).hasClass('is-active') === true){
      evt.preventDefault();
    }
    evt.stopPropagation(); //liへのイベント伝播禁止

    var listArray = getLocalStorage("todo",listArray);
    // console.log(num);
    var studytime = listArray[num].timerStudyTime;
    console.log(studytime);
    // 追加する時間
    var appendHour = studytime / (1000 * 60 * 60) | 0; // 1/1000秒x60秒x60分
    var appendMinute = studytime % (1000 * 60 * 60) / (1000 * 60) | 0; // 時間で割った余りを割る
    console.log("勉強時間は" + appendHour);
    console.log("勉強分は" + appendMinute);

    // 最初からタイマーの時間を表示させる
    $("select.m-comp-time-hours option:selected").prop("selected",false);
    $("select.m-comp-time-minutes option:selected").prop("selected",false);
    $("select.m-comp-time-hours").find("option").eq(appendHour + 1).prop("selected",true);
    $("select.m-comp-time-minutes").find("option").eq(appendMinute + 1).prop("selected",true);
  });
}

// ======================================================================
                                //重要なタスク一覧
// ======================================================================

function ShowFavList(){
  clickMenu(true);
  var listArray = getLocalStorage("todo",listArray);
  var favLength = 0;
  $taskNoneImg.css({display:"none"});
  if (listArray !== null){
    //配列の数だけliを生成する
    for(var cnt=0; cnt < listArray.length; cnt++){
      if(listArray[cnt].fav === true) {
        createListEl(listArray[cnt]);
        addListFunction();
        $listEl.appendTo($outputArea);
        favLength++;
      }
      // css操作
      $listEl.find($favBtn).addClass("is-active");
    }
  }
  if(favLength === 0){
    $taskNoneImg.css({display:"block"});
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
      });
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
  $taskNoneImg.css({display:"none"});
  $outputArea.empty();
  var compListArray = getLocalStorage("compTodo",compListArray);
  if (compListArray !== null){
    //配列の数だけliを生成する
    for(var cnt=0; cnt < compListArray.length; cnt++){
      createListEl(compListArray[cnt]);
      addListFunction();
      $listEl.appendTo($outputArea);

      $listEl.find(".m-list-txt").addClass("is-active");
      showCompEdit($listEl);

    // ボタン非表示
    $(".m-fav-btn").css({display:"none"});
    $(".m-timer-btn").css({display:"none"});

    // 完了アイコンにチェックつける
    $(".m-comp-btn").addClass("is-active");
    }
  }
  if (compListArray.length === 0){
    $taskNoneImg.css({display:"block"});
  }
}
// ======================================================================
                                // 完了編集画面
// ======================================================================

function showCompEdit(aTarget){
  aTarget.on("click",function(evt){
  $task.css({display:"none"});

    num = $(this).index(); //liのthis番目取得
    $task.css({display:"none"});
    $taskTab.css({display:"none"});
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
    $editCompInput.text($inputText);

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
    doughnutChart();
    $studyTab.css({display:"block"});

    // 戻ってきたときにもし「合計」が表示されていたら最初から合計表示
    if(allCircleGraphTabFrag === true){
      showAllTime();
      allDoughnutChart();
    }
  });
}

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
  $header.css({background:"#007AFF"});
  $headerTitle.text("勉強時間");
}

// ======================================================================
                            // 全ての勉強時間
// ======================================================================

function showAllTime(){
  var compListArray = getLocalStorage("compTodo",compListArray);

  // 二回目のクリック以降にダブらないようリセット
  studyTime = 0;
  studyJapaneseTime = 0;
  studyEnglishTime = 0;
  studyMathTime = 0;
  studyUnsetTime = 0;
  studyAllTimes = 0;
  studyAllJapaneseTimes = 0;
  studyAllEnglishTimes = 0;
  studyAllMathTimes = 0;
  studyAllUnsetTimes = 0;

  for(var cnt=0; cnt<compListArray.length; cnt++){
    studyTime = Number(compListArray[cnt].study);
    studyAllTimes += studyTime;
    console.log(compListArray[cnt].study);
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

    // 英語の勉強時間（分）（数値）
  for(var cnt=0; cnt<compListArray.length; cnt++){
    if(compListArray[cnt].subject === "未設定" || compListArray[cnt].subject === null){
      studyUnsetTime = Number(compListArray[cnt].study);
      studyAllUnsetTimes += studyUnsetTime;
    }
  }
  studyAllJapaneseTimes = Math.floor(studyAllJapaneseTimes/60*10)/10;
  studyAllEnglishTimes = Math.floor(studyAllEnglishTimes/60*10)/10;
  studyAllMathTimes = Math.floor(studyAllMathTimes/60*10)/10;
  studyAllUnsetTimes = Math.floor(studyAllUnsetTimes/60*10)/10;
}

function allDoughnutChart(){
  if(allCircleGraphFrag === false){
    var compListArray = getLocalStorage("compTodo",compListArray);
    var studyAllTimes = 0;
    $todayNoneImg.css({display:"none"});
    $weekNoneImg.css({display:"none"});
    $allNoneImg.css({display:"none"});

    // 全ての勉強時間（分）（数値）
    for(var cnt=0; cnt<compListArray.length; cnt++){
      studyTime = Number(compListArray[cnt].study);
      studyAllTimes += studyTime;
    }

    // もしまだひとつもタスクを完了していないか、勉強時間が0だったら
    if(compListArray[0] === undefined || studyAllTimes === 0){
      $allNoneImg.css({display:"block"});
    } else {
      $("#allDoughnutChart").find("p").text("");
      console.log("合計の国語の勉強時間は" + studyJapaneseTime);
      $("#allDoughnutChart").drawDoughnutChart([
          { title: "国語", value : studyAllJapaneseTimes, color: "#00CCC6" },
          { title: "英語", value: studyAllEnglishTimes, color: "#BA78FF" },
          { title: "数学", value: studyAllMathTimes, color: "#F5A623" },
          { title: "未設定", value: studyAllUnsetTimes, color: "#ccc" },
      ]);
      // テキスト表示
      $(".m-study-all-jp").text("国語" + studyAllJapaneseTimes);
      $(".m-study-all-english").text("英語" + studyAllEnglishTimes);
      $(".m-study-all-math").text("数学" + studyAllMathTimes);
      $(".m-study-all-unset").text("未設定" + studyAllUnsetTimes);
    }
  }
  allCircleGraphFrag = true;
}

// ======================================================================
                            // 本日の勉強時間
// ======================================================================

function showTodayTime(){
  var compListArray = getLocalStorage("compTodo",compListArray);
  startDay = new Date(year, month, date, 0, 0, 0);
  endDay = new Date(year, month, date, 23, 59, 59);
  startTime = startDay.getTime();
  endTime = endDay.getTime();

  totalTime = 0;
  todayTotalTime = 0;
  todayJapaneseTime = 0;
  todayEnglishTime = 0;
  todayMathTime = 0;
  todayUnsetTime = 0;
  totalJapaneseTime = 0;
  totalMathTime = 0;
  totalEnglishTime = 0;
  totalUnsetTime = 0;

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
    todayTotalTime = Math.floor(totalTime/60*10)/10;
    todayJapaneseTime = Math.floor(totalJapaneseTime/60*10)/10;
    todayEnglishTime = Math.floor(totalEnglishTime/60*10)/10;
    todayMathTime = Math.floor(totalMathTime/60*10)/10;
    todayUnsetTime = Math.floor(totalUnsetTime/60*10)/10;
  }
}

function doughnutChart(){
  if(circleGraphFrag === false){
    var compListArray = getLocalStorage("compTodo",compListArray);
    var studyAllTimes = 0;
    $todayNoneImg.css({display:"none"});
    $weekNoneImg.css({display:"none"});
    $allNoneImg.css({display:"none"});

  // 本日の合計勉強時間
  for(var cnt=0;cnt<compListArray.length;cnt++){
    if(compListArray[cnt].compTime >= startTime && compListArray[cnt].compTime <= endTime){
      totalTime += compListArray[cnt].study;
    }
    todayTotalTime = totalTime;
  }
    console.log(compListArray[0]);
    // もしまだひとつもタスクを完了していないか、勉強時間が0だったら
    if(compListArray[0] === undefined || todayTotalTime === 0){
      $todayNoneImg.css({display:"block"});
    } else {
      $("#doughnutChart").find("p").text("");
      $("#doughnutChart").drawDoughnutChart([
          { title: "国語", value : todayJapaneseTime,  color: "#00CCC6" },
          { title: "英語", value:  todayEnglishTime,   color: "#BA78FF" },
          { title: "数学", value:  todayMathTime,   color: "#F5A623" },
          { title: "未設定", value:  todayUnsetTime,   color: "#ccc" },
      ]);
    }
    // テキスト表示
    $(".m-study-today-jp").text("国語" + todayJapaneseTime);
    $(".m-study-today-english").text("英語" + todayEnglishTime);
    $(".m-study-today-math").text("数学" + todayMathTime);
    $(".m-study-today-unset").text("未設定" + todayUnsetTime);
  }
  circleGraphFrag = true;
}
// ======================================================================
                            // 今週の勉強時間
// ======================================================================

function showWeekTime(){
  $todayNoneImg.css({display:"none"});
  $weekNoneImg.css({display:"none"});
  $allNoneImg.css({display:"none"});
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
  console.log("今週初めは  " + StartDay);
  console.log("週の始まりは  " + new Date(startTime));
  console.log("週の終わりは  " + new Date(startTime + 86400000*6));

  // 開始日から7日分取得する
  for(var dayCnt=0;dayCnt<=6;dayCnt++){
    console.log("なのか分のはじめ  " + new Date(startTime));
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
    startTime = startTime + 86400000;
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
      MonUnsetTime = totalUnsetTime;
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
  console.log(MonUnsetTime);
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
          text: ''
      },
      xAxis: {
          max: 6,
          categories: ['日','月', '火', '水', '木', '金','土']
      },
      credits: {
          enabled: false
      },
      yAxis: {
          // max: maxVal,
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
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              pointWidth: 10,
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

// タイマー画面に行ったときの初期表示
function setTimer(){
  var listArray = getLocalStorage("todo",listArray);
  currentTime = listArray[num].timerStudyTime;
  // タイマーが動いてるとき
  if(listArray[num].timerStartTime !== 0){
    nowTime = (new Date()).getTime();
    currentTime = currentTime + (nowTime - listArray[num].timerStartTime);
    timer();
  }

  // タイマーが動いてるとき
  if(listArray[num].btnFlug === 1){
    $(".button").addClass("is-active");
    $("#start").text("ストップ");
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
}

// ストップウォッチを動かす
function timer() {
    // このメソッドを呼び出す間隔（単位は1/1000秒）
    var interval = 1000;

    // 一定間隔ごとに以下を実行する
    time = setInterval(function() {
        var listArray = getLocalStorage("todo",listArray);

        // カウントアップ
        // 前回までのタイマー時間に1秒ずつ足していく
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

    }, interval); // ←これが間隔

} // ここまで timer

// スタート/ストップボタン
  $("#start").on("click",function (){
  var listArray = getLocalStorage("todo",listArray);
  // ストップであればスタート、スタートであればストップ
    if(listArray[num].timerStartTime === 0){
      timer();

      // 配列のthis番目のタイマー開始時間に代入
      listArray[num].timerStartTime = (new Date()).getTime();
      listArray[num].btnFlug = 1;
      setLocalStorage("todo",listArray);
      $outputArea.find("li").eq(num).find(".m-timer-btn").css({'opacity':1});
      $(".button").addClass("is-active");
      $("#start").text("ストップ");
    } else {
      nowTime = (new Date()).getTime();
      // 勉強時間 = 現在時刻 - タイマー開始時刻
      timerStudyTime = nowTime - listArray[num].timerStartTime;

      var listArray = getLocalStorage("todo",listArray);
      // 配列のthis番目にタイマーの勉強時間と今までのタイマー勉強時間をたす
      listArray[num].timerStudyTime = timerStudyTime + listArray[num].timerStudyTime;
      // タイマー開始時刻をリセットする
      listArray[num].timerStartTime = 0;
      listArray[num].btnFlug = 0;
      setLocalStorage("todo",listArray);
      $outputArea.find("li").eq(num).find(".m-timer-btn").css({'opacity':0.1});

      clearInterval(time);
      $(".button").removeClass("is-active");
      $("#start").text("スタート");
    }
  });

  $("#reset").on("click",function (){
    var listArray = getLocalStorage("todo",listArray);
    clearInterval(time);
    // リセット（経過時間を0に戻す）
    currentTime = 0;
    // 時間をHTMLに記述する
    hour.html("00");
    minute.html("00");
    second.html("00");
    $outputArea.find("li").eq(num).find(".m-timer-btn").css({'opacity':0.1});

    listArray[num].timerStudyTime = 0;
    listArray[num].timerStartTime = 0;
    listArray[num].btnFlug = 0;
    setLocalStorage("todo",listArray);

    btnFlug = 0;
    $(".button").removeClass("is-active");
    $("#start").text("スタート");
  });

}); //html実行後
})(); //即時関数
