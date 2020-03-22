
function getPosTop( i , j ){

    return 20 + i*120;
}//把对应格子应该的坐标与格子的位置相对应起来

function getPosLeft( i , j ){
    return 20 + j*120;
}

function getNumberBackgroundColor( number ){
	switch(number){
		case 2:return"#eee4da";break;
		case 4:return"#ede0c8";break;
		case 8:return"#f2b179";break;
		case 16:return"#f59563";break;
		case 32:return"#f67c5f";break;
		case 64:return"#f65e3b";break;
		case 128:return"#edcf72";break;
		case 256:return"#edcc61";break;
		case 512:return"#9c0";break;
		case 1024:return"#33b5e5";break;
		case 2048:alert('您被授予邓祖轩承认的‘科学家’称号！！！')return"#09c";break;
		case 4096:return"#a6c";break;
		case 8192:return"#93c";break;
			}
			return "black"

}


function getNumberColor( number ){
	if(number <= 4)
		return "#776e65";

	return "white";
}

function nospace( board ){
	for( var i = 0 ; i < 4 ; i++ )
		for( var j=0 ; j < 4 ; j++ )
			if( board[i][j] == 0)
				return false;

	return true;
}


function canMoveLeft(board){

	for(var i = 0 ; i < 4 ; i ++ )
		for(var j = 1 ; j < 4 ; j++ )
			if(board[i][j] != 0)
				if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
				//如果boardij不等于零（也就是不是空的）并且boardi，j左边的格子是空的或者其左边的格子等于其值
					return true;
	return false;
}

function canMoveRight(board){
	for( var i =0; i <4 ; i ++)
		for(var j = 2 ; j >=0  ; j-- )
			if(board[i][j] != 0)
				if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )
					return true;
	return false;
}


function canMoveUp(board){
	for( var j=0; j<4 ; j++)
		for( var i=1; i<4 ;i++ )
			if(board[i][j]!=0)
				if(board[i-1][j]==0||board[i-1][j]==board[i][j])
					return true;
    return false;
}

function canMoveDown(board){
	for( var j=0; j<4 ; j++)
		for( var i=2; i>=0 ;i-- )
			if(board[i][j]!=0)
				if(board[i+1][j]==0||board[i+1][j]==board[i][j])
					return true;
    return false;
}


function noBlockHorizontal( row , col1 , col2 , board ){//ikj;ijk  row行的col1到col2是否有障碍物
	for( var i = col1 + 1 ; i < col2 ; i ++)//从col1+1开始一直到小于col2的位置为止
		if( board[row][i] !=0 )//传入元素的那一行的col1+1到col2都为零才true
			return false;
	return true;
}

function noBlockUpright(col ,row1,row2,board){//col列从row1行到row2行是否有障碍物
	for (var i = row1+1; i <row2 ; i++)//从row+1行开始到row2行
	 
		if(board[i][col] !=0)
			return false;
	return true;
	

}

function nomove(board){
	if(canMoveDown(board)||canMoveLeft(board)||canMoveUp(board)||canMoveRight(board))
		return false;
	return true;
}
