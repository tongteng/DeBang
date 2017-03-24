var Data = (function() {
	var result;
	$.ajax({
		url: 'style/work.txt',
		type: 'get',
		data: {},
		async:false,
		crossDomain: true,
		dataType: 'json',
		success: function(data) {
			result = data;
			console.log(result);
		}
	})
	return result;
}());

var Info = Data[0];
var $divinfo = '.info0';

$('.navigation_title ul li').on('click', function() {
	$('.navigation_title ul li').removeClass('active');
	$(this).addClass('active');
	$('.content_list div').css({'display': 'none'})
						  .eq($(this).index())
						  .css({'display': 'block'});
	$('.' + obj.id).html('');
	Info = Data[$(this).index()];
	obj.id = 'wrapper' + $(this).index();
	obj.nowNum = 1;
	obj.allNum = Math.ceil(Info.length / 10);
	$divinfo = '.info' + $(this).index();
	createPage(obj);
});




function createPage(json) {
	var id = json.id;
	var $Div = $('.' + id);
	var nowNum = json.nowNum;
	var allNum = json.allNum;
	
	if(allNum > 1){
		//首页
		if(nowNum > 3) {
			$('<a></a>').attr('href', '#' + 1)
						.html('首页')
						.addClass('edgepage')
						.appendTo($Div);
		}

		//上一页
		if(nowNum !== 1) {
			$('<a></a>').attr('href', '#' + (nowNum - 1))
						.html('上一页')
						.addClass('changepage')
						.appendTo($Div);
		}


		if(allNum <= 5) {
			for(var i = 1; i <= allNum; i ++) {
				if(i === nowNum) {
					$('<a></a>').attr('href', '#' + i)
							.html(i)
							.addClass('nowpage')
							.appendTo($Div);
				}else{
					$('<a></a>').attr('href', '#' + i)
							.html(i)
							.appendTo($Div);
				}
			}
		}else {
			if(nowNum < 3) {
				for(var i = 1; i <= 5; i ++) {
					if(i === nowNum) {
						$('<a></a>').attr('href', '#' + i)
								.html(i)
								.addClass('nowpage')
								.appendTo($Div);
					}else {
						$('<a></a>').attr('href', '#' + i)
								.html(i)
								.appendTo($Div);
					}
				}
			}else if(allNum - nowNum < 2) {
				for(var i = 1; i <= 5; i ++) {
					if(allNum - 5 + i === nowNum) {
						$('<a></a>').attr('href', '#' + (allNum - 5 + i))
								.html(allNum - 5 + i)
								.addClass('nowpage')
								.appendTo($Div);
					}else {
						$('<a></a>').attr('href', '#' + (allNum - 5 + i))
								.html(allNum - 5 + i)
								.appendTo($Div);
					}
				}
			}else {
				for(var i = 1; i <= 5; i ++) {
					if(i === 3) {
						$('<a></a>').attr('href', '#' + (nowNum - 3 + i))
								.html(nowNum - 3 + i)
								.addClass('nowpage')
								.appendTo($Div);
					}else{
						$('<a></a>').attr('href', '#' + (nowNum - 3 + i))
								.html(nowNum - 3 + i)
								.appendTo($Div);
					}
				}
			}
		}

		//下一页
		if(nowNum !== allNum) {
			$('<a></a>').attr('href', '#' + (nowNum + 1))
						.html('下一页')
						.addClass('changepage')
						.appendTo($Div);
		}

		//尾页
		if(nowNum <= (allNum - 3)) {
			$('<a></a>').attr('href', '#' + allNum)
						.html('尾页')
						.addClass('changepage')
						.appendTo($Div);
		}
	}

		var len  = $('a').length;
		for(var i = 0; i < len; i ++) {
			$('a').eq(i)
				  .on('click', function() {
				  	var nowNum = parseInt($(this).attr('href').substring(1));
				  	obj.nowNum = nowNum;
				  	$('.' + id).html('');
				  	createPage(obj);
				  })
		}
		json.callBack(nowNum, allNum);
}

var obj = {
	id: 'wrapper0',
	nowNum: 1,
	allNum: Math.ceil(Info.length / 10),
	callBack: function(now, all) {

		if($('.content_list ' + $divinfo + ' ul')){
			$('.content_list ' + $divinfo + ' ul').remove();
		}
		var num = now * 10 < Info.length ? 10 : Info.length % 10;
		for(var i = 0; i < num; i ++) {
			$('<ul></ul>').appendTo($('.content_list ' + $divinfo));
			for(var j = 0; j < 6; j ++) {
				$('<li></li>').html(Info[10 * (now - 1) + i][j])
							  .appendTo($('.content_list ' + $divinfo + ' ul').eq(i));
			}
		}

		for(var q = 0; q < num; q ++) {
			$('.content_list ' + $divinfo + ' ul').eq(q)
									 .children()
											.eq(0)
											.addClass('spl')
											.end()
											.eq(1)
											.addClass('spl1')
											.end()
											.eq(2)
											.addClass('splm')
											.end()
											.eq(3)
											.addClass('splw')
											.end()
											.eq(4)
											.addClass('spls')
											.end()
											.eq(5)
											.addClass('data');
		}


		
	}
}
createPage(obj);



var oLi = $('.crousel_wrapper .move');
var index = 0;
var flag = true;
var timer = null;

var init = function() {
	oLi.css({'left': '1190px', 'height': '100px', 'top': '50%', 'margin-top': '-50px', 'opacity': '0', 'z-index': '1'});

	oLi.eq(0).css({'left': '0px', 'width': '530px', 'height': '224px', 'top': '50%', 'margin-top': '-112px', 'opacity': '0.6'});
	oLi.eq(1).css({'left': '275px', 'width': '640px', 'height': '270px', 'top': '50%', 'margin-top': '-135px', 'opacity': '1', 'z-index': '100'});
	oLi.eq(2).css({'left': '660px', 'width': '530px', 'height': '224px', 'top': '50%', 'margin-top': '-112px', 'opacity': '0.6'});	
}

init();


var leftMove = function() {
	if(flag){
		flag = false;
		oLi.css({'z-index': '1'});
		oLi.eq( (index + 2) % 7 ).css({'z-index': '100'});
		oLi.eq( (index) % 7 ).animate({'left': '-530px', 'width': '530px', 'height': '100px', 'top': '50%', 'margin-top': '-50px', 'opacity': '0', 'z-index': '1'})
		oLi.eq( (index + 1) % 7 ).animate({'left': '0px', 'width': '530px', 'height': '224px', 'top': '50%', 'margin-top': '-112px', 'opacity': '0.6'});
		oLi.eq( (index + 2) % 7 ).animate({'left': '275px', 'width': '640px', 'height': '270px', 'top': '50%', 'margin-top': '-135px', 'opacity': '1'});
		oLi.eq( (index + 3) % 7 ).css({'left': '1190px', 'opacity': '0.4'})
								 .animate({'left': '660px', 'width': '530px', 'height': '224px', 'top': '50%', 'margin-top': '-112px', 'opacity': '0.6'}, function(){
			index ++;
			flag = true;
		});
	}	
}


var rightMove = function() {
	if(flag) {
		flag = false;
		oLi.css({'z-index': '1'});
		oLi.eq( index % 7 ).css({'z-index': '100'});
		oLi.eq( (index - 1) % 7 ).css({'left': '-530px', 'opacity': '0.6'})
								 .animate({'left': '0px', 'width': '530px', 'height': '224px', 'top': '50%', 'margin-top': '-112px', 'opacity': '0.6'});
		oLi.eq( index % 7 ).animate({'left': '275px', 'width': '640px', 'height': '270px', 'top': '50%', 'margin-top': '-135px', 'opacity': '1'});
		oLi.eq( (index + 1) % 7 ).animate({'left': '660px', 'width': '530px', 'height': '224px', 'top': '50%', 'margin-top': '-112px', 'opacity': '0.6'});
		oLi.eq( (index + 2) % 7 ).animate({'left': '1190px', 'width': '530px', 'height': '100px', 'top': '50%', 'margin-top': '-50px', 'opacity': '0', 'z-index': '1'}, function() {
			index --;
			flag = true;
		})

	}
}

timer = setInterval(leftMove, 2000);

$('.left').on('click', function() {
	rightMove();
})

$('.right').on('click', function() {
	leftMove();
})

$('.wrapper').on('mousemove', function() {
	clearInterval(timer);
})

$('.wrapper').on('mouseout', function() {
	timer = setInterval(leftMove, 3500);
})






