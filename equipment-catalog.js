// Type names are a lookup aid only. No type-level loadout is asserted here.
const equipmentSources = [
  {
    id: "lernbar",
    name: "Feuerwehr-Lernbar Bayern",
    url: "https://www.feuerwehr-lernbar.bayern/",
    description: "Offizielles Lernportal; einzelne Suchtreffer, Dokumentstand und Anwendbarkeit müssen geprüft werden."
  },
  {
    id: "vehicle-handout",
    name: "Fahrzeugkunde-Unterlage Feuerwehr-Lernbar Bayern",
    url: "https://www.feuerwehr-lernbar.bayern/api/media/2783/raw/Teilnehmerunterlage.pdf?version=1",
    description: "Grundlegende Fahrzeugkunde-Unterlage, keine vollständige Normbeladung und kein Nachweis der örtlichen Fahrzeugausstattung."
  },
  {
    id: "aichach-vehicles",
    name: "Fahrzeugausstattung der Feuerwehr Aichach",
    url: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge.html",
    description: "Öffentliche, fahrzeugbezogene Ausstattungsangaben. Diese können unvollständig oder veraltet sein und bestätigen nicht den aktuellen örtlichen Bestand."
  },
  {
    id: "din-media",
    name: "DIN Media – Normenrecherche",
    url: "https://www.dinmedia.de/de",
    description: "Normen-Katalog; vollständige Normtexte und Ausgaben sind nicht automatisch frei zugänglich."
  },
  {
    id: "fire-schools",
    name: "Staatliche Feuerwehrschulen Bayern",
    url: "https://www.feuerwehrschulen.bayern.de/startseite",
    description: "Offizielle Übersicht und Kontaktdaten; konkrete Ausbildungsunterlagen bei der zuständigen Stelle prüfen."
  },
  {
    id: "dguv",
    name: "Deutsche Gesetzliche Unfallversicherung (DGUV)",
    url: "https://www.dguv.de/",
    description: "Allgemeines Präventionsportal; keine gerätespezifische Bedienfreigabe."
  }
];

const vehicleTypeCatalog = [
  { id: "hlf-10", name: "HLF 10", category: "Lösch- und Hilfeleistungsfahrzeug", designation: "Normbezeichnung; Ausgabe und Ausführung vor Ort prüfen" },
  { id: "hlf-20", name: "HLF 20", category: "Lösch- und Hilfeleistungsfahrzeug", designation: "Normbezeichnung; Ausgabe und Ausführung vor Ort prüfen" },
  { id: "lf-10", name: "LF 10", category: "Löschfahrzeug", designation: "Normbezeichnung; Ausgabe und Ausführung vor Ort prüfen" },
  { id: "lf-20", name: "LF 20", category: "Löschfahrzeug", designation: "Normbezeichnung; Ausgabe und Ausführung vor Ort prüfen" },
  { id: "tsf", name: "TSF", category: "Tragkraftspritzenfahrzeug", designation: "Normbezeichnung; Ausgabe und Ausführung vor Ort prüfen" },
  { id: "tsf-w", name: "TSF-W", category: "Tragkraftspritzenfahrzeug", designation: "Normbezeichnung; Ausgabe und Ausführung vor Ort prüfen" },
  { id: "rw", name: "Rüstwagen (RW)", category: "Rüstfahrzeug", designation: "Normbezeichnung; Ausgabe und Ausführung vor Ort prüfen" },
  { id: "mzf", name: "MZF", category: "Mehrzweckfahrzeug", designation: "Bezeichnung; örtliche Ausführung prüfen" },
  { id: "kdow", name: "KdoW", category: "Führungsfahrzeug", designation: "Bezeichnung; örtliche Ausführung prüfen" },
  { id: "wlf", name: "WLF", category: "Wechselladerfahrzeug", designation: "Bezeichnung; örtliche Ausführung prüfen" },
  { id: "lf-20-16", name: "LF 20/16", category: "Löschfahrzeug", designation: "Historische/ältere Bezeichnung; nicht mit LF 20 gleichsetzen" },
  { id: "rw-2", name: "RW 2", category: "Rüstfahrzeug", designation: "Historische/ältere Bezeichnung; konkrete Ausführung prüfen" },
  { id: "wlf-kran", name: "WLF mit Kran / WLF-K", category: "Wechselladerfahrzeug", designation: "Sonderausführung; örtliche Ausstattung prüfen" },
  { id: "gw-as", name: "Gerätewagen Atemschutz (GW-AS)", category: "Sonderfahrzeug", designation: "Bezeichnung; örtliche Ausführung prüfen" },
  { id: "cbrn-erkunder", name: "CBRN-Erkunder", category: "Sonderfahrzeug", designation: "Bezeichnung; örtliche Ausführung prüfen" },
  { id: "mtw", name: "MTW", category: "Mannschaftstransportfahrzeug", designation: "Bezeichnung; örtliche Ausführung prüfen" },
  { id: "teleskoplader", name: "Teleskoplader", category: "Sonderfahrzeug", designation: "Individuelle Ausführung; örtliche Ausstattung prüfen" },
  { id: "versorgungs-lkw", name: "Versorgungs-LKW / V-LKW", category: "Logistikfahrzeug", designation: "Bezeichnung; örtliche Ausführung prüfen" },
  { id: "dekon-p", name: "Dekon-P", category: "Sonderfahrzeug", designation: "Bezeichnung; örtliche Ausführung prüfen" },
  { id: "dlk", name: "Drehleiter (DLK)", category: "Hubrettungsfahrzeug", designation: "Normbezeichnung; Ausgabe und Ausführung vor Ort prüfen" },
  { id: "utv", name: "UTV", category: "Sonderfahrzeug", designation: "Individuelle Ausführung; örtliche Ausstattung prüfen" },
  { id: "lf-10-logistik", name: "LF 10 / LF 10 Logistik (örtliche Variante)", category: "Lösch-/Logistikfahrzeug", designation: "Mögliche örtliche Variante; Fahrzeugunterlagen prüfen" },
  { id: "hlf-20-16-local", name: "HLF 20/16 (örtliche Bezeichnung)", category: "Lösch- und Hilfeleistungsfahrzeug", designation: "Ältere/örtliche Bezeichnung; nicht ohne Fahrzeugunterlagen gleichsetzen" },
  { id: "sonderloeschfahrzeug", name: "Sonderlöschfahrzeug", category: "Sonderfahrzeug", designation: "Individuelle Ausführung; örtliche Ausstattung prüfen" }
];

const equipmentCategories = [
  { id: "firefighting", name: "Brandbekämpfung", terms: ["Brandbekämpfung", "Feuerwehr"] },
  { id: "water-supply", name: "Wasserförderung", terms: ["Wasserförderung", "Feuerwehr"] },
  { id: "technical-rescue", name: "Technische Hilfeleistung", terms: ["Technische Hilfeleistung", "Feuerwehr"] },
  { id: "traffic-safety", name: "Verkehrssicherung", terms: ["Verkehrssicherung", "Feuerwehr"] },
  { id: "patient-support", name: "Rettung und patientengerechte Rettung", terms: ["Rettung", "Feuerwehr"] },
  { id: "lifting-stabilization", name: "Heben und Sichern", terms: ["Heben und Sichern", "Feuerwehr"] },
  { id: "lighting-power", name: "Beleuchtung und Energieversorgung", terms: ["Beleuchtung", "Energieversorgung", "Feuerwehr"] },
  { id: "breathing-apparatus", name: "Atemschutz", terms: ["Atemschutz", "Feuerwehr"] },
  { id: "hazmat-cbrn", name: "Gefahrgut und CBRN", terms: ["CBRN", "Gefahrgut", "Feuerwehr"] },
  { id: "water-rescue", name: "Wasserrettung", terms: ["Wasserrettung", "Feuerwehr"] },
  { id: "height-depth-rescue", name: "Höhen- und Tiefenrettung", terms: ["Höhenrettung", "Feuerwehr"] },
  { id: "fall-protection", name: "Absturzsicherung", terms: ["Absturzsicherung", "Feuerwehr"] },
  { id: "command-communications", name: "Führungs- und Kommunikationsmittel", terms: ["Kommunikation", "Führungsmittel", "Feuerwehr"] },
  { id: "logistics", name: "Logistik und Versorgung", terms: ["Logistik", "Feuerwehr"] },
  { id: "special-equipment", name: "Sonstige Spezialausstattung", terms: ["Spezialausstattung", "Feuerwehr"] }
];

const equipmentCatalog = [
  { id: "hose", name: "Druckschlauch", category: "firefighting", purpose: "Transportiert Wasser oder ein anderes dafür freigegebenes Löschmittel.", principle: "Flexibler druckbeaufschlagter Schlauch; konkrete Kupplungen und Betriebsgrenzen sind produkt- und ausbildungsabhängig.", risks: "Druck, Stolperstellen, Beschädigung und ungeeignete Medien sind zu berücksichtigen.", limit: "Keine Aussage zu Durchfluss, Druckstufe, Einsatzbereitschaft oder örtlicher Beladung.", tags: ["brand", "vehicle-fire", "industrial-fire"] },
  { id: "branchpipe", name: "Strahlrohr", category: "firefighting", purpose: "Abgabe eines geeigneten Löschmittels in einer für den jeweiligen Auftrag vorgesehenen Form.", principle: "Formt und steuert den austretenden Löschmittelstrom gemäß Gerätebauart.", risks: "Druck, Rückstoß, Sicht, Reichweite und mögliche Wechselwirkungen mit der Umgebung.", limit: "Keine Bedienfolge, Einstellwerte oder Aussage zur Eignung für einen konkreten Brand.", tags: ["brand", "vehicle-fire", "industrial-fire"] },
  { id: "portable-pump", name: "Tragkraftspritze / tragbare Pumpe", category: "water-supply", purpose: "Dient je nach Bauart der Förderung von Wasser.", principle: "Technische Pumpe; Leistungsdaten richten sich nach Typ, Zustand und Randbedingungen.", risks: "Maschinen-, Abgas-, Lärm-, Druck- und Wassergefahren.", limit: "Keine Fördermengen, Aufstellungs- oder Inbetriebnahmeanleitung.", tags: ["brand", "water", "flood"] },
  { id: "suction-hose", name: "Saugschlauch", category: "water-supply", purpose: "Bestandteil einer Wasserentnahme- oder Förderkonfiguration, sofern örtlich und fachlich vorgesehen.", principle: "Formstabiler Schlauch für die dafür vorgesehene Druckbeanspruchung.", risks: "Wasser, schwere/voluminöse Bauteile und ungeeignete Entnahmestellen.", limit: "Keine Entnahme-, Anschluss- oder Förderanweisung.", tags: ["brand", "water", "flood"] },
  { id: "hydraulic-rescue-tool", name: "Hydraulisches Rettungsgerät (Gerätegruppe)", category: "technical-rescue", purpose: "Gerätegruppe für technische Hilfeleistung, abhängig von konkretem Gerät und Auftrag.", principle: "Hydraulisch erzeugte Kräfte werden über ein gerätespezifisches Werkzeug übertragen.", risks: "Hohe Kräfte, Quetsch- und Schnittgefahren, gespeicherte Energie und unkontrollierte Bewegungen.", limit: "Keine Rettungstechnik, Schneid-/Spreizposition oder Bedienfolge enthalten.", tags: ["traffic", "technical-rescue"] },
  { id: "tool-kit", name: "Handwerkzeug-Satz", category: "technical-rescue", purpose: "Zusammengefasste Werkzeuge für allgemeine, ausbildungsabhängige Aufgaben.", principle: "Manuelle Werkzeuge übertragen menschliche Kraft über unterschiedliche Hebel- und Kontaktflächen.", risks: "Schnitt-, Stoß-, Quetsch- und Fehlanwendungsrisiken.", limit: "Der konkrete Inhalt eines Satzes ist nicht norm- oder fahrzeugübergreifend festgelegt.", tags: ["traffic", "technical-rescue", "logistics"] },
  { id: "traffic-kit", name: "Verkehrssicherungs- und Warnmaterial", category: "traffic-safety", purpose: "Material zur sichtbaren Kennzeichnung und organisatorischen Absicherung im Rahmen örtlicher Zuständigkeiten.", principle: "Sichtbarkeit und eindeutige Abgrenzung anhand freigegebener örtlicher Verfahren.", risks: "Fließender Verkehr und eingeschränkte Sicht bleiben Gefahren; Material ersetzt keine zuständige Verkehrsregelung.", limit: "Keine Aufstellungsabstände, Verkehrsmaßnahmen oder Einsatzstrategie vorgegeben.", tags: ["traffic", "road-incident", "weather"] },
  { id: "stretcher", name: "Trage / Transportmittel", category: "patient-support", purpose: "Unterstützt einen geplanten Patiententransport durch dafür qualifizierte Kräfte.", principle: "Tragende Fläche bzw. Tragekonstruktion; Eigenschaften unterscheiden sich nach Typ.", risks: "Ergonomie, Belastung, Absturz und medizinische Aspekte.", limit: "Keine Patiententransporttechnik oder medizinische Maßnahme beschrieben.", tags: ["person", "medical-support"] },
  { id: "stabilization-kit", name: "Sicherungs- und Unterbaumaterial", category: "lifting-stabilization", purpose: "Materialgruppe zur Stabilisierung oder Lastaufnahme, sofern ein qualifizierter Auftrag dies vorsieht.", principle: "Überträgt und verteilt Lasten innerhalb der jeweiligen Material- und Systemgrenzen.", risks: "Instabile Lasten, Quetschstellen und gespeicherte Energie.", limit: "Keine Bemessung, Anschlagart, Lastberechnung oder konkrete Rettungsmethode.", tags: ["traffic", "technical-rescue"] },
  { id: "lifting-bag", name: "Hebekissen", category: "lifting-stabilization", purpose: "Spezialgerät, das abhängig von Bauart und Freigabe für Hebeaufgaben vorgesehen sein kann.", principle: "Druckbeaufschlagtes Hebeelement; Kennwerte sind produktspezifisch.", risks: "Druck, Lastbewegung, Quetschstellen und Systemversagen.", limit: "Keine Lastberechnung, Anordnung oder Bedienfolge.", tags: ["traffic", "technical-rescue", "lifting"] },
  { id: "portable-light", name: "Tragbare Beleuchtung", category: "lighting-power", purpose: "Verbessert die Sicht in einem begrenzten Übungs- oder Arbeitsbereich.", principle: "Lichtquelle mit geräteabhängiger Stromversorgung und Lichtverteilung.", risks: "Blendung, Stolperstellen, elektrische Versorgung und Umgebungsbedingungen.", limit: "Keine Beleuchtungsstärke oder Eignung für explosionsgefährdete Bereiche abgeleitet.", tags: ["traffic", "night", "building", "power-outage"] },
  { id: "generator", name: "Stromerzeuger", category: "lighting-power", purpose: "Stellt elektrische Energie im Rahmen einer dafür vorgesehenen Konfiguration bereit.", principle: "Wandelt mechanische Energie in elektrische Energie um.", risks: "Elektrischer Strom, Abgase, Lärm, Wärme und Brandgefahren.", limit: "Keine Anschluss-, Erdungs-, Last- oder Inbetriebnahmeanleitung.", tags: ["lighting", "power-outage", "technical-rescue"] },
  { id: "scba", name: "Atemschutzgerät (Gerätegruppe)", category: "breathing-apparatus", purpose: "Atemschutzsystem für entsprechend ausgebildete und zugelassene Personen.", principle: "Versorgt die tragende Person abhängig vom System mit Atemluft.", risks: "Atemluftvorrat, Belastung, Dichtsitz, Umgebungsgefahren und Notfallsituationen.", limit: "Keine Einsatzfreigabe, Einsatzdauer, Geräteprüfung oder Verwendungsschritte.", tags: ["fire", "industrial-fire", "hazmat", "smoke"] },
  { id: "gas-detector", name: "Messgerät für Gefahrstoffe (Gerätegruppe)", category: "hazmat-cbrn", purpose: "Kann je nach Gerät bestimmte Messgrößen erfassen; die Anzeige benötigt fachkundige Einordnung.", principle: "Sensoren reagieren auf definierte Messgrößen innerhalb ihrer Spezifikation.", risks: "Fehlinterpretation, Querempfindlichkeit und Überschreitung von Messbereichen.", limit: "Keine Stoffidentifikation oder Schutzentscheidung aus einem allgemeinen Gerätetyp ableitbar.", tags: ["hazmat", "industrial-fire"] },
  { id: "decon-equipment", name: "Dekontaminationsausstattung (Gerätegruppe)", category: "hazmat-cbrn", purpose: "Ausstattungsgruppe zur Dekontamination entsprechend dem freigegebenen Konzept.", principle: "Systeme und Materialien unterscheiden sich nach Kontaminationsart und Ausstattung.", risks: "Sekundärkontamination, unklare Stoffeigenschaften und Entsorgung.", limit: "Keine Dekontaminationsfolge oder Stoffbehandlung beschrieben.", tags: ["hazmat", "cbrn"] },
  { id: "throw-bag", name: "Wurfbeutel / Rettungsleine", category: "water-rescue", purpose: "Mögliche Ausrüstung für Wasserrettung; nur im Rahmen der örtlichen Ausbildung und Zuständigkeit.", principle: "Leine und Wurfkörper dienen als gekoppeltes Rettungsmittel gemäß jeweiligem System.", risks: "Strömung, Verfangen, Zugkräfte und zusätzliche Gefährdung der helfenden Person.", limit: "Keine Wurftechnik, Positionierung oder Rettungsanleitung.", tags: ["water-rescue", "flood"] },
  { id: "rescue-boat", name: "Boot / Wasserrettungsfahrzeug", category: "water-rescue", purpose: "Fahrzeuggruppe, deren Eignung von Bauart, Gewässer und ausgebildeter Besatzung abhängt.", principle: "Schwimmfähige Plattform mit gerätespezifischem Antrieb und Zubehör.", risks: "Ertrinken, Strömung, Wetter, Kenterung und mechanische Gefahren.", limit: "Keine Gewässerfreigabe, Bootsführung oder Rettungstaktik.", tags: ["water-rescue", "flood"] },
  { id: "tripod-system", name: "Dreibein / Zugangssystem", category: "height-depth-rescue", purpose: "Spezialausstattung für bestimmte Zugangssituationen, wenn durch qualifizierte Kräfte freigegeben.", principle: "Tragkonstruktion mit systemabhängigen Anschlag- und Sicherungskomponenten.", risks: "Absturz, Lastversagen und unerkannte Systeminkompatibilität.", limit: "Keine Anschlagpunkte, Lastannahmen oder Rettungsabläufe beschrieben.", tags: ["height-rescue", "depth-rescue"] },
  { id: "fall-arrest-set", name: "Absturzsicherungs-Set", category: "fall-protection", purpose: "Persönliche und ergänzende Ausrüstung zum Schutz gegen Absturz im qualifizierten Einsatzbereich.", principle: "Systemkomponenten müssen innerhalb ihrer festgelegten Systemgrenzen gemeinsam verwendet werden.", risks: "Absturz, Pendelsturz, Fehlkombination, Beschädigung und notwendige Rettung.", limit: "Keine Anschlag-, Sicherungs- oder Rettungsanleitung.", tags: ["height-rescue", "fall-protection"] },
  { id: "radio", name: "Sprechfunkgerät", category: "command-communications", purpose: "Übermittelt Sprache oder Daten über ein dafür vorgesehenes Kommunikationssystem.", principle: "Sendet und empfängt Funksignale nach konfiguriertem Standard und örtlicher Vorgabe.", risks: "Missverständnisse, Datenschutz, Funkstörungen und unbefugte Aussendungen.", limit: "Keine realen Einsatzkanäle, Rufgruppen oder Einsatzkommunikation in der Übung verwenden.", tags: ["communication", "leadership"] },
  { id: "thermal-camera", name: "Wärmebildkamera", category: "special-equipment", purpose: "Stellt Unterschiede in der Infrarotstrahlung als Bild dar.", principle: "Sensor und Darstellung sind geräteabhängig; Anzeige ist keine direkte Temperatur- oder Gefahrenmessung.", risks: "Fehlinterpretation, eingeschränkte Sicht und Scheinsicherheit.", limit: "Keine Temperaturangaben oder sichere Detektion aus dem Typnamen ableitbar.", tags: ["fire", "search", "technical-rescue"] },
  { id: "cargo-equipment", name: "Ladungs- und Logistikmaterial (Gerätegruppe)", category: "logistics", purpose: "Unterstützt Transport, Verteilung und Nachweis von Material.", principle: "Ladungssicherung und Transportmittel müssen zu Fahrzeug und Last passen.", risks: "Herabfallende Last, Überladung und ungeeignete Sicherung.", limit: "Keine Tragfähigkeit, Lastverteilung oder konkrete Sicherungsmethode angenommen.", tags: ["logistics", "supply"] },
  { id: "hand-pump", name: "Handpumpe / Kleinpumpe", category: "water-supply", purpose: "Kleine Pumpe für spezifische, durch Herstellerdaten begrenzte Anwendungen.", principle: "Pumpt ein Medium über einen mechanischen oder motorisierten Antrieb.", risks: "Elektrik, Abgase, bewegliche Teile und ungeeignete Medien.", limit: "Keine konkrete Förderleistung, Medienfreigabe oder Einsatzmethode.", tags: ["flood", "water"] },
  { id: "fire-extinguisher", name: "Feuerlöscher", category: "firefighting", purpose: "Tragbares Löschgerät für klar definierte, zugelassene Anwendungsbereiche.", principle: "Gibt ein Löschmittel unter Druck oder durch chemische Reaktion ab.", risks: "Druckbehälter, falsche Löschmittelwahl, Rauch und Hitze.", limit: "Keine Auswahl- oder Bedienanleitung; konkrete Eignung anhand Kennzeichnung und Ausbildung prüfen.", tags: ["fire", "vehicle-fire"] }
];

const publishedVehicleLoadouts = {
  "aic-kdow": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-10-1.html",
    equipmentIds: ["traffic-kit"],
    items: ["Notfallrucksack mit AED und Beatmungsgerät", "Verkehrssicherungsmaterial", "Einsatzleiterhandbuch und Nachschlagewerke"]
  },
  "aic-mzf": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-11-1.html",
    equipmentIds: ["radio"],
    items: ["Multifunktionsdrucker mit Scanner und Fax", "Mobilfunktelefon und Telefonanlage", "Drei DECT-Schnurlostelefone", "Notebook mit UMTS-Anbindung", "Notfallrucksack", "Türöffnungsset", "Akkuschrauber mit Ladeerhaltung", "Tierrettungszubehör (bei Bedarf)", "Überlebensanzug (bei Bedarf)", "Lagedarstellungsmaterial der Unterstützungsgruppe Feuerwehr", "Schnelleinsatzzelt der Unterstützungsgruppe Feuerwehr"]
  },
  "aic-mtw": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-14-1.html",
    equipmentIds: ["fire-extinguisher", "traffic-kit"],
    items: ["6-kg-ABC-Feuerlöscher", "Winkerkellen", "Verkehrssicherungsmaterial", "LED-Vorwarntafel"]
  },
  "aic-dlk": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-30-1.html",
    equipmentIds: ["generator", "scba", "stretcher", "hose", "fall-arrest-set", "portable-light"],
    items: ["Stromerzeuger Rosenbauer RS 14", "Wasserbetriebener Drucklüfter", "Pressluftatmer und Atemschutzmasken", "Mobiler Elektro-Drucklüfter", "Türöffnungssatz", "Motorsäge und Schnittschutzkleidung", "Schleifkorbtrage und Krankentragehalterung", "Wenderohr", "Verteiler sowie B- und C-Schläuche", "Absturzsicherung und Abseilgerät", "Bandschlingen für Kranbetrieb", "Verkehrsleitkegel und Blitzleuchten", "Kleinlöschgerät", "Auffahrbohlen"]
  },
  "aic-wlf1": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-36-1.html",
    equipmentIds: ["radio", "cargo-equipment"],
    items: ["Zwei Handlampen", "Zwei digitale Handsprechfunkgeräte", "Funkferngesteuerter Palfinger-Kran", "Ketten, Schäkel und Rundschlingen", "Palfinger-Hakenanlage"]
  },
  "aic-wlf2": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-36-2.html",
    equipmentIds: ["radio", "cargo-equipment"],
    items: ["Zwei Handlampen", "Zwei digitale Handsprechfunkgeräte", "Zwei Kameras am Abrollkipper", "Faltdreieck", "Funkferngesteuerter Palfinger-Kran", "Ketten, Schäkel und Rundschlingen", "Palfinger-Hakenanlage"]
  },
  "aic-teleskoplader": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-39-1.html",
    items: ["Palettengabel", "Gabelverlängerungen", "Universalschaufel", "Anbaugeräte des städtischen Bauhofs"]
  },
  "aic-hlf": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-40-1.html",
    equipmentIds: ["generator", "hydraulic-rescue-tool", "thermal-camera", "lifting-bag"],
    items: ["Fest eingebauter Generator (9 kVA)", "Hydraulischer Rettungssatz", "Sprungretter", "Wärmebildkamera", "Notfallausrüstung und AED", "Akku-Drucklüfter", "Rettungsstützen", "Tiefbauunfallausrüstung", "LKW-Rettungsplattform", "Hebekissen", "Seilwinde (5 kN)", "Mehrzweckzug MZ 16"]
  },
  "aic-lf": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-40-2.html",
    equipmentIds: ["generator", "hydraulic-rescue-tool", "thermal-camera", "stretcher"],
    items: ["Generator (13,2 kVA)", "Hydraulischer Rettungssatz", "Säbelsäge", "Tauchpumpen", "Chemikalienschutzausrüstung", "Sprungretter", "Wärmebildkamera", "Notfallausrüstung und AED", "Spineboard", "Drucklüfter"]
  },
  "aic-gw-as": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-53-1.html",
    equipmentIds: ["scba", "decon-equipment", "portable-light", "rescue-boat", "traffic-kit"],
    items: ["Zwölf Atemschutzgeräte", "Sechs Chemikalienschutzanzüge", "Strahlenschutzausrüstung", "Stromerzeuger", "Stativ mit zwei Flutlichtstrahlern", "Ersatzwäsche und Overgarments", "Dekontaminationsausstattung des Landkreises", "Absperrmaterial", "Schlauchboot mit Pressluftflasche und vier Paddeln", "Vier Schwimmwesten", "Wasser-/Eisrettungsanzug mit Zubehör", "Zwei Wathosen", "Elektrische Durchsageeinrichtung"]
  },
  "aic-vlkw": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-56-1.html",
    equipmentIds: ["cargo-equipment"],
    items: ["Palfinger-Ladebordwand"]
  },
  "aic-utv": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-59-1.html",
    equipmentIds: ["radio"],
    items: ["MicroCAFS-Löschanlage", "Zwei Handlampen", "Zwei digitale Handsprechfunkgeräte"]
  },
  "aic-rw": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-61-1.html",
    equipmentIds: ["generator", "hydraulic-rescue-tool", "lifting-bag", "stretcher"],
    items: ["Fest eingebauter Generator (20 kVA)", "Ölschadenausrüstung", "Hydraulischer Rettungssatz", "LKW-Rettungsplattform", "Luftheber (1,5 bar)", "Hebekissen", "Hydraulischer Hebesatz", "Dichtkissen", "Spineboard", "KET-System"]
  },
  "aic-cbrn": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-66-1.html",
    equipmentIds: ["scba", "gas-detector"],
    items: ["Zwei Chemikalienschutzanzüge", "Viergasmessgerät", "Messgeräte für A- und C-Einsätze", "Probenahmeausrüstung", "Prüfröhrchen", "Wettermessausstattung", "PC und Drucker", "Zwei Pressluftatmer", "Einwegschutzanzüge", "Elektrische Durchsageeinrichtung"]
  },
  "aic-dekon": {
    sourceUrl: "https://www.feuerwehr-aichach.de/feuerwehr/fuhrpark/aktuelle-fahrzeuge/fl-aichach-67-1.html",
    equipmentIds: ["generator", "decon-equipment", "portable-light"],
    items: ["Aufenthaltszelt (25 m²)", "Duschzelt (15 m²)", "Wasserbehälter verschiedener Größen", "Elektrische Kreiselpumpe", "Beleuchtungsmaterial", "Stromerzeuger mit Kabeltrommeln", "Zeltbelüftung und -heizung", "Messausstattung", "Kontaminationsnachweisgerät"]
  }
};

const equipmentOrganizations = [
  { id: "fire-service", name: "Feuerwehr" },
  { id: "thw", name: "Technisches Hilfswerk (THW)", note: "Fahrzeug- und Fachgruppenbeladung nicht pauschal hinterlegt; konkreten Standort und aktuelle THW-Unterlagen prüfen." },
  { id: "rescue-service", name: "Rettungsdienst" },
  { id: "water-rescue", name: "Wasserrettung" },
  { id: "recovery", name: "Bergungsorganisationen" },
  { id: "civil-protection", name: "Katastrophenschutz" }
];

const scenarioEquipmentTags = {
  brand: ["brand", "fire", "lighting", "communication"],
  brandmeldeanlage: ["brand", "fire", "communication"],
  industriebrand: ["brand", "fire", "hazmat", "lighting"],
  vegetationsbrand: ["brand", "fire", "water"],
  fahrzeugbrand: ["brand", "vehicle-fire", "fire", "traffic"],
  bahnbrand: ["brand", "fire", "traffic", "communication"],
  verkehrsunfall: ["road-incident", "technical-rescue", "lighting"],
  lkwunfall: ["road-incident", "technical-rescue", "logistics"],
  verkehrslenkung: ["road-incident", "communication"],
  unwetter: ["weather", "lighting", "communication"],
  oelspur: ["road-incident", "hazmat"],
  arbeitunfall: ["technical-rescue", "patient", "lighting"],
  tueröffnung: ["technical-rescue", "person"],
  hochwasser: ["water", "flood", "lighting"],
  strassenueberflutung: ["water", "flood", "traffic"],
  gefahrstoff: ["hazmat", "cbrn", "breathing-apparatus"],
  personensuche: ["search", "lighting", "communication"],
  menschenrettung: ["person", "patient", "communication"],
  firstresponder: ["person", "patient", "communication"],
  rettungsdienst: ["patient", "communication"],
  tiernotlage: ["animal", "technical-rescue"],
  stromausfall: ["power-outage", "lighting", "communication"],
  wasserplanung: ["water", "supply"],
  lageerkundung: ["communication", "leadership"],
  teamkommunikation: ["communication", "leadership"],
  geraetekunde: ["logistics", "technical-rescue"],
  ablaufplanung: ["communication", "leadership"]
};
