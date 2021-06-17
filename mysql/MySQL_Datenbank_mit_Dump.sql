-- Datenbankstruktur im Aufbau

CREATE DATABASE IF NOT EXISTS `studoo`;
USE `studoo`;

-- Tabelle `vorschlaege` löschen, da sie in dieser Datenbankstruktur nicht mehr verwendet wird
DROP TABLE IF EXISTS `vorschlaege`;

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
VALUES (1,'2021-04-02 18:21:26','Richard Müller', 'richi.mülli@gmail.com', 'useridlululul', 28,'Stuttgart','WI7',2,1),
       (2,'2021-04-21 15:36:01','Otto Roller', 'derotto@gmail.com', '1234otto4321',39,'Stuttgart','IM7',3,2),
       (3,'2021-05-08 10:36:01','Lisa Ritter', 'l.ritter@gmail.com', 'l1i2s3a4', 22,'Filderstadt','OM',1,7);
UNLOCK TABLES;

--
-- Tabellenstruktur für Tabelle `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `lernvorlieben_id` int NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Beispieldaten für Tabelle `profile`
--

LOCK TABLES `profile` WRITE;
INSERT INTO `profile`
VALUES (1,'2021-03-02 18:21:26',1),
       (2,'2021-04-26 15:36:01',2),
       (3,'2021-04-26 15:37:01',3),
       (4,'2021-04-26 15:39:01',4),
       (5,'2021-04-26 15:39:01',5),
       (6,'2021-04-26 15:39:01',6),
       (7,'2021-04-26 15:39:01',7),
       (8,'2021-04-26 15:39:01',8);
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
VALUES (1,'2021-03-02 18:21:26',4,3,1,2,'Python','Apps'),
       (2,'2021-04-26 15:36:01',2,4,3,2,'React','Websites'),
       (3,'2021-04-26 15:37:01',4,5,3,2,'Java','Python'),
       (4,'2021-04-26 15:39:01',2,4,3,2,'Mathe','Websites'),
       (5,'2021-04-26 15:39:01',4,1,1,1,'React','Apps'),
       (6,'2021-04-26 15:39:01',2,1,3,1,'Nichts','Python'),
       (7,'2021-04-26 15:39:01',4,1,2,3,'Design','Java'),
       (8,'2021-04-26 15:39:01',4,5,5,5,'Apps','Data Science');
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
-- Beispieldaten für Tabelle `nachrichten`
--

LOCK TABLES `nachrichten` WRITE;
INSERT INTO `nachrichten`
VALUES (1,'2021-05-01 15:36:01','Hi, wie gehts dir',1,2),
       (2,'2021-05-01 16:02:45','Gut dir?',2,2),
       (3,'2021-05-02 09:50:59','Mir auch danke',1,2),
       (4,'2021-05-02 12:36:12','Hi Kannst du Python?',1,1),
       (5,'2021-05-02 12:36:12','Leider garnicht',3,1),
       (6,'2021-06-10 15:30:56','Ich könnte vielleicht helfen',4,1),
       (7,'2021-06-11 12:42:12','Das wäre echt mega nett',1,1),
       (8,'2021-06-11 19:36:12','Wollen wir uns mal treffen?',2,2),
       (9,'2021-06-13 12:36:12','Oha Ehrenmann, wann hast du Zeit?',3,1),
       (10,'2021-06-13 13:36:12','Oh cool ich hatte noch nie ein Match',2,3),
       (11,'2021-06-13 13:39:12','Ich bin Otto, wie heißt du?',2,3),
       (12,'2021-06-13 13:39:36','Hey Lisa, lass uns selbstständig machen!',2,6),
       (13,'2021-06-13 14:39:36','Jaaaa, richtig Lust! Wo fangen wir an?',3,6),
       (14,'2021-06-13 16:39:36','Mit was könnten wir denn reich werden?',2,6),
       (15,'2021-06-13 16:56:36','Oh, hi, jetzt haben wir einen Dritten im Bunde',2,6),
       (16,'2021-06-13 16:56:36','Was meinst du?',2,6)
       ;
UNLOCK TABLES;

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
-- Beispieldaten für Tabelle `konversationen`
--

LOCK TABLES `konversationen` WRITE;
INSERT INTO `konversationen`
VALUES (1,'2021-03-02 18:21:26',TRUE),
       (2,'2021-04-26 15:36:01',TRUE),
       (3,'2021-05-29 20:36:01',FALSE),
       (4,'2021-06-02 15:36:01',TRUE),
       (5,'2021-06-02 15:36:01',TRUE),
       (6,'2021-06-06 15:36:01',TRUE);
UNLOCK TABLES;

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
-- Beispieldaten für Tabelle `chat_teilnahmen`
--

LOCK TABLES `chat_teilnahmen` WRITE;
INSERT INTO `chat_teilnahmen`
VALUES (1,'2021-03-02 18:21:26',1,2),
       (2,'2021-04-26 15:36:01',2,2),
       (3,'2021-04-26 15:36:01',1,1),
       (4,'2021-04-26 15:36:01',3,1),
       (5,'2021-04-26 15:36:01',2,3),
       (6,'2021-04-26 15:36:01',4,1),
       (7,'2021-04-26 15:36:01',4,2),
       (8,'2021-04-26 15:36:01',4,3),
       (9,'2021-04-26 15:36:01',4,4),
       (10,'2021-04-26 15:36:01',2,6),
       (11,'2021-04-26 15:36:01',3,6)
       ;
UNLOCK TABLES;

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
VALUES (1,'2021-03-02 18:21:26',1,2,67.8,2,TRUE,TRUE),
       (2,'2021-04-26 15:36:01',1,3,67.8,1,TRUE,FALSE),
       (3,'2021-04-26 15:36:01',4,1,81.2,0,FALSE,FALSE),
       (4,'2021-04-26 15:36:01',4,2,90.3,2,TRUE,TRUE),
       (5,'2021-04-26 15:36:01',4,3,57.8,1,FALSE,TRUE),
       (6,'2021-04-30 15:36:01',2,4,75.3,2,TRUE,FALSE);
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
       (3,'2021-04-26 15:36:01','Shy-Guys',5,4),
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
-- Beispieldaten für Tabelle `gruppen_teilnahmen`
--

LOCK TABLES `gruppen_teilnahmen` WRITE;
INSERT INTO `gruppen_teilnahmen`
VALUES (1,'2021-03-02 18:21:26',1,1,FALSE),
       (2,'2021-04-26 15:36:01',2,1,FALSE),
       (3,'2021-04-26 15:36:01',4,1,FALSE),
       (4,'2021-04-26 15:36:01',1,2,FALSE),
       (5,'2021-04-26 15:36:01',3,2,FALSE),
       (6,'2021-04-26 15:36:01',4,2,FALSE),
       (7,'2021-04-26 15:36:01',4,3,TRUE),
       (8,'2021-04-26 15:36:01',2,5,TRUE),
       (9,'2021-04-26 15:36:01',3,5,TRUE);
UNLOCK TABLES;

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
-- Beispieldaten für Tabelle `gruppen_vorschlaege`
--

LOCK TABLES `gruppen_vorschlaege` WRITE;
INSERT INTO `gruppen_vorschlaege`
VALUES (1,'2021-03-02 18:21:26',1,1,70.5,1,TRUE,FALSE),
       (2,'2021-04-26 15:36:01',3,2,66.8,0,FALSE,FALSE),
       (3,'2021-04-26 15:36:01',4,4,92.8,2,TRUE,TRUE),
       (4,'2021-04-26 15:36:01',4,5,98.2,0,FALSE,FALSE),
       (5,'2021-04-26 15:36:01',4,2,80.7,1,TRUE,FALSE),
       (6,'2021-04-26 15:36:01',4,1,97.2,0,FALSE,FALSE),
       (7,'2021-04-26 15:36:01',3,4,70.9,0,FALSE,FALSE);
UNLOCK TABLES;
