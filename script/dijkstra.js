function vertice(nombre,costo,predecesor)
{
    this.nombre=nombre;
    this.costo=costo;
    this.predecesor=predecesor;
}
function ordena(arreglo)                    //retorna una copia ordenada del arreglo
{
    var temp=arreglo;
    temp.sort(function(a,b){return a.costo - b.costo});  //funcion de comparacion
    
    return temp;
}


function dijkstra()
{
    var V= new Array();
    var W=leematriz();
    var s=document.getElementById("origen").value;
    alert(s);
    for(var i=1;i<W.length+1;i++)
    {
        if(i==s)
            var u=new vertice(i,0,0);
        else
            var u=new vertice(i,Infinity,0);
        V.push(u);
    }
    V=ordena(V);
    alert(V[0].nombre+" LOL");
    
    var Q=new Array();
    var P=new Array();
    Q=V;
    
    while(Q.length!=0)
    {
        var u=Q[0];
        for(var i=0;i<W.length;i++)
        {
            if(W[u.nombre-1][i]!=0 && W[u.nombre-1][i]!= Infinity  )
            {
                for(var j=0; j<Q.length;j++)
                {
                    if(Q[j].nombre -1 == i)
                    {
                        if(u.costo+W[u.nombre-1][i]<Q[j].costo)
                        {
                            Q[j].costo=u.costo+W[u.nombre-1][i];
                            Q[j].predecesor=u.nombre;
                        }
                    }
                }
            }
        }
        P.push(u);
        Q.shift();
        Q=ordena(Q);
      
       
    }
    
    for(var l=0;l<P.length;l++)
    {
         document.getElementById("salida").innerHTML+=" nodo"+P[l].nombre+" dist "+P[l].costo+" pred "+P[l].predecesor+"\n";
        
    }
   
    
    
    
    
    
}