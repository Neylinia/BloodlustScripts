function help(msg){
  var message = "Commandes disponibles :<br><ul>"+
                "<li>!roll : Jet de dé pour compétence</li>"+
                "<li>!gmRoll : Jet de dé secret pour compétence</li>"+
                "<li>!attack : Jet de dé pour attaque ciblée</li>"+
                "<li>!gmAttack : Jet de dé secret pour attaque ciblée</li>"+
                "<li>!defend : Jet de dé pour défense</li>"+
                "<li>!gmDefend : Jet de dé secret pour défense</li>"+
                "<li>!encaisse : Encaissement des dégats</li>"
                "<li>!help : Cette commande</li></ul>";

  sendChat('RollBot',"/w "+msg.who+" "+message);
}