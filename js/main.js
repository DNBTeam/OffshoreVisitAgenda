jQuery(document).ready(function($){
	var timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) 
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
var now = new Date();

var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
var source   = $("#agendaTemplate").html();
var template = Handlebars.compile(source);
var agendaDetails;
$('#myDate').val(today);




function getAgendaDetails() {
	//var url = './json/'+date+'.json';
	/*var url = './json/agenda.json';
	$.ajax(url, {
      success: function(res) {
		agendaDetails = res;
		setAgendaDetails(today);
      },
      error: function() {
        alert('error')
      }
   });
   */
 $.getJSON("./json/agenda.json", function(res) {
   		agendaDetails = res;
		setAgendaDetails(today);
});  
   
   
   
}

function setAgendaDetails(date) {
	//var context = JSON.parse(agendaDetails)[date];
	var context = agendaDetails[date];
	var html    = template(context);
	$('.agendaWrapper').empty();
	$('.agendaWrapper').append(html);
}

getAgendaDetails();

$('#myDate').change(function() {
    var date = $(this).val();
    setAgendaDetails(date);
});



});
