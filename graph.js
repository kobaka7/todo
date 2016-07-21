
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
  $compEdit = $(".l-comp-edit")

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
  $compEdit.css({display:"none"});
  $comp.css({display:"none"});
  $task.css({display:"block"});
  $taskTab.css({display:"block"});
  $menu.css({display:"block"});
  $logo.css({display:"block"});
  $header.css({display:"block"});
  $backBtn.css({display:"none"});
  $cancelBtn.css({display:"none"});
  $headerTitle.text("");
  $header
  .css({background:"url(img/bg-01.jpg) 0 no-repeat"})
  .css({backgroundSize:"110%"})
  .css({backgroundPositionY:"-140px"});

  $("#container2").css({visibility:"hidden"});
  circleScroll = false;
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
    if(scr_count > 100 && circleScroll === false){
      circleGraph();
      $("#container2").css({visibility:"visible"});
      //　フラグで制御
      circleScroll = true;
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
  // もし未完了なら
  if(aTask.comp !== null){
    $listEl = $("<li><span class=m-comp-btn>完了</span><div class='list-item'><p class='m-list-txt'>"
              + aTask.task
              + "</p><span class='m-fav-btn'></span></div></li>");
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


  console.log($outputArea.find("li"));
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

// ============================== ↑重複（リファクタリングする） ===================================


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
  console.log(studyAllTimes);

  // 国語の勉強時間（分）（数値）
  for(var cnt=0; cnt<compListArray.length; cnt++){
    if(compListArray[cnt].subject === "国語"){
      studyJapaneseTime = Number(compListArray[cnt].study);
      studyAllJapaneseTimes += studyJapaneseTime;
    }
  }
  console.log(studyAllJapaneseTimes);

  // 数学の勉強時間（分）（数値）
  for(var cnt=0; cnt<compListArray.length; cnt++){
    if(compListArray[cnt].subject === "数学"){
      studyMathTime = Number(compListArray[cnt].study);
      studyAllMathTimes += studyMathTime;
    }
  }
  console.log(studyAllMathTimes);

  // 英語の勉強時間（分）（数値）
  for(var cnt=0; cnt<compListArray.length; cnt++){
    if(compListArray[cnt].subject === "英語"){
      studyEnglishTime = Number(compListArray[cnt].study);
      studyAllEnglishTimes += studyEnglishTime;
    }
  }
  console.log(studyAllEnglishTimes);

  // 本日の勉強時間（分）（数値）
  var now = new Date();
  var getTimeNow = now.getTime();
  for(var cnt=0; cnt<compListArray.length; cnt++){
    // もし完了してから24時間以内だったら（現在時刻 - 完了時刻 < 24時間）
    if(getTimeNow - compListArray[cnt].compDate < 86400000){
      // 全ての勉強時間（分）（数値）
      for(var cnt=0; cnt<compListArray.length; cnt++){
        studyTodayTime = Number(compListArray[cnt].study);
        studyTodayAllTimes += studyTodayTime;
      }
      console.log(studyTodayAllTimes);
      alert();
    }
  }
}

var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var date = today.getDate();
var week = today.getDay();
var compListArray = getLocalStorage("compTodo",compListArray);
var totalTime = 0;
var studyClickTime = 0;
clickMenuStudy();

function clickMenuStudy(){
  $menuStudy.on("click",function(evt){
    menuListClick($(this));
    showStudy();
    graph();
    doughnutChart();
    getDate(year,month,date);
  });
}

function getDate(year,month,date){
  var startDay = new Date(year, month, date, 0, 0, 0);
  var endDay = new Date(year, month, date, 23, 59, 59);
  var startTime = startDay.getTime();
  var endTime = endDay.getTime();

  // もし勉強完了した時間がその日の0:00-23:59だったら
  for(var cnt=0;compListArray[cnt].study >= startTime && compListArray[cnt].study <= endTime;cnt++){
    totalTime += compListArray[cnt].study;
    return totalTime;
  }
}
console.log(totalTime);// 本日分

// １週間
// 曜日の数字分引いてから7足した分までの1日分の勉強時間を出してあげる＝7日分
// 月をまたぐ場合は月-1をして日付を1ずつ引いていく
// *1）その値が0以下だったら前の月のMAX日数を足してあげる＝その日付になる
// 月-1をした時に0になったら12を代入してそこから*1と同じことをする
// 関数作って月の最大日数を取得
// うるう年も関数で判定する

function graph(){
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
        categories: ['月', '火', '水', '木', '金',"土","日"]
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
        data: [5, 3, 4, 7, 2, 1, 4]
    }, {
        name: '数学',
        data: [2, 2, 3, 2, 1, 1, 1]
    }, {
        name: '理科',
        data: [3, 4, 4, 2, 5, 1, 5]
    },
    ]
});

$(".highcharts-axis").remove();
$(".highcharts-tracker rect").css({strokeWidth:"0"});
$(".highcharts-button").remove();
$(".highcharts-series-0 rect").css({fill:"#f00"});
$(".highcharts-legend-item rect").eq(0).css({fill:"#f00"});
$(".highcharts-container").css({position:"relative"});
$(".highcharts-container").css({left:"-5%"});
$(".highcharts-grid > path").css({stroke:"#ddd"}).css({opacity:0.4});
}

function circleGraph(){
    // Build the chart
    $('#container2').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares January, 2015 to May, 2015'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Microsoft Internet Explorer',
                y: 56.33
            }, {
                name: 'Chrome',
                y: 24.03,
                // sliced: true,
                // selected: true
            }, {
                name: 'Firefox',
                y: 10.38
            }, {
                name: 'Safari',
                y: 4.77
            }, {
                name: 'Opera',
                y: 0.91
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2
            }]
        }]
    });
}

function doughnutChart(){
    $("#doughnutChart").drawDoughnutChart([
        { title: "Tokyo",         value : 100,  color: "#00CCC6" },
        { title: "San Francisco", value:  80,   color: "#F3E601" },
        { title: "New York",      value:  70,   color: "#CD025B" },
    ]);
}


