function noreste()
{
    preprocesa();
    var tempo = oferta;
    var tempd=demanda;
    var i=0;
    var j=0;
    var ofertac =oferta.slice(0);
    var demandac=demanda.slice(0);
    alert(oferta.length);
    while(i<asignacion.length && j<asignacion[0].length)     //mientras no se rebase el tamaño de la matriz
    {
        
          
        asigna(i,j);                            //asigna valor a la esquina superiro izquierda
        if(oferta[i].costo==0)
            i++
        if(demanda[j].costo==0)
            j++;
    }
    //alert("oferta "+oferta.length);
   
    //alert(asignacion[0].length + " "+asignacion.length);
    imprime(asignacion);
    var CostoZ=zeta(asignacion,matrizaux);
    document.getElementById("vaciado_t1").innerHTML+= "\n"+"valor de solucion = "+CostoZ+"\n";
    //alert(asignacion[0].length + " "+asignacion.length);
    alert("matriz para multiplicadores");
    multiplicadores(asignacion);
    
}