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
  console.log(myHtml);
  $('#horns').append(myHtml);
};

function readJsonData() {
  $.get('./data/page-1.json', 'json')
    .then(data => {
      data.forEach(hornImgObj => {
        allImages.push(new HornImage(hornImgObj));
      })
    })
    .then(() => {
      allImages.forEach(image =>{
        image.renderWithHandlebars();
        // image.renderKeywords();
      })
    })
}


console.log('allImages :', allImages);

$(() => {
  readJsonData();
  // filterHornImg();
})



