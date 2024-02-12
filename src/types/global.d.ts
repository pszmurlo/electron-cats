interface Window {
  electronAPI: {
    fetchCatFact: (callback: (data: string) => void) => void;
    catFact: (value: string) => void;
    notificationFrequency: (value: string) => void;
  };
}
