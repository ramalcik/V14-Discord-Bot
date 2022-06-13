const mongoose = require('mongoose');
let client = global.client;
let puansystem = mongoose.Schema({
    guildID: String,
    PublicKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["745418792896692336"],
            "Puan": 30
        }
    },
    GameKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["745705642291101818","746458880845938800","745720588856983742"],
            "Puan": 6
        }
    },
    KayitKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["745409926045761624"],
            "Puan": 5
        }
    },
    StreamKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["749386210044280873"],
            "Puan": 25
        }
    },
    SecretKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["745421315468689509"],
            "Puan": 10
        }
    },
    SleepingKanal: {
        type: Object,
        default: {
            "Rol": [],
            "Id": "745418987684233236",
            "Puan": 10
        }
    },
    AloneKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["745423483630256169"],
            "Puan": 10
        }
    },
    TerapiKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["753326179288612895"],
            "Puan": 15
        }
    },
    SorunCozmeKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["745445844085637251"],
            "Puan": 15
        }
    },
    MesajKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["745417419320983612"],
            "Puan": 0.15
        }
    },
    TagMember: {
        type: Object,
        default: {
            "Rol": [],
            "Puan": 45
        }
    },
    Invite: {
        type: Object,
        default: {
            "Rol": [],
            "Puan": 5
        }
    },
    Register: {
        type: Object,
        default: {
            "Rol": [],
            "Puan": 3
        }
    },
    Yetkili: {
        type: Object,
        default: {
            "Rol": [],
            "Puan": 60
        }
    },
    Toplantı: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["776914922105733178"],
            "Puan": 200
        }
    },
    Müzik: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["774329860750835752"],
            "Puan": 6
        }
    },
    DailyMission: {
        type: Object,
        default: {
            "logChannel": "815654576120266792",
            "category": ["749386210044280873","745418792896692336"],
            "messageChannel": ["745417658228277361"],
            "unChannel": ["745418987684233236"]
        }
    },
    AutoRankUP: {
        type: Object,
        default: {
            Type: false,
            LogChannel: "822278094093025330"
        }
    },
    LevelSystem: {
        type: Object,
        default: {
            Type: false,
            LogChannel: "822278135419895828"
        }
    },
    PuanRolSystem: {
        type: Array,
        default: [{
            "ROLE_1": "745428846081343514",
            "ROLE_2": "745428893909123073",
            "PUAN": 200
        }, {
            "ROLE_1": "745428893909123073",
            "ROLE_2": "759166505903587369",
            "PUAN": 300
        }, {
            "ROLE_1": "759166505903587369",
            "ROLE_2": "759166504678850621",
            "PUAN": 400
        }, {
            "ROLE_1": "759166504678850621",
            "ROLE_2": "755119863634198649",
            "PUAN": 600
        }, {
            "ROLE_1": "755119863634198649",
            "ROLE_2": "759154211362963525",
            "PUAN": 800
        }, {
            "ROLE_1": "759154211362963525",
            "ROLE_2": "745426393495502858",
            "PUAN": 1200
        }, {
            "ROLE_1": "745426393495502858",
            "ROLE_2": "753778010091552828",
            "PUAN": 1600
        }, {
            "ROLE_1": "753778010091552828",
            "ROLE_2": "745428713633480757",
            "PUAN": 2100
        }, {
            "ROLE_1": "745428713633480757",
            "ROLE_2": "759151282312314931",
            "PUAN": 2400
        }, {
            "ROLE_1": "759151282312314931",
            "ROLE_2": "757429628875964477",
            "PUAN": 4800
        }, {
            "ROLE_1": "757429628875964477",
            "ROLE_2": "757431805937844244",
            "PUAN": 5000
        }, {
            "ROLE_1": "757431805937844244",
            "ROLE_2": "745427990707699752",
            "PUAN": 5250
        }, {
            "ROLE_1": "745427990707699752",
            "ROLE_2": "757430722511372338",
            "PUAN": 6700
        }, {
            "ROLE_1": "757430722511372338",
            "ROLE_2": "747636329717956628",
            "PUAN": 7000
        }, {
            "ROLE_1": "747636329717956628",
            "ROLE_2": "755081116767092766",
            "PUAN": 7500
        }, {
            "ROLE_1": "755081116767092766",
            "ROLE_2": "745429520240083068",
            "PUAN": 9000
        }, {
            "ROLE_1": "745429520240083068",
            "ROLE_2": "745425964967657686",
            "PUAN": 10500
        }]
    },
    AutoLogin: {
        type: Object,
        default: {
            Type: true
        }
    }
});
module.exports = mongoose.model("puansystem", puansystem)