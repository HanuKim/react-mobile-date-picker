import React, { useState, useEffect } from "react";
import Picker from "react-mobile-picker";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

// 윤년을 확인하는 함수
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// 각 달의 최대 일수 계산 함수
const getMaxDays = (year, month) => {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

const CustomDatePicker = () => {
  const [value, setValue] = useState({ year, month, day });
  const [dayOptions, setDayOptions] = useState(Array.from({ length: 31 }, (v, i) => i + 1));

  // year 또는 month가 변경되면 해당 달에 맞는 day 배열 업데이트
  useEffect(() => {
    const maxDays = getMaxDays(value.year, value.month);
    setDayOptions(Array.from({ length: maxDays }, (v, i) => i + 1));

    // 선택된 day가 현재 달의 최대 일수를 넘으면 day를 최대값으로 설정
    if (value.day > maxDays) {
      setValue((prevValue) => ({ ...prevValue, day: maxDays }));
    }
  }, [value.year, value.month]);

  const selections = {
    year: Array.from({ length: 24 }, (v, i) => i + Number(year) - 12),
    month: Array.from({ length: 12 }, (v, i) => i + 1),
    day: dayOptions,
  };

  return (
    <div style={{ width: "350px" }}>
      <Picker value={value} onChange={setValue} wheelMode="normal" className="custom-picker">
        {Object.keys(selections).map((date) => (
          <Picker.Column key={date} name={date}>
            {selections[date].map((option) => (
              <Picker.Item key={option} value={option}>
                {({ selected }) => (
                  <div
                    style={{
                      color: selected ? "white" : "black",
                      backgroundColor: selected ? "#d9d9d9" : "white",
                      padding: "5px 20px",
                      borderRadius: "5px",
                    }}
                  >
                    {option}
                  </div>
                )}
              </Picker.Item>
            ))}
          </Picker.Column>
        ))}
      </Picker>
    </div>
  );
};

export default CustomDatePicker;
