function aspectRedirect(arg, personnage){
  var aspect;
  if(arg.includes("a")){
    aspect = getAspectPersonnage(false, arg.substring(0,1), personnage);
  } else if(arg.includes("w")){
    var personnages = getAllPersonnages();
    var arme = getArme(personnage, personnages);
    aspect = getAspectArme(arg.substring(0,1), arme);
  } else if(arg.includes("f"){
    aspect = getAspectPersonnage(true, arg.substring(0,1), personnage);
  }
  return aspect;
}

function calculComp(commande,personnage){
  var result;
  var nbDes;

  // result[0] -> nombre de dés à lancer + risques + dés de sang +difficulté
  // result[1] -> compétence
  // result[2] -> aspect1
  // result[3] -> aspect2
  // result[4] -> aspect3

  result[1] = getCompetence(commande[1], personnage);
  nbDes = result[1].valeur;

  var i = 2;

  while (i<=(commande.length - 1)) {
    if((commande[i].includes("a"))||(commande[i].includes("w"))||(commande[i].includes("f"))){
      result[i] = aspectRedirect(commande[i],personnage);
      nbDes = nbDes + result[i].valeur;
      nbDes = nbDes + result[i].nbDesSang;
      result[0].desSang = result[i].nbDesSang;
    } else if(commande[i].includes("r")){
      var risques = parseInt(commande[i].substring(0,1));
      nbDes = nbDes - risques;
      result[0].risques = risques;
    } else if(commande[i].includes("d")) {
      var difficulte = parseInt(commande[i].substring(0,2));
      nbDes = nbDes + difficulte;
      result[0].difficulte = difficulte;
    }
    i++;
  }

  result[0].nbDes = nbDes;
  return result;
}

function competence(gm,commande,personnage,msg){
  var resCommande = calculComp(commande,personnage);
  var rollResult = rollComp(resCommande[0]);
  affichComp(gm,resCommande,msg);
}
