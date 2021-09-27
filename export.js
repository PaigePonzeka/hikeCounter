var content = 'title,date,length,type,url, images \n';
$('.styles-module__container___10uYZ ').each(function(){
  var title = $(this).find('a').first().text();
  var date = $(this).find('.styles-module__info___1Mbn6').first().text();
  var type = $(this).find('.styles-module__activityTag___3-RdN').first().text();
  var length = $(this).find('.styles-module__info___1Mbn6').last().text();

  var url = 'https://www.alltrails.com' + $(this).find('a').attr('href');
  var slides = $(this).find('.slick-slide');
  var images;
  $(slides).each(function(){
    var src = $(this).find('img').attr('src');
    if (src) {
      images += 'https://www.alltrails.com' + src + '|';
    }
  });


  length = length.replace('Length: ', '').replace(' mi', '');

  row = title + ':' + date + ':' + length + ':' + type + ':' + url + ':' + images;

  content += row + "\n"
});

console.log(content);