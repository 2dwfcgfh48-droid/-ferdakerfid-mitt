# Prófun 110 — 01-11-2026

Grunnur: varðveitt útgáfa 109. Afmörkun: gisting fyrir brottför samkvæmt G04–G06/G19.

196 Chromium 153.0.8010.0-vafrapróf staðin í þessari lotu. 104 almenn, 24 varðveislupróf, 19 hringferðarpróf, 26 komupróf og 23 ný brottfararpróf. 38 kóða-/málskipunar-/lesafritsathuganir staðnar. Nýja safnið sýnir 14 frávik í 109; ekki 14 sjálfstæðir gallar.

Nýju prófin nota gistingu í Trieste og við Garda, þar sem almenn bókunartenging er Garda en brottfararstöð Trieste Centrale. Rétt hótel er gjaldgengt við brottför, líka á útritunardegi. Klukka fyrir/eftir ferð breytir ekki valinu. Rangt eldra hótelval helst í gögnum og fær yfirferð; val réttrar gistingar, leiðsagnartengill, vistun og enduropnun sama auðkennis prófuð í fjórum flokkum. Heimleið, eftir-komu-leiðsögn, handvalinn punktur, afbókuð og óvalin gisting einnig prófuð. Óvistað Frá-val prófað í þremur sameiginlegum flokkum með raunverulegum change-atburði. Gistihnappur og staðaval uppfæra sama leiðsagnarupphaf.

Vistun notar saveItem með hermdri gagnageymslu. Nýju prófin einangra ytri þjónustur og kostnaðar-/skjalaskrif; eldri prófin prófa þau samkvæmt sínu fyrra umfangi. Engin raunveruleg notandagögn lesin/skrifuð. iPhone/Safari og Maps-app eru óprófuð.

Sex tengd föll breytast í index.html: layoutTransportOrigins, updateDeparturePlanForm, setDeparturePlace, navigationFormItem, paintNavigationOriginChoice og restoreNavigationForm. Önnur top-level föll, HTML/CSS og önnur inline-script eru bætisjöfn. Hjálparskrá breytir aðeins eventStop/eligibleHotels; sw.js breytir aðeins cache-nafni. Önnur 13 keyrsluskjöl bætisjöfn. Engin breyting á bakenda eða endurskrifun vistaðra bókana við opnun.

Fyrra komuprófið bar rangt brottfararhótel við 108 til að sannreyna varðveislu. Sú eina vænting er nú uppfærð í rétt Trieste-hótel; rest óbreytt. Upprunalega prófið er varðveitt í 109. Níu gömul hermisöfn úr 108 eru enn óafgreidd og ekki talin staðin. Þetta er ekki heildarábyrgð á kerfinu.

Sjónskoðun á 393px og breiddarpróf 320/393/430/768px. Skjámyndir eru eingöngu innri prófunargögn og fylgja ekki afhendingu. Prufuskriftir og niðurstöður undir profanir/110/.
