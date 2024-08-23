import React from "react";
import { ToolbarProps } from "react-big-calendar";

const CustomToolbar = (toolbar: ToolbarProps) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToToday = () => {
    toolbar.onNavigate("TODAY");
  };

  const goToMonthView = () => {
    toolbar.onView("month");
  };

  const goToWeekView = () => {
    toolbar.onView("week");
  };

  const goToDayView = () => {
    toolbar.onView("day");
  };

  const goToAgendaView = () => {
    toolbar.onView("agenda");
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <button onClick={goToBack} className="btn">
          Back
        </button>
        <button onClick={goToToday} className="btn">
          Today
        </button>
        <button onClick={goToNext} className="btn">
          Next
        </button>
      </div>
      <div>
        <span className="text-lg font-bold">{toolbar.label}</span>
      </div>
      <div>
        <button onClick={goToMonthView} className="btn">
          Month
        </button>
        <button onClick={goToWeekView} className="btn">
          Week
        </button>
        <button onClick={goToDayView} className="btn">
          Day
        </button>
        <button onClick={goToAgendaView} className="btn">
          Agenda
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
