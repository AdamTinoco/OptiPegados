Array.prototype.min = function() {							//creamos una funcion para conocer el m�nimo elemenrto de una matriz
  return Math.min.apply(null, this);
};

Array.prototype.transpose = function() {
  var a = this,
    w = a.length ? a.length : 0,
    h = a[0] instanceof Array ? a[0].length : 0;
  if(h === 0 || w === 0) { return []; }
  var i, j, t = [];
  for(i=0; i<h; i++) {
    t[i] = [];
    for(j=0; j<w; j++) {
      t[i][j] = a[j][i];
    }
  }
  return t;
};

function is_square(matrix)
{
	m=matrix.length;
	for(var i=0 ; i<m; i++)
	{
		if(matrix[i].length!= m)
		{
			return -1;
			i=999999999999;
		}
		
	}
}
