export const loadWIRISplugin = () => {
  const script = document.createElement("script");
  script.src = process.env.REACT_APP_WIRIS_PLUGIN_URL ?? "";
  script.async = true;

  document.body.appendChild(script);
};
