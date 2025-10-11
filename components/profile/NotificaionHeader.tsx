import { styles } from "@/styles/profile/notifications.styles";
import { NotificationHeaderProps } from "@/types/notification";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function NotificationHeader({
  selectedFilter,
  onSearch,
  onFilterSelect,
}: NotificationHeaderProps) {
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tempFilter, setTempFilter] = useState(selectedFilter);

  const filters = ["All", "Not Read", "Newest", "Oldest"];

  const handleApply = () => {
    onFilterSelect(tempFilter);
    setShowModal(false);
  };

  return (
    <>
      <View style={styles.outerContainer}>
        <View style={styles.searchContainer}>
          <Image
            source={require("@/assets/utilsIcon/search-icon.png")}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              onSearch(text);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setTempFilter(selectedFilter);
            setShowModal(true);
          }}
        >
          <Text style={styles.filterText}>{selectedFilter}</Text>
          <Image
            source={require("@/assets/utilsIcon/arrow-down-white.png")}
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Category</Text>
            {filters.map((f) => (
              <Pressable
                key={f}
                style={styles.modalItem}
                onPress={() => setTempFilter(f)}
              >
                <Text style={styles.modalItemText}>{f}</Text>
                <Image
                  source={
                    tempFilter === f
                      ? require("@/assets/utilsIcon/radio-on.png")
                      : require("@/assets/utilsIcon/radio-off.png")
                  }
                  style={{ width: 20, height: 20 }}
                />
              </Pressable>
            ))}
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
