# Prófun útgáfu 83 · 29-10-2026

29-10-2026 · Útgáfa 83 — Miðar líka á litlum spjöldum
- Notandi staðfesti að tengdur miði birtist í Í dag hluta dagatals en vantaði á aðalspjaldið undir Næstu dagar. Kóðayfirferð sýndi að litla spjaldið skilaði HTML áður en skjalabirting var reiknuð.
- spotlightEntryHtml reiknar nú fyrirliggjandi skjalabirtingu áður en það velur litla eða stóra spjaldið. Lítil samgönguspjöld birta sömu skjöl og sömu farþega-/ferðaleggsflokkun: flug, lest, bátur/ferja og akstur. Gildir líka um sambærileg lítil samgönguspjöld í Annað í dag.
- Ómerktir og eldri miðar haldast aðgengilegir. Skoða bókun og fyrirliggjandi opnun skjala nota óbreytta handlera. Ný stílregla er afmörkuð við miðahluta litlu spjaldanna og leyfir línuskipti.
- Einungis spotlightEntryHtml, afmarkað CSS og sýnilegt útgáfunúmer breytt í appinu. Engin breyting á vistun, gögnum, kostnaði, innflutningi, dagatali, kortum, skjalskoðara eða sóttu afriti. Aðrar vefskrár óbreyttar. Útgáfa 82 varðveitt og borin saman við fyrri ZIP.
- Allar 312 fyrri kóðaprófanir standast; 9 nýjar prófanir á litlum spjöldum standast (321 alls). Þær ná til allra samgönguflokka, út-/heimferðar, sameiginlegs miða, ómerktra skjala, varðveislu fyrri stórrar birtingar og ótengdra flokka, escaping og brottfalls hjálparskrár. JS syntax og föst HTML-auðkenni yfirfarin.
- Takmörk: prófanir keyrðar í Node með hermdu samhengi. Raunvafra-/iPhone-/iPad-útlit nýju litlu spjaldanna og lifandi gögn ekki prófuð. Engum lifandi gögnum breytt.

Prófun í síma eftir uppsetningu: opna sömu ferð, finna samgöngubókunina undir Næstu dagar og opna miðann beint þar. Staðfesta merkingu miðans og að Skoða bókun virki áfram.
