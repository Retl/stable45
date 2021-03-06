// File: burstparty.js
// Author: Carlis Moore
// Date of Creation: 20 February 2014
// Date of Last Update: 8 March 2014
// Base Code: http://retl.info/experimental/ffxiiiatb.js
// Purpose: Same as listed in .htm. This is a chunk of the JS that makes it go.

//Objects
var mousex;
var mousey;
var atbLength = 640;
var atbSegments = 8;


// Keys 1-0: Menu Selection
// Key Tab: Change Menu.
// Keys Q E Enter: Cancel? Generic Action? 

function player(xpos, ypos, myid, mynum)
		{
			 this.x = xpos;
			 this.y = ypos;
			 this.xsub = 0;
			 this.ysub = 0;
			 this.xspeed = -5; //In Subpixels.
			 this.yspeed = 1; //In Subpixels.
			 this.myid = myid;
			 this.mynum = mynum;
			 this.apMax = 400;
			 this.ap = this.apMax;
			 this.rap = 0; //Reserve AP.
			 
			//player Methods
			this.apInc=apInc; //This is necessary for function visibility.
			
			//Short for Action Point Incrementer.
			function apInc() 
			{
				if (this.ap < this.apMax)
				{
					this.ap++;					
				}
				
				if (this.rap < this.apMax)
				{
					this.rap++;					
				}
			return this.ap;
			}
			
			this.update = update;
			function update()
			{
			
				this.xspeed += 16;//Testing line. DELETEME.
				//if (xspeed > 768) {xspeed -= 48;}
				this.yspeed = 256;//Another DELETEME testing line.
			
				//Each update, we immediately need to update positions relative to speed.
				this.xsub += this.xspeed;
				this.ysub += this.yspeed;
				
				//Wrapping/clamping Pixel to Subpixel.
				clampSubPosToMain(this, 256, 0);
				this.x = wrapAround(this.x, 0, document.getElementById("mainCanvas").width);
				this.y = wrapAround(this.y, 0, document.getElementById("mainCanvas").width);
				
			}

			 return this;
			 
		 }
//Free Methods
// This is more or less our "Main" function, or the main LOOP rather.
		
		function updateEverything()
		{
			/*
			for (i in buns)
			{
			buns[i].updateBun();
			}
			bunnCount = parseInt(i) + 1;
			document.getElementsByTagName("p")[0].innerHTML= bunnCount + " Bunni";
			
			//Position the cursor near whichever if currently selected.
            
            if (cursorswitch) 
                {
                if (cursorYOffset > 12) {cursorswitch = 0;}
                cursorYOffset += Math.ceil(  3 );
                }
            else 
                {
                if (cursorYOffset < -12) {cursorswitch = 1;}
                cursorYOffset -= Math.ceil( 3 );
                }
            
			document.getElementById("imgcursor").style.left = buns[selected].x - 13 + "px";
			document.getElementById("imgcursor").style.top = (buns[selected].y - 112 + cursorYOffset) + "px";
			main = setTimeout("updateEverything();", timerspeed);
			*/
			
			if(p1 != null)
			{
			p1.apInc();
			p1.update();
			
			//p1.x = mousex;
			//p1.y = mousey;
			clearDisplay();
			testDrawBlackRect();
			drawCircle(mainCanvas.width / 2, mainCanvas.height / 2, calcDistance(mainCanvas.width / 2, mainCanvas.height / 2, p1.x, p1.y));
			drawCircleMarker(p1.x, p1.y);
			
			drawImg(32, mainCanvas.height - 256, imgRipple);
			drawRectAtb(p1);
			
			//Demonstration related text.
			drawTextSmall(32, 128, "A pale imitation of some aspects of the FFXIII ATB (and an unrelated circle thing)."); 
			drawTextSmall(32, 144, "Press the 1(!) key to drain 100 points of ACT.");
			drawTextSmall(32, 160, "Press the Shift key to 'paradigm shift' and get an ACT refresh if you've built up enough.");
			
			}
			
			//mainTimer = setTimeout("updateEverything();", timerspeed); //Not necessary when using setInterval to ensure a loop.
		}
		
//Free Utility Methods
//Wrapping/clamping Pixel to Subpixel.
function calcDistance(x1, y1, x2, y2)
{
	return Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
}

// D'oh. Can't pass by reference unelss we pass an object and tweak the object. Might as well do some copypasta.
function clampSubPosToMain(subVariable, mainVariable, upperBounds, lowerBounds)
{
	while (subVariable >= upperBounds)
	{
		mainVariable++;
		subVariable -= upperBounds;
	}
	
	while (subVariable < lowerBounds)
	{
		mainVariable--;
		subVariable += upperBounds;
	}
}

//And now the copypasta version. 
function clampSubPosToMain(p, upperBounds, lowerBounds)
{
	while (p.xsub >= upperBounds)
	{
		p.x++;
		p.xsub -= upperBounds;
	}
	
	while (this.xsub < lowerBounds)
	{
		p.x--;
		p.xsub += upperBounds;
	}
	
	while (p.ysub >= upperBounds)
	{
		p.y++;
		p.ysub -= upperBounds;
	}
	
	while (this.ysub < lowerBounds)
	{
		p.y--;
		p.ysub += upperBounds;
	}
}

/*
function clampSubPosToMain(subVariable, mainVariable, upperBounds)
{
	clampSubPosToMain(subVariable, mainVariable, upperBounds, 0);
}
*/

function wrapAround(current, lowEnd, highEnd)
{

	while (current > highEnd)
	{
		current -= (highEnd - lowEnd); //Wraps around in such a fashion that if something's moving at an absurd speed, it will eventually get back on screen.
	}
	
	while (current < lowEnd)
	{
		current += (highEnd - lowEnd); //Wraps around in such a fashion that if something's moving at an absurd speed, it will eventually get back on screen.
	}
	
	return current;
}


//Free Input Methods
function updateMousePosition(e)
{
	mousex = e.clientX;
	mousey = e.clientY;
}	

//HANDLING USER INPUT
//KEYBOARD
function handleKeyboard(e)
{
	if (e && e.which)
	{
	
	//document.getElementById("testInfoDiv").innerHTML="Last recieved keycode from keypress: " + e.which;
	
	//P1 Exclusive Section
		if (e.which == 49 && p1) //1 key.
		{
			if (p1.ap > 100) {p1.ap -=100;}
		}
	//End of P1 Section
		
		if (e.which == 37){;}
		if (e.which == 38){;}
		if (e.which == 39){;}
		if (e.which == 40){;}
		
		if (e.which == 65){;}
		if (e.which == 68){;} //Watch out. Order swap here in the ASWD set.
		if (e.which == 83){;}
		
		if (e.which == 32 || e.which == 87 || e.which == 16) //Spacebar, W key, Shift.
		{
			;
		}
		
		
		//Getting the Reserve AP is an All-or-Nothing bid.
		//For testing, we'll just swap.
		//Ideally, this would occur automatically when
		//changing paradigm.
		
		if (e.which == 16) //Shift key.
		{
			if (p1.rap >= p1.apMax)
			{
				p1.ap = p1.rap; //Replace AP with reserve.
				p1.rap = -p1.rap; //Sets reserve back to negative to build up.
			} 
			else
			{
				p1.ap = 0;
			}
			
		}
		
	}
}
//END OF USER INPUT HANDLING
	
//Free Graphical Methods
function testDrawRect() 
{
	var c=document.getElementById("mainCanvas");
	var ctx=c.getContext("2d");
	ctx.fillStyle="#FF0000";
	ctx.fillRect(0,0,150,75);
}

function testDrawBlackRect() 
{
	var c=document.getElementById("mainCanvas");
	var ctx=c.getContext("2d");
	ctx.fillStyle="#000000";
	var w = c.width;
	var h = c.height;
	ctx.fillRect(0,0,w,h);
}

function drawRectAtb(char) 
{
	var c=document.getElementById("mainCanvas");
	var ctx=c.getContext("2d");
	ctx.fillStyle="#999999";
	ctx.fillRect(32, mainCanvas.height - 128,atbLength,4);
	
	ctx.fillStyle="#FF9F00";
	ctx.fillRect(32, mainCanvas.height - 128,(atbLength * (char.ap/char.apMax)),4);
	
	ctx.fillStyle="#EEEEEE";
	for (var i=0; i < atbSegments; i++)
	{
		ctx.fillRect(32 + (atbLength / atbSegments * i), mainCanvas.height - 128,1,4);
	}
	/*ctx.fillRect(32 + (atbLength / 4 * 1), mainCanvas.height - 128,1,4);
	ctx.fillRect(32 + (atbLength / 4 * 2), mainCanvas.height - 128,1,4);
	ctx.fillRect(32 + (atbLength / 4 * 3), mainCanvas.height - 128,1,4);*/
	
	/*
	//ATB Label
	drawText(40, mainCanvas.height - 128, "ACT");
	*/
	
	//ATB Numeric Display with Label
	drawText(40, mainCanvas.height - 128, "ACT: " + p1.ap + " / " + p1.apMax);
	
	//ATB Reserve Ready!
	if (p1.rap >= p1.apMax) {drawText(24, mainCanvas.height - 128, "!");}
}

function testDrawCircle() 
{
var c=document.getElementById("mainCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);
ctx.stroke();
}

function clearDisplay() 
{
	var c=document.getElementById("mainCanvas");
	var ctx=c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
}

function drawCircle(x,y,r) 
{
var c=document.getElementById("mainCanvas");
var ctx=c.getContext("2d");
ctx.strokeStyle="#FFFFFF";
ctx.beginPath();
ctx.arc(x,y,r,0,2*Math.PI);
ctx.stroke();
}

function drawCircleMarker(x,y) 
{
var c=document.getElementById("mainCanvas");
var ctx=c.getContext("2d");
ctx.fillStyle="#FF9F00";
ctx.beginPath();
ctx.arc(x,y,6,0,2*Math.PI);
ctx.fill();
}

function drawText(x, y, t) 
{
var c=document.getElementById("mainCanvas");
var ctx=c.getContext("2d");
ctx.fillStyle = '#FF9F00';
ctx.font = 'italic bold 28px sans-serif';
ctx.textBaseline = 'bottom';
ctx.fillText(t, x, y);
}

function drawTextSmall(x, y, t) 
{
var c=document.getElementById("mainCanvas");
var ctx=c.getContext("2d");
ctx.fillStyle = '#BB5B00';
ctx.font = '12px sans-serif';
ctx.textBaseline = 'bottom';
ctx.fillText(t, x, y);
}

function drawImg(x, y, img) 
{
var c=document.getElementById("mainCanvas");
var ctx=c.getContext("2d");
ctx.drawImage(img, x, y);
}
