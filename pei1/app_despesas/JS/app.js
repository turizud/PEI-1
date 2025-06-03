class Despesa{ // atribuir valores aos as class
	constructor( mes, dia, hora, tipo, descricao, valor){
		this.mes = mes
		this.dia = dia
		this.hora = hora
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados(){ // caso não preencha todos os dados, retorne false
		for(let i in this){ //acessa atributos de objetos
		   if(this[i] == undefined || this[i] == '' || this[i] == null ){
		   	return false
		   }
		}
		return true
	}

}

class Bd{

	constructor(){
		let id = localStorage.getItem('id')

		if(id === null){ //iniciara com valor zero
			localStorage.setItem('id', 0)
		}
	}

	getProximoId(){ // pra nao ficar sobrepondo o ID anterior
      let proximoId = localStorage.getItem('id')
      return parseInt(proximoId) + 1
	}

	gravar(d){ //função que decide o local de armazenamento
      let id = this.getProximoId()

      localStorage.setItem(id, JSON.stringify(d))

      localStorage.setItem('id',id)
    }

    recuperaRegistro(){

    	//array de despesa
        let despesas = Array()

    	let id = localStorage.getItem('id')

        // recupera as despesas no localStorage
    	for(let i = 1; i <= id; i++){

    		//recupera as despesas usando JSON pra trasnformar string em objetos
    		let despesa = JSON.parse(localStorage.getItem(i))

    		//caso tenha indices pulados ou removidos
    		//neste caso vamos pular 
    		if(despesa === null){
    			continue
    		}
            
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa){ // aplicando filtro 

    	let despesesFiltradas = Array

      despesesFiltradas = this.recuperaRegistro()

      //mes
      if(despesa.mes!= ''){
           despesesFiltradas.filter(d => d.mes == despesa.mes)
        }

      //dia
       if(despesa.dia!= ''){
           despesesFiltradas.filter(d => d.dia == despesa.dia)
        }

      //hora 
        if(despesa.hora!= ''){
           despesesFiltradas.filter(d => d.hora == despesa.hora)
        }

      //tipo
        if(despesa.tipo!= ''){
           despesesFiltradas.filter(d => d.tipo == despesa.tipo)
        }

      //descricao
        if(despesa.descricao!= ''){
           despesesFiltradas.filter(d => d.descricao == despesa.descricao)
        }

      //valor
        if(despesa.valor!= ''){
           despesesFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesesFiltradas
    } 


}

let bd = new Bd()

function cadastrarDespesa(){ //função pra pegar os dados 

	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let hora = document.getElementById('hora').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value    


	let despesa = new Despesa(
		mes,
		dia,
		hora,
		tipo,
	    descricao,
	    valor) //variavel pra usar os dados que pegou


    if(despesa.validarDados()){
	  
	 bd.gravar(despesa) // armazenada a variavel
	  
	   document.getElementById('modal_titulo').innerHTML = 'Registro de sucesso'
	   document.getElementById('modal_titulo_div').className = 'modal-header text-success'
       document.getElementById('modal_conteudo').innerHTML = 'Dispesa foi cadastrada com sucesso'
       document.getElementById('model_btn').innerHTML = 'voltar'
       document.getElementById('model_btn').className = 'btn btn-success'


            // pra esvaziar o espaço de registro depois de colocar os valores
			mes.value = ''
			dia.value = ''
			hora.value = ''
			tipo.value = ''
		    descricao.value = ''
		    valor.value = ''
        
     $('#modalregistraDespesas').modal('show')

    }else{
      
        document.getElementById('modal_titulo').innerHTML = 'erro de gravação'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'erro na gravação, verifique se todos os campos foram preenchidos corretamente'
        document.getElementById('model_btn').innerHTML = 'voltar e corrigir'
        document.getElementById('model_btn').className = 'btn btn-danger'

        $('#modalregistraDespesas').modal('show') 
    }   
}

function carregaLista(despesas = Array()){

	if (despesas.length == 0) { 

	despesas = bd.recuperaRegistro() 
    }

	let listaDespesas = document.getElementById('listaDespesas') 
	listaDespesas.innerHTML = ' '

	/*tr>
	  0 = <td></td>
	  1 = <td></td>
	  2 = <td></td>
	  3 = <td></td>
	<tr>*/


	//percorrer o Array despesas, listando cada despesa de forma dinamica
	despesas.forEach(function(d){


		//cirando a linha da <tr>
		let linha = listaDespesas.insertRow()

		//criar as <td>
		linha.insertCell(0).innerHTML = d.dia
        linha.insertCell(1).innerHTML = d.hora

		// ajustar o tipo

         switch(d.tipo){
            case '1' : d.tipo = 'Manicure'
                break
            case '2' : d.tipo = 'Gel'
                break
            case '3' : d.tipo = 'Fibra'
                break
            case '4' : d.tipo = 'Manuteção'
                break
             }

		linha.insertCell(2).innerHTML = d.tipo
		linha.insertCell(3).innerHTML = d.descricao
		linha.insertCell(4).innerHTML = d.valor
        
	})
}

function pequisaDespesas(){
    let mes =  document.getElementById('mes').value
    let dia =  document.getElementById('dia').value
    let hora =  document.getElementById('hora').value
    let tipo =  document.getElementById('tipo').value
    let descricao =  document.getElementById('descricao').value
    let valor =   document.getElementById('valor').value

    let despesa = new Despesa( mes, dia, hora, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

     this.carregaLista()
 }
