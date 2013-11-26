/*
 * Costo mínimo a flujo Máximo
 * matriz de adyacencia y de costos
 */

function superMinCostMaxFlow()
{
	    
		var cap = [[0, 3, 4, 5, 0],
		           [0, 0, 2, 0, 0],
		           [0, 0, 0, 4, 1],
		           [0, 0, 0, 0, 10],
		           [0, 0, 0, 0, 0]];
	       
		var cost = [[0, 1, 0, 0, 0],
			         [0, 0, 0, 0, 0],
			         [0, 0, 0, 0, 0],
			         [0, 0, 0, 0, 0],
			         [0, 0, 0, 0, 0]];
			         
		var source= 0;
		var sink=4;		         
	    var N = cap.length;;
	    
	    var found = new Array(N);
	    var flow = new Array(N);
	    var dad= new Array(N);
	    var dist = new Array(N+1);
	    var pi= new Array(N);
	   	var INFINI = 10000000000;
	   	
	    for(var i=0;i<flow.length;i++)
				flow[i]=Array();
		for(var i=0;i<flow.length;i++)
			for(var j=0;j<flow.length;j++)	
				flow[i][j]=0;
		for(var i=0;i<pi.length;i++)
				pi[i]=0;	
	 	var totflow = 0, totcost = 0;	
		
		for ( i=0; i < N;i++)
		     dad[i]=N-1-i;
		alert(search(N,source, sink));	
		/*while (search(N,source, sink)) {
			alert("ola k ase");
		    var amt = 10;
		    alert("ola k ase");
		    var i=0;
			amt = Math.min(amt, flow[i][dad[i]] != 0 ? flow[i][dad[i]] :
	                       cap[dad[i]][i] - flow[dad[i]][i]);
			alert(amt)
		    for (i=0;i<N;i++) {
		             	
			if (flow[i][dad[i]] != 0) {
			    flow[i][dad[i]] -= amt;
			    totcost -= amt * cost[i][dad[i]];
			} else {
			    flow[dad[i]][i] += amt;
			    totcost += amt * cost[dad[i]][i];
				}
		    }
		    
		    totflow += amt;
		    i++; 
		}*/
			
	
	    
	    function search(N,source,sink) {
	    	for (var i=0; i<found.length;i++)
			found[i]= false;				
			for (i=0; i<dist.length;i++)
			dist[i]= INFINI;

			dist[source] = 0;
			
			while (source != N-1) {
		    var best = N-1;
		    found[source] = true;
		    for ( k = 0; k < N; k++) {
			if (found[k]) continue;
			if (flow[k][source] != 0) {
			    var val = dist[source] + pi[source] - pi[k] - cost[k][source];
			    if (dist[k] > val) {
					dist[k] = val;
					dad[k] = source;
			    }
			}
			if (flow[source][k] < cap[source][k]) {
			    val = dist[source] + pi[source] - pi[k] + cost[source][k];
			    
			    if (dist[k] > val) {
					dist[k] = val;
					dad[k] = source;
			    }
			}
			
			if (dist[k] < dist[best]) best = k;
		    }
		    source = best;
		    
		}
		for ( k = 0; k < N; k++)
		    pi[k] = Math.min(pi[k] + dist[k], INFINI);
		return found[N-1];
	}
	
    var salida= document.getElementById("salida");
	salida.innerHTML+="Matriz de flujo:\n"
	for(i=0;i<flow.length;i++)
		for(j=0;j<flow[i].length;j++)
			salida.innerHTML+= flow[i][j];
	salida.innerHTML+=" \n"+totcost;
}