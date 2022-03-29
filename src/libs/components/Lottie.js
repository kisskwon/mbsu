import lottie_api from "lottie-api";
import lottie from "lottie-web";
import React, { useEffect, useRef } from "react";

const Lottie = () => {
  const _container = useRef(null);
  const animationAPI = useRef(null);
  const anim = useRef(null);
  const animData = useRef(null);

  useEffect(() => {
    if (animData.current === null) {
      animData.current = {
        container: _container.current,
        loop: true,
        autoplay: true,
        animationData: require("../../res/tv.json")
      };
    }

    if (anim.current === null) {
      anim.current = lottie.loadAnimation(animData.current);
    }
    if (animationAPI.current === null) {
      animationAPI.current = lottie_api.createAnimationApi(anim.current);
    }
  }, []);


  return (
    <div className="banner" ref={_container}></div>
  );
};

export default Lottie;
