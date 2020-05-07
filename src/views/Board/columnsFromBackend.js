export const columnsFromBackend = (data) => {
  return {
    1: {
      name: "To do",
      items: data ? data.filter(task => task.status === 1) : [],
    },
    2: {
      name: "In Progress",
      items: data ? data.filter(task => task.status === 2) : [],
    },
    3: {
      name: "Done",
      items: data ? data.filter(task => task.status === 3) : [],
    },
  };
};
