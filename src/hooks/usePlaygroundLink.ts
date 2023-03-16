import { useEffect, useState } from 'react';

export function usePlaygroundLink() {
  const [origin, setOrigin] = useState('');
  useEffect(() => {
    if (window) {
      setOrigin(window.location.origin);
    }
  }, []);
  return {
    memberList: () => `${origin}/members`,
    memberDetail: (id: string | number) => `${origin}/members/${id}`,
    memberUpload: () => `${origin}/members/upload`,
    memberEdit: () => `${origin}/members/upload?edit=true`,
    projectList: () => `${origin}/projects`,
    projectDetail: (id: string | number) => `${origin}/projects/${id}`,
    projectUpload: () => `${origin}/projects/upload`,
    login: () => `${origin}/auth/login`,
    register: () => `${origin}/auth/verify`,
    makers: () => `${origin}/makers`,
  };
}
