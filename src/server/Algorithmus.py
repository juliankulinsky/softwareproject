from server.Admin import Admin
from server.db.PartnerVorschlagMapper import PartnerVorschlagMapper
from server.db.Mapper import Mapper
from server.bo.PartnerVorschlag import PartnerVorschlag


class Algorithmus:

    def __init__(self):
        pass

    """def getalllernvorlieben(self):
        adm = Admin()
        lety = []
        fre = []
        ext = []
        remprae = []
        vor = []
        lein = []
        for step in range(len(adm.get_all_lernvorlieben())):
            lern = adm.get_lernvorliebe_by_id(step+1)
            lety.append(lern.get_lerntyp())
            fre.append(lern.get_frequenz())
            ext.append(lern.get_extrovertiertheit())
            remprae.append(lern.get_remote_praesenz())
            vor.append(lern.get_vorkenntnisse())
            lein.append(lern.get_lerninteressen())
            step += 1
        for x in range(len(adm.get_all_lernvorlieben())):
            score = lety[x] + fre[x] + ext[x] + remprae[x]
            id = x+1
            with PartnerVorschlagMapper() as mapper:
                result = mapper.find_by_key(id)
                result.set_aehnlichkeit(score)
                mapper.update(result)
        return result.get_aehnlichkeit()"""

    def match(self, partnervorschlag: PartnerVorschlag):
        aehnlichkeit = 0
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
        for x in lernvorliebenpe:
            count = 0
            if x - lernvorliebenpa[count] == 0:
                aehnlichkeit += 10
                count += 1
            elif x - lernvorliebenpa[count] == 1 or -1:
                aehnlichkeit += 7
                count += 1
            elif x - lernvorliebenpa[count] == 2 or -2:
                aehnlichkeit += 4
                count += 1
            elif x - lernvorliebenpa[count] == 3 or -3:
                aehnlichkeit += 2
                count += 1
            else:
                aehnlichkeit += 0
                count += 1

        with PartnerVorschlagMapper() as mapper:
            result = mapper.find_by_key(partnervorschlag.get_id())
            result.set_aehnlichkeit(aehnlichkeit)
            mapper.update(result)


adm = Admin()
algo = Algorithmus()
print(algo.match(adm.get_partner_vorschlag_by_id(1)))






