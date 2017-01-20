function aspectRedirect(arg, personnage){
  var aspect;
  if(arg.includes("a")){
    aspect = getAspectPersonnage(false, arg.substring(0,1), personnage);
  } else if(arg.includes("w")){
    var personnages = getAllPersonnages();
    var arme = getArme(personnage, personnages);
    aspect = getAspectArme(arg.substring(0,1), arme);
  } else if(arg.includes("f")){
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
  result[0].risques = 0;
  result[0].difficulte = 0;
  
  result[0].nbAspect = 0;
  result[0].nbFaille = 0;
  result[0].nbAspArme = 0;
  
  var etats = getEtats(personnage);
  result[0].seuil = calculSeuil(etats);
  
  var effort = getEffort(personnage);

  var i = 2;

  while (i<commande.length && effort.get("current")>=3) {
    if((commande[i].includes("a"))||(commande[i].includes("w"))||(commande[i].includes("f"))){
      result[i] = aspectRedirect(commande[i],personnage);
      nbDes = nbDes + result[i].valeur;
      nbDes = nbDes + result[i].nbDesSang;
      result[0].desSang = result[i].nbDesSang;
      if(commande[i].includes("a")){
        result[0].nbAspect++;
      }else if(commande[i].includes("w")){
        result[0].nbAspArme++;
      }else if(commande[i].includes("f")){
        result[0].nbFaille++;
      }
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
    effort.set("current",effort.get("current") - 3);
  }
  
  if(i!=commande.length){
    return "STOP";
  }

  result[0].nbDes = nbDes;
  return result;
}

function affichComp(gm,resCommande,msg){
  var textRoll = "<table style=\"border:3px solid black;background-color:#FFFFFF;border-collapse:collapse\"><tr>";
  textRoll = textRoll + "<td style=\"font-weight: bold;color:#FFFFFF; font-size:16px;background-color:black;\" align=\"center\" colspan=\"4\">";
  textRoll = textRoll + "Test de "+resCommande[1].nom+"</td></tr>";
  var textAspect = "<tr><td style=\"font-weight: bold; color: black;\">Aspects : </td>";
  var textAspArme = "<tr><td style=\"font-weight: bold; color: black;\">Aspects de l'Arme : </td>";
  var textFaille = "<tr><td style=\"font-weight: bold; color: black;\">Faille : </td>";
  
  var i = 2;
  
  while(i < resCommande.length){
    if(resCommande[i].type == "aspect"){
      textAspect = textAspect + "<td style=\"background-color:#FFFFFF;color: black;\"colspan=\"3\" align=\"left\">" +resCommande[i].nom;
    }else if(resCommande[i].type == "arme"){
      textAspArme = textAspArme + "<td style=\"background-color:#FFFFFF;color: black;\"colspan=\"3\" align=\"left\">" +resCommande[i].nom;
    }else if(resCommande[i].type == "faille"){
      textFaille = textFaille + "<td style=\"background-color:#FFFFFF;color: black;\"colspan=\"3\" align=\"left\">" +resCommande[i].nom;
    }
  }
  
  if(resCommande[0].nbAspect > 0){
    textAspect = textAspect + "</td></tr>";
    textRoll = textRoll + textAspect;
  }else if(resCommande[0].nbAspArme > 0){
    textAspArme = textAspArme + "</td></tr>";
    textRoll = textRoll + textAspArme;
  }else if(resCommande[0].nbFaille > 0){
    textFaille = textFaille + "</td></tr>";
    textRoll = textRoll + textFaille;
  }
  
  if(resCommande[0].risques != 0){
    textRoll = textRoll + "<tr><td style=\"background-color:#FFFFFF;font-weight: bold; color: black;\">Risques :</td>";
    textRoll = textRoll + "<td style=\"background-color:#FFFFFF;\" ></td>";
    textRoll = textRoll + "<td style=\"background-color:#FFFFFF; color: black;\"colspan=\"3\">"+resCommande[0].risques+"</td></tr>";
  }
  
  textRoll = textRoll + "<tr><td style=\"font-weight: bold; border:1px solid #A4A4A4; background-color:#FFFFFF; color: black;\" colspan=\"4\" align=\"center\">"
  textRoll = textRoll + "Seuil : "+resCommande[0].seuil+"</td></tr>";
  
  if(gm){
   var compRoll = "/gmroll "+resCommande[0].nbDes+" 1d6"; 
  }else{
    var compRoll = "/roll "+resCommande[0].nbDes+" 1d6";
  }
  
  sendChat(msg.who,compRoll,function(ops){
    
    var rollresult = ops[0].content;
    var jsonResult = JSON.parse(rollresult);
    var results = "<tr>";
    var rolls = jsonResult.rolls[0].results;
    var i = 1;
    var nbUn = 0;
    var j = 0;
    var ds = resCommande[0].nbDesSang;
    var nbQuality = parseInt(resCommande[0].risques);
    
    rolls.forEach(function(r){
      if((j+ds)==resCommande[0].nbDes){
        nbQuality++;
        ds--;
        results=results+"<td align=\"center\" width=\"25%;\" style=\"background-color:#FFFFFF;\">";
        results=results+"<table><tr><td style=\"display: inline-block;min-width: 1.5em;text-align: center;";
        results=results+"border: 2px solid black; background: #800000; color: white;\" align = \"center\">";
        results=results+r.v+"</td></tr></table></td>";
      } else if((r.v%2)==0){
        nbQuality++;
        results=results+"<td align=\"center\" width=\"25%;\" style=\"background-color:#FFFFFF;\">";
        results=results+"<table><tr><td style=\"display: inline-block;min-width: 1.5em;text-align: center;";
        results=results+"border: 2px solid black; background: #68AE7D; color: black;\" align = \"center\">";
        results=results+r.v+"</td></tr></table></td>";
      } else if((r.v)==1){
        nbUn= nbUn + 1;
        results=results+"<td align=\"center\" width=\"25%;\" style=\"background-color:#FFFFFF;\">";
        results=results+"<table><tr><td style=\"display: inline-block;min-width: 1.5em;text-align: center;";
        results=results+"border: 2px solid black; background: #AE6868; color: black;\" align = \"center\">";
        results=results+r.v+"</td></tr></table></td>";
      } else {
        results=results+"<td align=\"center\" width=\"25%;\" style=\"background-color:#FFFFFF;\">";
        results=results+"<table><tr><td style=\"display: inline-block;min-width: 1.5em;text-align: center;";
        results=results+"border: 2px solid black; background: #BEBEBE; color: black;\" align = \"center\">";
        results=results+r.v+"</td></tr></table></td>";
      }
      
      if((i%4) == 0){
        results = results + "</tr><tr>";
        i=0;
      }
      j++;
      i++;
    });
    
    results = results + "<tr><td align=\"center\" colspan=\"4\">Résultat : "+jsonResult.total+"</td></tr>";
    
    if(jsonResult.total>=resCommande[0].seuil){
      results = results + "<tr><td align=\"center\" colspan=\"4\" style=\"font-weight: bold; border: 1px solid #A4A4A4;";
      results = results + " background-color: #3ADF00; color: black;\">Réussite avec "+ nbQuality +" qualités !</td></tr>";
    } else {
      if(nbUn>(resCommande[0].nbDes/2)){
        results = results + "<tr><td align=\"center\" colspan=\"4\" style=\"font-weight: bold; border: 1px solid #A4A4A4;";
        results = results + " background-color: #DF0101; color: white; \">Échec Critique !</td></tr>";
      } else {
        results = results + "<tr><td align=\"center\" colspan=\"4\" style=\"font-weight: bold; border: 1px solid #A4A4A4;";
        results = results + " background-color: #FF4000; color: black;\">Échec !</td></tr>"
      }
    }
    
    results = results + "</tr></table>";
    if(gm){
      sendChat(msg.who,"/gm "+textRoll+results);
      sendChat(msg.who,"/w "+msg.who+" "+textRoll+results);
    } else {
      sendChat(msg.who,textRoll+results);
    }
    
  });
}

function competence(gm,commande,personnage,msg){
  var resCommande = calculComp(commande,personnage);
  if(resCommande == "STOP"){
    sendChat("RollBot","/w"+msg.who+", Vous n'avez pas assez d'Effort pour faire ce test");
  }else{
    affichComp(gm,resCommande,msg);
  }
}
