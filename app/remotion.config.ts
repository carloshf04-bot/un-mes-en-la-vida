/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

// Usa el Chromium del sistema si existe (en la nube no se puede descargar el de Remotion)
import { existsSync } from "node:fs";
const SHELL = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
if (existsSync(SHELL)) Config.setBrowserExecutable(SHELL);
// Config.setChromiumOpenGlRenderer("swangle");
