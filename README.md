# BloodlustScripts
Scripts JS pour automatisation des jets de dés BloodLust sur Roll20

___

### Liste des commandes
Les commandes couvrent tout ce qui a trait aux lancers de dés :
* !roll : Jet de compétence (secret : !gmRoll)
* !attack : Jet d'attaque ciblée (secret : !gmAttack)
* !defend : Jet de défense sur la dernière attaque ciblée (secret : !gmDefend)
* !encaisse : Encaissement direct des dégats de la dernière attaque ciblée
* !help : Liste des commandes en jeu

### Utilisation des commandes
#### La commande !ROLL
Prototype : !roll \<competence> [aspect] [aspect d'arme] [faille] [riques] [difficulté]

Formats : 

| Type             | Format                     | Exemple    |
| :--------------: | :------------------------: | :--------: |
| aspect           | id de l'aspect + a         | 2a         |
| aspect de l'arme | id de l'aspect + w         | 3w         |
| faille           | id de la faille + f        | 1f         |
| risques          | nombre de risques + r      | 4r         |
| difficulté       | force de la difficulté + d | +4d ou -2d |

Règles :
* Jusqu'à trois aspects/aspects d'arme/failles uniquement
* Un seul risque
* Une seule difficulté
