export interface Spec {
    label: string
    fields: string
}

const generalSpecs: Spec[] = [
    {
      label: 'Motor',
      fields: 'CILINDRADA,TMOTOR,VALCI,VALCO,TURBO,TRANSMI,ENGRA,COMBUSTIBLE,KMXLI,COALT,TORQU,POTEN,VEMAX'
    },
    {
      label: 'Dimensiones',
      fields: 'ALTOV,ANCHOV,LARGOV,DDSUE,DISEJ,PESOV,MINGI'
    },
    {
      label: 'Capacidad',
      fields: 'QPUERTAS,CABINA,FILAS,CDASI,BAUL,CAPCU,CAPCA,VOLCA,CAPAR,ABAUL,PESOTOTAL'
    },
    {
      label: 'Mecánica',
      fields: 'DIRECC,TRACCION,FRDEL,FRTRA,SUDEL,SUTRA,DOBEN'
    }
  ];

  const interiorSpecs: Spec[] = [
    {
      label: 'Confort',
      fields: 'AA,CALEN,CLIMAT,CAMES,SENSESTA,ARRAN,LDPRO,COCRU,MODCO,AJDIR,LEVAS,SIGCA,SENSCRE,SENSLLU,ESPVI'
    },
    {
      label: 'Multimedia',
      fields: 'PANTA,TAMUP,SISMU,SIGPS,ALVOC,BLUETH,CMVOZ,COAUX,COBLT,CIPOD,COUSB,COSAT,PANTR,RAMFM,REDVD,REMP3,REPCD,TOM12'
    },
    {
      label: 'Asientos y tapicería',
      fields: 'TAPIZADO,TIPTA,VOLCU,PALCU,COLIN,ASIENTCLIMA,ASIENTOSELE,AJCON,AJPAD,REPBR,APLUM,AJLUM,ASTRA,ASTAJ,ATPLE,ATPAR,REPTA,AS3FI,A3DIV,AS3AJ'
    },
    {
      label: 'Tablero',
      fields: 'GRPIN,HUDIS,MEREC,INMAC,INCAM'
    },
    {
      label: 'Ventanas y techo',
      fields: 'TECHCOR,TECHPAN,VELEC,VELED,VELET,OTSUB,OTBAJ,PERSP,CLREX,PERVT'
    },
    {
      label: 'Almacenamiento',
      fields: 'ALMRC,GREFR,PORLE,PVASO,PVATR'
    }
  ];

const exteriorSpecs: Spec[] = [
    {
      label: 'Diseño',
      fields: 'NEDEL,NETRA,LLANT,RIETE,JANTI,COLPG,ESCAP,VAGMO'
    },
    {
      label: 'Iluminación',
      fields: 'FAROS,ANTINIEBLA,LUCDI,FAUTO,FACUR,ORVMG'
    },
    {
      label: 'Conveniencia',
      fields: 'EAREF,ORVMA,LIMPS,LIMTR'
    }
  ];

  const seguridadSpecs: Spec[] = [
    {
      label: 'Activa',
      fields: 'ARRENPEN,PRESNEUM,CONTRAC,ABS,SREPFREN,CICEN,DESCOLINA,CCOND,ESTABELE,RUAUX,ADVCO,ADVPU,ADCIS,ASISTFREN,BLOCV,BLOCN,BLOQDIF,DESTR,DIFLI,INMOM'
    },
    {
      label: 'Pasiva',
      fields: 'AIRBAGS,CAIRB,ASINT,APEAT,AIRCA,AIRCOR,AIRDO,AIRLAT,APOST,AIRROD,TRESP,ISOFIX,REPCA,REPTC'
    }
  ];

  const adasSpecs: Spec[] = [{
    label: 'ADAS',
    fields: 'TADAS,ACDCA,ADCFR,ADPCI,ADTCR,APLDC,AAPSA,AESTA,CDVPE,CCADA,DDPEA,DDFAT,DDIDC,DDSDT,FADEM,STNGO'
  }]

export { generalSpecs, interiorSpecs, exteriorSpecs, seguridadSpecs, adasSpecs };