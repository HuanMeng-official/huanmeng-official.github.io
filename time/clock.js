
var date = new Date();
//里面循环打印文字
!function miao_clock(){
	var miao_ul = document.getElementsByClassName("miao_ul")[0];
	for (let i = 1; i <= 60; i++) {
		var miao_ul_lis = document.createElement("li");
		miao_ul.appendChild(miao_ul_lis);
		miao_ul_lis.className = "miao_ul_lis";
	}
	var miao_ul_lis = document.getElementsByClassName('miao_ul_lis');
	
	for (let i = 0; i < miao_ul_lis.length; i++) {
		if (i < 10) {
			miao_ul_lis[i].innerHTML = "0"+(i)+"秒";
		}else{
			miao_ul_lis[i].innerHTML = (i)+"秒";
		}
		
	}
}()



!function fen_clock(){
	var fen_ul = document.getElementsByClassName("fen_ul")[0];
	var xnum = 360 / 60;
	for (let i = 1; i <= 60; i++) {
		var fen_ul_lis = document.createElement("li");
		fen_ul.appendChild(fen_ul_lis);
		fen_ul_lis.className = "fen_ul_lis";
	}
	var fen_ul_lis = document.getElementsByClassName('fen_ul_lis');
	
	for (let i = 0; i < fen_ul_lis.length; i++) {
		if (i < 10) {
			fen_ul_lis[i].innerHTML = "0"+(i)+"分";
		}else{
			fen_ul_lis[i].innerHTML = (i)+"分";
		}
	}
	
}()

!function shi_clock(){
	var shi_ul = document.getElementsByClassName("shi_ul")[0];
	var xnum = 360 / 24;
	for (let i = 1; i <= 24; i++) {
		var shi_ul_lis = document.createElement("li");
		shi_ul.appendChild(shi_ul_lis);
		shi_ul_lis.className = "shi_ul_lis";
	}
	var shi_ul_lis = document.getElementsByClassName('shi_ul_lis');
	
	for (let i = 0; i < shi_ul_lis.length; i++) {
		if(i < 10){
			shi_ul_lis[i].innerHTML = "0"+(i)+"点";
		}else{
			shi_ul_lis[i].innerHTML = (i)+"点";
		}
		
	}
	// up：爱写代码的北梦制作
	
}()


!function ri_clock(){
	var ri_ul = document.getElementsByClassName("ri_ul")[0];
	var xnum = 360 / 31;
	for (let i = 1; i <= 31; i++) {
		var ri_ul_lis = document.createElement("li");
		ri_ul.appendChild(ri_ul_lis);
		ri_ul_lis.className = "ri_ul_lis";
	}
	var ri_ul_lis = document.getElementsByClassName('ri_ul_lis');
	
	for (let i = 0; i < ri_ul_lis.length; i++) {
		if (i < 10) {
			ri_ul_lis[i].innerHTML = "0"+(i+1)+"日";
		}else{
			ri_ul_lis[i].innerHTML = (i+1)+"日";
		}
		
	}
	
}()


!function yue_clock(){
	var yue_ul = document.getElementsByClassName("yue_ul")[0];
	var xnum = 360 / 12;
	for (let i = 1; i <= 12; i++) {
		var yue_ul_lis = document.createElement("li");
		yue_ul.appendChild(yue_ul_lis);
		yue_ul_lis.className = "yue_ul_lis";
	}
	var yue_ul_lis = document.getElementsByClassName('yue_ul_lis');
	
	for (let i = 0; i < yue_ul_lis.length; i++) {
		if (i < 10) {
			yue_ul_lis[i].innerHTML = "0"+(i+1)+"月";
		}else{
			yue_ul_lis[i].innerHTML = (i+1)+"月";
		}
		// up：爱写代码的北梦制作
	}
}()

var yueTian = 0;

var nian = date.getFullYear();
for (let i = 1; i <= 12; i++) {
	if (i == 1 ||i == 3 ||i == 5 ||i == 7 ||i == 8 ||i == 10 ||i == 12) {
		yueTian = 31;
	}else if(i == 4 ||i == 6 ||i == 9 ||i == 11){
		yueTian = 30;
	}else{
		if ((nian % 4 == 0 && nian % 100 != 0)||(nian % 400 == 0)) {
			yueTian = 29;
		}else{
			yueTian = 28;
		}
		// up：爱写代码的北梦制作
	}
}
	
//从旋转0到旋转360，平均分，使用360品均分每一个大小，循环打印度数
//页面加载之后运行
!function (){
	var miao_ul_lis = document.getElementsByClassName("miao_ul_lis");
	var fen_ul_lis = document.getElementsByClassName("fen_ul_lis");
	var shi_ul_lis = document.getElementsByClassName("shi_ul_lis");
	var ri_ul_lis = document.getElementsByClassName("ri_ul_lis");
	var yue_ul_lis = document.getElementsByClassName("yue_ul_lis");
	var xnum1 = 360 / 60;
	var xnum2 = 360 / 60;
	var xnum3 = 360 / 24;
	var xnum4 = 360 / yueTian;
	var xnum5 = 360 / 12;
	setTimeout(function (){
		for (let i = 0; i < miao_ul_lis.length; i++) {
			miao_ul_lis[i].style.transform = "rotate(-"+(i * xnum1 )+"deg)";
		}
	},5500);
	setTimeout(function (){
		for (let i = 0; i < fen_ul_lis.length; i++) {
			fen_ul_lis[i].style.transform = "rotate(-"+(i * xnum2)+"deg)";
		}
	},4500);
	setTimeout(function (){
		for (let i = 0; i < shi_ul_lis.length; i++) {
			shi_ul_lis[i].style.transform = "rotate(-"+(i * xnum3)+"deg)";
		}
	},3500);
	setTimeout(function (){
		for (let i = 0; i < ri_ul_lis.length; i++) {
			ri_ul_lis[i].style.transform = "rotate(-"+(i * xnum4)+"deg)";
		}
	},2500);
	setTimeout(function (){
		for (let i = 0; i <yue_ul_lis.length; i++) {
			yue_ul_lis[i].style.transform = "rotate(-"+(i * xnum5)+"deg)";
		}
	},1000);
}()


setTimeout(function (){
	//调用每秒循环调用一次
	setInterval(function (){
		var nian_out = document.getElementsByClassName('nian')[0];
		var date = new Date();
		var nian = date.getFullYear();
		nian_out.innerHTML = nian+"年";
	},1000);
	setInterval(function (){
		var miao_out = document.getElementsByClassName('miao_ul')[0];
		var date = new Date();
		var miao = date.getSeconds();
		var miao_ul = document.getElementsByClassName('miao_ul_lis');
		for (let i = 0; i < miao_ul.length; i++) {
			miao_ul[i].style.color = "";
		}
		var xnum = (360 / 60) * miao;
		if(miao == 0){
			xnum = 0;
			miao_out.style.transition = 'all,0s ';
		}else{
			miao_out.style.transition = 'all,1s linear';
		}
		miao_ul[miao].style.color = "red";
		miao_out.style.transform = "rotate("+xnum+"deg)";
	},1000);
	setInterval(function (){
		var fen_out = document.getElementsByClassName('fen_ul')[0];
		var date = new Date();
		var fen = date.getMinutes();
		var xnum = (360 / 60) * fen;
		var fen_ul = document.getElementsByClassName('fen_ul_lis');
		for (let i = 0; i < fen_ul.length; i++) {
			fen_ul[i].style.color = "";
		}
		if(fen == 0){
			xnum = 0;
			fen_out.style.transition = 'all,0s ';
		}else{
			fen_out.style.transition = 'all,1s linear';
		}
		fen_ul[fen].style.color = "red";
		fen_out.style.transform = "rotate("+xnum+"deg)";
	},1000);
	setInterval(function (){
		var ri_out = document.getElementsByClassName('ri_ul')[0];
		var date = new Date();
		var ri = date.getDate()-1;
		var xnum = (360 / yueTian) * ri;
		var ri_ul = document.getElementsByClassName('ri_ul_lis');
		for (let i = 0; i < ri_ul.length; i++) {
			ri_ul[i].style.color = "";
		}
		if(ri == 0){
			xnum = 0;
			ri_out.style.transition = 'all,0s ';
		}else{
			ri_out.style.transition = 'all,1s linear';
		}
		ri_ul[ri].style.color = "red";
		ri_out.style.transform = "rotate("+xnum+"deg)";
	},1000);
	setInterval(function (){
		var shi_out = document.getElementsByClassName('shi_ul')[0];
		var date = new Date();
		var shi = date.getHours();
		var xnum = (360 / 24) * shi;
		var shi_ul = document.getElementsByClassName('shi_ul_lis');
		for (let i = 0; i < shi_ul.length; i++) {
			shi_ul[i].style.color = "";
		}
		if(shi == 0){
			xnum = 0;
			shi_out.style.transition = 'all,0s ';
		}else{
			shi_out.style.transition = 'all,1s linear';
		}
		shi_ul[shi].style.color = "red";
		shi_out.style.transform = "rotate("+xnum+"deg)";
	},1000);
	setInterval(function (){
		var yue_out = document.getElementsByClassName('yue_ul')[0];
		var date = new Date();
		var yue = date.getMonth();
		var xnum = (360 / 12) * yue;
		var yue_ul = document.getElementsByClassName('yue_ul_lis');
		for (let i = 0; i < yue_ul.length; i++) {
			yue_ul[i].style.color = "";
		}
		if(yue == 0){
			xnum = 0;
			yue_out.style.transition = 'all,0s ';
		}else{
			yue_out.style.transition = 'all,1s linear';
		}
		yue_ul[yue].style.color = "red";
		yue_out.style.transform = "rotate("+xnum+"deg)";
	},1000);
	//等前面动画过度完之后调用整个方法
},1000*6);







