function hungaro()
{

	var radios = document.getElementsByName('tipo');		//verificamos el tipo de problema
	var vaciado= document.getElementById("vaciado_h1");
	var vaciado= document.innerHTML="";
	for (var i = 0;i<=1 ;i++) 
		if (radios[i].checked) 
			tipo=radios[i].value
	var asignacion = document.getElementById("asignacion").value;			//transformamos lo que halla en el cuadro de texto a un array bidimensional
	asignacion= asignacion.split("\n");
	for(var i=0; i<asignacion.length;i++)
		asignacion[i]=asignacion[i].split(",");
	if(is_square(asignacion)!=-1)
	{
		var costos= asignacion.slice();															//copiamos la matriz original
		
		if(tipo==-1)																							//transformamos el problema a minimizaci�n, para generalizar, en dado caso
		{
			for(var i=0;i<asignacion.length;i++)
				for(var j=0;j<asignacion[i].length;j++)
					asignacion[i][j]= asignacion[i][j]*-1;
		}
		function extrae(asignacion)																					//obtiene el menor n�mero por columna y lo resta
		{
			var mini= new Array();
			for( i=0; i<asignacion.length;i++)
				mini.push(Math.min.apply(null, asignacion[i]));
			for(i=0;i<asignacion.length;i++)
					for( j=0;j<asignacion[i].length;j++)
					asignacion[i][j]-=mini[i];
		}
			extrae(asignacion);
			var trans= asignacion.transpose();
			extrae(trans);
			asignacion=trans.transpose();
	
			for(i=0;i<asignacion.length;i++)
			{
					for( j=0;j<asignacion[i].length;j++)
					{
					vaciado.innerHTML+= asignacion[i][j]+" , " ;
					}
			vaciado.innerHTML+="\n";
			}	
	} else{
		alert("la matriz debe ser cuadrada");
	}
	
	//function assign(asignacion)
	
}