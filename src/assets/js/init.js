// Sassファイルの読み込み
import '../scss/style.scss';

(function () {
  // メディアクエリ
  var mediaFlg;
  function media() {
    var width = $(window).width();
    if (width > 1024) {
      mediaFlg = 'pc';
    } else if (width > 600) {
      mediaFlg = 'tablet';
    } else if (width <= 600) {
      mediaFlg = 'sp';
    }
  }

  $(window).on('resize', function () {
    media();
  });
  media();

  function inview(target, timing) {
    if (target.length > 0) {
      var winScroll = $(window).scrollTop();
      var winHeight = $(window).height();
      var scrollPos = winScroll + winHeight * timing;

      if (target.offset().top < scrollPos) {
        target.addClass('is-show');
      } else {
        //target.removeClass('is-show');
      }
    }
  }

  // inviewトリガー
  $(window).on('load scroll', function () {
    $('.anm').each(function () {
      inview($(this), 0.7);
    });
  });

  function gnav(toggleElm, contentElm, bgElm) {
    var bgElmClass = bgElm.split('.')[1];
    $(toggleElm).toggleClass('is-gnav-active');
    $('html').toggleClass('is-gnav-open');
    if ($(toggleElm).hasClass('is-gnav-active')) {
      $(contentElm).after('<div class="' + bgElmClass + '"></div>');
    } else {
      $(bgElm).remove();
    }
    $(contentElm).toggleClass('is-gnav-active');
    function gnavToggle() {
      $(contentElm).toggleClass('is-gnav-start');
    }
    setTimeout(gnavToggle, 100);
  }

  // グローバルナビのクリックイベント
  var gnavToggleClass = '.js-gnav-toggle'; //トグルボタン
  var gnavContentClass = '.l-gnav'; //ハンバーガーコンテンツ
  var gnavBgClass = '.l-gnav-bg'; //背景
  $(gnavToggleClass).on('click', function () {
    gnav(gnavToggleClass, gnavContentClass, gnavBgClass);
  });
  $('body').on('click', gnavBgClass, function () {
    gnav(gnavToggleClass, gnavContentClass, gnavBgClass);
  });

  $('.btn-toggle-search').on('click', function () {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('is-active');
  });

  // pagetop
  let topBtn = $('.pagetop');
  $(window).on('scroll', function () {
    var showPosition = 0;
    if (mediaFlg == 'sp') {
      showPosition = 800;
    } else {
      showPosition = 1500;
    }
    let now = $(window).scrollTop();
    if (now > showPosition) {
      topBtn.stop().addClass('is-active');
    } else {
      topBtn.stop().removeClass('is-active');
    }
  });
  topBtn.on('click', function () {
    $('html,body').animate(
      {
        scrollTop: $('body').offset().top,
      },
      600
    );
  });

  // page scroll
  $('a[href*=\\#]:not([href=\\#])').on('click', function () {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      // スクロール処理を無効にしたいアンカーをセット
      if ($(this).hasClass('mdl')) {
        return;
      }
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate(
          {
            scrollTop: target.offset().top,
          },
          600
        );
        return false;
      }
    }
  });

  // modal

  $('.mdl').on('click', function () {
    // モーダルを立ち上げる要素を取得
    var modalTarget = $(this).attr('href');
    // モーダルコンテンツの高さとウィンドウの高さを取得して比較
    var modalTargetHeight = $(modalTarget).outerHeight();
    var windowHeight = $(window).height();
    if (modalTargetHeight > windowHeight) {
      $(modalTarget).height('90%');
    } else {
      $(modalTarget).height(modalTargetHeight);
    }
    // モーダル表示用class
    $(modalTarget).addClass('modal-show');
    // bodyに背景と閉じるボタンを追加する＆スクロール禁止用のclassを追加
    $('body').append('<div class="modal-bg"></div><div class="modal-close"></div>').addClass('modal-active');
  });
  $(document).on('click', '.modal-close,.modal-bg', function () {
    // 背景もしくは閉じるボタンがクリックされたら要素を消す＆モーダル表示用classを外す
    $('.modal-show').removeClass('modal-show');
    $('body').removeClass('modal-active');
    $('.modal-bg,.modal-close').remove();
  });
})();
