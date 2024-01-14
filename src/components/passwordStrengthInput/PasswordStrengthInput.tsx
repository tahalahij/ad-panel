import React from "react";
import {
  PasswordStrength,
  generateColors,
  getIcon,
  testPasswordStrength,
} from "./helpers";
import { Box, Typography } from "@mui/material";

interface IPasswordStrengthInputProps {
  password?: string;
}

export function PasswordStrengthInput({
  password,
}: IPasswordStrengthInputProps) {
  const passwordStrength = testPasswordStrength(password);
  const Icon = getIcon(passwordStrength);
  const colors = generateColors(passwordStrength);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="4px"
        margin="8px 0"
      >
        {colors.map((color, index) => (
          <Box
            key={index.toString()}
            flex={1}
            height="4px"
            borderRadius="4px"
            bgcolor={color}
          ></Box>
        ))}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap="5px"
        margin="0 0 16px 0"
      >
        <Icon color={colors[0]} />
        <Typography color={colors[0]}>{passwordStrength}</Typography>
      </Box>
      {passwordStrength !== PasswordStrength.STRONG && (
        <>
          <Typography
            variant="subtitle2"
            fontSize="1rem"
            color="text.headingLight"
            margin="0 0 8px 0"
          >
            {"برای قوی‌تر کردن رمز عبور خود"}
          </Typography>
          <Typography
            variant="subtitle2"
            fontSize="14px"
            fontWeight={500}
            color="text.bodyLight"
            margin="0 0 24px 0px"
          >
            {
              "رمز عبور را با حروف بزرگ و کوچک لاتین، اعداد و علایم ویژه مانند (!@#$%^&*()) تقویت کنید."
            }
          </Typography>
        </>
      )}
    </>
  );
}
