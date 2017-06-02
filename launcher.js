on('ready',function() {
    "use strict";

    // Check if the namespaced property exists, creating it if it doesn't
    if( ! state.AttackNS ) {
        state.AttackNS={
            menace: 0
        };
        log("AttackNS created");
    }else{
        state.AtttackNS.menace=0;
    }
});

function spliter(message){
    var messageMin = message.toLowerCase();
    var commande = messageMin.split(" ");
    return commande;
}
      
on("chat:message", function(msg){
    if (msg.type == "api") {
        if(msg.content.indexOf('!help') !== -1) {
          help(msg);
        } else {
            var pers;
            pers = getPersonnage(msg.who, getAllPersonnages());
            if(pers){
                var commande = spliter(msg.content);
                if(msg.content.indexOf('!roll ') !== -1){
                    competence(false,commande,pers,msg);
                }else if (msg.content.indexOf('!gmRoll ') !== -1) {
                    competence(true,commande,pers,msg);
                }else if (msg.content.indexOf('!attack ') !== -1) {
                    attack(false,commande,pers,msg);
                }else if (msg.content.indexOf('!gmAttack ') !== -1) {
                    attack(true,commande,pers,msg);
                }else if (msg.content.indexOf('!defend ') !== -1) {
                    defend(false,commande,pers,msg);
                }else if (msg.content.indexOf('!gmDefend ') !== -1) {
                    defend(true,commande,pers,msg);
                }else if (msg.content.indexOf('!encaisse ') !== -1) {
                    encaisse(commande,pers,msg);
                }
            }else {
                sendChat("RollBot","/w "+msg.who+", Veuillez utiliser votre personnage pour lancer cette commande");
            }
        }
    }
});
