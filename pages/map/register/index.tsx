import FirstRegisterEvent from '@domain/map/FirstRegisterEvent';
import RegisterForm from '@domain/map/RegisterForm';
import { useState } from 'react';

const MapPage = () => {
  const [firstRegister, setFirstRegister] = useState({
    isRegistered: false,
    id: undefined as number | undefined,
  });

  const handleFirstRegistered = (id?: number) => {
    setFirstRegister({
      isRegistered: true,
      id,
    });
  };

  if (firstRegister.isRegistered && firstRegister.id) {
    return <FirstRegisterEvent mapId={firstRegister.id} />;
  }

  return (
    <div>
      <RegisterForm onFirstRegistered={handleFirstRegistered} />
    </div>
  );
};

export default MapPage;
