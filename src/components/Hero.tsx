import { useMemo, useEffect, useState } from "react";
import ScrollAnimationWrapper from "../utlis/ScrollAnimationWrapper";
import getScrollAnimation from "../utlis/getScrollAnimation";
import { motion } from "framer-motion";
import bannerImg from "../assets/stream.jpg";
import axios from "axios";

const Hero = ({
  listUser = [
    {
      name: "Worshippers Reached",
      number: "500+ Million",
      icon: "/images/icons/heroicons_sm-user.svg",
    },
    {
      name: "Countries and Regions",
      number: "212+",
      icon: "/images/icons/gridicons_location.svg",
    },
    {
      name: "Live Service Uptime",
      number: "99.99%",
      icon: "/images/icons/bx_bxs-server.svg",
    },
  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [isLive, setIsLive] = useState(false);
  const [roomID, setRoomID] = useState("");

  // Function to fetch live stream status
  const fetchLiveStreamStatus = () => {
    axios
      .get("https://zego-backend.vercel.app/live-stream")
      .then((res) => {
        if (res.data.isLive) {
          setIsLive(true);
          setRoomID(res.data.liveStreamURL);
        } else {
          setIsLive(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching live status:", error);
      });
  };

  useEffect(() => {
    fetchLiveStreamStatus(); // Initial fetch
    const interval = setInterval(fetchLiveStreamStatus, 5000); // Update every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto font-sans" id="about">
      <main className="relative bg-cover bg-center best">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center text-white px-4">
          <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl mb-4">
            Ask and it shall be given unto you.
          </h2>
          <h5 className="text-xl font-semibold sm:text-2xl mb-6">
            GOD GIVES US POWER
          </h5>
          <p className="text-lg sm:text-xl max-w-3xl mb-8">
            Jesus is holy, loving, and deserving of our utmost worship and
            devotion. Join us in this 7-day live stream program, where you will
            experience the presence of heaven and feel the transformative power
            of His grace.
          </p>
          {isLive ? (
            <a
              href={`https://livestream-sable.vercel.app/live-streaming?roomID=${roomID}&role=Audience`}
              className="rounded-full px-8 py-3 bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Join Live Service
            </a>
          ) : (
            <p className="text-lg text-gray-300 rounded-full px-8 py-3 bg-black shadow-lg ">No live stream available</p>
          )}
        </div>
      </main>

      <ScrollAnimationWrapper>
        <motion.div
          className="md:flex justify-between items-center md:py-16 pt-24 text-black shadow-lg overflow-hidden"
          variants={scrollAnimation}
        >
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1 px-8 order-last sm:order-first">
            <h1 className="text-3xl font-extrabold leading-tight mb-4">
              Immerse Yourself in Divine Worship with
              <span className="text-black"> Global Connection</span>
            </h1>
            <p className="text-base font-medium opacity-80 mt-4 mb-6">
              Experience the power of worship from anywhere. Our platform
              enables you to join transformative services and unite with fellow
              believers in faith, no matter where you are.
            </p>
          </div>

          <div className="flex justify-center items-center w-full h-full">
            <motion.div
              className="h-[80vh] w-6/12 md:w-full"
              variants={scrollAnimation}
            >
              <img
                src={bannerImg}
                alt="Church Livestream"
                className="object-cover rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>

      <div className="relative w-full flex">
        <ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
          {listUser.map((listUsers, index) => (
            <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                  <img src={listUsers.icon} className="h-6 w-6" alt={listUsers.name} />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black-600 font-bold">
                    {listUsers.number}
                  </p>
                  <p className="text-lg text-black-500">{listUsers.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollAnimationWrapper>
        <div
          className="absolute bg-black-600 opacity-5 w-11/12 rounded-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: "blur(114px)" }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
