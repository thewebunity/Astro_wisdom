// import React, { useContext } from "react";
// import { SocketContext } from "../Socket";
// import LiveAudioStream from 'react-native-live-audio-stream';
// import { Buffer } from 'buffer';
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import mp from '../mp.mp3'
// var RNFS = require('react-native-fs');
// var Sound = require('react-native-sound');
// // Sound.setCategory('Playback');

// const options = {
//     sampleRate: 32000,  // default is 44100 but 32000 is adequate for accurate voice recognition
//     channels: 1,        // 1 or 2, default 1
//     bitsPerSample: 16,  // 8 or 16, default 16
//     audioSource: 6,     // android only (see below)
//     bufferSize: 4096    // default is 2048
// };
// const Calling = (navigaiton) => {
//     const socket = useContext(SocketContext);
//     const [me, setMe] = React.useState();
//     var whoosh = new Sound(mp, Sound.MAIN_BUNDLE, (error) => {
//         if (error) {
//             console.log('failed to load the sound', error);
//             return;
//         }
//         // loaded successfully
//         console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

//         // Play the sound with an onEnd callback
       
//     });
//     React.useEffect(() => {
//         try {
           
//             whoosh.play();
//         } catch (error) {

//         }

//         //     whoosh.setVolume(1);
//         // socket.on("me", (data) => {
//         //     console.log(data);
//         //     setMe(data);
//         // })
//         // LiveAudioStream.init(options);
//         // LiveAudioStream.on('data', data => {
//         //     // var chunk = Buffer.from(data, 'base64');
//         //     let encodedAuth = new Buffer(data).toString("base64");
//         //     socket.emit("callUser", { userToCall: me, signalData: encodedAuth, from: me });
//         //     // console.log(encodedAuth);
//         //     const path = RNFS.DocumentDirectoryPath + "/audio.aac";
//         //     // console.log(path);
//         //     RNFS.writeFile(path, encodedAuth, 'base64').then(() => playSound())
//         //     const playSound = () => {
//         //         const sound = new Sound(path, '', () => callback(sound))
//         //         sound.play();
//         //     }
//         //     const callback = (sound) => sound.play()
//         // });
//         // LiveAudioStream.start();
//     });
//     return <View style={styles.main}>
//         <TouchableOpacity onPress={() => {
//             whoosh.play();
//         }}><Text>Play</Text></TouchableOpacity>
//     </View>
// }
// const styles = StyleSheet.create({
//     main: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'red'
//     }
// })
// export default Calling;
