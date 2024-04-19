let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModalView =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseModal = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

//+++++++++++++++++++++++++++++++ EVENTOS +++++++++++++++++++++++++++++++

addNote.addEventListener('click', (evt)=>{
  evt.preventDefault();
  modal.style.display = 'block';
  addNote.style.display = 'none';
  notes.style.display = 'none';
  document.querySelector("#input-id").value = "";
  document.querySelector("#input-title").value = "";
  document.querySelector("#input-content").value = "";
  
})


btnCloseModal.addEventListener('click', (evt) =>{
  evt.preventDefault();
  listNotes;
  modal.style.display='none';
  notes.style.display='flex';
  addNote.style.display='block';
})

btnSaveNote.addEventListener('click', (evt) =>{ 
  evt.preventDefault();
  let objNote = {
    id: document.querySelector("#input-id").value.trim(), 
    title: document.querySelector("#input-title").value.trim(), 
    content: document.querySelector("#input-content").value.trim()
  };
  console.log(objNote);
  saveNote(objNote);
  listNotes;
});

//+++++++++++++++++++++++++++++++ FUNÇÕES +++++++++++++++++++++++++++++++

const loadNotes = () => {
  let listNotes = localStorage.getItem('notes');
  if(!listNotes){
    listNotes = [];
  } else {
    listNotes = JSON.parse(listNotes);
  }
  return listNotes;
};  

const saveNote = (note) => {
  let listNotes = loadNotes();

  if(note.id.length < 1){
    note.id = new Date().getTime();
    document.querySelector('#input-id').value = note.id;
    listNotes.push(note);
  } else {
    listNotes.forEach((item, i) => {
      if(item.id == note.id){
        listNotes[i] = note;
      }
    });
  }

  note.lastTime = new Date().getTime();
  listNotes = JSON.stringify(listNotes);
  localStorage.setItem('notes', listNotes); 
  listNotes();
};


const showNote = (note) => {  
  document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>";
  document.querySelector('#content-note').innerHTML = "<p>"+note.content+"</p>" ;
  
  let controlsNote = document.querySelector('#controls-note');
  controlsNote.innerHTML = ""; // Limpa os controles
  
  let aDelete = document.createElement('a');
  aDelete.href = "#";
  let iDelete = document.createElement('i');
  iDelete.className = "bi bi-trash";
  iDelete.style.color = "#F00";
  aDelete.appendChild(iDelete);
  controlsNote.appendChild(aDelete);

  let aEdit = document.createElement('a');
  aEdit.href = "#";
  let iEdit = document.createElement('i');
  iEdit.className = "bi bi-pen";
  iEdit.style.color = "#F00";
  aEdit.appendChild(iEdit);
  controlsNote.appendChild(aEdit);

  aDelete.addEventListener("click", (evt) => {
    evt.preventDefault();
    deleteNote(note.id);
  });

  aEdit.addEventListener("click", (evt) => {
    evt.preventDefault();
    document.querySelector("#input-id").value = note.id;
      document.querySelector("#input-title").value = note.title;
      document.querySelector("#input-content").value = note.content;
      modal.style.display = 'block';
      addNote.style.display = 'none';
      notes.style.display = 'none';
      modalView.style.display = 'none';
  });

  modalView.style.display='block';
  notes.style.display='none';
  addNote.style.display='none';
};

const listNotes = () => {
  notes.innerHTML="";
  let listNotes = loadNotes();
  listNotes.forEach((item) =>{
    let divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.style.width = '18rem';
    divCard.style.marginTop = '40px';
    notes.appendChild(divCard)
    
    let divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
    divCard.appendChild(divCardBody);

    let h1 = document.createElement('h1');
    h1.innerText = item.title;
    divCardBody.appendChild(h1);

    let pContent = document.createElement('p');
    pContent.innerHTML = item.content;
    divCardBody.appendChild(pContent);

    let pLastTime = document.createElement('p');
    pLastTime.innerText = new Date(item.lastTime).toLocaleDateString();
    divCardBody.appendChild(pLastTime);

    divCard.addEventListener('click', (evt) => {
      evt.preventDefault();
      showNote(item);
    })
  })
};  

const deleteNote = (id) => {
  let noteDel = loadNotes(); 
    noteDel = noteDel.filter(note => note.id !== id); //se o id for diferente do id do modalView ele copia para noteDel se não, não copia
    localStorage.setItem('notes', JSON.stringify(noteDel));
    

    modalView.style.display='none';
    addNote.style.display = 'flex';
    notes.style.display = 'flex';
};

listNotes();

// addNote.addEventListener('click',
// (evt)=>{
//   evt.preventDefault();
//   modal.style.display='block';
//   document.querySelector('#notes').style.display='none';
//   document.querySelector('#controls').style.display='none';
// });

// btnSaveNote.addEventListener('click',(evt)=>{
//     evt.preventDefault();
   
//     saveNote(
//       {
//         id: document.querySelector("#input-id").value,
//         title:document.querySelector("#input-title").value,
//         content:document.querySelector("#input-content").value,
       
//       }
//     );  
//   });

//   const loadNotes= () =>{
//     let resp=localStorage.getItem('notes');
//     resp=JSON.parse(resp);
//     return resp;
//     //return [{title:'Prova de Programação', content: 'Estudar algorimos, com atenção especial listas ordenadas'},{},{}];
//   };
  

//   const saveNote = (note) => {
//     //Registra o horário da ultima alteração
//     note.lastTime = new Date().getTime();
//     let notes= loadNotes();
//     //Se uma lista não existir
//     if (!notes){
//       //criar lista vazia
//       notes=[];
//     }
//     if(note.id.length == 0){
//       note.id= new Date().getTime();
//       //Atualiza o valor do id da nota
//       document.querySelector("#input-id").value=note.id;
//       //incluir a nota na lista
//       notes.push(note);
//     }else{
//       //percore todos os itens da lista
//       for (i=0; i<notes.length; i++){
//         //Quando encontrar o id equivalente
//         if(notes[i].id==note.id){
//           //substituir as informações do item
//           notes[i]=note;
//         }
//       }
//     }
//     //Transforma objeto em uma string
//     notes=JSON.stringify(notes);
//     //Salva string no local storage
//     localStorage.setItem('notes', notes);
   
//   }