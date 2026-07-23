$(document).ready(function() {
  /* ==========================================
     0. Google Fonts 読み込み
  ========================================== */
  $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Shippori+Mincho:wght@400;500&display=swap">');
  /* ==========================================
     1. 基本・全体スタイル
  ========================================== */
  var baseStyle = {
    'font-family': "'Cormorant Garamond', 'Shippori Mincho', Georgia, serif",
    'font-size': '16px',
    'background-color': '#f4f1ea',
    'color': '#1a1815',
    'letter-spacing': '0.03em',
    'line-height': '1.8'
  };
  $('html, body, .container-fluid, .b24fullcontainer, #b24bookingpage').css(baseStyle);
  /* ==========================================
     2. スマホ背景色を確実に適用
  ========================================== */
  $('.b24fullcontainer-proprow1, .b24fullcontainer-proprow2, .b24fullcontainer-proprow3, .b24fullcontainer-proprow4, .row, .col-xs-12').css('background-color', '#f4f1ea');
  /* ==========================================
     3. ヘッダースライダー
  ========================================== */
  var isMobile = $(window).width() <= 768;
  var sliderHeight = isMobile ? '260px' : '480px';
  $('.fullwidthjumbopropslider .b24-prop-slider .item').css('height', sliderHeight);
  $('.fullwidthjumbopropslider .b24-prop-slider .carousel.slide').css('height', sliderHeight);
  $('.fullwidthjumbopropslider .b24-prop-slider .item img').css({
    'width': '100%',
    'height': sliderHeight,
    'object-fit': 'cover',
    'object-position': 'center'
  });
  /* ドット位置 */
  $('.fullwidthjumbopropslider .carousel-indicators').css({
    'bottom': isMobile ? '80px' : '130px',
    'z-index': '5'
  });
  /* スライダー矢印 */
  $('.carousel-control').css({
    'background': 'none',
    'opacity': '0.7'
  });
  /* ==========================================
     4. スライダーコンテナ全幅化
  ========================================== */
  $('.fullwidthjumbopropslider .b24fullcontainer-proprow1').css({
    'max-width': '100%',
    'padding': '0',
    'margin': '0'
  });
  /* ==========================================
     5. 検索バー
  ========================================== */
  $('.fullwidthjumbopropslider .b24-selector-row').css({
    'width': '100%',
    'max-width': '100%',
    'margin': '0',
    'padding': isMobile ? '12px 16px' : '16px 40px',
    'box-sizing': 'border-box',
    'background-color': 'rgba(244, 241, 234, 0.97)',
    'border': 'none',
    'z-index': '10',
    'position': 'relative'
  });
  /* ==========================================
     6. メインコンテンツエリア
  ========================================== */
  $('.b24fullcontainer').css({
    'width': '100%',
    'margin': '0 auto',
    'padding': isMobile ? '24px 16px' : '40px 24px',
    'box-sizing': 'border-box'
  });
  /* ==========================================
     7. 物件名
  ========================================== */
  $('.at_roomnametext').css({
    'font-family': "'Cormorant Garamond', serif",
    'font-size': isMobile ? '22px' : '28px',
    'font-weight': '400',
    'letter-spacing': '0.12em',
    'color': '#1a1815',
    'margin-bottom': '16px'
  });
  /* ==========================================
     7.5 パネル見出し（お客様情報・予約詳細・物件名等）
  ========================================== */
  $('.panel-heading, legend').css({
    'font-family': "'Cormorant Garamond', 'Shippori Mincho', serif",
    'font-size': '19px',
    'font-weight': '400',
    'letter-spacing': '0.1em',
    'color': '#1a1815',
    'background-color': 'transparent',
    'border-bottom': '1px solid rgba(26, 24, 21, 0.15)',
    'padding': '14px 16px'
  });
  /* フォームのラベル・テーブルの文字を読みやすく */
  $('form td, form th, form label, .control-label').css({
    'font-size': '15px',
    'letter-spacing': '0.05em',
    'line-height': '1.7'
  });
  /* ==========================================
     8. 説明文
  ========================================== */
  $('.at_offerdescription1, .at_propertydescription1').css({
    'font-family': "'Cormorant Garamond', 'Shippori Mincho', serif",
    'font-size': isMobile ? '16px' : '18px',
    'line-height': '2',
    'color': '#2a2722',
    'letter-spacing': '0.05em',
    'padding': '24px 0',
    'border-top': '1px solid rgba(26, 24, 21, 0.12)',
    'margin-top': '16px'
  });
  /* ==========================================
     9. アメニティ
  ========================================== */
  $('.b24-amenity-icon-list').css({
    'font-family': "'Cormorant Garamond', serif",
    'font-size': '15px',
    'letter-spacing': '0.04em',
    'margin-top': '24px',
    'padding-top': '24px',
    'border-top': '1px solid rgba(26, 24, 21, 0.12)'
  });
  /* ==========================================
     10. カレンダー
  ========================================== */
  $('.roomoffercalendarmonth th').css({
    'background-color': '#1a1815',
    'color': '#f4f1ea',
    'font-family': "'Cormorant Garamond', serif",
    'font-size': '13px',
    'letter-spacing': '0.1em',
    'font-weight': '400',
    'padding': '8px 4px'
  });
  $('.roomoffercalendarmonth caption').css({
    'font-family': "'Cormorant Garamond', serif",
    'font-size': '16px',
    'letter-spacing': '0.1em',
    'color': '#1a1815',
    'padding': '12px 0',
    'font-weight': '500'
  });
  $('.dateavail').css({ 'background-color': '#ffffff', 'color': '#1a1815' });
  $('.datenotavail, .datenap').css({ 'background-color': '#ebe5d9', 'color': '#a39e92', 'text-decoration': 'none' });
  /* 選択中の日程: 黒塗りだと「利用不可」に見えるため、白地+枠線の強調に変更 */
  $('.datestay').css({ 'background-color': '#ffffff', 'color': '#1a1815', 'border': '2px solid #1a1815', 'font-weight': '600' });
  $('.datepast').css({ 'background-color': '#f4f1ea', 'color': '#c5bfb4' });
  /* ==========================================
     11. ボタン
     ※at_bookingbut（予約ボタン）・input.button・a.buttonを追加
  ========================================== */
  $('.btn-primary, .btn-info, button[type="submit"], .b24-book-button, .at_bookingbut, input.button, a.button').css({
    'background-color': '#1a1815',
    'border': '1px solid #1a1815',
    'border-radius': '0',
    'font-family': "'Cormorant Garamond', serif",
    'font-size': '15px',
    'letter-spacing': '0.14em',
    'padding': '12px 28px',
    'color': '#f4f1ea'
  });
  $('.btn-primary, .btn-info, .at_bookingbut, input.button').hover(
    function() { $(this).css({ 'background-color': '#7a5c3a', 'border-color': '#7a5c3a' }); },
    function() { $(this).css({ 'background-color': '#1a1815', 'border-color': '#1a1815' }); }
  );
  /* 戻る等のサブボタン: 塗りではなく枠線のセカンダリ表現に */
  $('.btn-default.button').css({
    'background-color': 'transparent',
    'border': '1px solid #1a1815',
    'border-radius': '0',
    'color': '#1a1815',
    'font-family': "'Cormorant Garamond', 'Shippori Mincho', serif",
    'font-size': '14px',
    'letter-spacing': '0.1em',
    'padding': '8px 20px'
  });
  /* Not availableボタンをコンパクトに */
  $('.btn-danger').css({
    'display': 'inline-block',
    'width': 'auto',
    'background-color': '#d9d2c2',
    'border-color': '#d9d2c2',
    'color': '#7a756c',
    'border-radius': '0',
    'font-family': "'Cormorant Garamond', serif",
    'font-size': '13px',
    'letter-spacing': '0.1em',
    'padding': '6px 16px'
  });
  /* ==========================================
     12. リンク
  ========================================== */
  $('a').css('color', '#7a5c3a');
  $('a').hover(
    function() { $(this).css('color', '#1a1815'); },
    function() { $(this).css('color', '#7a5c3a'); }
  );
  /* ==========================================
     13. パネル
  ========================================== */
  $('.panel').css({
    'border': '1px solid rgba(26, 24, 21, 0.12)',
    'border-radius': '0',
    'box-shadow': 'none',
    'background-color': '#ffffff'
  });
  /* ==========================================
     14. フォーム
  ========================================== */
  $('input[type="text"], input[type="email"], textarea').css({
    'border-radius': '0',
    'border': '1px solid rgba(26, 24, 21, 0.2)',
    'font-family': "'Cormorant Garamond', serif",
    'font-size': '16px',
    'color': '#1a1815',
    'background-color': '#ffffff',
    'padding': '10px 14px'
  });
  $('select').css({
    'border-color': 'rgba(26, 24, 21, 0.2)',
    'color': '#1a1815'
  });
  /* ==========================================
     15. フッター
  ========================================== */
  $('footer').css({
    'border-top': '1px solid rgba(26, 24, 21, 0.12)',
    'margin-top': '48px',
    'padding': '24px',
    'font-size': '13px',
    'color': '#7a756c',
    'letter-spacing': '0.08em'
  });
  /* ==========================================
     16. 不要要素の非表示
     ※言語切替（English▼）は残す
  ========================================== */
  /* powered by Beds24のみ非表示 */
  $('a[href*="beds24.com"]').each(function() {
    var text = $(this).text().toLowerCase();
    if (text.indexOf('powered') !== -1 || text.indexOf('beds24') !== -1) {
      $(this).closest('div, p, span').hide();
      $(this).hide();
    }
  });
  /* ==========================================
     17. 空コンテナの非表示
     ※script/style/linkタグしか入っていないコンテナも「空」とみなす
     （残骸スクリプトによる上部の空白帯対策）
  ========================================== */
  function visibleText(el) {
    var clone = $(el).clone();
    clone.find('script, style, link, noscript').remove();
    return clone.text().trim();
  }
  $('.panel').each(function() {
    if (visibleText(this) === '') {
      $(this).closest('.row').hide();
      $(this).hide();
    }
  });
  /* ownerrow11等の連番違いも拾うため属性セレクタで全行を対象にし、
     遅延生成に備えて少し遅れてもう一度実行する */
  function hideEmptyRows() {
    $('[class*="b24fullcontainer-ownerrow"], [class*="b24fullcontainer-proprow"]').each(function() {
      if (visibleText(this) === '' && $(this).find('img, iframe, input, select, table').length === 0) {
        $(this).hide();
      }
    });
    $('.col-xs-12, .col-sm-12, .row').each(function() {
      if (visibleText(this) === '' && $(this).find('img, iframe, input, select, table').length === 0) {
        $(this).hide();
      }
    });
  }
  hideEmptyRows();
  setTimeout(hideEmptyRows, 500);
  /* ==========================================
     17.5 上部言語バー・料金表の体裁
  ========================================== */
  /* 言語バー: グレー帯をベース色に馴染ませる */
  $('.b24fullcontainer-top, .b24fullcontainer-top .container2').css({
    'background-color': '#f4f1ea',
    'border': 'none',
    'padding': '8px 16px'
  });
  /* 料金テーブル（チェックイン/アウト行）を整える */
  $('.b24room table th').css({
    'background-color': 'transparent',
    'color': '#7a756c',
    'font-family': "'Cormorant Garamond', serif",
    'font-size': '13px',
    'font-weight': '400',
    'letter-spacing': '0.1em',
    'border-bottom': '1px solid rgba(26, 24, 21, 0.15)',
    'padding': '8px 10px'
  });
  $('.b24room table td').css({
    'font-size': '14px',
    'padding': '8px 10px',
    'letter-spacing': '0.04em'
  });
  /* ==========================================
     18. テキスト改善
  ========================================== */
  $('a:contains("less details")').text('▲ close');
  $('a:contains("more details")').text('▼ details');
  /* ==========================================
     18.5 予約ボタン下に安心材料（キャンセルポリシー要約）を表示
  ========================================== */
  var $bookBtn = $('.at_bookingbut').first();
  if ($bookBtn.length && $('.b24-reassurance').length === 0) {
    var curLang = $('.b24languagedropdown .dropdown-toggle').text().trim();
    var isEn = curLang.toLowerCase().indexOf('english') !== -1;
    var note = isEn ? 'Free cancellation until 5 days before check-in' : 'チェックイン5日前までキャンセル無料';
    $('<div class="b24-reassurance"></div>').text(note).css({
      'font-size': '13px',
      'color': '#7a756c',
      'letter-spacing': '0.06em',
      'margin-top': '10px',
      'text-align': 'right',
      'max-width': '220px',
      'margin-left': 'auto',
      'line-height': '1.6',
      'clear': 'both'
    }).insertAfter($bookBtn);
  }
  /* ==========================================
     18.6 フッターをスリム化
  ========================================== */
  $('.b24fullcontainer-footer').css({
    'padding': '16px 24px',
    'min-height': '0'
  });
  /* check availability / 空室状況確認 をボタン風に */
  $('a:contains("空室状況確認")').css({
    'display': 'inline-block',
    'border': '1px solid #1a1815',
    'padding': '8px 20px',
    'font-size': '13px',
    'letter-spacing': '0.1em',
    'color': '#1a1815',
    'text-decoration': 'none',
    'margin-top': '8px'
  });
  $('a:contains("check availability")').css({
    'display': 'inline-block',
    'border': '1px solid #1a1815',
    'padding': '8px 20px',
    'font-size': '13px',
    'letter-spacing': '0.1em',
    'color': '#1a1815',
    'text-decoration': 'none',
    'margin-top': '8px'
  });
  /* ==========================================
     19. リサイズ時に再適用
  ========================================== */
  $(window).resize(function() {
    var mobile = $(window).width() <= 768;
    var h = mobile ? '260px' : '480px';
    $('.fullwidthjumbopropslider .b24-prop-slider .item').css('height', h);
    $('.fullwidthjumbopropslider .b24-prop-slider .carousel.slide').css('height', h);
    $('.fullwidthjumbopropslider .b24-prop-slider .item img').css('height', h);
    $('.fullwidthjumbopropslider .carousel-indicators').css('bottom', mobile ? '80px' : '130px');
    $('.fullwidthjumbopropslider .b24-selector-row').css('padding', mobile ? '12px 16px' : '16px 40px');
    $('.b24fullcontainer').css('padding', mobile ? '24px 16px' : '40px 24px');
    $('.at_roomnametext').css('font-size', mobile ? '22px' : '28px');
    $('.at_offerdescription1, .at_propertydescription1').css('font-size', mobile ? '16px' : '18px');
  });
});
