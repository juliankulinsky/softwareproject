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
        lernvorliebenpe = [lernvorliebeperson.get_frequenz(), lernvorliebeperson.get_extrovertiertheit(), lernvorliebeperson.get_remote_praesenz()]
        lernvorliebenpa = [lernvorliebepartner.get_frequenz(), lernvorliebepartner.get_extrovertiertheit(), lernvorliebepartner.get_remote_praesenz()]
        aehnlichkeit = 0
        for x in lernvorliebenpe:
            count = 0
            if x - lernvorliebenpa[count] == 0:
                aehnlichkeit += 10 + lernvorliebenpa[count] + lernvorliebenpe[count]
                count += 1
            elif x - lernvorliebenpa[count] == 1 or -1:
                aehnlichkeit += 5 + lernvorliebenpa[count] + lernvorliebenpe[count]
                count += 1
            elif x - lernvorliebenpa[count] == 2 or -2:
                aehnlichkeit += 1 + lernvorliebenpa[count] + lernvorliebenpe[count]
                count += 1
            elif x - lernvorliebenpa[count] == 3 or -3:
                aehnlichkeit -= 2 - lernvorliebenpa[count] - lernvorliebenpe[count]
                count += 1
            else:
                aehnlichkeit -= 5 - lernvorliebenpa[count] - lernvorliebenpe[count]
                count += 1
        with PartnerVorschlagMapper() as mapper:
            result = mapper.find_by_key(partnervorschlag.get_id())
            result.set_aehnlichkeit(aehnlichkeit)
            mapper.update(result)


adm = Admin()
algo = Algorithmus()
print(algo.match(adm.get_partner_vorschlag_by_id(5)))






