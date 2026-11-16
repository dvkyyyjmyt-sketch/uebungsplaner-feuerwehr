// Vorlagen und Speicherfunktionen der App – alles bleibt im Browser.
const STORAGE_KEYS = {
  recent: "feuerwehr-uebungsplaner-recent",
  favorites: "feuerwehr-uebungsplaner-favorites",
  ratings: "feuerwehr-uebungsplaner-ratings"
};

const templates = [
  {
    id: "teamkommunikation",
    keywords: ["kommunikation", "funk", "führung", "team", "koordination", "information", "rolle", "abstimmung"],
    theme: "Teamkommunikation und klare Aufgabenverteilung",
    situation: "Bei einer fiktiven Einsatzmeldung treffen mehrere Informationen zeitversetzt ein. Die Gruppe soll gemeinsam ein Lagebild erstellen und ihre nächsten Schritte abstimmen.",
    preparation: "Eine kurze, frei erfundene Lagekarte oder schriftliche Meldungen vorbereiten. Arbeitsbereich und Beobachtungsplatz festlegen; keine realen Notrufe oder Funkkanäle verwenden.",
    tasks: ["Informationen ordnen und Rückfragen kenntlich machen.", "Aufgaben und Zuständigkeiten im Team verständlich absprechen.", "Die Entscheidung und offene Punkte für die Nachbesprechung festhalten."],
    variant: "Meldungen in anderer Reihenfolge übermitteln oder eine Information als unklar kennzeichnen."
  },
  {
    id: "geraetekunde",
    keywords: ["gerät", "material", "technik", "fahrzeug", "ausrüstung"],
    theme: "Gerätekunde mit gemeinsamer Materialplanung",
    situation: "Für ein fiktives Planspiel steht eine begrenzte Liste von Übungsmaterialien bereit. Die Gruppe ordnet nur die Angaben auf der Liste ein und hält fest, was vor einem realen Einsatz fachlich geprüft werden müsste.",
    preparation: "Eine Materialliste statt einsatzbereiter Geräte verwenden. Nur freigegebene, sichere Übungsmaterialien zeigen; tatsächliche Eignung und Verwendung nicht praktisch erproben.",
    tasks: ["Materialangaben ordnen und nicht bestätigte Eignung ausdrücklich offenlassen.", "Den Materialbedarf nur auf Ebene des Ausbildungsziels begründen.", "Fehlendes Material und notwendige fachliche Prüfungen benennen."],
    variant: "Ein Material auf einer Planspielkarte als nicht verfügbar markieren; nichts tatsächlich entfernen oder blockieren."
  },
  {
    id: "lageerkundung",
    keywords: ["erkundung", "lage", "einsatz", "beurteilung", "entscheidung"],
    theme: "Lageerkundung und gemeinsames Lagebild",
    situation: "Eine fiktive, gefahrlose Übungslage wird beschrieben. Die Gruppe sammelt Beobachtungen, trennt bestätigte Informationen von Annahmen und bespricht mögliche nächste Schritte.",
    preparation: "Ein einfaches Szenario am Tisch oder auf einem sicheren Übungsbereich vorbereiten. Gefahren nur beschreiben, nicht real nachstellen.",
    tasks: ["Beobachtungen strukturiert zusammentragen.", "Unklare oder fehlende Informationen markieren.", "Eine gemeinsame Zusammenfassung mit offenen Fragen geben."],
    variant: "Ein zusätzliches, zunächst widersprüchliches Detail einführen und gemeinsam einordnen."
  },
  {
    id: "menschenrettung",
    keywords: ["rettung", "erste hilfe", "person", "betreuung", "patient"],
    theme: "Betreuung und abgestimmte Hilfeleistung",
    situation: "Eine rein fiktive schriftliche Beschreibung einer hilfebedürftigen Person dient dazu, Kommunikation, Informationsbedarf und Zuständigkeiten zu besprechen. Es gibt keine Übungsperson und keine medizinische Handlung.",
    preparation: "Eine kurze, erfundene Textkarte vorbereiten. Keine Übungsperson, medizinische Maßnahme oder körperliche Belastung einbeziehen.",
    tasks: ["Benötigte Informationen und offene Fragen aus der Textkarte herausarbeiten.", "Rollen und Zuständigkeit für eine sichere Abstimmung klären.", "Grenzen der Übung und notwendige fachliche Weitergabe benennen."],
    variant: "Eine zusätzliche, rein schriftliche Information oder Beobachtungsaufgabe ergänzen."
  },
  {
    id: "verkehrsunfall",
    keywords: ["verkehrsunfall", "unfall", "baum", "eingeklemmt", "fahrzeug"],
    theme: "Verkehrsunfall – Lagebild als Planspiel",
    situation: "Fiktive Textmeldung: Ein Pkw ist gegen einen Baum gefahren; eine Person soll im Fahrzeug eingeschlossen sein. Die Lage wird ausschließlich anhand von Papierkarten besprochen. Es gibt keine Unfallstelle, kein Fahrzeug und keine dargestellte Person.",
    preparation: "Das passende Szenenbild und vorbereitete Textkarten verwenden. Keine Fahrzeuge, eingeklemmten Personen oder Gefahren nachstellen.",
    tasks: ["Die bekannten und unbestätigten Angaben der Textmeldung getrennt festhalten.", "Fehlende Informationen und nötige Rückfragen benennen, ohne Annahmen als Tatsachen auszugeben.", "Ein gemeinsames Lagebild und offene Klärungspunkte für die Nachbesprechung erstellen."],
    variant: "Eine zweite, widersprüchliche Information ausschließlich als Planspielkarte ergänzen."
  },
  {
    id: "wasserplanung",
    keywords: ["wasser", "versorgung", "schlauch", "lösch", "pumpe"],
    theme: "Ressourcenübersicht und Abstimmung im Planspiel",
    situation: "Anhand einer fiktiven Liste bespricht die Gruppe Ressourcen, Abhängigkeiten und offene Zuständigkeiten. Es wird nichts aufgebaut oder praktisch betrieben.",
    preparation: "Eine neutrale Ressourcenliste oder einfache Planspielkarte vorbereiten. Keine Geräte aufbauen oder praktisch betreiben.",
    tasks: ["Aufgelistete Ressourcen und fehlende Angaben übersichtlich zusammenstellen.", "Zuständigkeiten für Rückfragen und Abstimmung festhalten.", "Mögliche Änderungen als Planspiel besprechen und nötige Prüfungen benennen."],
    variant: "Eine Ressource auf der Planspielkarte als nicht verfügbar markieren oder eine offene Zuständigkeit ergänzen."
  },
  {
    id: "ablaufplanung",
    keywords: ["ablauf", "organisation", "planung", "übergabe", "ausbildung"],
    theme: "Ablaufplanung und Rollenwechsel",
    situation: "Die Gruppe erhält einen kurzen Übungsauftrag und entwickelt gemeinsam einen nachvollziehbaren Ablauf mit klaren Rollen und einem vereinbarten Abschluss.",
    preparation: "Auftrag und Zeitrahmen auf einer Karte notieren. Beobachtungspunkte für Zusammenarbeit und Verständlichkeit festlegen.",
    tasks: ["Auftrag in einzelne, verständliche Arbeitsschritte teilen.", "Rollen verteilen und Rückfragen zulassen.", "Am Ende Ergebnisse und offene Punkte zusammenfassen."],
    variant: "Nach der Hälfte die Rollen tauschen oder eine zusätzliche Rahmenbedingung ergänzen."
  },
  {
    id: "brand",
    keywords: ["brand", "rauch", "gebäude", "wohnung", "keller"],
    theme: "Brandmeldung am Gebäude – Lagebild als Planspiel",
    situation: "Fiktive Meldung: Aus einem Gebäude wird Rauch gemeldet. Ursache, Ausmaß und mögliche betroffene Personen sind nicht bestätigt; alle Informationen bleiben Textkarten.",
    preparation: "Eine einfache Gebäude-Illustration und vorbereitete Textkarten verwenden. Kein Feuer, Rauch, Wärme oder Gebäudezutritt nachstellen.",
    tasks: ["Bestätigte und unbestätigte Meldungsinhalte trennen.", "Offene Fragen zu Gebäude, Ausmaß und möglicherweise betroffenen Personen sammeln.", "Ein gemeinsames Lagebild mit ausdrücklich ungeklärten Punkten formulieren."],
    variant: "Eine zweite Textkarte mit einer zunächst abweichenden Ortsangabe ergänzen."
  },
  {
    id: "vegetationsbrand",
    keywords: ["vegetationsbrand", "waldbrand", "flächenbrand", "wiese", "wald"],
    theme: "Vegetationsbrand – Lageentwicklung als Planspiel",
    situation: "Fiktive Textmeldung über eine Rauch- oder Brandbeobachtung an einer markierten Wald- oder Freifläche. Ausdehnung und Ausbreitung sind unbekannt und werden nicht real dargestellt.",
    preparation: "Eine vereinfachte Flächenkarte mit markiertem Beobachtungspunkt verwenden. Keine Flammen, Rauchquellen oder Brandstoffe einsetzen.",
    tasks: ["Beobachtete Angaben von Vermutungen und fehlenden Informationen trennen.", "Auf der Karte erkennbare Rahmenbedingungen benennen, ohne Ausbreitung vorherzusagen.", "Änderungsbedarf und offene Rückfragen im Lagebild dokumentieren."],
    variant: "Eine zusätzliche Wetter- oder Sichtangabe als unbestätigte Textkarte einspielen."
  },
  {
    id: "unwetter",
    keywords: ["unwetter", "sturm", "baum auf", "ast", "dachschaden"],
    theme: "Unwetterfolge – Schadensmeldung als Planspiel",
    situation: "Fiktive Meldung über einen umgestürzten Baum und eine mögliche Behinderung an einem unnummerierten Weg. Schäden, Gefahren und Zugänglichkeit sind unbestätigt.",
    preparation: "Eine neutrale Karte mit Weg und umgestürztem Baumsymbol verwenden. Keine Bäume, Äste oder Hindernisse real bewegen oder aufbauen.",
    tasks: ["Meldung, bestätigte Angaben und offene Gefahren getrennt festhalten.", "Auswirkungen einer möglichen Wegbehinderung als offene Frage einordnen.", "Benötigte Informationen und Zuständigkeiten für die weitere Klärung sammeln."],
    variant: "Eine zweite, widersprüchliche Meldung zur Zugänglichkeit als Planspielkarte ergänzen."
  },
  {
    id: "hochwasser",
    keywords: ["hochwasser", "überschwemmung", "wasserschaden", "keller unter wasser"],
    theme: "Wasserschaden – Lageübersicht als Planspiel",
    situation: "Fiktive Meldung über Wasser in einem Gebäudebereich. Wasserstand, Ursache, elektrische Situation und Zugang sind nicht bestätigt und werden nicht real dargestellt.",
    preparation: "Gebäudegrundriss als Papierkarte verwenden. Kein Wasser, keine Pumpen und keine elektrischen Anlagen einsetzen.",
    tasks: ["Bekannte Meldungsangaben und unbekannte Umgebungsbedingungen kennzeichnen.", "Mögliche Gefahren ausschließlich als unbestätigte Klärungspunkte sammeln.", "Eine sichere Informationsweitergabe ohne praktische Maßnahmenplanung üben."],
    variant: "Eine weitere Textkarte mit einem unbestätigten Wasserstand oder einer offenen Zugangsinformation ergänzen."
  },
  {
    id: "gefahrstoff",
    keywords: ["gefahrstoff", "gefahrgut", "stoffaustritt", "chemikalie", "unbekannter stoff"],
    theme: "Unbekannter Stoffhinweis – Informationslage als Planspiel",
    situation: "Fiktive Meldung über einen unbekannten Stoffhinweis an einem markierten Objekt. Stoff, Menge und Gefahreneigenschaften sind unbekannt; es gibt keinerlei echte Stoffe oder Gerüche.",
    preparation: "Ausschließlich eine neutrale Textkarte mit einem Fragezeichen verwenden. Keine Chemikalien, Gefahrstoffsymbole an realen Gebinden oder Geruchsproben einsetzen.",
    tasks: ["Unbestätigte Vermutungen klar von belegten Angaben trennen.", "Benennen, welche fachlich geprüften Informationen fehlen, ohne einen Stoff zu identifizieren.", "Sichere Entscheidungsgrenzen und notwendige fachliche Zuständigkeiten besprechen."],
    variant: "Eine zusätzliche, ausdrücklich unbestätigte Beschreibung auf einer Textkarte vorlegen."
  },
  {
    id: "personensuche",
    keywords: ["vermisst", "personensuche", "suchgebiet", "vermisste person"],
    theme: "Vermisstenmeldung – Informationsabgleich als Planspiel",
    situation: "Fiktive Meldung über eine vermisste Person in einem rein schematischen Kartenbereich. Identität, letzter bekannter Aufenthaltsort und Suchgebiet sind nur soweit angegeben bekannt.",
    preparation: "Eine fiktive Karte mit klar begrenztem Planspielbereich und Textkarten verwenden. Keine reale Suche oder Bewegung im Gelände durchführen.",
    tasks: ["Bekannte Zeit- und Ortsangaben von Annahmen trennen.", "Widersprüche und fehlende Informationen für die Nachbesprechung markieren.", "Eine nachvollziehbare Zusammenfassung und offene Rückfragen erstellen."],
    variant: "Eine weitere fiktive Zeitangabe mit ungeklärter Verlässlichkeit ergänzen."
  },
  {
    id: "stromausfall",
    keywords: ["stromausfall", "strom", "blackout", "elektrischer defekt"],
    theme: "Stromausfall – Auswirkungen als Planspiel",
    situation: "Fiktive Meldung über einen Stromausfall in einem markierten Gebäude. Ursache, betroffene Bereiche und mögliche Auswirkungen sind unbekannt.",
    preparation: "Gebäudeskizze und Textkarten nutzen. Keine Sicherungen, Stromkreise oder elektrischen Geräte verändern oder bedienen.",
    tasks: ["Betroffene Angaben und offene technische Fragen auseinanderhalten.", "Mögliche Auswirkungen nur beschreiben, nicht technisch beheben.", "Informationsbedarf, Zuständigkeiten und einen verständlichen Kurzbericht festhalten."],
    variant: "Eine unbestätigte Zusatzmeldung zu einem betroffenen Gebäudebereich einspielen."
  },
  {
    id: "tiernotlage",
    keywords: ["tier", "tierrettung", "pferd", "haustier", "tiernotlage"],
    theme: "Tiernotlage – Lageklärung als Planspiel",
    situation: "Fiktive Textmeldung über ein Tier in einer unklaren örtlichen Situation. Tierart, Zustand, Umfeld und mögliche Gefahren sind nicht bestätigt.",
    preparation: "Eine Textkarte und eine neutrale Umgebungsskizze verwenden. Keine Tiere, Käfige, Fangmittel oder Annäherung praktisch einsetzen.",
    tasks: ["Bekannte Angaben zu Tier und Umfeld von Vermutungen trennen.", "Offene Gefahren und notwendige fachliche Zuständigkeiten benennen.", "Eine sichere Informationsweitergabe und klare Übungsgrenzen formulieren."],
    variant: "Eine unbestätigte Information zum Umfeld als zusätzliche Planspielkarte einspielen."
  },
  {
    id: "brandmeldeanlage",
    keywords: ["brandmeldeanlage", "bma", "rauchmelder", "alarmierung", "fehlalarm"],
    theme: "Ausgelöste Brandmeldeanlage – Meldungen abgleichen",
    situation: "Fiktive Meldung über eine ausgelöste Brandmeldeanlage in einem Gewerbegebäude. Auslösebereich, Ursache, tatsächliche Wahrnehmungen und Betroffenheit sind zunächst nicht bestätigt.",
    preparation: "Eine erfundene Gebäudeübersicht mit neutral markierten Bereichen und drei vorbereiteten Informationskarten anlegen. Keine Anlage auslösen, bedienen oder verändern.",
    tasks: ["Meldung, bestätigte Beobachtung und technische Anzeige getrennt dokumentieren.", "Widersprüchliche Bereichsangaben und fehlende Rückmeldungen sichtbar machen.", "Eine verständliche Zusammenfassung mit offenen Prüffragen und zuständigen Rollen erstellen."],
    variant: "Eine zweite Karte meldet einen anderen Auslösebereich; die Abweichung bleibt ungeklärt, bis die Gruppe eine Rückfrage formuliert."
  },
  {
    id: "industriebrand",
    keywords: ["industriebetrieb", "industrieanlage", "hackschnitzel", "maschinenhalle", "gewerbe"],
    theme: "Brandmeldung im Gewerbe- oder Industriebetrieb",
    situation: "Fiktive Meldung über eine mögliche Rauch- oder Wärmeentwicklung in einem Gewerbegebäude, etwa an einem Lager- oder Maschinenbereich. Nutzung, betroffener Abschnitt, Personen und Stoffe sind nicht bestätigt.",
    preparation: "Eine schematische Gebäudekarte mit neutralen Bereichen und einer Liste offener Objektfragen vorbereiten. Keine Maschinen, Brennstoffe, Lagergüter, Hitze oder Rauch verwenden.",
    tasks: ["Objektangaben und unbestätigte Hinweise getrennt erfassen.", "Fehlende Informationen zu Nutzung, betroffenen Bereichen und möglichen Personen benennen, ohne Gefahreneigenschaften zu erfinden.", "Eine mehrteilige Lageübersicht und die für Rückfragen zuständigen Rollen festlegen."],
    variant: "Eine unbestätigte Karte nennt einen zweiten betroffenen Gebäudeteil oder eine abweichende Nutzung; Auswirkungen nur als offene Frage dokumentieren."
  },
  {
    id: "lkwunfall",
    keywords: ["lkw", "lastkraftwagen", "mehrere pkw", "verkehrsunfall mit lkw"],
    theme: "Verkehrsunfall mit Lkw oder mehreren Fahrzeugen",
    situation: "Fiktive Meldung über einen Verkehrsunfall mit einem Lkw oder mehreren Fahrzeugen auf einem unnummerierten Straßenabschnitt. Zahl der Beteiligten, Ladung, Fahrbahnzustand und mögliche Betroffenheit sind unbestätigt.",
    preparation: "Eine abstrakte Straßenkarte mit Fahrzeugsymbolen und separaten Meldungskarten verwenden. Keine Fahrzeuge, Ladung, Verkehrsbehinderung oder Verletzungen nachstellen.",
    tasks: ["Anzahl und Art der gemeldeten Fahrzeuge von bestätigten Angaben unterscheiden.", "Fehlende Informationen zu Beteiligten, örtlichem Umfang und möglicher Ladung als ungeklärt kennzeichnen.", "Einheitenübergreifend ein gemeinsames Lagebild mit klaren Rückmelde- und Übergabepunkten erstellen."],
    variant: "Eine unbestätigte Zusatzkarte meldet ein weiteres Fahrzeug oder eine unbekannte Ladungsangabe; keine konkrete Gefahrstoff- oder Rettungsannahme daraus ableiten."
  },
  {
    id: "oelspur",
    keywords: ["ölspur", "oelspur", "betriebsstoffe", "verunreinigung", "fahrbahn reinigen"],
    theme: "Ölspur oder unklare Fahrbahnverunreinigung",
    situation: "Fiktive Meldung über eine längere, nicht näher beschriebene Verunreinigung auf einer Straße. Stoff, Ausdehnung, Ursache und mögliche Auswirkungen sind unbekannt.",
    preparation: "Eine einfache Straßenkarte mit markiertem Abschnitt und widersprüchlichen Längenangaben vorbereiten. Keine Flüssigkeiten, Markierungsstoffe oder rutschigen Flächen einsetzen.",
    tasks: ["Die Meldung räumlich einordnen und unbestätigte Grenzen kennzeichnen.", "Fehlende Angaben zu Stoff, Ausmaß und Zuständigkeit als Rückfragen formulieren.", "Eine sichere Informationsübergabe und Dokumentation offener Punkte erarbeiten, ohne reale Beseitigung zu planen."],
    variant: "Eine zweite Karte nennt eine abweichende Ausdehnung oder einen anderen Ausgangspunkt; beide Angaben bleiben bis zur Klärung offen."
  },
  {
    id: "strassenueberflutung",
    keywords: ["straße überflutet", "strasse ueberflutet", "starkregen", "fahrbahn überschwemmt", "fahrbahn ueberschwemmt"],
    theme: "Überflutete Straße nach Starkregen",
    situation: "Fiktive Meldung über eine teilweise überflutete Straße nach Starkregen. Wassertiefe, Ausdehnung, Fließverhältnisse, Straßenzustand und betroffene Bereiche sind unbekannt.",
    preparation: "Eine abstrakte Ortskarte mit zwei möglichen Überflutungsabschnitten und getrennten Beobachtungskarten vorbereiten. Kein Wasser, keine Pumpen und keine nassen oder rutschigen Flächen einsetzen.",
    tasks: ["Beobachtete Angaben und Vermutungen zu Wasser und Straßenabschnitt trennen.", "Widersprüchliche Orts- oder Zeitangaben im Lagebild markieren.", "Zuständigkeiten für Informationsbeschaffung und Weitergabe festhalten, ohne reale Verkehrs- oder Wassermaßnahmen abzuleiten."],
    variant: "Eine Planspielkarte meldet eine mögliche Ausweitung auf einen zweiten Abschnitt; Umfang und Zeitpunkt bleiben unbestätigt."
  },
  {
    id: "arbeitunfall",
    keywords: ["arbeitsunfall", "betriebsunfall", "stromunfall", "person eingeklemmt", "technische hilfe"],
    theme: "Arbeitsunfall – Informations- und Rollenklärung",
    situation: "Fiktive Meldung über einen Arbeitsunfall in einem Betrieb. Unfallhergang, Zahl und Zustand möglicher Betroffener, Anlagenzustand und zuständige Ansprechpartner sind nicht bestätigt.",
    preparation: "Nur eine fiktive Textkarte und eine neutrale Betriebsübersicht verwenden. Keine verletzte Person, Maschine, Stromquelle oder Gefahrenstelle darstellen oder praktisch verändern.",
    tasks: ["Meldung und Annahmen zum Unfallhergang konsequent auseinanderhalten.", "Fehlende Informationen, Zuständigkeiten und notwendige fachliche Übergaben benennen.", "Einen sachlichen Lagekurzbericht mit offenen Punkten und klaren Übungsgrenzen verfassen."],
    variant: "Eine Textkarte meldet eine widersprüchliche Zahl möglicher Betroffener oder einen ungeklärten Anlagenstatus; keine medizinische oder technische Maßnahme ableiten."
  },
  {
    id: "tueröffnung",
    keywords: ["türöffnung", "tueroeffnung", "eilige tür", "hinter tür", "wohnungstür"],
    theme: "Eilige Türöffnung – Lage hinter einer Tür ungeklärt",
    situation: "Fiktive Meldung über eine verschlossene Tür und eine mögliche hilfebedürftige Person dahinter. Anwesenheit, Zustand, Zugangslage und Berechtigung sind nicht bestätigt.",
    preparation: "Eine neutrale Grundrisskarte und kurze, widersprüchliche Textmeldungen vorbereiten. Keine echte Tür, Wohnung, Zugangstechnik oder betroffene Person einbeziehen.",
    tasks: ["Meldung, Vermutung und bestätigte Information klar unterscheiden.", "Offene Fragen zu Person, Ort, Zuständigkeit und angemessener Informationsweitergabe sammeln.", "Eine datensparsame, nachvollziehbare Übergabe und die Grenzen der Planspielaufgabe formulieren."],
    variant: "Eine Meldung widerspricht der Anwesenheit einer Person; die Gruppe hält beide Angaben offen und kennzeichnet, wer sie fachlich prüfen müsste."
  },
  {
    id: "firstresponder",
    keywords: ["first responder", "first-responder", "erstversorgung", "medizinischer notfall"],
    theme: "First-Responder-Meldung – Abstimmung und Übergabe",
    situation: "Fiktive Meldung über eine möglicherweise hilfebedürftige Person. Die Übung behandelt ausschließlich Informationsaufnahme, Rollenklärung und Übergabe; medizinischer Zustand und Bedarf bleiben unbestätigt.",
    preparation: "Eine fiktive Meldungskarte, einen neutralen Übergabebogen und Beobachtungskriterien zu Verständlichkeit vorbereiten. Keine Patientendarstellung, Untersuchung, Behandlung oder echte Alarmierung.",
    tasks: ["Die schriftliche Meldung in bestätigte Angaben, Annahmen und fehlende Informationen gliedern.", "Zuständigkeiten und die Grenzen der eigenen Übungsrolle transparent benennen.", "Eine knappe, verständliche Übergabe mit Rückfrage- und Bestätigungsbedarf erstellen; keine medizinischen Maßnahmen besprechen oder üben."],
    variant: "Eine zweite Textkarte ändert einen nicht medizinisch-handlungsleitenden Rahmendatensatz, etwa Ortsteil oder Zeitpunkt; die Gruppe korrigiert die Übergabe nachvollziehbar."
  },
  {
    id: "fahrzeugbrand",
    keywords: ["fahrzeugbrand", "pkw-brand", "lkw-brand", "auto brennt", "brand lkw"],
    theme: "Brandmeldung an einem Fahrzeug – Lagebild als Planspiel",
    situation: "Fiktive Meldung über Rauch oder Feuer an einem abgestellten oder fahrenden Fahrzeug. Fahrzeugtyp, genaue Lage, mögliche Betroffene und Ausmaß sind unbestätigt; es gibt kein echtes Fahrzeug und keine Branddarstellung.",
    preparation: "Eine neutrale Fahrzeugkarte und Meldungskarten mit klar gekennzeichneten offenen Angaben verwenden. Keine Fahrzeuge, Flammen, Rauch, Wärme oder Brandstoffe einsetzen.",
    tasks: ["Fahrzeugart, Ort, Zeit und gemeldete Beobachtungen von unbestätigten Annahmen trennen.", "Mögliche Betroffenheit und weitere Gefahren als offene Klärungspunkte benennen, ohne technische Maßnahmen abzuleiten.", "Eine kurze Lagezusammenfassung mit Zuständigkeiten und Rückfragen erstellen."],
    variant: "Eine zweite Karte meldet einen abweichenden Standort oder eine unbestätigte Angabe zu betroffenen Personen; beide Angaben sichtbar offenhalten."
  },
  {
    id: "bahnbrand",
    keywords: ["zugbrand", "bahnbrand", "personenzug", "schienenfahrzeug", "zug rauch"],
    theme: "Meldung an einem Schienenfahrzeug – Lageklärung als Planspiel",
    situation: "Fiktive Meldung über Rauch oder eine Störung an einem Schienenfahrzeug. Zugposition, Betriebszustand, Zahl möglicher Betroffener und Zuständigkeiten sind nicht bestätigt; Gleise und Fahrzeuge werden nicht betreten oder dargestellt.",
    preparation: "Eine vereinfachte Papierkarte mit symbolischem Gleis und einem Zug-Symbol sowie getrennte Textmeldungen verwenden. Keine Gleisanlage, Bahnübergang, Bewegung oder Betriebsstörung real nachstellen.",
    tasks: ["Meldungsquelle, genaue Ortsangabe, Zeitpunkt und Zug-/Fahrzeugangaben getrennt erfassen.", "Unbekannte Angaben zu Personen, Betriebszustand und Gefahren offenlassen und notwendige zuständige Stellen benennen.", "Eine abgestimmte Informationsübergabe und die Grenzen der eigenen Übungsrolle dokumentieren; keine Gleis- oder Einsatzmaßnahmen ableiten."],
    variant: "Eine zweite Meldung nennt einen anderen Haltepunkt oder eine abweichende Zahl Betroffener; die Gruppe markiert den Widerspruch und formuliert eine Klärungsfrage."
  },
  {
    id: "verkehrslenkung",
    keywords: ["verkehrslenkung", "verkehr regeln", "verkehrsabsicherung", "umleitung", "nach verkehrsunfall"],
    theme: "Verkehrslage nach einem Unfall – Koordination als Planspiel",
    situation: "Fiktive Meldung über eine mögliche Verkehrsbehinderung nach einem Unfall. Straßenabschnitt, Umfang, zuständige Stellen und aktuelle Verkehrslage sind nicht bestätigt; es findet keine reale Verkehrsregelung statt.",
    preparation: "Eine abstrakte Straßenkarte und Textkarten zu Ort, Zeit und Meldungsstand vorbereiten. Keine öffentlichen Straßen, Fahrzeuge, Sperrungen, Verkehrszeichen oder Umleitungen real verändern.",
    tasks: ["Meldungen zum Straßenabschnitt und Zeitpunkt mit ihrer Quelle dokumentieren.", "Zuständigkeiten und Informationsbedarf für eine sichere Abstimmung klären, ohne Maßnahmen oder Umleitungen festzulegen.", "Eine verständliche Lageübergabe mit ausdrücklich offenen Angaben verfassen."],
    variant: "Eine spätere Karte meldet eine abweichende Straßenfreigabe oder einen zweiten Abschnitt; die Angabe bleibt bis zur Klärung unbestätigt."
  },
  {
    id: "rettungsdienst",
    keywords: ["rettungsdienst unterstützen", "unterstützung rettungsdienst", "patientenübergabe", "rettungsdienst"],
    theme: "Unterstützung des Rettungsdienstes – Rollen und Übergabe",
    situation: "Fiktive Meldung über eine angefragte Unterstützung des Rettungsdienstes. Umfang, Zuständigkeiten und mögliche Betroffenheit sind nicht bestätigt; die Übung enthält keine Patientendarstellung oder medizinische Handlung.",
    preparation: "Eine schriftliche Anforderungskarte und einen neutralen Übergabebogen vorbereiten. Keine Patientinnen oder Patienten, medizinischen Geräte, Behandlung oder echte Alarmierung einbeziehen.",
    tasks: ["Anforderung, Quelle, Ort und Umfang der erbetenen Unterstützung aus der Textkarte herausarbeiten.", "Eigene Rolle und Grenzen gegenüber den zuständigen medizinischen Kräften klären; keine medizinischen Entscheidungen treffen.", "Eine knappe, bestätigte und datensparsame Übergabe mit offenen Rückfragen erstellen."],
    variant: "Eine Textkarte ändert eine organisatorische Angabe wie Treffpunkt oder Anforderungsumfang; die Gruppe aktualisiert die Übergabe und kennzeichnet die Änderung."
  }
];

const fireScenarioIds = new Set(["brand", "brandmeldeanlage", "industriebrand", "vegetationsbrand", "fahrzeugbrand", "bahnbrand"]);
const parkedVehiclePattern = /geparkte(?:n|m|r)?\s+(?:pkw|autos?|fahrzeuge?)|abgestellte(?:n|m|r)?\s+(?:pkw|autos?|fahrzeuge?)|parkplatz|parkende/;

const districtFireDepartments = [
  {
    id: "aichach",
    name: "Freiwillige Feuerwehr Aichach",
    vehicles: [
      { id: "aic-kdow", label: "10/1 – KdoW" },
      { id: "aic-mzf", label: "11/1 – MZF" },
      { id: "aic-mtw", label: "14/1 – MTW" },
      { id: "aic-dlk", label: "30/1 – DLK" },
      { id: "aic-wlf1", label: "36/1 – WLF" },
      { id: "aic-wlf2", label: "36/2 – WLF-K" },
      { id: "aic-teleskoplader", label: "39/1 – Teleskoplader" },
      { id: "aic-hlf", label: "40/1 – HLF 20", crew: 9 },
      { id: "aic-lf", label: "40/2 – LF 20/16", crew: 9 },
      { id: "aic-gw-as", label: "53/1 – GW-AS" },
      { id: "aic-vlkw", label: "56/1 – V-LKW" },
      { id: "aic-utv", label: "59/1 – UTV" },
      { id: "aic-rw", label: "61/1 – RW 2" },
      { id: "aic-cbrn", label: "66/1 – CBRN-ErkKW" },
      { id: "aic-dekon", label: "67/1 – Dekon-P" }
    ]
  },
  {
    id: "kuehbach",
    name: "Freiwillige Feuerwehr Kühbach",
    vehicles: [
      { id: "kue-hlf", label: "HLF 20/16", crew: 9 },
      { id: "kue-lf", label: "LF 10 / LF 10 Logistik", crew: 9 },
      { id: "kue-mzf", label: "MZF" }
    ]
  },
  {
    id: "inchenhofen",
    name: "Freiwillige Feuerwehr Inchenhofen",
    vehicles: [
      { id: "inc-hlf", label: "HLF 20", crew: 9 },
      { id: "inc-mzf", label: "MZF" },
      { id: "inc-sfl", label: "49/1 – Sonderlöschfahrzeug" }
    ]
  },
  ...[
    ["haslangkreit", "Freiwillige Feuerwehr Haslangkreit"],
    ["stockensau", "Freiwillige Feuerwehr Stockensau"],
    ["schoenbach", "Freiwillige Feuerwehr Ober-/Unterschönbach"],
    ["unterbernbach", "Freiwillige Feuerwehr Unterbernbach"]
  ].map(([id, name]) => ({
    id,
    name,
    vehicles: [{ id: `${id}-tsf`, label: "TSF", crew: 6 }]
  })),
  {
    id: "kbi",
    name: "Kreisbrandinspektion – KBI",
    personnelOnly: true,
    vehicles: [{ id: "kbi-role", label: "KBI (1 Führungsrolle)", crew: 1 }]
  },
  {
    id: "kbm",
    name: "Kreisbrandinspektion – KBM",
    personnelOnly: true,
    vehicles: [{ id: "kbm-role", label: "KBM (1 Führungsrolle)", crew: 1 }]
  }
];

const form = document.querySelector("#planner-form");
const steps = [...document.querySelectorAll(".form-step")];
const planOutput = document.querySelector("#plan-output");
const favoriteList = document.querySelector("#favorites-list");
const stepTitles = ["Übungsart und Szenario", "Teilnehmende und Ort", "Gruppen und Zeit", "Lageeinspielung"];
let currentStep = 0;
let currentPlan = null;
let selectedRating = 0;

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error("Lokale Daten konnten nicht gelesen werden.", error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Lokale Daten konnten nicht gespeichert werden.", error);
    return false;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function getFieldMessage(field) {
  if (field.validity.valueMissing || (field.required && !field.value.trim())) return "Bitte fülle dieses Pflichtfeld aus.";
  if (field.validity.rangeUnderflow) return `Bitte gib mindestens ${field.min} ein.`;
  if (field.validity.rangeOverflow) return `Bitte gib höchstens ${field.max} ein.`;
  if (field.validity.typeMismatch) return "Bitte gib einen gültigen Wert ein.";
  return "";
}

function showFieldError(field) {
  const error = document.querySelector(`#${field.id}-error`);
  const message = getFieldMessage(field);
  field.setAttribute("aria-invalid", message ? "true" : "false");
  if (error) error.textContent = message;
  return !message;
}

function validateStep(index) {
  let valid = true;
  steps[index].querySelectorAll("input, textarea, select").forEach((field) => {
    if (!showFieldError(field)) valid = false;
  });
  if (index === 2) {
    const participants = Number(form.elements.participants.value);
    const groupCount = Number(form.elements.groupCount.value);
    if (participants && groupCount && participants < groupCount) {
      const field = form.elements.groupCount;
      field.setAttribute("aria-invalid", "true");
      document.querySelector("#groupCount-error").textContent = "Es muss mindestens eine teilnehmende Person je Übungstrupp geben.";
      valid = false;
    }
  }
  if (!valid) steps[index].querySelector(":invalid")?.focus();
  return valid;
}

function setStep(index) {
  currentStep = index;
  steps.forEach((step, stepIndex) => { step.hidden = stepIndex !== index; });
  document.querySelector("#step-count").textContent = `Schritt ${index + 1} von ${steps.length}`;
  document.querySelector("#step-title").textContent = stepTitles[index];
  document.querySelector(".progress-track").setAttribute("aria-valuenow", String(index + 1));
  document.querySelector("#progress-fill").style.width = `${((index + 1) / steps.length) * 100}%`;
  document.querySelector("#back-button").hidden = index === 0;
  document.querySelector("#next-button").hidden = index === steps.length - 1;
  document.querySelector("#create-button").hidden = index !== steps.length - 1;
}

function formValues() {
  const data = new FormData(form);
  return {
    ...Object.fromEntries(data.entries()),
    fireVehicles: [...form.querySelectorAll('input[name="fireVehicle"]:checked')].map((input) => input.value),
    partnerTypes: [...form.querySelectorAll('input[name="partnerType"]:checked')].map((input) => input.value),
    parallelIncidentEnabled: form.elements.parallelIncidentEnabled.checked,
    countyUnits: getSelectedCountyUnits(),
    otherCountyUnits: form.elements.otherCountyUnits.value.trim()
  };
}

function updateParallelIncidentFields() {
  const isUnchanged = form.elements.injectType.value === "unchanged";
  const parallelOption = document.querySelector("#parallel-incident-option");
  const detailsField = document.querySelector("#parallel-incident-details-field");
  const details = form.elements.parallelIncidentDetails;
  parallelOption.hidden = !isUnchanged;
  detailsField.hidden = !isUnchanged || !form.elements.parallelIncidentEnabled.checked;
  details.required = isUnchanged && form.elements.parallelIncidentEnabled.checked;
  if (!details.required) {
    details.removeAttribute("aria-invalid");
    document.querySelector("#parallelIncidentDetails-error").textContent = "";
  }
}

function updateUnitPlanningVisibility() {
  const isOperationalPlanspiel = ["einsatzablauf", "mixed"].includes(form.elements.exerciseType.value);
  document.querySelector("#unit-planning-fields").hidden = !isOperationalPlanspiel;
  updateParticipantEstimate();
}

function updateFireExtentVisibility() {
  const field = document.querySelector("#fire-extent-field");
  const isFireScenario = fireScenarioIds.has(form.elements.scenarioId.value);
  field.hidden = !isFireScenario;
  if (!isFireScenario) form.elements.fireExtent.value = "";
}

function getSelectedCountyUnits() {
  const selectedVehicleIds = new Set(
    [...document.querySelectorAll("[data-station-vehicle]:checked")].map((input) => input.value)
  );
  return [...form.querySelectorAll('input[name="countyStation"]:checked')].map((input) => {
    const station = districtFireDepartments.find((item) => item.id === input.value);
    const vehicles = station.vehicles.length === 1
      ? station.vehicles
      : station.vehicles.filter((vehicle) => selectedVehicleIds.has(vehicle.id));
    return { id: station.id, name: station.name, vehicles };
  });
}

function participantEstimate() {
  if (!["einsatzablauf", "mixed"].includes(form.elements.exerciseType.value)) {
    return { knownPersonnel: 0, unknownVehicles: [], selectedVehicleCount: 0 };
  }
  const countyVehicles = getSelectedCountyUnits().flatMap((unit) => unit.vehicles);
  const selectedOwnVehicles = [...form.querySelectorAll('input[name="fireVehicle"]:checked')].map((input) => input.value);
  const ownVehicleCrews = {
    "HLF 10": 9, "HLF 20": 9, "LF 10": 9, "LF 20": 9,
    TSF: 6, "TSF-W": 6, RW: 3
  };
  const knownPersonnel = countyVehicles.reduce((total, vehicle) => total + (vehicle.crew || 0), 0)
    + selectedOwnVehicles.reduce((total, type) => total + (ownVehicleCrews[type] || 0), 0);
  const unknownVehicles = countyVehicles.filter((vehicle) => !vehicle.crew).map((vehicle) => vehicle.label);
  const unknownOwnVehicles = selectedOwnVehicles.filter((type) => !ownVehicleCrews[type]);
  return {
    knownPersonnel,
    unknownVehicles: [...unknownVehicles, ...unknownOwnVehicles],
    selectedVehicleCount: countyVehicles.length + selectedOwnVehicles.length
  };
}

function updateParticipantEstimate() {
  const field = form.elements.participants;
  const hint = document.querySelector("#participants-hint");
  const estimate = participantEstimate();
  if (!estimate.selectedVehicleCount) {
    if (field.dataset.autoEstimate === "true") field.value = "";
    delete field.dataset.autoEstimate;
    hint.textContent = "Bei ausgewählten Fahrzeugtypen und Landkreis-Führungsrollen wird ein normtypischer Vollbesetzungs-Richtwert eingetragen. Örtliche Besatzung bitte prüfen; du kannst den Wert anpassen.";
    return;
  }
  if (estimate.knownPersonnel) {
    field.value = String(estimate.knownPersonnel);
    field.dataset.autoEstimate = "true";
    hint.textContent = `${estimate.knownPersonnel} Teilnehmende als Richtwert bei normtypischer Vollbesetzung eingetragen${estimate.unknownVehicles.length ? `; für ${estimate.unknownVehicles.join(", ")} ist keine Besatzungszahl hinterlegt` : ""}. Örtliche Besatzungen prüfen; du kannst den Wert anpassen.`;
  } else {
    if (field.dataset.autoEstimate === "true") field.value = "";
    delete field.dataset.autoEstimate;
    hint.textContent = `Für die ausgewählten Fahrzeuge ${estimate.unknownVehicles.join(", ")} ist keine Besatzungszahl hinterlegt. Bitte die tatsächliche Übungsgruppe selbst eintragen.`;
  }
}

function renderCountyUnitVehicleSelections() {
  const selectedVehicleIds = new Set(
    [...document.querySelectorAll("[data-station-vehicle]:checked")].map((input) => input.value)
  );
  const selectedStations = [...form.querySelectorAll('input[name="countyStation"]:checked')]
    .map((input) => districtFireDepartments.find((item) => item.id === input.value));
  const container = document.querySelector("#county-unit-vehicle-selections");
  if (!selectedStations.length) {
    container.innerHTML = "";
    updateParticipantEstimate();
    return;
  }
  container.innerHTML = selectedStations.map((station) => {
    if (station.personnelOnly) {
      return `<section class="county-unit-card"><h4>${escapeHTML(station.name)}</h4><p>Als einzelne Führungsrolle ausgewählt. Für die Teilnehmendenzahl wird eine Person als Richtwert angesetzt; örtlich bestätigen.</p></section>`;
    }
    if (station.vehicles.length === 1) {
      const vehicle = station.vehicles[0];
      return `<section class="county-unit-card"><h4>${escapeHTML(station.name)}</h4><p>Automatisch ausgewähltes Einzelfahrzeug: <strong>${escapeHTML(vehicle.label)}</strong>${vehicle.crew ? ` · normtypische Besatzung: ${vehicle.crew} Personen` : ""}</p></section>`;
    }
    return `<section class="county-unit-card"><h4>${escapeHTML(station.name)} – Fahrzeuge fürs Planspiel auswählen</h4><div class="unit-choice-grid">${station.vehicles.map((vehicle) => `<label><input type="checkbox" data-station-vehicle="${escapeHTML(station.id)}" value="${escapeHTML(vehicle.id)}"${selectedVehicleIds.has(vehicle.id) ? " checked" : ""}> ${escapeHTML(vehicle.label)}${vehicle.crew ? ` · ${vehicle.crew} Personen` : ""}</label>`).join("")}</div><small class="field-hint">Bei mehreren Fahrzeugen nur die gewünschten Fahrzeuge markieren. Für Typen ohne normtypische Besatzungsangabe keine Personenzahl ableiten.</small></section>`;
  }).join("");
  updateParticipantEstimate();
}

const scenarioSizeLevels = [
  {
    maxUnits: 1,
    label: "Kompakt",
    briefing: "Eine Einheit bearbeitet ein gemeinsames Lagebild. Der Schwerpunkt liegt auf sauberer Informationsordnung, Rollenklärung und einer kurzen Übergabe.",
    workstreams: ["Eine gemeinsame Lageübersicht erstellen und offene Punkte sichtbar halten."],
    additionalInjects: []
  },
  {
    maxUnits: 3,
    label: "Mehrere Einheiten",
    briefing: "Mehrere Einheiten bearbeiten abgegrenzte Teilaufträge. Die Übungsleitung plant mindestens eine koordinierte Rückmeldung und eine gemeinsame Zusammenführung der Informationen ein.",
    workstreams: [
      "Teilaufträge für die gewählten Einheiten schriftlich abgrenzen und je eine Ansprechrolle benennen.",
      "Eine gemeinsame Informationsübergabe mit Rückfrage und Bestätigung einplanen."
    ],
    additionalInjects: ["Zwei Einheiten erhalten unterschiedliche, ausdrücklich unbestätigte Angaben zum gleichen Orts- oder Zeitmerkmal. Die Gruppe soll die Abweichung markieren und eine gemeinsame Klärungsfrage formulieren."]
  },
  {
    maxUnits: Infinity,
    label: "Große, mehrteilige Lage",
    briefing: "Die vielen ausgewählten Einheiten vergrößern das Planspiel zu mehreren parallelen Teilbereichen. Zusätzlich zur Lageklärung sind ein gemeinsamer Überblick, abgestimmte Übergaben, Priorisierung offener Fragen und ein dokumentierter Abschluss nötig.",
    workstreams: [
      "Teilbereiche und Zuständigkeiten je ausgewählter Einheit dokumentieren; parallele Informationen in einer gemeinsamen Übersicht zusammenführen.",
      "Eine zentrale Rückmelderolle und einen zweiten Prüf- oder Beobachtungsauftrag festlegen.",
      "Abhängigkeiten, unklare Zuständigkeiten und gemeinsam genutzte Planspielressourcen ausdrücklich markieren."
    ],
    additionalInjects: [
      "Eine kontrollierte Textkarte meldet, dass eine Information noch nicht bestätigt ist. Die Gruppe kennzeichnet, welche Teilbereiche davon betroffen sind, ohne die Angabe als Tatsache zu übernehmen.",
      "Eine zweite Karte ändert eine nicht gefährdende Rahmenbedingung, etwa die Verfügbarkeit einer Planspiel-Rückmeldung. Die Einheiten müssen ihre Aufgabenübersicht aktualisieren und die Änderung gemeinsam bestätigen."
    ]
  }
];

function scenarioSizeFor(unitCount) {
  return scenarioSizeLevels.find((level) => unitCount <= level.maxUnits) || scenarioSizeLevels[scenarioSizeLevels.length - 1];
}

function chooseTemplate(goal, recent) {
  const normalizedGoal = goal.toLocaleLowerCase("de");
  const scored = templates.map((template) => ({
    template,
    matches: template.keywords.filter((keyword) => normalizedGoal.includes(keyword)).length
  }));
  const bestMatch = Math.max(...scored.map((entry) => entry.matches));
  const candidates = bestMatch
    ? scored.filter((entry) => entry.matches === bestMatch).map((entry) => entry.template)
    : templates;
  const unused = candidates.filter((template) => !recent.includes(template.id));
  const pool = unused.length ? unused : candidates;
  return pool[Math.floor(Math.random() * pool.length)];
}

function exerciseFormat(type, injectMinute) {
  const formats = {
    einsatzablauf: {
      label: "Kompletter Einsatzablauf als Planspiel",
      steps: [
        { title: "Fiktiver Alarm und Auftrag", text: "Das klar als fiktiv markierte Übungs-Alarmfax ausgeben. Auftrag, Rollen, Zeitrahmen und Stoppsignal erläutern; keine echte Alarmierung oder Einsatzkommunikation auslösen." },
        { title: "Simulierte Anfahrt auf der Planspielkarte", text: "Die Gruppe markiert die gedachte Anfahrt nur mit einem Symbol auf einer neutralen Karte und benennt offene Ortsfragen. Keine reale Fahrt, kein Fahrzeugbetrieb, keine Sondersignale und kein Funk." },
        { title: "Simulierte Ankunft und Lagebild", text: "Die Übungsleitung gibt Szenenbild und vorbereitete Textkarten aus. Die Gruppe trennt bestätigte Informationen, Annahmen und offene Gefahren; keine Lage wird praktisch aufgesucht oder nachgestellt." },
        { title: "Abstimmung und kontrollierte Änderung", text: `Trupps erstellen ihre vereinbarten Lage- und Kommunikations-Ergebnisse. Bei Minute ${injectMinute} eine kontrollierte Planspielkarte einspielen; keine praktischen Einsatzhandlungen durchführen.` },
        { title: "Fiktiver Abschluss und Nachbesprechung", text: "Übung ausdrücklich beenden, Erkenntnisse und offene Fragen besprechen und festhalten, was durch die Ausbildungsleitung fachlich nachbereitet werden muss." }
      ]
    },
    theorie: {
      label: "Theorieübung mit Quellen",
      steps: [
        { title: "Lernziel und Vorwissen", text: "Lernziel und Fragen zum gewählten Übungsthema klären. Die verlinkten Lernangebote dienen als Einstieg; Inhalte und Gültigkeit vorab fachlich prüfen." },
        { title: "Theorie anhand geprüfter Quellen", text: "Passende Abschnitte aus den verlinkten Lernangeboten gemeinsam lesen und die für die örtliche Ausbildung relevanten Begriffe besprechen." },
        { title: "Fallbeispiel und Verständnisfragen", text: "Das fiktive Übungs-Alarmfax als Diskussionsfall nutzen. Bekannte Fakten, Annahmen, offene Fragen und Grenzen der eigenen Zuständigkeit unterscheiden." },
        { title: "Wissensabgleich", text: `Bei Minute ${injectMinute} eine zusätzliche Frage oder abweichende Textangabe vorlegen. Aussagen mit der geprüften Theorie vergleichen; keine Einsatzmaßnahmen praktisch darstellen.` },
        { title: "Zusammenfassung und Nachbesprechung", text: "Die Gruppe formuliert die wichtigsten Lernpunkte, offene fachliche Fragen und mögliche nächste Theorie-Themen." }
      ]
    },
    mixed: {
      label: "Gemischte Übung: Theorie und Planspiel",
      steps: [
        { title: "Lernziel und sichere Grenzen", text: "Ziele, Zeitrahmen, Rollen und Stoppsignal erklären. Beide Teile sind Theorie und fiktives Planspiel; keine reale Einsatzfahrt oder Einsatzhandlung." },
        { title: "Theorie-Einstieg mit Quellen", text: "Ausgewählte Inhalte aus den verlinkten Lernangeboten gemeinsam durchgehen. Die Ausbildungsleitung prüft vorher, ob sie für den örtlichen Ausbildungsstand passen." },
        { title: "Szenario im Planspiel bearbeiten", text: "Übungs-Alarmfax und Szenenbild ausgeben. Trupps ordnen Fakten, offene Fragen, Rollen und benötigte Rückmeldungen." },
        { title: "Planspiel-Einspielung und Rückbezug", text: `Bei Minute ${injectMinute} eine kontrollierte Textkarte ergänzen. Die Gruppe prüft, welche Theoriefragen berührt sind und was weiter offenbleibt.` },
        { title: "Ergebnisse und Lerntransfer", text: "Theorie und Planspiel-Ergebnisse zusammenführen, Erkenntnisse festhalten und ungeklärte Fachfragen für die Ausbildungsleitung markieren." }
      ]
    },
    kommunikation: {
      label: "Kommunikations- und Zusammenarbeitsübung",
      steps: [
        { title: "Ziel, Rollen und Gesprächsregeln", text: "Lernziel, Gruppenrollen, respektvolle Gesprächsregeln und Stoppsignal vereinbaren." },
        { title: "Fiktive Informationen verteilen", text: "Jeder Trupp erhält Textkarten. Die Gruppe vereinbart eine nachvollziehbare Form für Rückfragen und Zusammenfassungen; kein reales Funkgerät verwenden." },
        { title: "Lagebild gemeinsam erstellen", text: "Informationen austauschen, bestätigte Angaben von Vermutungen trennen und offene Fragen sichtbar dokumentieren." },
        { title: "Änderung und Übergabe", text: `Bei Minute ${injectMinute} eine kontrollierte Textänderung einspielen. Anschließend üben die Gruppen eine klare verbale oder schriftliche Übergabe.` },
        { title: "Reflexion", text: "Rollenverständnis, Verständlichkeit und Zusammenarbeit anhand konkreter Beobachtungen besprechen." }
      ]
    },
    material: {
      label: "Material- und Gerätekunde (Theorie)",
      steps: [
        { title: "Lernziel und Grenzen", text: "Lernziel und freigegebene Unterlagen festlegen. Diese Einheit ist ein Theoriegespräch; keine Geräte praktisch bedienen." },
        { title: "Materialliste gemeinsam prüfen", text: "Eingegebene Materialien auf der Liste zuordnen und für jede fachliche Aussage die örtlich gültigen Unterlagen oder Ausbilderinnen und Ausbilder heranziehen." },
        { title: "Abhängigkeiten und offene Punkte", text: "Trupps markieren ungeklärte Eignung, Verfügbarkeit, Zuständigkeit und notwendige Prüfungen, ohne Annahmen als Fakten zu behandeln." },
        { title: "Änderung als Textkarte", text: `Bei Minute ${injectMinute} eine fiktive Änderung an der Materialliste vorlegen und Auswirkungen auf die Planung besprechen; nichts real entfernen oder manipulieren.` },
        { title: "Lernpunkte festhalten", text: "Wichtige Begriffe, ungeklärte Fragen und erforderliche fachliche Nacharbeit festhalten." }
      ]
    }
  };
  return formats[type] || formats.mixed;
}

function makePlan(data) {
  const recent = readStorage(STORAGE_KEYS.recent, []);
  const template = templates.find((item) => item.id === data.scenarioId) || chooseTemplate(data.objective, recent);
  const repeatCount = recent.includes(template.id) ? 1 : 0;
  const unitPlanningEnabled = ["einsatzablauf", "mixed"].includes(data.exerciseType);
  const countyUnits = unitPlanningEnabled ? data.countyUnits || [] : [];
  const fireVehicles = unitPlanningEnabled ? data.fireVehicles || [] : [];
  const partnerTypes = unitPlanningEnabled ? data.partnerTypes || [] : [];
  const selectedCountyUnitCount = countyUnits.reduce((total, unit) => total + Math.max(unit.vehicles.length, 1), 0);
  const manuallyListedUnitCount = unitPlanningEnabled
    ? String(data.otherCountyUnits || "").split(/\n+/).filter((line) => line.trim()).length
    : 0;
  const selectedUnitCount = selectedCountyUnitCount + fireVehicles.length
    + partnerTypes.length + manuallyListedUnitCount;
  const scenarioSize = scenarioSizeFor(selectedUnitCount);
  const total = Number(data.duration);
  const shares = [0.12, 0.18, 0.5, 0.12, 0.08];
  const segments = shares.map((share) => Math.floor(total * share));
  let remainder = total - segments.reduce((sum, minutes) => sum + minutes, 0);
  const fractionalOrder = shares
    .map((share, index) => ({ index, fraction: total * share - segments[index] }))
    .sort((left, right) => right.fraction - left.fraction);
  for (let index = 0; index < remainder; index += 1) segments[fractionalOrder[index].index] += 1;
  const equipment = String(data.materials || "").split(/[,;\n]+/).map((item) => item.trim()).filter(Boolean);
  const participants = Number(data.participants);
  const groupCount = Number(data.groupCount);
  const peoplePerGroup = Array.from({ length: groupCount }, (_, index) =>
    Math.floor(participants / groupCount) + (index < participants % groupCount ? 1 : 0)
  );
  const groupRoles = [
    {
      title: "Lagebild und offene Fragen",
      task: "Ordnet die ausgegebenen fiktiven Informationen in „bestätigt“, „unklar“ und „fehlt“. Formuliert ein gemeinsames Lagebild und kennzeichnet Annahmen ausdrücklich.",
      output: "Kurze Lageübersicht mit offenen Fragen und klar benannten Annahmen."
    },
    {
      title: "Aufgaben und Abstimmung",
      task: "Entwickelt eine nachvollziehbare Rollen- und Aufgabenverteilung für die Planspielaufgabe. Legt fest, wie Rückmeldungen zusammengeführt und offene Entscheidungen kenntlich gemacht werden.",
      output: "Rollenübersicht, vereinbarter Rückmeldeweg und offene Entscheidungen."
    },
    {
      title: "Material und Abhängigkeiten",
      task: "Gleicht die optional ergänzte Materialliste mit dem Ausbildungsziel ab. Wenn keine Sondermaterialien eingetragen sind, bleibt die Materialplanung offen; leitet aus Fahrzeugtypen keine tatsächliche Beladung oder Einsatztauglichkeit ab.",
      output: "Materialübersicht mit Zuordnung, Abhängigkeiten und Klärungsbedarf."
    },
    {
      title: "Beobachtung und Rückmeldung",
      task: "Beobachtet, ob Informationen verständlich weitergegeben, Rückfragen gestellt und unterschiedliche Einschätzungen sichtbar gemacht werden. Haltet konkrete Beispiele für die Nachbesprechung fest.",
      output: "Zwei beobachtete Stärken und ein konkreter Lernpunkt."
    },
    {
      title: "Rahmenbedingungen und Entscheidung",
      task: "Prüft, welche Angaben für eine sichere und nachvollziehbare Entscheidung noch fehlen. Formuliert, was vor einer Entscheidung geklärt werden müsste, statt fehlende Fakten zu ergänzen.",
      output: "Liste notwendiger Klärungen und begründete nächste Gesprächsschritte."
    },
    {
      title: "Zusammenführung und Kurzbericht",
      task: "Fasst die Beiträge der anderen Trupps zusammen. Prüft, ob bestätigte Informationen, Annahmen, Materialstatus und offene Fragen getrennt und verständlich dargestellt sind.",
      output: "Ein gemeinsamer Kurzbericht mit getrennten Fakten, Annahmen und offenen Punkten."
    }
  ];
  const groups = peoplePerGroup.map((people, index) => {
    const role = groupRoles[index % groupRoles.length];
    const scenarioTask = template.tasks[index % template.tasks.length];
    const assignedEquipment = equipment.filter((_, equipmentIndex) => equipmentIndex % groupCount === index);
    const coordinationTask = scenarioSize.workstreams[index % scenarioSize.workstreams.length];
    return {
      number: index + 1,
      people,
      instructor: (index % Number(data.instructors)) + 1,
      ...role,
      task: `${scenarioTask} ${role.task}${selectedUnitCount > 1 ? ` ${coordinationTask}` : ""}`,
      materials: assignedEquipment
    };
  });
  if (groupCount === 1) {
    groups[0].title = "Gemeinsamer Trupp";
    groups[0].task = `Bearbeitet nacheinander die Szenarioaufträge: ${template.tasks.join(" ")} Ordnet bestätigte Angaben, Annahmen, offene Fragen und die Materialzuordnung gemeinsam anhand der Szenariokarte; bereitet eine gemeinsame Kurzmeldung für die Nachbesprechung vor.`;
    groups[0].output = "Ein gemeinsames Lagebild, eine abgestimmte Rollen- und Materialübersicht, dokumentierte Rückfragen und Annahmen sowie ein kurzer Ergebnisbericht für die Nachbesprechung.";
  }
  const instructorCount = Number(data.instructors);
  const instructorDuties = Array.from({ length: instructorCount }, (_, index) => {
    const duties = [
      "Übungsleitung: Auftrag und Grenzen erklären, Zeitplan und Einspielung steuern, bei Bedarf unterbrechen und die Auswertung moderieren.",
      "Sicherheitsbeobachtung: Ort, Ablauf und Teilnehmende im Blick behalten; auf das vereinbarte Stoppsignal achten und die Übung bei Bedenken sofort anhalten.",
      "Material und Dokumentation: Übungsmaterial ausgeben und zurücknehmen, die Einspielung nach Zeitplan vorlesen und offene Punkte notieren."
    ];
    return `Ausbilder/in ${index + 1}: ${duties[index] || "Zugeordnete Trupps beobachten, Rückmeldungen notieren und sicherstellen, dass keine realen Einsatzhandlungen oder Kommunikationswege nachgestellt werden."}`;
  });
  const title = `${template.theme} – ${data.audience}`;
  const id = `plan-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  const rerunDetails = repeatCount
    ? "Diesmal mit geänderter Rollenverteilung und einer Zusatzaufgabe: Eine Person beobachtet, welche Informationen noch fehlen, bevor das Team seine Zusammenfassung abschließt."
    : template.variant;
  const effortNote = {
    gering: "Ein kurzer Aufbau mit vorhandenen Materialien und einer klaren Aufgabenstellung.",
    mittel: "Eine vorbereitete Lagebeschreibung und mindestens ein Beobachtungspunkt.",
    hoch: "Mehrere vorbereitete Informationsbausteine und getrennte Beobachtungsrollen; Aufwand vorab realistisch abstimmen."
  }[data.effort];
  const injects = {
    missing: {
      title: "Informationslücke",
      card: "Eine fiktive Meldung enthält zunächst keine Angabe, die für die gemeinsame Einordnung nötig ist. Die Gruppe soll benennen, was fehlt, wer es klären müsste und was bis dahin ausdrücklich offenbleibt."
    },
    conflict: {
      title: "Widersprüchliche Informationen",
      card: "Eine zweite fiktive Karte enthält eine abweichende Angabe. Beide Angaben bleiben zunächst unbestätigt. Die Gruppe soll den Widerspruch sichtbar machen, eine Rückfrage formulieren und keine der Angaben als Tatsache behandeln."
    },
    unavailable: {
      title: "Übungsmaterial im Planspiel nicht verfügbar",
      card: "Die Übungsleitung markiert ein eingeplantes Material als im Szenario nicht verfügbar. Nichts wird real entfernt, blockiert oder im Betrieb vorenthalten. Die Gruppe benennt Auswirkungen auf ihren Plan und welche sichere Klärung erforderlich wäre."
    },
    change: {
      title: "Geänderte Rahmenbedingung",
      card: "Die Übungsleitung gibt eine vorher geprüfte, nicht gefährdende Änderung der Planspiel-Rahmenbedingung bekannt. Die Gruppe erläutert, welche Annahmen oder Aufgaben davon betroffen sind und was neu abgestimmt werden muss."
    },
    unchanged: {
      title: "Keine Lageänderung – Ausgangslage bleibt unverändert",
      card: "Die fiktive Ausgangslage bleibt während der Übung unverändert. Es wird keine zusätzliche Meldung eingespielt."
    }
  }[data.injectType];
  const parallelIncidentDetails = String(data.parallelIncidentDetails || "").trim();
  const parallelIncident = data.injectType === "unchanged"
    && data.parallelIncidentEnabled
    && parallelIncidentDetails
    ? { details: parallelIncidentDetails }
    : null;
  const phaseStart = segments.slice(0, 2).reduce((sum, minutes) => sum + minutes, 0);
  const injectMinute = phaseStart + Math.max(1, Math.floor(segments[2] / 2));
  const format = exerciseFormat(data.exerciseType, injectMinute);
  const formatSteps = format.steps.map((step, index) => {
    if (index !== 3 || data.injectType !== "unchanged") return step;
    return parallelIncident
      ? {
        ...step,
        title: "Parallele Einsatzmeldung kommt dazu",
        text: `Bei Minute ${injectMinute} die von der Ausbildungsleitung geprüfte, parallele Meldung als separate Textkarte ergänzen. Die Ausgangslage bleibt unverändert. Die Gruppe hält beide Vorgänge getrennt und benennt offene Informationen und Abstimmungsbedarfe. Keine echte Alarmierung, Kommunikation oder Einsatzhandlung.`
      }
      : {
        ...step,
        title: "Ausgangslage bleibt unverändert",
        text: "Keine zusätzliche Information einspielen. Die Gruppe bearbeitet die Ausgangslage und hält offene Fragen fest."
      };
  });
  const scenarioDetails = String(data.scenarioDetails || "").trim();
  const fireExtent = fireScenarioIds.has(template.id) ? data.fireExtent || "" : "";
  const scenarioInfo = exercisePacketData({
    templateId: template.id,
    effort: data.effort,
    materials: equipment,
    scenarioDetails,
    fireExtent
  });
  if (selectedUnitCount > 1) {
    scenarioInfo.howMany += ` Im Planspiel ${selectedUnitCount} ausgewählte Einheit(en)/Fahrzeuggruppen; tatsächliche Besatzung und Alarmierung sind nicht gemeint.`;
    scenarioInfo.difficulty += ` ${scenarioSize.briefing}`;
  }
  const theoryResources = [
    {
      title: `Themenrecherche: ${scenarioInfo.theoryQuery} (Feuerwehr-Lernbar)`,
      url: `https://www.feuerwehr-lernbar.bayern/search?search=${encodeURIComponent(scenarioInfo.theoryQuery)}`,
      description: "Dynamische Suche im Lernportal des Landesfeuerwehrverbands Bayern; Treffer vor Nutzung fachlich prüfen."
    },
    {
      title: "FwDV 3 – Einheiten im Lösch- und Hilfeleistungseinsatz (Feuerwehr-Lernbar Bayern)",
      url: "https://www.feuerwehr-lernbar.bayern/search?search=FwDV%203",
      description: "Dynamische Suche im Lernportal; konkretes Dokument, aktuelle Fassung und örtliche Ergänzungen vor Verwendung prüfen."
    },
    {
      title: "Ausbildung der Feuerwehren in Bayern (Bayerisches Innenministerium)",
      url: "https://www.stmi.bayern.de/a-z/anzeigen/feuerwehrausbildung/",
      description: "Offizielle Hinweise zur Feuerwehrausbildung und den Zuständigkeiten in Bayern."
    },
    {
      title: "Staatliche Feuerwehrschulen in Bayern",
      url: "https://www.feuerwehrschulen.bayern.de/",
      description: "Offizielle Übersicht und Kontaktdaten der drei Staatlichen Feuerwehrschulen; konkrete aktuelle Ausbildungsunterlagen bei der zuständigen Schule erfragen."
    }
  ];
  const scenarioInject = parallelIncident || data.injectType === "unchanged" || data.effort === "gering" || !scenarioInfo.twist
    ? injects
    : {
      ...injects,
      card: `${injects.card} Szenariospezifische Zusatzkarte: ${scenarioInfo.twist}`
    };
  if (parallelIncident) {
    scenarioInject.title = "Parallele Einsatzmeldung kommt dazu – Ausgangslage bleibt unverändert";
    scenarioInject.card = `Die ursprüngliche Planspiel-Lage bleibt unverändert. Zusätzliche parallele Meldung laut Eingabe der Ausbildungsleitung: „${parallelIncident.details}“ Diese Angabe ausschließlich als separate Planspiel-Textkarte verwenden; keine weiteren Details ergänzen und keine echte Alarmierung, Kommunikation oder Einsatzhandlung auslösen.`;
  }
  const countyVehicles = countyUnits.flatMap((unit) => unit.vehicles);
  const ownVehicleCrews = { "HLF 10": 9, "HLF 20": 9, "LF 10": 9, "LF 20": 9, TSF: 6, "TSF-W": 6, RW: 3 };
  const ownVehicleCrew = fireVehicles.reduce((total, type) => total + (ownVehicleCrews[type] || 0), 0);
  const countyCrewEstimate = {
    knownPersonnel: countyVehicles.reduce((total, vehicle) => total + (vehicle.crew || 0), 0) + ownVehicleCrew,
    vehiclesWithoutStaffingData: countyVehicles.filter((vehicle) => !vehicle.crew).map((vehicle) => vehicle.label),
    stationsWithoutVehicleSelection: countyUnits
      .filter((unit) => {
        const station = districtFireDepartments.find((item) => item.id === unit.id);
        return station && !station.personnelOnly && station.vehicles.length > 1 && !unit.vehicles.length;
      })
      .map((unit) => unit.name)
  };
  const materialAssignment = equipment.length
    ? "Die gesamte Gruppe behandelt gemeinsam eine fiktive Szenariokarte. Zusätzlich eingetragene Materialien sind den Gruppen nach Eingabereihenfolge zugeordnet; gemeinsame Nutzung und tatsächliche Eignung legt ausschließlich die Ausbildungsleitung fest."
    : "Die gesamte Gruppe behandelt gemeinsam eine fiktive Szenariokarte. Keine zusätzlichen Übungsmaterialien eingetragen. Fahrzeugbeladungen werden nicht angenommen; Sondermaterial und lokale Verfügbarkeit bei Bedarf vorab ergänzen und prüfen.";

  return {
    id, title, createdAt: new Date().toISOString(), templateId: template.id,
    exerciseType: data.exerciseType, exerciseTypeName: format.label,
    objective: data.objective, audience: data.audience, location: data.location,
    scenarioDetails, fireExtent,
    experienceLevel: data.experienceLevel, participants, groupCount, peoplePerGroup,
    instructorCount, duration: total, effort: data.effort, materials: equipment, mustUse: data.mustUse.trim(),
    fireVehicles,
    fireUnitDetails: String(data.fireUnitDetails || "").trim(),
    partnerTypes,
    partnerUnitDetails: String(data.partnerUnitDetails || "").trim(),
    countyUnits,
    otherCountyUnits: String(data.otherCountyUnits || "").trim(),
    countyCrewEstimate,
    scenarioSize: {
      label: scenarioSize.label,
      unitCount: selectedUnitCount,
      briefing: scenarioSize.briefing,
      workstreams: scenarioSize.workstreams,
      additionalInjects: data.injectType === "unchanged" ? [] : scenarioSize.additionalInjects
    },
    instructorDuties, groups,
    situation: scenarioInfo.situation || `${template.situation}${scenarioDetails ? ` Zusätzliche unbestätigte Planspiel-Angabe: ${scenarioDetails}` : ""}`,
    potentialHazards: scenarioHazardsFor(template.id, scenarioDetails),
    inject: scenarioInject,
    parallelIncident,
    injectMinute, materialAssignment, theoryResources,
    preparation: `${template.preparation} ${effortNote}`,
    steps: formatSteps.map((step, index) => ({ ...step, time: segments[index] })),
    participantTasks: template.tasks,
    observationPoints: [
      "Sind bestätigte Angaben, Annahmen und fehlende Informationen klar voneinander getrennt?",
      "Wurden Rückfragen gestellt und widersprüchliche Angaben offen benannt?",
      ...(parallelIncident ? ["Blieb die Ausgangslage unverändert und wurde die zusätzliche Meldung gemäß der Eingabe getrennt dargestellt und dokumentiert?"] : []),
      "Waren Rollen, Zuständigkeiten und Rückmeldungen für alle verständlich?",
      "Wurde das Material nur als freigegebenes Übungsmaterial betrachtet und seine Verfügbarkeit transparent gemacht?",
      "Wurde bei Unsicherheit oder Sicherheitsbedenken das vereinbarte Stoppsignal genutzt?"
    ],
    preparationChecklist: [
      "Ausbildungsziel, Teilnehmendenzahl, Ausbildungsstand, Barrierefreiheit und Aufgaben vorab fachlich prüfen und an die örtlichen Regeln anpassen.",
      `Ort ${data.location} prüfen: sicheren, geeigneten Bereich, Zugänglichkeit, Wetter-/Umgebungsbedingungen und störungsfreie Planspiel-Organisation festlegen.`,
      "Alle aufgelisteten Materialien auf Freigabe und sichere Verwendung als Übungsmaterial prüfen; Zuordnung vorbereiten und Verfügbarkeit vor Beginn bestätigen.",
      `Die Einspielung „${injects.title}“ als Karte oder mündlichen Planspiel-Text vorbereiten. Keine realen Funkgeräte, Notrufnummern, Alarmierungen oder Einsatzkanäle verwenden.`,
      "Ausbilderteam, Beobachtungsaufträge, Einspielzeitpunkt und ein für alle bekanntes Stoppsignal vorab abstimmen.",
      "Teilnehmenden vor Start erklären: fiktives Planspiel, keine realen Gefahren und jederzeitiges Unterbrechen bei Bedenken."
    ],
    safety: [
      "Vor Durchführung sämtliche Aufgaben, Materialzuordnungen und Einspielungen fachlich und örtlich durch die verantwortliche Ausbildungsleitung prüfen und anpassen.",
      "Alle Lageänderungen ausschließlich als kontrollierte Planspielkarte oder verbale Übungsinformation einspielen; nichts real verknappen, manipulieren oder als Gefahr nachstellen.",
      "Keine reale Anfahrt, Einsatzfahrt, Sondersignale, Notrufe, Alarmierungen, Einsatzkommunikation oder gefährlichen Gerätehandlungen aus dieser Planung ableiten oder nachstellen.",
      "Bei Gefahr, Unsicherheit, gesundheitlicher Beeinträchtigung oder Wunsch einer teilnehmenden Person sofort stoppen; erst nach Klärung durch die verantwortliche Leitung fortfahren.",
      "Örtliche Vorgaben, Qualifikation, Zuständigkeiten und notwendige Schutzmaßnahmen haben immer Vorrang. Dieser Vorschlag ist keine offizielle Vorgabe."
    ],
    variants: [rerunDetails, "Für eine zweite Runde nur die Rollen wechseln oder eine andere kontrollierte Informationskarte verwenden. Lernziel, Sicherheitsgrenzen und Nachbesprechung beibehalten."],
    debrief: [
      "Was hat bei der Zusammenarbeit und Aufgabenverteilung gut funktioniert?",
      "Wie hat der Trupp die Lageeinspielung aufgenommen und den Umgang mit Unsicherheit begründet?",
      "Welche Information oder Abstimmung hätte noch geholfen?",
      "Waren Materialzuordnung, Rollen und Rückmeldungen praktikabel?",
      "Was nehmen wir als konkreten, überprüfbaren Lernpunkt in die nächste Übung mit?"
    ],
    wishes: data.wishes.trim()
  };
}

function listHTML(items) {
  return items.length
    ? `<ul>${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`
    : "<p>Keine zusätzlichen Materialien angegeben.</p>";
}

function exercisePacketData(plan) {
  const scenarios = {
    teamkommunikation: {
      title: "Zeitversetzte Informationen am Übungsobjekt",
      where: "Fiktives Übungsobjekt A auf einer nicht maßstabsgetreuen Planspielkarte",
      what: "Zu einem fiktiven Übungsobjekt gehen zwei zeitversetzte Textmeldungen ein.",
      who: "Eine fiktive meldende Person; Name und Erreichbarkeit sind nicht Teil des Planspiels.",
      howMany: "1 Übungsobjekt; Zahl betroffener Personen nicht bekannt.",
      known: "Zwei vorbereitete Textmeldungen; ihr Informationsstand wird auf der Karte gekennzeichnet.",
      open: "Keine konkrete Gefahr ist bestätigt. Welche Angaben bestätigt sind und welche Informationen fehlen, ist durch die Gruppe zu klären.",
      factor: "Widersprüchliche oder verspätete Angaben? im Planspiel offen",
      theoryQuery: "Kommunikation und Zusammenarbeit Feuerwehr",
      twist: "Eine zweite Textmeldung nennt einen leicht abweichenden Standort. Die Lageangaben bleiben unbestätigt."
    },
    geraetekunde: {
      title: "Materialübersicht für ein Übungsvorhaben",
      where: "Fiktiver Bereitstellungsbereich A auf einer Planspielkarte",
      what: "Eine Textmeldung bittet um die gemeinsame Einordnung einer vorgegebenen Materialliste.",
      who: "Fiktiver Auftrag durch die Übungsleitung; keine reale anfordernde Stelle.",
      howMany: `${plan.materials.length} eingetragene Materialposition(en); Eignung und tatsächliche Verfügbarkeit werden nicht unterstellt.`,
      known: "Nur die im Übungsplan eingetragene Materialliste gilt als bekannt.",
      open: "Keine Gefahr ist Teil des Szenarios. Eignung, Zustand und Verfügbarkeit des Materials sind nicht geprüft und bleiben offen.",
      factor: "Materialeignung und Verfügbarkeit ungeprüft",
      theoryQuery: "Feuerwehr Gerätekunde Materialkunde",
      twist: "Die Papierliste und die vorbereitete Materialübersicht nennen unterschiedliche Verfügbarkeiten; kein echtes Material wird verändert."
    },
    lageerkundung: {
      title: "Unvollständige Angaben am Übungsobjekt",
      where: "Fiktiver Bereich A auf einer nicht maßstabsgetreuen Planspielkarte",
      what: "Eine kurze schriftliche Meldung beschreibt eine unklare Situation an einem markierten Übungsobjekt.",
      who: "Fiktive meldende Person; Identität und weitere Erreichbarkeit sind unbekannt.",
      howMany: "1 markiertes Übungsobjekt; weitere Mengenangaben sind bewusst offen.",
      known: "Eine Textmeldung und ein markiertes Objekt auf dem Planspielblatt.",
      open: "Keine konkrete Gefahr ist bestätigt. Lage, Umfang, Zugänglichkeit und fehlende Informationen sind unbekannt.",
      factor: "Zugänglichkeit und Lageumfang unbestätigt",
      theoryQuery: "Lagefeststellung Informationsgewinnung Feuerwehr",
      twist: "Ein nachgereichter Bericht widerspricht einer Ortsangabe der ersten Karte; die Gruppe hält beide Angaben offen."
    },
    menschenrettung: {
      title: "Schriftliche Meldung zu einer hilfebedürftigen Person",
      where: "Fiktiver Aufenthaltsort B auf einer Planspielkarte; keine reale Adresse",
      what: "Eine Textmeldung beschreibt eine hilfebedürftige Person. Es gibt keine Übungsperson und keine medizinische Handlung.",
      who: "Eine betroffene Person laut fiktiver Textkarte; Identität und weitere Angaben sind unbekannt.",
      howMany: "1 in einer Textkarte erwähnte Person; keine Darstellung oder praktische Beteiligung.",
      known: "Nur die schriftlich auf der Planspielkarte festgehaltenen Angaben.",
      open: "Zustand und Unterstützungsbedarf der Person sind nicht angegeben. Keine medizinische Lage oder Handlung nachstellen.",
      factor: "Zustand und Unterstützungsbedarf unbekannt",
      theoryQuery: "Betreuung hilfebedürftige Person Feuerwehr",
      twist: "Eine ergänzende Textkarte enthält eine abweichende, nicht bestätigte Angabe zum Unterstützungsbedarf; keine medizinische Handlung ableiten."
    },
    verkehrsunfall: {
      title: "Verkehrsunfall mit einer eingeschlossenen Person",
      where: "Fiktiver, unnummerierter Wegabschnitt am markierten Übungsobjekt A; keine Anfahrtsadresse",
      what: "Fiktive Meldung: Ein Pkw ist gegen einen Baum gefahren.",
      who: "Eine Person soll laut Textmeldung im Fahrzeug eingeschlossen/eingeklemmt sein; sie wird nicht dargestellt.",
      howMany: "1 Pkw und 1 gemeldete betroffene Person; weitere Personen sind nicht bestätigt.",
      known: "Pkw am Baum und eine als eingeschlossen gemeldete Person – ausschließlich Angaben der Textkarte, keine tatsächliche Lage.",
      open: "Möglicher Austritt von Betriebsstoffen: unbestätigte Planspiel-Angabe. Weitere Gefahren und Zustand sind unbekannt. Keine Stoffe verwenden oder Gefahren/Rettungshandlungen nachstellen.",
      factor: "Möglicher Betriebsstoffaustritt? unbestätigt",
      theoryQuery: "Technische Hilfeleistung Verkehrsunfall Feuerwehr",
      twist: "Eine zweite Textkarte meldet möglicherweise auslaufende Betriebsstoffe. Der Hinweis ist unbestätigt; weder Stoffe noch Unfallfolgen werden dargestellt."
    },
    wasserplanung: {
      title: "Ressourcen und offene Abhängigkeiten",
      where: "Fiktiver Bereich A auf einer Planspielkarte",
      what: "Eine schriftliche Planspielmeldung bittet um eine Übersicht bekannter Ressourcen und offener Abhängigkeiten.",
      who: "Fiktiver Auftrag durch die Übungsleitung.",
      howMany: "Mengen und tatsächliche Verfügbarkeit werden nicht vorgegeben; die Materialliste des Plans dient als Diskussionsgrundlage.",
      known: "Eine fiktive Ressourcenliste; kein praktischer Aufbau oder Betrieb.",
      open: "Keine konkrete Gefahr ist Teil des Szenarios. Abhängigkeiten, Verfügbarkeit und notwendige fachliche Prüfungen sind offen.",
      factor: "Verfügbarkeit und Abhängigkeiten offen",
      theoryQuery: "Feuerwehr Wasserversorgung Ressourcenplanung",
      twist: "Eine vorbereitete Liste markiert eine Ressource im Planspiel als nicht verfügbar; tatsächliche Ausrüstung bleibt unberührt."
    },
    ablaufplanung: {
      title: "Auftrag mit zeitversetzten Informationen",
      where: "Fiktiver Besprechungsbereich A auf einer Planspielkarte",
      what: "Ein kurzer schriftlicher Auftrag wird durch zeitversetzte Informationskarten ergänzt.",
      who: "Fiktiver Auftrag durch die Übungsleitung; keine reale Leitstelle oder meldende Person.",
      howMany: "1 Planspielauftrag und mehrere vorbereitete Textkarten.",
      known: "Ausbildungsziel und erste Informationskarte werden zu Beginn ausgeteilt.",
      open: "Keine reale Gefahr wird dargestellt. Welche Ergänzungen den Ablauf verändern und welche Entscheidungen offen sind, erarbeitet die Gruppe.",
      factor: "Unvollständige Angaben können den Ablauf ändern",
      theoryQuery: "Feuerwehr Einsatzleitung Führung Planspiel",
      twist: "Eine vorbereitete Karte ändert die verfügbare Planspielzeit; die Gruppe muss den Arbeitsauftrag neu priorisieren, ohne reale Abläufe abzuleiten."
    },
    brand: {
      title: "Brand- oder Rauchmeldung an einem Gebäude",
      where: "Fiktives Gebäude A auf einer nicht maßstabsgetreuen Planspielkarte",
      what: "Textmeldung: Rauch wird an einem Gebäude gemeldet; Ursache und Umfang sind unbekannt.",
      who: "Fiktive meldende Person; keine echten Kontaktdaten oder Telefonnummern.",
      howMany: "1 Gebäude; Zahl betroffener Personen unbekannt und nicht bestätigt.",
      known: "Nur eine fiktive Rauchmeldung und ein Gebäudesymbol auf der Karte.",
      open: "Mögliche Rauchentwicklung? unbestätigte Angabe. Ursache, Ausmaß, Personen und weitere Gefahren sind unbekannt. Kein Rauch oder Feuer wird erzeugt.",
      factor: "Rauchmeldung und mögliche Betroffenheit? unbestätigt",
      theoryQuery: "Brand Rauchentwicklung Gebäude Feuerwehr",
      twist: "Eine weitere Meldung verortet den sichtbaren Rauch an einem anderen Gebäudeteil. Ursache und Betroffenheit bleiben unbestätigt; kein Feuer oder Rauch wird erzeugt."
    },
    vegetationsbrand: {
      title: "Rauchmeldung an einer Freifläche",
      where: "Fiktive Wald- oder Freifläche A auf einer Planspielkarte",
      what: "Textmeldung über eine Rauch- oder Brandbeobachtung im Freien; ein Brand ist nicht bestätigt.",
      who: "Fiktive beobachtende Person; Identität und Erreichbarkeit sind unbekannt.",
      howMany: "1 markierter Beobachtungspunkt; Ausdehnung und betroffene Fläche unbekannt.",
      known: "Eine Beobachtungskarte mit markiertem Punkt; keine reale Flamme oder Rauchquelle.",
      open: "Ausbreitung, Wind und Zugänglichkeit sind unbestätigte Einflussfaktoren. Kein Feuer, Rauch oder Brandstoff wird eingesetzt.",
      factor: "Wind und mögliche Ausbreitung? nicht bestätigt",
      theoryQuery: "Vegetationsbrand Waldbrand Feuerwehr",
      twist: "Eine Textkarte meldet eine veränderte Wind- oder Sichtbedingung. Richtung und Auswirkung sind unbestätigt; es gibt keine Brand- oder Rauchsimulation."
    },
    unwetter: {
      title: "Unwetterfolge mit möglicher Wegbehinderung",
      where: "Fiktiver, unnummerierter Wegabschnitt auf einer Planspielkarte",
      what: "Textmeldung über einen umgestürzten Baum; eine Wegbehinderung ist möglich, aber nicht bestätigt.",
      who: "Fiktive meldende Person; keine realen Kontaktdaten.",
      howMany: "1 Baumsymbol; Umfang und weitere Betroffene unbekannt.",
      known: "Eine Textmeldung und ein schematisches Baumsymbol auf der Karte.",
      open: "Zustand des Baumes, Zugänglichkeit und mögliche weitere Schäden sind unbekannt. Kein Baum oder Hindernis wird real bewegt.",
      factor: "Mögliche Wegbehinderung und weitere Schäden? unbestätigt",
      theoryQuery: "Unwetter Sturmfolgen Feuerwehr",
      twist: "Eine Zusatzmeldung erwähnt möglicherweise eine beschädigte Leitung im Kartenbereich. Die Angabe ist unbestätigt; es wird kein Hindernis oder Schaden nachgestellt."
    },
    hochwasser: {
      title: "Wasserschaden an einem Gebäude",
      where: "Fiktiver Gebäudebereich A auf einer Planspielkarte",
      what: "Textmeldung über Wasser in einem Gebäudebereich; Ursache und Ausmaß sind unbekannt.",
      who: "Fiktive meldende Person; keine reale Adresse oder Kontaktdaten.",
      howMany: "1 markierter Gebäudebereich; Wasserstand und Betroffene unbekannt.",
      known: "Eine fiktive Wasser-Schadensmeldung auf einer Papierkarte.",
      open: "Wasserstand und mögliche elektrische Gefahren? unbestätigt. Kein Wasser, Strom und keine Pumpen werden real eingesetzt.",
      factor: "Wasserstand und elektrische Situation? unbestätigt",
      theoryQuery: "Hochwasser Wasserschaden Feuerwehr",
      twist: "Zwei Papiermeldungen nennen unterschiedliche Wasserstände und eine mögliche elektrische Betroffenheit. Beides bleibt unbestätigt; kein Wasser und kein Strom werden eingesetzt."
    },
    gefahrstoff: {
      title: "Unbekannter Stoffhinweis an einem Übungsobjekt",
      where: "Fiktiver Bereich A auf einer Planspielkarte; keine reale Adresse",
      what: "Textmeldung über einen unbekannten Stoffhinweis; Stoff und Eigenschaften sind nicht bekannt.",
      who: "Fiktive meldende Person; keine echten Kontaktdaten.",
      howMany: "1 markiertes Übungsobjekt; Stoffmenge und betroffene Personen unbekannt.",
      known: "Eine neutrale Karte mit Fragezeichen; keine realen Gebinde, Stoffe, Gefahrensymbole oder Gerüche.",
      open: "Stoffidentität und Gefahren sind ausdrücklich unbekannt. Keine Stoffe, Gerüche, Gebinde oder Dekontaminationsmaßnahmen darstellen.",
      factor: "Unbekannter Stoffhinweis? nicht verifiziert",
      theoryQuery: "Gefahrstoff Gefahrgut Feuerwehr Grundlagen",
      twist: "Eine neutrale Karte enthält eine abweichende Kennzeichnungsbeschreibung. Stoff und Gefahren bleiben ausdrücklich unbekannt; es werden keine Stoffe oder Gebinde gezeigt."
    },
    personensuche: {
      title: "Vermisstenmeldung im Kartenbereich",
      where: "Fiktiver Kartenbereich A ohne reale Orts- oder Anfahrtsangabe",
      what: "Textmeldung über eine vermisste Person; der letzte bekannte Aufenthaltsort ist unklar.",
      who: "1 fiktiv vermisste Person; Identität und Beschreibung werden nicht konkretisiert.",
      howMany: "1 Person laut Textkarte; keine Darstellung oder reale Suche.",
      known: "Nur die Angaben der fiktiven Textkarte.",
      open: "Letzter Aufenthaltsort, Zeitangaben und mögliche Umgebungsgefahren? unbestätigt. Keine Geländesuche oder Personendarstellung.",
      factor: "Aufenthaltsort und Umgebungsbedingungen? unbestätigt",
      theoryQuery: "Personensuche Vermisste Person Feuerwehr",
      twist: "Eine weitere fiktive Sichtungsmeldung widerspricht der Zeitangabe der ersten Karte. Person, Ort und Zeitpunkt sind nicht bestätigt; es findet keine Suche statt."
    },
    stromausfall: {
      title: "Stromausfall in einem Übungsgebäude",
      where: "Fiktives Gebäude A auf einer Planspielkarte",
      what: "Textmeldung über einen Stromausfall; Ursache und betroffene Bereiche sind unbekannt.",
      who: "Fiktive meldende Person; keine realen Kontaktdaten.",
      howMany: "1 Gebäude; Zahl betroffener Personen nicht bestätigt.",
      known: "Eine schriftliche Ausfallmeldung und eine neutrale Gebäudeskizze.",
      open: "Ursache, betroffene Bereiche und Zustand elektrischer Anlagen? unbekannt. Keine elektrischen Geräte oder Anlagen verändern oder bedienen.",
      factor: "Ursache und betroffene Bereiche? unbestätigt",
      theoryQuery: "Stromausfall technische Hilfe Feuerwehr",
      twist: "Eine zweite Textkarte meldet einen abweichenden betroffenen Bereich und eine mögliche Folgeunterbrechung. Keine Anlage wird geschaltet oder verändert."
    },
    tiernotlage: {
      title: "Tiernotlage laut fiktiver Textmeldung",
      where: "Fiktiver Bereich A auf einer Planspielkarte; keine reale Adresse",
      what: "Textmeldung über ein Tier in einer unklaren örtlichen Situation.",
      who: "1 nicht näher bezeichnetes Tier laut Textkarte; Eigentümerdaten werden nicht erfasst.",
      howMany: "1 Tier laut unbestätigter Meldung.",
      known: "Eine schriftliche Meldung; kein Tier ist anwesend oder wird dargestellt.",
      open: "Tierart, Zustand, Umfeld und mögliche Gefahren? unbestätigt. Keine Tiere, Fangmittel oder Annäherung praktisch einsetzen.",
      factor: "Tierverhalten und örtliche Gefahren? unbekannt",
      theoryQuery: "Tiernotlage Feuerwehr",
      twist: "Eine Zusatzmeldung enthält eine unbestätigte Änderung zu Tierzustand oder Umgebung. Kein Tier, Seil oder Gewässer wird praktisch einbezogen."
    },
    brandmeldeanlage: {
      title: "Ausgelöste Brandmeldeanlage in einem Gewerbegebäude",
      where: "Fiktives Gebäude A mit neutral markierten Bereichen auf einer Planspielkarte",
      what: "Textmeldung über eine ausgelöste Brandmeldeanlage; eine tatsächliche Brand- oder Rauchentwicklung ist nicht bestätigt.",
      who: "Fiktive Meldung durch eine nicht näher bezeichnete Stelle; keine echten Kontakt- oder Anlagendaten.",
      howMany: "1 Gebäude und 1 gemeldete Auslösung; Zahl betroffener Personen und weiterer Meldungen unbekannt.",
      known: "Eine schriftliche Alarmmeldung und eine neutrale Bereichskarte; kein technisches System wird ausgelöst.",
      open: "Auslösebereich, Ursache, tatsächliche Wahrnehmungen und Betroffenheit? unbestätigt. Keine Anlage, kein Feuer und kein Rauch werden real dargestellt.",
      factor: "Auslösebereich und Ursache? ungeklärt",
      theoryQuery: "Brandmeldeanlage Feuerwehr Grundlagen",
      twist: "Eine zweite Karte nennt einen anderen Gebäudeteil als Auslösebereich. Beide Angaben bleiben offen; die Gruppe formuliert eine Klärungsfrage."
    },
    industriebrand: {
      title: "Brandmeldung im Gewerbe- oder Industriebetrieb",
      where: "Fiktiver Gewerbebetrieb A; keine reale Firma oder Objektadresse",
      what: "Fiktive Meldung über eine mögliche Rauch- oder Wärmeentwicklung in einem Lager- oder Maschinenbereich.",
      who: "Fiktive meldende Person; Betreiber, Nutzung und weitere Ansprechpartner sind nicht benannt.",
      howMany: "1 fiktiver Betrieb mit mehreren markierten Bereichen; Zahl anwesender oder betroffener Personen unbekannt.",
      known: "Eine Textmeldung und ein schematischer Gebäudeplan; keine realen Maschinen, Lagergüter oder Brennstoffe.",
      open: "Betroffener Bereich, Nutzung, Personen und mögliche Stoffe sind nicht bestätigt. Keine Stoffeigenschaften oder konkreten Gefahren unterstellen.",
      factor: "Nutzung und betroffener Bereich? unbestätigt",
      theoryQuery: "Brand Industrieanlage Feuerwehr",
      twist: "Eine unbestätigte Karte nennt einen zweiten möglichen Gebäudebereich und eine abweichende Nutzungsbeschreibung. Die Gruppe trennt beide Angaben."
    },
    lkwunfall: {
      title: "Verkehrsunfall mit Lkw oder mehreren Fahrzeugen",
      where: "Fiktiver, unnummerierter Straßenabschnitt im Landkreis; keine reale Einsatzadresse",
      what: "Fiktive Textmeldung über einen Unfall mit einem Lkw oder mehreren Fahrzeugen.",
      who: "Fahrzeugführende oder weitere Personen sind laut Meldung möglicherweise betroffen; Zahl und Zustand sind nicht bestätigt.",
      howMany: "Mindestens 1 Lkw oder mehrere Fahrzeuge laut wählbarer Textkarte; genaue Anzahl offen.",
      known: "Nur die Fahrzeugangaben auf den fiktiven Karten; keine echte Ladung oder Unfallstelle.",
      open: "Zahl der Beteiligten, Ladungsangaben, Straßenverhältnisse und mögliche Gefahren sind unbekannt. Keine Gefahrenstoffe oder Rettungshandlungen darstellen.",
      factor: "Ladung und Zahl der Betroffenen? unbestätigt",
      theoryQuery: "Verkehrsunfall technische Hilfe Feuerwehr Grundlagen",
      twist: "Eine weitere Karte meldet ein zusätzliches Fahrzeug oder eine unvollständige Ladungsangabe. Keine konkrete Gefahr daraus ableiten."
    },
    oelspur: {
      title: "Ölspur oder unklare Fahrbahnverunreinigung",
      where: "Fiktiver Straßenabschnitt A auf einer nicht maßstabsgetreuen Planspielkarte",
      what: "Fiktive Meldung über eine längere Verunreinigung auf der Fahrbahn; Stoff und Ausmaß sind unbekannt.",
      who: "Fiktive meldende Person; keine echten Kontaktdaten oder Straßenkilometer.",
      howMany: "1 markierter Straßenabschnitt; Länge, Verursacher und betroffene Bereiche nicht bestätigt.",
      known: "Eine schriftliche Meldung und eine Karte mit einem neutral markierten Abschnitt; keine Flüssigkeit oder rutschige Fläche.",
      open: "Stoff, Ausdehnung, Ursache und Zuständigkeit? unbekannt. Keine Mittel ausbringen und keine reale Beseitigung planen.",
      factor: "Stoff und Ausdehnung? unbestätigt",
      theoryQuery: "Ölspur Fahrbahn Feuerwehr Grundlagen",
      twist: "Zwei fiktive Meldungen nennen unterschiedliche Startpunkte und Längen. Die Gruppe markiert den Widerspruch und hält ihn offen."
    },
    strassenueberflutung: {
      title: "Überflutete Straße nach Starkregen",
      where: "Fiktiver Straßenabschnitt A mit zwei möglichen Teilbereichen auf einer Planspielkarte",
      what: "Meldung über eine teilweise überflutete Straße nach Starkregen; Ausmaß und Entwicklung sind nicht bestätigt.",
      who: "Fiktive beobachtende Person; keine echten Kontaktdaten.",
      howMany: "1 Straßenabschnitt; Wassertiefe, Ausdehnung und mögliche Betroffene unbekannt.",
      known: "Eine Textmeldung und eine neutrale Ortskarte; kein Wasser, keine Pumpen und keine nassen Flächen.",
      open: "Wasserstand, Fließverhältnisse, Straßenzustand und betroffene Bereiche sind unklar. Keine reale Befahrung oder Wassermaßnahme ableiten.",
      factor: "Ausdehnung und Straßenverhältnisse? ungeklärt",
      theoryQuery: "Starkregen Überflutung Feuerwehr",
      twist: "Eine spätere Textkarte meldet möglicherweise einen zweiten betroffenen Abschnitt. Zeitpunkt und Umfang bleiben ausdrücklich unbestätigt."
    },
    arbeitunfall: {
      title: "Arbeitsunfall in einem fiktiven Betrieb",
      where: "Fiktiver Arbeitsbereich A; keine reale Firma oder Objektadresse",
      what: "Fiktive Meldung über einen Arbeitsunfall; Hergang, Anlagenstatus und mögliche Betroffenheit sind unklar.",
      who: "Eine Person laut Textkarte möglicherweise betroffen; keine Übungsperson und keine medizinische Handlung.",
      howMany: "1 gemeldeter Arbeitsunfall; Zahl und Zustand möglicher Betroffener nicht bestätigt.",
      known: "Eine kurze Textmeldung und eine neutrale Betriebsübersicht; keine Maschinen oder Energiequellen werden dargestellt.",
      open: "Unfallhergang, Anlagenzustand, Zuständigkeiten und notwendige fachliche Übergabe? ungeklärt. Keine medizinische oder technische Maßnahme ableiten.",
      factor: "Hergang und Anlagenstatus? unbestätigt",
      theoryQuery: "Arbeitsunfall Feuerwehr Zusammenarbeit",
      twist: "Eine Zusatzkarte enthält widersprüchliche Angaben zur Zahl möglicher Betroffener oder zum Anlagenstatus. Keine Handlung daraus ableiten."
    },
    tueröffnung: {
      title: "Eilige Türöffnung – Lage dahinter ungeklärt",
      where: "Fiktive Wohnung oder Gebäudeeinheit A; keine reale Adresse",
      what: "Fiktive Meldung über eine verschlossene Tür und eine möglicherweise hilfebedürftige Person dahinter.",
      who: "Eine Person laut Textkarte möglicherweise betroffen; Anwesenheit und Identität sind nicht bestätigt.",
      howMany: "1 Tür und möglicherweise 1 hilfebedürftige Person; Angaben unbestätigt.",
      known: "Ausschließlich eine Textmeldung und ein abstrakter Grundriss; keine echte Tür oder Zugangstechnik.",
      open: "Anwesenheit, Zustand, Berechtigung und Zugangslage sind unklar. Keine Türöffnung, Wohnung oder betroffene Person nachstellen.",
      factor: "Anwesenheit und Informationslage? ungeklärt",
      theoryQuery: "Türöffnung Feuerwehr Grundlagen",
      twist: "Eine zweite Karte widerspricht der Anwesenheit einer Person. Beide Angaben bleiben offen; die Gruppe bestimmt nur, welche Klärung und Übergabe nötig wäre."
    },
    firstresponder: {
      title: "First-Responder-Meldung – Informationsübergabe",
      where: "Fiktiver Ort A ohne reale Adresse oder Anfahrtsinformation",
      what: "Fiktive Meldung über eine möglicherweise hilfebedürftige Person. Geübt werden nur Informationsaufnahme, Rollenklärung und Übergabe.",
      who: "Eine Person laut Textkarte möglicherweise betroffen; es gibt keine Übungsperson und keine medizinische Handlung.",
      howMany: "1 gemeldete Person; Zustand und Unterstützungsbedarf werden nicht medizinisch beschrieben.",
      known: "Eine schriftliche Meldung und ein neutraler Übergabebogen; keine echte Alarmierung oder Patientendarstellung.",
      open: "Ort, Zeitpunkt und Vollständigkeit der Angaben? zu prüfen. Medizinische Maßnahmen, Diagnosen und reale Notrufkommunikation sind ausgeschlossen.",
      factor: "Vollständigkeit der Meldung? offen",
      theoryQuery: "First Responder Feuerwehr Kommunikation",
      twist: "Eine Karte ändert eine organisatorische Angabe wie Ortsteil oder Zeitpunkt. Die Gruppe aktualisiert die schriftliche Übergabe und kennzeichnet die Änderung."
    },
    fahrzeugbrand: {
      title: "Brandmeldung an einem Pkw oder Lkw",
      where: "Fiktiver Straßen- oder Abstellbereich A; keine reale Einsatzadresse",
      what: "Textmeldung über Rauch oder Feuer an einem Fahrzeug; Fahrzeugzustand und Ausmaß sind unbekannt.",
      who: "Meldende Person und mögliche Betroffene sind nur soweit auf der Planspielkarte angegeben bekannt.",
      howMany: "1 gemeldetes Fahrzeug; weitere Fahrzeuge oder Personen sind nicht bestätigt.",
      known: "Eine fiktive Meldung und ein symbolisches Fahrzeugbild; kein Feuer, Rauch oder Fahrzeug wird real dargestellt.",
      open: "Fahrzeugart, genaue Lage, mögliche Betroffenheit und weitere Gefahren? unbestätigt. Keine Brand- oder Rettungsmaßnahmen ableiten.",
      factor: "Fahrzeugzustand und mögliche Betroffenheit? offen",
      theoryQuery: "Fahrzeugbrand Feuerwehr Grundlagen",
      twist: "Eine zweite Karte meldet einen abweichenden Standort oder eine unbestätigte Angabe zu betroffenen Personen."
    },
    bahnbrand: {
      title: "Rauch- oder Brandmeldung an einem Schienenfahrzeug",
      where: "Fiktiver Haltepunkt A auf einer schematischen Planspielkarte; keine reale Gleisanlage",
      what: "Textmeldung über Rauch oder eine Störung an einem Schienenfahrzeug; Ursache und Betriebszustand sind nicht bestätigt.",
      who: "Fahrgäste, Personal und meldende Stelle sind nur entsprechend den fiktiven Kartenangaben bekannt.",
      howMany: "1 Schienenfahrzeug laut Meldung; Zahl möglicher Betroffener unbekannt.",
      known: "Eine schriftliche Meldung und ein schematisches Zug-Symbol; keine Gleise oder Fahrzeuge werden real betreten oder bewegt.",
      open: "Genaue Position, Betriebszustand, Zahl möglicher Betroffener und zuständige Ansprechpartner? ungeklärt. Keine Bahn- oder Gleismaßnahmen ableiten.",
      factor: "Position und Betriebszustand? unbestätigt",
      theoryQuery: "Brand Schienenfahrzeug Feuerwehr",
      twist: "Eine zweite Meldung nennt einen anderen Haltepunkt oder eine abweichende Zahl Betroffener; beide Angaben bleiben offen."
    },
    verkehrslenkung: {
      title: "Verkehrsbehinderung nach einem Verkehrsunfall",
      where: "Fiktiver Straßenabschnitt A auf einer abstrakten Planspielkarte; keine reale Straße",
      what: "Textmeldung über eine mögliche Verkehrsbehinderung nach einem Unfall; Umfang und aktueller Zustand sind unbekannt.",
      who: "Meldende und zuständige Stellen werden nur benannt, wenn sie auf den fiktiven Karten stehen.",
      howMany: "1 markierter Straßenabschnitt; Verkehrsaufkommen und Dauer der Behinderung sind nicht bestätigt.",
      known: "Eine Meldung mit Ort und Zeitpunkt laut Planspielkarte; keine echte Sperrung oder Verkehrsbeeinflussung.",
      open: "Zuständigkeit, aktuelle Verkehrslage und erforderliche Abstimmung? ungeklärt. Keine Verkehrsmaßnahmen oder Umleitungen aus dem Plan ableiten.",
      factor: "Straßenzustand und Zuständigkeit? offen",
      theoryQuery: "Verkehrslenkung Feuerwehr Zusammenarbeit",
      twist: "Eine spätere Karte meldet einen abweichenden Abschnitt oder eine unbestätigte Änderung der Freigabe."
    },
    rettungsdienst: {
      title: "Unterstützungsanforderung des Rettungsdienstes",
      where: "Fiktiver Ort A ohne reale Adresse oder Anfahrtsinformation",
      what: "Schriftliche Planspielmeldung über eine angefragte Unterstützung des Rettungsdienstes; Art und Umfang sind ungeklärt.",
      who: "Anfordernde und zuständige Stellen sind nur soweit auf der Karte angegeben bekannt; keine Übungsperson oder medizinische Handlung.",
      howMany: "Eine fiktive Anforderung; Zahl und Zustand möglicher Betroffener werden nicht medizinisch beschrieben.",
      known: "Eine Anforderungskarte und ein neutraler Übergabebogen; keine reale Alarmierung oder Behandlung.",
      open: "Auftrag, Zuständigkeit, Treffpunkt und Umfang der Unterstützung? zu klären. Keine medizinischen Entscheidungen oder Maßnahmen ableiten.",
      factor: "Umfang und Zuständigkeit? offen",
      theoryQuery: "Unterstützung Rettungsdienst Feuerwehr Übergabe",
      twist: "Eine Karte ändert eine organisatorische Angabe wie Treffpunkt oder Anforderungsumfang; die Gruppe aktualisiert die Übergabe."
    }
  };
  let scenario = scenarios[plan.templateId] || scenarios.teamkommunikation;
  const fireExtentLabels = { small: "klein", medium: "mittel", large: "groß" };
  if (fireExtentLabels[plan.fireExtent]) {
    scenario = {
      ...scenario,
      factor: `Gewählter Bildumfang: ${fireExtentLabels[plan.fireExtent]} (unbestätigte Planspielannahme)`,
      open: `${scenario.open} Der gewählte Flammenumfang ist ausschließlich ein fiktives Bildsymbol und keine bestätigte Feststellung.`
    };
  }
  const difficulty = {
    gering: "Ein kurzer Informationsblock ohne zusätzliche Abweichung.",
    mittel: "Zwei vorbereitete Informationsblöcke; eine Rückfrage bleibt offen.",
    hoch: "Mehrere getrennte Informationsblöcke; die Gruppe hält Widersprüche und offene Angaben sichtbar fest."
  }[plan.effort] || "Informationsumfang vor der Übung durch die Ausbildungsleitung festlegen.";
  const details = String(plan.scenarioDetails || "").trim();
  const detailTerms = details.toLocaleLowerCase("de");
  if (
    plan.templateId === "tiernotlage"
    && /uhu|eule/.test(detailTerms)
    && /seil|schnur/.test(detailTerms)
    && /fluss|bach|gewässer|gewaesser/.test(detailTerms)
  ) {
    return {
      ...scenario,
      title: "Uhu im Seil über einem Fluss (fiktive Meldung)",
      where: "Fiktiver Flussabschnitt A; keine reale Örtlichkeit oder Zugangsbeschreibung.",
      what: "Fiktive, unbestätigte Meldung: Ein Uhu soll sich in einem Seil über einem Fluss verfangen haben.",
      who: "1 Uhu laut Planspiel-Textkarte; kein echtes Tier und keine reale meldende Person.",
      howMany: "1 Tier und 1 fiktiver Flussabschnitt; keine weiteren Betroffenen bestätigt.",
      known: "Ausschließlich die Angaben der fiktiven Textkarte; Tierzustand und Situation sind nicht überprüft.",
      open: "Zustand des Tieres, Seilsituation, Umgebung und weitere Gefahren sind unbekannt. Kein Tier, Seil, Gewässer oder Höhenbereich wird praktisch dargestellt.",
      factor: "Uhu / Seil / Fluss: unbestätigte Planspiel-Angabe",
      situation: "Fiktive, unbestätigte Meldung über einen Uhu, der sich in einem Seil über einem Fluss verfangen haben soll. Lage und Tierzustand sind unbekannt; das Szenario bleibt eine Text- und Bildbesprechung ohne praktische Nachstellung.",
      visualKind: "owl-rope-river",
      twist: "Eine Zusatzkarte meldet eine nicht bestätigte Änderung der Seilsituation oder Witterung. Keine Tiere, Seile, Gewässer oder Höhenbereiche praktisch darstellen.",
      difficulty
    };
  }
  if (details) {
    return {
      ...scenario,
      what: `${scenario.what} Zusätzliche unbestätigte Planspiel-Angabe: ${details}`,
      open: `${scenario.open} Die ergänzten Details sind nicht bestätigt.`,
      factor: `${scenario.factor}; Zusatzdetails unbestätigt`,
      difficulty
    };
  }

  return { ...scenario, difficulty };
}

const scenarioHazards = {
  teamkommunikation: ["Unvollständige oder widersprüchliche Informationen", "Unklare Rollen- und Zuständigkeitsgrenzen", "Missverständnisse bei Rückmeldungen", "Verwechslung des Planspiels mit realer Alarmierung oder Einsatzkommunikation"],
  geraetekunde: ["Unvollständige oder veraltete Materialangaben", "Ungeprüfter Zustand oder Verfügbarkeit", "Verwechslung von Papierplanung mit realer Gerätebedienung"],
  lageerkundung: ["Fehlende oder widersprüchliche Lageinformationen", "Unbekannte Zugänglichkeit oder betroffene Bereiche", "Nicht bestätigte Hinweise werden als Tatsachen missverstanden"],
  menschenrettung: ["Unbekannter Zustand oder Unterstützungsbedarf", "Unklare Zuständigkeit und Übergabe", "Nicht bestätigte Angaben zu weiteren Personen oder Umfeld"],
  verkehrsunfall: ["Fließender Verkehr und Folgeunfälle", "Fahrzeuginstabilität oder unbekannte Rückhaltesysteme", "Möglicher Austritt unbekannter Betriebsstoffe", "Brand- oder Energiegefahren, einschließlich alternativer Antriebe", "Weitere Personen oder Fahrzeuge außerhalb des ersten Blickfelds"],
  wasserplanung: ["Unklare Ressourcenverfügbarkeit und Abhängigkeiten", "Unvollständige Bedarfs- oder Mengenangaben", "Verwechslung von Planspielwerten mit geprüften technischen Angaben"],
  ablaufplanung: ["Zeitdruck oder geänderte Rahmenbedingungen", "Unklare Zuständigkeiten und Übergaben", "Fehlende oder widersprüchliche Meldungen", "Ungeprüfte Annahmen zu Personal oder Material"],
  brand: ["Rauch und mögliche Rauchgase", "Mögliche Brandausbreitung und Wärmeeinwirkung", "Unbekannte Personen oder Nutzung im Gebäude", "Elektrische oder sonstige Energiequellen", "Gasflaschen oder Gastanks, falls vorhanden", "Geparkte Fahrzeuge oder weitere Brandlasten in der Nähe"],
  vegetationsbrand: ["Wind- und Sichtverhältnisse sowie mögliche Ausbreitung", "Rauch und Wärmeeinwirkung", "Unwegsames Gelände, Vegetation und mögliche Stolperstellen", "Wetteränderung und mögliche Nähe zu Gebäuden, Fahrzeugen oder Leitungen"],
  unwetter: ["Instabile Bäume und herabfallende Äste", "Beschädigte oder herabhängende Leitungen", "Weitere verdeckte Schäden und Folgeereignisse", "Verkehr und eingeschränkte Wege", "Wasser oder aufgeweichter Untergrund"],
  hochwasser: ["Unbekannte Wassertiefe oder Strömung", "Elektrische Anlagen in möglicherweise betroffenen Bereichen", "Verunreinigtes Wasser oder unbekannte Stoffe", "Geschädigte Bauteile und eingeschlossene Personen", "Wetter- und Zugangsänderungen"],
  gefahrstoff: ["Stoffidentität und Eigenschaften unbekannt", "Mögliche Exposition durch Einatmen oder Kontakt", "Mögliche Reaktion mit Umgebung oder anderen Stoffen unbekannt", "Weitere Betroffene oder Ausbreitung unbekannt"],
  personensuche: ["Unbekanntes Gelände, Wetter und Sicht", "Verkehr, Gewässer oder andere örtliche Gefahren nicht ausgeschlossen", "Unklare letzte Sichtung und veraltete Informationen", "Belastung und Kommunikationslücken im Team"],
  stromausfall: ["Elektrische Anlagen möglicherweise weiterhin unter Spannung", "Dunkelheit oder Ausfall sicherheitsrelevanter Einrichtungen", "Unklare Auswirkungen auf Personen, Aufzüge oder technische Systeme", "Ursache und Wiederkehr der Versorgung unbekannt"],
  tiernotlage: ["Unvorhersehbares Tierverhalten und Stress", "Biss-, Kratz- oder Verletzungsrisiko je nach Tier", "Unbekannte Umgebung, Höhe, Wasser oder Verkehrsraum", "Seile oder andere Gegenstände können zusätzliche Gefahren darstellen"],
  brandmeldeanlage: ["Auslösung ohne bestätigte Brandursache", "Tatsächliche Rauch- oder Brandausbreitung nicht ausgeschlossen", "Unbekannte Personen, Gebäudenutzung und betroffene Bereiche", "Elektrische oder sonstige Anlagen sowie Gasflaschen/Gastanks, falls vorhanden"],
  industriebrand: ["Rauch, Hitze und mögliche Brandausbreitung", "Unbekannte Betriebsstoffe, Gefahrstoffe oder Lagergüter", "Maschinen, elektrische Anlagen und gespeicherte Energie", "Gasflaschen, Gastanks oder Druckbehälter, falls vorhanden", "Unbekannte Personen, Gebäudestruktur und angrenzende Fahrzeuge"],
  lkwunfall: ["Fließender Verkehr und Folgeunfälle", "Instabile Fahrzeuge oder Ladung", "Unbekannte Ladung und mögliche Gefahrstoffe", "Betriebsstoffe, Brand- und Energiegefahren", "Weitere Beteiligte oder eingeschränkte Sicht"],
  oelspur: ["Unbekannter Stoff und mögliche Exposition", "Rutschgefahr für Verkehrsteilnehmende", "Ausbreitung in Entwässerung oder Umwelt möglich", "Verkehr und mögliche Zündquellen je nach Stoff unbekannt"],
  strassenueberflutung: ["Unbekannte Wassertiefe und Strömung", "Verdeckte Straßenschäden oder nicht erkennbare Hindernisse", "Verkehr und mögliche liegengebliebene Fahrzeuge", "Elektrische Gefahren oder verunreinigtes Wasser nicht ausgeschlossen"],
  arbeitunfall: ["Maschinen oder gespeicherte Energien", "Elektrische, mechanische oder thermische Gefahren", "Höhen, bewegliche Lasten oder instabile Bauteile je nach Arbeitsbereich", "Unbekannte Stoffe und Zustand betroffener Personen"],
  "tueröffnung": ["Unbekannter Zustand und Unterstützungsbedarf einer Person", "Unbekannte Situation hinter der Tür", "Mögliche elektrische, thermische oder andere Umgebungsgefahren", "Unklare Berechtigung, Zuständigkeit oder Dringlichkeit"],
  firstresponder: ["Unbekannter Gesundheitszustand", "Mögliche biologische Exposition", "Unklare Zuständigkeit und Übergabe", "Verkehr oder andere Umgebungsgefahren am gemeldeten Ort", "Schutz persönlicher Informationen"],
  fahrzeugbrand: ["Rauch, mögliche Rauchgase und Wärmeeinwirkung", "Unbekannte Kraftstoffe, Batterien oder gespeicherte Energie", "Gasflaschen oder Gastanks, falls vorhanden", "Geparkte Fahrzeuge, Gebäude oder Vegetation in der Nähe", "Verkehr, weitere Personen und mögliche Wiederentzündung"],
  bahnbrand: ["Rauch, mögliche Rauchgase und Wärmeeinwirkung", "Unbekannter Betriebs- und Oberleitungszustand", "Zugbewegungen oder weitere Schienenfahrzeuge nicht ausgeschlossen", "Fahrgäste und Personal mit unbekanntem Aufenthaltsort", "Eingeschränkte Zugänge und unklare Abstimmungswege"],
  verkehrslenkung: ["Fließender Verkehr und Folgeunfälle", "Unklare oder veraltete Angaben zu Sperrung und Freigabe", "Gefährdung von Einsatzkräften oder Verkehrsteilnehmenden durch Missverständnisse", "Unklare Zuständigkeiten und parallele Meldungen"],
  rettungsdienst: ["Unbekannter Gesundheitszustand", "Mögliche biologische Exposition oder manuelle Belastung", "Unklare Aufgabenabgrenzung und Übergabe", "Zugang, Verkehr und örtliche Gefahren nicht bestätigt", "Schutz persönlicher Informationen"]
};

function scenarioHazardsFor(templateId, scenarioDetails = "") {
  const hazards = scenarioHazards[templateId] || ["Lage- und Umgebungsgefahren sind im Planspiel nicht festgelegt; vor fachlicher Nutzung szenariospezifisch prüfen."];
  const details = String(scenarioDetails).toLocaleLowerCase("de");
  const additions = [];
  if (hasUnnegatedMention(details, /gas[- ]?tanks?|gasflaschen?|gasbehälter|gasbehaelter|propantanks?|erdgastanks?|druckbehälter|druckbehaelter/)) {
    additions.push("Im Szenariotext erwähnter Gasbehälter oder Gastank; Vorhandensein und Zustand sind nicht bestätigt.");
  }
  if (hasUnnegatedMention(details, parkedVehiclePattern)) {
    additions.push("Im Szenariotext erwähnte geparkte Fahrzeuge; Anzahl, Abstand und Betroffenheit sind unbestätigt.");
  }
  if (hasUnnegatedMention(details, /stromleitung|oberleitung|hochspannungsleitung|elektrische leitung/)) {
    additions.push("Im Szenariotext erwähnte elektrische Leitung; Zustand und Gefährdung sind unbestätigt.");
  }
  if (hasUnnegatedMention(details, /trümmer|truemmer|einsturz|herabfallend|herabgestürzt|herabgestuerzt/)) {
    additions.push("Im Szenariotext erwähnte Trümmer oder herabfallende Bauteile; Umfang und Stabilität sind unbestätigt.");
  }
  return [...new Set([...hazards, ...additions])];
}

const sceneSymbolDefinitions = `
  <symbol id="scene-car" viewBox="0 0 100 40"><path d="M7 25l7-10q3-4 11-5l12-2q8-1 14 6l7 9h28q7 0 8 7v3H5v-4q0-4 2-4z" fill="#dbe8f5" stroke="#315675" stroke-width="2"/><path d="M30 11l-8 9h24l-7-10zM51 12l8 8h17q-3-7-10-8z" fill="#fff" stroke="#315675" stroke-width="1.5"/><circle cx="24" cy="33" r="6" fill="#343a40"/><circle cx="76" cy="33" r="6" fill="#343a40"/><circle cx="24" cy="33" r="2" fill="#d7dde0"/><circle cx="76" cy="33" r="2" fill="#d7dde0"/></symbol>
  <symbol id="scene-truck" viewBox="0 0 160 60"><rect x="4" y="7" width="103" height="41" rx="3" fill="#dbe8f5" stroke="#315675" stroke-width="2"/><path d="M107 20h27l21 17v11h-48z" fill="#fff0ef" stroke="#8f1d22" stroke-width="2"/><path d="M117 23v12h28" fill="none" stroke="#315675" stroke-width="1.5"/><circle cx="32" cy="50" r="8" fill="#343a40"/><circle cx="126" cy="50" r="8" fill="#343a40"/><circle cx="32" cy="50" r="3" fill="#d7dde0"/><circle cx="126" cy="50" r="3" fill="#d7dde0"/></symbol>
  <symbol id="scene-fire-engine" viewBox="0 0 160 60"><rect x="4" y="14" width="94" height="34" rx="4" fill="#b83235" stroke="#681519" stroke-width="2"/><path d="M98 23h29l25 16v9H98z" fill="#c84343" stroke="#681519" stroke-width="2"/><path d="M108 25h17v11h-17z" fill="#dceef6"/><path d="M20 14v-6h38v6M28 8v-4h22v4" fill="none" stroke="#fff" stroke-width="3"/><rect x="62" y="8" width="16" height="6" rx="2" fill="#f3c64e"/><circle cx="32" cy="50" r="8" fill="#343a40"/><circle cx="125" cy="50" r="8" fill="#343a40"/></symbol>
  <symbol id="scene-tree" viewBox="0 0 40 120"><path d="M20 48v69" stroke="#70543c" stroke-width="8"/><path d="M20 2L2 40h12L0 65h15L4 88h32L25 65h15L26 40h12z" fill="#4d8156" stroke="#31533a" stroke-width="2" stroke-linejoin="round"/></symbol>
  <symbol id="scene-house" viewBox="0 0 140 120"><path d="M5 51L70 5l65 46v64H5z" fill="#e6edf2" stroke="#315675" stroke-width="3"/><path d="M18 53l52-37 52 37" fill="none" stroke="#315675" stroke-width="4"/><rect x="54" y="72" width="32" height="43" fill="#fff" stroke="#315675" stroke-width="2"/><rect x="17" y="64" width="25" height="24" fill="#dceef6" stroke="#315675" stroke-width="2"/><rect x="98" y="64" width="25" height="24" fill="#dceef6" stroke="#315675" stroke-width="2"/></symbol>
  <symbol id="scene-factory" viewBox="0 0 190 120"><path d="M4 115V63l43 25V55l43 30V48l46 30V18h25v97z" fill="#dbe8f5" stroke="#315675" stroke-width="3" stroke-linejoin="round"/><rect x="139" y="3" width="24" height="41" fill="#e6edf2" stroke="#315675" stroke-width="3"/><rect x="23" y="96" width="18" height="19" fill="#fff" stroke="#315675" stroke-width="2"/><rect x="58" y="96" width="18" height="19" fill="#fff" stroke="#315675" stroke-width="2"/><rect x="96" y="96" width="18" height="19" fill="#fff" stroke="#315675" stroke-width="2"/></symbol>
  <symbol id="scene-person" viewBox="0 0 18 36"><circle cx="9" cy="5" r="4" fill="#f0c9a8" stroke="#53616b" stroke-width="1"/><path d="M9 10v13M3 16h12M9 23l-5 12M9 23l5 12" fill="none" stroke="#315675" stroke-width="3" stroke-linecap="round"/></symbol>
  <symbol id="scene-smoke" viewBox="0 0 64 72"><path d="M15 66C2 62 8 46 20 45 8 34 17 21 30 24 26 7 47 2 52 18 70 24 65 40 53 43 67 55 56 70 44 68z" fill="#b9c3c9" stroke="#7d898f" stroke-width="2"/></symbol>
  <symbol id="scene-flame" viewBox="0 0 50 66"><path d="M27 3C31 19 14 25 20 39c-7-3-10-9-9-16C1 36 4 56 18 62c14 7 31-2 30-20C47 27 33 21 27 3z" fill="#f3a342" stroke="#b85d23" stroke-width="2"/><path d="M27 38c2 8-7 11-4 19 9 2 15-3 14-10-1-5-6-7-10-9z" fill="#ffe18b"/></symbol>
  <symbol id="scene-gas-tank" viewBox="0 0 70 96"><path d="M20 17q0-12 15-12t15 12v63q0 10-10 10H30q-10 0-10-10z" fill="#dce4e8" stroke="#315675" stroke-width="3"/><path d="M27 6V2h16v4M28 17h14M22 80h26M27 91v4M43 91v4" fill="none" stroke="#315675" stroke-width="3"/><path d="M35 32l10 18H25z" fill="#f3c64e" stroke="#684d10" stroke-width="2"/><text x="32" y="46" font-size="12" font-weight="800" fill="#49390d">!</text></symbol>
  <symbol id="scene-parked-car" viewBox="0 0 112 58"><path d="M7 39l7-12q3-5 12-6l15-2q8-1 14 7l7 9h38q6 0 7 6v5H5v-4q0-3 2-3z" fill="#dbe8f5" stroke="#315675" stroke-width="2"/><path d="M31 22l-9 12h27l-8-13zM52 22l9 12h18q-3-9-11-11z" fill="#fff" stroke="#315675" stroke-width="1.5"/><circle cx="25" cy="47" r="6" fill="#343a40"/><circle cx="85" cy="47" r="6" fill="#343a40"/><circle cx="91" cy="11" r="10" fill="#fff" stroke="#315675" stroke-width="2"/><text x="86" y="16" font-size="14" font-weight="800" fill="#315675">P</text></symbol>
  <symbol id="scene-power-line" viewBox="0 0 100 90"><path d="M20 87L31 12M69 87L59 12M17 29h46M14 39h49M27 13h39" fill="none" stroke="#56646b" stroke-width="4"/><path d="M0 21Q45 33 100 19M0 45Q45 56 100 43" fill="none" stroke="#315675" stroke-width="2"/><path d="M78 52l-9 16h10l-3 16 15-22H81z" fill="#f3c64e" stroke="#684d10" stroke-width="2"/></symbol>
  <symbol id="scene-debris" viewBox="0 0 92 58"><path d="M5 51l14-17 11 8 15-28 15 18 10-9 17 28z" fill="#c6b8a4" stroke="#70543c" stroke-width="2"/><path d="M24 50l4-7 8 7M54 48l6-11 12 11" fill="none" stroke="#70543c" stroke-width="2"/></symbol>
  <symbol id="scene-water" viewBox="0 0 180 35"><path d="M0 10q15-12 30 0t30 0 30 0 30 0 30 0 30 0M0 25q15-12 30 0t30 0 30 0 30 0 30 0 30 0" fill="none" stroke="#397eaa" stroke-width="5" stroke-linecap="round"/></symbol>
  <symbol id="scene-drop" viewBox="0 0 28 40"><path d="M14 2C10 10 2 19 2 26a12 12 0 0 0 24 0C26 19 18 10 14 2z" fill="#4b7184" stroke="#315675" stroke-width="2"/><text x="10" y="30" font-size="12" font-weight="800" fill="#fff">?</text></symbol>
  <symbol id="scene-door" viewBox="0 0 54 92"><rect x="4" y="3" width="46" height="86" fill="#dbe8f5" stroke="#315675" stroke-width="3"/><path d="M13 10h28v79H13z" fill="#fff" stroke="#315675" stroke-width="2"/><circle cx="35" cy="52" r="2.5" fill="#8f1d22"/></symbol>
  <symbol id="scene-machine" viewBox="0 0 100 80"><rect x="5" y="27" width="90" height="48" rx="5" fill="#dbe8f5" stroke="#315675" stroke-width="3"/><circle cx="34" cy="50" r="15" fill="#fff" stroke="#315675" stroke-width="3"/><circle cx="34" cy="50" r="5" fill="#315675"/><path d="M66 38h17v8H66zM66 53h17v8H66zM24 27V9h35v18" fill="none" stroke="#315675" stroke-width="3"/></symbol>
  <symbol id="scene-owl" viewBox="0 0 44 40"><path d="M7 11L4 2l12 6M37 11l3-9-12 6" fill="#8a603e" stroke="#543a2b" stroke-width="2"/><ellipse cx="22" cy="23" rx="17" ry="16" fill="#8a603e" stroke="#543a2b" stroke-width="2"/><circle cx="16" cy="19" r="6" fill="#f3e7d0"/><circle cx="28" cy="19" r="6" fill="#f3e7d0"/><circle cx="16" cy="19" r="2" fill="#202a32"/><circle cx="28" cy="19" r="2" fill="#202a32"/><path d="M20 25l2 4 3-4" fill="#e4a734"/><path d="M10 31l-3 7M34 31l3 7" stroke="#e4a734" stroke-width="2"/></symbol>
  <symbol id="scene-rope" viewBox="0 0 550 100"><path d="M2 25Q275 95 548 25" fill="none" stroke="#795b3f" stroke-width="6" stroke-linecap="round"/><path d="M271 70c-2 12-10 18-16 25-8 9-1 16 13 14 14-2 18-9 10-17-5-6-8-12-7-21" fill="none" stroke="#795b3f" stroke-width="5" stroke-linecap="round"/></symbol>
  <symbol id="scene-paw" viewBox="0 0 50 45"><circle cx="11" cy="10" r="7" fill="#c18d59"/><circle cx="25" cy="5" r="7" fill="#c18d59"/><circle cx="39" cy="10" r="7" fill="#c18d59"/><circle cx="5" cy="24" r="6" fill="#c18d59"/><path d="M25 17c-9 0-19 10-19 18 0 7 6 10 12 7l7-3 7 3c6 3 12 0 12-7 0-8-10-18-19-18z" fill="#c18d59"/></symbol>
  <symbol id="scene-alarm" viewBox="0 0 44 44"><path d="M10 31h24l-4-7V17a8 8 0 0 0-16 0v7z" fill="#fff0ef" stroke="#8f1d22" stroke-width="3"/><path d="M18 36a4 4 0 0 0 8 0M22 3V0M5 8L1 4M39 8l4-4M3 19H0M44 19h-3" fill="none" stroke="#8f1d22" stroke-width="3" stroke-linecap="round"/></symbol>
  <symbol id="scene-bolt" viewBox="0 0 36 52"><path d="M21 2L4 29h12l-2 21 18-29H20z" fill="#f3c64e" stroke="#684d10" stroke-width="2"/></symbol>
  <symbol id="scene-question" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#fff9e8" stroke="#b6954f" stroke-width="2"/><text x="12" y="29" font-size="27" font-weight="800" fill="#684d10">?</text></symbol>
  <symbol id="scene-warning" viewBox="0 0 42 38"><path d="M21 2L40 36H2z" fill="#f3c64e" stroke="#684d10" stroke-width="2"/><path d="M21 12v11M21 29v1" stroke="#49390d" stroke-width="3" stroke-linecap="round"/></symbol>
  <symbol id="scene-report" viewBox="0 0 56 66"><path d="M5 3h34l12 12v48H5z" fill="#fff" stroke="#315675" stroke-width="3"/><path d="M39 3v13h12M14 27h27M14 37h27M14 47h19" fill="none" stroke="#315675" stroke-width="3"/></symbol>
  <symbol id="scene-binoculars" viewBox="0 0 64 48"><path d="M12 9h12l8 18 8-18h12l8 26H40l-8-10-8 10H4z" fill="#dbe8f5" stroke="#315675" stroke-width="3" stroke-linejoin="round"/><circle cx="16" cy="35" r="7" fill="#fff" stroke="#315675" stroke-width="3"/><circle cx="48" cy="35" r="7" fill="#fff" stroke="#315675" stroke-width="3"/></symbol>
  <symbol id="scene-train" viewBox="0 0 180 72"><path d="M18 10h130q18 0 18 18v24H18q-8 0-8-8V20q0-10 8-10z" fill="#e8eef2" stroke="#315675" stroke-width="3"/><path d="M27 18h24v17H27zM58 18h24v17H58zM89 18h24v17H89zM120 18h22v17h-22z" fill="#dceef6" stroke="#315675" stroke-width="2"/><path d="M10 43h156M10 57h156M26 54v9M50 54v9M74 54v9M98 54v9M122 54v9M146 54v9" stroke="#56646b" stroke-width="3"/><circle cx="41" cy="47" r="6" fill="#343a40"/><circle cx="131" cy="47" r="6" fill="#343a40"/></symbol>
`;

const sceneRecipes = {
  teamkommunikation: { environment: "table", items: [["report", 315, 112, 52, 62], ["report", 382, 142, 52, 62], ["question", 492, 115, 40, 40]] },
  geraetekunde: { environment: "table", items: [["machine", 310, 142, 100, 80], ["report", 430, 125, 48, 57]] },
  lageerkundung: { environment: "map", items: [["binoculars", 335, 130, 64, 48], ["question", 435, 145, 40, 40]] },
  menschenrettung: { environment: "building", items: [["house", 300, 137, 140, 120], ["person", 465, 200, 18, 36], ["question", 485, 133, 40, 40]] },
  verkehrsunfall: { environment: "road", items: [["tree", 437, 131, 40, 120], ["car", 341, 219, 90, 36], ["person", 492, 219, 18, 36], ["drop", 515, 249, 24, 35]] },
  wasserplanung: { environment: "river", items: [["report", 310, 132, 56, 66], ["water", 390, 211, 180, 35], ["question", 478, 127, 40, 40]] },
  ablaufplanung: { environment: "table", items: [["report", 304, 118, 56, 66], ["report", 382, 118, 56, 66], ["report", 460, 118, 56, 66]] },
  brand: { environment: "building", items: [["house", 305, 145, 140, 120], ["smoke", 396, 84, 55, 62], ["question", 490, 138, 40, 40]] },
  vegetationsbrand: { environment: "field", items: [["tree", 313, 143, 40, 120], ["tree", 399, 174, 34, 102], ["question", 504, 128, 40, 40]] },
  unwetter: { environment: "road", items: [["tree", 331, 163, 40, 120, "rotate(78 351 223)"], ["warning", 455, 134, 42, 38]] },
  hochwasser: { environment: "flood", items: [["house", 314, 116, 140, 120], ["water", 278, 235, 180, 35], ["question", 488, 137, 40, 40]] },
  gefahrstoff: { environment: "facility", items: [["machine", 327, 149, 100, 80], ["question", 450, 138, 40, 40], ["warning", 493, 190, 42, 38]] },
  personensuche: { environment: "field", items: [["tree", 302, 151, 40, 120], ["tree", 432, 166, 34, 102], ["person", 380, 222, 18, 36], ["question", 475, 126, 40, 40]] },
  stromausfall: { environment: "building", items: [["house", 312, 143, 140, 120], ["bolt", 425, 120, 32, 48], ["question", 487, 149, 40, 40]] },
  tiernotlage: { environment: "field", items: [["paw", 341, 167, 50, 45], ["question", 420, 133, 40, 40]] },
  brandmeldeanlage: { environment: "building", items: [["house", 305, 145, 140, 120], ["alarm", 449, 125, 44, 44], ["question", 501, 165, 40, 40]] },
  industriebrand: { environment: "facility", items: [["factory", 291, 147, 190, 120], ["smoke", 431, 82, 55, 62], ["question", 500, 143, 40, 40]] },
  lkwunfall: { environment: "road", items: [["truck", 282, 200, 160, 60], ["car", 454, 229, 75, 30], ["warning", 523, 141, 42, 38]] },
  oelspur: { environment: "road", items: [["drop", 330, 204, 28, 40], ["drop", 390, 218, 22, 32], ["drop", 445, 200, 25, 36], ["question", 499, 129, 40, 40]] },
  strassenueberflutung: { environment: "flood-road", items: [["house", 310, 118, 140, 120], ["water", 279, 239, 180, 35], ["warning", 477, 155, 42, 38]] },
  arbeitunfall: { environment: "facility", items: [["factory", 286, 151, 190, 120], ["machine", 380, 213, 86, 69], ["person", 325, 221, 18, 36], ["warning", 486, 132, 42, 38]] },
  tueröffnung: { environment: "building", items: [["door", 343, 153, 54, 92], ["person", 405, 207, 18, 36], ["question", 455, 141, 40, 40]] },
  firstresponder: { environment: "table", items: [["person", 320, 212, 18, 36], ["report", 372, 139, 56, 66], ["report", 456, 153, 48, 57]] },
  fahrzeugbrand: { environment: "road", items: [["car", 328, 220, 100, 40], ["smoke", 401, 139, 52, 58], ["question", 490, 127, 40, 40]] },
  bahnbrand: { environment: "rail", items: [["train", 277, 206, 190, 76], ["smoke", 420, 142, 52, 58], ["question", 498, 124, 40, 40]] },
  verkehrslenkung: { environment: "road", items: [["car", 334, 223, 95, 38], ["report", 449, 142, 50, 59], ["warning", 511, 131, 42, 38]] },
  rettungsdienst: { environment: "table", items: [["person", 319, 212, 18, 36], ["report", 373, 142, 56, 66], ["question", 472, 141, 40, 40]] }
};

function sceneSymbolUse([name, x, y, width, height, transform]) {
  return `<use href="#scene-${name}" x="${x}" y="${y}" width="${width}" height="${height}"${transform ? ` transform="${transform}"` : ""}/>`;
}

function sceneEnvironment(name) {
  const environments = {
    table: '<rect x="25" y="92" width="710" height="219" rx="18" fill="#edf1f3"/><rect x="78" y="249" width="604" height="12" rx="6" fill="#c4ccd1"/><path d="M126 261v43M634 261v43" stroke="#9ba8ae" stroke-width="8"/>',
    map: '<path d="M25 274Q170 218 324 268T735 251V318H25Z" fill="#9cbd8e"/><path d="M50 132l202 21 148-36 299 31v88l-226-24-159 43-264-30z" fill="#e7e2cf" stroke="#82918d" stroke-width="2"/><path d="M73 174l580 38" stroke="#fff" stroke-width="5" stroke-dasharray="12 10"/>',
    road: '<path d="M25 259h710" stroke="#78858c" stroke-width="86"/><path d="M25 259h710" stroke="#fff" stroke-width="3" stroke-dasharray="22 18"/><path d="M25 211h710M25 307h710" stroke="#56646b" stroke-width="2"/>',
    field: '<path d="M25 246Q160 195 284 237T520 230T735 221V318H25Z" fill="#bdd5ad"/><path d="M25 276Q175 232 310 270T560 264T735 252V322H25Z" fill="#85ae78"/>',
    building: '<rect x="25" y="88" width="710" height="230" rx="14" fill="#edf1f3"/><path d="M25 278h710" stroke="#bcc7cb" stroke-width="3"/><path d="M84 278h592" stroke="#d4dcdf" stroke-width="22"/>',
    facility: '<rect x="25" y="88" width="710" height="230" rx="14" fill="#e8edef"/><path d="M50 280h660M80 111v165M680 111v165" stroke="#c4cdd1" stroke-width="3"/>',
    flood: '<path d="M25 223Q160 193 280 230T520 222T735 211V318H25Z" fill="#85ae78"/><path d="M25 257Q145 223 280 258T520 253T735 240V318H25Z" fill="#5ba1bf"/>',
    "flood-road": '<path d="M25 259h710" stroke="#78858c" stroke-width="86"/><path d="M25 259h710" stroke="#fff" stroke-width="3" stroke-dasharray="22 18"/><path d="M25 307Q145 287 260 307T490 307T735 299" fill="none" stroke="#397eaa" stroke-width="18"/>',
    river: '<path d="M25 222Q147 195 266 231T504 222T735 211V318H25Z" fill="#85ae78"/><path d="M25 253Q147 224 266 262T504 252T735 241V318H25Z" fill="#397eaa"/><path d="M25 278Q147 249 266 287T504 277T735 266" fill="none" stroke="#b6e2ef" stroke-width="4"/>',
    rail: '<rect x="25" y="105" width="710" height="213" rx="14" fill="#edf1f3"/><path d="M40 265h670M40 291h670" stroke="#56646b" stroke-width="5"/><path d="M65 257v42M105 257v42M145 257v42M185 257v42M225 257v42M265 257v42M305 257v42M345 257v42M385 257v42M425 257v42M465 257v42M505 257v42M545 257v42M585 257v42M625 257v42M665 257v42M705 257v42" stroke="#8c969b" stroke-width="3"/>'
  };
  return environments[name] || environments.field;
}

function hasUnnegatedMention(text, pattern) {
  const regex = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`);
  return [...text.matchAll(regex)].some((match) => {
    const prefix = text.slice(Math.max(0, match.index - 40), match.index);
    const sentenceEnd = text.slice(match.index + match[0].length).search(/[.!?;\n]/);
    const suffix = text.slice(
      match.index + match[0].length,
      sentenceEnd === -1 ? text.length : match.index + match[0].length + sentenceEnd
    );
    const negatedBefore = /(?:\bkein(?:e|en|em|er)?|\bohne|\bnicht)\b(?:\W+\w+){0,3}\W*$/.test(prefix);
    const negatedAfter = /(?:\W+\w+){0,8}\W+\b(?:ist|sind|war|waren|bleibt|bleiben)\b(?:\W+\w+){0,3}\W+\b(?:nicht vorhanden|nicht vor Ort|nicht betroffen|nicht da|ausgeschlossen)\b/.test(suffix);
    return !negatedBefore && !negatedAfter;
  });
}

function exerciseIllustrationSVG(plan, scenario, parallelIncidentDetails = "") {
  const recipe = sceneRecipes[plan.templateId] || sceneRecipes.lageerkundung;
  const items = recipe.items.slice();
  const isOwlRiver = scenario.visualKind === "owl-rope-river";
  const environment = isOwlRiver ? "river" : recipe.environment;
  if (isOwlRiver) {
    items.splice(0, items.length, ["tree", 86, 142, 40, 120], ["tree", 628, 137, 40, 120], ["rope", 106, 117, 542, 100], ["owl", 371, 168, 18, 16], ["question", 481, 121, 40, 40]);
  }
  const fireExtentItems = {
    small: [["flame", 386, 187, 22, 30]],
    medium: [["flame", 366, 187, 26, 35], ["flame", 394, 179, 30, 40]],
    large: [["flame", 350, 187, 28, 38], ["flame", 379, 169, 34, 46], ["flame", 414, 183, 30, 41]]
  }[plan.fireExtent];
  if (fireExtentItems && fireScenarioIds.has(plan.templateId)) {
    items.push(...fireExtentItems);
  }
  const details = String(plan.scenarioDetails || "").toLocaleLowerCase("de");
  const addedSymbols = new Set(items.map(([name]) => name));
  const detailSymbols = [
    { pattern: /gas[- ]?tanks?|gasflaschen?|gasbehälter|gasbehaelter|propantanks?|erdgastanks?|druckbehälter|druckbehaelter/, symbol: "gas-tank" },
    { pattern: parkedVehiclePattern, symbol: "parked-car" },
    { pattern: /stromleitung|oberleitung|hochspannungsleitung|elektrische leitung/, symbol: "power-line" },
    { pattern: /trümmer|truemmer|einsturz|herabfallend|herabgestürzt|herabgestuerzt/, symbol: "debris" },
    { pattern: /pkw|auto|fahrzeug/, symbol: "car" },
    { pattern: /lkw|lastkraftwagen/, symbol: "truck" },
    { pattern: /baum|ast/, symbol: "tree" },
    { pattern: /wasser|überschwemm|ueberschwemm|flut|bach|fluss/, symbol: "water" },
    { pattern: /person|eingeklemmt|vermisst/, symbol: "person" },
    { pattern: /rauch|brand|feuer/, symbol: "smoke" },
    { pattern: /öl|oel|betriebsstoff/, symbol: "drop" },
    { pattern: /uhu|eule/, symbol: "owl" },
    { pattern: /tier|hund|katze|pferd/, symbol: "paw" },
    { pattern: /tür|tuer|wohnung/, symbol: "door" },
    { pattern: /zug|bahn|schiene/, symbol: "train" }
  ];
  detailSymbols.forEach(({ pattern, symbol }, index) => {
    const representedByEnvironment = symbol === "water" && ["river", "flood", "flood-road"].includes(environment);
    if (symbol === "car" && hasUnnegatedMention(details, parkedVehiclePattern)) return;
    if (hasUnnegatedMention(details, pattern) && !addedSymbols.has(symbol) && !representedByEnvironment && items.length < 10) {
      const positions = {
        "gas-tank": [540, 168, 38, 52],
        "parked-car": [480, 244, 88, 46],
        "power-line": [660, 144, 50, 45],
        debris: [660, 201, 58, 37]
      };
      const position = positions[symbol] || [533 + (index % 2) * 55, 177 + Math.floor(index / 2) * 28, symbol === "water" ? 100 : 34, symbol === "water" ? 20 : 34];
      items.push([symbol, ...position]);
      addedSymbols.add(symbol);
    }
  });
  if (plan.effort === "mittel" && !addedSymbols.has("question")) items.push(["question", 614, 119, 40, 40]);
  if (plan.effort === "hoch") {
    if (!addedSymbols.has("question")) items.push(["question", 594, 116, 40, 40]);
    items.push(["report", 672, 66, 36, 42]);
    if (plan.scenarioSize && plan.scenarioSize.unitCount > 3) items.push(["report", 625, 66, 36, 42]);
  }
  const parallelText = parallelIncidentDetails.toLocaleLowerCase("de");
  if (parallelText) {
    const hasMention = (pattern) => hasUnnegatedMention(parallelText, pattern);
    const hasParkedVehicle = hasMention(parkedVehiclePattern);
    if (hasMention(/lkw|lastkraftwagen/g)) items.push(["truck", 510, 218, 130, 49]);
    else if (!hasParkedVehicle && hasMention(/pkw|auto|fahrzeug|unfall|zusammenstoß|kollision/g)) items.push(["car", 522, 228, 90, 36]);
    if (hasMention(/brand|feuer|brennt|entzünd/g)) {
      items.push(["smoke", 570, 120, 45, 50], ["flame", 550, 170, 30, 40]);
    }
    if (hasMention(/baum|ast/g)) items.push(["tree", 635, 145, 30, 90]);
    if (hasMention(/wasser|überschwemm|ueberschwemm|flut|bach|fluss/g)) items.push(["water", 500, 267, 100, 20]);
    if (hasMention(/person|eingeklemmt|vermisst|verletzte|verletzter/g)) items.push(["person", 625, 218, 18, 36]);
    if (hasMention(/öl|oel|betriebsstoff/g)) items.push(["drop", 622, 250, 22, 32]);
    if (hasMention(/uhu|eule/g)) items.push(["owl", 646, 183, 26, 24]);
    else if (hasMention(/tier|hund|katze|pferd/g)) items.push(["paw", 638, 185, 35, 32]);
    if (hasMention(/tür|tuer|wohnung/g)) items.push(["door", 655, 150, 34, 58]);
    if (hasMention(/zug|bahn|schiene/g)) items.push(["train", 510, 206, 135, 54]);
    if (hasMention(/gas[- ]?tanks?|gasflaschen?|gasbehälter|gasbehaelter|propantanks?|erdgastanks?|druckbehälter|druckbehaelter/g)) items.push(["gas-tank", 540, 168, 38, 52]);
    if (hasParkedVehicle) items.push(["parked-car", 480, 244, 88, 46]);
    if (hasMention(/stromleitung|oberleitung|hochspannungsleitung|elektrische leitung/g)) items.push(["power-line", 660, 144, 50, 45]);
    if (hasMention(/trümmer|truemmer|einsturz|herabfallend|herabgestürzt|herabgestuerzt/g)) items.push(["debris", 660, 201, 58, 37]);
  }
  const scaleBar = `<g class="scene-scale"><path d="M590 296h100M590 291v10M690 291v10" stroke="#253746" stroke-width="3"/><text x="604" y="287" font-size="11" font-weight="700" fill="#253746">5 m (ca.)</text></g>`;
  const itemMarkup = items.map(sceneSymbolUse).join("");
  const imageId = parallelIncidentDetails ? "parallel" : "original";
  return `<svg class="scene-image" viewBox="0 0 760 410" role="img" aria-labelledby="image-title-${imageId} image-description-${imageId}">
    <title id="image-title-${imageId}">Fiktive Szenenillustration: ${escapeHTML(scenario.title)}</title>
    <desc id="image-description-${imageId}">Modular zusammengesetzte Vektorillustration. Physische Symbole verwenden einen gemeinsamen ungefähren Maßstab von 20 Bildpunkten pro Meter, sind aber keine Vermessung einer realen Einsatzstelle. Keine Handlungsanweisung.</desc>
    <defs>
      <linearGradient id="scene-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dceef6"/><stop offset="1" stop-color="#f8fbfc"/></linearGradient>
      ${sceneSymbolDefinitions}
    </defs>
    <rect x="14" y="14" width="732" height="382" rx="14" fill="url(#scene-sky)" stroke="#66737b" stroke-width="2"/>
    ${sceneEnvironment(environment)}
    ${itemMarkup}
    ${scaleBar}
    <rect x="27" y="25" width="282" height="27" rx="6" fill="#fff" stroke="#8f1d22" stroke-width="1.5"/>
    <text x="39" y="44" font-size="11" font-weight="800" fill="#8f1d22">FIKTIVE BILDSZENE · NICHT NACHSTELLEN</text>
    <rect x="27" y="327" width="706" height="50" rx="8" fill="#253746" opacity=".9"/>
    <use href="#scene-warning" x="35" y="332" width="34" height="31"/>
    <text x="75" y="357" font-size="12" font-weight="700" fill="#fff">${escapeHTML(scenario.factor)}</text>
  </svg>`;
}

function unitPlanningSummary(plan) {
  const entries = [];
  if (plan.fireVehicles && plan.fireVehicles.length) entries.push(`Feuerwehr-Fahrzeugtypen: ${plan.fireVehicles.join(", ")}`);
  if (plan.fireUnitDetails) entries.push(`Lokale Feuerwehrdaten: ${plan.fireUnitDetails}`);
  (plan.countyUnits || []).forEach((unit) => {
    const vehicles = unit.vehicles && unit.vehicles.length
      ? unit.vehicles.map((vehicle) => vehicle.label).join(", ")
      : "kein Fahrzeug ausgewählt";
    entries.push(`${unit.name}: ${vehicles}`);
  });
  if (plan.otherCountyUnits) entries.push(`Weitere Feuerwehren laut örtlicher Eingabe: ${plan.otherCountyUnits}`);
  if (plan.partnerTypes && plan.partnerTypes.length) entries.push(`Weitere Einheiten: ${plan.partnerTypes.join(", ")}`);
  if (plan.partnerUnitDetails) entries.push(`Angaben zu weiteren Einheiten: ${plan.partnerUnitDetails}`);
  if (!entries.length) entries.push("Keine zusätzlichen Einheiten ausgewählt.");
  if (plan.countyCrewEstimate && plan.countyCrewEstimate.knownPersonnel) {
    entries.push(`Rechnerischer Richtwert bei normtypischer Vollbesetzung der bekannten Fahrzeugtypen und je einer Person für ausgewählte KBI-/KBM-Rollen: ${plan.countyCrewEstimate.knownPersonnel} Personen.`);
  }
  if (plan.countyCrewEstimate && plan.countyCrewEstimate.vehiclesWithoutStaffingData.length) {
    entries.push(`Für ${plan.countyCrewEstimate.vehiclesWithoutStaffingData.join(", ")} ist keine Besatzungszahl hinterlegt; örtlich prüfen.`);
  }
  if (plan.fireVehicles && plan.fireVehicles.length) {
    entries.push("Die Richtwerte für zusätzlich ausgewählte eigene HLF/LF/TSF/RW-Typen werden ebenfalls eingerechnet; tatsächliche Besatzungen können abweichen.");
  }
  if (plan.countyCrewEstimate && plan.countyCrewEstimate.stationsWithoutVehicleSelection.length) {
    entries.push(`Für ${plan.countyCrewEstimate.stationsWithoutVehicleSelection.join(", ")} wurde noch kein Fahrzeug ausgewählt.`);
  }
  entries.push("Besatzungsrichtwerte sind keine tatsächliche Belegung oder Mindestteilnehmerzahl; für eine reale Besatzung örtliche Fahrzeug- und Personaldaten prüfen.");
  return entries.join(" ");
}

function renderExercisePacket(plan) {
  const scenario = exercisePacketData(plan);
  const checklist = scenarioChecklist(plan);
  const potentialHazards = plan.potentialHazards || scenarioHazardsFor(plan.templateId, plan.scenarioDetails);
  const hazardLegend = '<span><i class="legend-hazard"></i> Einflussfaktor / offene Frage, unbestätigt</span>';
  const fireExtentLegend = {
    small: "Flammen: klein (frei gewähltes, unbestätigtes Symbol)",
    medium: "Flammen: mittel (frei gewähltes, unbestätigtes Symbol)",
    large: "Flammen: groß (frei gewähltes, unbestätigtes Symbol)"
  }[plan.fireExtent];
  const unitsField = ["einsatzablauf", "mixed"].includes(plan.exerciseType)
    ? `<div><dt>WELCHE EINHEITEN SIND IM PLANSPIEL VORGESEHEN?</dt><dd>${escapeHTML(unitPlanningSummary(plan))}</dd></div>`
    : "";
  const scaleInjects = plan.scenarioSize && plan.scenarioSize.additionalInjects
    ? plan.scenarioSize.additionalInjects.map((text, index) => {
      const gap = Math.max(1, plan.duration - plan.injectMinute);
      const minute = Math.min(plan.duration - 1, plan.injectMinute + Math.floor(gap * (index + 1) / (plan.scenarioSize.additionalInjects.length + 1)));
      return `<div><dt>Zusätzliche Koordinationskarte ab Minute ${minute}</dt><dd>${escapeHTML(text)}</dd></div>`;
    }).join("")
    : "";
  const parallelScene = plan.parallelIncident
    ? `<div class="scene-comparison">
        <figure class="scene-panel">
          <figcaption>1. Ursprüngliche Lage</figcaption>
          ${exerciseIllustrationSVG(plan, scenario)}
        </figure>
        <figure class="scene-panel">
          <figcaption>2. Ergänzung laut paralleler Meldung</figcaption>
          ${exerciseIllustrationSVG(plan, scenario, plan.parallelIncident.details)}
        </figure>
      </div>
      <p class="parallel-scene-description"><strong>Parallele Meldung (deine Eingabe):</strong> ${escapeHTML(plan.parallelIncident.details)} Nur ausdrücklich genannte und erkannte Bildelemente werden ergänzt; weitere Lagedetails werden nicht erfunden.</p>`
    : exerciseIllustrationSVG(plan, scenario);
  return `
    <section id="printable-packet" class="exercise-packet" aria-label="Dreiseitiges Übungs-Alarmfax mit Szenenbild und Checkliste">
      <article class="packet-page fax-page">
        <header class="fax-header">
          <div><p class="eyebrow">Ausbildungsunterlage · Seite 1 von 3</p><h2>Übungs-Alarmfax</h2></div>
          <span class="exercise-stamp">FIKTIV<br>NICHT VERSENDEN</span>
        </header>
        <p class="fax-subtitle">${escapeHTML(scenario.title)}</p>
        <p><strong>Übungsform:</strong> ${escapeHTML(plan.exerciseTypeName || "Fiktives Planspiel")}</p>
        <p class="fax-warning">Nur als vorbereitete Planspielkarte verwenden. Keine reale Alarmierung, Notruf- oder Einsatzkommunikation auslösen.</p>
        <dl class="fax-fields">
          ${unitsField}
          <div><dt>WO?</dt><dd>${escapeHTML(scenario.where)}</dd></div>
          <div><dt>WAS ist passiert?</dt><dd>${escapeHTML(scenario.what)}</dd></div>
          <div><dt>WER meldet / ist beteiligt?</dt><dd>${escapeHTML(scenario.who)}</dd></div>
          <div><dt>WIE VIELE?</dt><dd>${escapeHTML(scenario.howMany)}</dd></div>
          <div><dt>WANN?</dt><dd>Szenariobeginn T0; Zeitpunkt wird nur im Planspiel angesetzt, keine reale Uhrzeit.</dd></div>
          <div><dt>WAS ist bekannt?</dt><dd>${escapeHTML(scenario.known)}</dd></div>
          <div><dt>WELCHE Gefahren / Unklarheiten?</dt><dd>${escapeHTML(scenario.open)}</dd></div>
          <div class="fax-hazard-field"><dt>Mögliche Gefahren und Einflussfaktoren (nicht abschließend)</dt><dd><ul class="fax-hazard-list">${potentialHazards.map((hazard) => `<li>${escapeHTML(hazard)}</li>`).join("")}</ul><p>Nur Prüfungspunkte: nichts davon ist bestätigt oder vollständig. Tatsächliche Gefahren richten sich nach der Lage; Maßnahmen ausschließlich nach gültiger Ausbildung und örtlichem Auftrag.</p></dd></div>
          <div><dt>WAS soll die Gruppe klären?</dt><dd>Bestätigte Angaben, Annahmen, offene Fragen und einen verständlichen gemeinsamen Kurzbericht erarbeiten. Keine realen Einsatzmaßnahmen ableiten.</dd></div>
          ${plan.scenarioSize && plan.scenarioSize.unitCount > 1 ? `<div><dt>GRÖSSE DES PLANSPIELS</dt><dd>${escapeHTML(plan.scenarioSize.label)}: ${escapeHTML(plan.scenarioSize.unitCount)} ausgewählte Einheit(en)/Fahrzeuggruppen. ${escapeHTML(plan.scenarioSize.briefing)}</dd></div>` : ""}
          ${scaleInjects}
          ${plan.parallelIncident ? `<div><dt>PARALLELE MELDUNG (NUR PLANSPIEL)</dt><dd>${escapeHTML(plan.parallelIncident.details)} Die ursprüngliche Meldung bleibt unverändert.</dd></div>` : ""}
        </dl>
        <div class="fax-footer-grid">
          <p><strong>Übungsort:</strong> ${escapeHTML(plan.location)} (Ort der Ausbildung, keine Einsatzadresse)</p>
          <p><strong>Schwierigkeitsgrad:</strong> ${escapeHTML(plan.effort)} – ${escapeHTML(scenario.difficulty)}</p>
          <p><strong>Durchführung:</strong> Ausschließlich als Textkarte durch die Übungsleitung. ${escapeHTML(plan.inject.title)} als separate, kontrollierte Einspielung verwenden.</p>
        </div>
        <p class="packet-safety">Vorher fachlich und örtlich prüfen. Keine echten Gefahren, Fahrzeuge, Personen, Geräteeinsätze, Alarmierungen oder Einsatzkommunikation nachstellen. Örtliche Regeln haben Vorrang.</p>
      </article>
      <article class="packet-page sketch-page">
        <header class="fax-header">
          <div><p class="eyebrow">Ausbildungsunterlage · Seite 2 von 3</p><h2>${plan.parallelIncident ? "Szenenbilder" : "Szenenbild"}</h2></div>
          <span class="exercise-stamp">FIKTIV<br>NICHT VERSENDEN</span>
        </header>
        <p class="fax-subtitle">${escapeHTML(scenario.title)}</p>
        ${parallelScene}
        <div class="sketch-legend"><span><i class="legend-known"></i> bekannte Textangabe</span><span><i class="legend-open"></i> offen / durch Gruppe zu klären</span>${hazardLegend}</div>
        <p class="sketch-caption">${fireExtentLegend ? `${escapeHTML(fireExtentLegend)}. ` : ""}Modular zusammengesetzte Vektorillustration; Fahrzeug-, Personen-, Baum- und Gebäudesymbole stehen in einem gemeinsamen ungefähren Maßstab (20 Bildpunkte ≈ 1 m). Flammen und Gefahrensymbole sind illustrative, nicht maßstäbliche Planspielzeichen; keine bestätigte Ausdehnung, Vermessung oder Handlungsanweisung.</p>
      </article>
      <article class="packet-page checklist-page">
        <header class="fax-header">
          <div><p class="eyebrow">Ausbildungsunterlage · Seite 3 von 3</p><h2>Chronologische Checkliste für die Einsatzkraft</h2></div>
          <span class="exercise-stamp">FIKTIV<br>NUR ÜBUNG</span>
        </header>
        <p class="fax-subtitle">${escapeHTML(scenario.title)}</p>
        <p class="checklist-warning"><strong>Perspektive der Einsatzkraft im fiktiven Planspiel.</strong> Die Gruppe bespricht gemeinsam eine Szenariokarte. Die Tabelle ordnet Klärungs- und Kommunikationsaufgaben nach Funktion; sie gibt keine taktische Einsatzreihenfolge oder konkreten Einsatzmaßnahmen vor. Keine echten Einsatzhandlungen nachstellen.</p>
        ${renderChecklistTable(checklist)}
        <section class="checklist-sources">
          <h3>Fachliche Prüfung und Quellen</h3>
          <p>Die Szenario-Schwerpunkte helfen der Einsatzkraft, die passende Lageinformation und eigene Zuständigkeit zu klären. Sie ersetzen keine praktischen Ausbildungsunterlagen. Die verlinkte Übersicht der Staatlichen Feuerwehrschulen enthält Kontakte; aktuelle szenariobezogene Abläufe und örtliche Verfahren dort beziehungsweise bei der zuständigen Ausbildungsstelle prüfen. Dynamische Treffer auf Gültigkeit prüfen.</p>
          <ul>${(plan.theoryResources || []).map((resource) => `<li><a href="${escapeHTML(resource.url)}">${escapeHTML(resource.title)}</a></li>`).join("")}</ul>
        </section>
      </article>
    </section>`;
}

function scenarioChecklist(plan) {
  const scenarioFocus = {
    brand: "Gebäudebereich, Nutzung, gemeldete Personen und Beobachtungen beachten. Ursache, Ausmaß und weitere Gefahren nicht annehmen; die taktische Vorgehensweise nur nach gültiger Ausbildung und Auftrag der zuständigen Führungskraft bestimmen.",
    brandmeldeanlage: "Auslösebereich, Informationsquelle und zusätzliche Wahrnehmungen unterscheiden. Eine Auslösung allein bestätigt keinen Brand; weitere Schritte richten sich nach dem erteilten Auftrag und den örtlichen Verfahren.",
    industriebrand: "Vorhandene Angaben zu Betriebsbereichen, Nutzung, Personen und Stoffhinweisen berücksichtigen. Unbekannte Stoffe oder Gefahren nicht selbst bestimmen; erforderliche Fachinformationen über die zuständigen Stellen klären lassen.",
    vegetationsbrand: "Beobachtungsort, Zeitpunkt, gemeldete Ausdehnung und Wetterangaben beachten. Veränderung und Zugänglichkeit nur nach bestätigter Lage und Führungsvorgabe bewerten.",
    verkehrsunfall: "Auftrag und örtliche Vorgaben zur Verkehrssicherung beachten. Fahrzeugzahl, Position, betroffene Personen und mögliche Betriebsstoffhinweise als bestätigt oder ungeklärt unterscheiden; die App legt keine Reihenfolge für Verkehrsmaßnahmen oder technische Rettung fest.",
    lkwunfall: "Fahrzeugart, Zahl der Fahrzeuge, betroffene Personen und verfügbare Ladungsinformationen beachten. Unbekannte Ladung bleibt unbekannt; Spezialmaßnahmen nur durch dafür zuständige und ausgebildete Kräfte nach örtlichem Verfahren.",
    unwetter: "Meldungsort, Zeitpunkt, mögliche Wegbehinderung und weitere Schäden beachten. Veränderungen oder neue Gefahren an die zuständige Führungskraft melden; Schäden und Zugänglichkeit nicht unterstellen.",
    oelspur: "Gemeldeten Bereich, Ausdehnung und Beschreibung der Verunreinigung beachten. Stoff und Gefahren bleiben ohne bestätigte Informationen unbekannt; Maßnahmen nur nach Auftrag und gültiger Fachausbildung.",
    arbeitunfall: "Angaben zu betroffenen Personen, Arbeitsbereich und beteiligten Geräten beachten. Gefahren und Gerätezustand nicht annehmen; Vorgehen nur im Rahmen des Auftrags, der Ausbildung und örtlichen Vorgaben.",
    "tueröffnung": "Anlass, meldende Stelle und mögliche betroffene Person beachten. Berechtigung, Dringlichkeit und Vorgehen nicht selbst unterstellen; Entscheidung und Maßnahmen den zuständigen Stellen und örtlichen Vorgaben überlassen.",
    hochwasser: "Betroffenen Gebäudebereich, Zeitpunkt und gemeldete Wasserentwicklung beachten. Stromversorgung und weitere Gefahren als ungeklärt behandeln; nur nach Auftrag und den geltenden Sicherheitsvorgaben handeln.",
    strassenueberflutung: "Gemeldeten Straßenabschnitt und bekannte Einschränkungen beachten. Wasserstand, Strömung und Befahrbarkeit nicht annehmen; Verkehrssicherungs- und Absperrmaßnahmen nur nach zuständigem Auftrag.",
    gefahrstoff: "Wortlaut, Quelle und Ort des Stoffhinweises beachten. Stoffidentität und Gefahren bleiben unbekannt; keine Identifizierung oder Annäherung ableiten und ausschließlich nach Auftrag sowie gültiger Fachausbildung handeln.",
    personensuche: "Letzten bekannten Ort und Zeitpunkt, Meldungsquelle und widersprüchliche Hinweise beachten. Suchgebiet, Zuständigkeit und Vorgehen mit der zuständigen Führung abstimmen; keine eigenständige Suchstrategie aus der App ableiten.",
    menschenrettung: "Übermittelte Angaben zu Aufenthaltsort und Unterstützungsbedarf beachten. Zustand nicht diagnostizieren; Betreuung und medizinische Maßnahmen nur durch dafür qualifizierte Kräfte nach Auftrag.",
    firstresponder: "Gemeldeten Anlass, Zeitpunkt, Zahl betroffener Personen und Informationsstand beachten. Aufgabenbereich und Übergabe mit den zuständigen Kräften abstimmen; keine medizinische Bewertung oder Behandlung aus der App ableiten.",
    fahrzeugbrand: "Fahrzeugart, Ort, Zeitpunkt, gemeldete Beobachtungen und mögliche Betroffenheit unterscheiden. Unbestätigte Angaben zu Brand, Personen oder weiteren Gefahren offenlassen; keine Brandbekämpfungs- oder Rettungsmaßnahmen aus der App ableiten.",
    bahnbrand: "Meldungsquelle, Haltepunkt, Zeitpunkt und Angaben zu Schienenfahrzeug, Betriebszustand und möglichen Betroffenen getrennt erfassen. Zuständige Stellen und Informationsbedarf klären; keine Gleis- oder Bahnmaßnahmen aus der App ableiten.",
    verkehrslenkung: "Gemeldeten Straßenabschnitt, Zeitpunkt, Quelle und aktuelle Verkehrsinformationen unterscheiden. Zuständigkeit und Abstimmungsbedarf klären; keine Sperrung, Umleitung oder Verkehrsmaßnahme aus der App ableiten.",
    rettungsdienst: "Anforderung, Quelle, Treffpunkt und Umfang der gewünschten Unterstützung aus der Textkarte herausarbeiten. Eigene Rolle und Grenzen mit den zuständigen medizinischen Kräften klären; keine medizinische Bewertung oder Handlung aus der App ableiten.",
    tiernotlage: "Gemeldete Tierart, Aufenthaltsort und Umgebungsbeschreibung beachten. Verhalten und Gefahren nicht unterstellen; Umgang nur nach Auftrag und mit den dafür qualifizierten Kräften abstimmen.",
    stromausfall: "Zeitpunkt, gemeldeten Umfang und betroffene Bereiche des Ausfalls beachten. Ursache und Zustand elektrischer Anlagen bleiben ungeklärt; keine Anlage bedienen und nur nach Auftrag sowie geltenden Sicherheitsvorgaben handeln.",
    wasserplanung: "Vorgegebene Bedarfe, Ressourcen, Mengen und Abhängigkeiten anhand bestätigter Informationen prüfen. Planung und Umsetzung nur nach Auftrag, qualifizierter Ausbildung und lokalen Vorgaben; die App liefert keine technischen Berechnungen.",
    lageerkundung: "Meldungen nach Quelle und Zeitfolge vergleichen. Widersprüche und fehlende Informationen der zuständigen Führungskraft mitteilen und keine unbestätigte Angabe als Tatsache behandeln.",
    teamkommunikation: "Eigene Rolle und Auftrag klären, wichtige Informationen nach örtlichem Meldeweg weitergeben und Rückmeldungen bestätigen. Keine realen Einsatzkanäle oder Funkmeldungen verwenden.",
    geraetekunde: "Nur die im Auftrag genannten Geräte und bestätigten Unterlagen heranziehen. Bedienung und Eignung setzen entsprechende Ausbildung, Freigabe und örtliche Vorgaben voraus; die App gibt keine Bedienfolge vor.",
    ablaufplanung: "Auftrag, Zuständigkeiten, Zeitpunkte und Übergaben nach den örtlichen Vorgaben nachvollziehen. Änderungen an die zuständige Führungskraft melden und keine reale Führungs- oder Entscheidungsfolge aus der App ableiten."
  };
  const focus = scenarioFocus[plan.templateId] || "Szenariospezifische Angaben, offene Gefahren und eigene Zuständigkeit mit der zuständigen Führungskraft klären. Konkrete Maßnahmen ausschließlich aus aktueller Ausbildung und örtlichen Vorgaben ableiten.";
  return {
    focus,
    phases: [
      {
        phase: "1. Auftrag und Meldung gemeinsam aufnehmen",
        gruppenfuehrer: "Bespricht die gemeinsame Szenariokarte; klärt Auftrag und Unklarheiten.",
        angriffstrupp: "Nennt auftragsrelevante Angaben und fehlende Informationen.",
        wassertrupp: "Nennt fehlende Angaben zu Ressourcen und Abhängigkeiten.",
        schlauchtrupp: "Nennt offene Angaben zu Umfeld und Abstimmung.",
        melder: "Gibt Quelle und Zeitpunkt der Meldung wieder; falls vorgesehen.",
        maschinist: "Klärt Fahrzeug- und Materialangaben anhand der Karte; keine Bedienung."
      },
      {
        phase: "2. Lagebild und Szenarioschwerpunkt abgleichen",
        gruppenfuehrer: "Trennt Fakten, Annahmen und offene Fragen; bezieht den Schwerpunkt ein.",
        angriffstrupp: "Ordnet die Angaben dem Auftrag zu; keine Maßnahmen ableiten.",
        wassertrupp: "Unterscheidet bestätigte und ungeklärte Ressourcenangaben.",
        schlauchtrupp: "Benennt fehlende Umfeld- und Abstimmungsinformationen.",
        melder: "Wiederholt die gemeinsame Zusammenfassung; falls vorgesehen.",
        maschinist: "Prüft Fahrzeug- und Materialangaben; Verfügbarkeit bleibt zu klären."
      },
      {
        phase: "3. Rollen und offene Punkte abstimmen",
        gruppenfuehrer: "Klärt Rollen und Rückmeldungen im Planspiel; keine taktische Vorgabe.",
        angriffstrupp: "Nennt eigenen Informations- und Klärungsbedarf.",
        wassertrupp: "Nennt Ressourcenabhängigkeiten und offene Verfügbarkeit.",
        schlauchtrupp: "Nennt erforderliche Abstimmungen mit anderen Rollen.",
        melder: "Fasst vereinbarte Informationen zusammen; falls vorgesehen.",
        maschinist: "Nennt offene Fragen zu Fahrzeug- und Materialstatus."
      },
      {
        phase: "4. Neue oder widersprüchliche Textkarte einordnen",
        gruppenfuehrer: "Hält Ausgangslage und Zusatzmeldung getrennt; aktualisiert das Planspiel-Lagebild.",
        angriffstrupp: "Nennt betroffene Auftragspunkte und kennzeichnet Unbestätigtes.",
        wassertrupp: "Nennt mögliche Folgen für Ressourcenannahmen.",
        schlauchtrupp: "Nennt zusätzlichen Informations- und Abstimmungsbedarf.",
        melder: "Gibt die Textkarte mit Quellenhinweis weiter; falls vorgesehen.",
        maschinist: "Prüft, ob Fahrzeug- und Materialannahmen neu zu klären sind."
      },
      {
        phase: "5. Rückmeldung und Abschluss",
        gruppenfuehrer: "Fasst Lagebild, offene Fragen und Rückmeldungen zusammen.",
        angriffstrupp: "Meldet Informationsstand und offene Auftragspunkte zurück.",
        wassertrupp: "Meldet offene Ressourcen- und Verfügbarkeitsangaben zurück.",
        schlauchtrupp: "Meldet offene Umfeld- und Abstimmungspunkte zurück.",
        melder: "Unterstützt die Zusammenfassung; markiert Ungeklärtes; falls vorgesehen.",
        maschinist: "Meldet offene Fahrzeug- und Materialangaben zurück."
      }
    ]
  };
}

function renderChecklistTable(checklist) {
  const columns = [
    ["gruppenfuehrer", "Gruppenführer"],
    ["angriffstrupp", "Angriffstrupp"],
    ["wassertrupp", "Wassertrupp"],
    ["schlauchtrupp", "Schlauchtrupp"],
    ["melder", "Melder"],
    ["maschinist", "Maschinist"]
  ];
  return `<p class="checklist-focus"><strong>Szenarioschwerpunkt:</strong> ${escapeHTML(checklist.focus)}</p>
    <div class="checklist-table-wrap">
      <table class="checklist-role-table">
        <thead><tr><th scope="col">Phase</th><th scope="col">Funktion und Planspielaufgabe</th></tr></thead>
        <tbody>${checklist.phases.map((phase) => `<tr><th scope="row">${escapeHTML(phase.phase)}</th><td><ul class="checklist-role-list">${columns.map(([key, title]) => `<li><strong>${title}:</strong> ${escapeHTML(phase[key])}</li>`).join("")}</ul></td></tr>`).join("")}</tbody>
      </table>
    </div>
    <p class="checklist-role-note">Rollenbezeichnungen dienen der Planspielgliederung. Einen Melder nur aufführen, wenn diese Funktion für die konkrete Einheit vorgesehen ist. Reale Tätigkeiten, Reihenfolgen und Zuständigkeiten ausschließlich nach aktueller FwDV, Ausbildung, Führungsentscheidung und örtlichen Vorgaben; die verantwortliche Ausbildungsleitung muss diese Tabelle vor der Nutzung prüfen.</p>`;
}

function renderTheoryScript(plan) {
  const scenario = exercisePacketData(plan);
  const checklist = scenarioChecklist(plan);
  const potentialHazards = plan.potentialHazards || scenarioHazardsFor(plan.templateId, plan.scenarioDetails);
  const contentPoints = [
    `Meldungsinhalt: ${scenario.what}`,
    `Als bekannt ausgewiesen: ${scenario.known}`,
    `Als offen ausgewiesen: ${scenario.open}`
  ];
  return `
    <section id="printable-theory" class="theory-sheet" aria-label="Theorie-Skript">
        <header class="theory-header">
          <p class="eyebrow">Ausbildungsunterlage · Theorie-Skript</p>
          <h2>${escapeHTML(scenario.title)}</h2>
          <p>${escapeHTML(plan.exerciseTypeName)} · ${escapeHTML(plan.duration)} Minuten · ${escapeHTML(plan.audience)}</p>
        </header>
        <div class="theory-validation"><strong>Fachlicher Rahmen:</strong> Dieses Skript ordnet das Lernziel, die fiktive Szenariomeldung und die vorhandenen Lernaufträge. Es ist keine amtliche FwDV-Wiedergabe und enthält keine verbindlichen Einsatzverfahren. Vor Verwendung die aktuell in Bayern geltenden Feuerwehr-Dienstvorschriften, landesrechtlichen Regelungen und örtlichen Vorgaben durch die verantwortliche Ausbildungsleitung prüfen.</div>
        <section class="theory-section">
          <h3>Lernziel</h3>
          <p>${escapeHTML(plan.objective)}</p>
        </section>
        <section class="theory-section">
          <h3>Skript-Stichpunkte: Szenario und Informationslage</h3>
          ${listHTML(contentPoints)}
          <p>Alle Angaben sind fiktive Lernimpulse. Unbestätigte Hinweise nicht als Tatsachen oder als technische Einsatzbewertung übernehmen.</p>
        </section>
        <section class="theory-section">
          <h3>Mögliche Gefahren und Einflussfaktoren (nicht abschließend)</h3>
          <p>Nur unbestätigte Prüfungspunkte, keine Gefahrenfeststellung und keine Maßnahmenanweisung. Tatsächliche Gefahren und Vorgehen durch zuständige Fachkräfte anhand der aktuellen Lage, Ausbildung und örtlichen Vorgaben bewerten.</p>
          ${listHTML(potentialHazards)}
        </section>
        <section class="theory-section">
          <h3>Szenariobezogene Lernaufträge</h3>
          ${listHTML(plan.participantTasks || [])}
        </section>
        <section class="theory-section">
          <h3>Chronologische Checkliste für die Einsatzkraft</h3>
          <p>Perspektive und Klärungspunkte für die fiktive Übung. Konkrete taktische Maßnahmen und Reihenfolgen sind nicht vorgegeben.</p>
          ${renderChecklistTable(checklist)}
        </section>
        <section class="theory-section">
          <h3>Leitfragen für die Besprechung</h3>
          ${listHTML(plan.observationPoints || [])}
        </section>
        <section class="theory-section">
          <h3>Abschluss und Lerntransfer</h3>
          ${listHTML(plan.debrief || [])}
          <p>Offene fachliche Fragen markieren und anhand der verlinkten Originalquellen klären. Keine Inhalte aus diesem Skript als Ersatz für die geltenden Vorschriften oder die örtliche Ausbildung verwenden.</p>
        </section>
        <section class="theory-section theory-sources">
          <h3>Quellen und Links</h3>
          <ul>${(plan.theoryResources || []).map((resource) => `<li><a href="${escapeHTML(resource.url)}">${escapeHTML(resource.title)}</a> – ${escapeHTML(resource.description)}</li>`).join("")}</ul>
          <p>Bei dynamischen Suchen konkrete Dokumente, Versionsstand und Anwendbarkeit vor der Ausbildung prüfen.</p>
        </section>
    </section>`;
}

function renderPlan(plan) {
  const potentialHazards = plan.potentialHazards || scenarioHazardsFor(plan.templateId, plan.scenarioDetails);
  const stepsHTML = plan.steps.map((item, index) =>
    `<li class="plan-step"><strong>${startLabel(plan.steps, index)}–${escapeHTML(startLabel(plan.steps, index + 1))} Min.</strong> <b>${escapeHTML(item.title)}:</b> ${escapeHTML(item.text)}</li>`
  ).join("");
  const groupsHTML = (plan.groups || []).map((group) => `
    <article class="group-card">
      <h4>Trupp ${escapeHTML(group.number)} · ${escapeHTML(group.title)}</h4>
      <p class="group-meta">${escapeHTML(group.people)} Teilnehmende · Beobachtung durch Ausbilder/in ${escapeHTML(group.instructor)}</p>
      <p><strong>Auftrag:</strong> ${escapeHTML(group.task)}</p>
      <p><strong>Ergebnis:</strong> ${escapeHTML(group.output)}</p>
      <p><strong>Material:</strong> ${group.materials.length ? group.materials.map(escapeHTML).join(", ") : "Kein Einzelmaterial zugeteilt; Ausgabe oder gemeinsame Nutzung vorab durch die Ausbildungsleitung festlegen."}</p>
    </article>`).join("");
  const wishesHTML = plan.wishes
    ? `<section class="plan-section"><h3>Besondere Wünsche und Ergänzungen</h3><p>${escapeHTML(plan.wishes)}</p></section>`
    : "";
  const inject = plan.inject || {
    title: "Keine Einspielung hinterlegt",
    card: "Dieser ältere gespeicherte Vorschlag enthält keine kontrollierte Lageeinspielung. Bei Bedarf neu erstellen."
  };
  const injectMinute = Number(plan.injectMinute) || startLabel(plan.steps, 2) + Math.max(1, Math.floor(plan.steps[2].time / 2));
  const preparationChecklist = plan.preparationChecklist || [
    "Dieser gespeicherte Vorschlag stammt aus einer älteren Version. Aufgaben, Gruppeneinteilung, Material und Sicherheit vor der Durchführung vollständig ergänzen und fachlich prüfen."
  ];
  const observationPoints = plan.observationPoints || [
    "Dieser ältere gespeicherte Vorschlag enthält keine Beobachtungspunkte; vor der Durchführung passende Kriterien ergänzen."
  ];
  const showTheoryResources = ["theorie", "mixed", "material"].includes(plan.exerciseType);
  const theoryResourcesHTML = showTheoryResources && plan.theoryResources
    ? `<ul>${plan.theoryResources.map((resource) => `<li><a href="${escapeHTML(resource.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(resource.title)}</a> – ${escapeHTML(resource.description)}</li>`).join("")}</ul><p>Links öffnen eine dynamische Suche bzw. offizielle Übersichtsseite; konkrete Inhalte und Gültigkeit vor Nutzung prüfen.</p>`
    : "";
  const unitPlanningHTML = ["einsatzablauf", "mixed"].includes(plan.exerciseType)
    ? `<section class="plan-section"><h3>Fiktiv beteiligte Einheiten – keine echte Alarmierung</h3><p>${escapeHTML(unitPlanningSummary(plan))}</p><p>Die hinterlegte Liste ist unvollständig. Besatzungsangaben sind nur rechnerische Richtwerte bei Vollbesetzung; tatsächliche Besatzung und Übungsteilnehmerzahl örtlich prüfen. Fahrzeugklasse ist keine Normbeladungsgarantie. Bestückung, Personalstärke und örtlich zugeteilte Rufnamen vor Verwendung bestätigen.</p></section>`
    : "";
  const scenarioSizeHTML = ["einsatzablauf", "mixed"].includes(plan.exerciseType) && plan.scenarioSize && plan.scenarioSize.unitCount > 0
    ? `<section class="plan-section scenario-scale"><h3>Szenariogröße und Koordination: ${escapeHTML(plan.scenarioSize.label)}</h3><p>${escapeHTML(plan.scenarioSize.briefing)}</p><p><strong>Im Planspiel eingeplante Einheiten/Fahrzeuggruppen:</strong> ${escapeHTML(plan.scenarioSize.unitCount)}</p>${listHTML(plan.scenarioSize.workstreams)}</section>`
    : "";
  const scaleInjectsHTML = plan.scenarioSize && plan.scenarioSize.additionalInjects
    ? plan.scenarioSize.additionalInjects.map((text, index) => {
      const gap = Math.max(1, plan.duration - plan.injectMinute);
      const minute = Math.min(plan.duration - 1, plan.injectMinute + Math.floor(gap * (index + 1) / (plan.scenarioSize.additionalInjects.length + 1)));
      return `<section class="plan-section inject-card"><h3>Zusätzliche Koordinationskarte ab Minute ${minute}</h3><p>${escapeHTML(text)}</p><p><strong>Regie:</strong> Nur als fiktive Planspielkarte einspielen; keine reale Kommunikation oder Materialverknappung.</p></section>`;
    }).join("")
    : "";
  planOutput.innerHTML = `
    <article id="printable-plan" class="plan-card">
      <p class="eyebrow">Ausführlicher Übungsplan · Planspiel</p>
      <h2 class="plan-title">${escapeHTML(plan.title)}</h2>
      <p class="plan-meta">${escapeHTML(plan.location)} · ${escapeHTML(plan.duration)} Minuten · ${escapeHTML(plan.participants)} Teilnehmende</p>
      <div class="notice"><strong>Wichtig: vor Durchführung fachlich und örtlich prüfen</strong>Alle Aufgaben, Gruppeneinteilungen, Materialzuordnungen und Einspielungen müssen durch die verantwortliche Ausbildungsleitung geprüft und angepasst werden. Dieser Plan ist ein fiktives Planspiel, keine offizielle Vorgabe und keine Anleitung für reale Einsatzhandlungen. Keine realen Gefahren, Notrufe, Alarmierungen oder Einsatzkommunikation nachstellen.</div>
      <section class="plan-section"><h3>Ausbildungsziel</h3><p>${escapeHTML(plan.objective)}</p></section>
      <section class="plan-section"><h3>Übungsform</h3><p><strong>${escapeHTML(plan.exerciseTypeName || "Fiktives Planspiel")}</strong> · Das ausgewählte Szenario wird ausschließlich in der beschriebenen Theorie- oder Planspielform bearbeitet.</p>${theoryResourcesHTML}</section>
      ${unitPlanningHTML}
      ${scenarioSizeHTML}
      <section class="plan-section"><h3>Zielgruppe und Gruppeneinteilung</h3><p>${escapeHTML(plan.audience)} · angenommener Ausbildungsstand: ${escapeHTML(plan.experienceLevel || "bei älterem gespeicherten Plan nicht angegeben; vorab festlegen")}.</p><p>${escapeHTML(plan.participants)} Teilnehmende in ${escapeHTML(plan.groupCount || "nicht eingeteilte")} Trupp(s): ${(plan.peoplePerGroup || []).map((count, index) => `Trupp ${index + 1}: ${count} Person(en)`).map(escapeHTML).join(" · ") || "Gruppeneinteilung vor der Übung festlegen."}</p></section>
      <section class="plan-section"><h3>Ausgangslage</h3><p>${escapeHTML(plan.situation)}</p><p>Die beschriebene Situation bleibt fiktiv und wird ausschließlich am Tisch oder als mündliches Planspiel besprochen.</p></section>
      <section class="plan-section hazard-review"><h3>Mögliche Gefahren und Einflussfaktoren</h3><p>Diese szenariobezogene Liste ist nicht vollständig; die Punkte sind keine bestätigten Feststellungen. Konkrete Gefahren können abweichen. Sie gibt keine Maßnahmen vor – maßgeblich sind aktuelle Ausbildung, zuständige Führung und örtliche Vorgaben.</p>${listHTML(potentialHazards)}</section>
      <section class="plan-section"><h3>Gesamtmaterial und Zuordnung</h3>${listHTML(plan.materials)}<p>${escapeHTML(plan.materialAssignment || "Materialzuordnung eines älteren Plans vorab durch die Ausbildungsleitung prüfen und festlegen.")}</p>${plan.mustUse ? `<p><strong>Zusätzlich zwingend berücksichtigen:</strong> ${escapeHTML(plan.mustUse)}</p>` : ""}</section>
      <section class="plan-section"><h3>Ausbilderteam (${escapeHTML(plan.instructorCount)})</h3><ul>${plan.instructorDuties.map((duty) => `<li>${escapeHTML(duty)}</li>`).join("")}</ul></section>
      <section class="plan-section"><h3>Vorbereitung – Checkliste</h3>${listHTML(preparationChecklist)}<p class="supporting-note">${escapeHTML(plan.preparation)}</p></section>
      <section class="plan-section"><h3>Truppaufträge und Material je Trupp</h3>${groupsHTML || "<p>Truppaufträge für diesen älteren gespeicherten Plan vor Durchführung festlegen.</p>"}</section>
      <section class="plan-section"><h3>Zeitplan und Regie</h3><p>Gesamtdauer: ${escapeHTML(plan.duration)} Minuten einschließlich Abschluss. Zeiten addieren sich auf die angegebene Gesamtdauer.</p><ol>${stepsHTML}</ol></section>
      <section class="plan-section inject-card"><h3>Einspielung bei Minute ${escapeHTML(injectMinute)}: ${escapeHTML(inject.title)}</h3><p>${escapeHTML(inject.card)}</p><p><strong>Regie:</strong> Ausschließlich durch die Übungsleitung als vorbereitete Karte oder mündlichen Planspiel-Text. Keine reale Kommunikation oder tatsächliche Materialverknappung.</p></section>
      ${scaleInjectsHTML}
      <section class="plan-section"><h3>Beobachtungspunkte</h3>${listHTML(observationPoints)}</section>
      <section class="plan-section"><h3>Sicherheit und Abbruchkriterien</h3>${listHTML(plan.safety)}</section>
      <section class="plan-section"><h3>Nachbesprechung</h3>${listHTML(plan.debrief)}</section>
      <section class="plan-section"><h3>Option für eine weitere Runde</h3>${listHTML(plan.variants)}</section>
      ${wishesHTML}
      <div class="plan-actions no-print">
        <button class="button button-primary" type="button" id="favorite-button">Als Favorit speichern</button>
        <button class="button button-secondary" type="button" id="packet-print-button">Alarmfax, Szenenbild und Checkliste als PDF speichern</button>
        ${showTheoryResources ? `<button class="button button-secondary" type="button" id="theory-print-button">Theorie-Skript drucken / als PDF speichern</button>` : ""}
        <button class="button button-secondary" type="button" id="print-button">Drucken</button>
        <button class="button button-secondary" type="button" id="new-plan-button">Neue Übung planen</button>
      </div>
      ${renderExercisePacket(plan)}
      ${showTheoryResources ? renderTheoryScript(plan) : ""}
      <section class="rating-panel no-print" aria-label="Übung bewerten">
        <h3>Vorschlag bewerten</h3>
        <div class="rating-row" role="group" aria-label="Bewertung von 1 bis 5 Sternen">
          ${[1, 2, 3, 4, 5].map((rating) => `<button class="star-button" type="button" data-rating="${rating}" aria-label="${rating} von 5 Sternen" aria-pressed="false">★</button>`).join("")}
          <span class="rating-caption" id="rating-caption">Noch keine Bewertung</span>
        </div>
        <div class="field">
          <label for="rating-note">Kurze Notiz oder Rückmeldung (optional)</label>
          <textarea id="rating-note" rows="2" maxlength="500" placeholder="Was war hilfreich, was sollte angepasst werden?"></textarea>
        </div>
        <button class="button button-secondary" id="save-rating-button" type="button">Bewertung speichern</button>
        <p class="status-message" id="rating-status" aria-live="polite"></p>
      </section>
    </article>`;
  bindPlanButtons(plan);
}

function startLabel(planSteps, index) {
  if (index >= planSteps.length) return planSteps.reduce((sum, item) => sum + item.time, 0);
  return planSteps.slice(0, index).reduce((sum, item) => sum + item.time, 0);
}

function bindPlanButtons(plan) {
  const ratings = readStorage(STORAGE_KEYS.ratings, []);
  const previous = ratings.find((entry) => entry.id === plan.id);
  selectedRating = previous ? previous.rating : 0;
  if (previous) {
    document.querySelector("#rating-note").value = previous.note || "";
    updateStarButtons();
  }
  document.querySelector("#favorite-button").addEventListener("click", () => saveFavorite(plan));
  document.querySelector("#print-button").addEventListener("click", () => window.print());
  document.querySelector("#packet-print-button").addEventListener("click", () => {
    document.body.classList.add("print-packet");
    window.addEventListener("afterprint", () => document.body.classList.remove("print-packet"), { once: true });
    window.print();
  });
  const theoryPrintButton = document.querySelector("#theory-print-button");
  if (theoryPrintButton) {
    theoryPrintButton.addEventListener("click", () => {
      document.body.classList.add("print-theory");
      window.addEventListener("afterprint", () => document.body.classList.remove("print-theory"), { once: true });
      window.print();
    });
  }
  document.querySelector("#new-plan-button").addEventListener("click", resetForNewPlan);
  document.querySelectorAll(".star-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedRating = Number(button.dataset.rating);
      updateStarButtons();
    });
  });
  document.querySelector("#save-rating-button").addEventListener("click", () => saveRating(plan));
}

function updateStarButtons() {
  document.querySelectorAll(".star-button").forEach((button) => {
    const rating = Number(button.dataset.rating);
    button.setAttribute("aria-pressed", String(rating === selectedRating));
    button.textContent = rating <= selectedRating ? "★" : "☆";
  });
  document.querySelector("#rating-caption").textContent = selectedRating ? `${selectedRating} von 5 Sternen` : "Noch keine Bewertung";
}

function saveRating(plan) {
  if (!selectedRating) {
    document.querySelector("#rating-status").textContent = "Bitte wähle zuerst eine Bewertung von 1 bis 5 Sternen.";
    document.querySelector(".star-button").focus();
    return;
  }
  const ratings = readStorage(STORAGE_KEYS.ratings, []);
  const entry = { id: plan.id, title: plan.title, rating: selectedRating, note: document.querySelector("#rating-note").value.trim(), updatedAt: new Date().toISOString() };
  const index = ratings.findIndex((item) => item.id === plan.id);
  if (index >= 0) ratings[index] = entry;
  else ratings.push(entry);
  if (!writeStorage(STORAGE_KEYS.ratings, ratings)) {
    document.querySelector("#rating-status").textContent = "Speichern nicht möglich. Bitte prüfe die Browser-Speichereinstellungen.";
    return;
  }
  const favorites = readStorage(STORAGE_KEYS.favorites, []);
  const favorite = favorites.find((item) => item.plan.id === plan.id);
  if (favorite) {
    favorite.rating = entry.rating;
    favorite.note = entry.note;
    if (!writeStorage(STORAGE_KEYS.favorites, favorites)) {
      document.querySelector("#rating-status").textContent = "Bewertung gespeichert; die Favoritenliste konnte nicht aktualisiert werden.";
      return;
    }
  }
  document.querySelector("#rating-status").textContent = "Bewertung wurde in diesem Browser gespeichert.";
  renderFavorites();
}

function saveFavorite(plan) {
  const favorites = readStorage(STORAGE_KEYS.favorites, []);
  if (favorites.some((item) => item.plan.id === plan.id)) {
    document.querySelector("#favorite-button").textContent = "Bereits als Favorit gespeichert";
    return;
  }
  const rating = readStorage(STORAGE_KEYS.ratings, []).find((item) => item.id === plan.id);
  favorites.unshift({ plan, savedAt: new Date().toISOString(), rating: rating ? rating.rating : 0, note: rating ? rating.note : "" });
  if (!writeStorage(STORAGE_KEYS.favorites, favorites)) {
    document.querySelector("#favorite-button").textContent = "Speichern nicht möglich";
    return;
  }
  document.querySelector("#favorite-button").textContent = "Favorit gespeichert";
  renderFavorites();
}

function renderFavorites() {
  const favorites = readStorage(STORAGE_KEYS.favorites, []);
  if (!favorites.length) {
    favoriteList.innerHTML = '<div class="favorites-empty">Es sind noch keine Favoriten gespeichert. Erstelle einen Übungsvorschlag und wähle „Als Favorit speichern“.</div>';
    return;
  }
  favoriteList.innerHTML = favorites.map((favorite) => {
    const date = new Date(favorite.savedAt).toLocaleDateString("de-DE");
    const stars = favorite.rating ? `${"★".repeat(favorite.rating)}${"☆".repeat(5 - favorite.rating)} · ${favorite.rating}/5` : "Noch nicht bewertet";
    return `<article class="favorite-card">
      <div><h2>${escapeHTML(favorite.plan.title)}</h2><p>Gespeichert am ${escapeHTML(date)} · ${escapeHTML(favorite.plan.location)}</p><p class="favorite-rating">${escapeHTML(stars)}</p>${favorite.note ? `<p>Notiz: ${escapeHTML(favorite.note)}</p>` : ""}</div>
      <div class="favorite-actions"><button class="button button-secondary" type="button" data-open-favorite="${escapeHTML(favorite.plan.id)}">Ansehen</button><button class="button button-danger" type="button" data-delete-favorite="${escapeHTML(favorite.plan.id)}">Löschen</button></div>
    </article>`;
  }).join("");
  favoriteList.querySelectorAll("[data-open-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      const favorite = readStorage(STORAGE_KEYS.favorites, []).find((item) => item.plan.id === button.dataset.openFavorite);
      if (!favorite) return;
      currentPlan = favorite.plan;
      showView("planen");
      renderPlan(currentPlan);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  favoriteList.querySelectorAll("[data-delete-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      const remaining = readStorage(STORAGE_KEYS.favorites, []).filter((item) => item.plan.id !== button.dataset.deleteFavorite);
      if (writeStorage(STORAGE_KEYS.favorites, remaining)) renderFavorites();
      else button.textContent = "Löschen nicht möglich";
    });
  });
}

function resetForNewPlan() {
  currentPlan = null;
  selectedRating = 0;
  form.reset();
  updateUnitPlanningVisibility();
  updateFireExtentVisibility();
  updateParallelIncidentFields();
  renderCountyUnitVehicleSelections();
  form.querySelectorAll("[aria-invalid]").forEach((field) => field.removeAttribute("aria-invalid"));
  form.querySelectorAll(".field-error").forEach((error) => { error.textContent = ""; });
  planOutput.innerHTML = "";
  setStep(0);
  document.querySelector("#scenarioId").focus();
}

function showView(name) {
  document.querySelectorAll(".view").forEach((view) => { view.hidden = view.id !== `view-${name}`; });
  document.querySelectorAll(".nav-link").forEach((button) => {
    const active = button.dataset.view === name;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  if (name === "gespeichert") renderFavorites();
}

document.querySelectorAll(".nav-link").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

form.querySelectorAll("input, textarea, select").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.hasAttribute("aria-invalid")) showFieldError(field);
    if (field.name === "fireVehicle") updateParticipantEstimate();
    if (field.name === "participants") delete field.dataset.autoEstimate;
  });
  field.addEventListener("change", () => {
    if (field.hasAttribute("aria-invalid")) showFieldError(field);
    if (field.name === "fireVehicle") updateParticipantEstimate();
    if (field.name === "participants") delete field.dataset.autoEstimate;
  });
});

form.elements.exerciseType.addEventListener("change", updateUnitPlanningVisibility);
form.elements.scenarioId.addEventListener("change", updateFireExtentVisibility);
form.elements.injectType.addEventListener("change", updateParallelIncidentFields);
form.elements.parallelIncidentEnabled.addEventListener("change", updateParallelIncidentFields);
updateParallelIncidentFields();
updateFireExtentVisibility();
form.querySelectorAll('input[name="countyStation"]').forEach((input) => {
  input.addEventListener("change", renderCountyUnitVehicleSelections);
});
document.querySelector("#county-unit-vehicle-selections").addEventListener("change", updateParticipantEstimate);

document.querySelector("#next-button").addEventListener("click", () => {
  if (validateStep(currentStep)) {
    setStep(currentStep + 1);
    steps[currentStep].querySelector("input, textarea, select")?.focus();
  }
});

document.querySelector("#back-button").addEventListener("click", () => {
  setStep(currentStep - 1);
  steps[currentStep].querySelector("input, textarea, select")?.focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateStep(currentStep)) return;
  if (currentStep < steps.length - 1) {
    setStep(currentStep + 1);
    steps[currentStep].querySelector("input, textarea, select")?.focus();
    return;
  }
  const data = formValues();
  currentPlan = makePlan(data);
  const recent = readStorage(STORAGE_KEYS.recent, []);
  const updatedRecent = [currentPlan.templateId, ...recent].slice(0, 5);
  writeStorage(STORAGE_KEYS.recent, updatedRecent);
  renderPlan(currentPlan);
  planOutput.scrollIntoView({ behavior: "smooth", block: "start" });
});

updateUnitPlanningVisibility();
renderCountyUnitVehicleSelections();
updateParticipantEstimate();
setStep(0);
renderFavorites();
