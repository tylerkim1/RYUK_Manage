// nextId.js
import { useRef } from 'react';

const useNextId = () => {
  return useRef(10);
};

export default useNextId;
