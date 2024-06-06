import type { Component } from "solid-js";
import DatePicker from "./DatePicker";
import DatePickerProvider from "./DatePickerProvider";
import TimeRange from "./TimeRange";

const NewEvent: Component = () => {
  return (
    <DatePickerProvider>
      <div>
        <h2 class="text-center text-2xl font-bold">New Event</h2>
        <div class="flex flex-col gap-2 md:flex-row justify-center items-center">
          <DatePicker />
          <TimeRange />
        </div>
      </div>
    </DatePickerProvider>
  );
};

export default NewEvent;
