import { useStore } from "zustand";
// import { useMemo } from "react";
import { shallow } from "zustand/shallow";


export default function Temp({ state }) {
  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );
}