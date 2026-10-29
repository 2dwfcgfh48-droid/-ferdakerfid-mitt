# Prófun útgáfu 85 · 29-10-2026

373 kóðaprófanir standast: 349 fyrri, 15 nýjar um skörun og 9 um spjaldabirtingu. Prófun endurskapar v84 villuna með raunverulegu saveItem í hermdu samhengi og staðfestir að v85 sýni staðfestingu áður en bókun/kostnaður er skrifaður.

## Prófun í síma eftir uppsetningu

1. Breyta upphafs-/lokatíma afþreyingar þannig að ný eða breytt skörun myndist við aðra bókaða afþreyingu. Vista.
2. Aðvörun á að koma áður en vistun klárast. Hætta við á að halda glugganum og innslætti opnum án vistunar.
3. Vista aftur og samþykkja: sama bókun á að uppfærast og fyrirliggjandi gula viðvörunin haldast.

Óbreytt eldri skörun kallar ekki aftur á staðfestingu við hverja vistun. Vantað tímabelti er ekki áætlað. Engin breyting á meðhöndlun samþykktra undantekninga.

Tímabil sést nú einnig á spjöldum bókunarlistans við kortið, á sérlínu undir heitinu. Athuga þar sýnilega tíma án þess að opna bókanir. Skráður upphafstími birtist ef lokatíma vantar; enginn tími er áætlaður.

## Takmörk

Node-/VM-prófanir með hermdu DOM, gagnagrunni og staðfestingarglugga; raunvafra-/iPhone-/iPad- og innskráð DB-vistun óstaðfest. Engin lifandi notandagögn breytt. Útgáfa 84 varðveitt óbreytt. Allar 19 skrár eiga að fylgja afhendingunni.
