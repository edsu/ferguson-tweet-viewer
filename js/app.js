var refresh = 5000;

function run() {
  waitForTwttr(setTweet);
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

function setTweet() {
  $("#tweet").empty();
  var tweet = document.getElementById('tweet');
  var tweetId = getId();
  twttr.widgets.createTweet(tweetId, tweet, {align: 'center'})
    .then(function(el) {
    });
  setTimeout(setTweet, refresh);
}

function getId() {
  return ids[Math.floor(Math.random() * ids.length)];
}

$(run);
