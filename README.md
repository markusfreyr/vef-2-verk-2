# Verkefni 2

Útfæra skal Express vefþjón sem birtir skráningar form og hefur „stjórnsíðu“ þar sem hægt er að skoða allar skráningar.

## Skráningar form

Skráningarform tekur við eftirfarandi gögnum:

* Nafni, verður að vera skráð
* Netfangi, verður að vera skráð og líta út fyrir að vera netfang
* Kennitölu, verður að vera skráð
* Fjölda, verður að vera skráð og verður að vera tala sem er stærri en 0

Ef gögn eru ekki rétt skráð skal birta notanda villuskilaboð ásamt þeim gögnum sem áður voru skráð. Passa þarf upp á að gögn séu hrein, sérstaklega af `XSS` strengjum. Gögn skulu skráð örugglega (með _parameterized input_) í postgres grunn.

Færslur í postgres skulu einnig hafa auðkenni (nóg að nota hlaupandi tölu) og dagsetningu þegar skráð var.

## Stjórnsíða

Gefin er skrá `users.js` með einum notanda sem skal hafa réttindi til að skrá sig inn. Lykilorð er geymt sem `bcrypt` hash af lykilorðinu `123` og þarf að útfæra þær aðferðir sem til staðar eru. Einnig þarf að setja upp stuðning við `session` á express appi þannig að auðkenning haldist milli beiðna, notasta skal við passport og passport-local strategy.

Stjórnsíða skal birta töflu með öllum skráðum reitum ásamt dagsetningu (ekki er krafa um að forma dagsetningu sérstaklega) og id á færslu (röð skiptir ekki máli).

Fyrir neðan töflu skal vera hlekkur í að sækja upplýsingar og skal það bjóða notanda að sækja `csv` skrá með sömu gögnum, t.d.

```csv
date;name;email;amount;ssn
Wed Jan 31 2018 21:48:51 GMT+0000 (GMT);Óli;osk@hi.is;4;123456-1234
```

bæði er hægt að útbúa gögn sjálf eða sækja pakka til að sjá um.

Í fæti skal birta upplýsingar um innskráðan notanda með nafni ásamt möguleika á að útskrá. Ef engin notandi er innskráður skal vera hlekkur á innskráningarsíðu.

## Útfærsla

Notast skal við PostgreSQL grunn og skal skila skemu af töflu í `schema.sql` (skipun sem býr til töflu–`CREATE TABLE`)

Notast skal við [Pug template](https://pugjs.org/) til að útbúa HTML. Sjá gefinn grunn í `views/`.

Öll dependency skulu skráð í `package.json`.

`eslint` og `stylelint` er uppsett í verkefni og keyrð með `npm run eslint` og `npm run stylelint`.

`npm start` skal keyra upp vefþjón á `localhost` porti `3000`.

Verkefnið skal keyra á Heroku og bjóða upp á innskráningu og vistun í gagnagrunn.

Við lausn á verkefni er gott að líta til eftirfarandi dæma:

* [Staðfesting gagna úr formi](https://github.com/vefforritun/vef2-2018/blob/master/fyrirlestrar/03/daemi/form/data-validator.js)
* [select, async og await](https://github.com/vefforritun/vef2-2018/blob/master/fyrirlestrar/03/daemi/postgres/select-async-await.js)
* [insert, async og await](https://github.com/vefforritun/vef2-2018/blob/master/fyrirlestrar/03/daemi/postgres/insert-async-await.js)
* [passport.js dæmi](https://github.com/vefforritun/vef2-2018/blob/master/fyrirlestrar/05/daemi/auth/passport.js)

## Útlit

CSS skrá ásamt mynd í haus skal sækja gegnum _static_ middleware í Express úr `/public` möppu.

CSS skal vera snyrtilegt, skalanlegt og nota flexbox. Ekki þarf að fylgja nákvæmlega gefnu útliti en það skal vera frekar líkt. Ekki þarf að huga sérstaklega að skalanleika útlits.

[Sjá fyrirmyndir](/layout/README.md)

## Git og GitHub

Verkefni þetta er sett fyrir á GitHub og almennt ætti að skila því úr einka (private) repo nemanda. Nemendur geta fengið gjaldfrjálsan aðgang að einka repos á meðan námi stendur, sjá https://education.github.com/.

Til að byrja er hægt að afrita þetta repo og bæta við á sínu eigin:

```bash
> git clone https://github.com/vefforritun/vef2-2018-v2.git
> cd vef2-2018-v2
> git remote remove origin # fjarlægja remote sem verkefni er í
> git remote add origin <slóð á repo> # bæta við í þínu repo
> git push
```

## Mat

* 10% – Snyrtilegur, eslint-villulaus JavaScript kóði
* 10% – Útlit útfært með merkingarfræðilegu HTML og snyrtilegu, stylelint-villulausu CSS
* 10% – Verkefni uppsett á Heroku
* 20% – Form tekur við gögnum, staðfestir þau (validate) og hreinsar (sanitize) og vistar í grunni
* 20% – Innskráning virkar fyrir `admin` notanda og stjórnunar route eru læst
* 20% – Stjórnunarsíða birtir færslur úr gagnagrunni
* 10% – Möguleiki á að sækja færslur sem `csv` skrá

## Sett fyrir

Verkefni sett fyrir í fyrirlestri fimmtudaginn 1. febrúar 2018.

## Skil

Skila skal undir „Verkefni og hlutaprófa“ á Uglu í seinasta lagi fyrir lok dags föstudaginn 16. febrúar 2018.

Skilaboð skulu innihalda slóð á GitHub repo fyrir verkefni, og dæmatímakennurum skal hafa verið boðið í repo ([sjá leiðbeiningar](https://help.github.com/articles/inviting-collaborators-to-a-personal-repository/)). Notendanöfn þeirra eru `ernir` og `elvarhelga`.

## Einkunn

Sett verða fyrir sex minni verkefni þar sem fimm bestu gilda 6% hvert, samtals 30% af lokaeinkunn.

Sett verða fyrir tvö hópa verkefni þar sem hvort um sig gildir 15%, samtals 30% af lokaeinkunn.
# vef-2-verk-2
