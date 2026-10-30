# Útgáfa 93 — afmörkuð útlitsviðgerð á Í dag, 30-10-2026

Grunnur: útgáfa 92, varðveitt óbreytt. Lesin voru gildandi ákvarðanir og verkefnalisti. Umfang: innri spássíur og umbrot Í dag í dagatali. Engin ný hönnun eða breyting á reglum viðvarana.

## Staðfest orsök og breyting
Í 92 hafði #todayNext 0px innri spássíur, en .spotlight-current í flýtispjaldinu 17px. Næsta-skrefs-spjald og gistingarviðvörun lágu bæði alveg við vinstri og hægri brún ytri viðvörunarrammans. Síðari tímalínuspjöld lágu við hægri brúnina. Þetta var endurgert í vafra með Prag → Trieste prufuferð og raunverulegri applySettings stillingaleið appsins.

Ein CSS-regla bætir 17px spássíum, min-width:0 og 14px efri spássíu við #todayNext þegar það er ekki tómt. Innri spássíur samsvara fyrirliggjandi flýtispjaldi. Allur JavaScript-kóði index.html og allar stuðningsskrár eru stafrétt óbreytt frá 92. Samanburður var keyrður með því að fjarlægja viðbótina og staðfesta að skráin verði nákvæmlega eins og grunnurinn.

Skoðuð voru einnig viðeigandi HTML/CSS-umbúðir útgáfa 50, 60, 75, 85, 90 og 91. Þær staðfesta ekki nákvæmlega hvenær ásættanlegt útlit notandans breyttist. Ekki er því fullyrt að þetta endurheimti allt eldra útlitið eða leysi öll atriði myndanna. Almenn heildarviðvörun og dagssamantekt eru varðveitt; ekki var heimild til að eyða viðvörunum annarra daga.

## Raunveruleg sannprófun
20 vafraflæðisprófanir stóðust í Chromium með prufugögnum og óvirkum netþjónustum. Þar af var ný mæling á spássíum/afmörkun spjalda í 64 samsetningum: 320, 393, 430 og 768px, cockpit/light, small/large og compact/comfortable. Allar notuðu normalizeSettings og applySettings úr appinu. Innri spjöld haldast innan ytri ramma og engin lárétt síðuyfirflæði mældust.

Endurkeyrð flæði: sami gistingarviðvörunartexti/talning í báðum Í dag; tengdar gular merkingar; samþykkt og afturköllun undantekningar; staðarklukka og mínútuuppfærsla; heilar dagsetningar og stutt ár dagahnappa; Google Maps upphafsstaður/ferðamáti; opnun gistiflokks; óbreyttir bílaleiguatburðir og lokatímar; PDF-forskoðun og lesafrit með hermdum gögnum. Útlit skjámyndar dagatals-Í dag var skoðað.

Þetta eru ekki raunprófanir á iPhone/Safari. Lifandi innskráning, gagnagrunnsskrif og Google Maps-appið voru ekki prófuð. Ekki voru allar eldri prófanir endurkeyrðar. Ekki er fullyrt að allar eldri samþykktir séu fullsannreyndar. Þekkt V01 (00:00), V02 (CSV) og V03 (gamalt sýnilegt útgáfunúmer) eru óbreytt.

## Upphleðsla
ZIP inniheldur allar vefskrár úr 92, uppfærða verkefnisskrá, gildandi reglur/verkefnalista og þetta skjal. Eina breytta vefskráin er index.html; ef 92 er þegar öll uppsett nægir að skipta út henni. Annars má hlaða öllum vefskránum inn eins og áður. Engin eyðing eða endurskráning ferðagagna.
