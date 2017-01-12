function aspectRedirect(arg, personnage){

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

  while (true) {

    /*if (contient a f w){
        aspectRedirect
      }else if (contient r d){
        risques_difficultés
      }
    */
  }

  result[0].nbDes = nbDes;
  return result;
}

function competence(gm,commande,personnage,msg){
  var resCommande = calculComp(commande,personnage);
  var rollResult = rollComp(resCommande[0]);
  affichComp(gm,resCommande,msg);
}
