const DistanciaMetros = (lat1,lon1,lat2,lon2) => {
 
 
   const radio  = function(x) {return x*Math.PI/180;}

   const radioTierraKm = 6378.137;

   let dLat = radio( lat2 - lat1 );
   let dLong = radio( lon2 - lon1 );

   let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(radio(lat1)) * 
   Math.cos(radio(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
   let b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

   let distanciaMetros = radioTierraKm * b * 1000; 
   return Math.round(distanciaMetros) ; 
}

module.exports = DistanciaMetros