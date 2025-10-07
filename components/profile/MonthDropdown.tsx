import { styles } from "@/styles/component/monthdropdown.styles";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthDropdown() {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectMonth = (month: string) => {
    setSelectedMonth(month);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <View>
        <Text style={styles.label}>Month</Text>
      </View>

      <TouchableOpacity
        style={styles.dropdownBox}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.dropdownText}>{selectedMonth}</Text>
        <Image
          source={require("@/assets/utilsIcon/drop-down.png")}
          style={styles.downloadIcon}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={MONTHS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.monthItem}
                  onPress={() => handleSelectMonth(item)}
                >
                  <Text style={styles.monthText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
