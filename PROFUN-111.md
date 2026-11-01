# Prófun 111 — 01-11-2026

Grunnur: óbreytt 110 varðveitt. Bæði gildandi ákvarðanir og verkefnalisti lesin fyrir breytingu. Afmörkun: G20/G21/F33; varðveisla F14–F20/F26–F32/G17–G19.

Niðurstaða: 220 Chromium 153.0.8010.0-próf staðin með prufugögnum. 104 almenn úr browser-106.cjs, 24 varðveislupróf úr 107-new-flow.cjs, 19 afmörkuð úr 108-audit.cjs með NEW_ONLY=1, 26 komu- og 23 brottfararpróf úr 110, og 24 ný context-browser.cjs-próf. Endurkeyrsla 108-retained-flow.cjs gaf sömu 24 próf og er ekki talin aukalega. Ekki nota eldri afhendingartölur sem nýjar niðurstöður.

Nýju prófin ná yfir raunverulegan valhnapp, nákvæma Garda-stöð/hótel, sjálfstæðan sóttíma, óskráða komu, handskráða daga og staði, sjálfvirkan dvalarmarkadag sem víkur fyrir staðfestu leiðarvali, 12 sambærilega staðavalflokka og fjóra leiðarenda, samnefndar dvalir með ólík auðkenni, margar valleiðir, gistingu sem passar ekki/er afbókuð, óskráða komu, borgarpunkt í stað nákvæmrar stöðvar, göngu-/dagsferðar-/fram-og-til-baka undanþágur, flug-/ferjukomu og heimkomulegg. Vistun og enduropnun keyra raunverulegt saveItem með hermdri gagnageymslu; source-train varðveitist bætisjafn. Kostnaðar-/skjalaskrif nýja vistunarprófsins eru hermd/óvirk; fyrri almennu prófin halda sínu umfangi á kostnaði og skjölum.

Sérstök endurgerð á sömu prufugögnum í 110 og 111: gardaHotelFirst=false/sameStayAllowed=false í 110, bæði true í 111. Fyrri listi: Trieste-stöð, Garda-stöð, Kaupmannahafnarhótel, Garda-hótel. Nýr listi: Garda-stöð, Garda-hótel, Garda-áfangastaður; önnur ferðagögn neðar. Ekki sönnun um nákvæm vistuð notandagögn eða um hvenær eldri krafa var fyrst samþykkt.

Sjónræn yfirferð: tillöguspjald skoðað við 393px. Innri breidd og hnappastærð prófuð á 320/393/430/768px. Aðeins innri skjámyndir, ekki afhendingarhluti.

Kóðasamanburður: allar 16 keyrsluskrár bornar saman við 110. Aðeins index.html breytist; 15 aðrar bætisjafnar. Sex fyrirliggjandi föll breytt: departureSavedPlaces, openDeparturePlace, openRailwayStationPicker, readOpenJourneyPlan, savedPlaceHelp, updateOpenJourneyFields. Fimm tengd hjálparföll bætt við. Engin föll fjarlægð. HTML/CSS og annar top-level kóði bætisjafn; nýtt tillöguspjald myndað með DOM við áætlunarkafla. JavaScript-málskipan staðfest. Vistunarkjarni, kostnaðarútreikningar, dagafylling, Sótt-merking, dagsferðarlíkan, hringferðarlíkan og leiðsagnarhjálparskrá óbreytt.

Takmörk: raunverulegur iPhone/Safari, lifandi innskráning/gagnaskrif, ytri kortaþjónustur og Maps-app óprófuð. Próf nota Chromium við símabreidd, hermdar þjónustur og engin notandagögn. Níu eldri hermisöfn úr 108 ekki endurkeyrð og halda fyrri óafgreiddri stöðu. Ekki heildarstaðfesting alls kerfisins.

Notkun: opna nýjan Akstur. Við gildar skráðar komuleiðir í bíl birtist „Akstur frá komustað að gistingu“. Velja Nota þessa leið, skrá umsamin sóttíma og vista. Enginn tími er fundinn upp. Við fyrirliggjandi handskráða leið/dag sem passar ekki er hún varðveitt og ósamrýmanleg tillaga ekki notuð.

Frá 110 þarf aðeins index.html. Engin upphleðsla eða breyting í lifandi appi framkvæmd af aðstoðarmanni.
