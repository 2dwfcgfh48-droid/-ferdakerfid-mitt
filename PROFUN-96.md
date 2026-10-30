# Útgáfa 96 — mynd og útritun, 30-10-2026

Grunnur: varðveitt útgáfa 95. Umfang aðeins birting myndar í Í dag og útritunar í ferðadagskeðju. Nýjustu beinu fyrirmæli notanda ganga framar myndaröð 95; D13 leiðrétt og D18 skráð.

Mynd birtist eingöngu í flýtispjaldi, eftir haus og viðvörun og fyrir Næsta skref. Dagatals-/Í dag-flipasýn hefur enga mynd eða myndavalmynd. Sameiginleg gögn, viðvaranir, klukka og aðrir hlutar haldast.

Útritunarskref tengdrar gistingar á ferðadegi sýnir að ljúka þurfi útritun áður en lagt er af stað að brottfararstað, ásamt skráðri brottför ferðar. Þegar fyrirliggjandi ráðlögð brottför er skráð birtist hún. Enginn útritunartími er búinn til. Lokafrestur hótels er áfram í samanbrotnum Gisting og útritun-kafla. Gisting án tengdrar brottfarar heldur eigin hótelfresti.

Sannprófun í þessari lotu:
- 34 endurkeyrðar Chromium-flæðisprófanir stóðust með prufugögnum, þar á meðal viðvaranir/undantekningar, tímar, klukka, leiðsögn, dagsetningar, dagahnappar, PDF og lesafrit. Samanburður beggja kjarnabirtinga útilokar nú myndina samkvæmt nýjustu fyrirmælum.
- Myndapróf með raunverulegri fyrirliggjandi myndaskrift, staðbundinni prufumynd og veðurhermi: mynd og myndavalmynd aðeins í flýtispjaldi; viðvörun fyrir ofan mynd og mynd fyrir ofan Næsta skref; engin mynd í dagatalsbirtingu. Fjórar breiddir 320/393/430/768px án lárétts yfirflæðis.
- Sama vafrapróf sannreynir útritun í báðum birtingum: 09:10 sýnilegt, 14:00 ekki sýnilegt fyrr en nánari kafli er opnaður, hótelfrestur varðveittur eftir opnun og kafli lokast aftur.
- Einangruð keyrslupróf raunverulegra birtingarfalla með hermdu DOM: skráð/óskráð ráðlögð brottför, enginn tengdur leggur, óskráður hótelfrestur, óbreytt bókunargögn, myndaröð og sami kjarni beggja glugga.
- JavaScript-málskipan staðfest með node --check. Skjámynd flýtispjalds sjónskoðuð með prufumynd; staðbundna vafravél vantar emoji-letur og sýnir sum tákn sem ferninga. Það er takmörkun prófunarumhverfis; táknakóða appsins var ekki breytt.

Eina breytta keyrsluskráin frá 95 er index.html: todayJourneyCheckoutStep, tengda kallið í todayJourneyHtml og myndarskilyrði/röð renderTodaySurface. Aðrar stuðningsskrár eru bætisjafnar. Vistunar-, kostnaðar-, tímabeltis-, árekstra- og viðvörunarreikningum var ekki breytt. Gildandi skjöl og verkefnisskrá eru uppfærð.

Raunverulegur iPhone/Safari, lifandi innskráning/vistun, lifandi myndaleit/veður og opnun Google Maps-apps eru óstaðfest. V01/V02/V03 og önnur ólokin verk haldast. Engin fullyrðing um heildarprófun allra eldri samþykkta.

Upphleðsla: ef 95 er uppsett nægir að skipta út index.html. ZIP geymir einnig stuðningsskrár og uppfærð verkefnisskjöl. Engin endurskráning gagna.
