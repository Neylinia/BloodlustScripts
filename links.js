//Librairie des fonctions permettant l'accès aux feuilles de perso

function getAllPersonnages(){
  var p = findObjs({_type: 'character'});
  return p;
}

function getPersonnage(appelant,personnages){
  var perso;
  personnages.forEach(function(chr) {
    if(chr.get('name') == appelant) perso = chr;
  });
  return perso;
}

function getArme(personnage,personnages){
  var arme;
  var nomArme = getAttrByName(personnage.id, "arme");
  personnages.forEach(function(chr) {
						if (chr.get('name') == nomArme)
							arme = chr;
					});
  return arme;
}

function getEtats(personnage){
  var etats = [];
  etats["fatigue"] = getAttrByName(personnage.id, "fatigue");
  etats["valfatigue"] = getAttrByName(personnage.id, "valfatigue");
  etats["faiblesse"] = getAttrByName(personnage.id, "faiblesse");
  etats["valfaiblesse"] = getAttrByName(personnage.id, "valfaiblesse");
  etats["tension"] = getAttrByName(personnage.id, "tension");
  etats["valtension"] = getAttrByName(personnage.id, "valtension");
  return etats
}
