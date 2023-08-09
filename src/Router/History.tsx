type NavigationFunction = (page: any, ...rest: any) => void;

const History = {
  navigate: null as NavigationFunction | null,
  push: (page: any, ...rest: any) => {
    if (History.navigate) {
      History.navigate(page, ...rest);
    } else {
      console.error("History.navigate is not defined.");
      // You might want to handle this case in an appropriate way
    }
  },
};

export default History;

