var body = document.body;
var timer;

window.addEventListener('scroll', function() {
  clearTimeout(timer);
  if(!body.classList.contains('disable-hover')) {
    body.classList.add('disable-hover')
  }
  timer = setTimeout(function() {
    body.classList.remove('disable-hover')
  },200);
}, false);

var mainMenu = (function() {
  var me = {},
      menu,
      menuBtn;

  me.init = function() {
    menu = document.querySelector('#js-mainMenu');
    menuBtn = document.querySelector('#js-mainMenuBtn');

    menuBtn.addEventListener('click', toggleClassMenu, false);
  };


  function toggleClassMenu() {
    if(!menu.classList.contains('main-menu--is-open')) {
      menu.classList.add('main-menu--is-open');
      menuBtn.classList.add('main-menu__btn--is-active');
    } else {
      menu.classList.remove('main-menu--is-open');
      menuBtn.classList.remove('main-menu__btn--is-active');
    }
  }



  return me;
}());





var tabs = (function() {
  var me = {};


  me.init = function() {
    $(document).on('click','.js-tabsNavLink',onTabClick);
    onPageReady();
  };

  // scan tabs on page loaded. If no active tab-nav found, select first tab-nav and its tab
  function onPageReady() {
    $('.js-tabs').each(function(){
      var $self = $(this);


    });
  }



  function onTabClick(e) {
    e = e || window.event;
    var $self = $(e.target),
        $tabsNav = $self.closest('.js-tabsNavItem'),
        $tabs = $self.closest('.js-tabs');

    e.preventDefault();

    if (! $tabsNav.hasClass('active')) {
      // you can provide additional selector via data-toggle attribute,
      // if you want to show/hide more than one element per click
      var activeTab = $self.data('toggle') ? $self.data('toggle') : $self.attr('href');

      if ($(activeTab).length) {

        $tabs.trigger('tabs.beforeChange');

        $tabs.find('.js-tabsItem.active').filter(function(){
          return $(this).closest('.js-tabs').is($tabs);
        }).removeClass('active');
        $tabs.find('.js-tabsNavItem.active').filter(function(){
          return $(this).closest('.js-tabs').is($tabs);
        }).removeClass('active');

        $(activeTab).filter('.js-tabsItem').addClass('active');
        $tabsNav.addClass('active');

        $tabs.trigger('tabs.afterChange');
      }
    } else if ($tabs.hasClass('js-tabs-search')) {
      $tabsNav.removeClass('active');
      $tabs.find('.js-tabsItem.active').filter(function(){
        return $(this).closest('.js-tabs').is($tabs);
      }).removeClass('active');
    }
  }

  me.tabClick = onTabClick;

  return me;
}());


$(document).ready(function() {


  $('.js-partners').slick({
    autoplay: false,
    arrows: true,
    autoplaySpeed: 2000,
    prevArrow: '<button type="button" class="slick-prev">Пролистать назад</button>',
    nextArrow: '<button type="button" class="slick-next">Пролистать вперёд</button>',
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 801,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  $('#js-mainMenu').length && mainMenu.init();

  $('.js-tabs').length && tabs.init();


}); //.doc-ready



