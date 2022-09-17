import React, { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Dialog from "react-native-dialog";



const Submittion: React.FC<any> = ({ navigation }) => {
    const [type, setType] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [cam, setCam] = useState<Camera | null>(null)

    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [permission2, requestPermission2] = Camera.useMicrophonePermissions();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    if (!permission2) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission2.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission2} title="grant permission" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={CameraType.front} ref={(ref) => setCam(ref)}>
                
                    <View style={styles.buttonContainer} >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async () => {
                                if (type) {
                                    await cam?.stopRecording();
                                    setDialog(true);

                                } else {
                                    let w = cam?.recordAsync();
                                    w?.then((a) => console.log(a));
                                }
                                setType(!type);

                            }}
                        >
                            {!type && <Text style={{color: 'white', fontSize: 30}}>How to do it</Text>}
                            <Text style={styles.text}>{type ? "Stop" : "Start"}</Text>
                        </TouchableOpacity>
                    </View>
            </Camera>

            <Dialog.Container visible={dialog}>
      <Dialog.Title>Account delete</Dialog.Title>
      <Dialog.Description>
        Do you want to delete this account? You cannot undo this action.
      </Dialog.Description>
      <Dialog.Button label="Delete" onPress={() => navigation.goBack()} />
    </Dialog.Container>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});


export default Submittion;
