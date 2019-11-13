var timerId = null; //variavel que armazena a chamada da função timeout

function playPop(){
	var pop = new Audio();
	pop.src ="audio/pop.mp3";
	pop.play();
	}
function playWin(){
	var win = new Audio();
	win.src = "audio/win_or_lose/win.mp3";
	win.play();
		}
 	
 function playLose( ) {
  	var lose = new Audio();
	lose.src = "audio/win_or_lose/game_over.mp3";
	lose.play();
     }
 


function iniciaJogo() {
	
	var url = window.location.search;
	
	var nivel_jogo = url.replace("?","");
	
	var tempo_segundos = 0;
	
	if (nivel_jogo ==1){
		tempo_segundos = 120;
	}
	
	if (nivel_jogo ==2){
		tempo_segundos = 60;
	}

	if (nivel_jogo ==3){
		tempo_segundos = 30;
	}

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML=tempo_segundos; 


	var qtde_baloes =50;
	
	criar_baloes(qtde_baloes);

	//imprimindo a quantidade de baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1);

}

 function contagem_tempo(segundos){
 	
 	segundos = segundos - 1;
 	
 	if(segundos == -1){
 		clearTimeout(timerId); // para a execução da funcão setTimeout
 		game_over();  
 		return false;

 	}
 	
 	document.getElementById('cronometro').innerHTML = segundos;

 	timerId = setTimeout("contagem_tempo("+segundos+")",1000);
 }	
 
 function game_over (){
 	remove_eventos_baloes();
 	window.location.href = "game_over.html";
	 //alert('Fim de jogo, você não conseguiu estourar todos os baloes há tempo');
 }

 function criar_baloes(qtde_baloes){
 	for (var i = 1; i <= qtde_baloes; i++) {
 		
 		var balao = document.createElement("img");
 		balao.src = 'imagens/balao_azul_pequeno.png';
 		balao.style.margin='10px';
 		balao.id = 'b'+i;
 		balao.onclick = function(){estourar(this);};

 		document.getElementById('cenario').appendChild(balao);
 	}

 }
  function estourar (e){
  	var id_balao = e.id;
  	
  	document.getElementById(id_balao).setAttribute("onclick","")
  	
  	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	  
	playPop();
  	
       pontuacao(-1);
	  
  }

function pontuacao (acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros,baloes_estourados);
	
}
function situacao_jogo(baloes_inteiros, baloes_estourados){
	if(baloes_inteiros ==0){
		alert('Parabéns, você conseguiu estourar todos os balões a tempo!');
		playWin()
		parar_jogo();
		}
	}
 function parar_jogo(){
 	clearTimeout(timerId);
}
function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

