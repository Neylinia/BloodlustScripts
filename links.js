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

function getEffort(personnage){
  var attr = findObjs({_type: 'attribute'});
  var effort;
  attr.forEach(function(at) {
    if(at.get('_characterid') == speaking.id) {
      if(at.get('name') == "effort") {
        effort = at;
      }
    }
  });
  return effort;
}

function calculSeuil(etats){
  var seuil = 6;
  if ((etats["valfatigue"] >= etats["valtension"]) && (etats["valfatigue"] >= etats["valfaiblesse"])) {
    if (etats["valfatigue"] == 0) {
      seuil = 6;
    }
    else if (etats["valfatigue"] <= (11 + etats["fatigue"])) {
      seuil = 9;
    }
    else if (etats["valfatigue"] <= (20 + etats["fatigue"])) {
      seuil = 12;
    }
    else {
      seuil = 15;
    }
  }
  else if ((etats["valtension"] > etats["valfatigue"]) && (etats["valtension"] > etats["valfaiblesse"])) {
    if (etats["valtension"]n <= (11 + etats["tension"])) {
      seuil = 9;
    }
    else if (etats["valtension"] <= (20 + etats["tension"])) {
      seuil = 12;
    }
    else {
      seuil = 15;
    }
  }
  else if ((etats["valfaiblesse"] > etats["valtension"]n) && (etats["valfaiblesse"] > etats["valfatigue"])) {
    if (etats["valfaiblesse"] <= (11 + etats["faiblesse"])) {
      seuil = 9;
    }
    else if (etats["valfaiblesse"] <= (20 + etats["faiblesse"])) {
      seuil = 12;
    }
    else {
      seuil = 15;
    }
  }
  return seuil;
}
