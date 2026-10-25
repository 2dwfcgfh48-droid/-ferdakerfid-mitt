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

24-10-2026 — Eitt skrunsvæði fyrir bókunarglugga
Notandi staðfesti að fyrri snertilagfæring dugði ekki; Heildarverð opnaði gjaldmiðilsval. Fjarlægð fyrri tilraun með svh, transform og sérsnertifleti date/time. itemModal yfirlagið sér nú eitt um lóðrétt skrun; dialog er í venjulegu flæði án eigin skrunar, max-height eða transform. Allir innsláttar-/valreitir bókunar hafa minnst 16px letur. Þetta nær til verðs og gjaldmiðils jafnt sem dagsetninga. Aðrir gluggar óbreyttir.
Prófun: níu Node-prófasöfn og málskipun innfelldra skrifta standast. Raunverulegt Safari snertifrávik hefur ekki verið endurgert hér og þarf staðfestingu í síma eftir uppfærslu.

24-10-2026 — Opnun efst og stöðugur uppruni snertiflata
Fundinn installModalPageScrollGuard sem festi body, færði það um neikvæða scrollY og kallaði window.scrollTo(0,0) við opnun á iOS. Því skipt út fyrir overflow-læsingu á bakgrunni án tilfærslu uppruna eða skrunkalls við opnun. Scrollstaða endurheimt aðeins ef hún breyttist við lokun síðasta glugga; upprunaleg inline overflow gildi varðveitt. Þetta er líkleg orsök, ekki staðfest endurgerð af Safari villunni.
Nýjar openModal opnanir núllstilla bæði overlay og dialog scrollTop/scrollLeft; opinn gluggi sem endurtekið er vísað í heldur stöðu. Til baka í bókun úr ferðaveski varðveitir raunverulegt overlay skrun eftir breytingu á skrunsvæði, og ferðaveskislisti heldur stöðu úr skjalaviðbót. Kortundirgluggi lætur opinn bókunarglugga óhreyfðan. showScreen fer efst með instant skrun; Fara í dag og aðrar markvissar flýtileiðir óbreyttar.
Prófun: tíu Node-prófasöfn standast. Ný modal-scroll keyrir raunveruleg openModal/returnToBooking/scroll guard föll með hermdu DOM og prófar nýja opnun, enduropnun, undirglugga, uppruna og endurheimt stíla. Málskipun allra innfelldra skrifta standast. Reynt að undirbúa Playwright WebKit en vafrakeyrsla ekki möguleg vegna vantar kerfissafna/uppsetningarheimilda. Raunprófun í iPhone er eftir.

24-10-2026 — Örugg lokun og WebKit raunprófun (útgáfa 26)
Verðreitur enn sagður ónothæfur í iPhone. Engin ný tilgátubreyting á snertiflötum gerð. Nú tókst að keyra WebKit 26.5/Playwright með kerfissöfnum sóttum og afpökkuðum í QA-möppu án kerfisuppsetningar. Prófun á raunverulegu HTML/CSS og allri meginskrift með raunverulegri bindUI/openNewItem keyrslu, en gerviferð og Supabase/kort óvirkt: símaútlit 393x852, snerting eftir skrun á dagsetningu, inn-/útritunarklukkum, komutíma, verði og bókunarnúmeri; réttur reitur fær fókus og verð tekur við 150. Þetta endurgerir EKKI iOS-villuna og er ekki staðfesting á viðgerð hennar.
Bætt við vörn fyrir óvistaðar breytingar í bókun: Hætta við/backdrop krefst staðfestingar áður en breytt bókun lokast. Hætta við í staðfestingu heldur innslætti. Vistað keepOpen endurnýjar samanburðargrunn. Undirgluggar varðveita gögn og skrun áfram. Sýnilegt útgáfunúmer 24-10-2026 · 26 efst í bókunarglugga hjálpar að staðfesta rétta uppfærslu.
Prófun: tíu Node-söfn standast og málskipun innfelldra skrifta. WebKit full-form prófun staðfesti einnig verðinnslátt, ferð í miðaval og til baka með sömu upphæð/scrollstöðu, afturkallaða lokun, staðfesta lokun og nýja opnun efst. Raunprófun í iPhone enn eftir; engin lifandi notandagögn eða gagnagrunnur notaður í vafraprófi.

24-10-2026 — Sameina áfangastaðatengingu opinna samgangna (útgáfa 27)
Áfangastaðareitur falinn fyrir opnar lestar-/ferju-/akstursferðir og bókaðar færslur með völdum Frá/Til áfangastöðum. Til ræður stop_id tengingu, annars Frá. Eldri almenn tenging varðveitt ef ekkert leiðarval til staðar. Gisting, afþreying og aðrir flokkar halda almennu áfangastaðavali. Við breytingu í Bókað fyllast aðeins auðir útleiðarreitir úr leiðarvalinu; nákvæm stöðvarheiti og tímasetningar ekki yfirskrifuð. Óvistuð leiðaráætlun varðveitt við fyrstu vistun þótt staða hafi verið breytt í Bókað.
Prófun: ellefu Node-prófasöfn og málskipun innfelldra skrifta standast. Ný journey-association prófun nær yfir val, bókunarstöðuskipti, varðveislu leiðaráætlunar, handskráð stöðvarheiti og eldri tengingar. WebKit-prófunarhandrit uppfært en ekki keyrt í þessari umferð því fyrri vafrauppsetning hefur horfið úr keyrsluumhverfinu. Notandi staðfesti hnappar virka í útgáfu 26; engar breytingar á snertingu eða skruni í 27.

24-10-2026 — Skýrari listi vistaðra staða (útgáfa 28)
Heiti staðar sér í feitu letri, síðan stutt nákvæmnisskýring og smærra samhengi með dagsetningu/tíma ef skráð. Enginn langur texti um óskráða klukku. Vistaðir nákvæmir punktar raðast á undan nafnaleit og borgarpunktum; flokksforgangur aðeins innan sama nákvæmnishóps. Titill fyrir leiðarreiti lestar er Velja lestarstöð. Upplýsingar áfram afmarkaðar við núverandi ferð.
Leiðrétt varðveisla nákvæmni: endurnotkun borgarpunkts af gerð Borg/bær getur ekki lengur orðið Nákvæmur kortapunktur vegna textaprófs sem þekkti aðeins orðið áfangastaðar. Upprunalegt precision gildi varðveitt við endurnotkun. Engin gagnagrunnsbreyting eða breyting á sjálfri leiðinni.
Prófun: tólf Node-söfn og málskipun innfelldra skrifta standast; ný saved-places prófun nær yfir flokkun, merkingar, dagsetningu, valhnapp, textaöryggi og varðveislu precision. Útlitsprófun í síma eftir.

24-10-2026 — Heildstætt stöðvaval samgangna (útgáfa 29)
Leiðrétt rangt borgarsamhengi: ný transportEndpointContext notar hvorn leiðarenda sérstaklega úr Frá/Til áætlun, vistaðri source_stop_id eða ótvíræðri heitapörun. Generic itemStop og hótel á komustað geta ekki ráðið leit að brottfararstöð. Útleið og heimleið nota sína enda og komu/brottfarardag. Kort notar borg þess enda á undan punkti hins enda.
Valdar borgir fylla auða leiðarreiti líka fyrir opnar ferðir. Reitir lestar heita Brottfararstöð/Komustöð; kortahnappur Velja lestarstöð. Finna borg/bæ falinn þegar borg er þegar valin. Leit fyrir almennt borgarheiti undirbýr railway station í réttri borg (ferry terminal fyrir ferju); valið nákvæmt stöðvarheiti varðveitt. Engin stöð staðfest sjálfkrafa og enginn tími áætlaður.
Tvítekinn almennur bookingLocationField falinn fyrir lest/ferju/akstur; val úr routeOut Origin uppfærir sama booking place og brottfararáætlun. Eldri nákvæmur mætingarpunktur nýttur í leiðaruppruna þegar enginn nákvæmur leiðaruppruni er til. Aðrir bókunarflokkar halda staðsetningarreit.
Prófun: þrettán Node-söfn og málskipun innfelldra skrifta standast. Ný transport-endpoints prófun nær yfir Kaupmannahöfn frá/Hamborg til þrátt fyrir itemStop Hamborg, réttar dagsetningar, heimleið, að leit noti ekki hótel/titil, varðveislu stöðvarheitis og óþekkta borg án ágiskunar. saved-places prófun staðfestir að valin brottfararstöð uppfæri sameiginlegan mætingarpunkt. Raunprófun í síma á nýju flæði er eftir.

24-10-2026 — Ein bókunarstaða og réttur brottfararstaðartími (útgáfa 30)
Eina sýnilega bókunarstöðuv​​alið er nú Staða bókunar efst. Kostnaðarstaða verður sjálfkrafa booked fyrir booked/done, annars estimated; kostnaðarval í itemModal falið og lesanleg skýring sýnir tenginguna. Greiðslustaða áfram sérstök og Bókað merkir ekki Greitt. Bein notandabreyting í greiðslu að hluta/fullu merkir opna/hugmyndabókun Bókað með sýnilegum skilaboðum. Vistunarvörn bannar opna bókun með skráðri greiðslu.
Eldra misræmi (opin bókun með bókuðum kostnaði/greiðslu) birtir skýringu og Merkja bókun sem bókaða. Engin sjálfvirk breyting á vistuðum gömlum bókunum við opnun. Almenn quick-cost form með form override halda eigin kostnaðarstöðu og reiknivél/þjórfé/uppgjör óbreytt.
Í dag velur brottfararborg og tímabelti úr uppruna leiðarinnar/route_plan fremur en komuborg eða gistingardegi; heimleið snýr uppruna við. Óþekktur uppruni birtir Staðartími bókunar í stað rangrar borgar. Sama tímabeltisforgangi bætt í næsta atriði neðri Í dag sýnar.
Prófun: fjórtán Node-söfn og málskipun innfelldra skrifta standast. Ný booking-status prófun sannreynir eina stöðu, eldri misræmisábendingu án sjálfvirkrar gagnabreytingar, greiðsluviðbragð, að Bókað setji ekki Greitt, done/maybe og vistunarvörn. Today próf staðfestir Kaupmannahöfn frá/Hamborg til og heimleið. Raunprófun í síma eftir.

24-10-2026 — Sýnileg leið á Í dag spjaldi (útgáfa 31)
Samgöngur í aðal- og minni Í dag spjöldum sýna skráða Frá → Til leið undir heiti. Skráð leiðar-/stöðvarheiti hafa forgang; áfangastaðir route_plan eru varagildi. Heimleið snýr valinu við. Ef aðeins annar endi er þekktur er Frá: eða Til: sýnt, án ágiskunar. Almenn lestartitil eins og Lest fær → komuborg; sértæk notandaheiti haldast. Ör notuð í fyrirsögn í stað þess að giska á eignarfallsbeygingu borgarheita. Tímar og staðartímamerking óbreytt.
Prófun: today-spotlight prófar leiðina fyrir København H/Hamburg Hbf, áfangastað í titli, heimleið, sértitil, hálfskráða leið og escaping. Prófið og málskipun innfelldra skrifta standast. Sjónræn yfirferð í síma eftir.

25-10-2026 — Stöðvalisti áður en slegið er inn (útgáfa 32)
Velja lestarstöð opnar nú listaval fyrir viðkomandi leiðarenda. Stöðvar úr staðbundinni Trainline EU stöðvaskrá síaðar innan 30 km af borgarpunkti og eftir landi; áfangastaður fyrirsagnar ræður ekki báðum endum. Allt að 8 næstu færslur fyrst, Sýna fleiri stöðvar upp í 24. Fyrri val og nákvæmir staðir úr núverandi ferð efst. Val opnar hreinni kortayfirferð með heiti/stað og staðfestingarhnappi; engin breyting á leiðinni fyrr en Nota þennan stað er valið. Finn ekki stöðina opnar fyrri leitar-/innlímingarvirkni; hægt að fara til baka í listann.
Nýlega valdar stöðvar geymdar í sama vafra með aðgreiningu eftir notanda og borg; völdum stöðvarhnitum, auðkenni og tímabelti fylgt í núverandi route_places vistun þegar bókun er vistuð. Þær stöðvar fylgja því bókuninni á öðrum tækjum en vafrasagan sjálf er staðbundin. Skráin er ekki tímatöflu-/lifandi brottfararþjónusta og velur ekki stöð sjálfvirkt.
Nýjar skrár sem þurfa að fylgja GitHub uppfærslu: railway-stations.js, railway-stations.json og railway-stations-LICENSE.txt. Catalogue: 19.605 færslur úr opinni Trainline EU stations.csv, síuð á suggestable, non-city, UIC og gild hnit, augljós bus/ZOB heiti tekin út og duplicate UIC sameinað. ODbL leyfi og heimild fylgja og birtast við listann. Ófullkomin borgarhnit eða skrá án viðkomandi stöðvar hefur handvirka leið áfram. Bilun í skrársókn varðveitir fyrri val og handvirka leit.
Prófun: fimmtán Node-prófasöfn standast ásamt málskipun. Ný railway-stations prófun notar raunverulega stöðvaskrá, Kaupmannahöfn/Hamborg/Róm, land-/fjarlægðarsíun, skyndiminni, notanda-/borgaraðgreiningu, hnappaval, stale svarvörn og bilun/offline fallback. WebKit 26.5 prófaði raunverulegt staðbundið UI í símastærð: réttir stöðvalistar, val breytir ekki reit fyrr en staðfest, réttur leiðarendi uppfærist, fyrri val efst, leit og Til baka og óbreyttur gagnstæður leiðarendi. Sjónræn yfirferð gerð í sand þema með stóru letri. Kortaflísar/kortaþjónusta og gagnagrunnur hermd/óvirk í því prófi; raunprófun á korti og iPhone er eftir.
