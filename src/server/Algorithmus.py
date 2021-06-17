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

    def match(self):
        adm = Admin()
        p = PartnerVorschlag().








test = Algorithmus()
print(test.getalllernvorlieben())






