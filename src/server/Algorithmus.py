from server.Admin import Admin
from server.db.PartnerVorschlagMapper import PartnerVorschlagMapper
from server.bo.PartnerVorschlag import PartnerVorschlag


class Algorithmus:

    def __init__(self):
        pass

    def match(self, partnervorschlag: PartnerVorschlag):
        a = Admin()
        personid = partnervorschlag.get_person_id()
        partnerid = partnervorschlag.get_partner_id()
        person = a.get_person_by_id(personid)
        partner = a.get_person_by_id(partnerid)
        personprofil = a.get_profil_by_id(person.get_profil_id())
        partnerprofil = a.get_profil_by_id(partner.get_profil_id())
        lernvorliebeperson = a.get_lernvorliebe_by_id(personprofil.get_lernvorlieben_id())
        lernvorliebepartner = a.get_lernvorliebe_by_id(partnerprofil.get_lernvorlieben_id())
        listeperson = [lernvorliebeperson.get_frequenz(), lernvorliebeperson.get_extrovertiertheit(),
                       lernvorliebeperson.get_remote_praesenz()]
        listepartner = [lernvorliebepartner.get_frequenz(), lernvorliebepartner.get_extrovertiertheit(),
                        lernvorliebepartner.get_remote_praesenz()]
        spperson = lernvorliebeperson.get_lerninteressen()
        sppartner = lernvorliebepartner.get_lerninteressen()
        durchlaufpersonunbearbeitet = map(lambda x: x.lower(), [x.strip() for x in spperson.split(',')])
        durchlaufperson = list(durchlaufpersonunbearbeitet)
        durchlaufpartnerunbearbeitet = map(lambda x: x.lower(), [x.strip() for x in sppartner.split(',')])
        durchlaufpartner = list(durchlaufpartnerunbearbeitet)
        aehnlichkeit = 0
        count = 0
        for aufruf in listeperson:
            if aufruf - listepartner[count] == 0:
                aehnlichkeit += 10
                count += 1
            elif aufruf - listepartner[count] == 1 or aufruf - listepartner[count] == -1:
                aehnlichkeit += 5
                count += 1
            elif aufruf - listepartner[count] == 2 or aufruf - listepartner[count] == -2:
                aehnlichkeit += 1
                count += 1
            elif aufruf - listepartner[count] == 3 or aufruf - listepartner[count] == -3:
                aehnlichkeit -= 2
                count += 1
            else:
                aehnlichkeit -= 5
                count += 1
        if lernvorliebeperson.get_lerntyp() == lernvorliebepartner.get_lerntyp():
            aehnlichkeit += 10
        for wort in range(len(durchlaufperson)):
            for kek in range(len(durchlaufpartner)):
                if durchlaufperson[wort] in durchlaufpartner[kek]:
                    aehnlichkeit += 15
        with PartnerVorschlagMapper() as mapper:
            result = mapper.find_by_key(partnervorschlag.get_id())
            result.set_aehnlichkeit(aehnlichkeit)
            mapper.update(result)

