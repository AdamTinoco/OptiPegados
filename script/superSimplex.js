function superSimplex()
{
/*
 * Sea una matrix A de tamaño M filas x N columnas con un vector b de tamaño M y otro vector c de tamaño N
 * A =Matriz de restricciones
 * b= vector solucion
 * c= coeficientes de la función objetivo
 * El programa resuelve problemas de programación del tipo Maximizar cx sujeto a A x <= b
 *  
 */

		var A = new Array();
		var b = new Array();
		var c = new Array();

		var entrada= document.getElementById("entradaSimplex").value;
		entrada= entrada.split("\n");
		
		var c= entrada[entrada.length-1];
		c=c.split(",");
        var tipores=new Array();
        var doblefase=0;
        var holgura=0;
        var exceso=0;
        var artificial=0;
		
		for (i=0 ;i< entrada.length; i++)
		{
            if(entrada[i].split("<=").length>1)
            {
                holgura++;
                tipores.push("<=");
                entrada[i]= entrada[i].split("<=");
                A.push(entrada[i][0]);
                b.push(entrada[i][1]);
            }
            else if(entrada[i].split(">=").length>1)
            {
                exceso++;
                artificial++;
                doblefase=1; 
                tipores.push(">=");
                entrada[i]= entrada[i].split(">=");
                A.push(entrada[i][0]);
                b.push(entrada[i][1]);
            }
            else if(entrada[i].split("==").length>1)
            {   
                artificial++;
                doblefase=1;
                tipores.push("==");
                entrada[i]= entrada[i].split("==");
                A.push(entrada[i][0]);
                b.push(entrada[i][1]);
            }
			
		}
    alert(A.length);
        for(var i=0;i<A.length;i++)
        {
           for(var j=0;j<A[i].length;j++)
               document.getElementById("salidaSimplex").innerHTML+=" "+A[i][j];
             document.getElementById("salidaSimplex").innerHTML+="\n";
        }
          
            alert("matriz con nuevo procesamiento");
		//A.pop();
		//b.pop();
		for(i=0;i<A.length;i++)
			A[i]=A[i].split(",");
			
			//for(i=0;i<A.length;i++)
			//alert(c[i])

	
	var EPSILON = 1.0E-10;
	/*var A = [
            [ -1,  1,  0 ],
            [  1,  4,  0 ],
            [  2,  1,  0 ],
            [  3, -4,  0 ],
            [  0,  0,  1 ],
        ];
    var b = [ 5, 45, 27, 24, 4 ];
    var c = [ 1, 1, 1 ];*/
	////////////////////////////////////////
	/*ejemplo
				-1,1,0|5
				1,4, 0|45
				2,1,0|27
				3,-4,0|24
				0,0,1|4
				1,1,1
*/    
	var M=b.length;
	var N=c.length;
	var a=A.slice(0);
    var temp=artificial;
    artificial=0;
	alert (b);
	var varBas=new Array(M+1); 
    for(var i=0;i<tipores.length;i++)
    {
        if(tipores[i]=="<=")
        {
            a[i][ N+i] = 1.0;
        }
        else if(tipores[i]==">=")
        {
            a[i][ N+i] = -1.0;
            a[i][ N+holgura+exceso+artificial] = 1.0;
            artificial++;
        
        }
        else if(tipores[i]=="==")
        {
            alert("tipo de resticcion no implementada, termino de programa");
            return;
        }
    }
	///for ( i = 0; i <  M; i++)  a[i][ N+i] = 1.0;
	artificial=temp;
	var ceros= new Array();
	
	while(ceros.length<M+N+1+artificial)
	ceros.push(0);
	a.push(ceros);
	
    for ( j = 0; j <  N; j++)  a[M][j] =  c[j]; // renglon Z
    for ( i = 0; i <  M; i++)  a[i][M+N+artificial] = b[i]; // unos de <=
    for ( i = 0; i <=M; i++)   varBas[i] =  N + i; // agregando a variables basicas
    for(var i=0;i<a.length;i++)
        {
           for(var j=0;j<a[i].length;j++)
               document.getElementById("salidaSimplex").innerHTML+=" "+a[i][j];
             document.getElementById("salidaSimplex").innerHTML+="\n";
        }
			
	alert("con esto trabaja");
    alert(varBas.join());

    
    for(i=0;i<a.length;i++)
    	for(j=0;j<a[i].length;j++)
    		if(null==a[i][j]) a[i][j]=0; 
    
    for(var i=0;i<a.length;i++)
        {
           for(var j=0;j<a[i].length;j++)
               document.getElementById("salidaSimplex").innerHTML+=" "+a[i][j];
             document.getElementById("salidaSimplex").innerHTML+="\n";
        }
			
	alert("con esto trabaja");
    alert(varBas.join(" "));
    if(doblefase)
    {
         alert("soy doble fase");
        var originales=varBas.slice(0);
        var moriginal=a.slice(0);
        varBas=[];
        a.pop();
        
        for(var i=0;i<artificial;i++)
        {
            varBas.push(parseInt(N+M+i));
        }
        alert("estas son las basicas doble fase"+varBas.join("|"));
        var nuevoZ=new Array();
        for(var w=0;w<a[0].length;w++)
            nuevoZ.push(parseInt(0.0));
        for(var i=0;i<a.length;i++){
            for(var j=0;j<a[0].length;j++)
            {
                if(varBas.indexOf(j)<0)
                    nuevoZ[j]+=parseInt(a[i][j]);
            }
        }
        a.push(nuevoZ);
        resuelve();
        alert("esto vale "+a[a.length-1][a[0].length-1]);
        //a.pop();
        var l=a[0].length;
        for(var i=0;i<a.length;i++)
            a[i].splice(N+M,artificial);
        document.getElementById("salidaSimplex").innerHTML+="\n";
        for(var i=0;i<a.length;i++)
        {
           for(var j=0;j<a[i].length;j++)
               document.getElementById("salidaSimplex").innerHTML+=" "+a[i][j];
             document.getElementById("salidaSimplex").innerHTML+="\n";
        }
        alert("nueva matriz fase 2");
        a.pop();
        nuevoZ=new Array();
         for(var w=0;w<a[0].length;w++)
            nuevoZ.push(parseFloat(0.0));
        for(var i=0;i<a.length;i++){
            for(var j=0;j<a[0].length;j++)
            {
                if(varBas.indexOf(i)>= 0 && varBas.indexOf(j)< 0 ){
                    
                    nuevoZ[j]=nuevoZ[j]+parseFloat(c[i]*a[i][j]);
                    alert(" i j suma "+i+" "+j+" "+nuevoZ[j]);
                }
            }
        }
        for(var i=0;i<nuevoZ.length;i++)
                nuevoZ[i]=parseFloat(nuevoZ[i]*-1);
       /* for(var i=0;i<a.length;i++)
        {
            if(i<c.length)
                nuevoZ[a.length-1]+= parseFloat(c[i]*a[i][a.length-1]);
        }*/
        a.push(nuevoZ);
        
        document.getElementById("salidaSimplex").innerHTML+="\n";
        for(var i=0;i<a.length;i++)
        {
           for(var j=0;j<a[i].length;j++)
               document.getElementById("salidaSimplex").innerHTML+=" "+a[i][j];
             document.getElementById("salidaSimplex").innerHTML+="\n";
        }
        alert("nueva matriz fase 2 ultima");
        artificial=0;
        M=a.length-1;
        resuelve();
        
        
        
        alert("estas son las basicas doble fase"+varBas.join("|"));
        return;
    }

    else{
     resuelve();
    }
    //check(A, b, c);

	  function  resuelve() {
	    while (true) {
	        var q =  bland();
            alert("entra "+q);
            document.getElementById("salidaSimplex").innerHTML+="interacion"+"\n";
             for(var i=0;i<a.length;i++)
        {
           for(var j=0;j<a[i].length;j++)
               document.getElementById("salidaSimplex").innerHTML+=" "+a[i][j];
             document.getElementById("salidaSimplex").innerHTML+="\n";
        }
           // alert(q);
	        if (q == -1) break;  // optimal
	        var p = minRatioRule(q);
	        if (p == -1)
            {
                alert("El programa no está limitado");
                return;
            }
                
            else
            {
                pivot(p, q);
	         varBas[p] = q; 
            }
	       
	    }
	   }
	  function bland () {
          var max=0;
          var m=0
	    for ( j = 0; j < M + N+artificial; j++)
        {
          if (a[M][j] > 0&&a[M][j] >max)
            {
                max=a[M][j];
                m=j;
            }  
        }
          if(max>0)
              return m;
	       else
	           return -1;  // optimal
	}
	   function minRatioRule (q) {
	    var p = -1;
	    for ( i = 0; i < M; i++) {
	        if (a[i][q] <= 0) continue;
	        else if (p == -1) p = i;
	        else if ((a[i][M+N+artificial] / a[i][q]) < (a[p][M+N+artificial] / a[p][q])) p = i;
	    }
	    return p;
	}
	  function pivot (p, q) {
	    for ( i = 0; i <= M; i++)
	        for ( j = 0; j <= M + N + artificial; j++)
	            if (i != p && j != q) a[i][j] -= a[p][j] * a[i][q] / a[p][q];
	    for (i = 0; i <= M; i++)
	        if (i != p) a[i][q] = 0.0;
	    for ( j = 0; j <= M + N + artificial; j++)
	        if (j != q) a[p][j] /= a[p][q];
	    a[p][q] = 1.0;
	}
	  function valu() {
	    return - a[M][M+N];
	}
	  function primal() {
	   var x = new Array(N);
	    for (i = 0; i < M; i++)
	        if ( varBas[i] < N) x[ varBas[i]] = a[i][M+N];
	    return x;
	}
	  
	    document.getElementById("salidaSimplex").innerHTML+="\n";
        var x = primal();
        for ( i = 0; i < x.length; i++)
            document.getElementById("salidaSimplex").innerHTML+="x[" + i + "] = " + x[i];
			 document.getElementById("salidaSimplex").innerHTML+="\n";
    document.getElementById("salidaSimplex").innerHTML+="value = " + valu();
  
}
