const toggleSwitch = document.querySelector('.theme-switch .checkbox1');
const toggleSwitch2 = document.querySelector('.theme-switch .checkbox2');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
    toggleSwitch2.checked = true;
    $("#logos").attr("src", "assets2/images/logod161.svg?a13");
  } else {
    toggleSwitch.checked = false;
    toggleSwitch2.checked = false;
    $("#logos").attr("src", "assets2/images/black-logod161.svg?a13");
  }
}
function checks(){
  var currentTheme2 = localStorage.getItem('theme');
  if (currentTheme2 === 'dark') {
    toggleSwitch.checked = true;
    toggleSwitch2.checked = true;
    $("#logos").attr("src","assets2/images/logod161.svg?a13");
  }else{
    toggleSwitch.checked = false;
    toggleSwitch2.checked = false;
    $("#logos").attr("src","assets2/images/black-logod161.svg?a13");
  }
}
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    $("#logos").attr("src","assets2/images/logod161.svg?a13");
  }else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    $("#logos").attr("src","assets2/images/black-logod161.svg?a13");
  }
  checks();
}

toggleSwitch.addEventListener('change', switchTheme, false);
function reset_animation() {
  $('#animated').removeClass("animated");
  setTimeout(function(){
    $('#animated').addClass("animated");
  },150);
}
/*
var countdownNumberEl = document.getElementById('countdown-number');
var countdowns = 10;
countdownNumberEl.textContent = countdowns;

setInterval(function() {
  console.log(countdowns);
  countdowns = --countdowns <= 0 ? 10 : countdowns;

  countdownNumberEl.textContent = countdowns;
}, 1000);
*/
(function($){

  /* HERO PLACEHOLDER */  
  $.heroPLACEHOLDER = function(){

   // var win = windowH   = $(window).height();
  //  var heroPLACEHOLDER = $("main#main div#hero-placeholder");

  //  heroPLACEHOLDER.css("min-height", windowH + "px");

  }

  $.heroPLACEHOLDER();

  $(window).bind("resize", function(){
    $.heroPLACEHOLDER();
  });


  $("body").click(function(){
    if ($('header#header div.middle-header .buttons .menu').hasClass("active")) {
      $('header#header div.middle-header .menu').toggleClass("active");
      $("header#header div.middle-header nav.menu").slideToggle();
    }
    return true;
  });



  $("header#header div.middle-header div.buttons a.button").click(function(){
    $(this).toggleClass("active");
    $("header#header div.middle-header nav.menu").slideToggle();
    return false;
  });

  $("body").click(function(){
    if ($('main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-box div.mail-buttons div.current-button span.icon').hasClass("active")) {
      $('main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-box div.mail-buttons div.current-button span.icon').toggleClass("active");
      $("main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-box div.mail-buttons div.opener-menu").slideToggle();
    }
    return true;
  });

  $("main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-box div.mail-buttons div.current-button span.icon").click(function(){
    $(this).toggleClass("active");
    $("main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-box div.mail-buttons div.opener-menu").slideToggle();
    return false;
  });

  $("main#main.home div#hero-placeholder div#mail-area div.mail-container div.mail-listing div.listing-header div.menu-area ul li.compose-mail").click(function(){
    $("main#main.home div#hero-placeholder div#mail-area div.mail-container").addClass("mail-container-compose");
    return false;
  });
  
  $("main#main.home div#hero-placeholder div#mail-area div.mail-container div.mail-compose div.compose-header div.buttons a.button.close-compose-email").click(function(){
    $("main#main.home div#hero-placeholder div#mail-area div.mail-container").removeClass("mail-container-compose");
    $(".mail-shadow").removeClass("active");
    $("main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-container div.mail-compose").removeClass("mail-compose-full")
    return false;
  });

  $("main#main.home div#hero-placeholder div#mail-area div.mail-container div.mail-listing div.listing-area div.mail-listing a.mail").click(function(){
    if ($(this).hasClass("not-read")){
      $(this).removeClass("not-read");
    }

    var index = $(this).index();

    $("main#main.home div#hero-placeholder div#mail-area div.mail-container").addClass("mail-container-view");
    $("main#main.home div#hero-placeholder div#mail-area div.mail-container div.mail-views div.view-box").eq(index).addClass("active");

    return false;
  });

  $("main#main.home div#hero-placeholder div#mail-area div.mail-container div.mail-views div.view-box div.box-header div.buttons a.button.close-current-email").click(function(){
    $("main#main.home div#hero-placeholder div#mail-area div.mail-container").removeClass("mail-container-view");
    $("main#main.home div#hero-placeholder div#mail-area div.mail-container div.mail-views div.view-box").removeClass("active");

    $("main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-container div.mail-views").removeClass("mail-views-full");
    $(".mail-shadow").removeClass("active");
    ReturnInbox();
    return false;
  });

  $("main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-container div.mail-compose div.compose-header div.buttons a.button.close-expand-email").click(function(){
    $("main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-container div.mail-compose").toggleClass("mail-compose-full");
    $(".mail-shadow").addClass("active");
  });

  $("main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-container div.mail-views div.view-box div.box-header div.buttons a.button.expand-current-email").click(function(){
    $("main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-container.mail-container-view div.mail-views").addClass("mail-views-full");
    $(".mail-shadow").addClass("active");
    return false;
  });
  
  var index = 0;

  $("main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-container div.mail-listing div.listing-header div.others a.refresh").click(function(){

    if (index == 0) {
      $('main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-container div.mail-listing div.listing-header div.others a.refresh span.icon').animate(
        { deg: 360 },
        {
          duration: 1200,
          step: function(now) {
            $(this).css({ transform: 'rotate(' + now + 'deg)' });
          }
        }
      );
      index++;
    } else {
      $('main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-container div.mail-listing div.listing-header div.others a.refresh span.icon').animate(
        { deg: 0 },
        {
          duration: 1200,
          step: function(now) {
            $(this).css({ transform: 'rotate(' + now + 'deg)' });
          }
        }
      );
      index--;
    }

    return false;
  });

  $(".mail-shadow").click(function(){

    $("main#main.home div#hero-placeholder div#mail-area div.mail-container").removeClass("mail-container-compose");
    $(".mail-shadow").removeClass("active");
    $("main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-container div.mail-compose").removeClass("mail-compose-full")

    $("main#main.home div#hero-placeholder div#mail-area div.mail-container").removeClass("mail-container-view");
    $("main#main.home div#hero-placeholder div#mail-area div.mail-container div.mail-views div.view-box").removeClass("active");

    $("main#main.home div#hero-placeholder div#mail-area div.mail-emperor div.mail-container div.mail-views").removeClass("mail-views-full");
    $(".mail-shadow").removeClass("active");

    return false;
  });
/*
  $('#compose').trumbowyg({
    btns: [
      ['strong', 'em'],
      ['link'],
      ['insertImage'],
      ['justifyLeft', 'justifyCenter', 'justifyRight'],
      ['removeformat'],
    ],
    autogrow: true
  });
*/
  $("footer#footer div.top-footer div.footer-language div.language-select div.current-language").click(function () {
    $(this).prev('div').slideToggle();
    return false;
  });
	
})(jQuery);

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}