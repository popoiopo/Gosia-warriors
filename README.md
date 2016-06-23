# Mini Challenge 2 - Gosia's warriors, the trilogy
## VACommunity
### Bas Châtel, Leslie Dao, Wessel de Jong

Doel en achtergrond:
------------------

Voor dit project zal ik trachten de 2016 VAST Challenge: MC2 te tackelen. Het voorgelegde probleem is als volgt:

Het bedrijf GAStech is recentelijk verhuisd naar een nieuw 'state-of-the-art', drie verdiepingen tellend kantoor. Ondanks de 
fantastische eigenschappen van dit nieuwe gebouw en de gestegen moraal als gevolg van de verhuizing zijn er toch nog een aantal ontevreden werknemers. Aan ons de taak om GAStech te assisteren in het volledig begrijpen van de door hen geleverde data en hiermee wellicht te komen tot conclusies die de ontevredenheid van deze werknemers kunnen verklaren. Hierbij ligt de focus op de volgende vier subvragen:

1. What are the typical patterns in the prox card data? What does a typical day look like for GAStech employees?
2. Describe up to ten of the most interesting patterns that appear in the building data. Describe what is notable about the pattern and explain its possible significance.
3. Describe up to ten notable anomalies or unusual events you see in the data. Prioritize those issues that are likely to be the most likely to represent a danger or a serious issue for building operations.
4. Describe up to five observed relationships between the proximity card data and building data elements. If you find a causal relationship (for example, a building event or condition leading to personnel behavior changes or personnel activity leading to building operations changes), describe your discovered cause and effect, the evidence you found to support it, and your level of confidence in your assessment of the relationship.

GAStech heeft verschillende metingen tot onze beschikking gesteld om tot een oplossing van dit probleem te komen. 

Via personeelspassen is het mogelijk om voor bepaalde gespecifiseerde zones te bepalen wie er zich in die specifieke zone begeeft. Sensoren meten de hele dag de aanwezigheid van bepaalde personeelspassen en slaan deze informatie op. Ook rijdt er een robot door het gebouw met een sensor die zeer specifiek waarneemt waar een bepaalde personeelspas zich bevndt en deze informatie opslaat. Aan de hand van deze metingen zou het mogelijk moeten zijn het personeel de hele dag te traceren. Echter gaat het personeel niet altijd secuur om met de personeelspassen.

Naast bovenstaande locatiezones is er ook sprake van bepaalde HVAC (heating, ventilation, and air conditioning) zones. Ook in deze zones zijn er sensoren geplaatst. Met deze sensoren worden metingen gedaan van de temperatuur, verschillende waarden betreffende de status van het verwarm- en afkoelsysteem en de concentratie van verschillende chemicalien, zoals CO2 en het wellicht giftige hazium. Er zijn vier sensoren opgehangen om Hazium te meten. Tot onze beschikking hebben wij bovenstaande data over een periode van twee weken. Belangrijk hierbij is dat de HVAC zones niet gelijk zijn aan de locatiezones. Het kan dus zo zijn dat iemand zich in een bepaalde locatiezone bevindt, die zelf weer bestaat uit verschillende HVAC zones. Hierdoor is het niet altijd mogelijk om te traceren of een persoon zich daadwerkelijk in een HVAC zone begeeft. Dit kan problemen veroorzaken met het proberen te achterhalen van een eventuele relatie tussen bovenstaande waarden en de verplaatsing van het personeel door het gebouw. De robot daarentegen geeft wel precieze locaties, hiermee kan dus wel precies getraceerd worden in welke HVAC zone iemand zich begeeft.

Data:
-----
Verschillende datasets zijn geleverd, hieronder een overzicht:

1. Een lijst met de namen van het personeel, de afdeling waarop zij werken en het kantoor dat hen is toegewezen.
2. Van elke verdieping zijn er drie plattegronden. Eén plattegrond vormt een simpele weergave van de specifieke verdieping en de ruimtes die zich daarop bevinden, een andere plattegrond geeft de verschillende locatiezones aan en de laatste plattegrond geeft de HVAC zones aan.
3. Voor de 4 specifieke zones waar de hazium sensoren hangen bestaan zowel een csv als een JSON file met de resultaten van de metingen van deze sensoren. De resultaten geven voor elke 5 minuten over een periode van twee weken de specifieke concentratie hazium aan.
4. Ook van de robotdata zijn zowel een csv file als JSON file. Deze data geeft het tijdstip aan waarop de aanwezigheid van een bepaalde pas is gemeten, welke pas is gemeten en de precieze locatie waar de pas zich bevond op het moment van de meting. Dezelfde soort bestanden bestaan voor de statische locatiesensoren. Zoals bovenstaand genoemd geven deze resultaten echter niet de exacte locatie van de personeelspas, maar de locatiezone waarin deze zich begaf. 
5. Een groot csv bestand dat voor elke 5 minuten alle HVAC sensor metingen bevat. Daarbij bestaan er 4 verschillende JSON files die voor de verschillende zones specifieke HVAC metingen bevatten. Ook deze files bevatten de resulaten van metingen die elke 5 minuten hebben plaatsgevonden.    

## Functionaliteit
De visualisatie bestaat uit 4 pagina's: een introductiepagina waarop het probleem kort staat uitgelegd met bronnen en een dankwoord, een graphspagina waar alle visualisaties van de data op staan, een heatmappagina, die onderverdeeld is per verdieping in meerdere pagina's en een resultatenpagina waar de resultaten zoals patronen en opvallendheden kort op staan beschreven. De visualisatiepagina is de meest interessante pagina, omdat je daar vrij bent om zo diep in de data te duiken als je zelf wilt. Het laden van de pagina duurt aan het begin wat lang, maar als het eenmaal geladen is, dan zit er vrijwel geen 'lag' meer in de visualisatie -- behalve als er zo'n 18 lijnen een transition krijgen. Alle visualisaties vertonen data over een periode van twee weken. Een gebruiker kan, als hij/zij dat wilt, inzoomen op een kleinere periode met sliders en brushes om opvallendheden te highlighten.

## Bronnen
Data (.csv en .json): [VACommunity](http://vacommunity.org/2016+VAST+Challenge%3A+MC2)  
Libraries: [D3js](https://d3js.org), [jQuery](https://jquery.com), [D3 Queue](https://github.com/d3/d3-queue), [D3 Legend](https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.10.0/d3-legend.js), [Bootstrap](http://getbootstrap.com)

## Copyright
<p xmlns:dct="http://purl.org/dc/terms/">
<a rel="license" href="http://creativecommons.org/publicdomain/mark/1.0/">
<img src="https://licensebuttons.net/p/mark/1.0/80x15.png"
     style="border-style: none;" alt="Public Domain Mark" />
</a>
<br />
This work (<span property="dct:title">Gosia's warriors, the trilogy</span>, by <a href="https://github.com/popoiopo/Gosia-warriors/" rel="dct:creator"><span property="dct:title">Bas Châtel, Leslie Dao, Wessel de Jong</span></a>), identified by <span property="dct:title">Gosia Migut</span>, is free of known copyright restrictions.
</p>
