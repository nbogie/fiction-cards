var gWords = null;
var gCatNames = "character setting problem resolution".split(' ');

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1jqmKT89gCB5cAiaUHRNJpqom_RZ7Qy5I_VTvmKT55do/pubhtml'

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: handleResponse
  })
  $('#randomise').click(randomise);
  gCatNames.forEach(function(catName) {
    var tag = $('#' + catName);
    tag.click(function() {
      pickANewOne(catName, tag);
    });
  });
}

function pickANewOne(catName, targetTag) {
  targetTag.html(getOne(catName).title);
}

function handleResponse(data, tabletop) {
  gWords = tabletop.sheets('cards').elements;
  randomise();
}

function classForPack(packName, defaultClass) {
  alloweds = "Original NewBGG neill".split(' ');
  var ix = alloweds.indexOf(packName);
  return (ix >= 0) ? alloweds[ix] : defaultClass;
}

function allOfCategory(cat) {
  return _.filter(gWords, function(entry) {
    return entry.category == cat;
  });
}

function getOne(catName) {
  choices = allOfCategory(catName);
  return _.sample(choices);
}

function randomise() {

  gCatNames.forEach(function(catName) {
    $('#' + catName).html(getOne(catName).title);
  });

}

window.addEventListener('DOMContentLoaded', init)