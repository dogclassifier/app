
var imgDetectedData;
var imgOriginalData1;
var imgOriginalData2;
var sx;
var sy;
var sw;
var sh;
var sx1;
var sy1;
var sw1;
var sh1;
var sx2;
var sy2;
var sw2;
var sh2;

var chks1;
var chks2;
var objDet;
var objDet1;
var objDet2;
var doglbl;
var camCapture;
let detections = [];
let cresult;
let lbl;
let objX;
let objY;
let objW;
let objH;
let status1=0;
let status2=0
let cnv;
let w=0;
let h=0;
let play=0;
let pause=0;
let menuMode=0;
let head=0;

const detector = ml5.objectDetector("cocossd", modelLoaded1);
const classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5qU2g2ZBu/model.json", modelLoaded2);
// Load the model
function modelLoaded1() {
    console.log('Detector Loaded!');
    status1=1;
}
// Load the model
function modelLoaded2() {
    console.log('Classifier Loaded!');
    status2=1;
}

function setup(){
  document.getElementById("glow1").innerHTML="Loading model... may take 30 seconds!";
  document.getElementById("contMenu").style.display="none";
loop();
  }
// RUN IMAGE CLASSFIER BEGINS BELOW
function imageClassifier(){
                                    menuMode=1;
                                    document.getElementById("glow").style.display="none";
                                    document.getElementById("glow1").style.display="none";
                                    document.getElementById("contMenu").style.display="none";
                                    document.getElementById("credit").style.display="none";
                                    document.getElementById("video").style.display="none";
                                    document.getElementById("image").style.display="block";
                                    document.getElementById("elem").style.display="block";
                                    document.getElementById("elem").getContext("2d").clearRect(0,0,elem.width, elem.height);
                                    document.getElementById("uploader").style.display="block";
                                    document.getElementById("Class1").style.display="block";
                                    document.getElementById("Class2").style.display="block";
                                    document.getElementById("gallery").style.display="inline-block";
                                    document.getElementById("picture").style.display="inline-block";
                                    document.getElementById("vid").style.display="inline-block";
                                    document.getElementById('snapBtn').style.display="none";
                                    document.getElementById('playBtn').style.display="none";
                                    document.getElementById('pauseBtn').style.display="none";
                                    document.getElementById('Class1').innerHTML = "Upload a clear colour image. Waiting...";
                                    document.getElementById('Class2').innerHTML = "";
				noLoop();
				if (cnv!="undefined"){cnv.remove();}


  }                                  // resize image

                          function imgResize(){
                                    // clear previous image in canvas
                                    document.getElementById("elem").getContext("2d").clearRect(0,0,elem.width, elem.height);
                                    document.getElementById('Class2').innerHTML = "";
                                    document.getElementById('Class1').innerHTML="Image loading...";
                                    //define the width to resize
                                      var resize_width = 300;//without px
                                      if (resize_width>window.innerWidth){resize_width=window.innerWidth;}

                                      //get the image selected
                                      var item = document.querySelector('#uploader').files[0];

                                      //create a FileReader
                                      var reader = new FileReader();

                                      //image turned to base64-encoded Data URI.
                                      reader.readAsDataURL(item);
                                      reader.name = item.name;//get the image's name
                                      reader.size = item.size; //get the image's size
                                      reader.onload = function(event) {
                                        var img = new Image();//create a image
                                        img.src = event.target.result;//result is base64-encoded Data URI
                                        img.name = event.target.name;//set name (optional)
                                        img.size = event.target.size;//set size (optional)
                                        img.onload = function(el) {
                                         //create a canvas
                                    //console.log(el.target.width, el.target.height);


                                    //scale the image to  width and keep aspect ratio
                                          var scaleFactor = resize_width / el.target.width;
                                          elem.height= el.target.height * scaleFactor;
                                          elem.width = resize_width;



                                    document.getElementById('elem').getContext("2d").drawImage(el.target,0,0,elem.width,elem.height);

                                    //document.getElementById('elem').getContext("2d").fillStyle="#fff";
                                    //document.getElementById('elem').getContext("2d").fillRect(0,0,elem.width,elem.height);
                                    imgOriginalData1=document.getElementById('elem').getContext("2d").getImageData(0,0,elem.width*0.6, elem.height);
                                    imgOriginalData2=document.getElementById('elem').getContext("2d").getImageData(elem.width*0.4,0,elem.width*0.6, elem.height);
                                    imgOriginalData3=document.getElementById('elem').getContext("2d").getImageData(0,0,elem.width, elem.height);
                                     }

                                      }
                                    document.getElementById('Class1').innerHTML = "Churning image. Just 15 seconds... ";
                                    document.getElementById('Class2').innerHTML = "";


                                    setTimeout(imgDetectImage,3000);
                                    }


                            async function imgDetectImage() {
                                    // Check if dog found in full image. If not try if it is found in 2x 60% of images
                                    objDet="";
                                    await detector.detect(imgOriginalData1, function(error,results) {
                                    	if(error){
                                             console.error(error);
                                           }
                                    	for(let i = 0; i<results.length; i++){
                                           let object = results[i];
                                           if (object.label=="dog"){sx=object.x-5;sy=object.y-5; sw=object.width+5; sh=object.height+5; chks=1;setTimeout(imgGetResults,3000);}//;

                                    	objDet=object.label;
                                         }
                                      });

                                    if (objDet!="dog"){
                                    sx=0;
                                    sy=0;
                                    sw=0;
                                    sh=0;
                                    chks1=0;
                                    chks2=0;
                                    sx1=0;
                                    sy1=0;
                                    sw1=0;
                                    sh1=0;
                                    sx2=0;
                                    sy2=0;
                                    sw2=0;
                                    sh2=0;
                                    objDet1="";
                                    objDet2="";

                                    //Detect dog and extract bounding box details - do on first half if image....


                                    await detector.detect(imgOriginalData1, function(error,results) {

                                    	if(error){
                                             console.error(error);
                                           }


                                    	for(let i = 0; i<results.length; i++){
                                           let object = results[i];
                                           if (object.label=="dog"){sx1=object.x;sy1=object.y; sw1=object.width; sh1=object.height; chks1=1;}

                                    	objDet1=object.label;

                                         }


                                      });

                                    //Detect dog and extract bounding box details - do on second half if image....

                                    await detector.detect(imgOriginalData2, function(error,results) {

                                    	if(error){
                                             console.error(error);
                                           }


                                    	for(let i = 0; i<results.length; i++){
                                           let object = results[i];
                                           if (object.label=="dog"){sx2=object.x+elem.width*0.4;sy2=object.y; sw2=object.width; sh2=object.height; chks2=1;}

                                    	objDet2=object.label;

                                         }


                                      });

                                    if (chks1==1 && chks2==1){
                                    if (sw2*sh2>=sw1*sh1){sx=sx2-5;sy=sy2-5; sw=sw2+5;sh=sh2+5;};
                                    if (sw1*sh1>sw2*sh2){sx=sx1-5;sy=sy1-5; sw=sw1+5;sh=sh1+5;};
                                    setTimeout(imgGetResults,3000);
                                    };

                                    if (chks1==1 && chks2==0){sx=sx1-5;sy=sy1-5;sw=sw1+5;sh=sh1+5;setTimeout(imgGetResults,3000);}

                                    if (chks1==0 && chks2==1){sx=sx2-5;sy=sy2-5;sw=sw2+5;sh=sh2+5;setTimeout(imgGetResults,3000);}

                                    if (chks1==0 && chks2==0){
                                    if (objDet1==objDet2){document.getElementById('Class1').innerHTML = "Looks like '"+objDet1+"'."; document.getElementById('Class2').innerHTML ="Try with another image"; document.getElementById('Class3').innerHTML ="Sorry, dog not detected.";}

                                    else {document.getElementById('Class1').innerHTML = "Looks like '"+objDet1+"/"+objDet2+"'."; document.getElementById('Class2').innerHTML ="Try with another image";}
                                    }
                                    }
                                    }
                                    // run classifier on detected dog

                            async function imgGetResults() {

                                     	imgDetectedData= document.getElementById("elem").getContext("2d").getImageData(0,0,elem.width,elem.height);
                                    	//document.getElementById("elem").getContext("2d").clearRect(0,0,elem.width, elem.height);
                                    	//document.getElementById("elem").getContext("2d").putImageData(imgDetectedData,0,0);


                                    	const results2 = await classifier.classify(imgDetectedData);
                                      document.getElementById("elem").getContext("2d").strokeStyle="#ff0f39";
                                    	document.getElementById("elem").getContext("2d").lineWidth="2";
                                    	document.getElementById("elem").getContext("2d").strokeRect(sx,sy,sw,sh);//console.log(elem.width,elem.height);
                                    	//document.getElementById('Class4').innerHTML="Dog detected";
                                    //console.log(sx+sw, sy+sh);
                                    	//console.log(elem.width, elem.height);
                                    	//console.log(sw, sh);
                                    	//console.log(elemNew.width, elemNew.height);
                                    var val1= Math.round(results2[0].confidence*100);
                                    var val2=Math.round(results2[1].confidence*100);

                                    document.getElementById('Class1').innerHTML = results2[0].label+ " ("+val1+"%)";
                                    if (results2[1].confidence>=0.2){document.getElementById('Class2').innerHTML = results2[1].label+ " ("+val2+"%)"};
                                    
                                    }
// CODE FOR IMAGE CLASSIFIER ENDS HERE

// CODE FOR CAM CLASSIFIER STARTS BELOW

function camClassifier(){
loop();
document.getElementById("elem").getContext("2d").clearRect(0,0,elem.width, elem.height);
  menuMode=2;
  document.getElementById("glow").style.display="none";
  document.getElementById("glow1").style.display="none";
  document.getElementById("contMenu").style.display="none";
  document.getElementById("credit").style.display="none";
  document.getElementById("contMenu").style.display="none";
  document.getElementById("image").style.display="none";
  document.getElementById("elem").style.display="none";
  document.getElementById("uploader").style.display="none";
  document.getElementById("Class1").style.display="block";
  document.getElementById("Class2").style.display="block";
  document.getElementById("gallery").style.display="inline-block";
  document.getElementById("picture").style.display="inline-block";
  document.getElementById("vid").style.display="inline-block";
  document.getElementById('Class1').innerHTML = "";
  document.getElementById('Class2').innerHTML = "";
  document.getElementById('pauseBtn').style.display="none";
  document.getElementById('playBtn').style.display="none";
  document.getElementById('snapBtn').style.display="block";
  document.getElementById('snapBtn').style.position="fixed";
  document.getElementById('snapBtn').style.bottom="20px";
  document.getElementById('snapBtn').style.left= Math.round(window.innerWidth/2)-20+"px";
document.getElementById('Class1').innerHTML = "Click on camera button to identify";
document.getElementById('Class2').innerHTML = "";
  cresult="";
  startCam();


}


                      function menuCam(){
                          menuMode=2;
                          startCam();
                        }

                        function menuVideo(){
                          menuMode=3;
                          startCam();
                        }

                        function startCam() {
                          console.log(menuMode);
                          // change style sheet
                          if (menuMode==2){
                            frameRate(30);
                          }

                          if (menuMode==3){
                            frameRate(30);
                          }


                            if (menuMode==2 | menuMode==3) {

                                    var options = {

                                         video: {

                                             facingMode: {
                                              exact: "environment"
                                            }

                                         },
                                    audio: false
                                       };


                                    w=window.innerWidth;
                                    head=120;
                                    h=0;
                                    if ((window.innerHeight-2*head)>w*1.33) {h=w*1.33;}
                                    else {h=window.innerHeight-2*head;}
                                    //console.log(w,h,head);
                                    cnv=createCanvas(w,h);
                                    posX=(window.innerWidth-w)/2;
                                    posY=head;
                                    cnv.position(posX, posY, 'relative');
                                    camCapture = createCapture(options);
                                    camCapture.size(w,h);
                                    camCapture.hide();
                                    // Create camera Button position

                                    }

                                  if (menuMode==2){snapBtn.addEventListener("click", snapFunction);}
                                  if (menuMode==3) {playBtn.addEventListener("click", playClassify);
                                  pauseBtn.addEventListener("click", pauseClassify);}

                        }


                        function draw() {
                              if (menuMode==0 & status1==1 & status2==1) {document.getElementById("glow1").innerHTML="Identify 120 breeds";
                                                                          document.getElementById("contMenu").style.display="block";}
                               if (menuMode==2 | menuMode==3){loop(); image(camCapture,0,0,w,h);}
                        }

                        function snapFunction(){
                                    if (menuMode==2){doglbl="";detector.detect(camCapture,camGotDetection);}
                        }

                        function camClassification(){
                                    if(menuMode==2){classifier.classify(camCapture,camGotResults);}
                        }

                        function camGotDetection(error,results1) {
					noLoop();
                                  	if(error){
                                           console.error(error);
                                         }
                                  	for(let i = 0; i<results1.length; i++){
                                         let object = results1[i];
					 objX=object.x;
					 objY=object.y;
					 objW=object.width;
					 objH=object.height;
					 if (i==0) {lbl=object.label;}
      if (i>0) {lbl=lbl+"-"+object.label;}
      if(object.label=="dog") {doglbl=object.label;}
                                         
                                  }
				
				if (doglbl=="dog"){document.getElementById("Class1").innerHTML=doglbl;camClassification();}
                                         else {loop(); document.getElementById("Class1").innerHTML=lbl;
                                                document.getElementById("Class2").innerHTML="";}
                          }

                          function camGotResults(error, results2) {
                                    if (error) {
                                      console.error(error);
                                    }
                                    cresult = results2[0].label;
				  strokeWeight(5);
					  noFill();
					  rect(objX,objY,objW,objH);
					  noStroke();
					  fill(255,15,57);
					  textSize(18);
					  textFont("Lato");
					  text(cresult, objX+ 10, objY + 24);
                                    document.getElementById("Class1").innerHTML="dog";
                                    document.getElementById("Class2").innerHTML="Breed: "+cresult;
                                    document.getElementById("Class2").style.color="#00ff00";
				  
					
				  loop();
                          }

//// Video classification begins HERE
function vidClassifier(){
loop();
document.getElementById("elem").getContext("2d").clearRect(0,0,elem.width, elem.height);
  menuMode=3;
  document.getElementById("glow").style.display="none";
  document.getElementById("glow1").style.display="none";
  document.getElementById("contMenu").style.display="none";
  document.getElementById("credit").style.display="none";
  document.getElementById("contMenu").style.display="none";
  document.getElementById("image").style.display="none";
  document.getElementById("elem").style.display="none";
  document.getElementById("uploader").style.display="none";
  document.getElementById("Class1").style.display="block";
  document.getElementById("Class2").style.display="block";
  document.getElementById("gallery").style.display="inline-block";
  document.getElementById("picture").style.display="inline-block";
  document.getElementById("vid").style.display="inline-block";
  document.getElementById('Class1').innerHTML = "";
  document.getElementById('Class2').innerHTML = "";
  document.getElementById('snapBtn').style.display="none";
  document.getElementById('playBtn').style.display="block";
  document.getElementById('playBtn').style.position="fixed";
  document.getElementById('playBtn').style.bottom="20px";
  document.getElementById('playBtn').style.left= Math.round(window.innerWidth/2)-70+"px";
  document.getElementById('pauseBtn').style.display="block";
  document.getElementById('pauseBtn').style.position="fixed";
  document.getElementById('pauseBtn').style.bottom="20px";
  document.getElementById('pauseBtn').style.left= Math.round(window.innerWidth/2)+30+"px";
  cresult="";

document.getElementById('Class1').innerHTML = "Play to start classifier and pause to stop";
document.getElementById('Class2').innerHTML = "";
  startCam();
}

function playClassify(){
if(menuMode==3) {play=0; loop();
detector.detect(camCapture,vidGotDetection);}

}

function pauseClassify(){

if(menuMode==3) {doglbl=""; play=1;}
}

function vidClassification(){
  if(menuMode==3) {classifier.classify(camCapture,vidGotResults);}
}

function vidGotDetection(error,results1) {
strokeWeight(0);
//document.getElementById("Class2").innerHTML="";
	if(error){
         console.error(error);
       }
	for(let i = 0; i<results1.length; i++){
       object = results1[i];
	objX=object.x;
         objY=object.y;
         objW=object.width;
         objH=object.height;

       if (i==0) {lbl=object.label;}
      if (i>0) {lbl=lbl+"-"+object.label;}
      if(object.label=="dog") {doglbl=object.label;}
stroke(255,15,57);
  strokeWeight(2);
  noFill();
  rect(objX,objY,objW,objH);
  noStroke();
  fill(255,15,57);
  textSize(18);
  textFont("Lato");
  text(object.label, objX+ 10, objY + 24);
 fill(0,0,0);
}
      if (play==0 & doglbl=="dog") {vidClassification();}
      if (play==0 & doglbl!="dog") {document.getElementById("Class1").innerHTML=lbl; playClassify();}
	if (play==1){document.getElementById("Class1").innerHTML= "Classifier paused. Click on Play  to start.";
                    document.getElementById("Class2").innerHTML= "";}
	
}

function vidGotResults(error, results2) {
  document.getElementById("Class2").innerHTML="";
	if (error) {
    console.error(error);
  }
  cresult = results2[0].label;
  
  document.getElementById("Class2").innerHTML="Breed: "+cresult;
  document.getElementById("Class2").style.color="#00ff00";
	
if (play==0) {playClassify();}  
if (play==1){document.getElementById("Class1").innerHTML= "Classifier paused. Click on Play  to start.";
                document.getElementById("Class2").innerHTML= "";}

}
