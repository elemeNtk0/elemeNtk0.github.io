var callMe = (function() {
  var me = {},
      $callMe,
      $callMeContent,
      $btnCallMe,
      $overlay;

  me.init = function() {
    $callMe = $('#js-callMe');
    $callMeContent = $('#js-callMeContent');
    $btnCallMe = $('#js-btnCallMe');
    $overlay = $('#js-overlay');
    $btnCallMe.on('click', callMeShowing);
  };

  function callMeShowing() {
    var callMeIsHidden = $callMeContent.hasClass('hidden');
    console.log('lol');

    if (callMeIsHidden) {
      $callMeContent.removeClass('hidden');
      $callMe.addClass('call-me--visible');
      $overlay.removeClass('overlay--off');
      $btnCallMe.text('Закрыть');
    }
    else {
      $callMeContent.addClass('hidden');
      $callMe.removeClass('call-me--visible');
      $overlay.addClass('overlay--off');
      $btnCallMe.text('Заказать звонок');
    }
  }

  return me;
}());

// //
// Главный файл Js - точка сборки.
// В этом файле следует подключать другие Js файлы.
// //
$(document).ready(function() {
  $('#js-slickPartners').slick({
    accessibility: false,
    dots: false,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 2000,
    variableWidth: true,
    prevArrow: '<button type="button" class="slick-prev">Предыдущий партнёр</button>',
    nextArrow: '<button type="button" class="slick-next">Следующий партнёр</button>',
  });


  $('#js-slickProjects').slick({
    accessibility: false,
    draggable: false,
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    variableWidth: true,
    speed: 1000,
    prevArrow: '<button type="button" class="slick-prev">Предыдущий проект</button>',
    nextArrow: '<button type="button" class="slick-next">Следующий проект</button>',
  });

  $(".fancybox").fancybox({
    helpers : {
      overlay : {
        closeClick : true,
        speedOut   : 200,
        showEarly  : true,
        locked     : true
      },
    }
  });


  $("#js-contactsForm").validate({
    focusCleanup: true,
    focusInvalid: false,
    errorClass: "validate__message",
    errorElement: "div",
    validClass: "success",
    highlight: function(element) {
      $(element).addClass('feedback__control--invalid').removeClass('feedback__control--valid');
    },
    unhighlight: function(element) {
      $(element).removeClass('feedback__control--invalid').addClass('feedback__control--valid');
    }
  });
  $("#js-callMeForm").validate({
    focusCleanup: true,
    focusInvalid: false,
    errorClass: "validate__message",
    errorElement: "div",
    validClass: "success",
    highlight: function(element) {
      $(element).addClass('feedback__control--invalid').removeClass('feedback__control--valid');
    },
    unhighlight: function(element) {
      $(element).removeClass('feedback__control--invalid').addClass('feedback__control--valid');
    }
  });

  $('#js-btnCallMe').length && callMe.init();
}); //.doc-ready



