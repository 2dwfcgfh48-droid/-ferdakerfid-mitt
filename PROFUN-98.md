# Útgáfa 98 — samtengdir brottfarardagar

Grunnur: varðveitt útgáfa 97. Samþykkt F14/F15.

Aðeins index.html breytist af keyrsluskrám. Ný syncJourneyDates og tenging við innslátt, hreinsun/Afturkalla og vistun. Dagabil velur engan brottfarardag; handvalinn nákvæmur dagur samræmir áætlun. Engar sjálfvirkar klukkur eða breyting á bókunarstöðu. Opnun eldri færslna skrifar ekkert. Gistinætur, komu- og heimferðardagar, flug og kostnaðarskráning fá ekki þessa samtengingu. Akstur fær heitið Sótt – klukkan í báðum leggjum.

## Sannprófun

46 Chromium 153 vafraprófanir standast með prufugögnum. Fyrri 37 endurkeyrðar fyrir báðar Í dag-birtingar, viðvaranir, leiðsögn, dagsetningasnið, kostnaðarfærslur allra 16 flokka, PDF/lesafrit og fyrri afmarkaðar varðveislukröfur. Níu ný söfn prófa flokkana þrjá, innslátt báðum megin, dagabil, nákvæman dag, hreinsun/Afturkalla, sjálfstæða tíma/komu/heimferð/stöðu og flugundanþágu. Vistun sama auðkennis, enduropnun, heiti-eitt, stakur dagur án tíma, dagabil án brottfarar og höfnun ógilds bils fyrir skrif prófuð. Röðun sýnir nýja daginn.

Vistunarpróf keyra saveItem með hermdum trip_items skrifum; kostnaðarvistun/skjalatenging óvirk í þeim flæðisprófum. Engin lifandi notandagögn snert. Staðfest að fyrirliggjandi prufukostnaður og skjöl haldast í minni; það staðfestir ekki lifandi gagnagrunnsvistun eða skjalaupphleðslu.

Breiddir 320/393/430/768px. Fyrri varðveislupróf prófa ljós/dökk þemu og textastærðir; nýtt Akstursform prófað í þessum breiddum og sjónskoðað við 393px. Engar ómeðhöndlaðar JavaScript-villur í prófun. Málskipan moduleskriptu staðfest með node --check. Prófasafn fylgir í profanir/browser-98.cjs. Keyrsla úr afhendingarmöppu: TEST_VERSION=. node profanir/browser-98.cjs; krefst Playwright og Chromium á slóðinni sem tilgreind er í skránni.

## Takmörk

Raunverulegur iPhone/Safari, lifandi innskráning/vistun, korta-/netþjónustur og allar eldri gagnasamsetningar óprófuð. V01–V04 standa áfram; þetta er ekki heildarprófun alls kerfisins. Engar nýjar notandastaðfestingar skráðar.

Ef 97 er uppsett nægir index.html úr ZIP. Stuðningsskrár eru bætisjafnar við 97. Reglur og verkefnalisti uppfærð án þess að fella niður fyrri staðfestingar.
