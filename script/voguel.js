//alert("voguel");
function voguel(){
    preprocesa();
    var tempo = oferta;
    var tempd=demanda;
   
    var tmatriz=matriz;
    
    while(tmatriz.length > 0){
         var penalfila=[];
    var penalcol=[];
   // alert(tmatriz.length);  
        for(var i=0;i<asignacion.length;i++)
            {
                //alert("valor de oferta i "+oferta[i].costo);
             if(oferta[i].costo!=parseInt(0)){
                 
                var fila=filtro(tmatriz,{fila:i},false);
                fila=ordena(fila);
                 if(fila.length!=1)
                 {var p = fila[1].costo -fila[0].costo;}
                    
                 else
                 { var p=fila[0].costo;}
                   // alert("valor p"+p);
                var penalizacion = new restriccion(i,p);
                penalfila.push(penalizacion);
             }
                else
                {
                    var penalizacion = new restriccion(i,parseInt(0));
                    penalfila.push(penalizacion);
                }
            }
              
        
     for(var i=0;i<asignacion[0].length;i++)
    {
        //alert("demanda i"+demanda[i].costo);
        if(demanda[i].costo!=parseInt(0))
        {
            var columna=filtro(tmatriz,{columna:i},false);
            columna=ordena(columna);
            
            if(columna.length!=1)
            {
                 var p = columna[1].costo -columna[0].costo;
            }
            else
            {
                 var p =columna[0].costo;
            }
            var penalizacion = new restriccion(i,p);
            penalcol.push(penalizacion);
        }
        else
        {
              var penalizacion = new restriccion(i,0);
                    penalcol.push(penalizacion);
        }
       
    }
    
    var maxfila= ordena(penalfila);
       // alert("mayor de fila "+ maxfila[maxfila.length-1].costo );
       
    var maxcol= ordena(penalcol);
        // alert("mayor de columna "+ maxcol[maxcol.length - 1].costo);
        
        
        
    if(maxfila[maxfila.length-1].costo > maxcol[maxcol.length - 1].costo)
    {
        var i = maxfila[maxfila.length-1].posicion;
        var menor=ordena(filtro(tmatriz,{fila:i},false));
        asigna(menor[0].fila,menor[0].columna);
        if(oferta[menor[0].fila].costo==0)
        {
            tmatriz=filtro(tmatriz,{fila:menor[0].fila},true);
           
        }
        if(demanda[menor[0].columna].costo==0)
        {
            tmatriz=filtro(tmatriz,{columna:menor[0].columna},true);
        }
         //alert("fila"+tmatriz.length);
    }
    else
    {
        var i = maxcol[maxcol.length-1].posicion;
        var menor=ordena(filtro(tmatriz,{columna:i},false));
        asigna(menor[0].fila,menor[0].columna);
        if(oferta[menor[0].fila].costo==0)
        {
            tmatriz=filtro(tmatriz,{fila:menor[0].fila},true);
        }
        if(demanda[menor[0].columna].costo==0)
        {
            tmatriz=filtro(tmatriz,{columna:menor[0].columna},true);
        }
         alert("columna"+tmatriz.length);
    }
    }
    
    imprime(asignacion);
         
  var CostoZ=zeta(asignacion,matrizaux);
   document.getElementById("vaciado_t1").innerHTML+= "\n"+"valor de solucion = "+CostoZ+"\n";

    alert("antes de gauss");
   multiplicadores(asignacion);
    
}