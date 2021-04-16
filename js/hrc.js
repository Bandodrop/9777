function responsiveYoutubeFrames(){$('iframe[src*="youtube.com"]').each(function(){var t=$(this).attr("width")/$(this).attr("height"),i=$(this).parent().width();$(this).css({width:i+"px",height:i/t+"px"})})}
jQuery.fn.setAllToMaxHeight = function(){ this.css("height",""); return this.height( Math.max.apply(this, jQuery.map( this , function(e){ return jQuery(e).outerHeight() }) ) );}
function otysFile(e){$(e).each(function(){$(this).siblings("label").show(),$(this).wrap('<div class="fileInputHolder"/>');var i=$(this).parent(".fileInputHolder"),a=$(i).siblings("label").text();$('<div class="inputFile">'+a+"</div>").appendTo(i),$('<span class="remove"/>').prependTo(i);var e=$(i).find(".remove");""==$(this).val().replace(/C:\\fakepath\\/i,"")?$(i).addClass("empty"):$(i).removeClass("empty"),$(this).on("change",function(){var e=$(this).val().replace(/C:\\fakepath\\/i,"");""==e&&(e=a),$(i).find(".inputFile").text(e),""==$(this).val().replace(/C:\\fakepath\\/i,"")?$(i).addClass("empty"):$(i).removeClass("empty")}),$(e).on("click",function(){$(this).val(""),$(i).find(".inputFile").text(a),$(i).addClass("empty")})})}
function smartClick(theElement,theElementToIgnore,thePlaceToFindTheLink,threshold)
{
	if(thePlaceToFindTheLink == undefined){
		thePlaceToFindTheLink = 'a';
	}
	if(threshold == undefined){
		threshold = 4;
	}
	$(theElement).on('mousedown', function(e)
	{
    	$(this).data('p0', { x: e.pageX, y: e.pageY });
	}).on('mouseup', function(e)
	{
    	var p0 = $(this).data('p0'),
        p1 = { x: e.pageX, y: e.pageY },
        d = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
	    if (d < threshold)
	    {
			switch (event.which)
			{
				case 1:
					if(theElementToIgnore != undefined)
					{
						if(!$(theElementToIgnore).is(e.target)) 
						{
							Link = $(this).find(thePlaceToFindTheLink).eq(0).attr("href");
							window.location.href = (Link);
						}
					}else{
						Link = $(this).find(thePlaceToFindTheLink).eq(0).attr("href");
						window.location.href = (Link);
					}
				break;
				default:
			}
	    }
	})
}
$(document).ready(function()
{
	/*Selects*/
	otysSelect('select',
	{
		standardLabel: 'Selecteer een optie',
		search:false,
		flexible:false,
		inputLabel:true,
		counter:true
	});

	if(!$('#VO .actSROf .optionListContainer').length){
		$('#VO .actSRFacetCont.actSRFacetContJobs').css('opacity','0');
	}

	/*Files*/
	otysFile('input[type=file]');
	/*Menu*/
	$('.hamburger').click(function()
	{	
		$('body').toggleClass('menuOpen');
	});
    $('ul#hlb1 li').each(function(){
        if ( $(this).find('ul').length ){
            $(this).addClass('hasChildren');
        }
    });
    $('.toggleSub').click(function()
	{	
		$(this).parent().toggleClass('subOpen');
	});

    $('input[type=text], input[type=password], textarea').each(function()
	{
		var labelText = $(this).siblings('label').text();
		$(this).attr('placeholder',labelText);
		$(this).siblings('label').remove();
	});

	/*Replace a>strike stuff with an button*/
	$('s>a,strike>a').each(function()
	{
		var thisUrl = $(this).attr('href');
		var thisText = $(this).html();
		$(this).parent().replaceWith("<a href='"+ thisUrl +"' class='button JsCreated'>"+thisText+"</a>");
	});
	$('a>s,a>strike').each(function()
	{
		var thisUrl = $(this).parent().attr('href');
		var thisText = $(this).html();
		$(this).parent().replaceWith("<a href='"+ thisUrl +"' class='button JsCreated'>"+thisText+"</a>");
	});

	/*Standard busjabs append h1 to t10*/
	$('body:not(#AP) h1').appendTo('.standard #t10 .jsAppending');
	$('body:not(#AP) h1').appendTo('.Special #t10 .jsAppending');

	/*Click Vacancy*/

	smartClick('.itemContainer.actIc','.favorites_cookies div,.favorites_cookies input');


	/*If team detail than add class*/
	if($('.bisjabTeamDetail').length){
		$('body#CNT #main .wrapper').addClass('team-detail');
	}


	/*Responsive youtube videos*/
	responsiveYoutubeFrames();


	/*Home items*/
	$('.homeItem .toggle').click(function()
	{
		$(this).parent().toggleClass('open');	
	});  


	if ($(window).width() <= 768)
	{
		$('.col1.homeItems .row').slick({
			dots:true,
			arrows:false,
			autoplay:false,
			infinite:true,
			speed:500,
			slidesToShow:1,
			slidesToScroll:1,
			appendDots:'.slickDots'
		});   

	}
	else if ($(window).width() <= 991)
	{
		$('.col1.homeItems .row').slick({
			dots:true,
			arrows:false,
			autoplay:false,
			infinite:true,
			speed:500,
			slidesToShow:2,
			slidesToScroll:1,
			appendDots:'.slickDots'
		});   
	}

	/*Popular searches slick*/
	$('.bisjabHOME .itemsHolder').slick({
		dots: true,
		infinite:true,
		arrows:false,
		slidesToShow: 3,
		slidesToScroll:3,
		rows:2,
		responsive: [
		{
			breakpoint: 1200,
			settings:
			{
				slidesToShow: 2,
				slidesToScroll:2
			}
		},
		{
			breakpoint:767,
			settings:
			{
				slidesToShow:1,
				slidesToScroll:1
			}
		}
		]
	});

	$('.itemJobSmartAct').each(function(){
        if($(this).find('a').length)
        {
			$(this).addClass('url');
        }
    });
    $('.itemJobSmartAct.url').click(function()
	{
		Link = $(this).find("a").eq(0).attr("href");
		window.location.href = (Link);
	});


	/*Jobbannerhook slick*/
	$('.jobbannerslider').slick({
		dots: true,
		infinite:true,
		arrows:false,
		slidesToShow: 3,
		slidesToScroll:3,
		responsive: [
		{
			breakpoint: 1200,
			settings:
			{
				slidesToShow: 2,
				slidesToScroll:2
			}
		},
		{
			breakpoint: 600,
			settings:
			{
				slidesToShow:1,
				slidesToScroll:1
			}
		}
		]
	});




	/*Teaser 4 Shortlist*/
	$('.jslItemContainer[style*=Photo').css('background-image','url(../_images/shortlist/backup.jpg)');

	$("#t4 .jslOuter .hookItemTitle.jslFunctionName a").text(function(index,currentText){return currentText.substr(0,40)});
	$('#t4 .jslOuter').slick({
		dots:false,
		arrows:false,
		autoplay:false,
		infinite:true,
		speed:500,
		slidesToShow:4,
		slidesToScroll:1,
		responsive:[
			{
				breakpoint:1200,
				settings:
				{
					slidesToShow:3
				}
			},
			{
				breakpoint:769,
				settings:
				{
					slidesToShow:2
				}	
			},
			{
				breakpoint:620,
				settings:
				{
					slidesToShow: 1,
					dots:true
				}
			}
		]
	});

	/*T6 Slider*/
	if ($(window).width() <= 768)
	{
		$('#t6 > .sw > .row').slick({
			dots:true,
			arrows:false,
			autoplay:false,
			infinite:true,
			speed:500,
			slidesToShow:1,
			slidesToScroll:1
		});
	}



	/*Teaser 8 Logo's*/
	$('.teaser8Items').slick({
		dots:false,
		arrows:true,
		autoplay:true,
		infinite:true,
		speed:500,
		appendArrows:'.slick-arrows-custom',
		slidesToShow:5,
		slidesToScroll:1,
		responsive:[
			{
				breakpoint:1200,
				settings:
				{
					slidesToShow:4
				}
			},
			{
				breakpoint:769,
				settings:
				{
					slidesToShow:3
				}	
			},
			{
				breakpoint: 480,
				settings:
				{
					slidesToShow:1
				}
			}
		]
	});

	/*Teaser 11 - Append to jbd Right*/
	$('#t11').appendTo('.scroll-inner');

	/*Vacancy Results - Facets - Toggle*/
	$('.optionListTitle.facetListTitle').click(function()
	{	
		$(this).parent().toggleClass('facetOpen');
		$(this).parent().siblings().removeClass('facetOpen');
	});

	/*Vacancy Detail - Slide*/
	$('.relatedjobsSlider').slick({
		dots:true,
		arrows:true,
		autoplay:true,
		infinite:true,
		appendArrows:'.relatedArrows',
		speed:500,
		slidesToShow:3,
		slidesToScroll:2,
		responsive:[
			{
				breakpoint:991,
				settings:
				{
					slidesToShow:2
				}	
			},
			{
				breakpoint: 480,
				settings:
				{
					slidesToShow:1
				}
			}
		]
	});


	$('#productDetailPhotoSlider').slick({
		dots:true,
		arrows:false,
		autoplay:true,
		infinite:true,
		slidesToShow:1,
		slidesToScroll:1
	});

	/*Teaser 12*/
	$('.t12Items').slick({
		dots:true,
		arrows:false,
		autoplay:true,
		infinite:true,
		slidesToShow:4,
		slidesToScroll:4,
		responsive:[
			{
				breakpoint:991,
				settings:
				{
					slidesToShow:2,
					slidesToScroll:2
				}	
			},
			{
				breakpoint: 480,
				settings:
				{
					slidesToShow:1,
					slidesToScroll:1
				}
			}
		]
	});

	/*Vacancy Detail Navigation related jobs*/
	$('.relatedArrows').insertBefore('.rJhVOut ul.slick-dots');
	$('<div class="sncdRelatedArrows">').insertAfter('.rJhVOut ul.slick-dots');
	$('.relatedArrows button.slick-next.slick-arrow').appendTo('.sncdRelatedArrows');
	$('.relatedArrows,.sncdRelatedArrows,.rJhVOut ul.slick-dots').wrapAll('<div class="relatedNavigation"/>');

	/*Vacancy Detail Text navigation*/
	$('.jbdNav > .navItem').click(function()
	{	
		var goTo = $(this).attr('data');
		var element = $('h2.subHeader[data='+goTo+']');
		var pos = element.offset().top;
		var corPos = pos - 30;
		$('.activeNav').removeClass('activeNav');
		$(element).addClass('activeNav');
		$('html,body').animate({
		   scrollTop: corPos
		});
	});

	/*Person i mages slider*/

	
	$('.person-images-slider').slick({
		dots:true,
		arrows:false,
		autoplay:true,
		infinite:true,
		slidesToShow:1,
		slidesToScroll:1
	});


	/*Content - Content bisjab equal height*/
	$('section.secondRow .secondCol,section.secondRow .firstCol').setAllToMaxHeight();


	/*Content team detail*/
	$('.bisjabTeamDetail .socials .social').setAllToMaxHeight();

	/*Content Our team*/
	$('.teamMember .memberText').setAllToMaxHeight();

	/*Contact*/
	if ($(window).width() == 768)
	{
		$('section.contactRow1 .contactItem:nth-child(1),section.contactRow1 .contactItem:nth-child(2)').setAllToMaxHeight();
		$('section.contactRow2 .contactItem:nth-child(1),section.contactRow2 .contactItem:nth-child(2)').setAllToMaxHeight();
	}

	$('#VO h3.h2.itemTitle.actItemTitle').setAllToMaxHeight();


	/*Read more in jbd texts*/
	$('#VD .jobdetail-texts .text.jbdText').each(function()
	{
		var thisNumber = $(this).attr('data');
		var thisHeight = $(this).outerHeight();
		if(thisHeight > 300)
		{
			$(this).addClass('too-long');
			$('.read-more-button[data='+thisNumber+']').show();
		}
	});
	$('.read-more-button').click(function()
	{
		if($(this).hasClass("showing-more"))
		{
			var thisNumber = $(this).attr('data');
			$('#VD .text.jbdText[data='+thisNumber+']').removeClass('show-more');
			$(this).removeClass('showing-more');
			$(this).text('Read more');
		}else
		{
			var thisNumber = $(this).attr('data');
			$('#VD .text.jbdText[data='+thisNumber+']').addClass('show-more');
			$(this).addClass('showing-more');
			$(this).text('Read less');
		}
	});


	/*Arorw top top*/
	$('<img src="/_images/arrow-top.png" id="go-to-top">').appendTo('body');
	$('#go-to-top').click(function(){
		$("html, body").animate({ scrollTop: 0 }, "slow");
	});



	/*Add loaded class important do not remove*/
	$('body').addClass('loaded');


	/*Buckaroo payment fix*/
	
	if($('.outer.custOuter.recrowdOuter.rcwdRecrSetOuter').length){
		$('body').addClass('Buckaroo');
	}


});
$(window).load(function()
{
	/*Bisjab home - equal height*/
	if ($(window).width() <= 991)
	{
		$('.col1.homeItems').setAllToMaxHeight();
	}
	$('.col1.homeItems .itemIcon').setAllToMaxHeight();
	$('.col1.homeItems.contain .col-md-4').setAllToMaxHeight();

	/*Teaser 6 - Equal*/
	$('.t6Item h4').setAllToMaxHeight();
	$('.t6Item .text p:first-child').setAllToMaxHeight();
	$('#t6 .t6Item').setAllToMaxHeight();


	/*Joboverview*/
	$('.actSResultsCont .actSResContainer .col-md-4.col-sm-6').setAllToMaxHeight();

	/*Related jobs equal height*/
	$('#VD .hookItemTitle.rJhVIt').setAllToMaxHeight();


	/*Show search hook when loaded*/
	$('#t1 .t1Content .sw .row .col-lg-5,#t1 .t1Content .sw .row .col-lg-7').setAllToMaxHeight();
	$('#t1 .t1Content').addClass('loaded');

});
$(window).resize(function()
{
	/*Responsive youtube videos*/
	responsiveYoutubeFrames();

	$('.t6Item .text p:first-child,.t6Item h4,#t1 .t1Content .sw .row .col-lg-5,#t1 .t1Content .sw .row .col-lg-7,#VD .hookItemTitle.rJhVIt,#VO h3.h2.itemTitle.actItemTitle,.teamMember .memberText,section.secondRow .secondCol,section.secondRow .firstCol,#t6 .t6Item,.col1.homeItems .itemIcon,footer .col-md-5,footer .col-md-7').css('height','auto');

	/*Teaser 6 Equal*/
	$('.t6Item h4').setAllToMaxHeight();
	$('.t6Item .text p:first-child').setAllToMaxHeight();
	$('#t6 .t6Item').setAllToMaxHeight();

	/*Bisjab home - equal height*/
	$('.col1.homeItems .itemIcon').setAllToMaxHeight();

	/*Home Footer*/
	$('footer .col-md-5,footer .col-md-7').setAllToMaxHeight();
	
	/*Content Our team*/
	$('.teamMember .memberText').setAllToMaxHeight();

	/*Content content*/
	$('section.secondRow .secondCol,section.secondRow .firstCol').setAllToMaxHeight();

	/*Vacancyies equal height*/
	$('#VO h3.h2.itemTitle.actItemTitle').setAllToMaxHeight();

	/*Related jobs equal height*/
	$('#VD .hookItemTitle.rJhVIt').setAllToMaxHeight();

	/*Home search and text*/
	$('#t1 .t1Content .sw .row .col-lg-5,#t1 .t1Content .sw .row .col-lg-7').setAllToMaxHeight();

});
$(window).scroll(function (event) {
	var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
	if(scrollBottom <= 1000){
		$('.jbdNav').hide('slow');
	}
	else{
		$('.jbdNav').show('slow');
	}
});