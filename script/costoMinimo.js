function costo()
{
    preprocesa();
    
    var i=0;
	
	ordena(matriz);

    var rango=matriz.length;

    for (i=0;i<rango;i++)
    {
        var fil=matriz[i].fila;
        var col=matriz[i].columna;
        asigna(fil,col);
    }
    imprime(asignacion);
    alert("hey");
    var CostoZ=zeta(asignacion,matrizaux);
    document.getElementById("vaciado_t1").innerHTML+= "\n"+"valor de solucion = "+CostoZ+"\n";
   
     multiplicadores(asignacion);
}

/*
10 , 0 , 20 , 11 | 15
12 , 7 , 9 , 20 | 25
0 , 14 , 16 , 18 | 5
5 , 15 , 15 , 10
*/


/*
1 , 2 , 6 | 7
0 , 4 , 2 | 12
3 , 1 , 5 | 11
10 , 10 , 10 
*/