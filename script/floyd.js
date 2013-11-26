alert("inicio");
//w=[[0,8,Infinity,1],[Infinity,0,1,Infinity],[4,Infinity,0,Infinity],[Infinity,2,9,0]];
var pi =new Array();
function leematriz(){
    var datos=document.getElementById("entrada").value;
    var filas=datos.split("\n");
    var M = new Array();
    for(var i=0;i<filas.length;i++)
        M.push(filas[i].split(","));
    
    
    var p0=new Array();
    for(var i=0;i<M.length;i++)
    {
        var ren=[];
        for(var j=0;j<M[0].length;j++)
        {
            if(M[i][j]=='?')
            {
                M[i][j]=Infinity;
                
            }
               
            else
            {
                M[i][j]=parseInt(M[i][j]);
                
            }
            ren.push(i+1) ;   
        }
        p0.push(ren);
    }
    pi.push(p0);
    return M;
}
function imprime(matriz)
{
    
    for(var i=0;i<matriz.length;i++)
    {
         document.getElementById("salida").innerHTML+=matriz[i].join()+"\n"; 
    }
        
}
function floyd(w)
{
   var n= w.length;
    var D=new Array();
    D.push(w);
    for(var k=0;k<n;k++)
    {
        var dk= new Array();
        var pk = pi[k];
        for(var i=0;i<n;i++)
        {
            var renglon = new Array();
            var prenglon= new Array();
            for(var j=0;j<n;j++)
            {
                if(D[k][i][j]>(D[k][i][k]+D[k][k][j]))
                    pk[i][j]=pk[k][j];
                    
                renglon.push(Math.min(D[k][i][j],(D[k][i][k]+D[k][k][j])));
                
            }
            dk.push(renglon);
        }
        document.getElementById("salida").innerHTML+="\n matriz D("+k+") \n";
        imprime(dk);
        document.getElementById("salida").innerHTML+="\n matriz P("+k+") \n";
        imprime(pk);
        
        D.push(dk);
        pi.push(pk);
            
    }
    //alert(D[D.length-1][3][0]);
    //imprime(D[D.length-1]);
    
}
function prueba(){
   var w=leematriz();
    document.getElementById("salida").innerHTML="";
    imprime(w);
    //alert("pausa");
    floyd(w);
}

alert("fin");