//Librairie des fonctions permettant l'accès aux feuilles de perso

function getPersonnage(appelant){
  var personnages = findObjs({_type: 'character'});
  var perso;
  personnages.forEach(function(chr) {
    if(chr.get('name') == appelant) perso = chr;
  });
  return perso
}
