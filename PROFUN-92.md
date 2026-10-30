# Útgáfa 92 — stöðuyfirferð og lagfæringar, 30-10-2026

Útgáfa 91 er grunnurinn og er varðveitt óbreytt. Engin ný hönnun eða afturköllun síðari samþykktra eiginleika.

## Það sem var lagað

| Atriði | Orsök / breyting | Staðfesting í þessari umferð |
|---|---|---|
| Ósamræmi gulra viðvarana í tveimur Í dag-yfirlitum | Gistingarviðvörunin var sértilvik aðeins í flýtispjaldinu. Sama fyrirliggjandi skilyrði fyrir kvöld dagsins er nú tengt sameiginlegri viðvörunarleið. | Sama viðvörun og talning í báðum birtingum. Gular merkingar á tengdu gistispjaldi, komu/innritun, dagatalsspjaldi, kortalista og áfangastað í ferðaleið. |
| Samþykktar undantekningar | Sameiginlega leiðin gildir líka um þessa gistingarviðvörun. | Samþykki hreinsar tengdar merkingar í báðum yfirlitum; afturköllun endurheimtir þær. Fyrri undantekningar halda sömu vistunar- og fingrafarareglu. |
| Dagsetningar brotna milli lína | Óvarinn dagsetningartexti var í ferðaleið og ýmsum öðrum birtingum þótt sameiginlegur stíll væri til. | Heilar dd-mm-yyyy dagsetningar í appi, lesafriti og PDF. Engin breyting á textagildi, ISO-gagnavistun eða innsláttarreitum. |
| Stutt dagsetning á dagahnöppum | Fyrra svar túlkaði samþykkta undanþágu rangt. | Sniðið 15-10-’26 og núverandi breidd dagahnappa eru varðveitt. |
| Klukkan í Í dag | Sömu fyrirliggjandi staðarklukkubirtingu bætt í báðar birtingar samkvæmt áréttun notanda. | Skráð tímabelti áfangastaðar; prófað með síma á íslensku tímabelti og stað í Trieste. Klukkan uppfærist á báðum stöðum eftir mínútu. Óskráður tími er ekki búinn til. |
| „Frá: Skráð upphaf leiðar“ í ferðadegi | Nákvæmur punktur var þegar í slóðinni en almennt heiti birt í textanum. | Raunverulegt heiti hótels/stöðvar birt. Google Maps-slóðin, upphafspunkturinn og vistaður ferðamáti varðveitt. |

Viðvörun um óbókaða gistingu er ekki ný regla um að öll opin atriði séu röng: þetta er sama skilyrði og fyrirliggjandi gistingarviðvörunin notaði fyrir kvöld dagsins. Framtíðargisting fær hana ekki sjálfkrafa, síðasti ferðadagur er undanþeginn eins og áður og bókuð/afgreidd virk gisting hreinsar hana. Fyrirliggjandi reglur um skörun og staðfestingu fyrir vistun eru óbreyttar.

## Samanburður við eldri kóða

39 varðveitt útgáfuafrit, 50–86 og 90–91, voru borin saman á skrá yfir föll. Öll 822 eldri heiti falla eru enn til staðar í 91; engin voru horfin að nafni. Þetta er ekki sönnun á óbreyttri hegðun. Viðvörunar-, dagsetninga-, staðarklukku- og Í dag-birtingar voru skoðaðar sérstaklega í þessari sögu.

Í 92 eru tíu fyrirliggjandi föll breytt og fjögur lítil birtingar-/samhæfingarföll bætt við. Öll 812 önnur fyrirliggjandi föll eru stafrétt óbreytt frá 91. Vistun bókana, kostnaðarútreikningar, leiguatburðir, skörunarútreikningar og leiðsagnarval eru þar á meðal óbreytt.

Breyttar keyrsluskrár: index.html, offline.js og offline.html (dagsetningavörn), sw.js (nýtt heiti skyndiminnis svo lesafrit fái uppfærslu). Verkefnisskrá og þetta prófunarskjal uppfærð. Allar aðrar stuðningsskrár eru stafrétt óbreyttar. Engin gagnamigrering.

## Prófanir sem voru raunverulega keyrðar

- 19 vafraflæðisprófanir í Chromium 153 með raunverulegum HTML/CSS og meginskrift forritsins, prufugögnum og netþjónustum óvirkum. Meðal annars bæði Í dag-yfirlit, dagatal, ferðaleið, kortalisti, undantekningar, opnun gistiflokks úr báðum yfirferðarhnöppum, Google Maps-slóðir, mínútuuppfærsla klukkunnar, óbreyttir lokatímar afþreyingar, sækja/skila bíl og sjálfstæðir leiðsagnarmátar.
- Breiddir 320, 393, 430 og 768 pixlar; dökk og ljós litastilling. Athugað að dagsetningar verði ein órofin eining og að gular merkingar haldist. Skjámyndir skoðaðar í vinnslunni.
- Lesafritið opnað í vafra með hermdum sóttum gögnum: heil dagsetningabirting og óbreytt ISO-gildi. Raunveruleg IndexedDB-sókn í síma er ekki prófuð.
- Raunveruleg PDF-forskoðun opnuð í vafra: fjögurra stafa ár, heilar dagsetningar og rétt snið í útbúið-stimpli.
- Dagsetningavörnin prófuð við nýjan og breyttan texta, endurkeyrslu og hnappasmell. Engin breyting á input-gildum, valmöguleikum eða upprunalegum skjölum í pre-reitum.
- 18 afmarkaðar viðvörunar- og varðveisluprófanir standast.
- 13 heil eldri prófunarsöfn, samtals 192 prófanir, standast.
- Sjö önnur eldri prófunarsöfn stöðvast á nákvæmlega sama stað og í grunnútgáfu 91, með sama fjölda liðinna prófana. Þau eru EKKI talin standast: activity-times, map-card-times, open-plan, presave-overlap, small-tickets, stops og ticket-labels. Þar eru meðal annars gamlar hermiuppsetningar sem vantar rental/navigation/lodging-föll og væntingar um eldri útgáfu stuðningsskráa. Engin ný mismunun kom fram milli 91 og 92 í þessum söfnum.
- JavaScript-málskipun meginforrits, lesafrits og þjónustuskriftar sannreynd.

## Það sem er enn óstaðfest

Raunverulegur iPhone/iPad og Safari, lifandi innskráning og skrif í gagnagrunn, raunopnun Google Maps-appsins og ný sótt ferð eftir uppfærslu í tækinu. Breytt leiðsagnarslóð er prófuð sem slóð; það jafngildir ekki prófun á Google Maps-appinu.

Ekki er fullyrt að allar fyrri samþykktir í öllum eldri samtölum séu fullsannreyndar. Kóðasaga og fyrirliggjandi skjöl geta ekki ein og sér staðfest alla slíka hegðun. Óstaðfest atriði eru áfram óstaðfest; ekki þarf að endurskilgreina samþykktir til að þær eigi að halda.

Afhending: 21 skrá í ZIP, sama uppsetning og áður. Skipta út öllum skránum. Engin eyðing ferðagagna eða endurskráning bókana nauðsynleg.
