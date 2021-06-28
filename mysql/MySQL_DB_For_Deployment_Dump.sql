-- Datenbankstruktur mit Beispielpersonen und -gruppen von STUDOO

--
-- Verwenden dieser Dump macht nur bei Deployment mit Benutzung von mehreren echten Personen Sinn, da diese Dump nur
-- Beispielpersonen und -gruppen enthält, welche als Vorschläge zwar angezeigt werden können, jedoch können diese keine
-- Anfragen annehmen oder versenden und somit braucht man mehrere echte Personen, um Funktionen wie Konversationen oder
-- Lerngruppen verwenden zu können
--

CREATE DATABASE IF NOT EXISTS `studoo`;
USE `studoo`;

--
-- Tabellenstruktur für Tabelle `personen`
--

DROP TABLE IF EXISTS `personen`;
CREATE TABLE `personen` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `name` varchar(255) NOT NULL DEFAULT '',
    `email` varchar(256) NOT NULL DEFAULT '',
    `google_user_id` varchar(128) NOT NULL DEFAULT '',
    `alter` int NOT NULL DEFAULT 0,
    `wohnort` varchar(255) NOT NULL DEFAULT '',
    `studiengang` varchar(255) NOT NULL DEFAULT '',
    `semester` int NOT NULL DEFAULT 0,
    `profil_id` int NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Beispieldaten für Tabelle `personen`
--

LOCK TABLES `personen` WRITE;
INSERT INTO `personen`
VALUES (1,'2021-04-02 18:21:26','Richard Müller', 'richi.muelli@gmail.com', 'ffd78fgu87dshzBkMG9smBhs', 28,'Stuttgart','WI7',2,1),
       (2,'2021-04-21 15:36:01','Otto Roller', 'derotto@gmail.com', 'hU9ksmnZHbs2k4nNHS24',30,'Stuttgart','IM7',3,2),
       (3,'2021-05-08 10:36:01','Lisa Ritter', 'l.ritter@gmail.com', 'lnbsznvbGVSb387shjghGv', 22,'Filderstadt','OM',1,7);
UNLOCK TABLES;

--
-- Tabellenstruktur für Tabelle `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `lernvorlieben_id` int NOT NULL DEFAULT 0,
    `beschreibung` varchar(255) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Beispieldaten für Tabelle `profile`
--

LOCK TABLES `profile` WRITE;
INSERT INTO `profile`
VALUES (1,'2021-03-02 18:21:26',1, 'Stets motiviert und gut gelaunt!'),
       (2,'2021-04-26 15:36:01',2, 'Hi, ich bin der Otto'),
       (3,'2021-04-26 15:37:01',3, ''),
       (4,'2021-04-26 15:39:01',4, 'Was steht hier eigentlich?'),
       (5,'2021-04-26 15:39:01',5, 'Wie bin ich hierhergekommen'),
       (6,'2021-04-26 15:39:01',6, 'Hier könnte Ihre Werbung stehen'),
       (7,'2021-04-26 15:39:01',7, 'Ohje, ich bin so unkreativ...'),
       (8,'2021-04-26 15:39:01',8, 'Keine Ahnung mehr');
UNLOCK TABLES;

--
-- Tabellenstruktur für Tabelle `lernvorlieben`
--

DROP TABLE IF EXISTS `lernvorlieben`;
CREATE TABLE `lernvorlieben` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `lerntyp` int NOT NULL DEFAULT 0,
    `frequenz` int NOT NULL DEFAULT 0,
    `extrovertiertheit` int NOT NULL DEFAULT 0,
    `remote_praesenz` int NOT NULL DEFAULT 0,
    `vorkenntnisse` varchar(255) NOT NULL DEFAULT '',
    `lerninteressen` varchar(255) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Beispieldaten für Tabelle `lernvorlieben`
--

LOCK TABLES `lernvorlieben` WRITE;
INSERT INTO `lernvorlieben`
VALUES (1,'2021-03-02 18:21:26',2,3,4,3,'Python','Apps, Design, HTML'),
       (2,'2021-04-26 15:36:01',1,2,2,4,'React, Websites','JavaScript'),
       (3,'2021-04-26 15:37:01',4,5,3,2,'Java','Python, C++'),
       (4,'2021-04-26 15:39:01',2,4,3,2,'Mathe','Websites, Java'),
       (5,'2021-04-26 15:39:01',4,1,1,1,'React, Mathe, BWL','Apps'),
       (6,'2021-04-26 15:39:01',2,1,3,1,'BWL','Python, React'),
       (7,'2021-04-26 15:39:01',4,4,5,1,'Design, Websites','Java, Apps'),
       (8,'2021-04-26 15:39:01',4,5,5,5,'Apps','Data Science, Websites');
UNLOCK TABLES;

--
-- Tabellenstruktur für Tabelle `nachrichten`
--

DROP TABLE IF EXISTS `nachrichten`;
CREATE TABLE `nachrichten` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `inhalt` varchar(255) NOT NULL DEFAULT '',
    `absender_id` int NOT NULL DEFAULT 0,
    `konversation_id` int NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- keine Beispieldaten für Tabelle `nachrichten`,
--


--
-- Tabellenstruktur für Tabelle `konversationen`
--

DROP TABLE IF EXISTS `konversationen`;
CREATE TABLE `konversationen` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `ist_gruppenchat` bool NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- keine Beispieldaten für Tabelle `konversationen`
--

--
-- Tabellenstruktur für Tabelle `chat_teilnahmen`
--

DROP TABLE IF EXISTS `chat_teilnahmen`;
CREATE TABLE `chat_teilnahmen` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `person_id` int NOT NULL DEFAULT 0,
    `konversation_id` int NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- keine Beispieldaten für Tabelle `chat_teilnahmen`
--

--
-- Tabellenstruktur für Tabelle `partner_vorschlaege`
--

DROP TABLE IF EXISTS `partner_vorschlaege`;
CREATE TABLE `partner_vorschlaege` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `person_id` int NOT NULL DEFAULT 0,
    `partner_id` int NOT NULL DEFAULT 0,
    `aehnlichkeit` float NOT NULL DEFAULT 0.0,
    `matchpoints` int NOT NULL DEFAULT 0,
    `entscheidung_person` bool DEFAULT FALSE,
    `entscheidung_partner` bool DEFAULT FALSE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Beispieldaten für Tabelle `partner_vorschlaege`
--

LOCK TABLES `partner_vorschlaege` WRITE;
INSERT INTO `partner_vorschlaege`
VALUES (1,'2021-04-26 15:36:01',2,1,15,1,TRUE,FALSE),
       (2,'2021-04-26 15:36:01',3,1,23,0,FALSE,FALSE),
       (3,'2021-04-26 15:36:01',3,2,3,2,TRUE,TRUE);

UNLOCK TABLES;

--
-- Tabellenstruktur für Tabelle `lerngruppen`
--

DROP TABLE IF EXISTS `lerngruppen`;
CREATE TABLE `lerngruppen` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `gruppenname` varchar(255) NOT NULL DEFAULT '',
    `profil_id` int NOT NULL DEFAULT 0,
    `konversation_id` int NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Beispieldaten für Tabelle `lerngruppen`
--

LOCK TABLES `lerngruppen` WRITE;
INSERT INTO `lerngruppen`
VALUES (1,'2021-03-02 18:21:26','Road-To-Python-Profis',3,1),
       (2,'2021-04-26 15:36:01','Ersti-Treff',4,2),
       (3,'2021-04-26 15:36:01','Die Website-Gurus',5,3),
       (4,'2021-04-26 15:36:01','DIE NEUEN',6,5),
       (5,'2021-04-26 15:36:01','Die Unternehmer',8,6);
UNLOCK TABLES;

--
-- Tabellenstruktur für Tabelle `gruppen_teilnahmen`
--

DROP TABLE IF EXISTS `gruppen_teilnahmen`;
CREATE TABLE `gruppen_teilnahmen` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `person_id` int NOT NULL DEFAULT 0,
    `gruppen_id` int NOT NULL DEFAULT 0,
    `ist_admin` int DEFAULT FALSE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- keine Beispieldaten für Tabelle `gruppen_teilnahmen`
--

--
-- Tabellenstruktur für Tabelle `gruppen_vorschlaege`
--

DROP TABLE IF EXISTS `gruppen_vorschlaege`;
CREATE TABLE `gruppen_vorschlaege` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `person_id` int NOT NULL DEFAULT 0,
    `gruppen_id` int NOT NULL DEFAULT 0,
    `aehnlichkeit` float DEFAULT 0.0,
    `matchpoints` int NOT NULL DEFAULT 0,
    `entscheidung_person` bool DEFAULT FALSE,
    `entscheidung_gruppe` bool DEFAULT FALSE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- keine Beispieldaten für Tabelle `gruppen_vorschlaege`
--

