 var camino=new Array(); 
var lol=new Array();
var rep;
    var cep;
    var coep;
var renglon=new Array();

//alekz_igf@comunidad.unam.mx |
function backtracking(actual,signo,camino,posibles)
{
    if(signo)
    {
        var f=actual.fila;
        alert("fila "+f);
        var vecinos=filtro(posibles,{fila:f},false);
        vecinos=filtro(vecinos,{columna:actual.columna},true);
    }
    else
        {
            
            var c=actual.columna;
            alert("columa "+c);
            var vecinos=filtro(posibles,{columna:c},false);
            vecinos=filtro(vecinos,{fila:actual.fila},true);
        }
    //vecinos=filtro(vecinos,{fila:actual.fila,columna:actual.columna},true); // se excluye a si mimso de los vecinos
    alert(camino.length);
    if(vecinos.length!=0)
    {
        
       if(camino.length > 1 && actual.costo == camino[0].costo)
       {
           alert("epic win");
           for(var j=0;j<camino.length;j++)
           {
               document.getElementById("vaciado_t1").innerHTML+="\n"+camino[j].costo;
           }
            document.getElementById("vaciado_t1").innerHTML+="\n"+"se acabo";
           //return;
           lol= camino;
       }
        else
        {
            
            var camno=(JSON.parse(JSON.stringify(camino)));
            camno.push(actual);
            for(var i=0;i<vecinos.length;i++)
            {
                 
               
             backtracking(vecinos[i],!signo,camno,posibles);
                
            }
            
        }
        
    }

            
}
function NBasicas(M,B)
{
    var nb=[];
    alert("basicas "+B.join());
  for(var i=0;i<M.length;i++)
  {
      for(var j=0;j<M[0].length;j++)
      {
          if(M[i][j]==0)
          {
              var cij=B[i]+B[j+(M.length)]-matrizaux[i][j];
              var cel= new celda(i,j,cij);
              nb.push(cel);
          }
      }
  }
    return nb;
}


function GaussJ(A,B)
{
    
    var j;
    var t=0;
    var aux=new Array();
    for(var z=0;z<A[0].length;z++)
        aux.push(parseInt(0));
            //alert(B.join());
    for(var i=0;i<A.length;i++)
    {
        
        /// intercambio de renglon
        for(var j=i;j<A.length;j++)
        {
            if(Math.abs(A[i][i])<Math.abs(A[j][i]))
            {
                for(var c=0;c<A.length;c++)
                {
                    aux[c]=A[i][c];
                    A[i][c]=A[j][c];
                    A[j][c]=aux[c];
                }
                t=B[i];
                B[i]=B[j];
                B[j]=t;
                imprime(A);
            }
            //alert(B.join());
        }
        alert("eliminacion hacia abajo renglon "+i);
        /// proceso de eliminacion
        if(A[i][i]==0)
            alert("no existe solucion unica");
        
        for(var j=i;j<A.length;j++)
        {
            var z=0;
            z=A[i][i];
            var  k=((A[j][i] / A[i][i]));
            t=0;
            for(var c=0;c<A.length;c++)
            {
                
                if(j==i)
                {
                    aux[c]=(A[i][c]/z);
                    A[j][c]=aux[c];
                    t=B[i]/z;
                    B[i]=t;
                }
                else
                {
                    aux[c]=(A[j][c]-(k*(A[i][c])));
                    A[j][c]=aux[c];
                   
                }
            }
            // cambio en vector solucion
            if(k!=0&&j!=i)
            {
                 t=(B[j]-(k*B[i]));
                    B[j]=t;
            }
           
            //alert(B.join());
            imprime(A);
        }
       alert("hacia arriba");
        //eliminacion hacia arriba
        if(i>0)
        {
            for(var h=0;h<i;h++)
            {
                var  k=((A[h][i] / A[i][i]));
                t=0;
                for(var c=0;c<A.length;c++)
                {
                    aux[c]=(A[h][c]-(k*(A[i][c])));
                    A[h][c]=aux[c];
                    
                }
                if(h<i)
                {
                   t=(B[h]-(k*B[i]));
                    B[h]=t; 
                }
                
            }
        }
        
    }
    alert("yeah, science BITCH!");
    imprime(A);
    
    alert(B.join());
    
}


 
function prueba(matrix)
{
    var matrizb=new Array();
   
    var B=new Array();
   var A=new Array();
    var N= (matrix.length+ matrix[0].length)-1;
    alert("valor de n "+N);
    /////inicializacion de A//
   
   // alert("entro" + matrix.length +" "+matrix[0].length);
    var contador=0;
    
    for(var i=0; i< matrix.length;i++)
   {
       for(var j=0;j<matrix[0].length;j++)
       {
           if(matrix[i][j]!= 0)
           {
               contador++;
               
               for(var l =0;l<N;l++)
                   renglon.push(parseInt(0));
                 
              
               if(i==0)
               {
                    
                   renglon[(j+matrix.length)-1]=1;
                   
                   A.push(renglon);
                   B.push(matrizaux[i][j]);
                   
                            
   
               }
           
            else
            {
              
                   renglon[(j+matrix.length)-1]=parseInt(1);
                   renglon[i-1]=parseInt(1);
                  
                    A.push(renglon);
                   B.push(matrizaux[i][j]);
                   
            
           }
           renglon=[];
       }
   }
   }
    rep=0;
     cep=0;
     coep=9999;
    if(contador!=N)
    {
        alert("Putadas");
        for(var y=0;y<N-contador;y++)
        {
             for(var i=0; i< matrix.length;i++)
            {
                for(var j=0;j<matrix[0].length;j++)
                {
                    if(matrix[i][j]==0&&(matrizaux[i][j]<=coep))
                       {
                            rep=i;
                            cep=j;
                            coep=matrizaux[i][j];
                       }
                    
                       }
            }
        }
        alert("entra variable epsilon en " +rep+","+cep);
        for(var l =0;l<N;l++)
                   renglon.push(parseInt(0));
        renglon[(cep+matrix.length)-1]=parseInt(1);
                   renglon[rep-1]=parseInt(1);
                  
                    A.push(renglon);
                   B.push(coep);
        matrix[rep][cep]="e";
        renglon=[];
        
    }
        
    //alert("termino");
    imprime(matrix)
    
    //alert(A.length+" "+A[0].length);
    imprime(A);
    alert("antes de gauss");
    //alert(A[0][2]);
    //alert(B.join());
    GaussJ(A,B);
    //alert("B desde prueba "+ B.join());
    //imprime(matrizaux);
    B.unshift(parseInt(0));
    var w = NBasicas(asignacion,B);
    //alert(w[0].costo);
    ordena(w);
    //alert(w[0].costo);
    
    for(var v=0;v<w.length;v++)
        alert(w[v].costo +" en "+w[v].fila+" "+w[v].columna);
    var mayor=(JSON.parse(JSON.stringify(w[w.length-1])));
    imprime(matrix);
    return mayor;
   }


function theta(MA,entra) //recibe matriz de asignacion y elemento que entra
{
  var posibles=new Array() ;

   //alert(MA.length+" "+MA[0].length);
    for(var u=0;u<MA.length;u++)
    {
       for(var x=0;x<MA[0].length;x++)
        {
            if(MA[u][x]!= 0)
            {
                var a = new celda(u,x,MA[u][x]);
                posibles.push(a);
            }
        }
    }

    imprime(MA);
        for(var y=0;y<posibles.length;y++)
            alert("elementos de posible"+"posicion "+posibles[y].fila+" "+posibles[y].columna+"costo "+posibles[y].costo);
    //var origen =new celda(entra.fila,entra.columna,origen);
    alert("va entrar "+entra.fila +" "+entra.columna);
    posibles.push(entra);
    backtracking(entra,true,camino,posibles);
    alert("aca los nuevo "+lol.length);
    var minimo=99999;
    var minfila=0;
    var mincol=0;
    lol[0].costo=0;
    for(var r=0;r<lol.length;r++)
    {
        if(r%2&&lol[r].costo<=minimo)
        {
            minimo=lol[r].costo;
            minfila=lol[r].fila;
            mincol=lol[r].columna;
        }
    }
    for(var q=0;q<lol.length;q++)
    {
         if(q%2)
         {
             if(MA[lol[q].fila][lol[q].columna]=="e")
                 MA[lol[q].fila][lol[q].columna]=(-1 * minimo);
             else
                 MA[lol[q].fila][lol[q].columna]=(lol[q].costo - minimo);
         }
        else
        {
            if(MA[lol[q].fila][lol[q].columna]=="e")
                 MA[lol[q].fila][lol[q].columna]=minimo;
            else
                MA[lol[q].fila][lol[q].columna]=(lol[q].costo + minimo);
        }
    }
    alert("nueva asignacion");
    lol=new Array();
    imprime(MA);
    
    alert("hell yeah nigga");
    return (MA);
    
    
    
    /*var i=parseInt(entra.fila);
    var raiz = filtro(posibles,{fila:i},false);
    //alert("yeah "+raiz.length+" "+raiz[0].fila);
    var camino=[];
    for(var h=0;h<raiz.length;h++)
    {
        
    }
    
    */
    

}


function multiplicadores(matrix) //llega matriz asignacion
{
    var entrante=prueba(matrix);
    alert("entrara "+entrante.costo +" en "+entrante.fila+" ,"+entrante.columna);
    if(entrante.costo<=0)
    {
        alert("solucion optima");
        imprime(matrix);
        var laZ=zeta(matrix,matrizaux);
   document.getElementById("vaciado_t1").innerHTML+= "\n"+"valor de solucion = "+laZ+"\n";
    }
    else
    {
        var nasig=theta(matrix,entrante);
        multiplicadores(nasig);
    }
    
   
}
function nodo(fila,columna,vecinos)
{
    this.fila=fila;
    this.columna=columna;
    this.vecinos=vecinos;
}




