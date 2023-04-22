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
  const [participantName, setParticipantName] = useState("");
  const [participants, setParticipants] = useState<Array<string>>([]);

  const [title, setTitle] = useState("");

  const date = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  } as const;
  const locale = "pt-BR";

  function handleParticipantAdd() {
    if (!participantName) {
      Alert.alert("Digite o nome do participante");
    } else if (participants.includes(participantName)) {
      Alert.alert("Participante já foi inserido");
    } else {
      setParticipants([...participants, participantName]);
      setParticipantName("");
    }
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Quer mesmo remover ${name}?`, [
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
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Nome do evento"
        placeholderTextColor="#6B6B6B"
        style={styles.eventName}
      />

      <View>
        <View>
          <Text style={styles.evenDate}>
            {date.toLocaleDateString(locale, options)}
          </Text>
        </View>
      </View>

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
            onRemove={() => handleParticipantRemove(item)}
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
