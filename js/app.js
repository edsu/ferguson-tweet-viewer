/*
 * This was quickly done, and it shows :)
 */

var refresh = 4000;
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
    while (w < (width - tweetWidth)) {
      var div = $('<div class="tweet"></div>');
      div.css("position", "absolute");
      div.css("left", w);
      div.css("width", tweetWidth);
      $("body").append(div);
      w += tweetWidth;
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
  var tweetId = getId();
  var divs = $(".tweet");
  var div = $(divs[count % divs.length]);
  var tweet = $("<div></div>");
  div.prepend(tweet);
  twttr.widgets.createTweet(tweetId, tweet[0], {
    align: 'center', 
    theme: 'dark',
    width: tweetWidth
  }).then(function(t) {
    $(t).style('margin', '30px');
  });
  setTimeout(addTweet, refresh);
  count += 1;
}

function getId() {
  return ids[Math.floor(Math.random() * ids.length)];
}

$(run);
