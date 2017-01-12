function calculComp(commande,personnage){
  var result;
  var nbDes;
  
  result[0] = nbDes;
  return result;
}

function competence(gm,commande,personnage,msg){
  var resCommande = calculComp(commande,personnage);
  var rollResult = rollComp(resCommande[0]);
  affichComp(gm,resCommande,msg);
}
