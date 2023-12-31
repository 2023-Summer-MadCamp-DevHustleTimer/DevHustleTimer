import React, { useState, useEffect } from "react";
import "./Setting.css";
import axios from 'axios';

const Setting = () => {
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("홍길동");
  const [eventNum, setEventNum] = useState("0000");

  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 새 줄을 만드는 동작을 막습니다.
      handleSend();       // 메시지를 전송합니다.
    }
  }
  async function handleSend() {
    // 메시지를 전송하는 로직이 이곳에 들어갑니다.
    console.log(message);
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/me`, {
        headers: {
          'authorization': localStorage.getItem('token'),
        }
      });

      await axios.patch(`${process.env.REACT_APP_API_URL}/api/event`, {
        order: message,
      }, {
        headers: {
          'authorization': localStorage.getItem('token'),
        }
      });
    } catch (error) {
      console.error(error);
      //  console.log(error.response.data);
    }
    setMessage("");
  }
  useEffect(() => {
    apiCall();


  }, []);
  async function apiCall() {
    var response = await axios.get(`${process.env.REACT_APP_API_URL}/api/me`, {
      headers: {
        'authorization': localStorage.getItem('token'),
      }
    });
    setNickname(response.data.nickname);
    const paddedEventNum = String(response.data.event.eventNum).padStart(4, '0');
    setEventNum(paddedEventNum);
  }

  return (
    <div className="setting-container">
      <div className="room-number-info">
        방 번호: {eventNum}
      </div>
      <div className="nickname-info">
        닉네임: {nickname}
      </div>
      <div className="logout-buttons-wrapper">
        <div className="buttons-wrapper logout">
          <button className="onclick_magnify"
            onClick={async () => {
              try {

                let response = await axios.post(`${process.env.REACT_APP_API_URL}/api/event/withdraw`, {
                }, {
                  headers: {
                    'authorization': localStorage.getItem('token'),
                  }
                });
                window.location.reload();
                // console.log(response.data)
              } catch (error) {
                console.log("error")
                //  console.log(error.response.data);
              }
            }}
          >
            방에서 나가기
          </button>
        </div>
      </div>
      <div className="notification-input-text onclick_magnify">
        <textarea
          type="text"
          placeholder="새로운 공지사항을 입력하고 엔터를 누르세요"
          rows={4}
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        // onChange={(e) => setMessage(e.target.value)}
        // onKeyPress={(e) => e.key === 'Enter' ? handleSend() : null}
        />
        <input type="submit" style={{ display: "none" }} />
      </div>
    </div>
  );
}

export default Setting;
