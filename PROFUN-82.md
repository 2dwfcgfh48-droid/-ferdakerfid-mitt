# Prófun útgáfu 82 · 29-10-2026

Samþykkt farþega-/ferðaleggsmerking fylgir skjali í núverandi veski. Engin sjálfvirk ágiskun um farþega eða legg. Allir samgönguflokkar: flug, lest, bátur/ferja og akstur.

312 kóðaprófanir standast: 281 fyrri sviðsmynd og 31 ný sviðsmynd.

| Nýtt svið | Staðfest í kóðaprófun |
|---|---|
| Röðun | Réttur leggur og öll bókunin fremst; einn sameiginlegur miði hefur einn hnapp. |
| Varðveisla birtingar | Ómerktar skrár sjást áfram; aðrir leggir og staðfestingar eru aðgengileg. Hvert skjal kemur einu sinni fyrir í flokkun viðkomandi skrefs. Engin merki gefa fyrri birtingu. |
| Samræmi | Fjórir samgönguflokkar nota sömu reglu. Hótel og aðrir flokkar halda fyrri birtingu. |
| Gögn | Merkingar í núverandi metadata; ógild framtíðargildi eru ómerkt við lestur. Óbreytt form varðveitir óþekkt metadata. Engin skrif í bókanir/kostnað vegna merkinga. |
| Form | Nýr miði, breyttur miði, enduropnun, hreinsun merkja, hætta við og skjal innan óvistaðrar bókunar. |
| Skrár/slóðir | Merkingar og sértæk metadata haldast við skráaskipti. Úrelt OCR/hash hreinsast aðeins þegar uppruni breytist. Óbreytt slóð heldur upprunagögnum. |
| Villur | Óheppnuð upphleðsla/vistun eyðir ekki fyrra skjali. Heppnuð DB-vistun með síðari UI-villu eyðir ekki nýju vísuðu skjali. Ferðaskipti í upphleðslu stöðva rangtengi. |
| Án nets | Merkingar lesast úr núverandi wallet-snapshot með sömu sameiginlegu flokkun. Ósótt skjal er áfram óvirkt og merkt. Eldri afrit halda öllum eldri skjalatenglum. |
| Vefgögn | Ný wallet-tickets.js kemur fyrir aðal-/offline-kóða í HTML og er í nýrri skyndiminnisskel. |

Fyrri prófanir á innflutningi, v81 uppfærslu opinna áætlana, tvískráningu, veskis-/til-baka-flæði, dagsetningum, kostnaðarleiðum, ferðadegi, stöðvum, flugvöllum og kortahnöppum standast áfram.

Samanburður staðfestir óbreytt saveItem, saveExpenseForItem, bókunarsamsvörun og v81 innflutningsuppfærslu, kortaafmörkun og dagatal. Ný aðalappsvinna er í skjalagluggum, skjalavistun og skjalabirtingu. Sótta lesafritið notar sömu merkingar; offline-store.js er óbreytt og afritsgagnasnið heldur version 1. Engin DB-skipunar- eða aðgangsreglubreyting.

Útgáfa 81 í workspace er óbreytt miðað við afhent ferdakerfid-81.zip. Ný afhending er sér pakki með 18 skrám. Allt JavaScript stenst syntax; fyrri föst HTML-auðkenni eru varðveitt og ný auðkenni einstök.

## Óstaðfest

Raunvafra-/iPhone-/iPad-útlit og snertiflæði, innskráð vistun í lifandi gagnagrunni og raunveruleg notkun nýju merkinganna í flugham. Prófin nota Node með hermdu DOM og geymslu. Engum lifandi gögnum breytt við vinnuna. Nýjar merkingar birtast í sóttu afriti eftir uppfærslu þess; eldra afrit heldur eldri gögnum.
