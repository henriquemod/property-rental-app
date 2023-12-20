import {
  Box,
  Factory,
  FlatList,
  HStack,
  Heading,
  IStackProps,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";

import { Property } from "src/domain/models";
import ArrowRightIcon from "src/main/assets/filled-icons/arrow-right2.svg";
import { PropertyCard } from "src/presentation/components";
import { PropertyCardSkeleton } from "src/presentation/components/property-card-skeleton";

const Icon = Factory(ArrowRightIcon);
const TouchableOpacity = Factory(RNTouchableOpacity);

interface PropertiesProps extends IStackProps {
  properties: Property[];
  loading?: boolean;
}

export const Properties: React.FC<PropertiesProps> = ({
  properties,
  loading = false,
  ...props
}: PropertiesProps): JSX.Element => {
  const { colors, sizes } = useTheme();
  const Card = loading ? PropertyCardSkeleton : PropertyCard;
  return (
    <VStack flex={1} {...props}>
      <HStack paddingX={6} alignItems="center">
        <Heading fontSize="md" fontWeight="bold" flex={1} marginBottom={2}>
          All Property
        </Heading>
        <TouchableOpacity
          opacity={0.7}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="green.400">See All</Text>
          <Icon width={20} height={20} fill={colors.green[400]} />
        </TouchableOpacity>
      </HStack>
      <FlatList
        data={properties}
        renderItem={({ item, index }) => (
          <Card
            {...item}
            marginRight={index === properties.length - 1 ? 0 : 3}
          />
        )}
        _contentContainerStyle={{
          paddingBottom: sizes[1.5],
          paddingX: sizes[1],
        }}
        ListEmptyComponent={() => (
          <Text marginLeft={6} textAlign="center" color="textColor.grayDark">
            No properties found
          </Text>
        )}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ flex: 1 }}
      />
    </VStack>
  );
};
