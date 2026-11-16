# Feuerwehr-Übungsplaner

Eine kostenlose, einfache Web-App, die aus den Angaben der Ausbildungsleitung abwechslungsreiche Feuerwehr-Übungsvorschläge erstellt. Die App funktioniert ohne Anmeldung, Server, externe Datenbank oder externe Dienste.

## Dateien

- `index.html` – deutsche Formulare, Navigation und Inhaltsbereiche
- `style.css` – Gestaltung für Smartphone, Tablet, Computer und Druck
- `script.js` – Übungsvorlagen, Planung, Bewertungen und lokale Favoriten
- `README.md` – diese Anleitung

## Über GitHub Pages veröffentlichen

1. Öffne das Repository auf GitHub.
2. Klicke auf **Settings**.
3. Öffne links **Pages**.
4. Wähle bei **Build and deployment** die Option **Deploy from a branch**.
5. Wähle den Branch **main** und den Ordner **/(root)**.
6. Klicke auf **Save**. Nach der Veröffentlichung wird die Website auf der Pages-Seite angezeigt.

## Texte und Übungsvorlagen ändern

- Texte, Beschriftungen und Formularfelder stehen in `index.html`.
- Farben, Abstände und Darstellung änderst du in `style.css`.
- Die Übungsvorlagen und ihre passenden Stichwörter stehen am Anfang von `script.js` in der Liste `templates`. Du kannst dort Szenarien, Aufgaben und Varianten bearbeiten oder eigene Vorlagen ergänzen.

Ändere Vorlagen vorsichtig und lasse Sicherheitshinweise sowie den Prüfhinweis für die verantwortliche Ausbilderin oder den verantwortlichen Ausbilder bestehen.

## Hinweise

Diese erste Version nutzt **keine echte KI**. Sie kombiniert lokale Vorlagen zu einem Übungsvorschlag und ist keine offizielle Vorgabe. Favoriten und Bewertungen werden nur im lokalen Speicher dieses Browsers auf diesem Gerät gespeichert; sie werden nicht automatisch synchronisiert. Die App sendet keine Daten an externe Dienste.
