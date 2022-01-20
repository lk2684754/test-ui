let scrollY = 0;
// $(window).on('mousewheel', function (event) {
//   console.log(event.deltaX, event.deltaY, event.deltaFactor);
//   scrollY += event.deltaFactor * event.deltaY;
//   console.log('[ scrollY ]-5', scrollY)
// });
let page = 1;
let nextPage = page + 1;
let totalPage = 4 * 2;
let windowHeight = $(window).height();
window.onload = function () {
  $(window).on('scroll', function (event) {
    requestAnimationFrame(onScroll);
  });

  $('.scrollHiddenBox').css('height', windowHeight * totalPage + 'px');
  $('.main div').css('transition', 'all 0.3s linear');

  // go page
  setTimeout(function () {
    window.scrollTo(0, 0);
    goPage(2);
  }, 100);
  $('.scrollBtn .up').on('click', function () {
    goPage(page > 1 ? page - 1 : page);
  });
  $('.scrollBtn .down').on('click', function () {
    goPage(page < totalPage ? page + 1 : totalPage);
  });
};

function goPage(targetPage) {
  let targetScrollTop = (targetPage - 1) * windowHeight;
  let baseTop = 0;
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
  });
  // onScroll();
}

function onScroll() {
  let scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
  // 当前页执行离开动画
  page = Math.ceil((scrollTop + 1) / windowHeight);
  // 下一页执行进入动画
  nextPage = page + 1;
  let scrollRatio = Math.floor((scrollTop / windowHeight) * 100);
  if (page > 1) {
    $('.scrollBtn .up').attr('src', './images/a5.png');
  } else {
    $('.scrollBtn .up').attr('src', './images/a3.png');
  }
  // onePage
  if (page === 1) {
    let pageRatio = getPageRatio(page, scrollRatio);
    $('.base .bgLeftSlice').css(
      'width',
      `${pageRatio > 50 ? 100 - pageRatio : 50}%`,
    );
    $('.base .BigTitle').css({
      transform: `rotateX(${pageRatio > 90 ? 90 : pageRatio}deg)`,
    });
    let animeRatioProcess = () => {
      let maxPoint = 75;
      return pageRatio < 50 ? 50 : pageRatio > maxPoint ? maxPoint : pageRatio;
    };
    $('.base .anime').css('left', `${animeRatioProcess()}%`);

    $('.onePage .features').css('transform', `translateX(-${pageRatio}%)`);
    $('.onePage .quick').css('transform', `translateX(${pageRatio}%)`);
  }
  if (page === 2) {
    let pageRatio = getPageRatio(page, scrollRatio, 0);
    $('.twoPage').css('transform', `translateY(${100 - pageRatio}%)`);
  }
  if (page === 3) {
    let pageRatio = getPageRatio(page, scrollRatio, 0);
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
  }
  if (page === 4) {
    let pageRatio = getPageRatio(page, scrollRatio, 0);
    $('.twoPage .twoBox').css({
      transform: `translateY(${diffTo(pageRatio, 100, 0)}%)`,
      opacity: `${diffTo(pageRatio, 0, 1)}`,
    });
  }
}

function getPageRatio(page, scrollRatio, startPoint = 20) {
  let pageRatio = 0;
  let base = (page - 1) * 100;
  let endPoint = 80;
  if (scrollRatio <= base + startPoint) {
    pageRatio = 0;
  } else if (scrollRatio >= base + endPoint) {
    pageRatio = 100;
  } else if (scrollRatio <= page * 100) {
    pageRatio = scrollRatio - base;
  }
  return pageRatio;
}

function resetPage() {
  $('.twoPage').css('transform', `translateY(200%)`);
}

function diffTo(pageRatio, old, now) {
  return old - (old - now) * (pageRatio / 100);
}
