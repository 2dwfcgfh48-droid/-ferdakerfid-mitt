# Prófun útgáfu 78 · 28-10-2026

Villan var tvínotkun id=newBookingImportBtn fyrir fastan innflutningshnapp veskis og kvikan aukahnapp samsvörunar. Þegar samsvörun birtist fékk fasti hnappurinn rangt hlutverk og gat opnað fyrri drög bak við veskið.

Aukahnappurinn notar nú continueNewBookingImportBtn. Kóðasamanburður við 77 staðfestir nákvæmlega tvær breyttar ID-tilvísanir og leiðrétt sýnilegt útgáfunúmer (78). Engar aðrar kóðabreytingar. Önnur 14 vefgögn eru óbreytt bæti fyrir bæti.

249 Node-prófanir standast: 240 fyrri og 9 nýjar samsettar prófanir.

| Ný prófun | Niðurstaða |
|---|---|
| Innflytja bókun í opnu veski | Skráar-/textaval opnast; veski lokast. |
| Lesa skjal og finna samsvörun | Fasti hnappurinn heldur upprunalegri bindingu. |
| Aukahnappur annarrar bókunar | Hefur eigið auðkenni og eigin bindingu. |
| Hætta við samsvörun | Veski opnast aftur á sama stað, engin drög opnast. |
| Innflytja aftur úr veski | Nýtt innflutningsval; engin gömul drög á bak við veskið. |
| Velja aðra bókun | Raunverulegt yfirferðarform opnast með samþykki óhökkuðu; hvorki veski né innflutningsgluggi liggja yfir því. |
| Hætta við yfirferð | Endurkoma í veskið og innflutningsstaða hreinsuð. |
| Innflytja eftir lokun yfirferðar | Ferskt innflutningsval opnast áfram. |
| Auðkenni | Fasti og kviki hnappurinn hafa hvor sitt einkvæma auðkenni. |

Prófið keyrir raunverulega fasta onclick-bindingu og raunveruleg innflutnings-/lokunarföll saman. Prófið fellur á 77 vegna yfirskrifaðrar bindingar og stenst á 78. Ótengdir formhlutar, gagnalestur og DOM eru hermd.

Fyrri próf á veskisflæði, einföldun, vistunarvillum, tvískráningu, ferðadögum, dagsetningum, myndlestri, stöðvum, flugvöllum og korti standast. JavaScript stenst setningafræðiprófun og föst HTML-auðkenni eru einstök.

## Takmörk

Engin raunvafra-/iPhone-/iPad-prófun eða innskráð heildarprófun með lifandi gagnagrunni. Engum lifandi gögnum breytt við vinnuna. Óbreyttur kóði jafngildir ekki nýrri heildarprófun allra ótengdra ferla.
