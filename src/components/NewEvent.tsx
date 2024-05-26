import type { Component } from "solid-js";
import DatePicker from "./DatePicker";
import DatePickerProvider from "./DatePickerProvider";
import { useDatePickerContext } from "~/contexts/datePicker";

const NewEvent: Component = () => {
  return (
    <DatePickerProvider>
      <div>
        <h2 class="text-center text-2xl font-bold">New Event</h2>
        <div class="flex flex-col md:flex-row justify-center items-center">
          <DatePicker />
        </div>
      </div>
    </DatePickerProvider>
  );
};

export default NewEvent;
