# Mini Challenge 2 - Gosia's warriors, the trilogy
## VACommunity
### Bas Châtel, Leslie Dao, Wessel de Jong

## Achtergrond & Doel
Het doel van deze visualisatie is om patronen en opvallendheden te herkennen in de geleverde data en daar verbanden tussen te leggen. Voor dit project is data gebruikt die beschikbaar is gesteld door de [VACommunity](http://vacommunity.org/2016+VAST+Challenge%3A+MC2). Deze data is fictief. Het betreft het bedrijf GAStech, wat verhuisd is naar een nieuw gebouw. Het bedrijf heeft verschillende sensoren geplaatst om verschillende variabelen te meten. Daarbij vermoedt het bedrijf  dat de gevaarlijke stof Hazium in het gebouw aanwezig is. Om de concentraties daarvan te meten heeft het gebouw sensoren geplaatst in vier zones. Om het gedrag van zijn werknemers te bekijken, zijn alle werknemers verplicht  prox cards bij zich te dragen. Met behulp van prox sensoren, zowel vaste als een mobiele, kan bijgehouden worden wanneer werknemers van de ene zone naar de andere zone gaan. Echter zijn niet alle werknemers even voorzichtig met hun prox cards; als zij deze zijn vergeten kunnen ze hem weer bij de security desk ophalen.  
De HVAC sensoren loggen elke 5 minuten hun waarde. Deze waarde betreft óf het gehele gebouw, óf een gehele verdieping óf een zone op en verdieping. De fixed-prox sensoren loggen niet om een vaste tijd, maar slechts als deze een nieuwe prox card in de zone detecteert. De mobiele prox sensor scant elke seconde op prox cards, maar aggregeert deze over een minuut.

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
