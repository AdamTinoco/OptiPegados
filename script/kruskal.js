var matriz=[];
var padre=[];

var grafo = new Array();
var grafoExpansion = new Array();


function buscar(x)                                              //Encuntra la raíz del vértice
{
    if(x == padre[x])
        return x;
    else
        return (padre[x] = buscar(padre[x]));
}



function union(x,y)                                             //Une dos componentes
{
    padre[ buscar(x) ] = buscar(y);
}




function mismoComponente(origen,destino)                        //Retorna si están 2 vértices en la misma componente conexa
{
    //alert("Buscar mismo componente\n"+origen+"=="+destino)
    if(buscar(origen)==buscar(destino))
        return true;
    else
        return false;
}



function arista(origen,destino,peso)                        //Objeto que servirá para el arreglo (Grafo)
{
    this.origen=origen;;
    this.destino=destino;;
    this.peso=peso;;
}




function incidencia()                                       //Retorna si es válida la matriz a trabajar
{   
    var entrada=document.getElementById("kruskal").value;
    var datos=entrada.split("\n");
    
    for(var i=0 ; i<datos.length ; i++)
        matriz[i] = datos[i].split(",");
    
    var loop=0;
    var simetrica=0;
    
    for(var i=0 ; i<datos.length ; i++)
        for(var j=0 ; j<datos.length ; j++)
        {
            if (i==j && matriz[i][j]!=0)
                loop=1;
            
            if(matriz[i][j]!=matriz[j][i])
            {
                simetrica=1;
                //alert("i="+i+" j="+j+" simtrica="+simetrica);
            }
        }
    
    //alert("LOOP: "+loop)
    //alert("SIMETRICA: "+simetrica);
    
    if(loop==0 && simetrica==0)
        return true;
    else
        return false;
}

function incidencia1()                                       //Retorna si es válida la matriz a trabajar
{   
    var entrada=document.getElementById("prim").value;
    var datos=entrada.split("\n");
    
    for(var i=0 ; i<datos.length ; i++)
        matriz[i] = datos[i].split(",");
    
    var loop=0;
    var simetrica=0;
    
    for(var i=0 ; i<datos.length ; i++)
        for(var j=0 ; j<datos.length ; j++)
        {
            if (i==j && matriz[i][j]!=0)
                loop=1;
            
            if(matriz[i][j]!=matriz[j][i])
            {
                simetrica=1;
                //alert("i="+i+" j="+j+" simtrica="+simetrica);
            }
        }
    
    //alert("LOOP: "+loop)
    //alert("SIMETRICA: "+simetrica);
    
    if(loop==0 && simetrica==0)
        return true;
    else
        return false;
}



function inicio()                                                   //Inicializa los objetos
{
    //alert("Creando arreglo de objetos");
    for(var i=0 ; i<matriz.length ; i++)
        for(var j=0 ; j<matriz.length ; j++)
            if(i<j && matriz[i][j]!=0)
            {
                var temp =new arista(i,j,matriz[i][j]);
                grafo.push(temp);
            }
    
    for(var i=0 ; i<matriz.length ; i++)
        padre[i]=i;
    
    grafo=grafo.sort(function (a, b){return (a.peso - b.peso)});
    
    //for(var i=0 ; i<matriz.length ; i++)
            //alert("Origen = "+grafo[i].origen+"\nDestino = "+grafo[i].destino+"\nPeso = "+grafo[i].peso+"\nPadre = "+padre[i]);
}





function kruskal()                                          //Kruskal
{
    
    var total=0;
    var conexo=0;
    var semivalida=0;
    
    metodo=incidencia();
    
    if(metodo)
    {
        inicio();
        for(var i=0 ; i<grafo.length ; i++)
        {
            var origen = grafo[i].origen;
            var destino = grafo[i].destino;
            var peso = grafo[i].peso;
            
            //alert("Creando el nuevo grafo, iteracion ="+i)
            //alert("Origen = "+origen+"\nDestino = "+destino+"\nPeso = "+peso);
            
            
            if(!mismoComponente(origen,destino))            //Evita ciclos
            {                
                total += parseInt(peso);                         //Incremento el peso total del MST
                
                var tempExpansion = new arista(grafo[i].origen,grafo[i].destino,grafo[i].peso);
                grafoExpansion.push(tempExpansion);
                
                grafoExpansion[i] = grafo[i];
                conexo++;
                union(origen,destino);
            }
        }
    }
    else
        semivalida=1;
    
    //alert("MATRIZ DE INCIDENCIA FINAL");
    var matrizFinal = [];
    
    grafoExpansion=grafoExpansion.sort(function (a, b){return (a.origen - b.origen)});
    
    document.getElementById("saliaKruskal").innerHTML="";
    
    if(semivalida==1)
        document.getElementById("saliaKruskal").innerHTML="La matriz de iniencia no es simetrica.";
    else
    {
        if(conexo==matriz[0].length-1)
        {
            for(var i=0 ; i<grafoExpansion.length ; i++)
            {
                //alert("Origen = "+grafoExpansion[i].origen+"\nDestino = "+grafoExpansion[i].destino+"\nPeso = "+grafoExpansion[i].peso);
                document.getElementById("saliaKruskal").innerHTML+="Nodo origen = "+(grafoExpansion[i].origen+1)+"\nNodo destino = "+(grafoExpansion[i].destino+1)+"\nPeso de arista = "+grafoExpansion[i].peso+"\n\n";
            }
        
            document.getElementById("saliaKruskal").innerHTML+="Costo total = "+total+"\n\n";
        }
        else
            document.getElementById("saliaKruskal").innerHTML="El grafo ingresado debe ser conexo.";
    }
}


function prim()                                          //Kruskal
{
    
    var total=0;
    var conexo=0;
    var semivalida=0;
    
    metodo=incidencia1();
    
    if(metodo)
    {
        inicio();
        for(var i=0 ; i<grafo.length ; i++)
        {
            var origen = grafo[i].origen;
            var destino = grafo[i].destino;
            var peso = grafo[i].peso;
            
            //alert("Creando el nuevo grafo, iteracion ="+i)
            //alert("Origen = "+origen+"\nDestino = "+destino+"\nPeso = "+peso);
            
            
            if(!mismoComponente(origen,destino))            //Evita ciclos
            {                
                total += parseInt(peso);                         //Incremento el peso total del MST
                
                var tempExpansion = new arista(grafo[i].origen,grafo[i].destino,grafo[i].peso);
                grafoExpansion.push(tempExpansion);
                
                grafoExpansion[i] = grafo[i];
                conexo++;
                union(origen,destino);
            }
        }
    }
    else
        semivalida=1;
    
    //alert("MATRIZ DE INCIDENCIA FINAL");
    var matrizFinal = [];
    
    grafoExpansion=grafoExpansion.sort(function (a, b){return (a.origen - b.origen)});
    
    document.getElementById("salidaPrim").innerHTML="";
    
    if(semivalida==1)
        document.getElementById("salidaPrim").innerHTML="La matriz de iniencia no es simetrica.";
    else
    {
        if(conexo==matriz[0].length-1)
        {
            for(var i=0 ; i<grafoExpansion.length ; i++)
            {
                //alert("Origen = "+grafoExpansion[i].origen+"\nDestino = "+grafoExpansion[i].destino+"\nPeso = "+grafoExpansion[i].peso);
                document.getElementById("salidaPrim").innerHTML+="Nodo origen = "+(grafoExpansion[i].origen+1)+"\nNodo destino = "+(grafoExpansion[i].destino+1)+"\nPeso de arista = "+grafoExpansion[i].peso+"\n\n";
            }
        
            document.getElementById("salidaPrim").innerHTML+="Costo total = "+total+"\n\n";
        }
        else
            document.getElementById("salidaPrim").innerHTML="El grafo ingresado debe ser conexo.";
    }
}
/*

0,1,5,2
1,0,0,0
5,0,0,3
2,0,3,0

-------

http://lcm.csa.iisc.ernet.in/dsa/node184.html

0,6,1,5,0,0
6,0,5,0,3,0
1,5,0,5,6,4
5,0,5,0,0,2
0,3,6,0,0,6
0,0,4,2,6,0

*/