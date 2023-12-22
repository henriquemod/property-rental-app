import type { IButtonProps } from "native-base";
import {
  Box,
  Button as NativeBaseButton,
  Spinner,
  Text,
  useTheme,
} from "native-base";
import React from "react";
import type { SvgProps } from "react-native-svg";

interface ButtonProps extends Omit<IButtonProps, "variant"> {
  title: string;
  loading?: boolean;
  variant?: "outline" | "solid";
  addorment?: React.FC<SvgProps>;
  endorment?: React.FC<SvgProps>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant,
  addorment: Addorment,
  endorment: Endorment,
  loading = false,
  ...props
}: ButtonProps) => {
  const { space } = useTheme();
  return (
    <NativeBaseButton
      disabled={loading}
      width="100%"
      h={12}
      bg={variant === "outline" ? "transparent" : "primary.blue.800"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="primary.blue.500"
      rounded="2xl"
      _pressed={{
        bg: variant === "outline" ? "gray.500" : "primary.blue.500",
      }}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          {Addorment && (
            <Addorment
              width={30}
              height={30}
              style={{ marginRight: space[2] }}
            />
          )}
          <Text
            color={variant === "outline" ? "primary.blue.500" : "white"}
            fontFamily="heading"
            fontSize="md"
          >
            {title}
          </Text>
          {Endorment && (
            <Endorment
              width={30}
              height={30}
              style={{ marginLeft: space[2] }}
            />
          )}
        </Box>
      )}
    </NativeBaseButton>
  );
};
