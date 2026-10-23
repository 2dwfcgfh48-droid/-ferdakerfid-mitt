# Yfirferð hnappa — 21-10-2026

## Leiðrétt villa
`clamp` vantaði í myndahlutann. `openTrip` sótti ferðina en myndastillingar köstuðu villu áður en ferðasíðan birtist. Fallið er endurheimt í báðum myndaskrám og skyndiminnisútgáfunúmer hækkað.

## Keyrsluprófanir með prufugögnum
- Opnun ferðar í gegnum raunverulega `openTrip`, `refreshTripHeading` og myndauppsetningu nær að birta ferðasíðu.
- Ferðaspjöld tengjast `openTrip`; óþekkt ferðarauðkenni er hunsað.
- Myndahluti ræsist og skiptir um ferð; sjálfgefnar stærðarstillingar reiknast.
- ⋯ opnar myndaglugga. Loka-hnappur og utansmellur loka. Smellur innan glugga lokar ekki.
- Fela mynd vistar falið val og sýna-aðgerð birtist.
- Sama próf greinir villu ef clamp er aftur fjarlægt.

Prófin nota eftirlíkingu af DOM og gagnasvörum í Node, ekki raunverulegan vafra. Innbyggð modal-einangrun iPhone/Safari er því óstaðfest.

## Yfirferð kóða
188 fastir hnappar: almennar aðgerðir, stillingar, ferðir, áfangastaðir, bókanir, dagsetningar, flugleit, kort, kostnaður, PDF, ferðaveski, innflutningur, áminningar og öryggisafrit. 63 beint nafngreindir atburðahandlarar vísa allir í skilgreind föll. Aðrir hnappar tengjast með data-close, lykkjum, reiknuðum auðkennum eða innfelldum aðgerðum. Engin tvítekin föst HTML-auðkenni fundust. Þetta er kóðayfirferð, ekki framkvæmd allra aðgerða.

Allt JavaScript í afhentum skrám stenst setningafræðiprófun.

## Óstaðfest
Ekki hefur verið klárað að ýta á alla hnappa í innskráðum vafra. Vistun/breyting/eyðing raunverulegra gagna, PDF-sjónprófun, innskráning, netlaus virkni og ytri þjónustur eru óstaðfest. Upprunalegi pakkinn innihélt ekki allar tengdar verkefnisskrár, t.d. offline-store.js. Halda öðrum skrám verkefnisins.

Prófunarskrá: `node tests/controls-smoke.cjs` úr verkefnismöppunni.

## Ferðaspjöld — viðbót
`node tests/trip-cards.cjs` staðfestir með prufugögnum sameiginlegt myndaval, aðskilnað reikninga, falda/ógilda mynd, dagsetningar/nætur, kostnaðarbirtingu safns, textavörn og smelli/Enter/bil. `controls-smoke.cjs` uppfært fyrir sameiginlega hausstaðsetningu og tengingu spjalda. Öll þrjú keyrsluprófin standast. Myndhlutföll, textalæsileiki yfir mynd og smáir skjáir hafa ekki verið sjónprófuð í vafra.

## Hausmynd — 22-10-2026
`node tests/header-fade.cjs` prófar flutning eldri stillinga, tvo sleða, vistun/enduropnun, forskoðun, bogna lárétta grímu án botnútþynningar, núllgildi, endurstillingu og aðskilnað ferða. Önnur keyrslupróf standast áfram. SVG-gríman og snerting sleða hafa ekki verið sjónprófuð á iPhone.

## Sleðauppfærsla — 22-10-2026
Útfærsla notar nú CSS-grímur í stað síbreytilegs SVG-data-URL, rAF fyrir forskoðun og frestaða vistun. header-fade.cjs uppfært og stenst ásamt öðrum þremur prófum. Hvort Safari-blikk hverfi þarf að staðfesta í tæki.

## Dagaval og skrun — 22-10-2026
`node tests/calendar-scroll.cjs` staðfestir með hermdum hæðum stöðugt dagaval við samdrátt/stækkun veðurspjalds og varðveislu láréttrar stöðu. Fyrri fjögur keyrslupróf standast. Þetta er ekki raunvafrapróf á Safari-skrunfestingu.

## Nýtt aðalspjald Í dag — 23-10-2026
`node tests/today-spotlight.cjs`: afþreying, frjáls dagur, opin lest, innritun og áframhaldandi dvöl, óskráður tími/tímabelti, eldri atriði dagsins, brottfararforgangur, valkostir/afbókun, heimleið fram/tilbaka, áætlað dagabil og virk tenging í bókun/skjal og nánari veðurspá. Prófin nota prufugögn og hermt DOM, ekki raunvafra. Allir sex prófaflokkar standast. Prófa þarf nýja útlitið, snertingu veðurs, miða og leiðsögn á iPhone og iPad.
