console.clear();
// let  Allcard = document.querySelector(".picture")
var LevNum = document.querySelector(".LevelNum");
var cards = document.querySelector(".cards");
let userinput = [];
let level = [["1","2","3","4"],
             ["1","3","2","4"],
            ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"],
             ["10","12","15","1","4","2","7","3","9","11","5","13","8","14","6","16"]
]; //,"123456789ABCDEFG" 123456789 10 11 12 13 14 15 16 , 152643789 12 13 15 16 14 10 11
let count = 0;
let i = 0; //關卡/
let gamemode = 0; //0電腦 1玩家
let sec = 200; //delay
let correctNum = 0;
let PIC1=[]
let PIC2=[]
//----------------- 4 re card------------------
let LevelUp4AddCard = 2; // X * X
//-----------------------------------------start---------------------------------------------
//先把圖片塞進去
const startGame = function (X) {
  PIC1=[]
  PIC2=[]
  // console.log(level[i].length)//4,16
  gamemode = 0;
  LevNum.innerHTML = "Level: " + i;
  // let a=level[i]
  if (gamemode == 0) {
    if (LevelUp4AddCard != Math.sqrt(level[i].length)) {
      LevelUp4AddCard = Math.sqrt(level[i].length);
      addCards();
    }
    let levelX = level[i]; // level 0 //地0關
    // let inputpicture = levelX.split(""); //     "1234" =>"1","2",..
    // console.log("變身後:",inputpicture)
    
    // console.log("levelX: ", levelX, " inputpicture: ", inputpicture);
    //放入圖片
    PutInPicture(levelX);
  }
};
const PutInPicture = function (number) {
  number.forEach((qq) => {
    
    if (count == 0) {
      let inHtml = `<img class="picture picture1" src="http://png.pngtree.com/element_our/md/20180627/md_5b33460fe6357.jpg"width="100px"  height="120px">`;
      let card = `.card${qq}`;
      // console.log(card)
      let el = document.querySelector(card);
      el.insertAdjacentHTML("afterBegin", inHtml);
      count = 1;
      
      PIC1.push(qq)
      // console.log(PIC1)
      StartDelay4Hidden(el);
    } else {
      let inHtml = `<img class="picture picture2" src="https://png.pngtree.com/element_our/png_detail/20181206/folder-vector-icon-png_260858.jpg" width="100px" height="120px">`;
      let card = `.card${qq}`; //.card1
      // console.log("card ",card) //.cardA
      let el = document.querySelector(card);
      el.insertAdjacentHTML("afterBegin", inHtml);
      count = 0;
      PIC2.push(qq)
      StartDelay4Hidden(el);
    } //else
  }); //each
};

//Delay
const StartDelay4Hidden = function (cardX) {
  //指定的.cardX
  let picture = cardX.querySelector(".picture");
  hidden = cardX.getAttribute("hidden");
  setTimeout(() => {
    picture.setAttribute("hidden", "hidden");
    gamemode = 1;
  }, 3500 - sec);
};
//wrong 2 close
const Wrong = function (cardX) {
  //指定的.cardX
  let picture = cardX.querySelector(".picture");
  hidden = cardX.getAttribute("hidden");
  setTimeout(() => {
    picture.setAttribute("hidden", "hidden");
    gamemode = 1;
  }, 1000);
};
//audio
const sound = function (a) {
  if (a == 0) {
    //wrong
    let w = new Audio(
      "https://orangefreesounds.com/wp-content/uploads/2014/08/Wrong-answer-sound-effect.mp3?_=1"
    );
    w.play();
  } else if (a == 1) {
    //correct anyone
    let s = new Audio(
      "https://orangefreesounds.com/wp-content/uploads/2020/12/Pling-sound-effect.mp3?_=1"
    );
    s.play();
  } else if (a == 2) {
    //all correct
    let z = new Audio(
      "https://orangefreesounds.com/wp-content/uploads/2020/08/Correct-answer-ding-dong-and-applause.mp3?_=1"
    );
    z.play();
  }
};
//remove cards
const clearAllCard = function () {
  if (i < level.length) {
    let levelX = level[i]; // level 0 //地0關
    // let everyone = levelX.split(""); //     "1234" =>"1","2",..
    levelX.forEach((one) => {
      // console.log("one: ",one )
      one = `.card${one}`;
      one = document.querySelector(one);
      // console.log("one:",one)
      if (one != null){
        one.innerHTML = "";
       }
    });
    gamemode = 0;
    //go back 2 begin
    startGame(1);
  } else {
    LevNum.innerHTML = "!!! Congratulations , All Clear !!!";
    //restart
    i = 0;
  }
};

const removeAtt = function(temppp){
  return temppp.removeAttribute("hidden");
}
//翻開的動作
const open4match = function (array, choosen) {
  if (array.length == 1) {
    let temp = `.card${choosen}`; //先指定哪區的.cardX
    temp = document.querySelector(temp); //再用temp2指定那區(.cardX)
    let choPic = temp.querySelector(".picture"); //就可以抓到.pic
    choPic.removeAttribute("hidden");
  } else {
    // let choCount = array.split(""); //if 1=3 2=4  & choose 1&3
    let choCount1 = array[0];
    let choCount2 = array[1];
    let CardX1 = `.card${choCount1}`;
    let CardX2 = `.card${choCount2}`;
    let temp1 = document.querySelector(CardX1);
    let temp2 = document.querySelector(CardX2);
    let temp1_1 = temp1.querySelector(".picture");
    let temp2_1 = temp2.querySelector(".picture"); //剛開始翻(沒有判斷正不正確
    
    // console.log("choCount1:",choCount1,"choCount2:",choCount2)
    temp1_1.removeAttribute("hidden");
    temp2_1.removeAttribute("hidden"); //
    
    //判斷正確
    let nowLevel = level[i];
    // nowLevel = nowLevel.split("");
    // console.log("nowLevel: ", nowLevel); // '1''2''3''4'
    if (//配對成功
      // temp1_1 ==temp2_1 
      // nowLevel.indexOf(choCount1) + 2 == nowLevel.indexOf(choCount2) || 
      // nowLevel.indexOf(choCount1) == nowLevel.indexOf(choCount2) + 2
     (PIC1.includes(choCount1) && PIC1.includes( choCount2) )||(PIC2.includes(choCount1) &&PIC2.includes( choCount2))
    ){
      temp1_1.removeAttribute("hidden");
      temp2_1.removeAttribute("hidden");
      correctNum++;
      if (correctNum == level[i].length / 2) {
        //破關 關卡+1 清掉所有卡片 corrNum=0
        i++;
        correctNum = 0;
        sound(2);
        setTimeout(() => {
          clearAllCard();
          sec += 1400;
        }, 3500 - sec);
      } else {
        //還有尚未答對的
        sound(1);
      }
    } 
    else {
      //wrong
      Wrong(temp1);
      Wrong(temp2);
      sound(0);
    }
  }
};

//get user input
const GetUserInput = function (choosen) {
  if (gamemode == 1) {
                           // console.log(userinput)
    if (userinput.length <= 1) {
      // userinput += choosen;
      userinput.push(choosen)
      console.log(userinput)
      // console.log("userinput: ",userinput , "choosen: ",choosen)
      open4match(userinput, choosen);
    } else {
      userinput = [];
      userinput.push(choosen);
      // console.log("userinput: ",userinput , "choosen: ",choosen)
      open4match(userinput, choosen);
    }
  }
};

//新增cards
const addCards = function () {
  let Retemp1 = 1;
  let Retemp2 = 1;
  let Rowtemp = 1; //class" row1,2,3..."
  let REgetuserinput = 1; //當我升等 全部洗掉 getuserInput也重1開始
  cards.innerHTML = ""; // 清空

  for (Retemp1 = 1; Retemp1 <= LevelUp4AddCard; Retemp1++) {
    let RowReCard = `<div class="row row${Rowtemp}"></div>`; //重新新增row
    cards.insertAdjacentHTML("beforeend", RowReCard);

    let temp = `.row${Rowtemp}`;

    let row = addCards4insert(temp); //在cards裡面 新增一個row後 {找到那個row} 再用下面去新增內容
    Rowtemp++;
    for (Retemp2 = 1; Retemp2 <= LevelUp4AddCard; Retemp2++) {
      let CulReCard = `<div class="card card${REgetuserinput}" onclick="GetUserInput('${REgetuserinput}')"></div>`;
      row.insertAdjacentHTML("beforeend", CulReCard);
      REgetuserinput++;
      // console.log("REgetuserinput now:",REgetuserinput)
    }
    Retemp2 = 1;
  }
}; //end
const addCards4insert = function (temp) {
  let row = cards.querySelector(temp);
  return row;
};

//