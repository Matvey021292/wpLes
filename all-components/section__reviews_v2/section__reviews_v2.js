  $('.comments_slider').slick({
  	slidesToShow: 2,
  	slidesToScroll: 1,
  	autoplay: true,
  	autoplaySpeed: 2000,
  	dots: true,
  	infinite: true,
    arrows: false,
  	responsive: [
  	{
  		breakpoint: 1024,
  		settings: {
  			slidesToShow: 2,
  			slidesToScroll: 1
  		}
  	},
  	{
  		breakpoint: 800,
  		settings: {
  			slidesToShow: 1,
  			slidesToScroll: 1
  		}
  	}
    ]
});