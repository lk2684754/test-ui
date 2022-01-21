var page = 1;
var totalPage = 6;
var windowHeight = $(window).height();
window.onload = function () {
  pageInit();
  nearInit();
  scrollInit();

  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 100);
};

function pageInit() {
  $('.main div').css('transition', 'all 0.3s linear');
  $('.scrollHiddenBox').css('height', windowHeight * totalPage + 'px');
  $('.context > div').css('height', windowHeight + 'px');

  $('.scrollBtn .up').on('click', function () {
    goPage(page - 1 >= 0 ? page - 1 : page);
  });
  $('.scrollBtn .down').on('click', function () {
    goPage(page + 1 <= totalPage ? page + 1 : totalPage);
  });

  $('.createAccount').on('click', function () {
    window.open('https://wallet.testnet.near.org/create');
  });
  $('.loginAccount').on('click', function () {
    nearLogin();
  });
  $('.github').on('click', function () {
    window.open('https://github.com/lk2684753/sd-cloud');
  });
  $('.discord').on('click', function () {
    window.open('https://discord.gg/vB5Y4ZR2st');
  });
}

var wallet = null;
var isLogin = false;
function nearInit() {
  var WalletConnection = window.nearApi.WalletConnection;
  var keyStores = window.nearApi.keyStores;
  var connect = window.nearApi.connect;

  const config = {
    networkId: 'testnet',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
  };
  try {
    connect(config).then(function (near) {
      wallet = new WalletConnection(near);
      isLogin = wallet.isSignedIn();
      var username = wallet.getAccountId();
      if (isLogin) {
        $('.loginAccount').css('display', 'none');
        $('.header .btnBox .noBg').css('display', 'block');
        $('.header .btnBox .noBg a').html(username);
      } else {
        $('.loginAccount').css('display', 'block');
        $('.header .btnBox .noBg').css('display', 'none');
      }
    });
  } catch (error) {
    console.log('[ error ]-232', error);
  }
}
function nearLogin() {
  wallet.requestSignIn('example-contract.testnet', 'demo');
}

function scrollInit() {
  var ticking = false;
  $(window).on('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

var animeLeft = 50;
function onScroll() {
  var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
  page = Math.ceil((scrollTop + 1) / windowHeight);
  var scrollRatio = Math.floor((scrollTop / windowHeight) * 100);
  if (page > 1) {
    $('.scrollBtn .up').attr('src', './images/a5.png');
  } else {
    $('.scrollBtn .up').attr('src', './images/a3.png');
  }
  if (page === totalPage) {
    $('.scrollBtn .down').attr('src', './images/a8.png');
  } else {
    $('.scrollBtn .down').attr('src', './images/a2.png');
  }
  if (page === 1) {
    var pageRatio = getPageRatio(page, scrollRatio);
    $('.base .bgLeftSlice').css(
      'width',
      `${pageRatio > 50 ? 100 - pageRatio : 50}%`,
    );
    $('.base .BigTitle').css({
      transform: `rotateX(${pageRatio > 90 ? 90 : pageRatio}deg)`,
      opacity: `${diffTo(pageRatio, 0.1, 0)}`,
    });
    animeLeft = pageRatio < 50 ? 50 : pageRatio > 75 ? 75 : pageRatio;
    $('.base .anime').css('left', `${animeLeft}%`);
    $('.onePage .features').css('transform', `translateX(-${pageRatio}%)`);
    $('.onePage .quick').css('transform', `translateX(${pageRatio}%)`);

    $('.twoPage').css({
      transform: `translateY(${100 - pageRatio}%)`,
      opacity: `${diffTo(pageRatio, 0, 1)}`,
    });
    $('.twoPage .oneBox').css({
      transform: `translateY(${diffTo(pageRatio, 100, 0)}%)`,
      opacity: `${diffTo(pageRatio, 0, 1)}`,
    });
  }
  if (page === 2) {
    var pageRatio = getPageRatio(page, scrollRatio, 0);
    $('.twoPage .topLine').css('marginTop', `${diffTo(pageRatio, 128, 61)}px`);
    $('.twoPage .oneBox .number').css({
      opacity: `${diffTo(pageRatio, 1, 0.8)}`,
    });
    $('.twoPage .oneBox .title').css({
      fontSize: `${diffTo(pageRatio, 42, 21)}px`,
      lineHeight: `${diffTo(pageRatio, 59, 29)}px`,
      opacity: `${diffTo(pageRatio, 1, 0.8)}`,
    });
    $('.twoPage .oneBox .intro').css({
      opacity: `${diffTo(pageRatio, 1, 0.6)}`,
    });
    $('.twoPage .twoBox').css({
      transform: `translateY(${diffTo(pageRatio, 100, 0)}%)`,
      opacity: `${diffTo(pageRatio, 0, 1)}`,
    });
  }
  if (page === 3) {
    var pageRatio = getPageRatio(page, scrollRatio, 0);
    $('.twoPage .twoBox .number').css({
      opacity: `${diffTo(pageRatio, 1, 0.8)}`,
    });
    $('.twoPage .twoBox .title').css({
      fontSize: `${diffTo(pageRatio, 42, 21)}px`,
      lineHeight: `${diffTo(pageRatio, 59, 29)}px`,
      opacity: `${diffTo(pageRatio, 1, 0.8)}`,
    });
    $('.twoPage .twoBox .intro').css({
      opacity: `${diffTo(pageRatio, 1, 0.6)}`,
    });
    $('.twoPage .threeBox').css({
      transform: `translateY(${diffTo(pageRatio, 100, 0)}%)`,
      opacity: `${diffTo(pageRatio, 0, 1)}`,
    });
  }
  if (page === 4) {
    var pageRatio = getPageRatio(page, scrollRatio, 0);
    $('.base .anime').css('left', `${diffTo(pageRatio, animeLeft, 130)}%`);
    $('.twoPage .threeBox .number').css({
      opacity: `${diffTo(pageRatio, 1, 0.8)}`,
    });
    $('.twoPage .threeBox .title').css({
      fontSize: `${diffTo(pageRatio, 42, 21)}px`,
      lineHeight: `${diffTo(pageRatio, 59, 29)}px`,
      opacity: `${diffTo(pageRatio, 1, 0.8)}`,
    });
    $('.twoPage .threeBox .intro').css({
      opacity: `${diffTo(pageRatio, 1, 0.6)}`,
    });
    $('.twoPage').css({
      transform: `translateY(${diffTo(pageRatio, 0, -100)}%)`,
    });
    $('.threePage').css({
      transform: `translateY(${diffTo(pageRatio, 100, 0)}%)`,
      opacity: `${diffTo(pageRatio, 0, 1)}`,
    });
    $('.threePage .boxList .box').css({
      transform: `scale(${diffTo(pageRatio, 0.3, 1)})`,
    });
  }
  if (page === 5) {
    var pageRatio = getPageRatio(page, scrollRatio, 0);
    $('.threePage').css({
      transform: `translateY(${diffTo(pageRatio, 0, -100)}%)`,
    });
    $('.fourPage').css({
      transform: `translateY(${diffTo(pageRatio, 100, 0)}%)`,
      opacity: `${diffTo(pageRatio, 0, 1)}`,
    });
    $('.fourPage .leftBox').css({
      transform: `rotateY(${pageRatio < 10 ? 90 : 100 - pageRatio}deg)`,
      opacity: `${diffTo(pageRatio, 0, 1)}`,
    });
  }
}

var goPageAnimeComplate = true;
function goPage(targetPage) {
  if (!goPageAnimeComplate) return;
  goPageAnimeComplate = false;
  var targetScrollTop = (targetPage - 1) * windowHeight;
  var baseTop = 0;
  if (page < targetPage) {
    baseTop = (page - 1) * windowHeight;
  } else {
    baseTop = document.body.scrollTop + document.documentElement.scrollTop;
  }
  var obj = {
    scrollTop: baseTop,
  };
  anime({
    targets: obj,
    scrollTop: targetScrollTop,
    round: 1,
    easing: 'linear',
    duration: 300,
    update: function () {
      window.scrollTo(0, obj.scrollTop);
    },
    complete: function () {
      goPageAnimeComplate = true;
    },
  });
}

function getPageRatio(page, scrollRatio, startPoint = 20) {
  var pageRatio = 0;
  var base = (page - 1) * 100;
  var endPoint = 80;
  if (scrollRatio <= base + startPoint) {
    pageRatio = 0;
  } else if (scrollRatio >= base + endPoint) {
    pageRatio = 100;
  } else if (scrollRatio <= page * 100) {
    pageRatio = scrollRatio - base;
  }
  return pageRatio;
}

function diffTo(pageRatio, old, now) {
  return old - (old - now) * (pageRatio / 100);
}
