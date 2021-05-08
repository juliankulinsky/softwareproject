-- Datenbankstruktur im Aufbau

CREATE DATABASE IF NOT EXISTS `studoo`;
USE `studoo`;

--
-- Tabellenstruktur für Tabelle `personen`
--

DROP TABLE IF EXISTS `personen`;
CREATE TABLE `personen` (
    `id` int NOT NULL DEFAULT '0',
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `vorname` varchar(255) NOT NULL DEFAULT '',
    `nachname` varchar(255) NOT NULL DEFAULT '',
    `alter` int NOT NULL DEFAULT '0',
    `semester` int NOT NULL DEFAULT '0',
    `studiengang` varchar(255) NOT NULL DEFAULT '',
    `wohnort` varchar(255) NOT NULL DEFAULT '',
    `profil` int NOT NULL DEFAULT '0',
--    `gruppen` varchar(255) NOT NULL DEFAULT '',
--    `chats` varchar(255) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Beispieldaten für Tabelle `personen`
--

LOCK TABLES `personen` WRITE;
INSERT INTO `personen`
VALUES (1,'2021-04-02 18:21:26','Richard','Müller',28,2,'WI7','Stuttgart',1),
       (2,'2021-04-21 15:36:01','Otto','Roller',39,3,'IM7','Stuttgart',2),
       (3,'2021-05-08 10:36:01','Lisa','Ritter',22,1,'OM','Filderstadt',3);
UNLOCK TABLES;

--
-- Tabellenstruktur für Tabelle `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
    `id` int NOT NULL DEFAULT '0',
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `lernvorlieben` int NOT NULL DEFAULT '0',
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
    `id` int NOT NULL DEFAULT '0',
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `lerntyp` int NOT NULL DEFAULT '0',
    `frequenz` int NOT NULL DEFAULT '0',
    `extrovertiertheit` int NOT NULL DEFAULT '0',
    `remote_praesenz` int NOT NULL DEFAULT '0',
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
    `id` int NOT NULL DEFAULT '0',
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `inhalt` varchar(255) NOT NULL DEFAULT '',
    `absender` int NOT NULL DEFAULT '0',
    `konversation` int NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`)
--    ,FOREIGN KEY (`absender`) REFERENCES personen(`id`),
--    FOREIGN KEY (`empfaenger`) REFERENCES personen(`id`)
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
    `id` int NOT NULL DEFAULT '0',
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `person1_id` int NOT NULL DEFAULT '0',
    `person2_id` int NOT NULL DEFAULT '0',
    `person1_angenommen` bool DEFAULT FALSE,
    `person2_angenommen` bool DEFAULT FALSE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Beispieldaten für Tabelle `konversationen`
--

LOCK TABLES `konversationen` WRITE;
INSERT INTO `konversationen`
VALUES (1,'2021-03-02 18:21:26',1,2,TRUE,FALSE),
       (2,'2021-04-26 15:36:01',2,1,FALSE,TRUE);
UNLOCK TABLES;

--
-- Tabellenstruktur für Tabelle `vorschlaege`
--

DROP TABLE IF EXISTS `vorschlaege`;
CREATE TABLE `vorschlaege` (
    `id` int NOT NULL DEFAULT '0',
    `erstellungszeitpunkt` varchar(255) NOT NULL DEFAULT '2000-01-01 00:00:00',
    `person1_id` int NOT NULL DEFAULT '0',
    `person2_id` int NOT NULL DEFAULT '0',
    `aehnlichkeit` float NOT NULL DEFAULT 0.0,
    `angefragt` bool NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Beispieldaten für Tabelle `konversationen`
--

LOCK TABLES `vorschlaege` WRITE;
INSERT INTO `vorschlaege`
VALUES (1,'2021-03-02 18:21:26',1,2,67.8,FALSE),
       (2,'2021-04-26 15:36:01',2,1,67.8,TRUE);
UNLOCK TABLES;
