import { Box, HStack, VStack } from "native-base";
import React from "react";
import { SvgProps } from "react-native-svg";

import { Input } from "./input";

interface InputGroupProps {
  inputs: {
    label: string;
    icon: React.FC<SvgProps>;
  }[];
}

export const InputGroup: React.FC<InputGroupProps> = ({
  inputs,
}: InputGroupProps) => {
  const total = inputs.length;
  return (
    <VStack
      width="full"
      bgColor="primary.bg.white"
      borderRadius={30}
      px={4}
      alignItems="center"
      justifyContent="center"
    >
      {inputs.map(({ label, icon: Icon }, index) => {
        return (
          <React.Fragment key={index}>
            <HStack alignItems="center" px={30} py={4}>
              <Icon width={40} height={40} />
              <Input key={index} placeholder={label} marginLeft={2} />
            </HStack>
            {index < total - 1 && (
              <Box width="full" height={0.2} bgColor="textColor.grayDark" />
            )}
          </React.Fragment>
        );
      })}
    </VStack>
  );
};