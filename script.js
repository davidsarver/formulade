removed = new Array();
//svgGear = new Array();
gearRanges = new Array("zero","0102","0204","0408","0712","1120","2130");
gearTop = new Array("zero",2,4,8,12,20,30);
gearBottom = new Array("zero",1,2,4,7,11,21);


var game = {
	"currentPlayer":0,
	"player00":{
		"name":"name",
		"color":"#a5a5a5",
		"color2":"#a5a5a5",
		"picture":"data:image/png;base64,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",
		"order":0,
		"random":{"range":{"begin":1,"end":20},"result":0,"cumulative":0,"iteration":0},
		"tires":{"wear":4,"max":4},
		"brakes":{"wear":3,"max":3},
		"body":{"wear":2,"max":2},
		"transmission":{"wear":2,"max":2},
		"engine":{"wear":2,"max":2},
		"suspension":{"wear":2,"max":2},
		"gear":1,
		"result":0,
		"cumulative":0
	}
}

function playe() {//this is a one-off object otherwise function playe(){}; var Players = new playe;
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
	newElement.currentGear = 1;
	newElement.state = "start";
	newElement.nextGear = 1;
	
	document.getElementById('container').appendChild(newElement);
	children=document.getElementById("_"+twoDec(player)).childNodes;
	child=document.getElementById("_"+twoDec(player)).firstChild;

	newElement= document.getElementById('playertab00').cloneNode(true);
	newElement.id= "playertab"+twoDec(player);
	document.getElementById('tabcontainer').appendChild(newElement);
	document.getElementById('playertab'+twoDec(player)).firstChild.href="#_"+twoDec(player);
	document.getElementById('playertab'+twoDec(player)).firstChild.innerHTML="Player "+player;

	
	var all = document.getElementById("_"+twoDec(player)).getElementsByTagName('*');
	for (var i = 0, l = all.length-1/*<-executed before*/; i < l/*<-condition for running*/;i++) {
		child=all[i];
		//if(child!=undefined){
			//console.log(child.tagName);
		//}
		if(child==undefined){
			break;
		}
		
		//if (child.tagName=="svg:radialGradient"){continue;}
		if (child.tagName=="circle"&&child.id.substring(0,3)=='peg'){
			child.addEventListener('click', color);
			//console.log(child.id);
		}
		
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
	var color = $("#newColor").css("background-color");
	colorEdit(color,twoDec(player));
	$("#playerColorEdit"+twoDec(player)).spectrum({color:color,showInput:false,showButtons:false,appendTo:"#roster"+twoDec(player)}); //initialize the color edit color picker
	$("#playerColorEdit"+twoDec(player)).on('move.spectrum', function(e,color){colorEdit(color,e)}); //bind the colorEdit() function
	
	color = $("#newComplement").css("background-color");
	complementEdit(color,twoDec(player));
	$("#playerComplementEdit"+twoDec(player)).spectrum({color:color,showInput:false,showButtons:false,appendTo:"#roster"+twoDec(player)});//initialize the complement edit color picker
	$("#playerComplementEdit"+twoDec(player)).on('move.spectrum', function(e,color){complementEdit(color,e)}); //bind the complementEdit() function;
	
	document.getElementById('playerid'+twoDec(player)).innerHTML="Player "+player;
	document.getElementById('name'+twoDec(player)).value="Player "+player;
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
			console.log(child.getAttribute("type"));
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
	var par1=sel(element);
	var player = document.getElementById("_"+par1);
	if(player.state=="rolled"){
		return false;
	}
	var current=document.getElementById("currentGear"+par1);
	var label=document.getElementById('gearlab'+par1);
	var next=document.getElementById('nextGear'+par1);
	switch(player.currentGear){
		case 1:
			current.innerHTML="Current gear is: 1st"
			label.innerHTML="1st Gear Result";
			break;
		case 2:
			label.innerHTML="2nd Gear Result";
			current.innerHTML="Current gear is: 2nd"
			break;
		case 3:
			label.innerHTML="3rd Gear Result";
			current.innerHTML="Current gear is: 3rd"
			break;
		case 4:
			label.innerHTML="4th Gear Result";
			current.innerHTML="Current gear is: 4th"
			break;
		case 5:
			label.innerHTML="5th Gear Result";
			current.innerHTML="Current gear is: 5th"
			break;
		case 6:
			label.innerHTML="6th Gear Result";
			current.innerHTML="Current gear is: 6th"
			break;
		default:
			console.log("broken");
			break;
	}
	
	if(arguments.length>1){
		var gear = document.getElementById("gear"+par1);
		if(num<(player.currentGear+2)&&num>(player.currentGear-5)){//(allowed) //players can only shift up one or down four.
			player.nextGear=num;//player is document object
			//console.log(player.nextGear+"="+num);
			next.innerHTML=ordinate(num);
			gear.setAttribute("cx",x);
			gear.setAttribute("cy",y);
			var color=69*(player.currentGear-num-1);
			if (color<0){color=0;}
			color="#"+(color).toString(16)+"0000"
			//console.log(color+" next:"+num);
			document.getElementById('gearcen'+par1).style.fill=color;
			document.getElementById('geartop'+par1).style.fill=color;
			document.getElementById('gearbot'+par1).style.fill=color;
		}
	}
}
/**
called by Roll button and RollandAdd button
changes the gear selection based on player.currentGear and
disables the select preventing change of gear after rolling
player = twoDec string or number
displayValue = player.gear, a number

might be obsolete after removing the select.
*/
function select(player, displayValue){
	var playerNum=Number(player);
	var player = document.getElementById("_"+twoDec(playerNum));
	var selectTag=document.getElementById("select"+twoDec(playerNum));
	player.currentGear = player.nextGear;
	gear(player);
	player.state = "rolled";
	//document.getElementById('buttonRemove').removeAttribute("disabled");
}

function par(element){
	return element.parentNode.id.substr(-2);
}

function sel(element){
	return element.id.substr(-2);
}

function namer(element,eventType){
	var player = par(element);
	//console.log('name'+player+"."+'playerid'+player);
	console.log(player + " " + element.tagName + " " + eventType);
	if(element.tagName=="LABEL"){
		$(element).css('display','none');
		$('#name'+player).show().css('display','inline-block')
		if(eventType!='edit'){
			$('#name'+player).select();
		}
		return;
	}
	if(eventType=='change'){
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
	var player;
	try{
		$("#tabcontainer").sortable("destroy");
		document.getElementById('order').innerHTML='Order/Edit<br/>Roster';
		$('.roster').hide();
		$('.gamePlay').show();
		//for(player in $(".playerId").toArray()){
		//	namer(document.getElementById('name'+twoDec(player)),'blur');
		//}
		changeCoverHeight();
	}catch(err){
		$("#tabcontainer").sortable({placeholder: "ui-state-highlight"}).disableSelection;
		document.getElementById('order').innerHTML='Set Order';
		$('.roster').show();
		$('.gamePlay').hide();
		//console.log($(".playerId").toArray()[1].id);
		//for(player in $(".playerId").toArray()){
		//	console.log(twoDec(player));
		//	namer(document.getElementById('playerid'+twoDec(player)),'edit');
		//}
		changeCoverHeight();
		return;
	}
	


	var tabCan=document.getElementById("tabcontainer");
	var dashCan=document.getElementById("container");
	var child=tabCan.firstChild.nextSibling;//sortable.firstChild;//skip sort button
	var tabName="";
	var dashName="";
	var tab, dash;
	
	var i=0;
	while(child!=null){
		if(child.nodeType!=1||child.id=="orderLi"){
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
	/*var all = document.getElementById("_"+player).getElementsByTagName('select');
	for (var i = -1, l = all.length; ++i < l;) {
		child=all[i];
		child.removeAttribute("disabled");
	}*/
	document.getElementById("_"+player).state="start";
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
	var easing = (Math.abs(Players.active-pastActive)==1) ? "linear" : "linear";//"swing" : "linear";
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
				if(Players.getPlace(current)==place){effect="blind";options="left";}
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
	$( ".playerTab, .ui-tabs-nav" )
      .removeClass( "ui-corner-all ui-corner-top" )
      .addClass( "ui-corner-bottom" );
	$( ".tabs-bottom .ui-tabs-nav" ).appendTo( ".tabs-bottom" );
	$(".playerPanel").addClass('ui-corner-top');
	var containerWidth = $("#tabcontainer").innerWidth();
	var tabWidths = 0;
	var rows = 0;
	var oldRows = 0;
	//<button id="order" type="button" onclick="order();">Set Order</button>
	//tabWidths += $('#order').outerWidth(true);
	
	//console.log("\nstart");
	var all = document.getElementById("tabcontainer").getElementsByTagName('li');
	for (var i = -1, l = all.length; ++i < l;) {
		child=all[i];
		if(child.id=="playertab00"){
			continue;
		}
		tabWidths += ($(child).outerWidth(true)+5);//TODO figure this out!
		oldRows = rows;
		rows = (tabWidths) / containerWidth;
		//console.log(rows+" "+$(child).outerWidth(true));
		$(child).css("clear", "none");
		if (rows>=1){
			$(child).addClass("ui-corner-all").css("margin", "2px 3px 0px 0px");
			if(Math.floor(rows)>Math.floor(oldRows)){
				//console.log(rows+" > "+oldRows+child.id);
				$(child).css("clear", "left");
				tabWidths = containerWidth;//reset any error in width calculations will set rows back to 1.000
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
//$( document ).ready(function() {
	$(window).resize(function() {sizer()});
//});
//if first
//	if first=black && second=black run normal
//	if first=black && second=trans set first trans
//	if first=trans set first black
function color(event){
	console.log(event);
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

/* hexToComplimentary : Converts hex value to HSL, shifts
 * hue by 180 degrees and then converts hex, giving complimentary color
 * as a hex value
 * @param  [String] hex : hex value  
 * @return [String] : complimentary color as hex value
 */
function hexToComplementary(hex){
	//([1.0-c[0], 1.0-c[1], 1.0-c[2]])
	//var complement = ('000000' + (('0xffffff' ^ ('0x'+hex)).toString(16))).slice(-6);
	var R = parseInt(hex.slice(0,2), 16); 
	var B = parseInt(hex.slice(2,4), 16);
	var G = parseInt(hex.slice(4,6), 16);
	//console.log("%c rgb("+[R,B,G]+")", 'background:'+"rgb("+[R,B,G]+")"+';');
	//console.log("%c rgb("+RXB.rgb2ryb([R,B,G])+")", 'background:'+"rgb("+RXB.rgb2ryb([R,B,G])+")"+';');
	//console.log("%c rgb("+RXB.ryb2rgb(RXB.rgb2ryb([R,B,G]))+")", 'background:'+"rgb("+RXB.ryb2rgb(RXB.rgb2ryb([R,B,G]))+")"+';');

    return "rgb("+RXB.ryb2rgb(RXB.complementary(RXB.rgb2ryb([R,B,G]),0))+")";
}  

//accepts either a string color and string player number or tinyColor object and move event (e)
function colorEdit(color,player){
	if(typeof player != "string"){
		player = sel(player.currentTarget);
		color = color.toHexString(); //#ffffff
	}
	document.getElementById('playerColor'+twoDec(player)).style.backgroundColor=color;
	document.getElementById('playerColorBottom'+twoDec(player)).style.backgroundColor=color;
	return null;
}

//accepts either a string color and string player number or tinyColor object and move event (e)
function complementEdit(color,player){
	if(typeof player != "string"){
		player = sel(player.currentTarget);
		color = color.toHexString(); //#ffffff
	}
	document.getElementById('playerContrast'+twoDec(player)).style.backgroundColor=color;
	document.getElementById('playerid'+twoDec(player)).style.color=color;
	return null;
}

$( document ).ready(function() {
	$("#colorPicker").spectrum({
		color: "#d00",
		flat:true,
		showInput:false,
		showButtons:false,
		move: function(color2) {
			var color = color2.toHexString();
			document.getElementById('newColor').style.backgroundColor=color;
			document.getElementById('newColor').title = color;
			color = hexToComplementary(color2.toHex());
			document.getElementById('newComplement').style.backgroundColor=color;
			document.getElementById('newComplement').title=color;
			//console.log(hexToComplementary(color2.toHex()));
		}
	});
	//$("#colorPicker").spectrum("move");
});
