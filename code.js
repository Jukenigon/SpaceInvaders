var KEYCODE_LEFT = 37, KEYCODE_RIGHT = 39;
var stage;
var weapon;
var keys = {};
var bitmap;
var deplace;
var laser;
var fire;
var monsters = 55;

var right = 10;
var left = 0;

function init()
{
    fire = false;
    stage = new createjs.Stage("canvas");
    bitmap = new Array();
    deplace = 1;

    for(i = 0; i < 11; i++)
    {
    	bitmap[i] = new Array();
    	for(j = 0; j < 5; j++)
        {
    		bitmap[i][j] = new createjs.Bitmap("img/image.jpg");
            bitmap[i][j].x = i * 40;
    		bitmap[i][j].y = j * 32;
            stage.addChild(bitmap[i][j]);
        }
    }		

    weapon = new createjs.Bitmap("img/weapon.jpg");
    weapon.x = 0;
    weapon.y = 600 - 38;
    
    stage.addChild(weapon);
    
    tour_1 = new createjs.Bitmap("img/tourelle.jpg");
    tour_1.x = 20;
    tour_1.y = 450;
    
    tour_2 = new createjs.Bitmap("img/tourelle.jpg");
    tour_2.x = 350;
    tour_2.y = 450;
    
    tour_3 = new createjs.Bitmap("img/tourelle.jpg");
    tour_3.x = 680;
    tour_3.y = 450;
    
 	stage.addChild(tour_1);
    stage.addChild(tour_2);
    stage.addChild(tour_3);

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);

    this.document.onkeydown = keydown;
    this.document.onkeyup = keyup;
    
    stage.update();
}

function keydown(event)
{
    keys[event.keyCode] = true;
}

function keyup(event)
{
    delete keys[event.keyCode];
}

function deplaceEnnemies()
{
    if(bitmap[left][0].x == -1000 && bitmap[left][1].x == -1000 && bitmap[left][2].x == -1000 && bitmap[left][3].x == -1000 && bitmap[left][4].x == -1000)
        left++;
    
    if(bitmap[right][0].x == -1000 && bitmap[right][1].x == -1000 && bitmap[right][2].x == -1000 && bitmap[right][3].x == -1000 && bitmap[right][4].x == -1000)
        right--;
    
    if(bitmap[left][0].x == 0 || bitmap[left][1].x == 0 || bitmap[left][2].x == 0 || bitmap[left][3].x == 0 || bitmap[left][4].x == 0)
        deplace = 1;
            
    if(bitmap[right][0].x >= 800 - 32 || bitmap[right][1].x >= 800 - 32 || bitmap[right][2].x >= 800 - 32 || bitmap[right][3].x >= 800 - 32 || bitmap[right][4].x >= 800 - 32)
        deplace = 0;

    for(i = left; i <= right; i++)
        for(j = 0; j < 5; j++)
        {   
            switch(deplace)
            {
                    case 0:
                    if(bitmap[i][j].x != -1000)
                        bitmap[i][j].x--;
                    break;
                    case 1:
                    if(bitmap[i][j].x != -1000)
                        bitmap[i][j].x++;
                    break;
                    default:
                    break;
            }
        }

}

function isFinish()
{
    if(monsters == 0)
    {
        stage.removeAllChildren();
        alert("Vous avez gagné");
    }
}

function weaponIsFire()
{
    if(fire == true)
    {
        if(laser.y + 10 > 0)
        {
            for(i = left; i <= right; i++)
                for(j = 0; j < 5; j++)
                {       
                    if(laser.x > bitmap[i][j].x && laser.x < bitmap[i][j].x + 32)
                        if(laser.y <= bitmap[i][j].y + 32 && laser.y > bitmap[i][j].y)
                        {
                            bitmap[i][j].x = -1000;
                            bitmap[i][j].y = -1000;
                            stage.removeChild(bitmap[i][j]);
                            stage.removeChild(laser);
                            fire = false;
                            monsters--;
                        }
                }
            
            laser.y -= 10;
        }
        
        else 
        {
            fire = false;
            stage.removeChild(laser);
        }
    }
}

function deplaceWeapon()
{
    if (keys[KEYCODE_LEFT] && weapon.x > 0)
    {
        weapon.x -= 10;
    }
    
    if (keys[KEYCODE_RIGHT] && weapon.x < 750) 
    {
        weapon.x += 10;
    }

    if (keys[38]) 
    {
        if(fire == false)
        {
            laser = new createjs.Shape();
            laser.graphics.beginFill("f00");
            laser.graphics.drawRect(0, 0, 10, 10);
            laser.x = weapon.x + 20;
            laser.y = weapon.y;
            stage.addChild(laser);
            fire = true;
        }
    }

}

function update()
{
    stage.update();
}

function tick()
{
    deplaceEnnemies();
    isFinish();
            
    weaponIsFire();
            
    deplaceWeapon();    
    update();
}