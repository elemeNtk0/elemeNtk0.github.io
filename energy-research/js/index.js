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


  $("#feedbackForm").validate({
    errorClass: "invalid123",
    validClass: "success",
    errorContainer: ".validate"
  });

}); //.doc-ready



