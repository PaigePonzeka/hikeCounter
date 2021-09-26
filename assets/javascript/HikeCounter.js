/**
 * Creates a tooltip item that pops up when user clicks on the button
 */
var HikeCounter = function(options) {
  var $container = $('.js-hikeCounter');
  this.totalHikes = 0;
  this.totalMiles = 0;
  var template = $('#hike-template');

  if (template) {
    this.hikeTemplate = Handlebars.compile(template.html());
  } else {
    console.error('No Hike Template Found');
  }

  if ($container) {
    this.init();
  }


}


HikeCounter.prototype.init = function() {
  console.log('init Hike Counter');
  this.get();
};


HikeCounter.prototype.get = function() {

  var self = this;
  var limit = 50;

  fetch('https://liveapi.yext.com/v2/accounts/me/entities?api_key=9f6490ce2bc3be7bebb3dbfccd295744&v=20210923&entityTypes=ce_hike&savedFilterIds=649845236&limit=' + limit)
  .then(response => response.json())
  .then(data => {

    this.setCount(data.response.count);

    // TODO if total hikes > limit run another query

    console.log('totalHikes', self.totalHikes);

    if (data.response && data.response.entities) {
      let processedData = this.process(data.response.entities);
      this.add({
        entities: processedData
      });
    }

  })
};

HikeCounter.prototype.setCount = function(count) {
  $('.js-hike-count').html(count);
};

HikeCounter.prototype.setMiles = function() {
  $('.js-mile-count').html(this.totalMiles);
}

HikeCounter.prototype.process = function(entities) {
  let processEntities = [];
  var self = this;
  var count = 1;

  entities.forEach(function(entity) {

    if (entity.c_length) {
      self.totalMiles += parseInt(entity.c_length);
    }

    if (entity.photoGallery) {
      if (entity.photoGallery.length > 2) {
        entity.photo = entity.photoGallery[1].image.url;
      } else {
        entity.photo = entity.photoGallery[0].image.url;
      }
    }

    entity.count = count;
    processEntities.push(entity);
    count++;
  });

  this.setMiles();
  return processEntities;
}

// Add a Hike to the view
HikeCounter.prototype.add = function(entities) {
  // todo count every 5 and add them to the view in a timeout
  var results = this.hikeTemplate(entities);
  $('#hexGrid').append(results);
}



new HikeCounter();