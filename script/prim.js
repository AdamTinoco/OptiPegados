var matriz=[];
var padre=[];
var grafo = new Array();
var grafoExpansion = new Array();
var aristasVisitadas = new Array();

function buscar(x)                                              //Encuntra la raíz del vértice
{
    if(x == padre[x])
        return x;
    else
        return (padre[x] = buscar(padre[x]));
}


function union(x,y)                                             //Une dos componentes
{
    padre[ buscar(x) ] = buscar(y)
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
    this.origen=origen;
    this.destino=destino;
    this.peso=peso;
}


function incidencia()                                       //Retorna si es válida la matriz a trabajar
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
                alert("i="+i+" j="+j+" simtrica="+simetrica);
            }
        }
    
    if(loop==0 && simetrica==0)
        return true;
    else
        return false;
}


function inicio()                                                   //Inicializa los objetos
{
    for(var i=0 ; i<matriz.length ; i++)
        for(var j=0 ; j<matriz.length ; j++)
            if(i<j && matriz[i][j]!=0)
            {
                var temp =new arista(i , j , matriz[i][j]);
                grafo.push(temp);
				//temp =new arista(j, i , matriz[i][j]);
                //grafo.push(temp);
            }
    
    for(var i=0 ; i<matriz.length ; i++)
        padre[i]=i;
    
    //grafo=grafo.sort(function (a, b){return (a.peso - b.peso)});
}


function loop( numeroArista )
{
    for(var i=0 ; i<aristasVisitadas.length ; i++)
    {
        var origenVisitado = aristasVisitadas[numeroArista].origen;
        var destinoVisitado = aristasVisitadas[numeroArista].destino;
        var visitado = 0:
        
        if( origenVisitado == grafo[i].origen  && destinoVisitado == grafo[i].destino)
            visitado = 1;
    }
    
    if(visitado==1)
        return false;
    else
        return true;
}


function prim()
{
    var total=0;
    var conexo=0;
    var semivalida=0;
    
    metodo=incidencia();
    var opcion = new Array();

    
    if(metodo)
    {
        inicio();
    
        var nodos = [];
        nodos[0]=0;
        
        //for(var c=0 ; c<grafo.length ; c++)
                //alert("Origen = "+grafo[c].origen+"\nDestino = "+grafo[c].destino+"\nPeso = "+grafo[c].peso);
        
        for(var i=0 ; i<grafo.length ; i++)
        {
            alert("ITERACION = "+i);
            
            for(var j=0 ; j<nodos.length ; j++)
            {
                for(var k=0 ; k<grafo.length ; k++)
                {
                    if( grafo[k].origen == nodos[j]  )
                    {
                        var tempOpcion = new arista(grafo[k].origen,grafo[k].destino,grafo[k].peso);
                        opcion.push(tempOpcion);
                    }
                    
                    if( grafo[k].destino == nodos[j]  && loop( k )==true )
                    {
                        tempOpcion = new arista(grafo[k].destino,grafo[k].origen,grafo[k].peso);
                        opcion.push(tempOpcion);
                    }
                }
            }
            
            opcion=opcion.sort(function (a, b){return (a.peso - b.peso)});
            
            alert("OPCIONES");
            for(var c=0 ; c<opcion.length ; c++)
                alert("Origen = "+opcion[c].origen+"\nDestino = "+opcion[c].destino+"\nPeso = "+opcion[c].peso);
            alert("FIN DE OPCIONES");
        
            alert("Peso entrante = "+opcion[i].peso);
            
            var origen = opcion[i].origen;
            var destino = opcion[i].destino;
            var peso = opcion[i].peso;
            
            if( !mismoComponente(origen,destino) )                //Evita ciclos
            {               
                total += parseInt(peso);                         //Incremento el peso total del MST
                
                var tempExpansion = new arista(origen,destino,peso);
                grafoExpansion.push(tempExpansion);
                
                tempOpcion = new arista(destino,origen,peso);
                aristasVisitadas.push(tempOpcion);
                
                tempOpcion = new arista(origen,destino,peso);
                aristasVisitadas.push(tempOpcion);
                
                conexo++;
                union(origen,destino);
                nodos.push(destino);
                
                alert("ENTRO\nOrigen = "+origen+"\nDestino = "+destino+"\nPeso = "+peso);
            }
            
            opcion.splice(0,opcion.length);
        }
    }
    else
        semivalida=1;
    
    
    alert("MATRIZ DE INCIDENCIA FINAL");
    var matrizFinal = [];
    
    grafoExpansion=grafoExpansion.sort(function (a, b){return (a.origen - b.origen)});
    
    document.getElementById("salidaPrim").innerHTML="";
    
    if(semivalida==1)
        document.getElementById("salidaPrim").innerHTML="La matriz de iniencia no es simetrica.";
    else
    {
        //if(conexo==matriz[0].length-1)
        //{
            for(var i=0 ; i<grafoExpansion.length ; i++)
            {
                //alert("Origen = "+grafoExpansion[i].origen+"\nDestino = "+grafoExpansion[i].destino+"\nPeso = "+grafoExpansion[i].peso);
                document.getElementById("salidaPrim").innerHTML+="Nodo origen = "+(grafoExpansion[i].origen+1)+"\nNodo destino = "+(grafoExpansion[i].destino+1)+"\nPeso de arista = "+grafoExpansion[i].peso+"\n\n";
            }
        
            document.getElementById("salidaPrim").innerHTML+="Costo total = "+total+"\n\n";
        //}
        //else
          //  document.getElementById("salidaPrim").innerHTML="El grafo ingresado debe ser conexo.";
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