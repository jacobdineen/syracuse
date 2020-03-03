function ACGetLocation(obj) {

  var point = new ACPoint(0, 0);

  while( obj )
  {
    point.x += obj.offsetLeft;
    point.y += obj.offsetTop;
    
    obj = obj.offsetParent;
  }

  return point;
}

function ACPoint(x, y) {
  this.x = x;
  this.y = y;
}
