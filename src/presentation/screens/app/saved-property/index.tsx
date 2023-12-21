import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchIcon from "src/main/assets/colorfull-icons/search.svg";

import { HttpGetClient } from "src/data/contracts/infra";
import { Property } from "src/domain/models";
import { StackNavigatorRouteProps } from "src/main/routes/stack-navigator";
import { Input, PropertyCard } from "src/presentation/components";
import { useApp } from "src/presentation/hooks/use-app";

interface SavedPropertyProps {
  httpClient: HttpGetClient;
}

const BASE_URL = "http://192.168.12.95:3000";

export const SavedProperty: React.FC<SavedPropertyProps> = ({
  httpClient,
}: SavedPropertyProps): JSX.Element => {
  const { sizes } = useTheme();
  const { navigate } = useNavigation<StackNavigatorRouteProps>();
  const { bookmarks } = useApp();
  const [bookmarkList, setBookmarkList] = useState<Property[]>();
  useFocusEffect(
    useCallback(() => {
      console.log("oi");
      const fetchBookmarks = async () => {
        let mergedPath = "";
        bookmarks.forEach((bookmark) => {
          mergedPath += `id=${bookmark}&`;
        });
        const { body } = await httpClient.get<Property[]>({
          url: `${BASE_URL}/properties?${mergedPath}`,
        });
        setBookmarkList(body);
      };
      if (bookmarks.length) {
        fetchBookmarks();
      } else {
        setBookmarkList([]);
      }
    }, [bookmarks.length]),
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <VStack flex={1} padding={6} space={4}>
          <Heading marginBottom={6}>Saved Property</Heading>
          <Box flex={1} marginBottom={6}>
            <Input
              placeholder="Search"
              color="blue.700"
              icon={SearchIcon}
              iconSize={sizes[6]}
              divisionColor="primary.blue.500"
            />
          </Box>
          {bookmarkList?.length ? (
            bookmarkList.map((property) => (
              <PropertyCard
                key={property.id}
                fullWidth
                marginBottom={6}
                onPress={() =>
                  navigate("property-details", {
                    type: "property",
                    id: property.id,
                  })
                }
                {...property}
              />
            ))
          ) : (
            <Center>
              <Text
                fontWeight="normal"
                color="textColor.grayDark"
                fontSize="lg"
              >
                No bookmarked properties
              </Text>
            </Center>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};