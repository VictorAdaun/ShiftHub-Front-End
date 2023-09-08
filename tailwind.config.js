/** @type {import('tailwindcss').Config} */

const baseColors = {
  "lydia": "#7B68EE",
  "azure": "#49CCF9",
  "ombre": "linear-gradient(90deg, #8930FD 0%, #49CCF9 100%)"
}

const extendedPalettes = {
  "lydia-primary-0": "rgba(229, 225, 252, 0.4)",
  "lydia-primary-10": "#E5E1FC",
  "lydia-primary-20": "#D3CDF9",
  "lydia-primary-30": "#BDB3F6",
  "lydia-primary-40": "#A79AF4",
  "lydia-primary-50": "#9181F1",
  "lydia-secondary-60": "#6657C6",
  "lydia-primary-70": "#52459F",
  "lydia-primary-80": "#3D3477",
  "lydia-primary-90": "#29234F",
  "lydia-primary-100": "#191530",
  "azure-primary-0": "rgba(219, 245, 254, 0.3)",
  "azure-primary-10": "#DBF5FE",
  "azure-primary-20": "#C2EEFD",
  "azure-primary-30": "#A4E5FC",
  "azure-primary-40": "#86DDFB",
  "azure-primary-50": "#67D4FA",
  "azure-secondary-60": "#3DAACF",
  "azure-primary-70": "#3188A6",
  "azure-primary-80": "#24667C",
  "azure-primary-90": "#184453",
  "azure-primary-100": "#0F2932",
  "grayscale-white": "#FFFFFF",
  "grayscale-neutral-0": "#FCFCFD",
  "grayscale-neutral-10": "#F9FAFB",
  "grayscale-neutral-20": "#F2F4F7",
  "grayscale-neutral-30": "#EAECF0",
  "grayscale-neutral-40": "#D0D5DD",
  "grayscale-neutral-50": "#98A2B3",
  "grayscale-neutral-60": "#667085",
  "grayscale-neutral-70": "#475467",
  "grayscale-neutral-80": "#344054",
  "grayscale-neutral-90": "#1D2939",
  "grayscale-neutral-100": "#101323",

}

const utilityColors = {
  "success-0": "rgba(230, 255, 243, 0.7)",
  "success-10": "#82E6B6",
  "success-20": "#3DCC87",
  "success-30": "#18B368",
  "success-40": "#069952",
  "success-50": "#008042",
  "warning-0": "#FFF5E6",
  "warning-10": "#EDA12F",
  "warning-20": "#DB8400",
  "warning-30": "#C97900",
  "warning-40": "#B86E00",
  "warning-50": "#A66300",
  "danger-0": "#FFE6E6",
  "danger-1": "#E62E2E",
  "danger-2": "#CC0000",
  "danger-3": "#B30000",
  "danger-4": "#990000",
  "danger-5": "#800000",
  "info-0": "#E6F6FF",
  "info-10": "#2EA2E6",
  "info-20": "#0081CC",
  "info-30": "#0071B3",
  "info-40": "#006199",
  "info-50": "#005180"
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "h-1": ["61px", "73.2px"],
        "h-2": ["49px", "61.25px"],
        "h-3": ["39px", "46.8px"],
        "h-4": ["31px", "37.2px"],
        "h-5": ["24px", "28.8px"],
        "body-xl": ["20px", "24px"],
        "body-large": ["16px", "24px"],
        "body-sm": ["14px", "22.4px"],
        "body-mm": ["12px", "19.2px"],
        "button-large": ["16px", "25.6px"],
        "button-sm": ["14px", "24px"],
        "link-large": ["16px", "24px"],
        "link-sm": ["14px", "20px"],
      },
      lineHeight: {
        standard: "-0.25px"
      },
      colors: {
        ...baseColors,
        ...extendedPalettes,
        ...utilityColors
      },
      backgroundColors: {
        ...baseColors,
        ...extendedPalettes,
        ...utilityColors
      }
    },
  },
  plugins: [],
}

