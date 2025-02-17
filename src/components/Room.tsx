import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { getUrlParams } from '../utlis/middleware';

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

  const myMeeting = async (element: HTMLDivElement | null) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: { role },
      },
      sharedLinks,
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
