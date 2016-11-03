window.onload = function(){
  createpuzzle();
  var solvedgrid = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,99];
  var shuffledgrid;

  document.getElementById("shufflebutton").onclick = function(){
    window.shuffledgrid = shuffle(solvedgrid);
    shufflepuzzle(shuffledgrid);
    solvedgrid = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,99];
    return shuffledgrid;
  }

  document.getElementById("puzzlearea").onclick = function(event) {
    var target = event.target || event.srcElement;
    window.shuffledgrid = move(shuffledgrid,target.innerHTML);
    console.log(window.shuffledgrid);
    shufflepuzzle(window.shuffledgrid);
};
}

function createpuzzle(){
  var puzzlearea = document.getElementById("puzzlearea").children;
  var col = 4, newtop =0, newleft =0;
  puzzlearea[0].className ="puzzlepiece";
  puzzlearea[0].style.backgroundPosition = "0px 0px"
  document.getElementById("puzzlearea").appendChild(document.createElement("div"));
  for (var i = 1; i < puzzlearea.length; i++) {
    puzzlearea[i].className = "puzzlepiece";
    if ((i % col) == 0) {
      newtop   = puzzlearea[i-col].offsetTop + puzzlearea[i-col].offsetHeight;
      puzzlearea[i].style.top = newtop+"px";
      puzzlearea[i].style.backgroundPosition = "0px " + (newtop*(-1))+"px";
    } else {
      if (puzzlearea[i-col]){
        newtop   = puzzlearea[i-col].offsetTop + puzzlearea[i-col].offsetHeight;
        puzzlearea[i].style.top = newtop+"px";
        puzzlearea[i].style.backgroundPosition = (newleft*(-1))+"px " + (newtop*(-1))+"px";
      }
      newleft = puzzlearea[i-1].offsetLeft + puzzlearea[i-1].offsetWidth;
      puzzlearea[i].style.left = newleft+"px";
      puzzlearea[i].style.backgroundPosition = (newleft*(-1))+"px " + (newtop*(-1))+"px";
    }
  }

}

function shuffle(list) {
    var sub = list.length/5;
    for (var i = 0; i < Math.floor((Math.random()*100)%50); i++) {
      var sublist1 = list.splice(0, sub+2);
      var sublist2 = list.splice(0, sub);
      var sublist3 = list.splice(0, sub-1);
      var sublist4 = list.splice(0, sub);
      list = list.concat(sublist4,sublist1,sublist2,sublist3);
    }
    return list;
  }

function shufflepuzzle(list){
  var puzzlearea = document.getElementById("puzzlearea").children;
  for (var i = 0; i < puzzlearea.length; i++) {
    if (list[i]==99) {
      if (i-1>=1 && (i+1)%4!=0) {
        puzzlearea[i-1].className="puzzlepiece movablepiece";
      }
      if (i+1<16 && (i+1)%4==1) {
        puzzlearea[i+1].className="puzzlepiece movablepiece";
      }
      if (i-4>=1) {
        puzzlearea[i-4].className="puzzlepiece movablepiece";
      }
      if (i+4<16) {
        puzzlearea[i+4].className="puzzlepiece movablepiece";
      }
      puzzlearea[i].innerHTML="";
      puzzlearea[i].style.backgroundImage = "none";
    }
    else if (list[i]<5) {
      puzzlearea[i].innerHTML=list[i];
      puzzlearea[i].className="puzzlepiece";
      puzzlearea[i].style.backgroundImage = "url(background.jpg)";
      puzzlearea[i].style.backgroundPosition = ((list[i]-1)*-100)+"px "+"0px";
    }
    else if (list[i]<9) {
      puzzlearea[i].innerHTML=list[i];
      puzzlearea[i].className="puzzlepiece";
      puzzlearea[i].style.backgroundImage = "url(background.jpg)";
      puzzlearea[i].style.backgroundPosition = ((list[i]-5)*-100)+"px "+"-100px";
    }
    else if (list[i]<13) {
      puzzlearea[i].innerHTML=list[i];
      puzzlearea[i].className="puzzlepiece";
      puzzlearea[i].style.backgroundImage = "url(background.jpg)";
      puzzlearea[i].style.backgroundPosition = ((list[i]-9)*-100)+"px " +"-200px";
    }
    else {
      puzzlearea[i].innerHTML=list[i];
      puzzlearea[i].className="puzzlepiece";
      puzzlearea[i].style.backgroundImage = "url(background.jpg)";
      puzzlearea[i].style.backgroundPosition = ((list[i]-13)*-100)+"px " +"-300px";
    }
  }
}

function move(list2, value) {
  var list =list2;
  var rowlist1=[];
  var rowlist2=[];
  var rowlist3=[];
  var rowlist4=[];

  var collist1=[];
  var collist2=[];
  var collist3=[];
  var collist4=[];
  for (var i = 1; i <= list.length; i++) {
    if (i==1+4*(Math.floor(i/4))){
      collist1.push(list[i-1]);
    }
    else if (i==2+4*(Math.floor(i/4))){
      collist2.push(list[i-1]);
    }
    else if (i==3+4*(Math.floor(i/4))){
      collist3.push(list[i-1]);
    }
    else {
      collist4.push(list[i-1]);
    }
  }
  for (var i = 0; i < list.length; i++) {
    if (i<4){
      rowlist1.push(list[i]);
    }
    if (4<=i && i<8){
      rowlist2.push(list[i]);
    }
    if (8<=i && i<12){
      rowlist3.push(list[i]);
    }
    if (12<=i){
      rowlist4.push(list[i]);
    }
  }
  var col = [collist1,collist2,collist3,collist4];
  var row = [rowlist1,rowlist2,rowlist3,rowlist4];
  var movelist=[];
  var changedlist=[];
  var count;

  for (var i = 0; i < col.length; i++) {
    if (col[i].indexOf(99)!=-1 && col[i].indexOf(value)!=-1) {
      count = true;
      if (col[i].indexOf(99) < col[i].indexOf(value)) {
        for (var j = 0; j < col[i].length ; j++) {
          if (j >= col[i].indexOf(99)) {
            movelist.push(col[i][j+1]);
          }
          else {
            movelist.push(col[i][j]);
          }
        }
        movelist[col[i].indexOf(value)] = 99;
        for (var k = 0; k < movelist.length; k++) {
          changedlist[k*4+i]=movelist[k];
        }
      }
      else {
        for (var j = (col[i].length-1); j >=0; j--) {
          if (j > col[i].indexOf(value)) {
            movelist.unshift(col[i][j-1]);
          }
          else {
            movelist.unshift(col[i][j]);
          }
        }
        movelist[col[i].indexOf(value)] = 99;
        for (var k = 0; k < movelist.length; k++) {
          changedlist[k*4+i]=movelist[k];
        }
      }
    }
    else {
      for (var k = 0; k < col[i].length; k++) {
        changedlist[k*4+i]=col[i][k];
      }
    }
  }
  if (count) {
    return changedlist;
  }
  count=false;
  movelist=[];
  changedlist =[];

  for (var i = 0; i < row.length; i++) {
    if (row[i].indexOf(99)!=-1 && row[i].indexOf(value)!=-1) {
      count = true;
      if (row[i].indexOf(99) < row[i].indexOf(value)) {
        for (var j = 0; j < row[i].length ; j++) {
          if (j >= row[i].indexOf(99)) {
            movelist.push(row[i][j+1]);
          }
          else {
            movelist.push(row[i][j]);
          }
        }
        movelist[row[i].indexOf(value)] = 99;
        for (var k = 0; k < movelist.length; k++) {
          changedlist.push(movelist[k]);
        }
      }
      else {
        for (var j = (row[i].length-1); j >=0; j--) {
          if (j > row[i].indexOf(value)) {
            movelist.unshift(row[i][j-1]);
          }
          else {
            movelist.unshift(row[i][j]);
          }
        }
        movelist[row[i].indexOf(value)] = 99;
        for (var k = 0; k < movelist.length; k++) {
          changedlist.push(movelist[k])
        }
      }
    }
    else {
      for (var k = 0; k < row[i].length; k++) {
        changedlist.push(row[i][k]);
      }
    }
  }
  if (count) {
    return changedlist;
  }
  return changedlist;
}
