import bridge from '@vkontakte/vk-bridge';

export const saveUserData = (key: string, value: string) => {
    if (typeof key !== 'string' || key.length > 100) {
      return Promise.reject(new Error('Ключ должен быть строкой длиной не более 100 символов'));
    }
  
    const validKeyRegex = /^[a-zA-Z_\-0-9]+$/;
    if (!validKeyRegex.test(key)) {
      return Promise.reject(new Error('Ключ содержит недопустимые символы'));
    }
  
    if (typeof value !== 'string') {
      value = String(value);
    }
    
    if (value.length > 4096) {
      value = value.substring(0, 4096);
    }
  
    return bridge.send('VKWebAppStorageSet', { key: key, value: value })
      .then((data) => {
        if (data.result) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error('Ошибка при сохранении данных:', error);
        throw error;
      });
  }
  