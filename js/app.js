/*
 * This was quickly done, and it shows :)
 */

var refresh = 2000;
var count = 0;
var tweetWidth = 550;

function run() {
  waitForTwttr(function() {
    addDivs();
    addTweet();
  });
}

function addDivs() {
  var width = $(window).width();
  var height = $(window).height();

  // mobile device? 
  if (width < tweetWidth * 2) {
    tweetWidth = width - 30;
    refresh = 10000;
    $('body').append($('<div class="tweet"></div>'));
  } 
  // otherwise do we have room for more than one tweet?
  else {
    var w = 100;
    var middle = parseInt(height) / 2;
    var vOffset1 = middle / 3;
    var vOffset2 = middle / 1.5;
    var verticalOffset = vOffset1;
    while (w < (width - tweetWidth)) {
      var div = $('<div class="tweet"></div>');
      div.css("position", "absolute");
      div.css("left", w);
      div.css("top", middle - verticalOffset);
      $("body").append(div);
      w += tweetWidth;
      verticalOffset = verticalOffset == vOffset1 ? vOffset2 : vOffset1;
      console.log("added div");
    }
  }
}

function waitForTwttr(callback) {
  if (twttr.widgets) {
    callback();
  } else {
    setTimeout(function() {
      waitForTwttr(callback);
    }, 100);
  }
}

function addTweet() {
  count += 1;
  var tweetId = getId();
  var divs = $(".tweet");
  var div = $(divs[count % divs.length]);
  div.fadeOut('slow', function() {
    div.empty();
    twttr.widgets.createTweet(tweetId, div[0], {
      align: 'center', 
      theme: 'dark',
      width: tweetWidth
    }).then(function(p) {
      setTimeout(function() {
        $(p).parent().fadeIn('slow');
      }, 500);
      setTimeout(addTweet, refresh);
    });
  });
}

function getId() {
  return ids[Math.floor(Math.random() * ids.length)];
}

$(run);
