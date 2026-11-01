# Yfirferð kóða og varðveisla samþykkts flæðis — 108

Grunnur er síðasta afhending 107. Allar 16 keyrsluskrár eru teknar í skráa-, háða- og málskipanaryfirferð og bornar saman við eldri afrit. Handvirk hegðunaryfirferð beinist að bókunarkeðjunni og hringferð/dagsferð. Þetta er ekki fullyrðing um fullprófun allra samþykktra krafna í öllum tækjum.

## Endurheimt og viðgerð

| Staður | Staðfest frávik í 107 | Niðurstaða 108 |
|---|---|---|
| Enduropnun Frá-færslu | stop_id bættist sem Til þótt vistað plan hefði aðeins Frá | Fyrirliggjandi plan varðveitt |
| Eldri hringferð án plans | Upphafsstaður birtist sem Til | Upphafsstaður birtist sem Frá |
| Flýtileið | Áætlaðir dagar sáust ekki strax í nákvæmu dagapörunum | Bæði dagapör samræmd við opnun flýtileiðar |
| Nota daginn | Gistidagstillaga færðist ekki í efra Frá-par | Aðeins Frá/brottfararpar uppfært |
| Hringferð frá einni bryggju | Dvalarmörk gátu orðið ferðadagur og Til hangið með | Eigin dagar/tímar, aðeins upphafstenging |
| Skipti yfir í hringferð | Fyrri Til gat tengt bókun við aðra dvöl | Falinn Til er ekki notaður í hringferð |

Fyrirliggjandi hringferð báta sést í útgáfu 34 og afritum 41/43/44 með sama valinu „Útsýnisferð / hringferð — sama bryggja“. Hún er áfram sértæk við báta/ferjur. Fram og til baka heldur eigin leggjum í fjórum samgönguflokkum; Dagsferð frá bækistöð heldur sérmerkingu og bækistöð. Engin ný tegund hringleiðar var búin til í lestum, flugi eða akstri.

## Hvað var varðveitt

Frá-/Til-val við Bókað og dvalartímabil 107; millistaðaútfylling með síðasta degi brottfarardvalar og fyrsta degi komudvalar; sjálfstæð dagapör; handskráðir dagar og klukkur; nákvæmar stöðvar; miðar; kostnaður; gisting og leiðsögn; sama bókunarauðkenni; báðar Í dag-birtingar, viðvaranir, kort, PDF og lesafrit.

HTML-uppsetning, CSS og önnur inline-script index.html eru bætisjöfn við 107. Aðeins átta tengd föll breytast og eitt hjálparfall bætist við. Önnur top-level fyrirmæli eru óbreytt. Allar fimmtán aðrar keyrsluskrár eru bætisjafnar við 107 og 103. saveItem, saveExpenseForItem og birtingar-/kostnaðarkjarni eru óbreyttir. Engin skrif voru gerð í raunverulegar notandabókanir.

## Prófun og takmörk

- 104 fyrri Chromium-vafrapróf standast á endanlegum 108-kóða.
- 24 flæðispróf úr 107 standast; hringferð fær nú sérstaklega skráðan ferðadag í prófinu, því röng útfylling úr dvalarmörkum er fjarlægð.
- 19 ný varðveislu-/hringferðarpróf standast. Sama safn sýnir 17 frávik á 107-grunni og 2 staðin próf.
- 19 eldri Node-hermiprófasöfn voru keyrð á báðum grunnum: 10 söfn/165 prófanir standast. Níu söfn stöðvast með sama úttaki á báðum og eru ekki talin standast.
- Innan þessara níu vantar nýrri hjálparföll í fimm gömlu prófumhverfanna. Önnur hafa eldri væntingar um tímastuðning/cache eða frávik í hermdu vistunar-/árekstraflæði sem þarf að meta sérstaklega. Að sama villa sjáist í grunni sannar ekki að appið sé villulaust.
- Sjónrænt skoðað við 393px og læsileika-/sýnileikapróf við 320/393/430/768px. Chromium 138.0.7204.0 með prufugögnum og hermdum gagnaskrifum.
- Raunverulegur iPhone/Safari, innskráning, lifandi gagnaskrif og ytri þjónustur eru óprófuð. Ekki ný notandastaðfesting.

Nákvæm niðurstaða fylgir í profanir/. browser-audit og runtime-comparison sýna umfang; broad-suites sýnir líka söfnin sem stöðvast. Fyrri ólokin verk, meðal annars fastur gamall útgáfutexti og yfirferð eldri rangt vistaðra stöðva, eru áfram á verkefnalista.

Frá 107 þarf aðeins að skipta út index.html.
