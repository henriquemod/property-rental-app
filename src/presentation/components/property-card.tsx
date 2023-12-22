import { Image as ExpoImage } from "expo-image";
import {
  Box,
  Factory,
  HStack,
  Icon,
  Pressable,
  Text,
  useTheme,
  VStack,
} from "native-base";
import type { InterfacePressableProps } from "native-base/lib/typescript/components/primitives/Pressable/types";
import { useMemo } from "react";
import type { SvgProps } from "react-native-svg";
import type { Property } from "src/domain/models";
import LocationIconSvg from "src/main/assets/filled-icons/location.svg";
import BathroomIconSvg from "src/main/assets/property-icons/bathroom.svg";
import BedIconSvg from "src/main/assets/property-icons/bed.svg";
import KitchenIconSvg from "src/main/assets/property-icons/kitchen.svg";
import SpaceIconSvg from "src/main/assets/property-icons/space.svg";

const Image = Factory(ExpoImage);

export interface PropertyCardProps
  extends Property,
    Omit<InterfacePressableProps, "id" | "size"> {
  fullWidth?: boolean;
  view?: "portrait" | "landscape";
}

const PropItem = ({
  icon,
  value,
  marginRight,
}: {
  icon: React.FC<SvgProps>;
  value: string | number;
  marginRight?: boolean;
}) => (
  <HStack alignItems="center" justifyContent="center">
    <Icon as={icon} size={4} />
    <Text
      marginLeft={1}
      marginRight={marginRight ? 4 : 0}
      color="textColor.grayDark"
    >
      {value}
    </Text>
  </HStack>
);

export const PropertyCard: React.FC<PropertyCardProps> = ({
  view = "portrait",
  category,
  value,
  address,
  size,
  picture,
  beds,
  bathrooms,
  kitchens,
  fullWidth = false,
  ...props
}: PropertyCardProps): JSX.Element => {
  const { colors } = useTheme();
  const isPortrait = view === "portrait";
  const titleFontSize = useMemo(() => {
    if (fullWidth) return "2xl";
    if (isPortrait) return "md";
    return "lg";
  }, [isPortrait]);
  const Wrapper = isPortrait ? VStack : HStack;
  return (
    <Pressable {...props}>
      <Wrapper
        rounded="3xl"
        bgColor="primary.bg.white"
        shadow={10}
        maxW={isPortrait && !fullWidth ? 200 : undefined}
        padding={4}
        alignItems="center"
      >
        <Image
          width={isPortrait ? "100%" : 20}
          height={isPortrait ? 44 : 20}
          rounded="3xl"
          contentFit="fill"
          marginRight={isPortrait ? 0 : 3}
          source={{
            uri: `${picture}?dummy=${address.replace(/\s/g, "")}`,
          }}
        />
        <VStack
          alignItems="center"
          marginTop={isPortrait ? 4 : 0}
          flex={isPortrait ? undefined : 1}
        >
          <HStack
            width="100%"
            marginBottom={isPortrait ? 0 : 2}
            alignItems="center"
          >
            <Text
              fontWeight="bold"
              fontSize={titleFontSize}
              flex={isPortrait ? 1 : undefined}
              marginRight={isPortrait ? 0 : 6}
              textTransform="capitalize"
            >
              {category}
            </Text>
            <Text
              color="primary.blue.800"
              fontWeight="bold"
              fontSize={fullWidth ? "2xl" : "md"}
            >
              ${value}
            </Text>
          </HStack>
          {(!isPortrait || fullWidth) && (
            <HStack width="100%" padding={fullWidth ? 3 : 0}>
              <Icon
                as={LocationIconSvg}
                fill={colors.textColor.grayLight}
                marginLeft={-1}
              />
              <Text
                width="100%"
                color="textColor.grayLight"
                fontWeight="bold"
                maxWidth={isPortrait ? undefined : 200}
                numberOfLines={1}
              >
                {address}
              </Text>
            </HStack>
          )}
          <HStack
            width="100%"
            justifyContent={isPortrait ? "space-around" : "flex-start"}
            marginTop={2}
          >
            {size && (
              <PropItem
                icon={SpaceIconSvg}
                value={`${size}m²`}
                marginRight={!isPortrait || fullWidth}
              />
            )}
            {beds && (
              <PropItem
                icon={BedIconSvg}
                value={beds}
                marginRight={!isPortrait || fullWidth}
              />
            )}
            {bathrooms && (
              <PropItem
                icon={BathroomIconSvg}
                value={bathrooms}
                marginRight={!isPortrait || fullWidth}
              />
            )}
            {kitchens && (
              <PropItem
                icon={KitchenIconSvg}
                value={kitchens}
                marginRight={!isPortrait || fullWidth}
              />
            )}
            {fullWidth && <Box flex={1} />}
          </HStack>
        </VStack>
      </Wrapper>
    </Pressable>
  );
};
