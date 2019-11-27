
function watchForm(){

  // Functionality for the navigation menu
  let menuItems = document.getElementsByClassName( "menu" );

  for ( let i = 0; i < menuItems.length; i ++ ){
    menuItems[i].addEventListener( "click", (event) =>{
      event.preventDefault();

      let selected = document.getElementsByClassName( "selected" );

      selected[0].className = "";

      event.target.className = "selected";

      let currentSelected = document.getElementsByClassName( "currentSelected" );


      currentSelected[0].hidden = true;
      currentSelected[0].className = "";

      let selectedSection = document.getElementById( event.target.id + "Section" );

      selectedSection.hidden = false;
      selectedSection.className = "currentSelected";


    });
  }
  let categoriaItems = document.getElementsByClassName("categoria");
  for (var i = 0; i < categoriaItems.length; i++) {
    categoriaItems[i].addEventListener("click", (event) =>{
      event.preventDefault();

      // para el control de tener en Bold la categoría seleccionada
      let selected = document.getElementsByClassName( "cateSelected" );
      selected[0].className = "";
      event.target.className = "cateSelected";

      let listaProductos = document.getElementById("listaProductos");
      listaProductos.innerHTML = "";
      categoria = event.target.id;
      $.ajax({
        //url: 'http://localhost:3000/todos',
        url: 'https://elvina-pasteleria-back.herokuapp.com/products',

        // url: 'https://tuapp.herokuapp.com/todos',
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        dataType: 'json',
        success: function(data){
          //console.log(data);

          let newHtml = "";
          data.forEach((item)=>{
                  newHtml = "";
                  if (item.categoria == categoria) {
                    newHTML = $(`<li class="liProducto">
                                        <img src="${item.link}" width=100px height=100px>
                                        <div class="titleDes">
                                          <label class="productName">${item.nombre}</label>
                                          <label class="descripcion">${item.descripcion}</label>
                                        </div>
                                     </li>`);
                    $("#listaProductos").append(newHTML);
                  }

          });


        },
        error: function(error_msg) {
          alert((error_msg['responseText']));
        }
      });
    });
  }



  let searchButton = document.getElementById( "searchButton" );

  searchButton.addEventListener("click", ( event ) =>{
    event.preventDefault();
      let searchBar = document.getElementById( "searchTerm" );
      let searchTerm = searchBar.value;
      let listaProductos = document.getElementById("listaProductos");
      listaProductos.innerHTML = "";
      $.ajax({
        url: 'https://elvina-pasteleria-back.herokuapp.com/products',

        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        dataType: 'json',
        success: function(data){


          let newHtml = "";
          data.forEach((item)=>{
                  newHtml = "";
                  if (item.nombre == searchTerm) {
                    newHTML = $(`<li class="liProducto">
                                        <img src="${item.link}" width=100px height=100px>
                                        <div class="titleDes">
                                          <label class="productName">${item.nombre}</label>
                                          <label class="descripcion">${item.descripcion}</label>
                                        </div>
                                     </li>`);
                    $("#listaProductos").append(newHTML);
                    
                  }

          });


        },
        error: function(error_msg) {
          alert((error_msg['responseText']));
        }
      });

  });


}

watchForm();
