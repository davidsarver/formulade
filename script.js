//players = 0;
removed = new Array();
svgGear = new Array();

function playe() {
	var playerOrder = new Array("Nothing");
	this.displayed = new Array();
	this.active = 0;
	
	this.count = function(){
		return playerOrder.length-1;
	}
	
	//takes a number and removes that player from the playerOrder array
	this.remove = function(player){
		elem=playerOrder.splice(playerOrder.indexOf(twoDec(player)),1);
		//if(playerOrder.indexOf(twoDec(player))!=-1){
		//	console.log("Removed the wrong playerOrder element\nWanted to remove: "+twoDec(player)+" Removed: "+elem[0]);
		//}
	}
	
	//takes a number and returns the index or place/order of the player
	//searches the playerOrder array for the twoDec(player) string.
	this.getPlace = function(player){
		//console.log(twoDec(player));
		return playerOrder.indexOf(twoDec(player));
	}
	
	//getter
	this.last = function(){
		return playerOrder[playerOrder.length-1];
	}
	
	//
	this.lastPlace = function(){
		return this.count();
	}
	
	//takes a number and adds it to the end of the playerOrder array
	this.add = function(player){
		playerOrder[playerOrder.length]=twoDec(player);
	}
	
	this.setPlace = function(player,place){
		var displaced = playerOrder[place];
		var oldPlace = this.getPlace(player);
		playerOrder[place]=player;
		playerOrder[oldPlace] = displaced;
	}
	
	this.getPlayer = function(place){
		return playerOrder[place];
	}
};
var Players = new playe();

function roll(element, high, low, but){
	range =Number(high)-Number(low)+1;
	//console.log("low:"+low+" high:"+high+" range:"+range+" before floor:"+((Math.random()*Number(range))+Number(low)));
	element.value=Math.floor((Math.random()*Number(range))+Number(low));
	flash(element, but);
}

function add(source, dest, but){
	var par1=par(source);
	dest.value=Number(source.value)+Number(dest.value);
	flash(dest, but);
}

function rolladd(source, dest, high, low, but){
	roll(source, high, low, but);
	add(source, dest, but);
}

function iter(source){
	var par1=par(source);
	var iter= document.getElementById("iteration"+par1);
	iter.innerHTML=Number(iter.innerHTML)+1;
}

function flash(element, but){
	but.disabled=true;  // style.backgroundColor="#000000";
	window.setTimeout(function(){flashB(element, but)},500);
	element.style.backgroundColor="#A8EFFF";
}

function flashB(element, but){
	but.disabled=false;
	element.style.backgroundColor="#FFFFFF";
}

function twoDec(num){
	if (Number(num)<10){
		return "0" + Number(num);
	}else return String(num);
}

function removePlayer(num){
	//if (Players.count()+1!=Number(num)){
		removed[removed.length] = Number(num);
		removed.sort(function(a,b){return a-b});
	//}
	//console.log(Players.count()+" "+removed);
	//console.log(Players.count());
	var container=document.getElementById("container");
	var player=document.getElementById("_"+twoDec(num));
	container.removeChild(player);
	
	var parent = document.getElementById("tabcontainer");
	var child = document.getElementById("playertab"+twoDec(num));
	parent.removeChild(child);
	
	Players.remove(num);
	
	sizer(-1);
	coverShow(Players.last());
}

function newPlayer(){
	var player = Players.count()+1;
	if (removed.length>0){
		player = Number(removed.shift());
	}
	newElement= document.getElementById('_00').cloneNode(true);
	newElement.id="_"+twoDec(player);
	document.getElementById('container').appendChild(newElement);
	children=document.getElementById("_"+twoDec(player)).childNodes;
	child=document.getElementById("_"+twoDec(player)).firstChild;

	newElement= document.getElementById('playertab00').cloneNode(true);
	newElement.id= "playertab"+twoDec(player);
	document.getElementById('tabcontainer').appendChild(newElement);
	document.getElementById('playertab'+twoDec(player)).firstChild.href="#_"+twoDec(player);
	document.getElementById('playertab'+twoDec(player)).firstChild.innerHTML="Player "+player;
	
	var all = document.getElementById("_"+twoDec(player)).getElementsByTagName('*');
	for (var i = -1, l = all.length; ++i < l;) {
		child=all[i];
		//console.log(child.tagName);
		if (child.tagName=="radialGradient"){continue;}
		if (child.tagName=="circle"&&child.id.substring(0,3)=='peg'){child.addEventListener('click', color)};
		if(typeof(child.id)=="undefined"||child.id==""){//TODO redo this ifelse
		}else{
			//console.log(child.id);
			//console.log(child.id.substring(4,5));
			child.id=(child.id.substring(0,child.id.length-2) + twoDec(player));
			if(child.id=="name"+twoDec(player)){
				child.value="name";
			}else if(child.id.substring(0,3)=='peg'){
				//console.log(child.id.substring(3,4)+" "+child.id.substring(4,6)+" "+document.getElementById('wp'+child.id.substring(3,4)+'Val').innerHTML);
				if(Number(child.id.substring(4,6))>document.getElementById('wp'+child.id.substring(3,4)+'Val').innerHTML){
					child.parentNode.removeChild(child);
					l--;
					i--;
				}
			}
			
			
		}
		cfor= child.getAttribute("for");
		//console.log(cfor);
		if(typeof(cfor)=="undefined"||cfor==""||cfor==null){
			//child=child.nextSibling;
			//continue;
		}else{
			child.setAttribute("for",(cfor.substring(0,cfor.length-2) + twoDec(player)));}
		cname=child.getAttribute("name");
		if(typeof(cname)=="undefined"||cname==""||cname==null){
			//child=child.nextSibling;
			//continue;
		}else{
			child.setAttribute("name",(cname.substring(0,cname.length-2) + twoDec(player)));}
		//child=child.nextSibling;
	}

	document.getElementById('playerid'+twoDec(player)).innerHTML="Player "+player;
	Players.add(player);
	//console.log('playerid'+twoDec(player));
	reset(player);
	sizer(-1);//sizer calls coverShow();
}

function reset(num){
	//element=document.getElementById(twoDec(num));
	//console.log("_"+twoDec(num));
	child=document.getElementById("_"+twoDec(num)).firstChild;
	while(child != null){
	//console.log(child.id);
		if(child.nodeType==1&&child.tagName=="SELECT"){
			//console.log(child.tagName+" "+child.value);
			child.options[0]=new Option("1", "0102", false, false);
			child.value="0102";
			gear(child);
		} 
		if(child.nodeType!=1||child.tagName!="INPUT"||child.getAttribute("type")!="text"||child.id=="name"+twoDec(num)){
			child=child.nextSibling;
			continue;
		}
		
		child.value=document.getElementById(child.id.substring(0,child.id.length-2)+"00").value;
		
		child=child.nextSibling;
	}
}

function gear(element, x, y, num){
	var par1=par(element);
	if(element.disabled){
		return false;
	}
	//console.log(element.disabled);
	var current=document.getElementById("currentGear"+par1);
	var label=document.getElementById('gearlab'+par1);
	var next=document.getElementById('nextGear'+par1);
	//console.log(element.value);
	switch(Number(element.value)){
		case 102:
			current.innerHTML="Current gear is: 1st"
			label.innerHTML="1st Gear Result";
			element.options.length=0;
			element.options[0]=new Option("1", "0102", true, true);
			element.options[1]=new Option("2", "0204", false, false);
			break;
		case 204:
			label.innerHTML="2nd Gear Result";
			current.innerHTML="Current gear is: 2nd"
			element.options.length=0;
			element.options[0]=new Option("1", "0102", false, false);
			element.options[1]=new Option("2", "0204", true, true);
			element.options[2]=new Option("3", "0408", false, false);
			break;
		case 408:
			label.innerHTML="3rd Gear Result";
			current.innerHTML="Current gear is: 3rd"
			element.options.length=0;
			element.options[0]=new Option("1", "0102", false, false);
			element.options[0].style.backgroundColor="#450000";
			element.options[1]=new Option("2", "0204", false, false);
			element.options[2]=new Option("3", "0408", true, true);
			element.options[3]=new Option("4", "0712", false, false);
			break;
		case 712:
			label.innerHTML="4th Gear Result";
			current.innerHTML="Current gear is: 4th"
			element.options.length=0;
			element.options[0]=new Option("1", "0102", false, false);
			element.options[0].style.backgroundColor="#8C0000";
			element.options[1]=new Option("2", "0204", false, false);
			element.options[1].style.backgroundColor="#450000";
			element.options[2]=new Option("3", "0408", false, false);
			element.options[3]=new Option("4", "0712", true, true);
			element.options[4]=new Option("5", "1120", false, false);
			break;
		case 1120:
			label.innerHTML="5th Gear Result";
			current.innerHTML="Current gear is: 5th"
			element.options.length=0;
			element.options[0]=new Option("1", "0102", false, false);
			element.options[0].style.backgroundColor="#CF0000";
			element.options[1]=new Option("2", "0204", false, false);
			element.options[1].style.backgroundColor="#8C0000";
			element.options[2]=new Option("3", "0408", false, false);
			element.options[2].style.backgroundColor="#450000";
			element.options[3]=new Option("4", "0712", false, false);
			element.options[4]=new Option("5", "1120", true, true);
			element.options[5]=new Option("6", "2130", false, false);
			break;
		case 2130:
			label.innerHTML="6th Gear Result";
			current.innerHTML="Current gear is: 6th"
			element.options.length=0;
			element.options[0]=new Option("2", "0204", false, false);
			element.options[0].style.backgroundColor="#CF0000";
			element.options[1]=new Option("3", "0408", false, false);
			element.options[1].style.backgroundColor="#8C0000";
			element.options[2]=new Option("4", "0712", false, false);
			element.options[2].style.backgroundColor="#450000";
			element.options[3]=new Option("5", "1120", false, false);
			element.options[4]=new Option("6", "2130", true, true);
			break;
		default:
			alert("broken");
			break;
	}
	
	if(arguments.length>1){
		var gear = document.getElementById("gear"+par1);
		var allowed=false;
		var children = element.getElementsByTagName('OPTION');
		var child;
		for (var i = -1, l = children.length; ++i < l;) {
			child=children[i];
			if(child.innerHTML==num){
				allowed=true;
				break;
			}
		}
		if(allowed){
			svgGear[Number(par1)]=num;
			next.innerHTML=ordinate(num);
			gear.setAttribute("cx",x);
			gear.setAttribute("cy",y);
			var color=child.style.backgroundColor;
			document.getElementById('gearcen'+par1).style.fill=color;
			document.getElementById('geartop'+par1).style.fill=color;
			document.getElementById('gearbot'+par1).style.fill=color;
		}
	}
}

function select(player, displayValue){
	player=Number(player);
	selectTag=document.getElementById("select"+twoDec(player));
    var options = selectTag.getElementsByTagName('option');
    for(var i = 0; i < options.length; i++){
        if(options[i].textContent == displayValue)
        {
            options[i].selected = true;
            break;
        }
	}
	selectTag.onchange();
	selectTag.setAttribute("disabled", "true");
	//document.getElementById('buttonRemove').removeAttribute("disabled");
}

function par(element){
	var par = element.parentNode.id.substring(1,3);
	//console.log(par1);
	return par;
}

function namer(element,eventType){
	var player = par(element);
	console.log('name'+player+"."+'playerid'+player);
	if(element.tagName=="LABEL"){
		$(element).css('display','none');
		$('#name'+player).show().css('display','inline-block').select();
		return;
	}
	if(eventType=='change'){
		document.getElementById("sort"+player).innerHTML=element.value;
		document.getElementById("playerid"+player).innerHTML=element.value;
		document.getElementById("playertab"+player).firstChild.innerHTML=element.value;
	}
	$(element).hide();
	$('#playerid'+player).show();
	sizer(player);
}

$(function() {
    $( "#container" ).tabs();
	//$("#tabcontainer").sortable({placeholder: "ui-state-highlight"}).disableSelection();
 
    // fix the classes
    $( ".ui-tabs-nav" )
      .removeClass( "ui-corner-all ui-corner-top" )
      .addClass( "ui-corner-bottom" );
 
    // move the nav to the bottom//doesn't need to happen at beginning since there are no playerPanels
    //$( ".tabs-bottom .ui-tabs-nav" ).appendTo( ".tabs-bottom" );
	
	//fix classes for playerPanels
	$('.playerPanel').removeClass('ui-corner-bottom').addClass('ui-corner-top');
  });

function ordinate(num){
	
    last = num.toString().slice(-1),
    ord = '';
	if(num>10 && num<14){ord = 'th';
	}else{
    switch (last) {
        case '1':
            ord = 'st';
            break;
        case '2':
            ord = 'nd';
            break;
        case '3':
            ord = 'rd';
            break;
        default:
            ord = 'th';
            break;
    }
	}
    return num.toString() + ord;
};

function order(){
	try{
		$("#tabcontainer").sortable("destroy");
		document.getElementById('order').innerHTML='Enable Order';
	}catch(err){
		$("#tabcontainer").sortable({placeholder: "ui-state-highlight"}).disableSelection;
		document.getElementById('order').innerHTML='Set Order';
		return;
	}
		

	var tabCan=document.getElementById("tabcontainer");
	var dashCan=document.getElementById("container");
	var child=tabcontainer.firstChild;//sortable.firstChild;
	var tabName="";
	var dashName="";
	var tab, dash;
	
	var i=0;
	while(child!=null){
		if(child.nodeType!=1||child.id=="order"){
			child=child.nextSibling;
			continue;
		}
		//alert(child.tagName);
		Players.setPlace(child.id.substring(9,11),i);
		//tabName="playertab"+Players.getPlayer(i);
		//alert(string);
		//tab=tabCan.removeChild(document.getElementById(tabName));
		//tabCan.appendChild(tab);
		
		dashName="_"+Players.getPlayer(i);
		//console.log(child.id);
		dash=dashCan.removeChild(document.getElementById(dashName));
		dashCan.appendChild(dash);
		
		i++;
		child=child.nextSibling;
	}

	sizer(1);
	coverShow(1);
}

function nextPlayer(cur){
	child=document.getElementById("_"+cur);
	//console.log(child.id.substring(1,3));
	//console.log(current.parentNode.nextSibling.nextSibling.nodeType+current.parentNode.nextSibling.nextSibling.tagName);
	do{
		if(child.nodeType!=1||child.tagName!="DIV"){
			child=child.nextSibling;
			continue;
		}
		child=child.nextSibling;
	}while(child!=null&&child.tagName!="DIV")
	//console.log(child.id.substring(1,3));
	return child;
}

function enable(player){
	//console.log(player);
	var all = document.getElementById("_"+player).getElementsByTagName('SELECT');
	for (var i = -1, l = all.length; ++i < l;) {
		child=all[i];
		child.removeAttribute("disabled");
	}
	
	coverShow(Players.getPlace(player));
}

function coverShow(place){
	place = Number(place);
	if(place==-1){
		place=Players.lastPlace();
	}
	var pastActive = Players.active;
	Players.active=place;
	var player=Players.getPlayer(place);
	var playerWidth = $("#_"+twoDec(pastActive)).outerWidth(true);	
	var containerWidth = $('#container').width();
	var number = Math.floor(containerWidth/playerWidth);
	var end = place+number-2;//assumes that place!=1
	var start = place-1;//assumes that place!=1
	if(place==1){start++;end++;}
	//var height = $("#_"+twoDec($("#container").tabs("option", "active"))).height();
	var options,effect
	var removed=0,added=0;
	var easing = (Math.abs(Players.active-pastActive)==1) ? "swing" : "linear";
	//console.log(Math.abs(Players.active-pastActive)+easing+" active:"+Players.active+" pastActive:"+pastActive);
	
	
	var i=1;
	var current;
	while(i<=Players.count()){
		current = Players.getPlayer(i);
		if(Players.getPlace(current)<start||Players.getPlace(current)>end){//shouldn't be displayed
			if(Players.displayed.indexOf(current)!=(-1)){//is displayed
				removed++;
			}
		}else{
			if(Players.displayed.indexOf(current)==(-1)){
				added++;
			}
		}
		i++;
	}
	
	//console.log(Players.active<pastActive);
	var remove = (Players.active>pastActive) ? 0 : 700-(700/removed);
	var deltaRemove = (Players.active>pastActive) ? (700/removed) : -(700/removed);
	var add = (Players.active>pastActive) ? 0 : 700-(700/added);
	var deltaAdd = (Players.active>pastActive) ? (700/added) : -(700/added);
	
	i=1;
	while(i<=Players.count()){
		//if($('#_'+Players.getPlayer(i)).css('display')=='block'&&playerWidth==""){playerWidth = $('#_'+Players.getPlayer(i)).outerWidth(true);}
		current = Players.getPlayer(i);
		if(Players.getPlace(current)<start||Players.getPlace(current)>end){//shouldn't be displayed
			if(Players.displayed.indexOf(current)!=(-1)){//is displayed
				//console.log("hide #_"+current);
				if(Players.getPlace(current)<place){effect="leftblind";options={direction:"left",easing:easing};}
				if(Players.getPlace(current)>place){effect="blind";options={direction:"left",easing:easing};}
				if(Players.getPlace(current)==place){effect="clip";options={direction:"horizontal",easing:easing};}
				$('#_'+twoDec(current)).show();
				//if(Number(current)==1){$('#container').css("height",height+" !important");}
				$('#_'+twoDec(current)).delay(remove).hide(effect, options,700/removed)//.animate({width: "hide", opacity: 1}, {queue: false, duration: 700});
				//.animate({width: "hide", opacity: 1}, {queue: false, duration: 700, complete: function(){if(Number(current)=Players.count()){$('#container').height('auto');}}});//.hide({duration:700,specialEasing:{width:"linear"}});//
				
				//$('.ui-tabs-panel').css('left','0px').animate({left:("-="+playerWidth)},{ queue:false,duration:700},function(){$('#_'+twoDec(current)).hide();$('.ui-tabs-panel').css('left','0px');});
				//console.log("remove:"+remove+" delta:"+deltaRemove);
				remove+=deltaRemove;
				Players.displayed.splice(Players.displayed.indexOf(twoDec(current)),1);
			}
		}else{//should be displayed
			if(Players.displayed.indexOf(current)==(-1)){//isn't displayed
				//console.log("show #_"+current);
				if(Players.getPlace(current)>place){effect="blind";options="left";}
				if(Players.getPlace(current)<place){effect="leftblind";options="left";}
				if(Players.getPlace(current)==place){effect="leftblind";options="left";}
				$('#_'+current).hide().css('opacity',1);
				//$('#_'+twoDec(current)).css("height",height+" !important");//.height(height);
				$('#_'+current).delay(add).show(effect,{direction:options,easing:easing},700/added);//.animate({width: "show", opacity: 1}, {queue: false, duration: 700});//
				//$('#_'+twoDec(current)).height('auto');
				//console.log("add:"+add+" delta:"+deltaAdd);
				add+=deltaAdd;
				Players.displayed[Players.displayed.length]=twoDec(current);
			}else{//is shown
				$('#_'+current).show();
			}
			$('#_'+twoDec(current)).css('z-index','0');
		}
		//console.log("Players.displayed.indexOf("+twoDec(current)+") = "+Players.displayed.indexOf(twoDec(current)));
		i++;
	}
	Players.active = place;
	$('#_'+twoDec(player)).css('z-index','3');
}

$(document).ready(function(){
	$('#cover').click(function(event){
		callCover(event);
	});
});
function callCover(event){
	var x = event.pageX;
	var y = event.pageY;
	var offset, width, height;
	$('.playerPanel').each(function(){
		offset = $(this).offset();
		width = $(this).outerWidth(true);
		height = $(this).outerHeight(true);
		offset.left -= ((width-$(this).outerWidth())/2);
		offset.top -= ((height-$(this).outerHeight())/2);
		offset.right = offset.left+width;
		offset.bottom = offset.top+height;
		//console.log(offset);
		//console.log(((width-$(this).outerWidth())/2));
		if($(this).css('display')!='none' && x>=offset.left && x<=offset.right && y>=offset.top && y<=offset.bottom){
			$( "#container" ).tabs({active: (Players.getPlace(this.id.substring(1,3)))});
			coverShow(Players.getPlace(this.id.substring(1,3)));
			return false;
		}
	});
}

function changeCoverHeight(){
	var place = Players.active
	var player=Players.getPlayer(place);
	$('#cover').css('height',$("#_"+player).outerHeight(true));
}

function decrease(button){
	var what=button.id.substring(3,6);
	//console.log(what);
	var where = document.getElementById(what+"Val");
	//console.log(where.innerHTML);
	if(where.innerHTML>0 ) {
		where.innerHTML = Number(where.innerHTML)-1;
	}
}

function increase(button){
	var what=button.id.substring(3,button.id.length);
	//console.log(what);
	var where = document.getElementById(what+"Val");
	if(Number(where.innerHTML)<7||(what=="wp1"&&Number(where.innerHTML)<14)){where.innerHTML = Number(where.innerHTML)+1;}
}

/**
formats the second row of player tabs.
Param (optiona) num: the tab that should be active after formatting.
	Default: the previously active tab.
called by order() newPlayer() namer() <div #container.onresize"">
*/
function sizer(num){
	if(arguments.length ==0){
		num = $("#container").tabs("option", "active");
	}
	$( "#container" ).tabs( "destroy" );
	$( "#container" ).tabs({active: num});
	$( ".ui-tabs-nav" )
      .removeClass( "ui-corner-all ui-corner-top" )
      .addClass( "ui-corner-bottom" );
	$( ".tabs-bottom .ui-tabs-nav" ).appendTo( ".tabs-bottom" );
	$(".playerPanel").addClass('ui-corner-top');
	var containerWidth = $("#tabcontainer").css("width").slice(0,-2);
	var tabWidths = 0;
	var rows = 0;
	var oldRows = 0
	//<button id="order" type="button" onclick="order();">Set Order</button>
	tabWidths += $('#order').outerWidth(true);
	
	var all = document.getElementById("tabcontainer").getElementsByTagName('LI');
	for (var i = -1, l = all.length; ++i < l;) {
		child=all[i];
		tabWidths += $(child).outerWidth(true);
		oldRows = rows;
		rows = (tabWidths) / containerWidth;
		if (rows>=1){
			$(child).addClass("ui-corner-all").css("margin", "2px 3px 0px 0px");
			if(Math.floor(rows)!=Math.floor(oldRows)){
				//console.log(rows+" != "+oldRows);
				$(child).css("clear", "left");
			}
		}else{
			$(child).removeClass( "ui-corner-all ui-corner-top" ).addClass( "ui-corner-bottom" ).css("margin", "");
			if (child.style.removeProperty) { child.style.removeProperty("margin"); 
			}else if (child.style.removeAttribute) { child.style.removeAttribute("margin"); }
		}
	}
	coverShow(Players.getPlace(num));
	changeCoverHeight();
	//console.log("container: "+containerWidth+" tabs: "+tabWidths+" rows: "+rows);
}

//if first
//	if first=black && second=black run normal
//	if first=black && second=trans set first trans
//	if first=trans set first black
function color(event){
	var elem=event.target;
	var peg=elem.id.substring(4,6);
	//var where=elem.id.search(/\d/);
	var player=elem.id.substring(6,8);
	var desc = elem.id.substring(0,4);
	//console.log(peg+" "+player);
	var peg1=elem.style.fill;
		//console.log(twoDec(Number(peg)+1));
	var peg2=document.getElementById(desc+twoDec(Number(peg)+1)+player);
	if(peg2 != null){peg2=peg2.style.fill;}
	var circle;
	for(var i=1; i<=peg ; i++ ){
		//console.log(desc+" "+twoDec(i)+" "+player+" "+peg);
		circle = document.getElementById(desc+twoDec(i)+player);
		circle.style.fill="black";
	}
	var i=peg;
	i++;
	circle = document.getElementById(desc+twoDec(i)+player);
	while(circle!=null){
		//console.log(circle);
		circle.style.fill="transparent";
		circle = document.getElementById(desc+twoDec(i)+player);
		i++;
	}
	
	//console.log(elem.style.fill);
	if((peg1=="#000000"||peg1=="black")){//TODO determine which check I need to do.
		if(peg2=="#000000"||peg2=="black"){
		}else{
			elem.style.fill="transparent";
		}
	}else{
		elem.style.fill="black";
	}
	//console.log(elem.id);
	//console.log(elem);
}
