Process Book,
Wessel de Jong,
10206620  
MC2 Challenge

# day 1 (30-05-2016)
* Probleem bestudeerd.
* Eerste blik op data. Begrip ontwikkeld van de verschillende datasets. Voorzichtig op zoek gegaan naar opvallende datawaarden of trends in de data.
* Uitgebreid eerste idee/schets van de visualisatie ontwikkeld. Door schetsen te creeren van een eventuele eind visualisatie meer begrip van de data ontwikkelen.
* Proposal opgesteld.
* Doelen voor morgen: 1. Op zoek naar specifieke implementatie van verwante problemen
                      2. Brainstormen met teamgenoten
                      3. Pre analyses data bepalen (indien mogelijk uitvoeren)
                      4. Manier van data opslag bepalen met team

# day 2 (31-05-2016)
* Verdere uitwerking schets. De visualisatie moet bestaan uit twee plattegronden waarbij men over de tijd het personeel kan volgen.
* Hoe data op te slaan? Moet geladen en gecombineerd kunnen worden. Onderzoeken of gebruik moet worden gemaakt van een database en of de data hierin efficient kan worden ingeladen.
* Eerder inzendingen MC 2 challenge bekeken. Onderzocht welke visualisaties vaak worden toegepast en hoe het design van het geleverde eindproduct eruit ziet.
* Begin Document Design. 
* Plattegronden inladen via Adobe Illustrator. 
* Morgen: 1. Overleg dataopslag. 2. Design Document afwerken


# day 3 (01-06-2016)
* Overleg met Gosia
* Originele visualisatie omgedraaid, eerst overzicht en dan inzoomen op plattegrond. In plaats van specifiek te beginnen, het tracken van de personeelleden, moet de analyse in een grotere context beginnen. De visualisatie moet de mogelijkheid bieden de data in een overkoepelende context te bestuderen, waarna ingezoomd kan worden op specifieke opvallendheden. Nieuwe schets visualisatie gemaakt op basis van dit idee.
* Dataopslag besproken en verdiept. Onderzoeken hoe data goed opgeslagen kan worden om vervolgens snel ingeladen te kunnen worden. Check SQL en Flask. Ideaal data op kunnen vragen op verdieping, stof en zone.
* Document Design afgeschreven.
* Morgen initiele dataanalyse/preanalyses.

# day 4 (02-06-2016)
* Database postgresql onderzoeken. Heeft de data de juiste vorm om hierin opgeslagen te worden. Hoe kan ervoor gezorgd worden dat de data met de juiste indexen gemakkelijk opgevraagd kan worden uit de database.
* Preanalyse hazium data. Datafiles hazium metingen samengevoegd in één csv file. Waarden uitgezet in linegraph (zie doc). Preanalyse laat een aantal pieken in hazium concentratie zien. Daarbij geeft de grafiek een beeld van de grafieken in het eindproduct.
* Datastructuur aanpassen. Structuur van geleverde data moet aangepast worden om deze efficient in te kunnen laden. Begonnen met python script om datafiles aan te passen. Begonnen bij prox data. Om een overzicht van de data te krijgen ervoor gekozen om het aantal metingen per uur voor iedere dag uit te zetten in een lijngrafiek. De data moet dus zo aangepast worden dat voor elk uur het aantal metingen bekend is. Daarbij moet de data per verdieping en per zone verdeeld worden. De data moet dus omgezet worden naar een vorm waarbij deze genest is op datum, verdieping, zone en uur. 

# day 5 (03-06-2016)
* presentaties
* Doelen voor het weekend: Uitzoeken geschikte database.

# day 6 (06-06-2016)
* Besloten geen database te gebruiken. Json bestanden kunnen niet efficient worden ingeladen in Postgresql. Het juist indexen van de csv bestanden zou teveel tijd kosten voor de meerwaarde die een database brengt.
* Taakverdeling gemaakt betreffende visualiseren data. Mijn taak: Proximity data visualiseren (hele gebouw, per verdieping, per zone, per dag met inzoom mogelijkheid tot per uur)
* Robot proximity data moeten eventueel omgezet worden naar specifieke zones omdat de robot coordinaten geeft ipv zones (taak Bas). 
* Datascript afgeschreven voor visualisatie prox data (Javascript ipv python)
* Proximity data over het hele gebouw uitgezet op line graph met 'zoom' mogelijkheid aan de hand van internetvoorbeeld.
* Missende data voor 4 juni toegevoegd aan csv bestand om juiste weergaven in bovenstaande linegraph mogelijk te maken

# day 7 (07-06-2016)
* Visualisatie van gisteren uitgebreid met data voor iedere verdieping. Nu visualisatie met aantal prox metingen voor hele gebouw nu per verdieping in één grafiek. Knoppen toegevoegd voor laten verdwijnen van de verschillende lijnen in visualisatie.
* Morgen visualisatie verder uitbreiden met data per zone. Aparte visualisaties voor elke verdieping. Lijn voor totaal aantal prox metingen van alle verdiepingen verwijderen uit eerdere visualisatie en drie nieuwe visualisaties maken met specificaties per verdieping
* Uiteindelijk kijken of robot data (mobiele prox sensor) nog kan worden toegevoegd.

# day 7 (08-06-2016)
* Datascript aangepast zodat onderscheid wordt gemaakt tussen de verschillende verdiepingen om visualisatie per verdieping mogelijk te maken.
* Drie visualisaties per verdieping gemaakt. Aan elke visualisatie een brush toegevoegd om in te kunnen zoomen op een bepaald uur. 
* Knoppen geïmplementeerd voor switchen tussen verdiepingen.

# day 8 (09-06-2016)
* Aan elke visualisatie van prox data checkboxes toegevoegd om de verschillende lijnen in de visualisatie te kunnen doen laten verdwijnen. Uiteindelijk ook implementeren dat hoveren over lijn zorgt voor het naar de achtergrond treden van de andere lijnen.
* Kleine css veranderingen aan visualisatie, eindproduct van deze visualisatie vormen
* Begonnen met script schrijven om data per persoon (op het niveau van het individu) op juiste wijze in te kunnen laden. 

# day 9 (10-06-2016)
* presentaties

# day 10 (13-06-2016)
* Data script voor parallel coordinates afgeschreven. Data genest zodat deze per persoon kan worden opgeroepen. Hierbij ook proxid's gekoppeld aan daadwerkelijke namen personeel. Gebleken dat aantal personeelsleden niet aanwezig zijn in de prox data (vaste sensoren). Nog controleren of deze wel voorkomen in mobiele prox data.
* Overleg met Gosia en team
* Nagedacht over representatie individuele data. Welke variabele kunnen gebruikt worden bij analyseren data. Aantal metingen per dag per persoon? Of wellicht gemeten locatie? 

# day 11 (14-06-2016)
* Datascript voor parallel coordinates herschreven om de data anders te nesten en zo geschikter te maken voor het maken van de parallel coordinates.
* Eerste versie parallel coordinates gemaakt voor alle data op alle verdiepingen.

# day 12 (15-06-2016)
* Datascript parallel coordinates aangepast om data per verdieping te verkrijgen.
* Parallelcoordinates visualisatie onderverdeeld per verdieping.
* Knoppen toegevoegd om tussen verdiepingen te springen.
* Begonnen met interactief maken parallel coordinates visualisatie. Mogelijkheid tot brushen van een schaal en verschuiven van schalen initieel al geimplementeerd. Groter en rood worden van lijnen wanneer daar overheen gehoverd wordt toegevoegd.
* Nieuw idee (in samenwerking met Gosia): Om nog dieper in de data te kunnen duiken moet de mogelijkheid gecreeerd worden te kunnen klikken op een lijn in parallel coordinates waarna een heatmap zal verschijnen waarin gevisualiseerd wordt hoe vaak de specifieke proxcard gekoppeld aan de lijn is gemeten in alle verschillende zones van de al gespecificeerde verdieping. Men kan dan dus traceren waar iemand op elke dag precies is geweest.

# day 13 (16-06-2016)
* Verder onderzoek naar heatmap
* Veel problemen tegengekomen bij het omschrijven van het datascript om ervoor te zorgen dat data geschikt is voor heatmap.

# day 14 (17-06-2016)
* presentaties

# day 15 (20-06-2016)
* Overleg team
* Datascript afgeschreven voor heatmap.
* Eerste simpele versie heatmap geimplementeerd. Assen ontbreken, legenda ontbreekt, toegevoegde <rect>'s nog niet gekleurd naar data en nog niet juist gepositioneerd.

# day 16 (21-06-2016)
* Heatmap verbeterd; op juiste positie geplaatst en <rect>'s gekleurd op basis van data.
* Textbox toegevoegd waarin wordt weergegeven bij welke proxid en verdieping de weergegeven heatmap hoort en het gemiddeld aantal detecties per dag van de gespecificeerde proxcard.
* Juiste as-titels toegevoegd aan parallel coordinates.

# day 17 (22-06-2016)
* Legenda toegevoegd aan heatmap. Na veel gedoe (en hulp Leslie) titels aan 'y-as' heatmap kunnen toevoegen.
* Heatmap en textbox juist gepositioneerd ten opzichte van parallel coordinates.
* Geimplementeerd dat een geselecteerde lijn rood bljft wanneer deze is aangeklikt en de gehoverde lijn ook nog steeds rood wordt.
* Knopfunctionaliteit verbeterd, bij het drukken van een knop verdwijnen de heatmap en textbox en wordt de parallel coordinates 'gereset', ook wanneer op de knop van dezelfde verdieping wordt gedrukt. 

# day 18 (23-06-2016)
* Visualisaties samengevoegd op één pagina.
* Laatste kleine css veranderingen aan visualisatie, zoals toevoegen border aan textbox en de text hiervan juist plaatsen.
* Eindversie verslag geschreven door door kladversie te lopen en deze te verbeteren en herschrijven waar nodig. 






                  
  



