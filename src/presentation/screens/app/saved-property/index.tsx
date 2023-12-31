import { Box, Center, Text, useToken } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import type { HttpGetClient } from "src/data/contracts/infra";
import type { Property } from "src/domain/models";
import SearchIcon from "src/main/assets/colorfull-icons/search.svg";
import { env } from "src/main/config/env";
import type { StackNavigatorRouteProps } from "src/main/routes/stack-home-navigator";
import { Input, PropertyCard } from "src/presentation/components";
import { useApp } from "src/presentation/hooks/use-app";
import { StaticVerticalScrollableLayout } from "src/presentation/layout";

interface SavedPropertyProps {
  httpClient: HttpGetClient;
}

export const SavedProperty: React.FC<SavedPropertyProps> = ({
  httpClient,
}: SavedPropertyProps): JSX.Element => {
  const iconSize = useToken("space", "6");
  const { navigate } = useNavigation<StackNavigatorRouteProps>();
  const { user } = useApp();
  const [bookmarkList, setBookmarkList] = useState<Property[]>();
  const fetchBookmarks = async () => {
    try {
      let mergedPath = "";
      user?.bookmarks.forEach((bookmark) => {
        mergedPath += `id=${bookmark}&`;
      });
      const { body } = await httpClient.get<Property[]>({
        url: `${env.ENDPOINT}/properties?${mergedPath}`,
      });
      setBookmarkList(body);
    } catch (error) {
      console.log({ error });
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user?.bookmarks.length) {
        fetchBookmarks();
      } else {
        setBookmarkList([]);
      }
    }, [user?.bookmarks.length]),
  );
  return (
    <StaticVerticalScrollableLayout title="Saved Property">
      <Box flex={1}>
        <Input
          placeholder="Search"
          color="$blue700"
          icon={SearchIcon}
          iconSize={iconSize}
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
          <Text fontWeight="normal" color="$textDark800" fontSize="$lg">
            No bookmarked properties
          </Text>
        </Center>
      )}
    </StaticVerticalScrollableLayout>
  );
};
