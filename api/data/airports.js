const airports = [
  {
    id: 'AKL',
    text: 'AKL - Auckland, New Zealand Auckland International Airport'
  },
  {
    id: 'AMS',
    text: 'AMS - Amsterdam, Netherlands Schiphol'
  },
  {
    id: 'ARN',
    text: 'ARN - Stockholm, Sweden Arlanda International'
  },
  {
    id: 'ATH',
    text: 'ATH - Athens, Greece - Venizelos'
  },
  {
    id: 'ATL',
    text: 'ATL - Atlanta, GA, USA Hartsfield International'
  },
  {
    id: 'AYT',
    text: 'AYT - Antalya, Turkey Antalya'
  },
  {
    id: 'BCN',
    text: 'BCN - Barcelona, Spain Barcelona'
  },
  {
    id: 'BKK',
    text: 'BKK - Bangkok, Thailand Bangkok International Airport'
  },
  {
    id: 'BNE',
    text: 'BNE - Brisbane, Queensland, Australia Brisbane International Airport'
  },
  {
    id: 'BOG',
    text: 'BOG - Bogota, Colombia Eldorado'
  },
  {
    id: 'BOM',
    text: 'BOM - Bombay, India - Mumbai'
  },
  {
    id: 'BOS',
    text: 'BOS - Boston, MA, USA Logan International Airport'
  },
  {
    id: 'BRU',
    text: 'BRU - Brussels, Belgium National'
  },
  {
    id: 'BSB',
    text: 'BSB - Brasilia, Distrito Federal, Brazil International'
  },
  {
    id: 'BWI',
    text: 'BWI - Baltimore, MD, USA BaltimoreWashington International'
  }, {
    id: 'CAN',
    text: 'CAN - Guangzhou, China - Baiyun'
  }, {
    id: 'CDG',
    text: 'CDG - Paris, France Charles De Gaulle'
  }, {
    id: 'CGH',
    text: 'CGH - Sao Paulo, Sao Paulo, Brazil Congonhas'
  }, {
    id: 'CGK',
    text: 'CGK - Jakarta, Indonesia Soekarno Hatta International'
  }, {
    id: 'CJU',
    text: 'CJU - Cheju, South Korea Cheju'
  }, {
    id: 'CLT',
    text: 'CLT - Charlotte, NC, USA Charlotte/Douglas Intl Airport'
  }, {
    id: 'CPH',
    text: 'CPH - Copenhagen, Denmark Copenhagen'
  }, {
    id: 'CTS',
    text: 'CTS - Sapporo, Japan Chitose'
  }, {
    id: 'CTU',
    text: 'CTU - Chengdu, China'
  }, {
    id: 'DCA',
    text: 'DCA - Washington, DC, USA Ronald Reagan National Airport'
  }, {
    id: 'DEL',
    text: 'DEL - Delhi, India - Indira Gandhi International Airport'
  }, {
    id: 'DEN',
    text: 'DEN - Denver, CO, USA Denver International'
  }, {
    id: 'DFW',
    text: 'DFW - Dallas/Ft Worth, TX, USA Dallas Ft Worth International'
  }, {
    id: 'DME',
    text: 'DME - Moscow, Russia - Domodedovo'
  }, {
    id: 'DOH',
    text: 'DOH - Doha, Qatar Doha'
  }, {
    id: 'DTW',
    text: 'DTW - Detroit, MI, USA Detroit-Wayne County Metropolitan Airport'
  }, {
    id: 'DUB',
    text: 'DUB - Dublin, Ireland Dublin'
  }, {
    id: 'DUS',
    text: 'DUS - Dusseldorf, Germany Dusseldorf'
  }, {
    id: 'DXB',
    text: 'DXB - Dubai, United Arab Emirates Dubai International Airport'
  }, {
    id: 'EWR',
    text: 'EWR - Newark, NJ, USA Newark International Airport'
  }, {
    id: 'FCO',
    text: 'FCO - Rome, Italy Leonardo Da Vinci/Fiumicino'
  }, {
    id: 'FLL',
    text: 'FLL - Fort Lauderdale, FL, USA Ft Lauderdale/Hollywood Intl Apt'
  }, {
    id: 'FRA',
    text: 'FRA - Frankfurt, Germany Frankfurt International'
  }, {
    id: 'FUK',
    text: 'FUK - Fukuoka, Japan Itazuke'
  }, {
    id: 'GIG',
    text: 'GIG - Rio De Janeiro, Rio De Janeiro, Brazil International Airport'
  }, {
    id: 'GMP',
    text: 'GMP - Seoul, Gimpo International Airport'
  }, {
    id: 'GRU',
    text: 'GRU - Sao Paulo, Sao Paulo, Brazil Guarulhos International'
  }, {
    id: 'HEL',
    text: 'HEL - Helsinki, Finland Helsinki'
  }, {
    id: 'HGH',
    text: 'HGH - Hangzhou, China'
  }, {
    id: 'HKG',
    text: 'HKG - Hong Kong, Hong Kong'
  }, {
    id: 'HND',
    text: 'HND - Tokyo (Ōta), Japan - Haneda (羽田空港) Tokyo International Airport (東京国際空港)'
  }, {
    id: 'IAD',
    text: 'IAD - Washington, DC, USA Dulles'
  }, {
    id: 'IAH',
    text: 'IAH - Houston, TX, USA'
  }, {
    id: 'ICN',
    text: 'ICN - Incheon [Seoul], South Korea - Incheon International Airport'
  }, {
    id: 'IST',
    text: 'IST - Istanbul, Turkey Ataturk'
  }, {
    id: 'JED',
    text: 'JED - Jeddah, Saudi Arabia Jeddah International'
  }, {
    id: 'JFK',
    text: 'JFK - New York, NY, USA John F Kennedy Intl Airport'
  }, {
    id: 'JNB',
    text: 'JNB - Johannesburg, South Africa - O R Tambo International Airport (formerly Jan Smuts)'
  }, {
    id: 'KMG',
    text: 'KMG - Kunming, China Kunming'
  }, {
    id: 'KUL',
    text: 'KUL - Kuala Lumpur, Malaysia - KLIA Kuala Lumpur International'
  }, {
    id: 'LAS',
    text: 'LAS - Las Vegas, NV, USA Mccarran International Airport'
  }, {
    id: 'LAX',
    text: 'LAX - Los Angeles, CA, USA Los Angeles Intl Airport'
  }, {
    id: 'LGA',
    text: 'LGA - New York, NY, USA Laguardia'
  }, {
    id: 'LGW',
    text: 'LGW - London, England, United Kingdom Gatwick'
  }, {
    id: 'LHR',
    text: 'LHR - London, England, United Kingdom Heathrow'
  }, {
    id: 'LIS',
    text: 'LIS - Lisbon, Portugal Lisboa'
  }, {
    id: 'MAD',
    text: 'MAD - Madrid, Spain Barajas'
  }, {
    id: 'MAN',
    text: 'MAN - Manchester, England, United Kingdom International'
  }, {
    id: 'MCO',
    text: 'MCO - Orlando, FL, USA Orlando International Airport'
  }, {
    id: 'MDW',
    text: 'MDW - Chicago, IL, USA - Midway'
  }, {
    id: 'MEL',
    text: 'MEL - Melbourne, Victoria, Australia - Tullamarine'
  }, {
    id: 'MEX',
    text: 'MEX - Mexico City, Distrito Federal, Mexico Juarez Intl Airport'
  }, {
    id: 'MIA',
    text: 'MIA - Miami, FL, USA Miami International Airport'
  }, {
    id: 'MNL',
    text: 'MNL - Manila, Philippines Ninoy Aquino International'
  }, {
    id: 'MSP',
    text: 'MSP - Minneapolis, MN, USA Minneapolis/St Paul Intl Airport'
  }, {
    id: 'MUC',
    text: 'MUC - Munich, Germany Franz Josef Strauss'
  }, {
    id: 'MXP',
    text: 'MXP - Milan, Italy Malpensa'
  }, {
    id: 'NRT',
    text: 'NRT - Tokyo, Japan - Narita'
  }, {
    id: 'ORD',
    text: 'ORD - Chicago, IL, USA - O\'hare International Airport'
  }, {
    id: 'ORY',
    text: 'ORY - Paris, France Orly'
  }, {
    id: 'OSL',
    text: 'OSL - Oslo, Norway'
  }, {
    id: 'PEK',
    text: 'PEK - Beijing, China Peking Capital Airport'
  }, {
    id: 'PHL',
    text: 'PHL - Philadelphia, PA, USA Philadelphia International Airport'
  }, {
    id: 'PHX',
    text: 'PHX - Phoenix, AZ, USA Sky Harbor International Airport'
  }, {
    id: 'PMI',
    text: 'PMI - Palma Mallorca, Mallorca Island, Spain Palma Mallorca'
  }, {
    id: 'PVG',
    text: 'PVG - Shanghai, China - Pudong Shanghai Airport'
  }, {
    id: 'RUH',
    text: 'RUH - Riyadh, Saudi Arabia King Khaled Intl'
  }, {
    id: 'SAN',
    text: 'SAN - San Diego, CA, USA Lindbergh International Airport'
  }, {
    id: 'SEA',
    text: 'SEA - Seattle, WA, USA Seattle Tacoma Intl Airport'
  }, {
    id: 'SFO',
    text: 'SFO - San Francisco, CA, USA San Francisco Intl Airport'
  }, {
    id: 'SHA',
    text: 'SHA - Shanghai, China - Shanghai Intl /Hongqiao/'
  }, {
    id: 'SIN',
    text: 'SIN - Singapore, Singapore Changi International Airport'
  }, {
    id: 'SLC',
    text: 'SLC - Salt Lake City, UT, USA Salt Lake City International Arpt'
  }, {
    id: 'STN',
    text: 'STN - London, England, United Kingdom Stansted'
  }, {
    id: 'SVO',
    text: 'SVO - Moscow, Russia - Sheremetyevo'
  }, {
    id: 'SYD',
    text: 'SYD - Sydney, New South Wales, Australia Sydney /KingsfordSmith/ Airport'
  }, {
    id: 'SZX',
    text: 'SZX - Shenzhen, China Shenzhen'
  }, {
    id: 'TPA',
    text: 'TPA - Tampa, FL, USA Tampa International'
  }, {
    id: 'TPE',
    text: 'TPE - Taipei, Taiwan - Taiwan Taoyuan International Airport (formerly Chiang Kai Shek Airport)'
  }, {
    id: 'TXL',
    text: 'TXL - Berlin, Germany Tegel'
  }, {
    id: 'VIE',
    text: 'VIE - Vienna, Austria Schwechat'
  }, {
    id: 'XMN',
    text: 'XMN - Xiamen, China - Xiamen International'
  }, {
    id: 'YVR',
    text: 'YVR - Vancouver, British Columbia, Canada Vancouver International'
  }, {
    id: 'YYZ',
    text: 'YYZ - Toronto, Ontario, Canada - Lester B Pearson International Airport'
  }, {
    id: 'ZRH',
    text: 'ZRH - Zurich, Switzerland Zurich'
  }
];

export default airports;
