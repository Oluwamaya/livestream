import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { getUrlParams } from '../utlis/middleware';
import axios from 'axios';

function randomID(len = 5) {
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const Room = () => {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const roleStr = getUrlParams().get('role') || 'Host';
  const role =
    roleStr === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : roleStr === 'Cohost'
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  const sharedLinks = [
    {
      name: 'Join as audience',
      url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}&role=Audience`,
    },
  ];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.unshift({
      name: 'Join as co-host',
      url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}&role=Cohost`,
    });
  }

  // Retrieve `appID` and `serverSecret` from environment variables
  const appID = parseInt(import.meta.env.VITE_APP_ID);
  const serverSecret = import.meta.env.VITE_SERVER_SECRET;

  if (!appID || !serverSecret) {
    console.error("ZEGOCLOUD: appID and serverSecret are required!");
    return <div>Error: Missing credentials!</div>;
  }

  // Generate Kit Token
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    randomID(5), // userID
    randomID(5)  // userName
  );

  // Function to notify the backend when the live stream starts
  const notifyStreamStart = async () => {
    try {
      await axios.post('http://localhost:4000/start-stream', { roomID });
      console.log('✅ Stream started:', roomID);
    } catch (error) {
      console.error('❌ Failed to start stream:', error);
    }
  };

  // Function to notify the backend when the live stream ends
  const notifyStreamEnd = async () => {
    try {
      await axios.post("http://localhost:4000/end-stream", { roomID: "" });
      console.log("✅ Stream ended");
    } catch (error) {
      console.error("❌ Failed to stop stream:", error);
    }
  };

  const myMeeting = async (element: HTMLDivElement | null) => {
    if (!element) return;

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: { role },
      },
      sharedLinks,
      onJoinRoom: () => {
        if (role === ZegoUIKitPrebuilt.Host) {
          notifyStreamStart(); // Notify backend when the host starts the live stream
        }
      },
      onLeaveRoom: () => {
        if (role === ZegoUIKitPrebuilt.Host) {
          notifyStreamEnd(); // Notify backend when the host ends the live stream
        }
      }
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
    ></div>
  );
};

export default Room;
