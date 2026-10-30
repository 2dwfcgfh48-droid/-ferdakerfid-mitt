# Útgáfa 94 — afmörkuð viðgerð, 30-10-2026

Grunnur er 93, varðveitt óbreytt. Fyrir breytingu voru gildandi ákvarðanir og verkefnalisti lesin. Nýjasta árétting notanda: „Það er eitt atriði en öll merkt með gulu.“

## Breytingar
Gistingarviðvörunin lodging-tonight er áfram eitt atriði. Hún hafði áður borist yfir á leiðsagnarskref, aðalspjald Næsta skrefs og ytri Í dag-ramma. Tvö lítil sameiginleg birtingarskilyrði útiloka nú ÞESSA viðvörun frá þeirri keðju. Bæði Í dag-yfirlit nota þau. Gistispjald, innritun og sérstök gistingaryfirferð halda gulu merkingunni; samsvarandi merking á gistingu í dagatali/korti/ferðaleið er ekki felld niður. Sama vandamál getur þannig sést við gistingu í fleiri en einni sýn en telst áfram einu sinni.

Raunverulegar viðvaranir við samgöngur og ónothæfar gististaðatengingar eru ekki hunsaðar. Talning, skilyrði vandamála, fingraför, samþykki og afturköllun eru óbreytt. Engar breytingar á bókunargögnum, tímum, kostnaði eða vistun.

Þrengslin á bókunarspjaldinu sem notandi sýndi voru einnig löguð: við <=600px eru tími og stöðumerki ofan við innihaldið í stað þess að þrengja það milli sín. Heiti, fáni/borg og leiðsögn fá fulla breidd. Aðeins booking-agenda-card spjöld í sambærilegum bókunarlistum eru innan þessa CSS-umfangs; önnur item-spjöld eru óbreytt.

## Sannprófun
22 vafraflæðisprófanir í Chromium stóðust með prufugögnum og óvirkum netþjónustum. Nýjar mælingar staðfestu í BÁÐUM Í dag-yfirlitum að við eitt lodging-tonight atriði er aðeins innritunarspjaldið gult í ferðadagskeðjunni, leiðsögn/aðalspjald/ytri rammi eru ómerktir og dagssamantekt telur eitt. Sérstök viðvörun á lest heldur áfram að merkja lestarflæðið. Staðfest að samþykki hreinsi gistingarmerkingu og afturköllun endurheimti hana.

Símabreiddir 320, 393, 430 og 600px voru mældar fyrir bókunarspjöld: innihald notar meira en 80% af heildarbreidd spjalds, er neðan tíma/stöðu og fer ekki út fyrir skjá. Fyrri 64 samsetningar spássíuprófs (320–768px, tvö þemu, tvær leturstærðir, tveir þéttleikar) voru endurkeyrðar. Leiðsagnarslóðir, klukka, dagsetningar, stutt dagahnappasnið, bílaleiga/lokatímar, PDF-forskoðun og lesafrit voru einnig endurprófuð. Skjámynd dagatals-Í dag var skoðuð.

Raunverulegur iPhone/Safari, Google Maps-appið og lifandi innskráning/skrif voru ekki prófuð. Ekki fullyrt að allt eldra útlit sé endurheimt. Útlitsmunur efst á Í dag-yfirlitunum (mynd/veður) var ekki endurhannaður í þessari lotu; nýjasta árétting afmarkar viðgerð við of víða gula merkingu. V01 (00:00), V02 (CSV) og V03 (gamall útgáfutexti) eru áfram óbreytt.

## Afhending
Eina breytta vefskráin frá 93 er index.html. Allar stuðningsskrár eru stafrétt óbreyttar. Viðeigandi verkefnisskjöl og þessi prófunarskýrsla fylgja. Útgáfur 92 og 93 varðveittar. Ef 92 eða 93 er uppsett nægir að skipta út index.html úr ZIP. Annars fylgja allar vefskrár með.
