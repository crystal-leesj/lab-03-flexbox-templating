'use strict'

const allImages =[];
const myTemplate = Handlebars.compile($('#image-template').html());

function HornImage(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.horns = obj.horns;
  this.keyword = obj.keyword;
  this.description = obj.description;

}

// HornImage.prototype.renderWithJquery = function() {
//   console.log('renderWithJquery');
//   const clone = $('#image-template').clone();
//   console.log('clone :', clone);
//   clone.find('h2').text(this.title);
//   clone.find('img').attr('src', this.image_url);
//   clone.find('img').attr('alt', this.title);
//   clone.find('p').text(this.description);
//   $('#horns').append(clone);

//   // clone.attr('class', this.keyword);
// }

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

function readJsonData(page) {
  $.get(`./data/page-${page}.json`, 'json')
    .then(data => {
      data.forEach(hornImgObj => {
        allImages.push(new HornImage(hornImgObj));
      })
    })
    .then(() => {
      allImages.forEach(image =>{
        image.renderWithHandlebars();
        image.renderKeywords();
      })
    })
}

function filterHornImg() {
  $('select').on('change', function() {
    let selectedKeyword = $(this).val();
    if(selectedKeyword !== 'default') {
      $('section').hide();
      $(`#horns[id = "${selectedKeyword}"]`).show();
    } else {
      $('section').show();
    }
  });
}

function handlePage() {
  $('button').on('click', function() {
    $('#horns').empty();
    console.log('+++++++++++++++handlePage');
    console.log('$(this).attr :', $(this).attr('id'));
    readJsonData($(this).attr('id'));
  });
}


console.log('allImages :', allImages);

$(() => {
  readJsonData(1);
  filterHornImg();
  handlePage();
})



