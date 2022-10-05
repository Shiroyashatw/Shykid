$(".showDialogBtn").click(function () {
    // 在<body>加入newDialog html。
    $("body").append(
        newDialog("標題",
            `<div>這裡可以放入任何內容，無論是純文字或html版型都可以。</div>
                  <div>此範例的CSS看起來略微複雜，但大部份只是樣式設定，可以隨個人喜好調整、增加、刪除。</div>
                  <div>與動畫效果相關性較高的部份都有加上註解，希望能幫助到你。</div>`,
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

function newDialog(title, content, cancelBtn, okBtn) {
    var cancelBtnHtml = "";
    var okBtnHtml = "";

    // 若cancelBtn或okBtn不為null，則加入button模板，否則維持宣告時的空字串。
    if (cancelBtn != null) {
        cancelBtnHtml = `<div class="cancelBtn">${cancelBtn}</div>`;
    }
    if (okBtn != null) {
        okBtnHtml = `<div class="okBtn">${okBtn}</div>`;
    }

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
        top: '50px' // 決定對話框要滑到哪個位置停止。		   
    }, 550);
}

function bindListener() {
    // 注意okBtn跟cancelBtn中間的逗號，這是表示html tag的class只要有okBtn或cancelBtn其中一個，就會被選中。  
    $(".okBtn, .cancelBtn").click(function () {
        $(".dialog").animate({
            opacity: '0',
            top: '-50px' // 需與CSS設定的起始位置相同，以保證下次彈出視窗的效果相同。			   
        }, 350, function () {
            // 此區塊為callback function，會在動畫結束時被呼叫。
            $(".modal").remove(); // 移除modal。
            $(".dialog").remove(); // 移除dialog。
        });
    });
}