import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import { motion } from 'framer-motion';

//style
import './style.scss';

const ProgressBar = ({ file, setFile, setImg }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setImg(url);
      setFile(null);
    }
  }, [url, setFile, setImg]);

  return (
    <div className='progress-bar'>
      <motion.div
        className='progress-bar-inner'
        initial={{ width: 0 }}
        animate={{ width: progress + '%' }}></motion.div>
    </div>
  );
};

export default ProgressBar;
