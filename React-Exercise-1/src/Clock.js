import { useState, useEffect } from 'react'

function Clock() {

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [day, setDay] = useState(0);
  const [isPm, setIsPm] = useState(false);
  const [dateString, setDateString] = useState(null);

  useEffect(() => {

    const dateUpdate = () => {
      const date = new Date();

      const dt = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      setDateString(dt)

      let hour = date.getHours()
      hour = (hour % 12) || 12;
      setHour(String(hour).padStart(2, '0'));
      setMinute(String(date.getMinutes()).padStart(2, '0'));
      setSecond(String(date.getSeconds()).padStart(2, '0'));
      setDay(date.toLocaleDateString('en-GB', { weekday: 'long' }));
      setIsPm(date.getHours() >= 12);
    }

    dateUpdate();

    const interval = setInterval(() => {
      dateUpdate();
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <div className="clock-wrapper">
        <div className="align-items-center clock-bg d-flex flex-column justify-content-center">
          <div className="fs13 mb-2">{day}</div>
          <div className="d-flex">
            <div className="time">{hour}:{minute}</div>
            <div className="fs13 d-flex flex-column justify-content-between">
              <div>{isPm ? "PM" : "AM"}</div>
              <div>{second}</div>
            </div>
          </div>
          <div className="fs13 mt-2">{dateString}</div>
        </div>
      </div>
    </>
  )
}

export default Clock