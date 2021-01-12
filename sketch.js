
let dog,d1,d2,m,m1,db,va
let score=10
let give
let add
let fs=10
let feed='well fed'

function preload(){
  d1=loadAnimation('images/dogImg.png')
  d2=loadAnimation('images/dogImg1.png')
  m1=loadImage('images/milk.png')
  wr=loadImage('images/Wash Room.png')
  lr=loadImage('images/Living Room.png')
  gr=loadImage('images/Garden.png')
  br=loadImage('images/Bed Room.png')
}

function setup() {
  createCanvas(600, 590);

  db=firebase.database()
  db.ref('food').on('value',function(data){
    va=data.val()
    fs=va
  })

  db.ref('score').on('value',function(data){
    leti=data.val()
    score=leti
  })

  db.ref('feed').on('value',function(data){
    letia=data.val()
    feed=letia
  })
  
  dog=createSprite(width/1.3,height/2,30,30)
  dog.addAnimation('bah',d1)
  dog.addAnimation('blah',d2)
  dog.scale=0.1
  dog.visible=false

  give=createButton('Feed')
  give.position(300,85)
  give.mousePressed(feedog)

  add=createButton('Add Food')
  add.position(300,115)
  add.mousePressed(addfood)

  m=createSprite(30,height/2,20,20)
  m.addImage('b',m1)
  m.scale=0.1
  
}


function draw(){ 

  if(m.collide(dog)){
    m.velocityX=0
    m.x=30;m.y=height/2
    score=score+1
    fs=fs-1
  }

  if(score<7&&score>0){
    feed="hungry!"
    background(lr)
  }

  if(score<=10&&score>7){
    feed="well fed."
    background(lr)
  }

  if(score>10&&score<15){
    feed="full!"
    background(gr)
  }

  if(score>=15){
    feed="overfed. Leave him alone!"
    background(br)
  }

  if(score<0){
    feed="running away for sure."
    background(0)
  }

  if(frameCount%1000===0){
    score=score-1
  }

  if(score>10){
    dog.changeAnimation('blah',d2)
  }

  else{
    dog.changeAnimation('bah',d1)
  }

  if(fs<1){
    background(255)
    score=0
    dog.destroy()
    m.destroy()
    give.hide()
    add.hide()
    textSize(20)
    fill('blue')
    text('You cannot feed your dog anymore!',120,200)
  }

  else{
    textSize(20)
  fill('black')
  let h = hour()
  text('Dog feeding status :'+score,30,20)
  text('Food remaining: '+fs,30,60)
  text('Your dog is '+feed,30,40)
  if(h>=0&&h<=10){
    text('The time is '+h+' am',30,150)
  }
  else{
    text('The time is '+h+' pm',30,150)
  }
  }

  drawSprites();
  continu()
  continu1()
}

function feedog(){
  m.velocityX=20
}

function addfood(){
  fs=fs+1
}

function continu(){
  db.ref('/').update({
      score: score,
  })
}

function continu1(){
  db.ref('/').update({
    food:fs,
  })
}

function continu2(){
  db.ref('/').update({
    feed:feed,
  })
}




