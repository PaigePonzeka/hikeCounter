/**
 * Creates a tooltip item that pops up when user clicks on the button
 */
var hikesList;
  var count = 1;
var HikeCounter = function(options) {
  var $container = $('.js-hikeCounter');
  this.totalHikes = 0;
  this.totalMiles = 0;
  this.hikeList;
  this.shouldScroll = true;
  var template = $('#hike-template');

  if (template) {
    this.hikeTemplate = Handlebars.compile(template.html());
  } else {
    console.error('No Hike Template Found');
  }

  if ($container) {
    this.init();
  }
  // stop the scroll when the user scrolls
  var self = this;
  window.setTimeout(function() {
    $(window).on('mousewheel DOMMouseScroll', function() {
      self.shouldScroll = false;
    });
  }, 500);

}

HikeCounter.prototype.init = function() {
  this.get(0);
};


HikeCounter.prototype.get = function(offset) {

  var self = this;
  var limit = 10;

  fetch('https://liveapi.yext.com/v2/accounts/me/entities?api_key=9f6490ce2bc3be7bebb3dbfccd295744&v=20210923&entityTypes=ce_hike&savedFilterIds=649845236&limit=' + limit + '&offset=' + offset)
  .then(response => response.json())
  .then(data => {

    if (data.response && data.response.entities) {
      let processedData = this.process(data.response.entities);
      if (hikesList) {
        hikesList = hikesList.concat(processedData);
      } else {
        hikesList = processedData;
      }
    }

    // if the total number of entities gotten is less than the count
    if (offset + limit < data.response.count) {
      this.get(offset + limit);
    } else {
      // start adding entities
      var self = this;
      window.setTimeout(function() {
        $('.js-loader').fadeOut();
        self.startAdd();

      }, 100)

    }

  })
};

HikeCounter.prototype.setCount = function(count) {
  $('.js-hike-count').html(count);
};

HikeCounter.prototype.setMiles = function(miles) {
  $('.js-mile-count').html(miles);
}

HikeCounter.prototype.startAdd = function() {
  // iterate through all hikes and slowly add them
  var self = this;
  var start = 0;
  var end = hikesList.length;
  var interval = 1;
  this.addInterval(start, end, interval);

};

HikeCounter.prototype.addInterval = function(start, end, interval) {
  var self = this;
  console.log('total miles', self.totalMiles);
  window.setTimeout(function() {
    var toShow = hikesList.slice(start, start + interval);

    self.add({entities: toShow});
    self.setCount(start + interval);

    toShow.forEach(function(entity){
      console.log('count', count);
      console.log(parseFloat(entity.c_length));
      console.log('total miles', self.totalMiles);
      if (entity.c_length){
        self.totalMiles += parseFloat(entity.c_length);
      }

    });

    self.setMiles(Math.round(self.totalMiles));

    if (start + interval < end) {
      self.addInterval(start + interval, end, interval);
    } else {
      $('.stat-news').fadeIn();
      var last = $('#hexGrid .hex').last();
      $('html, body').animate({
        scrollTop: last.offset().top
      }, 250);
    }
  }, 200);
}

HikeCounter.prototype.process = function(entities) {
  let processEntities = [];
  var self = this;


  entities.forEach(function(entity) {

    if (entity.photoGallery) {
      if (entity.photoGallery.length > 2) {
        entity.photo = entity.photoGallery[1].image.url;
      } else {
        entity.photo = entity.photoGallery[0].image.url;
      }
    }

    let img = new Image();
    img.src = entity.photo;

    entity.count = count;
    processEntities.push(entity);
    count++;
  });
  var totalDays = this.totalDays();
  var dayCounter = Math.round(totalDays / count);
  $('.js-total-days').html(totalDays);
  $('.js-hikes-per-day').text(dayCounter);
  this.setMiles();
  return processEntities;
}

// calculates the total days I've been on this trip
HikeCounter.prototype.totalDays = function() {
  var start = new Date("05/31/2021");
  var today = new Date();

  return Math.round((today.getTime() - start.getTime()) / (1000 * 3600 * 24));
}

// Add a Hike to the view
HikeCounter.prototype.add = function(entities) {
  // todo count every 5 and add them to the view in a timeout
  var results = this.hikeTemplate(entities);

  $('#hexGrid').append(results);
  $('#hexGrid .hex').fadeIn('slow');
  var last = $('#hexGrid .hex').last();

  if (this.shouldScroll) {
    $('html, body').animate({
        scrollTop: last.offset().top
    }, 250);
  }

}



new HikeCounter();