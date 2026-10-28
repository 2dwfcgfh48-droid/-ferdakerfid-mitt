# Prófun útgáfu 77 · 28-10-2026

Byggt á útgáfu 76. Breytingin afmarkast við einfaldað samsvörunarval og næsta skref fyrir heiti/tegund skjals.

240 Node-prófanir standast: 224 fyrri sviðsmyndir og 16 nýjar sviðsmyndir fyrir samþykkta einföldun. Eldri UI-próf hafa uppfærðar væntingar um nýja skrefaskiptingu; gagnavernd og vistunarpróf haldast.

| Svið | Staðfest í kóðaprófun |
|---|---|
| Sama skjal þegar til | Tveir aðalvalkostir: skoða skjalið eða opna bókun; engir heitis-/tegundarreitir. |
| Upphafsreitir | Skrá/texti og Búa til drög faldir í val- og tengiskrefum; birtast aftur við enduropnun. |
| Skoða skjal | Raunverulegur nýr smellihöndlari kallar á fyrirliggjandi skjal með réttu auðkenni. Innflutningsstaða helst. Skjalskoðari óbreyttur. |
| Opna bókun | Innflutningsdrög hreinsuð áður en bókun er opnuð; fyrra veskisflæði helst. |
| Nýtt skjal | Val bókunar sýnir heiti og tegund í næsta skrefi. Brottfararspjald fær viðeigandi forval ef textinn segir það skýrt. |
| Til baka | Fer í samsvörunarval og geymir heiti/tegund; engin vistun. Virkar ekki meðan vistun stendur yfir. |
| Önnur bókun | Látlaus aukahnappur fer áfram í sömu yfirferð bókunardraga. |
| Fleiri samsvaranir | Skjal sem er til fær skoðunarhnapp; aðrir bókunarkostir fá tengival. |
| Vistun og villur | Fyrri tvísmells-, tvískráningar-, endurtilraunar-, varðveislu- og ferðaskiptapróf standast. |
| Tengd flæði | Fyrri próf á veski, kortahnöppum, ferðasvæði, ferðadögum, stöðvum, dagsetningum, myndlestri, viðvörunum og flugvallarheitum standast. |

Samanburður við 76: aðeins innflutningsmarkup, afmarkaður stíll aukahnapps og innflutningsföll breyttust. Allir fyrri fastir formreitir eru til staðar, auðkenni eru einstök og JavaScript stenst setningafræðiprófun. Allar 14 aðrar vefskrár eru eins bæti fyrir bæti.

Kóði kostnaðarkerfis, korts, tímalínu, dagatals, almennrar skjalaskráningar, skjalskoðara og virkni án nets er óbreyttur. Samsvörun, lestur skjala, bókunarvistun og gagnageymsla eru óbreytt frá 76, fyrir utan viðbótarvörn um valda bókun við tengiaðgerð.

## Prófunarmörk

Prófin nota hermt DOM, kort og geymslu. Ekki raunvafra-, iPhone- eða iPad-prófun; keyrsluskrár vafra vantar. Ekki innskráð endaprófun með lifandi gagnagrunni. Engin breyting á lifandi gögnum við vinnuna. Óbreyttur kóði jafngildir ekki nýrri fullri raunprófun allra ótengdra sviða.
