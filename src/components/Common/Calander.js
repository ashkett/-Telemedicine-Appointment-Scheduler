import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isToday } from 'date-fns';
import '../../assets/css/calendarme.css'; // You can add custom styles here for your calendar

const CalendarComponent = () => {
  // Set the initial date to the current month
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get the start and end date of the current month
  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);

  // Generate all the dates in the current month
  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  // Handle navigation to the previous or next month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  // Render the calendar
  return (
    <div className="sales-boxes me-calc">
      <div className="recent-sales my-cal">
        <div className="calendar">
          <div className="calendar-title">
            <div className="calendar-title-text">
              {format(currentMonth, 'MMMM yyyy')}
            </div>
            <div className="calendar-button-group">
              <button id="prevMonth" onClick={prevMonth}>
                &lt;
              </button>
              <button id="today" onClick={goToToday}>
                Today
              </button>
              <button id="nextMonth" onClick={nextMonth}>
                &gt;
              </button>
            </div>
          </div>

          {/* Days of the Week */}
          <div className="calendar-day-name">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Dates */}
          <div className="calendar-dates">
            {dates.map((date, index) => {
              return (
                <div
                  key={index}
                  className={`calendar-date ${isToday(date) ? 'today' : ''}`}
                >
                  {format(date, 'd')}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
