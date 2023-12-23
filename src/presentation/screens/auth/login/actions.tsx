import { HStack, Text } from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "src/presentation/components";

interface ActionsPageProps extends ComponentProps<typeof HStack> {
  loading?: boolean;
  onForgotPassword: () => void;
  onLogin: () => void;
}

export const Actions: React.FC<ActionsPageProps> = ({
  onForgotPassword,
  onLogin,
  loading = false,
  ...props
}: ActionsPageProps) => (
  <HStack flex={1} alignItems="center" {...props}>
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ flex: 1 }}
      onPress={onForgotPassword}
    >
      <Text fontSize="$sm" color="$textDark800">
        Forgot password?
      </Text>
    </TouchableOpacity>
    <Button flex={1} title="Login" loading={loading} onPress={onLogin} />
  </HStack>
);
