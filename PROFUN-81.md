# Prófun útgáfu 81 · 28-10-2026

Innfluttur miði getur nú farið í handvirkt val á opinni áætlun af sama samgönguflokki í sömu ferð. Samanburðarskref og núverandi bókunarform með samþykkishaki koma áður en sama færsla er uppfærð. Engin sjálfvirk leiðarsameining.

281 Node-prófun stenst: 249 fyrri sviðsmyndir, 26 prófanir á uppfærslu opinnar áætlunar og 6 viðbótarsviðsmyndir í raunverulegri innflutningshnappakeðju.

| Svið | Prófað |
|---|---|
| Val | Sami flokkur, rétt ferð og open/maybe; flug, bókaðar og ótengdar kostnaðarfærslur útilokaðar. Fleiri en ein áætlun og val annarrar færslu. |
| Skref | Raunverulegur innflutningshnappur → lestur → áætlunarval → samanburður → yfirferð. Til baka, ný bókun og aðskilin hnappaauðkenni. |
| Samþykki | Ekkert vistast við val. Vistun án yfirferðarhaks stöðvuð. |
| Varðveisla | Sama item ID, heiti, athugasemdir, áfangastaður, eldri skjöl, heimferð, sértæk metadata, hnit óbreyttra endapunkta og gistival haldast í hermdu vistunarflæði. Ferja heldur bílaupplýsingum. |
| Kostnaður | Eldri upphæð/greiðslur fyllast áfram og óbreytt kostnaðarfærsla er ekki endurskrifuð. Handvirkt breytt verð fer í venjulegt kostnaðarflæði. Áætlaður kostnaður fylgir gildandi samstillingu við bókaða stöðu án þess að lesið verð sé sett yfir upphæðina. |
| Stöðvar | Breytt heiti senda aðeins heiti í fyrirliggjandi staðarval, ekki eldri hnit; eldri ráðlagður brottfarartími er óvirkur til yfirferðar. |
| Árekstrar | Breyting eftir forskoðun, breyting kostnaðar á meðan yfirfarið er, rangur ferðaaðgangur og útgáfuárekstur við uppfærslu stöðva vistun. |
| Endurtilraun | Skjalavistunarvilla eftir vistaða bókun heldur sama ID; endurtilraun uppfærir sömu færslu og bætir einu skjali við án tvöfaldrar ferðar/kostnaðar. |
| Venjuleg breyting | Eldri óinnflutt bókun heldur fyrri update-fyrirspurn og venjulegu kostnaðarflæði. |
| Fyrri flæði | Fyrri prófanir á tvískráningu, veski, til baka, ferðasvæði/kortahnöppum, dagsetningum, stöðvum, myndlestri, flugmiðum, flugvallarheitum og viðvörunum standast. |

JavaScript-setningafræði yfirfarin. Statísk formauðkenni óbreytt og nýir hnappar aðskildir frá föstum hnöppum. Aðrar 14 vefskrár eru óbreyttar bæti fyrir bæti. Nýr gagnagrunnsvörður notar sömu trip_items uppfærslu með viðbótarskilyrðum; engar schema- eða aðgangsreglubreytingar.

## Takmörk

Prófanir nota hermt DOM og gagnagrunn, ásamt stubbun ótengdra formhluta, korta og kostnaðargengissóknar. Raunvafra-/iPhone-/iPad-prófun og innskráð endaprófun með lifandi gagnagrunni eru ólokin. Engum lifandi gögnum breytt við vinnuna. Vistun bókunar, kostnaðar og skjals er áfram í aðskildum skrefum; villuboð og endurtilraun sinna hlutvistun. Útgáfuvernd notar updated_at þar sem gildið er tiltækt; engin ný heildarvörn fyrir samhliða breytingum á öllum töflum er fullyrt.
