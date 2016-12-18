on("chat:message", function(msg){
  if(msg.type == "api" && msg.content.indexOf('!help ') !== -1) {
    help(msg);
  }else if (msg.type == "api") {
    var pers;
    pers = getPersonnage(msg.who, getAllPersonnages())
    if(pers){
      if(msg.content.indexOf('!roll ') !== -1){

      }else if (msg.content.indexOf('!gmRoll ') !== -1) {

      }else if (msg.content.indexOf('!attack ') !== -1) {

      }else if (msg.content.indexOf('!gmAttack ') !== -1) {

      }else if (msg.content.indexOf('!defend ') !== -1) {

      }else if (msg.content.indexOf('!gmDefend ') !== -1) {

      }else if (msg.content.indexOf('!encaisse ') !== -1) {

      }
    }else {
      sendChat("RollBot","/w "+msg.who+", Veuillez utiliser votre personnage pour lancer cette commande");
    }
  }
});
