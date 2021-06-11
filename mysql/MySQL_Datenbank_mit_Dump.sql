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
       (3,'2021-05-08 10:36:01','Lisa Ritter', 'l.ritter@gmail.com', 'l1i2s3a4', 22,'Filderstadt','OM',1,3);
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
       (2,'2021-04-26 15:36:01',2);
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
       (2,'2021-04-26 15:36:01',2,4,3,2,'React','Websites');
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
       (2,'2021-05-01 16:02:45','Gut dir?',2,1),
       (3,'2021-05-02 09:50:59','Mir auch danke',1,2),
       (4,'2021-05-02 12:36:12','Kannst du Python?',1,2);
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
VALUES (1,'2021-03-02 18:21:26',FALSE),
       (2,'2021-04-26 15:36:01',TRUE);
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
VALUES (1,'2021-03-02 18:21:26',2,1),
       (2,'2021-04-26 15:36:01',3,1);
UNLOCK TABLES;

--
-- Tabellenstruktur für Tabelle `partner_vorschlaege`
--

DROP TABLE IF EXISTS `partner_vorschlaege`;
CREATE TABLE `partner_vorschlaege` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `person_id` int NOT NULL DEFAULT 0,
    `partnervorschlag_id` int NOT NULL DEFAULT 0,
    `aehnlichkeit` float NOT NULL DEFAULT 0.0,
    `entscheidung_person` bool DEFAULT NULL,
    `entscheidung_partner` bool DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Beispieldaten für Tabelle `partner_vorschlaege`
--

LOCK TABLES `partner_vorschlaege` WRITE;
INSERT INTO `partner_vorschlaege`
VALUES (1,'2021-03-02 18:21:26',1,2,67.8,TRUE,TRUE),
       (2,'2021-04-26 15:36:01',1,3,67.8,TRUE,NULL);
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
VALUES (1,'2021-03-02 18:21:26','Python Profis',4,2),
       (2,'2021-04-26 15:36:01','Java Genies',5,3);
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
VALUES (1,'2021-03-02 18:21:26',1,2,FALSE),
       (2,'2021-04-26 15:36:01',3,2,FALSE);
UNLOCK TABLES;

--
-- Tabellenstruktur für Tabelle `gruppen_vorschlaege`
--

DROP TABLE IF EXISTS `gruppen_vorschlaege`;
CREATE TABLE `gruppen_vorschlaege` (
    `id` int NOT NULL DEFAULT 0,
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `person_id` int NOT NULL DEFAULT 0,
    `gruppenvorschlag_id` int NOT NULL DEFAULT 0,
    `aehnlichkeit` float DEFAULT 0.0,
    `entscheidung_person` bool DEFAULT NULL,
    `entscheidung_gruppe` bool DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Beispieldaten für Tabelle `gruppen_vorschlaege`
--

LOCK TABLES `gruppen_vorschlaege` WRITE;
INSERT INTO `gruppen_vorschlaege`
VALUES (1,'2021-03-02 18:21:26',1,1,70.5,TRUE,NULL),
       (2,'2021-04-26 15:36:01',3,2,66.8,FALSE,NULL);
UNLOCK TABLES;
