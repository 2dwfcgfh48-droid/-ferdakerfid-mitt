# Útgáfa 105 — afmörkuð viðgerð á sjálfvirkum leiðargildum

Grunnur: varðveitt 104. Samþykki: F22/F23, fyrri F14/F16 og A01–A14.

134 Chromium 153.0.8010.0-vafrapróf með prufugögnum standast í þessari lotu: 104 fyrri próf og 30 ný. Sjá `profanir/browser-105.cjs`, `profanir/test-105.log` og `profanir/browser-results-105.json`. Vistunarprófanir nota raunveruleg föll með hermdum gagnaskrifum. Engin skrif í notandagögn. Raunverulegur iPhone/Safari, lifandi innskráning/gagnaskrif og ytri netþjónustur óprófuð.

Endurgerð 104: eftir val á Til Trieste og síðan Til Garda verður staðaval garda, komustöð Trieste og fyrirsögn Koma til Garda. Sama einangraða vafraflæði á 105 gefur komustöð Garda. Nákvæm öll innsláttarskref notanda fyrir myndina eru óþekkt. Sjá `profanir/stale-city-105.cjs`.

Öll 16 keyrsluskráarheiti tekin í skráar-/bætisamanburð. Aðeins index.html breytist; 15 stuðningsskrár eru bætisjafnar. 9 fyrirliggjandi föll breytt og 2 hjálparföll bætt við; engin nafngreind föll fjarlægð. AST-samanburður afmarkar föll. Málskipan JS staðfest með Node; JSON stöðvaskrár lesanlegt. Engin bakendaskipulagsbreyting. Þetta er ekki handvirk heildarúttekt alls þriðja aðila kóða.

Yfirfarin tengsl: áætlunarval, flýtileiðir, opnun/hreinsun forms, stöðvarval, viðeigandi kortapunktar, dagsferðir/heimleið, vistun og endurlesning. Dagsetningatenging, vistunar-/kostnaðarkjarni, heimstöðvaendurnýting, viðvaranir og Í dag-/tímalínukjarni eru óbreytt föll. Sjá `profanir/comparison-105.json` og `profanir/index-104-105.diff`.

Ný próf: þrír flokkar × átta flæði = 24; bátahringferð = 1; varðveisla eldri vistaðs misræmis = 1; fjórar breiddir = 4. Nákvæmar stöðvar, handvaldir borgarpunktar og handskráður texti varðveitt. Engin næsta dvöl eða fleiri kostir leiða til óvalins Til. Dagsferðalest fylgt eftir með nýrri venjulegri ferð velur áfram rétta dvöl. Vista/enduropna varðveitir leið í sömu færslu. Prófað á 320/393/430/768px; 393px skjámynd sjónskoðuð.

Ólokið: raunprófun nýja leiðarflæðisins á iPhone/Safari; áður skráð V01–V04 halda stöðu. Gömul röng vistuð komustöð er ekki yfirskrifuð sjálfkrafa. Velja þarf rétta stöð í þeirri bókun.
