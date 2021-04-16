function otysSelect(elements,options)
{
    var settings = $.extend( // Standard Settings
    {
        counter:false,
        flexible:true,
        mobileView:false,
        inputLabel:false,
        search:false,
        debug:false,
        standardLabel:'',
        version:1
    }, options);
    if(settings.counter == true) // Settings values for settings
    {
    	var Counter = ' count';
    	var counterSpan = '<span class="counter"/>';
    }else
    {
    	var Counter = '';
    	var counterSpan = '';
    }
	if(settings.flexible == true) // Settings values for settings
    {
    	var flexible = ' flexible';
    }else
    {
    	var flexible = '';
    }
	if(settings.mobileView == true) // Settings values for settings
    {
    	var mobileview = ' mobileView';
    }else
    {
    	var mobileview = '';
    }
	if(settings.search == true) // Settings values for settings
    {
    	var searchField = '<input type="text" class="search">';
    }else
    {
    	var searchField = '';
    }
	
	var version = settings.version;  

    if(settings.debug == true)
    {
    	console.log('Debug is on____________________________________')
    }
	var SelCount = 0; // Set element counter to 0
	$(elements).each(function() // Go trough each element
	{
		if(!$(this).is("select")) // Check if the element is a select
		{
	    	console.error('This is not a select: ' + $(this).attr('class'));
	  	}else
	  	{
	  		if($(this).attr('multiple') == 'multiple') // Check if select is single or multiple
	  		{
				$(this).wrap('<div class="otysSelect multiple version'+ version +'"/>');
	  		}else
	  		{
	  			$(this).wrap('<div class="otysSelect single version'+ version +'"/>');
	  		}
			$(this).hide(); // Hide the original select
			var OptCount = 0; // Set optioncounter to 0
			SelCount = SelCount + 1; // Count + 1 for each select element
			if(settings.debug == true){console.log('- Select with unique id: th' + SelCount + ' is created');}
			$('<div class="otysSelectInner' + Counter + flexible + mobileview +'"><div class="inputBox versionIB'+ version +' th' + version + SelCount + '"></div><div class="optionHolder optH' + version + SelCount + '">' + searchField + '<span class="closeMobView"></span></div>' + counterSpan + '</div>').insertAfter(this); // Creating the replacing divs
			if(settings.inputLabel == true) // Making the label for the select field based on settings
		    {
		    	var otysSelectOuterUnkown = $(this).parent().parent();
		    	var Title = otysSelectOuterUnkown.find('label').text();
		    	if(otysSelectOuterUnkown.prev().hasClass('actHWord'))
		    	{
		    		var Title = otysSelectOuterUnkown.prev().find('label').text();
		    		otysSelectOuterUnkown.prev().find('label').remove()
		    	}
		    	if(Title == ''){
					var Title = settings.standardLabel;
		    	}
		    	$(this).parent().parent('div').find('label').remove();
		    	$('.inputBox.th' + version + SelCount).html("<span class='selectTitle'>" + Title + "</span><span class='navArrow'></span><div class='selectedItems'></div>");
		    }
		    else{
	    		var Title = settings.standardLabel;
		    	$('.inputBox.th' + version + SelCount).html("<span class='selectTitle'>" + Title + "</span><span class='navArrow'></span><div class='selectedItems'></div>");
		    }
			var options = $(this).find('option'); // Add options bases on the options in the original
			$(options).each(function() // Go through each option
			{
				if(!$(this).is(':disabled')) // Add the option if it isn't disabled
				{
					OptCount = OptCount + 1; // Count + 1
					$(this).addClass('optNr' + version + SelCount + OptCount); // Ad a unique class per option
					var optValue = $(this).text(); // Get the option text
					var SelcT = $(this).attr('selected'); // Check for a already selected state
					if($(this).parent('optgroup').length){ // Check if opion is part of a optiongroup
						var lab = $(this).parent('optgroup').attr('label');
						var optGr = 'data="'+ lab +'"'; // Add optgroup name to the option
					}
					else{
						var optGr = ''
					}
					if(SelcT == 'selected') // If it's already selected add this class
					{
						$('<div class="option selected" '+optGr+' id="optNr'+ version + SelCount + OptCount + '">' + optValue  + '</div>').appendTo('.optionHolder.optH' + version + SelCount + '');
						addSelectItem('optNr' + version + SelCount + OptCount); // And also add the label
					}else
					{
						$('<div class="option" '+optGr+' id="optNr'+ version + SelCount + OptCount + '">' + optValue  + '</div>').appendTo('.optionHolder.optH' + version + SelCount + '');
					}
					if(settings.debug == true){console.log('---- Option with unique id: optNr' + version + SelCount + OptCount +' is created');}
				}
			});
			var arr = [];
			$(".option").each(function()
			{
				var attr = $(this).attr('data'); // Add a class to every first option of the group
				if (typeof attr !== typeof undefined && attr !== false) {
					var value = $(this).attr('data');
					if (arr.indexOf(value) == -1){
						arr.push(value);
						$(this).addClass("optGrFirst");
					}
				}
			});
		}
	});
	$('.optGrFirst').each(function()
	{
		var optgrName = $(this).attr('data');
		$('<div class="optgroupLabel">'+ optgrName +'</div>').insertBefore(this); // Add optgroup label to the otys select
		if(settings.debug == true){console.log('Optiongroup label: '+ optgrName +' is created');}
	});
	$('.otysSelect.multiple.version'+ version +' .otysSelectInner .option').click(function() // When a multiselect option is clicked
	{
		var OptNumb = $(this).attr('id');
		var Selected = $('option.' + OptNumb).attr('selected');
		if(Selected == 'selected') // If it's already selected we wan't to remove it
		{
			$('option.' + OptNumb).removeAttr('selected');
			$(this).removeClass('selected');
			removeSelectItem(OptNumb);
		}
		else // else we wan't to add it
		{
			$('option.' + OptNumb).attr('selected', 'selected'); // Add selected state to the original option
			$(this).addClass('selected'); // Add a class to the otysselect option
			addSelectItem(OptNumb); // Add a label etc in otysselect
			$('option.' + OptNumb).parent().trigger('change');
		}
	});
	$('.otysSelect.single.version'+ version +' .otysSelectInner .option').click(function() // When a singleselect option is clicked
	{
		var OptNumb = $(this).attr('id');
		var Selected = $('option.' + OptNumb).attr('selected');
		if(Selected == 'selected') // If it's already selected we wan't to remove it
		{
			$('option.' + OptNumb).removeAttr('selected');
			$(this).removeClass('selected');
			removeSelectItem(OptNumb);
		}
		else
		{
			var Sibs = $(this).siblings('.selected').attr('id'); // Other items in the select that are selected
			$('option.' + Sibs).removeAttr('selected');  // Remove the other selected state
			$(this).siblings('.selected').removeClass('selected'); // Remove the others selected classes
			$('option.' + OptNumb).attr('selected', 'selected'); // Add state selected to current
			$(this).addClass('selected'); // Add class selected to the replacement option
			removeSelectItem(Sibs); // Remove labels of other selected options
			addSelectItem(OptNumb); // Add label for current option
			var optionHolder = $('.optionHolder'); // Close the optionHolder because it's a single select
	        optionHolder.hide();
	        optionHolder.removeClass('open');
	        optionHolder.siblings('.inputBox').removeClass('subOpen');
	        $('option.' + OptNumb).parent().trigger('change');
		}
	});
	$('.inputBox.versionIB'+ version +'').mouseup(function(e)
	{
		if($(this).siblings('.optionHolder.open').length) // If the optionsholder is oepen
		{
			if (!$('.selectedItem').is(e.target))  // If we didn't click on a item toggle the option holder
		    {
				$(this).siblings('.optionHolder').toggle();
				$(this).siblings('.optionHolder').toggleClass('open');
				$(this).toggleClass('subOpen');
		    }
		}else
		{
			$('.optionHolder').removeClass('open'); // Close it
			$('.optionHolder').hide();
			$('.inputBox').removeClass('subOpen');
			$(this).siblings('.optionHolder').toggle();
			$(this).siblings('.optionHolder').toggleClass('open');
			$(this).toggleClass('subOpen');
			if(settings.search == true) // If search is enabled whe wan't to focus on the search field when opened the optionHolder
			{
	    		if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
				{
					$(this).siblings('.optionHolder').find(".search").focus();
				}
    		}
		}
	});
	$('.closeMobView').mouseup(function(e)
	{
		$('.optionHolder').removeClass('open'); // Close it
		$('.optionHolder').hide();
		$('.inputBox').removeClass('subOpen');
	});
	$(document).mouseup(function(e) // Close the optionHolder when clicking somewhere else
	{
    	var container = $(".optionHolder,.inputBox");
		var optionHolder = $('.optionHolder');
	    if (!container.is(e.target) && container.has(e.target).length === 0)
	    {
	        optionHolder.hide();
	        optionHolder.removeClass('open');
	        optionHolder.siblings('.inputBox').removeClass('subOpen');

	    }
	});
	if(settings.search == true) // If search is enabled
	{
		$(".search").keyup(function() // When a key is pressed while focusing on the search field
		{
			var searchEl = $(this);
			search(searchEl);
		});
		$('input.search').click(function() // When the field is clicked
		{
			$(this).val(''); // Empty it
			var searchEl = $(this);
			search(searchEl); // And research
		});
	}
    if(settings.debug == true)
    {
    	console.log('End of debug____________________________________')
    }
}
function search(element)
{
	var searchVal = $(element).val();
	var options = $(element).parent('.optionHolder');
	if(!searchVal == ''){ // If it isn't empty
		$(element).addClass('filled'); // Add a class
		$(options).find('.optgroupLabel').hide(); // Hide optgroup labels
	}else
	{
		$(element).removeClass('filled'); // If it is empty remove the class
		$(options).find('.optgroupLabel').show(); // Show again if there's no search query
	}
	$(options).find('.option').each(function() // Now look for a option that matches the search value
	{
		var ThisValue = $(this).text();
		var thisId = $(this).attr('id');
	    if (ThisValue.indexOf(searchVal)!=-1 || ThisValue.toLocaleLowerCase().indexOf(searchVal)!=-1)
	    {
	    	$(this).show(); // If it matches show the option
	    }
	    else{
	    	$(this).hide(); // Else hide it
	    }
	});
}
function addSelectItem(item)
{
	var otysSelectInput = $('#' + item).parentsUntil('.otysSelect');
	var inputBox = $(otysSelectInput).find('.selectedItems');
	var selectedOption = otysSelectInput.find('select option.' + item);
	var ItemName = $('#' + item).text();
	$('<div class="selectedItem" id="SI' + item + '">' + ItemName + '</div>').appendTo(inputBox); // Add a label to the otysSelect
	$(otysSelectInput).addClass('filled'); // Add a class that that the otysSelect is filled with options
	$('.otysSelect.multiple .selectedItem').click(function() // When a label is clicked
	{
		var ItemID = $(this).attr('id');
		var ItemToRemove = ItemID.substring(2);
		$('option.' + ItemToRemove).removeAttr('selected'); // Remove option attr selected
		$('#' + ItemToRemove).removeClass('selected'); // Remove class selected
		removeSelectItem(ItemToRemove); // Remove the item
	});
	reCountItems(otysSelectInput); // Recount all the items
}
function removeSelectItem(item)
{
	$('#SI' + item).remove(); // Remove the label
	var otysSelectInput = $('#' + item).parentsUntil('.otysSelect');
	if(!$(otysSelectInput).find('.optionHolder > .option.selected').length) // If there a no options selected
	{
		$(otysSelectInput).removeClass('filled');
		$(otysSelectInput).find('.optionHolder').removeClass('open');
		$(otysSelectInput).find('.optionHolder').hide();
		$(otysSelectInput).siblings('.inputBox').removeClass('subOpen');
	}
	reCountItems(otysSelectInput);
}
function reCountItems(element) // Recount all items that are selected
{
	var itemCount = 0;
	$(element).find('.option.selected').each(function()
	{
		itemCount = itemCount + 1;
		$(element).find('span.counter').text(itemCount);
	});
}
