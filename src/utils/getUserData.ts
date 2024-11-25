import bridge from "@vkontakte/vk-bridge";

export const getUserData = (key: string) => {
  console.log("🚀 ~ getUserData ~ key:", key);
  return bridge.send('VKWebAppStorageGet', {
    keys: [
      key
    ]
  })
    .then((data) => {
      try {
        const savedData = data.keys.find((item) => { return item.key === key });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return JSON.parse(savedData?.value as any);
      } catch (error) {
        return undefined
      }
    })
    .catch((error) => {
      console.log(error);
    });
}