import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colours from '../Assets/Colours';
import {ApiCall} from './ApiCall';
import Svg, {SvgXml} from 'react-native-svg';
import {SvgUri} from 'react-native-svg';
import KunsliChart from './KunsliChart';

const KundliDetails = ({navigation, route}) => {
  const [svgCode, setSvgCode] = useState(null);
  const [Selected, setSelected] = useState(1);
  const [Lagna, setLagna] = useState([]);
  const [Navamsa, setNavamsa] = useState();
  const [Transit, setTransit] = useState([]);
  const [DivisionalSelect, setDivisionalSelect] = useState(1);

  const name = route.params.name;
  const gender = route.params.gender;
  const DOB = route.params.dob;
  const POB = route.params.pob;
  const TOB = route.params.tob;
  const lat = route.params.lat;
  const lon = route.params.lon;

  const dateParts = DOB.split('/');
  const day = dateParts[0];
  const month = dateParts[1];
  const year = dateParts[2];
  const [Sunset, setSunset] = useState();
  const [Sunrise, setSunrise] = useState();

  const [Acsedent, setAcsedent] = useState();
  const [Kalsarpa, setKalsarpa] = useState();
  const [PlanetData, setPlanetData] = useState([]);
  const [GhatChakra, setGhatChakra] = useState({});
  const [NumeroTable, setNumeroTable] = useState({});
  const [BasicPanchang, setBasicPanchang] = useState({});
  const [SVG, setSvg] = useState({});
  const [KalsarpaPresent, setKalsarpaPresent] = useState(false);

  const [Sun, setSun] = useState([]);
  const [Moon, setMoon] = useState([]);
  const [D2, setD2] = useState([]);
  const [D3, setD3] = useState([]);
  const [D4, setD4] = useState([]);
  const [D7, setD7] = useState([]);
  const [D10, setD10] = useState([]);
  const [D16, setD16] = useState([]);
  const [D20, setD20] = useState([]);
  const [D24, setD24] = useState([]);
  const [D30, setD30] = useState([]);
  const [D40, setD40] = useState([]);
  const [D45, setD45] = useState([]);
  const [D60, setD60] = useState([]);

  const timeParts = TOB.split(':');
  const hour = timeParts[0];
  const minute = timeParts[1];

  

  const data = {
    day: day,
    month: month,
    year: year,
    hour: hour,
    min: minute,
    lat: lat,
    lon: lon,
    tzone: 5.5,
  };

  const DivisionalHeaderData = [
    {
      Number: 1,
      Name: 'Chalit',
    },
    {
      Number: 2,
      Name: 'Sun',
    },
    {
      Number: 3,
      Name: 'Moon',
    },
    {
      Number: 4,
      Name: 'Horo(D-2)',
    },
    {
      Number: 5,
      Name: 'Drekkana(D-3)',
    },
    {
      Number: 6,
      Name: 'Chathurthamasha(D-4)',
    },
    {
      Number: 7,
      Name: 'Saptamansha(D-7)',
    },
    {
      Number: 8,
      Name: 'Dashamansha(D-7)',
    },
    {
      Number: 9,
      Name: 'Shodashamsha(D-16)',
    },
    {
      Number: 10,
      Name: 'Vishamansha(D-20)',
    },
    {
      Number: 11,
      Name: 'Chaturvimshamsha ',
    },
    {
      Number: 12,
      Name: 'Trishamansha(D-30)',
    },
    {
      Number: 13,
      Name: 'Khavedamsha(D-40)',
    },
    {
      Number: 14,
      Name: 'Akshvedansha(D-45)',
    },
    {
      Number: 15,
      Name: 'Shashtymsha(D-60)',
    },
  ];

  const DivisionalHeader = ({item}) => (
    <TouchableOpacity
      onPress={() => setDivisionalSelect(item.Number)}
      style={[
        styles.DivisonalHeadTabBarButton,
        DivisionalSelect == item.Number &&
          styles.DivisonalHeadTabBarButtonSelected,
      ]}>
      <Text style={styles.HeadTabBarText}>{item.Name}</Text>
    </TouchableOpacity>
  );

  const fetchdata = () => {
    console.log('data', data);
    ApiCall('https://json.astrologyapi.com/v1/kalsarpa_details', data).then(
      response => {
        console.log('response', response);
        setKalsarpa(response.one_line);
        setKalsarpaPresent(response.present);
        console.log(KalsarpaPresent);
      },
    );
    ApiCall('https://json.astrologyapi.com/v1/birth_details', data).then(
      response => {
        // console.log("response", response);
        setSunrise(response.sunrise);
        setSunset(response.sunset);
        // console.log(Kalsarpa)
      },
    );
    ApiCall(
      'https://json.astrologyapi.com/v1/general_ascendant_report',
      data,
    ).then(response => {
      // console.log("response", response);
      setAcsedent(response.asc_report.report);
    });
    ApiCall('https://json.astrologyapi.com/v1/planets', data).then(response => {
      // console.log("response",response);
      setPlanetData(response);
      // console.log(PlanetData)
    });
    ApiCall('https://json.astrologyapi.com/v1/ghat_chakra', data).then(
      response => {
        // console.log("response",response);
        // console.log("ghat chakra",response)
        setGhatChakra(response);
        // console.log(GhatChakra)
      },
    );
    ApiCall('https://json.astrologyapi.com/v1/numero_table', data).then(
      response => {
        // console.log("response",response);
        // console.log("Numero Table",response)
        setNumeroTable(response);
        // console.log(GhatChakra)
      },
    );
    ApiCall('https://json.astrologyapi.com/v1/basic_panchang', data).then(
      response => {
        // console.log("response",response);
        // console.log("Numero Table",response)
        setBasicPanchang(response);
        // console.log(GhatChakra)
        isLoading(false);
      },
    );
    ApiCall('https://json.astrologyapi.com/v1/horo_chart/D1', data).then(
      response => {
        // console.log('response', response);
        setLagna(response);
        console.log(Lagna);
      },
    );
    ApiCall('https://json.astrologyapi.com/v1/horo_chart/D9', data).then(
      response => {
        // console.log('response', response);
        setNavamsa(response);
      },
    );
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/chalit',
      data,
    ).then(response => {
      setTransit(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/SUN',
      data,
    ).then(response => {
      setSun(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/MOON',
      data,
    ).then(response => {
      setMoon(response);
    });
    ApiCall('https://json.astrologyapi.com/v1/horo_chart/D2', data).then(
      response => {
        setD2(response);
      },
    );
    ApiCall('https://json.astrologyapi.com/v1/horo_chart/D3', data).then(
      response => {
        setD3(response);
      },
    );
    ApiCall('https://json.astrologyapi.com/v1/horo_chart/D4', data).then(
      response => {
        setD4(response);
      },
    );
    ApiCall('https://json.astrologyapi.com/v1/horo_chart/D7', data).then(
      response => {
        setD7(response);
      },
    );
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D10',
      data,
    ).then(response => {
      setD10(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D16',
      data,
    ).then(response => {
      setD16(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D20',
      data,
    ).then(response => {
      setD20(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D24',
      data,
    ).then(response => {
      setD24(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D30',
      data,
    ).then(response => {
      setD30(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D40',
      data,
    ).then(response => {
      setD40(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D45',
      data,
    ).then(response => {
      setD45(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D60',
      data,
    ).then(response => {
      setD60(response);
    });
    SetLoading(false);
  };

  useEffect(() => {
    // this.setState.isLoading{true};
    SetLoading(true);
    fetchdata();
  }, []);

  const [check, setcheck] = useState(1);

  const handleBasic = () => {
    setcheck(1);
  };
  const handlecharts = () => {
    setcheck(2);
  };
  const Planets = () => {
    setcheck(3);
  };
  const HGhatChakra = () => {
    setcheck(4);
  };
  const HNumeroTable = () => {
    setcheck(5);
  };
  const report = () => {
    setcheck(6);
  };

  // const SvgImage = async() => {
  //   return (
  //     <View>
  //       <Text>hello</Text>
  //       <SvgXml xml={SVG} style={{alignSelf: 'center'}} />
  //     </View>
  //   );
  // };

  const PlanetTable = ({item}) => (
    <View style={{width:'100%'}}>
      <View style={{flexDirection: 'row',width:'100%' }}>
        <Text
          style={{
            width: 73,
            marginVertical: 5,
            fontSize: 12,
            textAlign: 'center',
            color:Colours.TextDarkColour
          }}>
          {item.name}
        </Text>
        <Text style={styles.tableRow}>{item.sign}</Text>
        <Text style={styles.tableRow}>{item.signLord}</Text>
        <Text numberOfLines={1} style={styles.tableRow}>
          {Number(item.normDegree).toFixed(2)}
        </Text>
        <Text numberOfLines={1} style={styles.tableRow}>
          {item.house}
        </Text>
      </View>
    </View>
  );

  const [isLoading, SetLoading] = useState(true);

  return (
    <View style={{flex: 1}}>
      <ActivityIndicator
        size={'large'}
        color={Colours.PrimaryColor}
        animating={isLoading}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: '50%',
          zIndex: 1,
        }}
      />
      {isLoading ? <View style={{height: '100%', width: '100%'}}></View> : null}
      <View style={styles.ChartHeadTabBar}>
        <ScrollView horizontal={true}>
          <TouchableOpacity
            onPress={handleBasic}
            style={[
              styles.HeadTabBarButton,
              check == 1 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={styles.HeadTabBarText}>Basic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlecharts}
            style={[
              styles.HeadTabBarButton,
              check == 2 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={styles.HeadTabBarText}>Charts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={Planets}
            style={[
              styles.HeadTabBarButton,
              check == 3 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={styles.HeadTabBarText}>Planets</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={HGhatChakra}
            style={[
              styles.HeadTabBarButton,
              check == 4 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={styles.HeadTabBarText}>Ghat Chakra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={HNumeroTable}
            style={[
              styles.HeadTabBarButton,
              check == 5 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={styles.HeadTabBarText}>Numerology</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={report}
            style={[
              styles.HeadTabBarButton,
              check == 6 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={styles.HeadTabBarText}>Report</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {check == 1 ? (
        <ScrollView>
          <Text style={styles.heading}>Basic Details</Text>
          <View style={styles.DetailContainer}>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Name</Text>
              <Text style={styles.detailAnswer}>{name}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Gender</Text>
              <Text style={styles.detailAnswer}>{gender}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Date of Birth</Text>
              {/* <Text style={styles.detailAnswer}>{DOB.substring(0, 1)}</Text>*/}
              <Text style={styles.detailAnswer}>{DOB}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Time of Birth</Text>
              <Text style={styles.detailAnswer}>{TOB}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Place of Birth</Text>
              <Text numberOfLines={1} style={styles.detailAnswer}>
                {POB}
              </Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Latitude</Text>
              <Text style={styles.detailAnswer}>{lat}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>longitude</Text>
              <Text style={styles.detailAnswer}>{lon}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>longitude</Text>
              <Text style={styles.detailAnswer}>{lon}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Sunrise</Text>
              <Text style={styles.detailAnswer}>{Sunrise}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Sunset</Text>
              <Text style={styles.detailAnswer}>{Sunset}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.heading}> Kalsarpa Details</Text>
            <View style={styles.DetailContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {KalsarpaPresent ? (
                  <Text style={[styles.Indicator, {backgroundColor: 'red'}]}>
                    Yes
                  </Text>
                ) : (
                  <Text style={[styles.Indicator, {backgroundColor: 'green'}]}>
                    No
                  </Text>
                )}
                <Text
                  style={{
                    marginRight: 5,
                    marginLeft: 5,
                    color: 'black',
                    width: 280,
                  }}>
                  {Kalsarpa}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.heading}>Basic Panchang</Text>
          <View style={styles.DetailContainer}>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Day</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.day}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Tithi</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.tithi}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Nakshatra</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.nakshatra}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Yog</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.yog}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Karan</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.karan}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Sunrise</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.sunrise}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Sunset</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.sunset}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Vedic Sunrise</Text>
              <Text style={styles.detailAnswer}>
                {BasicPanchang.vedic_sunrise}
              </Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Vedic Sunset</Text>
              <Text style={styles.detailAnswer}>
                {BasicPanchang.vedic_sunset}
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : null}

      {check == 2 ? (
        <View>
          {/* <Text style={styles.heading}>Horo Chart</Text> */}
          {/* <SvgXml xml={SVG} style={{alignSelf: 'center'}} /> */}
          <View style={styles.ChartHeadTabBar}>
            <TouchableOpacity
              onPress={() => setSelected(1)}
              style={[
                styles.ChartHeadTabBarButton,
                {
                  borderColor: Selected == 1 ? Colours.PrimaryColor : null,
                  borderBottomWidth: Selected == 1 ? 2 : null,
                },
              ]}>
              <Text style={styles.ChartHeadTabBarText}>Lagna</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelected(2)}
              style={[
                styles.ChartHeadTabBarButton,
                {
                  borderColor: Selected == 2 ? Colours.PrimaryColor : null,
                  borderBottomWidth: Selected == 2 ? 2 : null,
                },
              ]}>
              <Text style={styles.ChartHeadTabBarText}>Navamsa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelected(3)}
              style={[
                styles.ChartHeadTabBarButton,
                {
                  borderColor: Selected == 3 ? Colours.PrimaryColor : null,
                  borderBottomWidth: Selected == 3 ? 2 : null,
                },
              ]}>
              <Text style={styles.ChartHeadTabBarText}>Transit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelected(4)}
              style={[
                styles.ChartHeadTabBarButton,
                {
                  borderColor: Selected == 4 ? Colours.PrimaryColor : null,
                  borderBottomWidth: Selected == 4 ? 2 : null,
                },
              ]}>
              <Text style={styles.ChartHeadTabBarText}>Divisional</Text>
            </TouchableOpacity>
          </View>
          {Selected == 1 ? (
            <View>
              <Text style={styles.heading}>Lagna Chart</Text>
              <KunsliChart Datas={Lagna}/>
            </View>
          ) : null}
          {Selected == 2 ? (
            <View>
              <Text style={styles.heading}>Navamsa</Text>
              {/* <SvgXml xml={Navamsa} style={{alignSelf: 'center'}} /> */}
              <KunsliChart Datas={Navamsa}/>
            </View>
          ) : null}
          {Selected == 3 ? (
            <View>
              <Text style={styles.heading}>Transit</Text>
              {/* <SvgXml xml={Transit} style={{alignSelf: 'center'}} /> */}
              <KunsliChart Datas={Transit}/>
            </View>
          ) : null}
          {Selected == 4 ? (
            <View>
              <FlatList
                data={DivisionalHeaderData}
                renderItem={DivisionalHeader}
                horizontal={true}
              />
              {DivisionalSelect == 1 ? (
                <View>
                  <Text style={styles.heading}>Chalit</Text>
                  <KunsliChart Datas={Transit}/>
                </View>
              ) : null}
              {DivisionalSelect == 2 ? (
                <View>
                  <Text style={styles.heading}>Sun</Text>
                  <KunsliChart Datas={Sun}/>
                </View>
              ) : null}
              {DivisionalSelect == 3 ? (
                <View>
                  <Text style={styles.heading}>Moon</Text>
                  <KunsliChart Datas={Moon}/>
                </View>
              ) : null}
              {DivisionalSelect == 4 ? (
                <View>
                  <Text style={styles.heading}>Horo(D-2)</Text>
                  <KunsliChart Datas={D2}/>
                </View>
              ) : null}
              {DivisionalSelect == 5 ? (
                <View>
                  <Text style={styles.heading}>Drekkana(D-3)</Text>
                  <KunsliChart Datas={D3}/>
                </View>
              ) : null}
              {DivisionalSelect == 6 ? (
                <View>
                  <Text style={styles.heading}>Chathurthamasha(D-4)</Text>
                  <KunsliChart Datas={D4}/>
                </View>
              ) : null}
              {DivisionalSelect == 7 ? (
                <View>
                  <Text style={styles.heading}>Saptamansha(D-7)</Text>
                  <KunsliChart Datas={D7}/>
                </View>
              ) : null}
              {DivisionalSelect == 8 ? (
                <View>
                  <Text style={styles.heading}>Dashamansha(D-7)</Text>
                  <KunsliChart Datas={D10}/>
                </View>
              ) : null}
              {DivisionalSelect == 9 ? (
                <View>
                  <Text style={styles.heading}>Shodashamsha(D-16)</Text>
                  <KunsliChart Datas={D16}/>
                </View>
              ) : null}
              {DivisionalSelect == 10 ? (
                <View>
                  <Text style={styles.heading}>Vishamansha(D-20)</Text>
                  <KunsliChart Datas={D20}/>
                </View>
              ) : null}
              {DivisionalSelect == 11 ? (
                <View>
                  <Text style={styles.heading}>Chaturvimshamsha</Text>
                  <KunsliChart Datas={D24}/>
                </View>
              ) : null}
              {DivisionalSelect == 12 ? (
                <View>
                  <Text style={styles.heading}>Trishamansha(D-30)</Text>
                  <KunsliChart Datas={D30}/>
                </View>
              ) : null}
              {DivisionalSelect == 13 ? (
                <View>
                  <Text style={styles.heading}>Khavedamsha(D-40)</Text>
                  <KunsliChart Datas={D40}/>
                </View>
              ) : null}
              {DivisionalSelect == 14 ? (
                <View>
                  <Text style={styles.heading}>Akshvedansha(D-45)</Text>
                  <KunsliChart Datas={D45}/>
                </View>
              ) : null}
              {DivisionalSelect == 15 ? (
                <View>
                  <Text style={styles.heading}>Shashtymsha(D-60)</Text>
                  <KunsliChart Datas={D40}/>
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      ) : null}

      {check == 4 ? (
        <ScrollView>
          <Text style={styles.heading}>Ghat Chakra</Text>
          <View style={styles.DetailContainer}>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Month</Text>
              <Text style={styles.detailAnswer}>{GhatChakra.month}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Tithi</Text>
              <Text style={styles.detailAnswer}>{GhatChakra.tithi}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Day</Text>
              <Text style={styles.detailAnswer}>{GhatChakra.day}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Nakshatra</Text>
              <Text style={styles.detailAnswer}>{GhatChakra.nakshatra}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Yog</Text>
              <Text style={styles.detailAnswer}>{GhatChakra.yog}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Karan</Text>
              <Text style={styles.detailAnswer}>{GhatChakra.karan}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Pahar</Text>
              <Text style={styles.detailAnswer}>{GhatChakra.pahar}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Moon</Text>
              <Text style={styles.detailAnswer}>{GhatChakra.moon}</Text>
            </View>
          </View>
        </ScrollView>
      ) : null}

      {check == 5 ? (
        <ScrollView>
          <Text style={styles.heading}>Numero Table</Text>
          <View style={styles.DetailContainer}>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Name</Text>
              <Text style={styles.detailAnswer}>{NumeroTable.name}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Date</Text>
              <Text style={styles.detailAnswer}>{NumeroTable.date}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Destiny Number</Text>
              <Text style={styles.detailAnswer}>
                {NumeroTable.destiny_number}
              </Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Radical Number</Text>
              <Text style={styles.detailAnswer}>
                {NumeroTable.radical_number}
              </Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Name Number</Text>
              <Text style={styles.detailAnswer}>{NumeroTable.name_number}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Evil Number</Text>
              <Text style={styles.detailAnswer}>{NumeroTable.evil_num}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Favourite Colour</Text>
              <Text style={styles.detailAnswer}>{NumeroTable.fav_color}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Favourite Day</Text>
              <Text style={styles.detailAnswer}>{NumeroTable.fav_day}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Favourite God</Text>
              <Text style={styles.detailAnswer}>{NumeroTable.fav_god}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Favourite Mantra</Text>
              <Text style={styles.detailAnswer}>{NumeroTable.fav_mantra}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Favourite Metal</Text>
              <Text style={styles.detailAnswer}>{NumeroTable.fav_metal}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Favourite Stone</Text>
              <Text style={styles.detailAnswer}>{NumeroTable.fav_stone}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Favourite Substone</Text>
              <Text style={styles.detailAnswer}>
                {NumeroTable.fav_substone}
              </Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Friendly Number</Text>
              <Text style={styles.detailAnswer}>
                {NumeroTable.friendly_num}
              </Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Neutral Number</Text>
              <Text style={styles.detailAnswer}>{NumeroTable.neutral_num}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Radical Ruler</Text>
              <Text style={styles.detailAnswer}>
                {NumeroTable.radical_ruler}
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : null}

      {check == 3 ? (
        <ScrollView>
          <Text style={styles.heading}>Planets</Text>
          <View style={styles.TableContainer}>
            <View style={styles.TableTop}>
              <Text style={styles.TableHeading1}>Planet</Text>
              <Text style={styles.TableHeading}>Sign</Text>
              <Text style={styles.TableHeading}>Lord</Text>
              <Text style={styles.TableHeading}>Degree</Text>
              <Text style={styles.TableHeading}>House</Text>
            </View>
            <FlatList data={PlanetData} renderItem={PlanetTable} />
          </View>
        </ScrollView>
      ) : null}
      {check == 6 ? (
        <ScrollView>
          <View>
            <Text style={styles.heading}> Ascendant Report</Text>
            <View style={styles.DetailContainer}>
              <Text style={styles.ReportText}>{Acsedent}</Text>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

export default KundliDetails;

const styles = StyleSheet.create({
  HeadTabBar: {
    borderColor: Colours.GrayColor,
    borderWidth: 2,
    height: 50,
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  HeadTabBarButtonSelected: {
    backgroundColor: Colours.GrayColor,
  },
  Indicator: {
    borderRadius: 100,
    // height:90,
    // width:90,
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    padding: 20,
  },
  HeadTabBarButton: {
    alignSelf: 'center',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colours.GrayColor,
    borderLeftWidth: 2,
    height: '100%',
    paddingVertical: 5,
  },
  HeadTabBarText: {
    textAlign: 'center',
    color:Colours.TextDarkColour
  },

  heading: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 15,
    marginTop: 15,
  },
  DetailBox: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingVertical: 8,
    // backgroundColor:Colours.GrayColor,
    // marginHorizontal:-5
  },
  ReportText: {
    lineHeight: 20,
    color: 'black',
    fontSize: 12,
    textAlign: 'justify',
  },
  DetailBox2: {
    flexDirection: 'row',
    paddingVertical: 5,
    // backgroundColor:Colours.GrayColor,
    backgroundColor: '#d1d6e0',
    marginHorizontal: -5,
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  detailKey: {
    width: '50%',
    fontSize: 12,
    color: 'black',
    marginLeft: 5,
  },
  detailAnswer: {
    width: '50%',
    fontSize: 12,
    color: 'black',
  },
  DetailContainer: {
    margin: 8,
    borderColor: Colours.GrayColor,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
  },
  TableContainer: {
    margin: 8,
    borderColor: Colours.GrayColor,
    borderWidth: 2,
    // borderRadius: 10,
    padding: 5,
  },
  tableRow: {
    width: 73,
    borderColor: Colours.GrayColor,
    borderLeftWidth: 1,
    textAlign: 'center',
    // marginVertical:5,
    paddingVertical: 10,
    fontSize: 12,
    color:Colours.TextDarkColour
  },
  TableTop: {
    flexDirection: 'row',
    backgroundColor: Colours.PrimaryColor,
    margin: -5,
    padding: 5,
    // borderTopRightRadius:10,
    // borderTopLeftRadius:10,
  },
  TableHeading: {
    color: 'white',
    fontSize: 15,
    width: 73,
    borderColor: Colours.GrayColor,
    borderLeftWidth: 1,
    paddingLeft: 5,
    textAlign: 'center',
    // marginVertical:4,
    paddingVertical: 5,
    alignSelf: 'center',
  },
  TableHeading1: {
    color: 'white',
    width: 73,
    paddingLeft: 5,
    textAlign: 'center',
    alignSelf: 'center',
  },

  ChartHeadTabBar: {
    // borderColor: Colours.GrayColor,
    // borderWidth: 2,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%',
  },
  ChartHeadTabBarButtonSelected: {
    backgroundColor: Colours.GrayColor,
  },
  ChartHeadTabBarButton: {
    alignSelf: 'center',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingVertical: 2,
  },
  ChartHeadTabBarText: {
    textAlign: 'center',
  },
  heading: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 15,
    marginTop: 15,
  },
  DivisonalHeadTabBarButtonSelected: {
    backgroundColor: Colours.GrayColor,
  },
  DivisonalHeadTabBarButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colours.GrayColor,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
    margin: 5,
  },
});
