import React, { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { StyleSheet, Text, View } from "react-native";
import Dialog from "react-native-dialog";
import { Button } from "@react-native-material/core";
import { RootStackParamList } from "../common";
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export interface SubmissionProps
  extends NativeStackScreenProps<RootStackParamList, "Submission"> {}

const Submission: React.FC<SubmissionProps> = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);

  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    Camera.useMicrophonePermissions();

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionDialog}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  if (!microphonePermission) {
    return <View />;
  }

  if (!microphonePermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionDialog}>
          We need your permission to use the microphone
        </Text>
        <Button
          onPress={requestMicrophonePermission}
          title="grant permission"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isRecording ? (
        <View style={styles.default}>
          <Text style={styles.guide}>
            Please record your application by saying why you are the perfect
            match!
          </Text>
          <IconButton
            onPress={() => {
              setIsRecording(true);
              camera?.recordAsync();
            }}
            style={styles.record}
            icon={() => (
              <Icon name="record-circle-outline" color="red" size={50} />
            )}
          />
        </View>
      ) : (
        <Camera
          style={styles.camera}
          type={CameraType.front}
          ref={(ref) => setCamera(ref)}
        >
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={async () => {
                await camera?.stopRecording();
                setShowDialog(true);
              }}
              title="I'm done"
            />
          </View>
        </Camera>
      )}
      <Dialog.Container visible={showDialog}>
        <Dialog.Title style={styles.dialog}>Request confirmation</Dialog.Title>
        <Dialog.Description style={styles.dialog}>
          We have received your request. Stay tune for reply.
        </Dialog.Description>
        <Dialog.Button
          label="Acknowledge"
          onPress={() => navigation.goBack()}
        />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  permissionDialog: { textAlign: "center" },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    backgroundColor: "#8A81F5",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  record: {
    marginTop: 100,
  },
  dialog: {
    color: "#8A81F5",
  },
  guide: { color: "#8A81F5", fontSize: 30 },
});

export default Submission;
