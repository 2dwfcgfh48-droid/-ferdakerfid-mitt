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

24-10-2026 — Hótelskipti í Í dag
Samþykkt útlit varðveitt. Valin bókuð/notuð gisting sem lýkur í dag fær litla útritunarlínu fyrir ofan aðalatriðið. end_local_time birtist aðeins ef gilt vistað gildi er til; enginn tími áætlaður. Gisting í kvöld er áfram aðskilin. Óbókuð ferð sýnir að tími sé óákveðinn. Vantað viðhengi breytir ekki bókunarstöðu; skjámyndir/PDF nota núverandi ferðaveski. Engin ný tenging við lestaröpp eða sérreitur fyrir miðageymslu útfærður í þessari útgáfu.
Prófun: öll sex Node-prófasöfn standast og málskipun innfelldra skrifta yfirfarin. Raunprófun í síma/iPad eftir uppfærslu er eftir.

24-10-2026 — Gistibókun: sameinað dvalarsvæði
Innritunar- og útritunardagur saman fyrir ofan staðsetningu, fjöldi nátta reiknaður eftir dagsetningum. Innritun frá og útritun fyrir eru nýir valfrjálsir reitir, aðskildir frá eldri áætlaðri komu okkar (local_time). Skilmálatímar vistast í metadata.lodging_times; engin gagnagrunnsbreyting. Eldri end_local_time lesinn ef ný útritunarstilling vantar; tæming nýja reitsins gengur framar eldra gildi. Tímar sýndir í viðeigandi Í dag hluta og PDF. Sömu dagsetningarreitir færðir innan forms, ekki afritaðir, svo eldri viðburðatengingar og hreinsun haldast. Önnur bókunarform og kostnaðarvirkni varðveitt.
Prófun: sjö Node-prófasöfn, þar með raunveruleg saveItem keyrsla með hermdum gagnagrunni, flokkskipti, enduropnun tíma, tæming og fjöldi nátta við sumartímaskipti; málskipun allra innfelldra skrifta og einstök HTML auðkenni standast. Engin raunprófun í vafra eða síma; vafrakeyrsluskrár eru ekki uppsettar hér.

24-10-2026 — Meira valmynd
Bætt við Fara í dag, Ferðaveski og Breyta áfangastöðum fyrir ofan Breyta ferð. Hausmynd opnar undirvalmynd með Til baka og sömu eldri velja/stilla/fela aðgerðum. Eyða ferð heldur eldri sýnileikaskilyrðum og staðfestingum, neðst með auknu bili. Fara í dag er óvirkt utan ferðar í gangi eða við hleðsluvillu. Lokun endurstillir undirvalmynd; Escape fer fyrst til baka úr Hausmynd og lokar svo Meira. Núverandi gluggar og vistun notuð óbreytt.
Prófun: átta Node-prófasöfn standast, þar á meðal ný trip-more prófun á aðgerðatengingum, undirvalmynd, bakfærslu, Escape, lokun utan valmyndar og fókus/skrun á Í dag. Málskipun skrifta og einstök HTML auðkenni yfirfarin. Engin raunprófun í síma/vafra hér.

24-10-2026 — Dagsetningar áfangastaða í bókun
Áfangastaðaval sýnir vistað dagabil í dd-mm-yyyy. Undir valinu birtist áætluð dvöl og fjöldi nátta þegar dagabilið er gilt. Gistibókun fær Nota daga áfangastaðar sem fyllir inn innritunar- og útritunardag; eldri gildi haldast tiltæk í Afturkalla val. Skipti um áfangastað eða flokk yfirskrifa ekki bókunardaga. Hnappur falinn fyrir aðra flokka og ófullkomið/ógilt dagabil. Upplýsingar sjást líka í öðrum bókunarflokkum.
Prófun: níu Node-prófasöfn standast og málskipun innfelldra skrifta yfirfarin. Raunprófun í síma er eftir.

24-10-2026 — Afmörkun dagsetningar- og tímareita í skrunanlegum bókunarglugga
Notandi lýsir röngu snertimarki í iPhone Safari: dagsetning opnar tíma eða næsta hnapp. Orsök ekki endurgerð hér. Lagfæring afmarkar innbyggða date/time snertifleti innan sýnilegra reita, heldur minnst 16px letri til að forðast sjálfvirkan fókus-aðdrátt og notar stöðugt svh bókunargluggasvæði og eigin teiknilag. Gistireitir eru ekki endurfærðir innan DOM ef þeir eru þegar í réttum stað. Engar grípandi snerti- eða smellatilfærslur bættar við.
Prófun: níu Node-prófasöfn og málskipun skrifta standast. Þetta staðfestir ekki viðgerð Safari snertivillunnar; nauðsynlegt er að prófa sýnilega dagsetningar- og tímareiti eftir skrun í síma.
