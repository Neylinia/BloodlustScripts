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
		if (chr.get('name') == nomArme) arme = chr;
  });
  
  return arme;
}

function getEtats(personnage){
  var etats = [];
  etats["fatigue"] = getAttrByName(personnage.id, "fatigue");
  etats["valfatigue"] = getAttrByName(personnage.id, "valfatique");
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
    if(at.get('_characterid') == personnage.id) {
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
    } else if (etats["valfatigue"] <= (11 + etats["fatigue"])) {
      seuil = 9;
    } else if (etats["valfatigue"] <= (20 + etats["fatigue"])) {
      seuil = 12;
    } else {
      seuil = 15;
    }
  }
  else if ((etats["valtension"] > etats["valfatigue"]) && (etats["valtension"] > etats["valfaiblesse"])) {
    if (etats["valtension"] <= (11 + etats["tension"])) {
      seuil = 9;
    } else if (etats["valtension"] <= (20 + etats["tension"])) {
      seuil = 12;
    } else {
      seuil = 15;
    }
  }
  else if ((etats["valfaiblesse"] > etats["valtension"]) && (etats["valfaiblesse"] > etats["valfatigue"])) {
    if (etats["valfaiblesse"] <= (11 + etats["faiblesse"])) {
      seuil = 9;
    } else if (etats["valfaiblesse"] <= (20 + etats["faiblesse"])) {
      seuil = 12;
    } else {
      seuil = 15;
    }
  }
  return seuil;
}

function getAspectArme(idAspect,arme){
	var repeat;
	
	var attr = findObjs({_type: 'attribute'});
	var aspect = {nom:null,valeur:null,nbDesSang:0,type:null};
	_.each(attr,function(indexAttributes) {
		if (indexAttributes.get('_characterid') == arme.id) {
			var attName = indexAttributes.get("name");
			if (attName.includes("repeating_aspects_") && attName.includes("idAsp")) {
				if (indexAttributes.get("current") == idAspect) {
				    log(indexAttributes.get("current"));
					repeat = attName.substring(0,attName.lastIndexOf("_")+1);
				}
			};
		}
	});
	aspect.valeur = parseInt(getAttrByName(arme.id, repeat + "valAsp"));
	aspect.nom = getAttrByName(arme.id, repeat + "nameAsp");
	aspect.nbDesSang = parseInt(getAttrByName(arme.id, repeat + "nbDSAsp"));
  	aspect.type = "arme";
	return aspect;
}

function getAspectPersonnage(faille, idAspect, personnage){
	var aspect = {nom:null,valeur:null,nbDesSang:0,type:null};
	if(!faille){
		aspect.valeur = parseInt(getAttrByName(personnage.id, "valaspect" + idAspect));
		aspect.nom = getAttrByName(personnage.id, "aspect" + idAspect);
		aspect.nbDesSang = 0;
    		aspect.type = "aspect"
	}else{
		aspect.valeur = parseInt("-"+getAttrByName(personnage.id, "valfaille" + idAspect));
		aspect.nom = getAttrByName(personnage.id, "faille" + idAspect);
		aspect.nbDesSang = 0;
    		aspect.type = "faille"
	}
  return aspect;
}

function getCompetence(competence, personnage){
  var comp = {nom:null,valeur:null};
  comp.nom = competence.charAt(0).toUpperCase() + competence.slice(1);
  comp.valeur = parseInt(getAttrByName(personnage.id, competence));
  personnages = getAllPersonnages();
  arme = getArme(personnage,personnages);
  
  if(!(getAttrByName(arme.id,"bonusComp1") == null)){
    nomComp1 = getAttrByName(arme.id,"bonusComp1").toLowerCase();
    if (nomComp1 == competence) {
        comp.valeur = comp.valeur + parseInt(getAttrByName(arme.id,"valBonusComp1"));
    }
  }
  
  if(!(getAttrByName(arme.id,"bonusComp2") == null)){
    nomComp2 = getAttrByName(arme.id,"bonusComp2").toLowerCase();
    if (nomComp2 == competence) {
        comp.valeur = comp.valeur + parseInt(getAttrByName(arme.id,"valBonusComp2"));
    }
  }
  
  
  return comp;
}
