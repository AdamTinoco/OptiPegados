   // alert("inicio");
    var matriz= new Array();  //// Variables globales
    var matrizaux=new Array();              //matrizdecostos 2D
    var demanda=new Array();
    var oferta=new Array();
    var asignacion=new Array();         //matriz 2D
    var A=new Array();

////////////////Funciones Genericas //////////////////////////////////////////
////asignacion//
function imprime(matriz)
{
    document.getElementById("vaciado_t1").innerHTML="";
    for(var i=0;i<matriz.length;i++)
    {
         document.getElementById("vaciado_t1").innerHTML+=matriz[i].join()+"\n"; 
    }
        
}
function asigna(i,j)
{                                                //realiza asignacion en la matriz de asignacion
       if (oferta[i].costo < demanda[j].costo )               //se elige el menor de los valores
      {                                     
           demanda[j].costo-=oferta[i].costo;              // se actuliza la demanda y se cancela la oferta
           asignacion[i][j]=oferta[i].costo;          
           oferta[i].costo=parseInt(0);       
       }       
       else       
      {           
            oferta[i].costo-=demanda[j].costo;             // se actuliza oferta y se candela la demanda
            asignacion[i][j]=demanda[j].costo;          
            demanda[j].costo=parseInt(0);
      }   
}

///ordenamiento///
function ordena(arreglo)                    //retorna una copia ordenada del arreglo
{
    var temp=arreglo;
    temp.sort(function(a,b){return a.costo - b.costo});  //funcion de comparacion
    
    return temp;
}

/// filtro///                                                       //filtra un arreglo de objetos de acuerdo a atributos
    function filtro(arreglo, criterios,signo) {                     
        return arreglo.filter(function(obj) {return Object.keys(criterios).every(function(c) {       //retorna los objetos que no cumplan los criterios si signo es true
                    if (signo)                                          //retorna los objetos que cumplen los criterios si signo es false
                        return obj[c] != criterios[c];                  // ejmplo de uso (arregloObjetos,{atributo1:a,atributo2:b},true)
                    else           
                        return obj[c] == criterios[c];   
    }); 
    });    
    }

//////////// calcula Z //////////////////

function zeta(Masgi,Mcostos)
{
    var Z=0;
    for(var i=0;i<Masgi.length;i++)
        for(var j=0;j<Masgi[0].length;j++)
        {
            Z+=parseInt(Masgi[i][j] * Mcostos[i][j]);
        }
    return Z;
}




///////////////////////////////////////////////////////////////////////////
    
    function celda(fila,columna,costo) //objeto celda
    {
        this.fila=fila;                     
        this.columna=columna;
        this.costo=costo;
    }
    
    function restriccion(posicion,costo) //objeto restriccion para usar en oferta y demanda
    {
        this.posicion=posicion;
        this.costo=costo;
    }
    
    function preprocesa()
    {
        
        var entrada = document.getElementById("entrada").value;
        var cadenas=entrada.split("\n");                       // cadenas tiene todas las lineas
        var capturademanda=cadenas[cadenas.length-1];
        var cdemanda=capturademanda.split(",");
        for(var i=0;i<cdemanda.length;i++){
            var temp =new restriccion(i,parseInt(cdemanda[i]));               /// se agrega la demanda al arreglo global demanda
            demanda.push(temp);
        }
        cadenas.pop();                                     // se quita la cadena de demanda      
        
        for(var i=0; i<cadenas.length;i++)              // se llena la matriz
        {  
            var auxiliar=[];
            auxiliar=cadenas[i].split("|");
           var objoferta= new restriccion(i,parseInt(auxiliar[1]));
            oferta.push(objoferta);                             //se llena el arreglo global oferta
            var costos = auxiliar[0].split(",");
            var ceros=[];
            for(var j=0;j<costos.length;j++)
            {
                ceros.push(parseInt(0));
                var celdatemp= new celda(i,j,parseInt(costos[j]));            //se llena la matriz con objetos celda
                matriz.push(celdatemp);
            }
            
            asignacion.push(ceros);                                             //se inicializa la matriz de asignacion a ceros
            matrizaux.push(costos);                                             //matriz de costos 2D
           
        }
        
      
        
        
    
    
        var sumOferta=0;
        var sumDemanda=0;
        for(var i=0; i<oferta.length;i++)
            sumOferta+= parseInt(oferta[i].costo);              //total de oferta
            
        for(var i=0; i<demanda.length;i++)                      // total de demanda
            sumDemanda+= parseInt(demanda[i].costo);	
            
       // alert (sumOferta+" "+ sumDemanda);
        //alert(asignacion[2][2]);
        
        var equilibrio= sumOferta - sumDemanda;            ///// prueba de equilibrio
       // alert(matriz[3].costo+matriz[7].costo);
        if(equilibrio==0)
        {
            alert("problema equilibrado");
        }
        else
        {
            if(equilibrio>0){
            
                    for(i=0;i<oferta.length;i++)
                    {                                                   /////// oferta excedente se agrega destino ficticio
                        asignacion[i].push(parseInt(0));                // se agrega columna de 0 a asignacion
                        var temporal=new celda(i,demanda.length,parseInt(0));
                        matriz.push(temporal);
                        matrizaux[i].push(parseInt(0));
                    }
                    var dficticio= new restriccion(demanda.length,equilibrio);
                    demanda.push(dficticio);
                    alert("oferta excedente");
            } else{
                    var cerosr=[];
                 for(i=0;i<demanda.length;i++)
                    {                                                   /////// oferta excedente se agrega destino ficticio
                        cerosr.push(parseInt(0));                       
                        var temporal=new celda(oferta.length,i,parseInt(0));
                         matriz.push(temporal);
                        
                    }
                    var oficticio= new restriccion(oferta.length,Math.abs(equilibrio));
                    oferta.push(oficticio);
                   asignacion.push(cerosr);                         //se agrega fila 0 a asignacion
                    matrizaux.push(cerosr);
          
            alert("demanda excedente");
            }
        }
        imprime(asignacion);
    }

//alert("fin");