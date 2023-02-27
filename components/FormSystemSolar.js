import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import earthImage from '../assets/terr.png';
import sunImage from '../assets/soleil.png';

function SolarSystem() {
  const [isRotating, setIsRotating] = useState(true);

  const { transform } = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: `rotate(${isRotating ? 360 : 0}deg)` },
    config: { duration: 5000 },
    reset: true,
  });

  return (
    <div>
      <animated.img
        src={sunImage}
        alt="Sun"
        style={{ width: '200px', height: '200px', position: 'absolute', top: 'calc(50% - 100px)', left: 'calc(50% - 100px)' }}
      />
      <animated.img
        src={earthImage}
        alt="Earth"
        style={{ width: '50px', height: '50px', position: 'absolute', top: 'calc(50% - 25px)', left: 'calc(50% - 25px)', transform }}
        onMouseEnter={() => setIsRotating(false)}
        onMouseLeave={() => setIsRotating(true)}
      />
    </div>
  );
}

export default SolarSystem;
