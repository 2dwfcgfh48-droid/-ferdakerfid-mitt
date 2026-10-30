# Útgáfa 95 — samþykkt yfirferð Í dag, 30-10-2026

Grunnur 94 er varðveittur óbreyttur. Samþykki: notandi samþykkti fimm úrbótahópa úr yfirferð beggja Í dag-glugga með „Já sammála“. Sérstaklega var áður ákveðið að gulur rammi yrði utan um allt spjaldið til athygli. Reglur og verkefnalisti voru lesin áður en breytingavinna hófst.

## Útfært
- Báðir Í dag-gluggar nota sama renderTodaySurface. Sama núverandi dagspjald, viðvaranir, staður/fáni, klukka, veður, miðar, myndaaðgerðir og dagskrá. Gisting í ferðadagskeðju er ekki einnig birt sem sjálfstæð bókun. Önnur og liðin atriði haldast aðgengileg.
- Guli ytri ramminn er endurheimtur fyrir allar virkar dagsviðvaranir. Þetta fellir úr gildi undanþágu 94 hvað ytri rammann varðar. Óbókuð gisting litar enn ekki rétta leiðsögn/aðalspjald af bókunarstöðunni einni. Viðvörun efst nefnir vandamálið og viðeigandi aðgerð. Staðfestur árekstur fær sterkari texta og áherslu; engum viðvörunarreiknireglum eða talningu breytt.
- Liðin brottför án ákvarðanlegrar komu leiðir ekki í Næsta skrefi til fullyrðingar um að komið sé. Bókunarheiti, brottför og skýring um það sem vantar sjást; yfirfara má komu og undirbúa leið að gistingu. Óviss koma á hafinni ferð er ekki falin fyrir síðari brottför. Skráður komutími er áætlun, ekki raunstaðfesting.
- Næsta aðgerð fyrir ofan mynd. Frá/Til-línur sýna leið og valið upphaf. Endurtekinn Frá-texti við leiðsagnarhnapp er falinn innan þeirrar nýju framsetningar; slóð og val eru óbreytt. Tímaheiti greina útritunarfrest, komutíma og óstillta áætlun að stöð.
- Dagsetning í klukku er sleppt ef hún er þegar sama dagsetning og í haus. Hún helst ef staðardagur er annar. dd-mm-yyyy/umbrotsvörn og samþykkt stutta dagahnappasnið haldast.

## Sannprófun
34 Chromium-vafraflæðisprófanir stóðust með prufugögnum og óvirkum netþjónustum. Meðal annars: eins núverandi dagspjald í báðum gluggum; skilyrði gula rammans; gisting/raunveruleg lestarviðvörun; samþykki/aflétting og afturköllun; óskráður komutími, framtíðarbrottför, komuáætlun fyrir/eftir núverandi tíma; óviss ferð ekki falin fyrir seinni brottför; engin endurtekin gistibókun; liðin og opin dagskrá varðveitt; réttar opnunaraðgerðir beggja glugga; engin breyting á gagnahlutum við birtingu; dagaskipti/klukka; samræmdar dagsetningar/dagahnappar; leiðsagnarslóðir; lokatímar og bílaleiga; PDF-forskoðun og lesafrit.

64 samsetningar spássíuprófs notuðu raunveruleg normalizeSettings/applySettings: 320, 393, 430, 768px; cockpit/light; small/large; compact/comfortable. Sérstök myndaprófun notaði óbreytta destination-photos.js með staðbundinni prufumynd og veðurhermi: myndavalmynd í hvorum glugga opnaðist/lokaðist, mynd og veður birtust, aðgerð var á undan mynd og ekkert lárétt síðuyfirflæði í fjórum breiddum. Skjámyndir beggja glugga myndaðar og dagatalsglugginn sjónskoðaður.

## Varðveisla og takmörk
Eina breytta vefskráin er index.html. Stuðningsskrár (JS/CSS/JSON/offline) eru stafrétt óbreyttar frá 94. Samanburður á top-level fallatexta sýndi 10 breytt fyrirliggjandi föll og þrjú ný, engin horfin. Óbreytt meðal annars: vistun bókana/kostnaðar, viðvörunargjafar, árekstrareikningar, leiðsagnar-URL og renderTimeline. Ekki var heilt gamalt prófasafn endurkeyrt eða allar eldri samþykktir fullstaðfestar.

Raunverulegur iPhone/Safari, lifandi innskráning/skrif, Google Maps-app, lifandi myndaleit og veðursókn eru óprófuð. Fyrirliggjandi V01 (00:00 í ferðaleið), V02 (CSV) og V03 (gamall útgáfutexti í bókunarglugga) eru áfram óbreytt; þau eru ekki leyst með þessari afmörkuðu Í dag-breytingu.

## Upphleðsla
ZIP inniheldur allar fyrirliggjandi vefskrár, uppfærða verkefnisskrá, gildandi ákvarðanir, verkefnalista og þessa skýrslu. Eina breytta vefskráin frá 92/93/94 er index.html. Ef þær stuðningsskrár eru þegar uppsettar nægir að skipta henni út; annars má hlaða öllum vefskránum inn. Engin eyðing eða endurskráning ferðagagna.
