var cdTop = (function() {
  var me = {},
      offset,
      offset_opacity,
      scroll_top_duration,
      $back_to_top;

  me.init = function() {
    offset = 300;
    offset_opacity = 1200;
    scroll_top_duration = 700;
    $back_to_top = $('.cd-top');
    $(window).on('scroll', onScrollCdTop);
    $back_to_top.on('click', topClick);
  };


  function onScrollCdTop() {
    ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
    if( $(this).scrollTop() > offset_opacity ) {
      $back_to_top.addClass('cd-fade-out');
    }
  };

  function topClick(e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: 0 , }, scroll_top_duration );
  }



  return me;
}());
/*

CollapsibleLists.js

An object allowing lists to dynamically expand and collapse

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

// create the CollapsibleLists object
var CollapsibleLists =
    new function(){

      /* Makes all lists with the class 'collapsibleList' collapsible. The
       * parameter is:
       *
       * doNotRecurse - true if sub-lists should not be made collapsible
       */
      this.apply = function(doNotRecurse){

        // loop over the unordered lists
        var uls = document.getElementsByTagName('ul');
        for (var index = 0; index < uls.length; index ++){

          // check whether this list should be made collapsible
          if (uls[index].className.match(/(^| )collapsibleList( |$)/)){

            // make this list collapsible
            this.applyTo(uls[index], true);

            // check whether sub-lists should also be made collapsible
            if (!doNotRecurse){

              // add the collapsibleList class to the sub-lists
              var subUls = uls[index].getElementsByTagName('ul');
              for (var subIndex = 0; subIndex < subUls.length; subIndex ++){
                subUls[subIndex].className += ' collapsibleList';
              }

            }

          }

        }

      };

      /* Makes the specified list collapsible. The parameters are:
       *
       * node         - the list element
       * doNotRecurse - true if sub-lists should not be made collapsible
       */
      this.applyTo = function(node, doNotRecurse){

        // loop over the list items within this node
        var lis = node.getElementsByTagName('li');
        for (var index = 0; index < lis.length; index ++){

          // check whether this list item should be collapsible
          if (!doNotRecurse || node == lis[index].parentNode){

            // prevent text from being selected unintentionally
            if (lis[index].addEventListener){
              lis[index].addEventListener(
                  'mousedown', function (e){ e.preventDefault(); }, false);
            }else{
              lis[index].attachEvent(
                  'onselectstart', function(){ event.returnValue = false; });
            }

            // add the click listener
            if (lis[index].addEventListener){
              lis[index].addEventListener(
                  'click', createClickListener(lis[index]), false);
            }else{
              lis[index].attachEvent(
                  'onclick', createClickListener(lis[index]));
            }

            // close the unordered lists within this list item
            toggle(lis[index]);

          }

        }

      };

      /* Returns a function that toggles the display status of any unordered
       * list elements within the specified node. The parameter is:
       *
       * node - the node containing the unordered list elements
       */
      function createClickListener(node){

        // return the function
        return function(e){

          // ensure the event object is defined
          if (!e) e = window.event;

          // find the list item containing the target of the event
          var li = (e.target ? e.target : e.srcElement);
          while (li.nodeName != 'LI') li = li.parentNode;

          // toggle the state of the node if it was the target of the event
          if (li == node) toggle(node);

        };

      }

      /* Opens or closes the unordered list elements directly within the
       * specified node. The parameter is:
       *
       * node - the node containing the unordered list elements
       */
      function toggle(node){

        // determine whether to open or close the unordered lists
        var open = node.className.match(/(^| )collapsibleListClosed( |$)/);

        // loop over the unordered list elements with the node
        var uls = node.getElementsByTagName('ul');
        for (var index = 0; index < uls.length; index ++){

          // find the parent list item of this unordered list
          var li = uls[index];
          while (li.nodeName != 'LI') li = li.parentNode;

          // style the unordered list if it is directly within this node
          // if (li == node) uls[index].style.display = (open ? 'block' : 'none');

        }

        // remove the current class from the node
        node.className =
            node.className.replace(
                /(^| )collapsibleList(Open|Closed)( |$)/, '');

        // if the node contains unordered lists, set its class
        if (uls.length > 0){
          node.className += ' collapsibleList' + (open ? 'Open' : 'Closed');
        }

      }

    }();

if ($('#js-rangeSliderArea') && $('#filterCostMin') && $('#filterCostMax')) {


 var
    $range = $("#js-rangeSliderArea"),
    $inputFrom = $('#filterCostMin'),
    $inputTo = $('#filterCostMax'),
    changing = false;

    var OnChangeSlider = function(data) {
      var from = data.from;
      var to = data.to;
      $inputFrom.val(from);
      $inputTo.val(to);
    };

    $range.ionRangeSlider({
      type: "double",
      min: 0,
      max: 10000,
      from: $inputFrom.val(),
      to: $inputTo.val(),
      force_edges: true,
      grid: false,
      // grid_num: 20,
      hide_min_max: true,
      onStart: function(data) {
        var toValue = $inputTo.val() * 1,
        fromValue = $inputFrom.val() * 1;
        if (toValue == fromValue && (toValue === null || toValue === 0 || toValue === '')) {
          data.to = data.max;
          data.from = data.min;
        }
      },
      onChange: OnChangeSlider,
      onFinish: OnChangeSlider,
      onUpdate: function(data) {
        if (changing) {
          changing = false;
          return;
        };
        OnChangeSlider(data);
      }
    });

    var sliderData = $range.data("ionRangeSlider");

    $inputFrom.change(function() {
      var value = $inputFrom.val() * 1,
        toValue = $inputTo.val() * 1,
        rangeMax = sliderData.result.max * 1;

      if (value >= rangeMax && ( toValue === '')) {
        value = rangeMax;
        $inputTo.val('');
      }

      else if (toValue === '' || toValue === 0) {
        value = value;
        $inputTo.val('');
      }
      else if (value >= toValue && toValue !== '') value = toValue;
      if (value !== '' && value !== null)
        $inputFrom.val(value);

      changing = true;
      var inputVal = $inputFrom.val() * 1;

      sliderData.update({
        from: inputVal
      });
    });

    $inputTo.change(function() {
      var value = $inputTo.val() * 1,
        fromValue = $inputFrom.val() * 1,
        rangeMax = sliderData.result.max * 1;

      if (value < rangeMax) {
        if (value < fromValue && value !== '') value = fromValue;
      }
      /* Если тут впилить else if, то работает криво ((( */
      if (value >= rangeMax) value = rangeMax;
      else if (value === 0 || value === '' || value === null)
        value = '';

      $inputTo.val(value);

      changing = true;
      var inputVal = $inputTo.val() * 1;
      if (value !== '')
        sliderData.update({to: inputVal});
      else sliderData.update({to: rangeMax});
    }); // end range-slider

}

var mainCatalog = (function() {
  var me = {},
      $mainCatalog,
      $btnHamburger;

  me.init = function() {
    $mainCatalog = $('#js-mainCatalog');
    $btnHamburger = $('#js-btnHamburger');
    $btnHamburger.removeClass('btn--hamburger-active');
    $btnHamburger.on('click', hamburgerClick);
  };

  function hamburgerClick() {
    var hamburgerIsActive = $btnHamburger.hasClass('btn--hamburger-active');

    if (hamburgerIsActive)
      $btnHamburger.removeClass('btn--hamburger-active');
    else
      $btnHamburger.addClass('btn--hamburger-active');

    mainCatalogShowing();
  }

  function mainCatalogShowing() {
    var mainCatalogIsHidden = $mainCatalog.hasClass('-hidden');

    if (mainCatalogIsHidden)
      $mainCatalog.removeClass('-hidden');
    else
      $mainCatalog.addClass('-hidden');

  }
  return me;
}());

var searchPanel = (function() {
  var me = {},
      $searchPanel,
      $btnSearch,
      $btnSearchPanelClose;

  me.init = function() {
    $searchPanel = $('#js-searchPanel');
    $btnSearch = $('#js-btnSearch');
    $btnSearchPanelClose = $('#js-btnSearchPanelClose');
    $btnSearch.on('click', btnSearchClick);
    $btnSearchPanelClose.on('click', searchPanelHide);
  };

  function btnSearchClick() {
    var searchPanelIsHidden = $searchPanel.hasClass('-hidden');

    if (searchPanelIsHidden)
      $searchPanel.removeClass('-hidden');
    else
      $searchPanel.addClass('-hidden');
  }

  function searchPanelHide() {
    // var searchPanelIsHidden = $searchPanel.hasClass('-hidden');
    $searchPanel.addClass('-hidden');
  }
  return me;
}());

// ЭТО ПРОСТО ЛЮТЫЙ АД....
// Пока нереализовано
var simpleGallery = (function() {
  'use strict';

  var options = {
    draggable: false,
    infinite: false,
    fade: true,
    appendDots: $('.slick-slider'),
    dots: true,
    arrows: false,
  };

  var simpleGallery = {
    init: function(){
      console.log('lol YA TUT');

      $('.js-slick-slider:visible').each(function(index, elem) {
        simpleGallery.initSlider(elem);
      });

    },
    initSlider: function(sl, opts){
      // opts = opts || options;
      console.log('lol YA TUT');
      $(this).slick({
        draggable: false,
        infinite: false,
        fade: true,
        appendDots: $('.slick-slider'),
        dots: true,
        arrows: false,
      });
    }
  };

  return simpleGallery;
}());

var stickyPanel = (function() {
  var me = {},
      $stickyPanel,
      $btnHamburger,
      $btnSearch,
      $headerCatalog,
      $mainCatalog,
      $searchPanel,
      stickyPanelOffset;

  me.init = function() {
    $stickyPanel = $('#js-stickyPanel');
    $btnHamburger = $('#js-btnHamburger');
    $btnSearch = $('#js-btnSearch');
    $headerCatalog = $('#js-mainCatalog.header__catalog');
    $mainCatalog = $('#js-mainCatalog');
    $searchPanel = $('#js-searchPanel');
    stickyPanelOffset = $stickyPanel.length ? $stickyPanel.offset().top : 125;
    $(window).on('scroll', onScroll);
  };

  function onScroll() {
    var currentScroll = $(this).scrollTop();

    if (currentScroll < stickyPanelOffset) {
      $stickyPanel.removeClass('header-panel--sticky');
      $btnHamburger.removeClass('btn--hamburger-sticky');
      $btnSearch.removeClass('btn--search-sticky');
      $searchPanel.removeClass('search-panel--sticky');
      if ($headerCatalog.length > 0)  {
        $headerCatalog.removeClass('header__catalog--sticky');
        return;
      }
      $mainCatalog.removeClass('main-navigation__catalog-menu--moved');

    }
    else {
      $stickyPanel.addClass('header-panel--sticky');
      $btnHamburger.addClass('btn--hamburger-sticky');
      $btnSearch.addClass('btn--search-sticky');
      $searchPanel.addClass('search-panel--sticky');
      if ($headerCatalog.length > 0)  {
        $headerCatalog.addClass('header__catalog--sticky');
        return;
      }
      $mainCatalog.addClass('main-navigation__catalog-menu--moved');
    }
  }
  return me;
}());

var tabs = (function() {
  var me = {};

  // .js-tabs / .js-tabs-search
  // .js-tabsNavItem
  // .js-tabsNavLink
  // .js-tabsItem
  me.init = function() {
    $(document).on('click','.js-tabsNavLink',onTabClick);
    onPageReady();
  };

  // scan tabs on page loaded. If no active tab-nav found, select first tab-nav and its tab
  function onPageReady() {
    $('.js-tabs').each(function(){
      var $self = $(this);

      // if (! ($self.hasClass('.js-tabs-search') || $self.find('.js-tabsNavItem.active').length)) {
      //   $self.find('.js-tabsNavItem .js-tabsNavLink').first().trigger('click');
      // }
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

// //
// Главный файл Js - точка сборки.
// В этом файле следует подключать другие Js файлы.
// //
$(document).ready(function() {

  $('#js-stickyPanel').length && stickyPanel.init();
  $('#js-mainCatalog').length && mainCatalog.init();
  $('#js-searchPanel').length && searchPanel.init();
  $('.cd-top').length && cdTop.init();
  $('.js-tabs').length && tabs.init();
  // $('#js-rangeSliderArea').length && customRangeSlider.init();
  // $('.js-slick-slider').length && simpleGallery.init();

  $('.js-magnificPopup').magnificPopup({
    type:'inline',
      removalDelay: 500,
      callbacks: {
        beforeOpen: function() {
          this.st.mainClass = this.st.el.attr('data-effect');
          var dataItemThumb = this.st.el.attr('data-item-thumb');
          var dataItemName = this.st.el.attr('data-item-name');
          var popupContainer = $('#addCartPopup');
          popupContainer.find('.popup__cart-img-wrap > img').attr("src", dataItemThumb);
          popupContainer.find('.popup__cart-item-name').text(dataItemName);
        }
      },
    midClick: true,
  });




  $("#js-sliderBigMainPage").lightSlider({
    addClass: 'lSSlideOuter--bann-big',
    enableDrag: false,
    item: 1,
    loop: false,
    controls: false,
    slideMove: 1,
    slideMargin: 0,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed: 600,
  });

  $('#js-sliderCardProduct').lightSlider({
    gallery: true,
    item: 1,
    vertical: true,
    verticalHeight: 320,
    vThumbWidth: 68,
    thumbItem: 4,
    thumbMargin: 10,
    slideMargin: 0,
  });

  $(".js-zoomImg").imagezoomsl({
    zoomrange: [3, 3]
  });


  $('#js-video-gallery').lightGallery({
    oadYoutubeThumbnail: true,
    youtubeThumbSize: 'default',
    loadVimeoThumbnail: true,
    vimeoThumbSize: 'thumbnail_medium',
    // controls: false,
    autoplay: false,
    download: false,
    autoplayControls: false,
    fullScreen: false,
    zoom: false,
    selector: '.slider-scrolling__link',
  });

  $(".mCustomScrollbar").mCustomScrollbar({
    axis:"x",
    advanced: {
      updateOnContentResize : true,
      autoExpandHorizontalScroll: true
    },
    theme: "inset-dark",
  });

  $("#js-contactsForm").validate({
    focusCleanup: true,
    focusInvalid: false,
    errorClass: "validate__message",
    errorElement: "div",
    validClass: "success",
    highlight: function(element) {
      $(element).addClass('form__control--invalid').removeClass('form__control--valid');
    },
    unhighlight: function(element) {
      $(element).removeClass('form__control--invalid').addClass('form__control--valid');
    }
  });
  $("#js-callBackForm").validate({
    focusCleanup: true,
    focusInvalid: false,
    errorClass: "validate__message",
    errorElement: "div",
    validClass: "success",
    highlight: function(element) {
      $(element).addClass('form__control--invalid').removeClass('form__control--valid');
    },
    unhighlight: function(element) {
      $(element).removeClass('form__control--invalid').addClass('form__control--valid');
    }
  });


  // text-preview
  if ($('.js-text-preview').length) {
    var closedHeight = 190;

    $.each($('.js-text-preview'), function() {
      var previewHeight = + $(this).removeClass('closed').outerHeight(true);
      if (previewHeight > closedHeight) {
        $(this).css('height', previewHeight+'px').addClass('closed');
      } else {
        $(this).find('.text-preview__control').hide();
      }
    });

    $(document).on('click','.text-preview__control', function (e) {
      e.preventDefault();
      $(this).closest('.js-text-preview').toggleClass('closed');
    });
  }

  // collapsible left menu
  $('#js-leftMenu').length && CollapsibleLists.applyTo(document.getElementById('js-leftMenu'));

  $.protip();


}); // END doc.ready
