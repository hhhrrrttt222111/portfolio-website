/* eslint-disable no-console */
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";

const useDevToolsWarning = () => {
  const theme = useTheme();

  useEffect(() => {
    const { primary, secondary, text } = theme.palette;
    const fontFamily = theme.typography.fontFamily;

    console.clear();

    const titleStyle = [
      `color: ${primary.main}`,
      "font-size: 32px",
      "font-weight: 900",
      `text-shadow: 2px 2px 0 ${secondary.main}`,
      `font-family: ${fontFamily}`,
      "padding: 10px 0",
    ].join(";");

    const subtitleStyle = [
      `color: ${secondary.main}`,
      "font-size: 16px",
      "font-weight: 600",
      `font-family: ${fontFamily}`,
      "padding: 4px 0",
    ].join(";");

    const bodyStyle = [
      `color: ${text.primary}`,
      "font-size: 13px",
      `font-family: ${fontFamily}`,
      "line-height: 1.8",
    ].join(";");

    const accentStyle = [
      `color: ${primary.light}`,
      "font-size: 13px",
      "font-weight: 700",
      `font-family: ${fontFamily}`,
    ].join(";");

    const warningStyle = [
      `color: ${secondary.main}`,
      "font-size: 14px",
      "font-weight: 700",
      "font-style: italic",
      `font-family: ${fontFamily}`,
      "padding: 8px 0",
    ].join(";");

    const emojiStyle = ["font-size: 20px", "padding: 4px 0"].join(";");

    console.log("%c🌿 HALT, CURIOUS WANDERER! 🌿", titleStyle);

    console.log("%c⚠️  You have entered the Forbidden Forest of Source Code  ⚠️", subtitleStyle);

    console.log(
      "%c\n" +
        "%cThis territory is guarded by ancient JavaScript spirits.\n" +
        "%cThey do NOT appreciate uninvited guests poking around.\n\n" +
        "%cSeriously though — there's nothing to see here.\n" +
        "%cNo secrets. No hidden treasure. No cheat codes.\n" +
        "%cJust a developer who forgot to delete console.logs.\n\n" +
        "%c(Okay fine, the real magic is in the commits. But shhh. 🤫)",
      emojiStyle,
      bodyStyle,
      bodyStyle,
      accentStyle,
      bodyStyle,
      bodyStyle,
      warningStyle,
    );

    console.log(
      "%c\n🚪 Please close this panel and return to the safe side.\n" +
        "   The pixels are getting nervous.\n",
      warningStyle,
    );

    console.log(
      "%c— Management (a.k.a. the only developer here)",
      `color: ${text.secondary}; font-size: 11px; font-style: italic; font-family: ${fontFamily};`,
    );
  }, [theme]);
};

export default useDevToolsWarning;
