# TrainingBuilder - Nächste Features

Geplante Features und Verbesserungen für die TrainingBuilder-Anwendung.

---

## 🎯 Hohe Priorität - Schnell umsetzbar

### 1. Vollständige deutsche Übersetzung ✅

**Status:** In Implementierung

**Beschreibung:** Momentan sind nur die Navigation-Labels übersetzt. Alle Formulare, Buttons, Fehlermeldungen sollten ebenfalls auf Deutsch verfügbar sein.

**Implementierungs-Checkliste:**
- [ ] i18n-Library installieren (next-intl)
- [ ] Sprachkonfiguration einrichten
- [ ] Übersetzungsdateien erstellen (de.json, en.json)
- [ ] Alle UI-Komponenten internationalisieren
  - [ ] Dashboard
  - [ ] Workout Forms
  - [ ] Calendar View
  - [ ] Metrics
  - [ ] Notes
  - [ ] Periodization
  - [ ] Plans
  - [ ] Analytics
  - [ ] Zones
- [ ] Sprachumschalter in Navigation
- [ ] Sprach-Präferenz in localStorage speichern
- [ ] Tests durchführen

**Aufwand:** 4-6 Stunden

---

### 2. Dark Mode Toggle ✅

**Status:** In Implementierung

**Beschreibung:** Dark Mode Styles existieren bereits, fehlt nur noch Toggle-Button und Persistence.

**Implementierungs-Checkliste:**
- [ ] Theme Provider einrichten (next-themes)
- [ ] Dark Mode Toggle-Button erstellen
- [ ] Toggle in Navigation/Header integrieren
- [ ] Theme-Präferenz in localStorage speichern
- [ ] System-Präferenz unterstützen (prefers-color-scheme)
- [ ] Alle Komponenten auf Dark Mode testen
- [ ] Transition-Animationen hinzufügen

**Aufwand:** 2-3 Stunden

---

### 3. Trainingswochen-Vorlagen schnell anwenden ✅

**Status:** In Implementierung

**Beschreibung:** Training Plans existieren bereits, aber es fehlt eine "Apply to Week" Funktion um gespeicherte Wochenpläne direkt in den Kalender zu übernehmen.

**Implementierungs-Checkliste:**
- [ ] "Apply to Calendar" Button in Plans Liste
- [ ] Wochen-Auswahl Dialog (DatePicker)
- [ ] Server Action: Plan → Workouts konvertieren
- [ ] Bestehende Workouts prüfen/warnen
- [ ] Batch-Insert von Workouts
- [ ] Success/Error Feedback
- [ ] Kalender nach Apply aktualisieren

**Aufwand:** 3-4 Stunden

---

## 🚀 Mittlere Priorität - Größerer Mehrwert

### 4. Trainingszonen-Management

**Status:** Geplant

**Beschreibung:** Eigene Herzfrequenz-, Power- und Pace-Zonen definieren und tracken.

**Implementierungs-Checkliste:**
- [ ] Datenbank Schema
  - [ ] `training_zones` Tabelle erstellen (user_id, sport_type, zone_type, zones JSONB)
  - [ ] Migration ausführen
  - [ ] RLS Policies
- [ ] TypeScript Types erweitern
  - [ ] ZoneType, Zone interfaces
  - [ ] Zone calculations (% von FTP/MaxHR)
- [ ] Zones Management UI
  - [ ] `/zones` Page neu aufbauen (statt Placeholder)
  - [ ] Zone Editor Komponente
  - [ ] FTP/Threshold Test Entry
  - [ ] Automatische Zone Berechnung
- [ ] Workout Integration
  - [ ] Zone-Felder in Workout Forms
  - [ ] Zeit pro Zone tracken
  - [ ] Zone Distribution speichern
- [ ] Analytics
  - [ ] Zone Distribution Charts
  - [ ] Time in Zone Reports
  - [ ] Polarized Training Analysis

**Aufwand:** 12-16 Stunden

---

### 5. Geplante vs. Tatsächliche Workouts

**Status:** Geplant

**Beschreibung:** `sessions` Tabelle existiert bereits, UI fehlt noch komplett.

**Implementierungs-Checkliste:**
- [ ] Sessions Schema überprüfen/anpassen
- [ ] Workout Planning UI
  - [ ] "Plan Workout" Button im Kalender
  - [ ] Planned Workout Form
  - [ ] Geplante Workouts im Kalender anzeigen
- [ ] Actual vs Planned Linking
  - [ ] "Complete Planned Workout" Flow
  - [ ] Abweichungen highlighten
- [ ] Comparison View
  - [ ] Planned vs Actual Tabelle
  - [ ] Completion Rate Metrics
  - [ ] Abweichungs-Analyse
- [ ] Analytics Integration
  - [ ] Plan Adherence Rate
  - [ ] Trend Charts

**Aufwand:** 10-14 Stunden

---

### 6. Export-Funktionen

**Status:** Geplant

**Beschreibung:** Training Logs als PDF/CSV exportieren für externe Analyse oder Archivierung.

**Implementierungs-Checkliste:**
- [ ] CSV Export
  - [ ] Workouts → CSV
  - [ ] Metrics → CSV
  - [ ] Notes → CSV
  - [ ] Download Handler
- [ ] PDF Export
  - [ ] PDF Library installieren (jsPDF, react-pdf)
  - [ ] Weekly Training Report Template
  - [ ] Monthly Summary Template
  - [ ] Charts in PDF einbinden
- [ ] Export UI
  - [ ] Export Dialog/Modal
  - [ ] Datumsbereich Auswahl
  - [ ] Format Auswahl
  - [ ] Progress Indicator
- [ ] Sharing Links
  - [ ] Temporäre Share URLs generieren
  - [ ] Read-only Trainer View
  - [ ] Expiration Handling

**Aufwand:** 8-12 Stunden

---

### 7. Workout-Templates & Quick-Add

**Status:** Geplant

**Beschreibung:** Standard-Workouts als Templates speichern und schnell wiederholen.

**Implementierungs-Checkliste:**
- [ ] Datenbank Schema
  - [ ] `workout_templates` Tabelle
  - [ ] Template Struktur (ähnlich wie workouts)
- [ ] Template Management
  - [ ] "Save as Template" Button in Workout Form
  - [ ] Template Library Page
  - [ ] Template Editor
  - [ ] Template Delete
- [ ] Quick Add Features
  - [ ] "Use Template" Button
  - [ ] "Repeat Last Workout" Button
  - [ ] Template → Workout Kopie
  - [ ] Datum/Zeit anpassen
- [ ] UI Integration
  - [ ] Templates Dropdown in Workout Form
  - [ ] Recent Templates Anzeige
  - [ ] Template Search

**Aufwand:** 6-8 Stunden

---

## 💡 Fortgeschrittene Features - Hoher Mehrwert

### 8. Strava/Garmin Integration

**Status:** Geplant

**Beschreibung:** Import von Trainingsdaten aus Strava/Garmin via .FIT/.TCX Dateien oder API.

**Implementierungs-Checkliste:**
- [ ] File Upload
  - [ ] .FIT/.TCX Parser Library
  - [ ] File Upload Komponente
  - [ ] Parse → Workout Conversion
  - [ ] Batch Import UI
- [ ] API Integration
  - [ ] Strava OAuth Setup
  - [ ] Garmin Connect OAuth
  - [ ] Webhook für auto-sync
  - [ ] Background Sync Job
- [ ] Data Mapping
  - [ ] Sport Type Mapping
  - [ ] Metrics Extraktion (HR, Power, Pace)
  - [ ] Zone Distribution berechnen
  - [ ] GPS Daten (optional speichern)
- [ ] Settings Page
  - [ ] Connected Accounts
  - [ ] Auto-sync Toggle
  - [ ] Import History

**Aufwand:** 20-30 Stunden

---

### 9. Trainingszonen-Analyse & Visualisierung

**Status:** Geplant (Abhängig von Feature 4)

**Beschreibung:** Detaillierte Zone-basierte Analyse und Visualisierung.

**Implementierungs-Checkliste:**
- [ ] Charts erweitern
  - [ ] Zone Distribution Pie Chart
  - [ ] Time in Zone Bar Chart
  - [ ] Zone Trend over Time
- [ ] Polarized Training Analysis
  - [ ] Low (Z1/Z2) vs High (Z4/Z5) Ratio
  - [ ] Polarization Index berechnen
  - [ ] Periodization Phase Analyse
- [ ] Workout Detail View
  - [ ] Zone Distribution in einzelnem Workout
  - [ ] Zone-spezifische Insights
- [ ] Reports
  - [ ] Weekly Zone Summary
  - [ ] Monthly Zone Report
  - [ ] Training Intensity Distribution

**Aufwand:** 8-10 Stunden

---

### 10. AI-basierte Insights

**Status:** Geplant

**Beschreibung:** Automatische Muster-Erkennung und intelligente Trainingsempfehlungen.

**Implementierungs-Checkliste:**
- [ ] Datenanalyse Backend
  - [ ] Pattern Detection Algorithmen
  - [ ] HRV ↔ Training Load Korrelation
  - [ ] Readiness Score Predictions
- [ ] Insights Generation
  - [ ] ACWR > 1.5 Warnings
  - [ ] Recovery Recommendations
  - [ ] Performance Trends
  - [ ] Note Pattern Recognition
- [ ] AI Integration (Optional)
  - [ ] OpenAI API Integration
  - [ ] Prompt Engineering für Training Insights
  - [ ] Context von letzten 4 Wochen
- [ ] UI Components
  - [ ] Insights Dashboard Widget
  - [ ] Alert System
  - [ ] Recommendation Cards

**Aufwand:** 15-25 Stunden (ohne AI) / 30-40 Stunden (mit AI)

---

### 11. Social Features

**Status:** Geplant

**Beschreibung:** Trainer-Zugang, Team-Training, Kommentar-Funktion.

**Implementierungs-Checkliste:**
- [ ] Datenbank Schema
  - [ ] `coaches` Tabelle (Trainer ↔ Athlet Beziehung)
  - [ ] `teams` Tabelle
  - [ ] `workout_comments` Tabelle
  - [ ] Permissions System
- [ ] Trainer Features
  - [ ] Coach Invite Flow
  - [ ] Athlete List for Coach
  - [ ] Read-only Athlete View
  - [ ] Comment on Workouts
  - [ ] Workout Prescriptions
- [ ] Team Features
  - [ ] Team Creation
  - [ ] Team Dashboard
  - [ ] Team Leaderboards (optional)
- [ ] Notifications
  - [ ] Email Notifications
  - [ ] In-App Notifications
  - [ ] Comment Notifications

**Aufwand:** 25-35 Stunden

---

## 🔧 Technische Verbesserungen

### 12. PWA / Mobile App

**Status:** Geplant

**Beschreibung:** Progressive Web App für bessere Mobile Experience und Offline-Zugriff.

**Implementierungs-Checkliste:**
- [ ] PWA Setup
  - [ ] next-pwa Plugin installieren
  - [ ] Service Worker konfigurieren
  - [ ] manifest.json erstellen
  - [ ] Icons generieren (alle Größen)
- [ ] Offline Support
  - [ ] Cache Strategy (Workbox)
  - [ ] Offline Fallback Pages
  - [ ] Background Sync für Workouts
- [ ] Push Notifications
  - [ ] Push Subscription Flow
  - [ ] Notification API Integration
  - [ ] Scheduled Workout Reminders
- [ ] Mobile Optimierungen
  - [ ] Touch Gestures
  - [ ] Bottom Navigation (Mobile)
  - [ ] Install Prompt

**Aufwand:** 12-18 Stunden

---

### 13. Erweiterte Suche & Filtering

**Status:** Geplant

**Beschreibung:** Globale Suche über alle Workouts mit erweiterten Filtern.

**Implementierungs-Checkliste:**
- [ ] Search Backend
  - [ ] Full-text Search Query (Supabase FTS)
  - [ ] Multi-table Search (Workouts, Notes, Cycles)
  - [ ] Filter Parameter handling
- [ ] Search UI
  - [ ] Global Search Bar (Header)
  - [ ] Search Results Page
  - [ ] Advanced Filter Panel
    - [ ] Datum Range Picker
    - [ ] Sport Multi-Select
    - [ ] TSS/Duration Range
    - [ ] RPE Range
    - [ ] Tags Filter
- [ ] Similar Workouts
  - [ ] Similarity Algorithmus (Distanz, Duration, Sport)
  - [ ] "Find Similar" Button
- [ ] Search History
  - [ ] Recent Searches speichern
  - [ ] Saved Search Queries

**Aufwand:** 8-12 Stunden

---

### 14. Daten-Backup & Restore

**Status:** Geplant

**Beschreibung:** Automatisches Backup und manuelle Export/Import-Funktion.

**Implementierungs-Checkliste:**
- [ ] Manual Backup
  - [ ] "Export All Data" Button
  - [ ] JSON/CSV Bundle erstellen
  - [ ] Include: Workouts, Notes, Metrics, Cycles, Plans
  - [ ] ZIP Download
- [ ] Restore Function
  - [ ] File Upload für Backup
  - [ ] Validation der Backup-Datei
  - [ ] Merge vs Replace Option
  - [ ] Import Preview
  - [ ] Batch Insert mit Progress
- [ ] Automated Backup (Optional)
  - [ ] Scheduled Backups (Cron Job)
  - [ ] S3/Cloud Storage Integration
  - [ ] Retention Policy
- [ ] Settings UI
  - [ ] Backup/Restore Page
  - [ ] Download History
  - [ ] Auto-backup Settings

**Aufwand:** 10-14 Stunden

---

## 📊 Zusammenfassung

**Gesamtanzahl Features:** 14

**Geschätzte Gesamtaufwand:** 160-230 Stunden

**Priorisierung nach Aufwand/Nutzen:**

1. **Quick Wins** (1-3): ~9-13h → Sofortiger Nutzen
2. **High Value** (4-7): ~36-48h → Kernfunktionalität
3. **Advanced** (8-11): ~68-130h → Professionalisierung
4. **Technical** (12-14): ~30-44h → Skalierung & UX

**Empfohlene Reihenfolge:**
1. Features 1-3 (Woche 1)
2. Features 4, 7 (Woche 2-3)
3. Features 5, 6 (Woche 4)
4. Features 8-14 nach Bedarf

---

*Letzte Aktualisierung: 2025-11-19*
