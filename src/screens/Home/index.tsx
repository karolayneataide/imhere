import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export default function Home() {
  // const participants = [
  //   "Rodrigo",
  //   "Vini",
  //   "Diego",
  //   "Myke",
  //   "Karol",
  //   "Kamyla",
  //   "Josi",
  //   "Washington",
  //   "Sidney",
  //   "Davi",
  //   "Jane",
  // ];

  const [participantName, setParticipantName] = useState("");
  const [participants, setParticipants] = useState<Array<string>>([]);

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      Alert.alert("Participante já foi inserido");
    } else {
      setParticipants([...participants, participantName]);
      setParticipantName("");
    }
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants(
            participants.filter((participant) => participant !== name)
          ),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>

      <Text style={styles.evenDate}>Sexta, 20 de Março de 2023</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          value={participantName}
          onChangeText={setParticipantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}> + </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove("Rodrigo")}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou ainda, adicione participantes no evento!
          </Text>
        )}
      />
    </View>
  );
}
