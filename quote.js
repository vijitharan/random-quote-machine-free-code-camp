var $quoteDisplay = $("#quoteDisplay");
var $authorDisplay = $("#authorDisplay");
var $twitterBtn = $(".twitter-share-button");
var inspire = "";
var inpirationalWords = ["ability","attitude","afraid","abundance","able","action","achieved","adoptability","adversity","aspire","aware","awakening","awareness","alive","achieve","art","balance","beautiful","beauty","become","begin","being","present","yourself","belief","believe","breath","change","birth","rebirth","challenge","life","world","choice","civilization","community","courage","calm","caring","confidence","connection","creativity","dicipline","good","dream","intelligence","excellence","energy","enjoy","embrace","empower","experience","future ","failure","fair","forever","faith","fear","fly","forgiveness","freedom","get started","god","gratitube","growth","greatness","goals","goal","hard work","never","give","give up","great","habit","habits","happiness","friends","joys","happy","heart","heal","improve","imagine","inspire","joy","kindness","kiss","laugh","learn","light","live","love","meaningful","music","nature","open","opportunity","optimistic","overcome","passion","peace","play","power","purpose","renew","relax","resolve","reveal","respect","realize","simple","smile","shine","special","strong","success","survive","thankful","thrill","tough","trust","uncover","understand","useful","wild","wonder","young"];

$("body").fadeIn(2000);

//Getting data from JSON wiht Ajax
var Error = setTimeout(function(){
  $("blockquote").text("Quote Could Not Load");
}, 8000);

function loadQuote(){
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&key=140&jsonp=?",
    dataType: "jsonp",
    success: function(response){
      inspire = response;
      getQuote(response);
      twitter(response);
      clearTimeout(Error);
    }
  });
}

loadQuote();

//Event listener for new quote
$("#btn").on("click", function(){
  loadQuote();
});

//Setting quote to HTML element
function getQuote(data){
  $($("#container")).fadeOut(500, function(){
    $quoteDisplay.html(data.quoteText.split(" ").map(item => inpirationalWords.indexOf(item) !== -1 ? "<span>" + item + "</span>" : item).join(" "));
    if(data.quoteAuthor === ""){
      $authorDisplay.text("Unknown")
    }else{
      $authorDisplay.text(data.quoteAuthor);
    }
  });
  $("#container").fadeIn(500);
}

//TWITTER BUTTON
function twitter(data){
  var text = "text=" + data.quoteText + "-";
  var hashtag = "hashtags=" + data.quoteAuthor.replace(/\s/g, "_") + ",quote";
  $twitterBtn.attr("href", "https://twitter.com/intent/tweet?" + text + "&" + hashtag);
}
