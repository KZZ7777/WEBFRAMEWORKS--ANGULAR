Eerste fout:
Als je op knop gedaan klikt zie je de taken niet die afgerond zijn

oorzaak: render() vergeten bij regel 74
maar ook zichtbaar filter aangepast zodat je alleen de taken ziet die afgerond zijn.

2de fout:
als ik een taak verwijdert is er een zware delay maar ook de teller klopt niet, je ziet het taak pas verwijdert wanneer je op een random knop drukt

oorzaak: render() vergeten bij regel 44
ook heb ik aantalOpen verplaats in de functie render

3de fout:
Wanneer ik taak toevoeg bij knop alle zie ik de taak niet, maar als ik op knop open druk zie ik de taak daar wel staan en als ik terug op alle druk zie ik de taak ineens daar wel staan
oorzaak: code in regel 59 heb ik weg gedaan was overbodig en nu werkt alles terug normaal
