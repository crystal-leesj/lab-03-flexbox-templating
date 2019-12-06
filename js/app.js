'use strict'

let allImages = [];
const myTemplate = Handlebars.compile($('#image-template').html());

function HornImage(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.horns = obj.horns;
  this.keyword = obj.keyword;
  this.description = obj.description;
}

HornImage.prototype.renderWithHandlebars = function(){
  const myHtml = myTemplate(this);
  // console.log(myHtml);
  $('#horns').append(myHtml);
};

HornImage.prototype.renderKeywords = function() {
  let filterKeywords = [];
  // remove all elements except for first one
  $('option').not(':first').remove();
  allImages.forEach(image => {
    if (!filterKeywords.includes(image.keyword)) {
      filterKeywords.push(image.keyword);
    }
  });

  filterKeywords.sort();

  filterKeywords.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  });
}

let page = '1';

function readJsonData(page) {
  // reset the allImage array to avoide the duplicates
  allImages = [];
  console.log('readJsonData :', page);
  $.get(`./data/page-${page}.json`, 'json')
    .then(data => {
      data.forEach(hornImgObj => {
        allImages.push(new HornImage(hornImgObj));
      })
    })
    .then(() => {
      allImages.forEach(image => {
        image.renderWithHandlebars();
        image.renderKeywords();
      })
    })
}

function filterHornImg() {
  $('select').on('change', function() {
    let selectedKeyword = $(this).val();
    if(selectedKeyword !== 'default') {
      $('div').hide();
      $(`div.${selectedKeyword}`).show();
    } else {
      $('div').show();
    }
  });
}

function handlePage() {
  $('button').on('click', function() {
    $('#horns').empty();
    let pageNumber = parseInt($( this).attr('id'))
    readJsonData(pageNumber);
  });
}

function sortByTitle() {
  $('#sortByTitle').on('click', function() {
    allImages.sort(function(a,b) {
      if(a.title > b.title) return 1;
      if(a.title < b.title) return -1;
      return 0;
    })
    console.log('NEW allImages :', allImages);
    $('div').remove();
    allImages.forEach(image => image.renderWithHandlebars());
    $('div').hide();
    $('div').show();
  })
}

$(() => {
  readJsonData(page);
  filterHornImg();
  handlePage();
  sortByTitle();
})
