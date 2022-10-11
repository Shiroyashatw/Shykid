// 當設定的 指定class btn 點擊時 觸發 訊息框事件
// $("body").append(newDialog("title","content",cancelBtn,okBtn))
// 若沒有要使用 cancelBtn 要放 null  
// 結束後要記得使用 show();
$(".memberBtn").click(function () {
    // 在<body>加入newDialog html。
    $("body").append(
        newDialog("會員需知",
            `<div class="list">
            <ol>
                <li>一、會員不得任意張貼非相關內容，如色情、賭博等違法內容，經檢舉查核屬實無條件停權帳號</li>
                <li>二、本網不鼓勵寵物購買，若後續雙方有任何交易糾紛，本網不負相關責任</li>
                <li>三、有領養意願，可聯絡張貼相關單位/人士，但盡量避免單獨前往或去人煙稀少的地方，以保證安全</li>
            </ol>
        </div>`,
            null,
            "確定")
    );

    show();
});

$(".showDialogBtn2").click(function () {
    // 在<body>加入newDialog html。
    $("body").append(
        newDialog("標題2",
            `<div>我們可以為每個button設定一個click事件，並重複利用newDialog()的模板。</div>
                  <div>程式碼稍微有點多，但設計思路很單純，慢慢看一定看得懂。</div>
                  <div>祝學習順利！</div>`,
            "取消",
            "確定")
    );

    show();
});

// 依序放入 (標題,內容,取消按鈕,ok按鈕)
function newDialog(title, content, cancelBtn, okBtn) {
    // 取消按鈕內容
    var cancelBtnHtml = "";

    // 確認按鈕內容
    var okBtnHtml = "";

    // 若cancelBtn或okBtn不為null，則加入button模板，否則維持宣告時的空字串。
    if (cancelBtn != null) {
        cancelBtnHtml = `<div class="cancelBtn">${cancelBtn}</div>`;
    }
    if (okBtn != null) {
        okBtnHtml = `<div class="okBtn">${okBtn}</div>`;
    }

    // 依序放入對應內容至div
    return `<div class="dialog">
              <div class="title">${title}</div>
              <div class="content">${content}</div>
              <div class="buttons">			
                ${cancelBtnHtml}
                ${okBtnHtml}
              </div>
            </div>`;
}

function show() {
    // 叫出Modal遮住背景。
    showModal();

    // 播放滑動視窗動畫。
    fadeInAnimation();

    // 監聽cancelBtn跟okBtn的click事件。
    bindListener();
}

function showModal() {
    $("body").prepend(`<div class="modal"></div>`); // 在<body>的最前面加入modal，遮住畫面背景。    
}

function fadeInAnimation() {
    $(".dialog").animate({
        opacity: '1',
        top: '150px' // 決定對話框要滑到哪個位置停止。		   
    }, 550);
}

function bindListener() {
    // 注意okBtn跟cancelBtn中間的逗號，這是表示html tag的class只要有okBtn或cancelBtn其中一個，就會被選中。  
    $(".okBtn, .cancelBtn").click(function () {
        $(".dialog").animate({
            opacity: '0',
            top: '-150px' // 需與CSS設定的起始位置相同，以保證下次彈出視窗的效果相同。			   
        }, 350, function () {
            // 此區塊為callback function，會在動畫結束時被呼叫。
            $(".modal").remove(); // 移除modal。
            $(".dialog").remove(); // 移除dialog。
        });
    });
}