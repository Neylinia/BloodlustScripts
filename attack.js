
function calculComp(commande,personnage){
  
}

function affichAttack(gm,resCommande,msg){
  
}

function attack(gm,commande,personnage,msg){
  var resCommande = calculAttack(commande,personnage);
  if(resCommande == "STOP"){
    sendChat("RollBot","/w "+msg.who+", Vous n'avez pas assez d'Effort pour faire ce test");
  }else{
    affichAttack(gm,resCommande,msg);
  }

}
