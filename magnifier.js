var magnifierSize = '230px';
var magnification = 1.3;

$("<style>")
  .prop("type", "text/css")
  .html("\
    img {\
      display: block;\
    }\
    .magnify {\
    border-radius: 50%;\
    border: 1px solid black;\
    position: absolute;\
    z-index: 20;\
    background-repeat: no-repeat;\
    background-color: white;\
    box-shadow: inset 0 0 20px rgba(0,0,0,.5);\
    display: none;\
    cursor: none;\
    }")
  .appendTo("head");

function magnifier () {

  this.magnifyImg = function (ptr, magnification, magnifierSize) {
    var $pointer;
    if (typeof ptr == "string") {
      $pointer = $(ptr);
    } else if (typeof ptr == "object") {
      $pointer = ptr;
    }

    magnification = +(magnification);

    $pointer.hover(function () {
      $(this).css('cursor', 'none');
      $('.magnify').show();
      //Setting some variables for later use
      var width = $(this).width();
      var height = $(this).height();
      var src = $(this).attr('src');
      var imagePos = $(this).offset();
      var image = $(this);

      if (magnifierSize == undefined) {
        magnifierSize = '150px';
      }

      $('.magnify').css({
        'background-size': width * magnification + 'px ' + height * magnification + "px",
        'background-image': 'url("' + src + '")',
        'width': magnifierSize,
        'height': magnifierSize
      });

      //Setting a few more...
      var magnifyOffset = +($('.magnify').width() / 2);
      var rightSide = +(imagePos.left + $(this).width());
      var bottomSide = +(imagePos.top + $(this).height());

      $(document).mousemove(function (e) {
        if (e.pageX < +(imagePos.left - magnifyOffset / 6) || e.pageX > +(rightSide + magnifyOffset / 6) || e.pageY < +(imagePos.top - magnifyOffset / 6) || e.pageY > +(bottomSide + magnifyOffset / 6)) {
          $('.magnify').hide();
          $(document).unbind('mousemove');
        }
        var backgroundPos = "" - ((e.pageX - imagePos.left) * magnification - magnifyOffset) + "px " + -((e.pageY - imagePos.top) * magnification - magnifyOffset) + "px";
        $('.magnify').css({
          'left': e.pageX - magnifyOffset,
          'top': e.pageY - magnifyOffset,
          'background-position': backgroundPos
        });
      });
    }, function () {

    });
  };

  this.init = function () {
    $('body').prepend('<div class="magnify"></div>');
  }

  return this.init();
}

$(document).ready(function () {

  var magnify = new magnifier();
  magnify.magnifyImg('.magnifier-image', magnification, magnifierSize);

  $('input[type="range"]').change(function () {
    magnify.magnifyImg('.magnifier-image', $('#magnificationRange').val(), $('#magnifierSizeRange').val());
  });
});
