# Dag 1 - 30 mei  
Overwegen van andere libraries gebruiken om bewerkingen op datastructuren te kunnen gebruiken. Het is de vraag of een hele library importeren wel efficient is om slechts een paar functies te kunnen gebruiken, dus het zal beter zijn om kleine dingen zelf te implementeren en voor grotere functies libraries te gebruiken.  
De floorplans zullen best crowded worden met veel data, zoals de stipjes die de werknemers weergeven en de zones van de ruimtes. Soortgelijke visualisaties maken ook gebruik van een soort heatmap, waarbij ruimtes ingekleurd worden adhv een waarde in die ruimte. Het is de vraag of dat toepasbaar is in dit project (bijvoorbeeld bij Hazium concentraties) of dat dat te veel afleidt met zoveel data.

* Begonnen aan project proposal
* Maken van een ruwe schets van het product
* Andere libraries zoals jQuery and Underscore zijn misschien handig
* Leidt een heatmap adhv Hazium concentraties de gebruiker af?

# Dag 2 - 31 mei  
Schets die laat zien wat er tevoorschijn komt als er met UI elements geinteract wordt en laat ook zien welke functionaliteit in welk bestand geschreven wordt.  
Het is belangrijk om te kijken hoe de data geformat is en of dit consistent gedaan is over alle files. Dan hoeft er geen onderscheid gemaakt te worden tussen verschillende files.  
Het verwerken van de data kan veel tijd kosten omdat er veel timestamps zijn met grote objecten. Het is een idee om de data online op te slaan in een database en dan met queries bepaalde data op te vragen, zodat onnodige data niet geladen wordt. Dat scheeldt bandwidth en laadtijd.

* Gedetailleerde schetsen, misschien met nieuwe ideeen
* Splits de code op in meerdere bestanden of modules
* UI los van data management los van algoritmes
* Bekijk de format van de data
* Manier van opslaan van data
* Manier van het verwerken van data

# Dag 3 - 1 juni  
Het prototype brengt de schetsen tot leven met interactieve elementen. Er kan van verdiepingen geswitcht worden met de drie knoppen boven het canvas. De dag kan veranderd worden met een dropdown. Een specifieke werknemer van het bedrijf kan ook geselecteerd worden met een dropdown. De tijd van de dag kan gekozen worden met een slider, die de gehele dag kan afspelen met een "play"-knop. Dan bewegen de zichtbare stipjes op het canvas om te laten zien waar de werknemer de dag zijn gelopen.  
Het prototype heeft nu nog een probleem dat als het document geladen wordt, dat de eerste floorplan niet op het canvas getekend wordt. De kleur van de knop verandert wel. Het probleem zit hem misschien in dat de afbeelding nog niet helemaal geladen is als de klik gesimuleerd wordt. Een oplossing voor dit probleem is wel te vinden, maar dat is wel een omweg. Er moet eerst een nieuwe instance van een Image geinitialiseerd worden en dan kan daar een onload callback aan verbonden worden. Zo is het mogelijk om zowel de knop rood te maken als de eerste floorplan op het canvas te tekenen.  
Voor dit prototype staat nog alle code in UI.js, maar de bedoeling is dat uiteindelijk de functionaliteit gesplitst wordt in meerdere files om het overzichtelijk te houden.  
Beginnen bij bijvoorbeeld stoffen in zones als linegraph over de twee weken en dan als je gekkigheden ziet, dat je dan kan inzoomen op die gekkigheid en dan pas kunt kijken wie er in die zones is geweest, wat er is gebeurt. Je kunt de data aggregeren misschien over een half uur in plaats van de timestamps in de data van 5 minuten omdat dat best wel veel data is. Je kunt dan wel inzoomen op dat half uur voor de timestamps zelf.

* Prototype maken
* Interactieve elementen implementeren
* Libraries: jQuery, d3, d3.slider
* Probleem: het simuleren van een klik op een knop on load
* Oplossing: Omweg
* Alles staat nu nog in UI.js
* Omdraaien van uitgangspunt

# Dag 4 - 2 juni
Dit is een voorbeeld van een slider die wij willen gebruiken in ons eindproduct: https://plot.ly/javascript/range-slider/  
De data die is aangeleverd is ongelofelijk veel dus we moeten een slimme manier bedenken om het efficient op te slaan zodat het snel doorzocht kan worden. Er kan PostgreSQL gebruikt worden op een localhost server (port 5432) maar het is dan nog niet zeker of anderen er ook bij kunnen.  
De server room is zijn eigen zone en wordt niet genoteerd als getal. Dat kan een probleem zijn bij het queryen van de SQL database dus geven we de server room zijn eigen getal 99.

* Range slider met zoom voorbeelden opzoeken
* PostgreSQL gebruiken voor het opslaan van de data (localhost)
* Meerdere tabellen in de haztech database
* De zone in de proxout csv file is niet altijd een integer, maar is soms ook de server room

# Dag 5 - 3 juni
Hoe kunnen we de data efficient storen in een database zodat we bijvoorbeeld per verdieping informatie kunnen opvragen, wat sneller is dan alle informatie voor alle verdiepingen tegelijk opvragen.  
Het is misschien wenselijk om de tabel in te delen op verdieping en dan op zones, dan krijgt de tabel hierarchie en kunnen waarden snel worden opgezocht.  
In de sqlShell (psql) kun je bij de lokale database met de volgende gegevens -  
Server: localhost  
Database: haztech  
Port: 5432  
Username: postgres  
De data die is aangeleverd door de VACommunity is vaak inconsistent in de JSON bestanden: soms staat er een dubbele punt tussen de floor/zone en de sensornaam, maar andere keren niet. Dat is een aandachtspunt bij het verwerken van de data. Ook is belangrijk dat niet alle zones een sensor hebben. Daar is bij het lezen van de data opgelet.

* Localhost PostgreSQL proberen te accessen
* Syntax probleempjes in PostgreSQL
* Bedenken van het efficient storen van de data in een database
* Presentatie
* Inconsistente JSON data
* Niet alle zones hebben een sensor en niet alle sensoren hangen in alle zones

# Dag 6 - 6 juni
Voor elke floor komt een aparte pagina met een lijngrafiek. Er komt ook nog een grafiek voor hoeveel mensen er zijn gescand per half uur en dat wordt gevisualiseerd voor het hele gebouw, per verdieping en per zone. Het aantal gescande mensen per half uur geeft over een dag een indicatie van hoeveel mensen er die dag in het gebouw waren maar omdat er geen specifieke scan is voor wanneer iemand het gebouw verlaat kan daar niet makkelijk een linegraph van gemaakt worden. Er komt ook een heatmap per verdieping (3). Er zijn dan drie kaarten omdat de HVAC- en proxzones net iets anders zijn. De eerste is gewoon een floorplan met elke ruimte en de andere twee zijn heatmaps over de verschillende soorten zones en zones zelf. Er is besloten om voorlopig niet te werken met een database om eerst een goed overzicht te krijgen van de data en dus eerst lokaal in te laden (dat werkt nu nog best snel). Verdieping 1 werkt in zijn geheel, met een dropdown om de sensordata te kiezen en met checkboxes om zones aan- of uit te zetten. De sourcecode hiervoor kan ook gebruikt worden voor verdiepingen 2 en 3.

* Elke floor data op een andere pagina
* Linegraph voor hoeveel mensen er gescand zijn
* Heatmaps
* Uiteindelijk een zoom slider maken voor de data
* Checkboxes voor de zones op een floor
* Voorlopig lokaal inladen
* Wildcard string functie gevonden op: http://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
* Checken of een variabele een array of object literal is: http://stackoverflow.com/questions/8511281/check-if-a-variable-is-an-object-in-javascript

# Dag 7 - 7 juni
Vandaag gaan we werken aan de linegraphs van floor 2 en 3. De data is bijna hetzelfde als op floor 1, maar de HVAC zones zijn weer anders dus moet gekeken worden naar welke data niet beschikbaar is voor welke zone op de floors. Floor 3 kan iets moeilijker zijn omdat sommige data die per zone is voor sommige zones er wel zijn en voor zommige niet, dus moet dat per soort data gekeken worden welke checkboxes uitgezet moeten worden.  
De data voor floor 2 en floor 3 zijn anders opgebouwd dan voor floor 1. De data van floor 1 was een array van objecten, met elk object de property "message", wat weer een object was met de timestamp en de sensor readings en de property "offset", wat het aantal seconden vanaf het begin van de metingen was. De data van floor 2 en 3 zijn ook arrays met objecten, maar deze objecten zijn meteen al de sensor readings, en is dus niet opgebouwd uit "message" and "offset" properties.  
Floor 2 is vandaag gefixt. De kleuren die gebruikt zijn komen van http://www.mikesclark.com/web_management/html_colors.html, omdat colorbrewer geen paletten van 19 kleuren toestaat.  
Landingspagina index.html toegevoegd. De oude inhoud van index.html is verplaatst naar general.html, om aan te geven dat het hier om general data gaat over het gehele gebouw. Dat creeert ruimte voor achtergrondinformatie en uitleg op index.html  
De data van floor 3 is weer inconsistent. De sensor voor VAV REHEAT Damper Position is voor alle zones waar die beschikbaar is gegeven als F_3_Z_[nummer] VAV REHEAT Damper Position, BEHALVE voor zone 9. Dan is het F_3_Z_9 VAV Damper Position. Dus dat even veranderd in de data.  
Functionaliteit voor floor 3 is toegevoegd, en als er voor een zone geen sensor data is, fade deze uit en wordt de checkbox niet beschikbaar gemaakt.  
Comments in de javascript files proppen

* Werken aan floor 2 en 3 vandaag
* Floor 2 en 3 data ziet er net iets anders uit dan floor 2 data
* Kleuren van floor 2: http://www.mikesclark.com/web_management/html_colors.html
* index.html > general.html (en index.css > general.css)
* Nieuwe index.html als landingspagina
* F_3_Z_9 VAV Damper Position > F_3_Z_9 VAV REHEAT Damper Position
* Floor 3 werkt nu
* Comments in de js files stoppen

# Dag 8 - 8 juni
Vandaag gaan we kijken naar een brush slider om in te zoomen op een specifiek gedeelte van de linegraph (Bron: http://bl.ocks.org/natemiller/7dec148bb6aab897e561).  
Het is misschien ook leuk om het design van onze visualisatie wat op te leuken.  
Lijnen springen nu naar de voorgrond als je over de lijn hovert.  
De brush voor general.html is gelukt  
De brush voor floor1.html is ook gelukt met minimale verandering van de brush in general.html  
Floors 2 en 3 zijn ook gelukt, heeft wel iets meer tijd gekost en het duurde ook wel even voordat er een nasty bug uit was die ervoor zorgde dat de grafiek links van de y-as kon verschijnen.

* Brush/slider voor zoom: http://bl.ocks.org/natemiller/7dec148bb6aab897e561
* Opmaak visualisatie regelen misschien
* moveToFront prototype toegevoegd aan d3 selection voor een popout effect
* Brush voor general.html is gelukt
* Brush voor floor1.html is gelukt
* Floors 2 en 3 zijn ook gelukt, bugs zijn er (voorlopig) ook uit

# Dag 9 - 9 juni
Vandaag gaan we even de comments opschonen in de HVAC linegraph code en kijken of we deze in modules kunnen splitsen voor als alle visualisaties op een pagina komen.  
De tekst op de x as van de linegraphs staat niet meer scheef, dat was nog een rest stuk van toen de tekst met een hoek van 45 graden stond, maar dat is nu niet meer van toepassing.  
Er is nu een extra pagina voor alleen de resultaten die uit de visualisaties komen, zoals patronen van een dagelijkse werkdag, gekke dingen en relaties tussen prox card data en ruimtes van het gebouw.  
Even snel de resultaten beschrijven.  
Snel de opvallendste resultaten kort samengevat in findings.html

* Comments opschonen
* Voorbereidend werk op als alles bij elkaar komt
* De tekst op de x assen staat nu horizontaal ipv diagonaal
* Nieuwe pagina: findings.html
* Kort de bevindingen beschrijven als klad op findings.html
* Voor alle linegraphs even kort de bevindingen samengevat in findings.html onder kopje "klad"

# Dag 10 - 10 juni
Vandaag presenteren we de alpha versie van ons product, wat in dit geval de alpha versies zijn van ons afzonderlijke werk. Er zijn al wat kleine resultaten uit de linegraphs gekomen maar dat moeten we nog linken aan de proxreaders en de Hazium concentraties.  
Bij het hoveren over een lijn, haal hem dan niet naar voren met parentNode.appendChild, maar doe dan de opacities van de andere lijnen lager en houd de huidige opacity op 1.

* Presentaties van alpha versies
* Er is nog niet makkelijk een relatie te vinden omdat de visualisaties nog op aparte pagina's staan
* Opacities van de andere lijnen lager zetten bij hover over een lijn

# Dag 11 - 13 juni
Vandaag hebben we een kleine stap gezet om alles in elkaar te gooien. Er is nu op de general.html pagina ook een optie Hazium Concentrations in de dropdown, waarop de metingen van de 4 Hazium sensoren in de lijngraph worden gezet. Daarbij hebben deze haziumlijnen hetzelfde hovergedrag als de lijnen van verdieping 1, 2 en 3: bij het hoveren over een van de lijnen vervagen de anderen.  
Vandaag kijken we naar hoe de slider efficienter data inleest voor de mobile prox data. Op dit moment scant het script door de gehele dataset als de slider slechts een klein beetje beweegt. Een manier is om ticks toe te voegen, zodat bij de kleinste beweging niet meteen door alles gescand wordt maar dan wordt alsnog de hele tijd de gehele dataset doorzocht, wat niet efficiënt is. Daarom is het handig om de dataset op te splitsen in bijvoorbeeld dagen, zodat alleen de relevante dag doorzocht wordt. Een ander idee is om de slider op te splitsen naar een dropdown en een slider. Met de dropdown kan dan de dag gekozen worden en met de slider kan de tijd van de dag gekozen worden. Dat vermindert het aantal opties op de slider zodat er niet de hele tijd gezocht wordt. Een extra optie is om alleen de data te updaten bij mouseup (.on("brushend", function() {})), zodat er niet voor alle tijden ertussenin de data wordt doorzocht. Daarnaast kan er een timer worden gestart van bijvoorbeeld een seconde die wacht op het doorzoeken van de data. Die timer wordt gecleard als er gebrusht wordt. Zo wordt er ook niet de hele tijd gezocht voor data tussen het start- en eindbrushpunt.  
Ik heb in slidertest.html een probeersel gemaakt met een slider die wel meesleurt als je sleept met je muis, maar de tekst in de div updatet alleen als je de slider loslaat (dmv een brushend event).

* Kleine voorbereidingen op samenvoegen
* Hoveren over een lijn vervaagt de andere lijnen
* Efficienter maken van de tijdbrush voor de heatmaps/trackermaps
* Probeersel met een slider en brushend event

# Dag 12 - 14 juni
Vandaag gaan we wat containers maken voor als de visualisaties bij elkaar komen. We maken alvast even een div voor de prox data van de fixed sensoren, dus niet de robot die rond loopt. De visualisatie zelf komt er nog niet in omdat deze nog niet helemaal af is: hij moet nog iets opgeschoond worden en de missende waarden moeten naar 0, niet interpoleren naar de volgende meting. Dan kan hij erbij geplakt worden.  
Eventjes wat korte notities over de resultaten van de fixed prox data in findings.html geschreven.  
Extra informatie op de index pagina toegevoegd, uitleg over de opbouw van de visualisaties: wat is waar te vinden.  
Voor de fixed prox sensor linegraphs (per floor voor het gebouw en per zone voor elke verdieping) wordt nu de waarde 0 toegekend aan uren waar geen data voor is. Zo zijn er geen gekke lijnen meer, maar loopt alles netjes naar de x-as als er missende data is. De code is alleen nog wel erg vies omdat er eigenlijk 4 keer hetzelfde wordt gedaan, maar dat kan volgende week gefixt worden.  
General.html bevat nu ook de fixed prox data per floor in een line graph.  
Hele leuke dingen gedaan voor floor1,2,3.html, daar zijn nu fixed prox lijnen te zien per prox zone op een verdieping. Hoveren over een prox lijn vervaagt alle andere prox lijnen, net als bij de sensor data.

* Containers voor de andere visualisaties op de skeleton pagina's
* Korte resultaten fixed prox in findings.html
* Opbouw pagina in index.html
* Oplossing voor missende data is fixed prox sensor door de lijn naar 0 te laten lopen
* Fixed prox data per floor in general.html
* Alle floors hebben nu prox data en vervagen andere lijnen bij het hoveren over een lijn

# Dag 13 - 15 juni
Vandaag gaan we proberen alles te wrappen, dwz we gaan proberen alles in één framework te krijgen. Het framework van overview is een goed startpunt, dus we gaan daar proberen divs in te plakken voor de heatmaps en de parallel coordinates graph.  
We zitten ook even na te denken over hoe we de visualisaties in het geheel willen gaan indelen. Op dit moment hebben we aparte html pagina's voor general en floor 1/2/3. Het vervelende is dat dan de data steeds moet worden ingeladen als er van pagina wordt gewisseld. Het is misschien een idee om alle visualisaties van alle floors en het gebouw zelf op één pagina te doen, zodat de data slechts één keer wordt ingeladen. Maar daar hoeven we voorlopig nog niet naar te kijken, en kunnen we het eventueel opschuiven naar week 4.  
Alle visualisaties staan nu op één pagina, met knoppen om van verdieping te wisselen zodat er niet ongelofelijk veel gescrold hoeft te worden voor het vergelijken van twee graphs. Het voordeel is nu ook dat opties zoals dropdowns en checkboxes onthouden worden.  
Vandaag een klein begin gemaakt om overview-dataMaker.js minder repetitief te maken, m.a.w. dingen die meerdere keren gebruikt worden in functies gieten.

* Alles bij elkaar brengen
* Alle visualisaties eventueel op één html pagina gooien
* Alles staat op één pagina in visualisations.html en de opties onthouden nu de keuzes
* Code opschonen van overview-dataMaker.js

# Dag 14 - 16 juni
Vandaag gaan we verder met het opschonen van overview-dataMaker.js om de code wat leesbaarder en efficienter te maken.  
De code is 2x zo kort na het opschonen. Alle repetities zijn nu in for-loops gepropt, dat scheelt if-checks.  
De heatmaps zijn zo goed als af, maar er kunnen conflicten zijn wat betreft de variabelenamen. Daar moeten we dan nog later gezamenlijk naar kijken.  
Comments toegevoegd aan overview-proxExtended2.js en indentatie gefixt zodat dat consistent is met de rest van de js files.  
dataMaker is nu self-invoking dus dan is er geen apart script nodig om deze functie aan te roepen.  
Beginnetje gemaakt om alle init- en updateChart functies naar dimensions.js te verplaatsen vanuit general.js en floor1/2/3.js files.  
Het verplaatsen van alle functies voor de charts naar dimensions.js is nu klaar.

* Code verder opschonen in overview-dataMaker.js
* Leuke code ingekort
* Conflicten bekijken en eruit halen
* Comments en indentaties in overview-proxExtended2.js
* dataMaker is nu self-invoking
* Functies om de charts te beheren splitsen van het script wat ook de data inlaadt.
* Functies voor de charts zitten nu allemaal in dimensions.js

# Dag 15 - 17 juni
Dit is de laatste dag waarop nog nieuwe functionaliteit (minimaal) geimplementeerd mag worden. Nou hebben we alle functionaliteit opgesplitst tussen ons drieën, en kunnen we dat vanaf volgende week in elkaar gaan zetten. Voor nu staan de HVAC sensor readings, hazium concentraties en data van de fixed prox sensoren. Vanaf volgende week moeten er dan nog de heatmaps voor de HVAC readings bij waarop ook stipjes staan van de mobile prox sensor Rosie en parallel coordinates graphs voor de individuele werknemers bij om te kunnen zien hoe vaak zij op een dag gescand zijn door een fixed prox sensor.  
Er kan vandaag wel gekeken worden naar het opschonen van de code, zoals repetitie eruit halen en waar nodig scripts in IIFE's zetten, zodat variabelen niet globaal zijn. Zo wordt de kans op conflicterende variabelenamen kleiner en wordt het in elkaar zetten van alle scripts makkelijker.  
General.js en floor1/2/3/.js staan nu in IIFE's, maar dan moesten de init en update chart functies weer vanuit dimensions.js teruggeplaatst worden in hun eigen scripts.  
Kleine bugfix gedaan voor de clipping van de fixed prox graphs door elke linegraph een eigen unieke clippath toe te kennen.  
Presentatie: eenheden van de data op de y-as plaatsen met bijvoorbeeld een extra attribute in de html, minimum en maximum van de linegraphs iets aanpassen zodat het minimum dan bijvoorbeeld het minimum van de data is - 1, voor minder geconcentreerde grafieken. Een laadgif toevoegen en die laten verdwijnen als hij klaar is met laden.

* Geen nieuwe functionaliteit meer na vandaag
* Alles moet volgende week in elkaar gezet worden
* Repetitie in functies gooien en IIFE's maken
* IIFE's gemaakt van general.js en floor1/2/3.js
* Elke fixed prox linegraph een eigen unieke clippath toegekend
* Presentatiefeedback

# Dag 16 - 20 juni
Vandaag gaan we denk ik beginnen aan het eindverslag; beschrijven van de probleemstelling, het proces er naar toe (wat uit grotendeels uit het procesboek te halen is) en uitleggen hoe de visualisatie gebruikt kan worden.  
Deze week verwacht ik ook de code voor de laatste visualisaties, zodat ik ze in elkaar kan weven zodat het één grote visualisatie wordt, en niet een paar afzonderlijke.  
Het is misschien handig om te kijken of de jQuery functionaliteit naar D3 of zelf vanillaJS functionaliteit omgezet kan worden zodat de grote jQuery library niet eens geladen hoeft te worden. Maar dat kan tijd kosten die beter gestoken kan worden in alles in elkaar zetten, dus het is afwegen of dat het wel waard is.  
Opzetje gemaakt voor eindverslag. Het bevat nog lege kopjes voor de heatmaps en parallel coordinatesgraph omdat deze nog niet geimplementeerd zijn.  
Placeholder voor de LICENSE toegevoegd.  
LICENSE is public domain gekozen, omdat de VACommunity misschien de rechten voor de visualisatie krijgt bij het insturen.  
Van plan om te kijken naar het kleiner maken van de visualisaties, waarbij er ingezoomd kan worden als er op de kleine versie van de visualisatie wordt geklikt. Zo hoeft er niet zo veel over de pagina gescrolld te worden, en wordt het overzicht van de pagina behouden.

* Eindverslag opstapje
* Laatste visualisaties bij de opzet plakken
* Kijken of jQuery misschien niet nodig is als de functionaliteit zelf geschreven kan worden
* Opzetje eindverslag
* LICENSE placeholder
* LICENSE Public domain
* Kijken naar een zoom on click waarbij de visualisaties eerst veel kleiner zijn

# Dag 17 - 21 juni
In een branch de view verbeterd van de visualisatie: er staat steeds slechts één visualisatie centraal, de rest staan klein rechts. Door op een visualisatie te klikken verschijnt deze centraal.  
Het in elkaar zetten van de heatmaps en de bestaande visualisatie is een klein probleempje omdat de heatmaps op meerdere pagina's staan en de visualisatie uitgaat van alles op één pagina. Daarom kan niet alles in één keer geport worden. Daarnaast werken de heatmaps niet in Safari, dus moet er overgestapt worden naar Chrome, waar deze wel in werken.  
De zoom on click onthoudt nu op welke plek de minis staan: als de focus op een andere graph wordt gelegd, komt deze niet meer onderaan de lijst van minis te staan maar op de plek waar deze eerst stond zodat je deze niet kwijt raakt.  
De flexbox moet niet wrappen zodat de minis aan de rechterkant van de pagina staan en niet onder de centrale visualisatie.  
De kladresultaten in het REPORT gezet, waarbij de telegramstijl er voor het grootste gedeelte eruit is gehaald.

* Implementatie zoom on click
* Heatmaps bij de visualisatie gooien is nog een klus
* Heatmaps werken niet correct in Safari, overstap naar Chrome
* Onthoudt de plek van de minis stonden in de lijst
* Wrapping uitgezet  
* Resultaten verplaatst naar REPORT

# Dag 18 - 22 juni
Vandaag gaan we even kijken naar hoe we de heatmaps bij de hoofdvisualisatie kunnen gooien want het is nu afhankelijk van dat alle heatmaps op aparte pagina's staan, maar de hoofdvisualisaties staan allemaal op één pagina. Het kon daarom niet meteen erin gegoten worden.  
Noodoplossing is dat alleen de linegraphs op één pagina komen en de heatmaps elk een aparte pagina krijgen zodat de gedetailleerde visualisaties een eigen pagina hebben. Voorlopig is het een vieze oplossing maar dat maakt de visualisatie wel completer.  
De heatmaps van de HVAC en prox data staan nu op aparte pagina's onder hun eigen kopje Heatmaps. Alles werkt prima en het is ook vrij snel.  
Vandaag gaan we ook alles mooi maken, bijvoorbeeld met bootstrap omdat de pagina nu tekst en plaatjes op een witte pagina zijn. Met bootstrap wordt de visualisatie wat mooier en lijkt het minder op een collage.  
De repo is nu een chaos omdat er veel bestanden in staan die niet meer worden gebruikt, overbodig zijn of als test waren bestemd. Deze zijn nu verwijderd en daarmee is de repo een heel stuk overzichtelijker geworden.  
Morgen gaan we kijken naar de opmaak en maken we de analyse af.

* Fixen van alle heatmaps op één pagina
* Visualisations.html wordt graphs.html en de heatmaps krijgen elk een aparte pagina  
* Heatmaps hebben nu hun eigen pagina
* Bootstrap
* Oude/ongebruikte/test bestanden verwijderd
* Morgen opmaak mbv bootstrap en analyse afmaken

# Dag 19 - 23 juni
Vandaag kunnen we de laatste visualisatie -- de parallel coordinates graph en de bijbehorende heatmaptabel -- verwerken in de algehele visualisatie. Als dat allemaal werkt, kunnen we gelijk aan de slag met de analyse van de data en de verdere opmaak van de visualisatie, omdat het nu nog lijkt alsof alles gewoon aan elkaar geplakt is.  
De visualisatie is in ene gebroken, waarschijnlijk is dat omdat de data niet synchroon is opgeschoond, dus werken we eigenlijk met twee versies van elk data bestand.  
De bootstrap visualisatie werkt gelukkig nog wel, dus we gaan daar mee verder.  
De parallel coordinates graph werkt niet in het geval dat alle visualisaties eerst klein rechts staan, waarbij er ingezoomd kan worden op een enkele visualisatie bij het klikken op die grafiek. De HTML gooit dan de volgorde van de DIVs zó door elkaar heen dat de graph niet meer werkt. We zijn daarom teruggestapt naar alle visualisaties groot op één pagina, wat nu minder erg is omdat de heatmaps nu op aparte pagina's staan. Het design is dan dat de visualisaties specifieker worden als er naar beneden gescrolld wordt: eerst de metingen over het gehele gebouw/de gehele verdieping, en dan kunnen mensen individueel bekeken worden. De visualisatie is nu dus gesplitst in een pagina graphs, met de linegraphs voor de HVAC en fixed-prox data en een parallel coordinates graph met een heatmap voor de fixed-prox data, en een pagina heatmaps, waar de floorplans van het gebouw ingekleurd en bestippeld worden adhv de HVAC en fixed en mobile prox data.  
De kleuren van de knoppen zijn nu iets minder fel, het zijn nu pastelkleuren die wat fijner zijn voor de ogen.

* Analyse van de data
* Verdere opmaak regelen
* Visualisatie is opeens gebroken
* Bootstrap visualisatie is the way forward
* Teruggestapt naar het oude idee waarbij alle visualisaties groot onder elkaar staan
* Pastelkleuren
