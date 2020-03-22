
var board=new Array();
var score = 0;
var hasConflicted = new Array()

$(document).ready(function(){
    newgame();
});//jquery生效必要条件

function newgame(){
	//初始化棋盘格
    init(); 
    generateOneNumber();
    generateOneNumber();
    //在随机两个格子生成数字
}

function init(){
    for( var i = 0 ; i < 4 ; i ++)//双重遍例，把所有格子的坐标都遍历进去
        for(var j = 0 ; j < 4 ; j ++ ){
        
        var gridCell = $('#grid-cell-'+i+'-'+j);//通过id把所有格子元素遍历到geidCell里面去
        gridCell.css('top', getPosTop( i , j ) );//各格子的css设定，top值，left值根据getposxxx对应
        gridCell.css('left', getPosLeft( i , j ) );
    }


    for( var i = 0 ; i < 4 ; i ++ ){
        board[i] = new Array();//这样board就是一个二维数组了
        hasConflicted[i]=new Array()
        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;//游戏开始boardij值为零
            hasConflicted[i][j]=false;
        }
    }

    updateBoardView();//根据board的值对numbercell的元素进行操作！//每次操作都会用到
    
    score = 0;


}                     

function updateBoardView(){

    $(".number-cell").remove();
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
            //用jQuery的append把number-cell和number-cell-i-j添加进块块里面
            var theNumberCell = $('#number-cell-'+i+'-'+j);//theNmberCell获取了这些的全部属性


            if( board[i][j] == 0 ){//此时numbercell显现不出来
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + 50 );//放在grid-cell中间
                theNumberCell.css('left',getPosLeft(i,j) + 50 );
            }
            
            else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i, j));
                theNumberCell.css('left',getPosLeft(i,j));//把grid-cell盖住了
                theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                theNumberCell.css('color',getNumberColor( board[i][j] ) );
                theNumberCell.text( board[i][j] );
            }

            hasConflicted[i][j]=false;
                    }
}

  
function generateOneNumber(){
    if( nospace( board ))//没有空格
        return false;
//一个位置
    var randx=parseInt(Math.floor(Math.random()*4));//随机整数型x坐标0，1，2，3
    var randy=parseInt(Math.floor(Math.random()*4));//随机整数型y坐标0，1，2，3

        while(true){
            if(board[randx][randy]==0)
            break;
             randx=parseInt(Math.floor(Math.random()*4));
             randy=parseInt(Math.floor(Math.random()*4));
        }
  
//生成一个数字2or4
    var randNumber=Math.random()<0.5?2:4;//随机数小于0.5输入2；大于0.5输入4
//在随机位置显示数字
    board[randx][randy]=randNumber; 
    showNumberWithAnimation(randx,randy,randNumber);





    return true;
}

$(document).keydown(function(event){
    switch(event.keyCode){
        case 37://左
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                steTimeout("isgameover()",300);
          }
            break;
        case 38://上
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                steTimeout("isgameover()",300);
          }
            break;
        case 39://右
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                steTimeout("isgameover()",300);
          }
            break;
        case 40://下
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                steTimeout("isgameover()",300);
          }
            break;
    default:
        break;
          }

});

function isgameover(){
    if(nospace(board) && nomove(board)){
        gameover();
    }
   }

function gameover(){
    alert('游戏结束了噢！');
}

function moveLeft(){
    if(!canMoveLeft(board))
        return false;
    //moveleft
    for(var i=0;i<4;i++)//这里的遍历时i行全部遍历，第一列不遍历
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){

                for(var k=0;k<j;k++){//遍历k，k在在这里是小于j列的全部数
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){//第i行从k这一列到j这一列
                        //k是第i行上面,k左侧遍历出来的
                        showMoveAnimation(i,j,i,k);
                        //告诉可以从ij移动到ik了
                        board[i][k]=board[i][j];
                        board[i][j]=0;

                        continue;

                        //move
                    }
                    else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&& !hasConflicted[i][j]){
                        showMoveAnimation(i,j,i,k);

                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        //add
                        score=score+board[i][k];
                        updateScore(score);//定义函数，通知前台
                        //add score
                        hasConflicted[i][k]=true;
                        continue;

                    }
                }
            }
        }
           setTimeout("updateBoardView()",200);
            return true;

        }
        

function moveRight(){
    if(!canMoveRight(board))
        return false;
    //moveUp
    for(var i=0;i<4;i++)
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){

                for(var k=3;k>j;k--){
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){//第i行，从j到k
                        //k是第i行上j列右侧遍历出来的，k是比j大的坐标
                        showMoveAnimation(i,j,i,k);
                        //告诉可以从ij移动到ik了
                        board[i][k]=board[i][j];
                        board[i][j]=0;

                        continue;

                        //move
                    }
                    else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&& !hasConflicted[i][j]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][k];
                        board[i][j]=0;
                        //add
                        score=score+board[i][k];
                        updateScore(score);//定义函数，通知前台
                        //add score
                        hasConflicted[i][j]=true;
                        continue;
                    }
                }
            }
        }
            setTimeout("updateBoardView()",200);
            return true;

        }
    

function moveUp(){
    if(!canMoveUp(board))
        return false;
    //moveleft
    for(var j=0;j<4;j++)//这里的遍历时j列全部遍历，第一行不遍历
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){

                for(var k=0;k<i;k++){//遍历k，k在在这里是小于i行的全部数
                    if(board[k][j]==0 && noBlockUpright(j,k,i,board)){//第j列，从k行到i行

                        showMoveAnimation(i,j,k,j);
                        //告诉可以从ij移动到ik了
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        
   
                        //add score
                        continue;

                        //move
                    }
                    else if(board[k][j]==board[i][j]&&noBlockUpright(i,k,j,board)&& !hasConflicted[i][j]){
                        showMoveAnimation(i,j,k,j);

                        board[k][j]=board[k][j]*2;
                        board[i][j]=0;
                        score=score+board[k][j];
                        updateScore(score);//定义函数，通知前台                        
                        //add
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
            setTimeout("updateBoardView()",200);
            return true;

        }
        

        
function moveDown(){
    if(!canMoveUp(board))
        return false;
    //moveleft
    for(var j=0;j<4;j++)//这里的遍历时j列全部遍历，最后行不遍历
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){

                for(var k=3;k>i;k--){//遍历k，k在在这里是大于i行的全部数
                    if(board[k][j]==0 && noBlockUpright(j,i,k,board)){//第j列从i行到k行

                        showMoveAnimation(i,j,k,j);
                        //告诉可以从ij移动到ik了
                        board[k][j]=board[i][j];
                        board[i][j]=0;

                        continue;

                        //move
                    }
                    else if(board[k][j]==board[i][j]&&noBlockUpright(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);

                        board[k][j]=board[k][j]*2;
                        board[i][j]=0;
                        //add
                        score=score+board[k][j];
                        updateScore(score);//定义函数，通知前台
                        //add score   
                        hasConflicted[k][j]=true;                    
                        continue;
                    }
                }
            }
        }
           setTimeout("updateBoardView()",200);
            return true;

        }
