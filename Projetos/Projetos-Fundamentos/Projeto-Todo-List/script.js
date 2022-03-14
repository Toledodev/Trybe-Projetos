  let inputTarefa = document.getElementById("texto-tarefa");
  let criarTarefa = document.getElementById("criar-tarefa");
  let listaTarefa = document.getElementById("lista-tarefas");
  let body = document.querySelector('body');
  

  criarTarefa.addEventListener("click", adicionaTarefa);

  function adicionaTarefa (){
      let valorTarefa = inputTarefa.value;
      let novaTarefa = document.createElement("li");
      novaTarefa.innerHTML = valorTarefa;
      listaTarefa.appendChild(novaTarefa);
      inputTarefa.value = "";
  }

  function addSelected(element){
      let tarefas = Array.from(listaTarefa.children);
      for (let index = 0; index < tarefas.length; index += 1){
          let tarefaAtual = tarefas[index];
          if(tarefaAtual.classList.contains("selected")){
              tarefaAtual.classList.remove("selected");
          }
      }
      element.classList.add("selected");
  }

  function checkItem(originEvent) {
    const element = originEvent.target;
    if (element.parentNode.id === 'lista-tarefas') {
      addSelected(element);
    }
  }

  body.addEventListener('click', checkItem);

  function markCompleted(element) {
    if (element.classList.contains('completed')) {
      element.classList.remove('completed');
    } else {
      element.classList.add('completed');
    }
  }

  function checkItem2(originEvent) {
    let element = originEvent.target;
    if (element.parentNode.id === "lista-tarefas") {
      markCompleted(element);
    }
  }
  body.addEventListener("dblclick", checkItem2);


  function apagaLista(){
     listaTarefa.innerText = "";
  }
  document.getElementById("apaga-tudo").addEventListener("click", apagaLista);

  function removeFinalizados(){
    let arrayLista = Array.from(listaTarefa.children);
      for(let index = 0; index < arrayLista.length; index += 1){
          if(arrayLista[index].classList.contains("completed")){
              listaTarefa.removeChild(arrayLista[index]);
          }
      }
  }
  document.getElementById("remover-finalizados").addEventListener("click", removeFinalizados);

  function saveList(){
    localStorage.setItem("key",listaTarefa.innerHTML); 
   }
  
  document.getElementById("salvar-tarefas").addEventListener("click", saveList);

  function getList(){
    listaTarefa.innerHTML = localStorage.getItem("key");
  }
  window.onload = getList;

 

  function upList(){
    let arrayList = Array.from(listaTarefa.children);
    for(let index = 0; index < arrayList.length; index += 1){
      if(arrayList[index].classList.contains("selected")){
        arrayList[index].classList.remove("selected")
        arrayList[index - 1].classList.add("selected");
      }
    }
  }
  document.getElementById("mover-cima").addEventListener("click", upList);
 
   

  function downList() {
    let arrayList = Array.from(listaTarefa.children);
    for( let index = 0; index < arrayList.length; index += 1) {
      if(arrayList[index].classList.contains("selected")) {
        listaTarefa.insertBefore(arrayList[index], arrayList[index+2]);
      }
    }
  }
  document.getElementById("mover-baixo").addEventListener("click", downList);

  function removeSelecionados(){
    let arrayLista = Array.from(listaTarefa.children);
      for(let index = 0; index < arrayLista.length; index += 1){
          if(arrayLista[index].classList.contains("selected")){
              listaTarefa.removeChild(arrayLista[index]);
          }
      }
  }
  document.getElementById("remover-selecionado").addEventListener("click", removeSelecionados);