import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Colours from '../Assets/Colours'

const KunsliChart = ({ navigation, Datas }) => {
    console.log('datas', Datas)
    return (
        <View style={{ height: 320, width: '90%', marginHorizontal: '5%' }}>

            <Image
                source={require('../Images/Kundli.png')}
                style={{ position: 'absolute', height: '100%', width: '100%', alignSelf: 'center' }}
            />
            <View style={{ position: 'absolute', marginTop: '20%', marginLeft: '30%' }}>
                <View style={{ flexDirection: 'row' }}>

                    {Datas[0].planet_small.map(item => (
                        <Text style={{ color: 'black' }}>{item},</Text>
                    ))}
                </View>
                <Text style={{ alignSelf: 'center', top: 10,color:Colours.TextDarkColour }}>{Datas[0].sign}</Text>
            </View>


            <View style={{ position: 'absolute', marginTop: '2%', marginLeft: '5%', width: '35%' }}>
                <View style={{ alignSelf: 'center', flexDirection: 'row', }}>

                    {Datas[1].planet_small.map(item => (
                        <Text style={{ color: 'black' }}>{item},</Text>
                    ))}
                </View>
                <Text style={{ alignSelf: 'center', top: 10, }}>{Datas[1].sign}</Text>
            </View>


            <View style={{ height: 100, position: 'absolute', marginTop: '8%', marginLeft: '2%', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', marginTop: '2%' }}>

                    {Datas[2].planet_small.map(item => (
                        <Text style={{ color: 'black' }}>{item},</Text>
                    ))}
                </View>
                <Text style={{color:Colours.TextDarkColour, position: 'absolute', alignSelf: 'center', left: 40 }}>{Datas[2].sign}</Text>
            </View>

            <View style={{ position: 'absolute', marginTop: '40%', marginLeft: '5%' }}>
                <View style={{ flexDirection: 'row' }}>

                    {Datas[3].planet_small.map(item => (
                        <Text style={{ color: 'black' }}>{item},</Text>
                    ))}
                </View>
                <Text style={{color:Colours.TextDarkColour, alignSelf: 'center', top: 10 }}>{Datas[3].sign}</Text>
            </View>

            <View style={{ height: 100, position: 'absolute', marginTop: '35%', marginLeft: '2%', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', marginTop: '2%' }}>

                    {Datas[4].planet_small.map(item => (
                        <Text style={{ color: 'black' }}>{item},</Text>
                    ))}
                </View>
                <Text style={{  position: 'absolute', alignSelf: 'center', left: 40 }}>{Datas[4].sign}</Text>
            </View>

            <View style={{ position: 'absolute', marginTop: '77%', marginLeft: '10%' }}>
                <Text style={{color:Colours.TextDarkColour, alignSelf: 'center', top: 10 }}>{Datas[5].sign}</Text>
                <View style={{ flexDirection: 'row' }}>

                    {Datas[5].planet_small.map(item => (
                        <Text style={{ color: 'black' }}>{item},</Text>
                    ))}
                </View>
            </View>

            <View style={{ position: 'absolute', marginTop: '55%', marginLeft: '30%' }}>
                <Text style={{ alignSelf: 'center', color:Colours.TextDarkColour}}>{Datas[6].sign}</Text>
                <View style={{ flexDirection: 'row' }}>

                    {Datas[6].planet_small.map(item => (
                        <Text style={{ color: 'black' }}>{item},</Text>
                    ))}
                </View>
            </View>

            <View style={{ position: 'absolute', marginTop: '77%', marginLeft: '58%' }}>
                <Text style={{ alignSelf: 'center',color:Colours.TextDarkColour }}>{Datas[7].sign}</Text>
                <View style={{ flexDirection: 'row' }}>

                    {Datas[7].planet_small.map(item => (
                        <Text style={{ color: 'black' }}>{item},</Text>
                    ))}
                </View>
            </View>
            <View style={{ height: 100, position: 'absolute', marginTop: '55%', marginLeft: ' 88%', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center' ,color:Colours.TextDarkColour}}>{Datas[8].sign}</Text>
                <View style={{ flexDirection: 'column', marginTop: '2%' }}>

                    {Datas[8].planet_small.map(item => (
                        <Text style={{ color: 'black' }}>{item},</Text>
                    ))}
                </View>
            </View>
            <View style={{ position: 'absolute', marginTop: '40%', marginLeft: '55%' }}>
                <View style={{ flexDirection: 'row' }}>

                    {Datas[9].planet_small.map(item => (
                        <Text style={{ color: 'black' }}>{item},</Text>
                    ))}
                </View>
                <Text style={{ alignSelf: 'center', top: 10,color:Colours.TextDarkColour }}>{Datas[9].sign}</Text>
            </View>

            <View style={{ height: 100, position: 'absolute', marginTop: '8%', marginLeft: '82%', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ position: 'absolute', alignSelf: 'center',color:Colours.TextDarkColour, }}>{Datas[10].sign}</Text>
                <View style={{ flexDirection: 'column', marginTop: '2%', left:20 }}>

                    {Datas[10].planet_small.map(item => (
                        <Text style={{ color: 'black' }}>{item},</Text>
                    ))}
                </View>
            </View>

            <View style={{ position: 'absolute', marginTop: '2%', marginLeft: '55%', width: '35%' }}>
                <View style={{ alignSelf: 'center', flexDirection: 'row', }}>

                    {Datas[6].planet_small.map(item => (
                        <Text style={{ color: 'black' }}>{item},</Text>
                    ))}
                </View>
                <Text style={{ alignSelf: 'center', top: 10,color:Colours.TextDarkColour }}>{Datas[6].sign}</Text>
            </View>
        </View>
    )
}

export default KunsliChart

const styles = StyleSheet.create({})