import React, { useState, useEffect } from 'react';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import classNames from 'classnames';
import styles from '../styles/Welcome.module.css';

function ScrollToTopButton(props) {
  const [isVisible, setIsVisible] = useState(false);

  const isLightMode = props.isLightMode;
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const buttonClasses = classNames(styles.scrollToTopButton, {
    [styles.visible]: isVisible,
  });

  return (
    <div className={buttonClasses}>
      <BsFillArrowUpSquareFill
        onClick={scrollToTop}
        style={{ cursor: 'pointer', fontSize: '30px', color: isLightMode ? 'white' : 'black' }}
      />
    </div>
  );
}

export default ScrollToTopButton;

