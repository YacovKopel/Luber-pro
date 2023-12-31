import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "LUber-X-123",
    title: "LUberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "LUber-XL-123",
    title: "LUberXL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "LUber-LUX-123",
    title: "LUber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-grow bg-white px-3`}
    >
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}
        >
          <Icon name="chevron-left" type="font-awesome" />
        </TouchableOpacity>
        <Text style={tw` text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-6 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 90,
                height: 90,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-5`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>Travel Time: {travelTimeInformation?.duration.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <SafeAreaView>
        <TouchableOpacity
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
          disabled={!selected}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RideOptionsCard;