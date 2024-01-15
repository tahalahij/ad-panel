import React from "react";
import {
  PasswordStrength,
  generateColors,
  getIcon,
  testPasswordStrength,
} from "./helpers";
import { Box, Typography, colors } from "@mui/material";

interface IPasswordStrengthInputProps {
  password?: string;
  width: `${string}ch`;
}

export function PasswordStrengthInput({
  password,
  width = "25ch",
}: IPasswordStrengthInputProps) {
  const passwordStrength = testPasswordStrength(password);
  const Icon = getIcon(passwordStrength);
  const strengthColors = generateColors(passwordStrength);

  return (
    <Box sx={{ width }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="4px"
        margin="8px 0"
      >
        {strengthColors.map((color, index) => (
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
        <Icon color={strengthColors[0]} />
        <Typography color={strengthColors[0]}>{passwordStrength}</Typography>
      </Box>
      {passwordStrength !== PasswordStrength.STRONG && (
        <>
          {/* <Typography
            variant=""
            fontSize="1rem"
            color="text.headingLight"
            margin="0 0 8px 0"
          >
            {"برای قوی‌تر کردن رمز عبور خود"}
          </Typography> */}
          <Typography
            variant="subtitle2"
            fontSize="12px"
            fontWeight={500}
            color={colors.blueGrey[600]}
            margin="0 0 24px 0px"
          >
            {
              "رمز عبور باید حداقل 8 کاراکتر باشد و با حروف بزرگ و کوچک لاتین، اعداد و علایم ویژه مانند (!@#$%^&*()) تقویت کنید."
            }
          </Typography>
        </>
      )}
    </Box>
  );
}
