import { registerPlugin } from "@capacitor/core";

export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}

function useEcho() {
  const Echo = registerPlugin<EchoPlugin>("Echo");

  return Echo;
}

export default useEcho;
