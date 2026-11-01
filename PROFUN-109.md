# Prófun og afmörkun 109 — 01-11-2026

Grunnur: óbreytt ferdakerfid-108.zip, libfile_8194439671108191bba5523fbf883562. Lestu G17/G18 og nýjustu verkefnisskrá með kóðanum. Engin breyting á vefnum eða lifandi gögnum var gerð í þessari vinnu.

## Keyrslur í þessari lotu

| Safn | Staðið | Umhverfi |
|---|---:|---|
| 108-regression.cjs | 104 | Chromium 153.0.8010.0, prufugögn |
| 108-retained-flow.cjs | 24 | Chromium; saveItem með hermdri þjónustu |
| 108-audit.cjs | 19 | Chromium, fyrri hringferðar-/endurlestrarpróf |
| arrival-browser.cjs | 26 | Chromium; allir fjórir samgönguflokkar, út/heim, sími |
| verify-code.cjs | 38 | Node, AST/bætissamanburður, lesafrit og varðveisla |

Samtals 173 vafrapróf og 38 aðskildar kóða-/hermiathuganir. Nýja safnið var einnig keyrt á óbreyttri 108: 13 staðin og 13 frávik, þar á meðal vöntun nýrra birtinga og röng/frávísuð leiðsögn vegna gamla upphafsvalsins. Ekki túlka 13 sem jafnmarga sjálfstæða galla. 24 varðveisluprófin voru einnig keyrð á grunninum og stóðust þar.

## Afmörkun og varðveisla

Þrjár keyrsluskrár breytast af 16. Þrjú formföll breytast í index.html. HTML/CSS, annar kóði í index, öll önnur hjálparföll í leiðsagnarhjálparskrá og 13 aðrar keyrsluskrár haldast. sw.js breytir aðeins cache-nöfnum; uppsetningar-/hreinsunarkóði er nákvæmlega sami kóðinn.

Akstur heldur Frá/Til, dvalartímabilum, sjálfvirkri dagsfyllingu, dagapörum, Sótt – klukkan, handvali, miðnætti, dagsferð og heimleið. Bátahringferð heldur sér. Engin ný staðbundin akstursgerð eða sama-hótels-viðgerð.

Leiðsögn eftir komu notar fyrirliggjandi komupunkt að gistingu. Almenn yfirskrift upphafs er ekki lengur sýnd við komustöð. Eldri vistuð navigation_origins-gögn eru varðveitt, en notuð ekki til að yfirskrifa komuupphaf. Óskráð stöð er ekki áætluð.

## Prófunarskilyrði

Browser code is the real inline app module with imports/init suppressed and external requests blocked. Data/services are stubbed. For the new four-category fixture, departure-origin output is compared exactly with the original 108 helper, including any original blocked states; this asserts preservation rather than claiming every legacy hotel binding is valid. Flight map fixtures assert the app's resolved airport coordinates in Today and the selected point in the booking form. Navigation modes are selected explicitly before checking links; initial rendering of an old flight's mode before a form refresh is not certified by that assertion. Browser confirmation dialogs are accepted in the fixture. Real costs/documents are retained by older tests according to their original scope; new save tests stub cost/document writes.

Sjónskoðun: 393px sýnir komustöð, skýrt heiti leiðsagnar og Leggja af stað frá við rétt hótel. Nýja línan er einnig prófuð við 320/393/430/768px. Fyrra safnið prófar ljós/dökk þemu og tengd staðfest flæði.

Ekki prófað: raunverulegur iPhone/iPad/Safari, lifandi innskráning/gagnaskrif, raunopnun Google Maps og allir eldri gagnavalkostir. 9 eldri hermiprófasöfn sem stöðvuðust í báðum grunnum í 108 eru enn óafgreidd og voru ekki endurkeyrð. Engin ný notandastaðfesting. Þetta er ekki fullstaðfesting allra reglna eða allra mögulegra ferða.

Prófunarkóði, JSON-niðurstöður og samanburður fylgja undir profanir/109/. Skjámyndir voru aðeins notaðar við innri yfirferð.
